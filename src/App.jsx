import { useEffect, useState } from "react";
import "./App.css";

function App()
 {
  const [showAdmin, setShowAdmin] = useState(
    window.location.hash === "#admin"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setShowAdmin(window.location.hash === "#admin");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (showAdmin) {
    return <AdminDashboard />;
  }

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  requirement: "",
});

const [message, setMessage] = useState({
  text: "",
  type: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  
  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/contact`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }
);
  
    const data = await response.json();

    if (data.success) {
      setMessage({
  text: "Requirement sent successfully!",
  type: "success",
});

      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        requirement: "",
      });
    } else {
  setMessage({
  text: data.message || "Something went wrong.",
  type: "error",
});
}
  } catch (error) {
    console.error(error);
    setMessage({
  text: "Unable to connect to server.",
  type: "error",
});
  }
};
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-line"></span>
          InnoFlowlink Tech
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="quote-btn">
          Get a Quote
        </a>
      </header>

      <main>

        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">Build • Innovate • Deliver</p>

            <h1>
              Smart Software Solutions
              <span>For Modern Businesses</span>
            </h1>

            <p className="hero-text">
              We build modern websites, full-stack applications, AI-powered
              solutions, APIs, dashboards and custom software for businesses.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="primary-btn">
                Start a Project
              </a>

              <a href="#projects" className="secondary-btn">
                View Our Work
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="availability">
              <span className="status-dot"></span>
              <p>Available for New Projects</p>
            </div>

            <h3>Web • AI • Software</h3>

            <div className="tech-grid">
              <span>React</span>
              <span>Python</span>
              <span>Java</span>
              <span>AI / ML</span>
              <span>REST APIs</span>
              <span>Databases</span>
            </div>
          </div>
        </section>


        {/* SERVICES */}
        <section className="section services" id="services">
          <SectionHeading
            label="Our Services"
            title="Technology Solutions That Move Businesses Forward"
            description="From modern websites to AI-powered applications, we build practical digital solutions designed for real business needs."
          />

          <div className="services-grid">
            <ServiceCard
              number="01"
              title="Web Development"
              text="Fast, responsive and modern business websites and full-stack web applications."
            />

            <ServiceCard
              number="02"
              title="Custom Software"
              text="Requirement-based software systems, dashboards and business applications."
            />

            <ServiceCard
              number="03"
              title="Backend & APIs"
              text="Secure backend systems, REST APIs, authentication and database integrations."
            />

            <ServiceCard
              number="04"
              title="AI & Machine Learning"
              text="Intelligent applications, prediction systems and practical AI integrations."
            />

            <ServiceCard
              number="05"
              title="Generative AI"
              text="AI assistants, intelligent workflows and GenAI-powered business experiences."
            />

            <ServiceCard
              number="06"
              title="Database Solutions"
              text="Reliable database design and integration for scalable web and software systems."
            />
          </div>
        </section>


        {/* WHAT WE BUILD */}
        <section className="section solutions">
          <SectionHeading
            label="What We Build"
            title="From an Idea to a Working Digital Product"
            description="We transform business requirements into usable, scalable and maintainable digital products."
          />

          <div className="solutions-grid">
            <SolutionCard
              number="01"
              title="Business Websites"
              text="Professional websites designed to build trust and generate leads."
            />

            <SolutionCard
              number="02"
              title="E-commerce Platforms"
              text="Product catalogs, carts, checkout, payments and admin management."
            />

            <SolutionCard
              number="03"
              title="Admin Dashboards"
              text="Powerful systems for managing users, products, orders and business data."
            />

            <SolutionCard
              number="04"
              title="AI Applications"
              text="Smart applications using machine learning, automation and Generative AI."
            />
          </div>
        </section>


        {/* PROJECTS */}
        <section className="section projects" id="projects">
          <SectionHeading
            label="Featured Projects"
            title="Ideas Turned Into Working Solutions"
            description="Explore systems built using modern software, blockchain and artificial intelligence technologies."
          />

          <div className="projects-grid">
            <ProjectCard
              number="01"
              type="Blockchain • Web3"
              title="BlockVault"
              subtitle="Secure File Sharing using Blockchain & IPFS"
              description="A decentralized file-sharing platform designed to provide secure storage, controlled access and transparent file ownership using blockchain and IPFS."
              technologies={[
                "React",
                "Node.js",
                "Ethereum",
                "IPFS",
                "Solidity",
              ]}
              link="https://github.com/gogulaajay2004-design/blockvault"
            />

            <ProjectCard
              number="02"
              type="AI • Machine Learning"
              title="AI System Monitor"
              subtitle="AI-Powered Real-Time System Monitoring"
              description="An intelligent monitoring system that tracks CPU, RAM and system performance while using machine learning for prediction and anomaly detection."
              technologies={[
                "Python",
                "Machine Learning",
                "Streamlit",
                "Scikit-learn",
              ]}
              link="https://github.com/gogulaajay2004-design/ai-powered-system-monitor"
              featured
            />
          </div>
        </section>


        {/* TEAM */}
        <section className="section team" id="about">
          <SectionHeading
            label="Our Team"
            title="Four Developers. One Product Mindset."
            description="A focused team combining frontend, backend, full-stack development, client communication and AI-driven software skills."
          />

          <div className="team-grid">
            <TeamCard
              initials="A"
              name="AJAY"
              role="Technical Lead"
              description="Python Full-Stack Developer focused on backend architecture, integrations, AI/ML solutions and final product delivery."
              skills={["Python", "Full Stack", "AI / ML", "APIs"]}
            />

            <TeamCard
              initials="R"
              name="RANEETH RAO"
              role="Frontend Developer"
              description="Focused on responsive user interfaces, modern frontend development and clean user experiences for web applications."
              skills={["Frontend", "Web UI", "Python Web"]}
            />

            <TeamCard
              initials="S"
              name="SRINU"
              role="Python Full-Stack Developer"
              description="Works across frontend and backend development while supporting requirement gathering and client communication."
              skills={["Python", "Full Stack", "Client Relations"]}
            />

            <TeamCard
              initials="SK"
              name="SIDDHIK"
              role="Java Full-Stack Developer"
              description="Builds Java-based applications and supports full-stack development, project integration and client communication."
              skills={["Java", "Full Stack", "Integration"]}
            />
          </div>
        </section>


        {/* DEVELOPMENT PROCESS */}
        <section className="section process" id="process">
          <SectionHeading
            label="How We Work"
            title="A Clear Process From Idea to Launch"
            description="Every project follows a structured development process to keep communication clear, development focused and delivery reliable."
          />

          <div className="process-grid">
            <ProcessStep
              number="01"
              title="Requirement"
              text="We understand your business, goals, users and project requirements."
            />

            <ProcessStep
              number="02"
              title="Planning"
              text="We define features, technology stack, architecture and the development roadmap."
            />

            <ProcessStep
              number="03"
              title="Design"
              text="We plan clean interfaces and user experiences around the actual product flow."
            />

            <ProcessStep
              number="04"
              title="Development"
              text="Frontend, backend, APIs and databases are developed and integrated."
            />

            <ProcessStep
              number="05"
              title="Testing"
              text="We test functionality, responsiveness, integrations and important user flows."
            />

            <ProcessStep
              number="06"
              title="Deployment"
              text="The completed application is prepared and deployed for real-world use."
            />

            <ProcessStep
              number="07"
              title="Support"
              text="We provide agreed post-delivery support and help with future improvements."
              fullWidth
            />
          </div>
        </section>


        {/* TESTIMONIALS */}
        <section className="section testimonials">
          <SectionHeading
            label="Client Feedback"
            title="Built for Results. Backed by Real Experiences."
            description="We believe real client feedback matters. Testimonials will be added only after successful project delivery."
          />

          <div className="testimonial-card">
            <div className="testimonial-icon">★</div>

            <div>
              <h3>Real Client Testimonial Coming Soon</h3>

              <p>
                Our first client review will be published here after successful
                project completion and delivery.
              </p>
            </div>
          </div>
        </section>


        {/* CONTACT / GET QUOTE */}
        <section className="section contact" id="contact">
          <div className="contact-layout">

            <div className="contact-info">
              <p className="contact-label">Start a Project</p>

              <h2>Let’s Build Something That Works.</h2>

              <p className="contact-text">
                Have a website, software, AI or automation idea? Tell us what
                you need and we’ll help turn the requirement into a working
                digital product.
              </p>

              <div className="contact-points">
                <div>
                  <span>01</span>
                  <p>Share your requirement</p>
                </div>

                <div>
                  <span>02</span>
                  <p>Get scope & estimate</p>
                </div>

                <div>
                  <span>03</span>
                  <p>Start development</p>
                </div>
              </div>
            </div>


          <form className="quote-form" onSubmit={handleSubmit}>

  <div className="form-row">

    <div className="form-group">
      <label htmlFor="name">Name</label>

      <input
        id="name"
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email</label>

      <input
        id="email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

  </div>


  <div className="form-row">

    <div className="form-group">
      <label htmlFor="phone">Phone</label>

      <input
        id="phone"
        type="tel"
        name="phone"
        placeholder="Your phone number"
        value={formData.phone}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="projectType">Project Type</label>

      <select
        id="projectType"
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select project type
        </option>

        <option value="Business Website">Business Website</option>
        <option value="E-commerce">E-commerce</option>
        <option value="Web Application">Web Application</option>
        <option value="Backend / API">Backend / API</option>
        <option value="AI / ML Project">AI / ML Project</option>
        <option value="Generative AI">Generative AI</option>
        <option value="Custom Software">Custom Software</option>
      </select>
    </div>

  </div>


  <div className="form-group">
    <label htmlFor="budget">Budget</label>

    <select
      id="budget"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      required
    >
      <option value="" disabled>
        Select budget range
      </option>

      <option value="₹5,000 – ₹10,000">₹5,000 – ₹10,000</option>
      <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
      <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
      <option value="₹50,000+">₹50,000+</option>
    </select>
  </div>


  <div className="form-group">
    <label htmlFor="requirement">Project Requirement</label>

    <textarea
      id="requirement"
      name="requirement"
      rows="6"
      placeholder="Tell us what you want to build..."
      value={formData.requirement}
      onChange={handleChange}
      required
    ></textarea>
  </div>


  <button type="submit" className="submit-btn">
    Send Requirement
  </button>

  {message.text && (
  <p className={`form-message ${message.type}`}>
    {message.text}
  </p>
)}
</form> 
          </div>
        </section>

      </main>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-line"></span>
              InnoFlowlink Tech
            </a>

            <p>
              Building modern software, web applications and intelligent
              digital solutions.
            </p>
          </div>


          <div className="footer-links">

            <div>
              <h4>Company</h4>

              <a href="#about">About</a>
              <a href="#process">Process</a>
              <a href="#projects">Projects</a>
            </div>


            <div>
              <h4>Services</h4>

              <a href="#services">
                Web Development
              </a>

              <a href="#services">
                Software
              </a>

              <a href="#services">
                AI / ML
              </a>
            </div>


            <div>
              <h4>Connect</h4>

              <a
                href="https://github.com/gogulaajay2004-design"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a href="#contact">
                Get a Quote
              </a>

              <a href="#admin">
                Admin
              </a>
            </div>

          </div>
        </div>


        <div className="footer-bottom">
          <p>
            © 2026 InnoFlowlink Tech. All rights reserved.
          </p>

          <p>
            Build • Innovate • Deliver
          </p>
        </div>

      </footer>

    </div>
  );
}


function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [adminKey, setAdminKey] = useState(
    sessionStorage.getItem("adminKey") || ""
  );
  const [enteredKey, setEnteredKey] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadContacts = async (key = adminKey) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/contacts`, {
        headers: {
          "x-admin-key": key,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 401) {
          sessionStorage.removeItem("adminKey");
          setAdminKey("");
        }
        throw new Error(data.message || "Unable to load requirements");
      }

      setContacts(data.contacts);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      loadContacts(adminKey);
    }
  }, [adminKey]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!enteredKey.trim()) {
      setError("Please enter the admin key");
      return;
    }

    sessionStorage.setItem("adminKey", enteredKey.trim());
    setAdminKey(enteredKey.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminKey");
    setAdminKey("");
    setEnteredKey("");
    setContacts([]);
    setError("");
  };

  const updateStatus = async (contactId, status) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/contacts/${contactId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update status");
      }

      setContacts((currentContacts) =>
        currentContacts.map((contact) =>
          contact._id === contactId ? data.contact : contact
        )
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const deleteContact = async (contactId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this requirement?"
    );

    if (!shouldDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/admin/contacts/${contactId}`,
        {
          method: "DELETE",
          headers: {
            "x-admin-key": adminKey,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete requirement");
      }

      setContacts((currentContacts) =>
        currentContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  if (!adminKey) {
    return (
      <div className="admin-page">
        <style>{adminStyles}</style>
        <form className="admin-login" onSubmit={handleLogin}>
          <p className="admin-label">InnoFlowlink Tech</p>
          <h1>Admin Login</h1>
          <p>Enter the admin key to view client requirements.</p>
          <input
            type="password"
            placeholder="Admin key"
            value={enteredKey}
            onChange={(event) => setEnteredKey(event.target.value)}
            autoFocus
          />
          <button type="submit">Open Dashboard</button>
          {error && <p className="admin-error">{error}</p>}
          <a className="admin-back" href="#home">← Back to website</a>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <style>{adminStyles}</style>
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <p className="admin-label">InnoFlowlink Tech</p>
            <h1>Client Requirements</h1>
            <p>{contacts.length} requirement(s)</p>
          </div>

          <div className="admin-actions">
            <button onClick={() => loadContacts()}>Refresh</button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <a href="#home">Website</a>
          </div>
        </div>

        {error && <p className="admin-error admin-banner">{error}</p>}
        {loading && <p className="admin-info">Loading requirements...</p>}

        {!loading && contacts.length === 0 && !error && (
          <div className="admin-empty">
            <h2>No requirements yet</h2>
            <p>New client submissions will appear here.</p>
          </div>
        )}

        <div className="admin-grid">
          {contacts.map((contact) => (
            <article className="admin-card" key={contact._id}>
              <div className="admin-card-top">
                <div>
                  <h2>{contact.name}</h2>
                  <p>{contact.projectType}</p>
                </div>
                <span className={`status-pill status-${(contact.status || "New").toLowerCase().replaceAll(" ", "-")}`}>
                  {contact.status || "New"}
                </span>
              </div>

              <div className="admin-details">
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone || "Not provided"}</p>
                <p><strong>Budget:</strong> {contact.budget}</p>
                <p>
                  <strong>Received:</strong>{" "}
                  {new Date(contact.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="admin-requirement">
                <strong>Requirement</strong>
                <p>{contact.requirement}</p>
              </div>

              <div className="admin-card-actions">
                <select
                  value={contact.status || "New"}
                  onChange={(event) =>
                    updateStatus(contact._id, event.target.value)
                  }
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  className="delete-button"
                  onClick={() => deleteContact(contact._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


const adminStyles = `
  .admin-page {
    min-height: 100vh;
    background: #07111f;
    color: #f8fafc;
    padding: 32px 20px;
    font-family: Inter, system-ui, sans-serif;
  }
  .admin-container { max-width: 1180px; margin: 0 auto; }
  .admin-header { display: flex; justify-content: space-between; gap: 24px; align-items: center; margin-bottom: 28px; }
  .admin-header h1, .admin-login h1 { margin: 4px 0 8px; }
  .admin-label { color: #39d98a; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; }
  .admin-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .admin-actions button, .admin-actions a, .admin-login button {
    border: 1px solid #26364b; background: #122033; color: white; padding: 11px 16px;
    border-radius: 9px; cursor: pointer; text-decoration: none; font-weight: 700;
  }
  .admin-actions .logout-button { background: #26364b; }
  .admin-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
  .admin-card { background: #0e1a2b; border: 1px solid #223249; border-radius: 16px; padding: 20px; }
  .admin-card-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
  .admin-card h2 { margin: 0 0 5px; font-size: 21px; }
  .admin-card p { color: #b7c2d0; margin: 5px 0; line-height: 1.55; }
  .status-pill { padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 800; white-space: nowrap; background: #1f354d; }
  .status-new { background: #173b62; color: #8bc6ff; }
  .status-contacted { background: #493b13; color: #ffe083; }
  .status-in-progress { background: #38266b; color: #c7afff; }
  .status-completed { background: #123e2b; color: #83efbb; }
  .admin-details { border-top: 1px solid #223249; border-bottom: 1px solid #223249; margin: 16px 0; padding: 12px 0; }
  .admin-requirement strong { display: block; margin-bottom: 7px; }
  .admin-card-actions { display: flex; justify-content: space-between; gap: 12px; margin-top: 18px; }
  .admin-card-actions select { flex: 1; background: #122033; color: white; border: 1px solid #31445e; padding: 10px; border-radius: 8px; }
  .delete-button { background: #762d37; color: white; border: 0; padding: 10px 15px; border-radius: 8px; cursor: pointer; }
  .admin-login { width: min(420px, 100%); margin: 10vh auto 0; background: #0e1a2b; border: 1px solid #223249; border-radius: 18px; padding: 28px; }
  .admin-login input { box-sizing: border-box; width: 100%; background: #07111f; color: white; border: 1px solid #31445e; padding: 13px; border-radius: 9px; margin: 18px 0 12px; }
  .admin-login button { width: 100%; background: #168b58; border: 0; }
  .admin-back { display: inline-block; color: #a9bad0; margin-top: 18px; }
  .admin-error { color: #ff9da7; }
  .admin-banner, .admin-info, .admin-empty { background: #0e1a2b; border: 1px solid #223249; border-radius: 12px; padding: 16px; margin-bottom: 18px; }
  .admin-empty { text-align: center; padding: 50px 20px; }
  @media (max-width: 760px) {
    .admin-header { align-items: flex-start; flex-direction: column; }
    .admin-grid { grid-template-columns: 1fr; }
    .admin-card-top, .admin-card-actions { flex-direction: column; }
    .admin-card-actions select, .delete-button { width: 100%; }
  }
`;


/* =========================================
   REUSABLE COMPONENTS
========================================= */

function SectionHeading({
  label,
  title,
  description,
}) {
  return (
    <div className="section-heading">
      <p>{label}</p>

      <h2>{title}</h2>

      <span>{description}</span>
    </div>
  );
}


function ServiceCard({
  number,
  title,
  text,
}) {
  return (
    <article className="service-card">

      <div className="number-box">
        {number}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </article>
  );
}


function SolutionCard({
  number,
  title,
  text,
}) {
  return (
    <article className="solution-card">

      <span className="small-number">
        {number}
      </span>

      <h3>{title}</h3>

      <p>{text}</p>

    </article>
  );
}


function ProjectCard({
  number,
  type,
  title,
  subtitle,
  description,
  technologies,
  link,
  featured,
}) {
  return (
    <article
      className={`project-card ${
        featured ? "featured-project" : ""
      }`}
    >

      <div className="project-top">
        <span className="project-number">
          {number}
        </span>

        <span className="project-type">
          {type}
        </span>
      </div>


      <h3>{title}</h3>

      <h4>{subtitle}</h4>

      <p>{description}</p>


      <div className="tag-list">
        {technologies.map((technology) => (
          <span key={technology}>
            {technology}
          </span>
        ))}
      </div>


      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="project-link"
      >
        View Project →
      </a>

    </article>
  );
}


function TeamCard({
  initials,
  name,
  role,
  description,
  skills,
}) {
  return (
    <article className="team-card">

      <div className="team-avatar">
        {initials}
      </div>

      <h3>{name}</h3>

      <h4>{role}</h4>

      <p>{description}</p>


      <div className="tag-list">
        {skills.map((skill) => (
          <span key={skill}>
            {skill}
          </span>
        ))}
      </div>

    </article>
  );
}


function ProcessStep({
  number,
  title,
  text,
  fullWidth,
}) {
  return (
    <article
      className={`process-card ${
        fullWidth ? "process-card-wide" : ""
      }`}
    >

      <div className="process-number">
        {number}
      </div>


      <div className="process-content">

        <h3>{title}</h3>

        <p>{text}</p>

      </div>

    </article>
  );
}


export default App;
