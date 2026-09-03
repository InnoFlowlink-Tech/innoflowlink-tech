require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const { Resend } = require("resend");

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });

// ==========================================
// CONTACT SCHEMA
// ==========================================

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    projectType: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String,
      required: true,
      trim: true,
    },

    requirement: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// CONTACT MODEL
// ==========================================

const Contact = mongoose.model("Contact", contactSchema);

// ==========================================
// ADMIN SECURITY MIDDLEWARE
// ==========================================

const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];

  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({
      success: false,
      message: "Admin key is not configured",
    });
  }

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin access",
    });
  }

  next();
};

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send("InnoFlowlink Tech Backend Running");
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
  });
});

// ==========================================
// SAVE CLIENT REQUIREMENT
// ==========================================

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      budget,
      requirement,
    } = req.body;

    if (!name || !email || !projectType || !budget || !requirement) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Save requirement to MongoDB
    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      projectType: projectType.trim(),
      budget: budget.trim(),
      requirement: requirement.trim(),
    });

    console.log("New Client Requirement Saved:", newContact._id);

    // Email failure will not affect database saving
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      try {
        const emailResult = await resend.emails.send({
          from: "InnoFlowlink Tech <onboarding@resend.dev>",
          to: process.env.NOTIFY_EMAIL,
          subject: `New Project Requirement - ${newContact.name}`,
          html: `
            <h2>New Client Requirement</h2>
            <p><strong>Name:</strong> ${newContact.name}</p>
            <p><strong>Email:</strong> ${newContact.email}</p>
            <p>
              <strong>Phone:</strong>
              ${newContact.phone || "Not provided"}
            </p>
            <p>
              <strong>Project Type:</strong>
              ${newContact.projectType}
            </p>
            <p><strong>Budget:</strong> ${newContact.budget}</p>
            <p>
              <strong>Requirement:</strong>
              ${newContact.requirement}
            </p>
            <p><strong>Status:</strong> ${newContact.status}</p>
          `,
        });

        console.log("Email Notification Sent:", emailResult);
      } catch (emailError) {
        console.error(
          "Email Notification Error:",
          emailError.message
        );
      }
    } else {
      console.log("Email notification skipped: credentials not configured");
    }

    return res.status(201).json({
      success: true,
      message: "Requirement saved successfully",
      contactId: newContact._id,
    });
  } catch (error) {
    console.error("Contact Save Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save requirement",
    });
  }
});

// ==========================================
// GET ALL REQUIREMENTS - ADMIN
// ==========================================

app.get("/api/admin/contacts", verifyAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Load Requirements Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load requirements",
    });
  }
});

// ==========================================
// UPDATE REQUIREMENT STATUS - ADMIN
// ==========================================

app.patch(
  "/api/admin/contacts/:id/status",
  verifyAdmin,
  async (req, res) => {
    try {
      const allowedStatuses = [
        "New",
        "Contacted",
        "In Progress",
        "Completed",
      ];

      const { status } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Requirement not found",
        });
      }

      return res.json({
        success: true,
        message: "Status updated successfully",
        contact,
      });
    } catch (error) {
      console.error("Status Update Error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to update status",
      });
    }
  }
);

// ==========================================
// DELETE REQUIREMENT - ADMIN
// ==========================================

app.delete(
  "/api/admin/contacts/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Requirement not found",
        });
      }

      return res.json({
        success: true,
        message: "Requirement deleted successfully",
      });
    } catch (error) {
      console.error("Delete Requirement Error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to delete requirement",
      });
    }
  }
);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});