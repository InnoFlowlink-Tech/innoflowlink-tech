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
<a href="#tech-stack">Tech Stack</a>
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

          <div className="hero-logo-wrap" aria-label="InnoFlowlink Tech company logo">
            <div className="hero-logo-ring">
              <img
                src="/innoflowlink-logo.jpg"
                alt="InnoFlowlink Tech logo"
                className="hero-logo-image"
              />
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



               {/* CASE STUDIES */}
        <section className="section projects" id="projects">
          <SectionHeading
            label="Case Studies"
            title="Engineering Ideas Into Working Solutions"
            description="A closer look at projects we have built, the problems they address and the technologies behind them."
          />

          <div className="case-studies-grid">

            {/* BLOCKVAULT */}
            <article className="case-study-card">
              <div className="case-study-top">
                <span className="case-number">01</span>
                <span className="case-type">Blockchain • Web3</span>
              </div>

              <h3>BlockVault</h3>

              <p className="case-subtitle">
                Secure File Sharing using Blockchain & IPFS
              </p>

              <div className="case-section">
                <h4>Problem</h4>
                <p>
                  Traditional file-sharing systems depend heavily on centralized
                  storage and can make ownership, access control and file
                  activity difficult to verify transparently.
                </p>
              </div>

              <div className="case-section">
                <h4>Solution</h4>
                <p>
                  BlockVault combines blockchain and IPFS to create a
                  decentralized file-sharing workflow with controlled access,
                  verifiable ownership and secure file handling.
                </p>
              </div>

              <div className="case-section">
                <h4>Key Features</h4>
                <ul className="case-features">
                  <li>MetaMask wallet authentication</li>
                  <li>IPFS-based decentralized file storage</li>
                  <li>Blockchain-based ownership records</li>
                  <li>Controlled file sharing and access</li>
                  <li>Secure file encryption workflow</li>
                </ul>
              </div>

              <div className="case-tech">
                {["React", "Node.js", "Ethereum", "IPFS", "Solidity"].map(
                  (tech) => (
                    <span key={tech}>{tech}</span>
                  )
                )}
              </div>

              <a
                href="https://github.com/gogulaajay2004-design/blockvault"
                target="_blank"
                rel="noreferrer"
                className="case-link"
              >
                View Project on GitHub →
              </a>
            </article>

            {/* AI SYSTEM MONITOR */}
            <article className="case-study-card featured-case">
              <div className="case-study-top">
                <span className="case-number">02</span>
                <span className="case-type">AI • Machine Learning</span>
              </div>

              <h3>AI System Monitor</h3>

              <p className="case-subtitle">
                AI-Powered Real-Time System Monitoring
              </p>

              <div className="case-section">
                <h4>Problem</h4>
                <p>
                  Traditional monitoring tools mainly report current system
                  usage and may not provide predictive insight into future
                  resource behavior or unusual activity.
                </p>
              </div>

              <div className="case-section">
                <h4>Solution</h4>
                <p>
                  The AI System Monitor collects live system metrics and applies
                  machine-learning models to analyze resource usage, predict
                  short-term behavior and identify anomalies.
                </p>
              </div>

              <div className="case-section">
                <h4>Key Features</h4>
                <ul className="case-features">
                  <li>Real-time CPU and RAM monitoring</li>
                  <li>System performance dashboard</li>
                  <li>Machine-learning based prediction</li>
                  <li>Anomaly detection</li>
                  <li>Historical system metrics analysis</li>
                </ul>
              </div>

              <div className="case-tech">
                {[
                  "Python",
                  "Machine Learning",
                  "Streamlit",
                  "Scikit-learn",
                ].map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <a
                href="https://github.com/gogulaajay2004-design/ai-powered-system-monitor"
                target="_blank"
                rel="noreferrer"
                className="case-link"
              >
                View Project on GitHub →
              </a>
            </article>

          </div>
        </section>
               {/* TECH STACK */}
        <section className="section tech-stack" id="tech-stack">
          <SectionHeading
            label="Technology Stack"
            title="Modern Technologies for Reliable Software"
            description="We choose practical technologies based on the product, scalability needs and business requirements."
          />

          <div className="tech-grid">
            {[
              "Python",
              "Java",
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "Django",
              "FastAPI",
              "MongoDB",
              "MySQL",
              "REST APIs",
              "Machine Learning",
              "Generative AI",
              "Git & GitHub",
            ].map((tech) => (
              <div className="tech-card" key={tech}>
                {tech}
              </div>
            ))}
          </div>

          <div className="github-org-box">
            <div>
              <p className="github-org-label">Company GitHub</p>
              <h3>InnoFlowlink Tech Organization</h3>
              <p>
                Explore our development work, repositories and engineering
                activity on GitHub.
              </p>
            </div>

            <a
              href="https://github.com/InnoFlowlink-Tech"
              target="_blank"
              rel="noreferrer"
              className="github-org-btn"
            >
              Visit GitHub Organization
            </a>
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
              github="https://github.com/raneethrao"
            />

            <TeamCard
              initials="S"
              name="SRINU"
              role="Python Full-Stack Developer"
              description="Works across frontend and backend development while supporting requirement gathering and client communication."
              skills={["Python", "Full Stack", "Client Relations"]}
              github="https://github.com/Srinuyadlapalli26"
            />

            <TeamCard
              initials="SK"
              name="SIDDHIK"
              role="Java Full-Stack Developer"
              description="Builds Java-based applications and supports full-stack development, project integration and client communication."
              skills={["Java", "Full Stack", "Integration"]}
              github="https://github.com/s-softech"
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

              <p className="contact-text">
                Email us at{" "}
                <a href="mailto:innoflowlink4202@gmail.com">
                  innoflowlink4202@gmail.com
                </a>
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

              <a href="mailto:innoflowlink4202@gmail.com">
                innoflowlink4202@gmail.com
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
  const [showKey, setShowKey] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadContacts = async (key = adminKey) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/contacts`, {
        headers: { "x-admin-key": key },
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 401) {
          sessionStorage.removeItem("adminKey");
          setAdminKey("");
        }
        throw new Error(data.message || "Unable to load requirements");
      }

      setContacts(data.contacts || []);
      setLastUpdated(new Date());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) loadContacts(adminKey);
  }, [adminKey]);

  const handleLogin = (event) => {
    event.preventDefault();
    const cleanKey = enteredKey.trim();

    if (!cleanKey) {
      setError("Please enter the admin key");
      return;
    }

    setError("");
    sessionStorage.setItem("adminKey", cleanKey);
    setAdminKey(cleanKey);
  };

  const handleLogout = () => {
    if (!window.confirm("Log out of the admin portal?")) return;
    sessionStorage.removeItem("adminKey");
    setAdminKey("");
    setEnteredKey("");
    setContacts([]);
    setError("");
  };

  const updateStatus = async (contactId, status) => {
    setError("");
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

  const deleteContact = async (contactId, contactName) => {
    const shouldDelete = window.confirm(
      `Delete ${contactName}'s requirement permanently?`
    );
    if (!shouldDelete) return;

    setError("");
    try {
      const response = await fetch(
        `${API_URL}/api/admin/contacts/${contactId}`,
        {
          method: "DELETE",
          headers: { "x-admin-key": adminKey },
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

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredContacts = contacts
    .filter((contact) => {
      const status = contact.status || "New";
      const matchesStatus = statusFilter === "All" || status === statusFilter;
      const searchableText = [
        contact.name,
        contact.email,
        contact.phone,
        contact.projectType,
        contact.requirement,
        contact.budget,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchableText.includes(normalizedSearch);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const statusCounts = contacts.reduce(
    (counts, contact) => {
      const status = contact.status || "New";
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    },
    { New: 0, Contacted: 0, "In Progress": 0, Completed: 0 }
  );

  if (!adminKey) {
    return (
      <div className="admin-page admin-login-page">
        <style>{adminStyles}</style>
        <div className="admin-login-shell">
          <a className="admin-brand" href="#home">
            <span className="admin-brand-mark">I</span>
            InnoFlowlink Tech
          </a>

          <form className="admin-login" onSubmit={handleLogin}>
            <div className="admin-lock" aria-hidden="true">⌁</div>
            <p className="admin-eyebrow">Secure workspace</p>
            <h1>Welcome back</h1>
            <p className="admin-login-copy">
              Sign in with your private admin key to manage client leads.
            </p>

            <label htmlFor="admin-key">Admin key</label>
            <div className="admin-key-field">
              <input
                id="admin-key"
                type={showKey ? "text" : "password"}
                placeholder="Enter your admin key"
                value={enteredKey}
                onChange={(event) => setEnteredKey(event.target.value)}
                autoComplete="current-password"
                autoFocus
              />
              <button
                className="key-toggle"
                type="button"
                onClick={() => setShowKey((current) => !current)}
                aria-label={showKey ? "Hide admin key" : "Show admin key"}
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>

            <button className="login-button" type="submit">
              Open dashboard
            </button>
            {error && <p className="admin-error" role="alert">{error}</p>}
            <p className="admin-security-note">Protected administrator access</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <style>{adminStyles}</style>
      <div className="admin-container">
        <header className="admin-header">
          <div>
            <a className="admin-brand" href="#home">
              <span className="admin-brand-mark">I</span>
              InnoFlowlink Tech
            </a>
            <p className="admin-eyebrow">Operations</p>
            <h1>Lead management</h1>
            <p className="admin-subtitle">
              Review enquiries, track progress and follow up with clients.
            </p>
          </div>

          <div className="admin-actions">
            <button onClick={() => loadContacts()} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            <a href="#home">View website</a>
            <button className="logout-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </header>

        <section className="admin-stats" aria-label="Lead summary">
          <article className="admin-stat admin-stat-total">
            <span>Total leads</span>
            <strong>{contacts.length}</strong>
            <small>All enquiries</small>
          </article>
          <article className="admin-stat">
            <span>New</span>
            <strong>{statusCounts.New}</strong>
            <small>Needs attention</small>
          </article>
          <article className="admin-stat">
            <span>In progress</span>
            <strong>{statusCounts["In Progress"]}</strong>
            <small>Active projects</small>
          </article>
          <article className="admin-stat">
            <span>Completed</span>
            <strong>{statusCounts.Completed}</strong>
            <small>Closed successfully</small>
          </article>
        </section>

        <section className="admin-toolbar" aria-label="Lead filters">
          <div className="admin-search">
            <label htmlFor="lead-search">Search leads</label>
            <input
              id="lead-search"
              type="search"
              placeholder="Search name, email, phone or project..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="admin-filter">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </section>

        <div className="admin-list-meta">
          <p>
            Showing <strong>{filteredContacts.length}</strong> of{" "}
            <strong>{contacts.length}</strong> leads
          </p>
          {lastUpdated && (
            <p>Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
          )}
        </div>

        {error && <p className="admin-error admin-banner" role="alert">{error}</p>}
        {loading && contacts.length === 0 && (
          <div className="admin-loading" aria-live="polite">
            <span className="admin-spinner" />
            Loading client requirements...
          </div>
        )}

        {!loading && filteredContacts.length === 0 && !error && (
          <div className="admin-empty">
            <div aria-hidden="true">◎</div>
            <h2>{contacts.length ? "No matching leads" : "No requirements yet"}</h2>
            <p>
              {contacts.length
                ? "Try changing your search or status filter."
                : "New client submissions will appear here automatically."}
            </p>
          </div>
        )}

        <div className="admin-grid">
          {filteredContacts.map((contact) => {
            const status = contact.status || "New";
            const statusClass = status.toLowerCase().replaceAll(" ", "-");

            return (
              <article className="admin-card" key={contact._id}>
                <div className="admin-card-top">
                  <div className="admin-person">
                    <span className="admin-avatar">
                      {(contact.name || "C").charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <h2>{contact.name}</h2>
                      <p>{contact.projectType || "General enquiry"}</p>
                    </div>
                  </div>
                  <span className={`status-pill status-${statusClass}`}>
                    {status}
                  </span>
                </div>

                <dl className="admin-details">
                  <div>
                    <dt>Email</dt>
                    <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      {contact.phone ? (
                        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                      ) : (
                        "Not provided"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Budget</dt>
                    <dd>{contact.budget || "Not specified"}</dd>
                  </div>
                  <div>
                    <dt>Received</dt>
                    <dd>
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Not available"}
                    </dd>
                  </div>
                </dl>

                <div className="admin-requirement">
                  <strong>Requirement</strong>
                  <p>{contact.requirement}</p>
                </div>

                <div className="admin-card-actions">
                  <label>
                    <span>Status</span>
                    <select
                      value={status}
                      onChange={(event) =>
                        updateStatus(contact._id, event.target.value)
                      }
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </label>

                  <button
                    className="delete-button"
                    onClick={() => deleteContact(contact._id, contact.name)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}


const adminStyles = `
  :root {
    --admin-bg: #06101d;
    --admin-panel: #0b1727;
    --admin-panel-soft: #101f32;
    --admin-border: #20334a;
    --admin-text: #f5f8fc;
    --admin-muted: #93a6bb;
    --admin-accent: #43e09b;
    --admin-blue: #4aa8ff;
  }
  .admin-page {
    min-height: 100vh;
    box-sizing: border-box;
    background:
      radial-gradient(circle at 8% 0%, rgba(51, 128, 255, .14), transparent 28rem),
      radial-gradient(circle at 95% 5%, rgba(67, 224, 155, .10), transparent 25rem),
      var(--admin-bg);
    color: var(--admin-text);
    padding: 32px 20px 60px;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .admin-page *, .admin-page *::before, .admin-page *::after { box-sizing: border-box; }
  .admin-container { width: min(1220px, 100%); margin: 0 auto; }
  .admin-header {
    display: flex; justify-content: space-between; gap: 28px; align-items: flex-end;
    margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--admin-border);
  }
  .admin-brand {
    display: inline-flex; align-items: center; gap: 10px; color: var(--admin-text);
    text-decoration: none; font-size: 15px; font-weight: 800; letter-spacing: -.01em;
  }
  .admin-brand-mark {
    display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px;
    color: #04110b; background: linear-gradient(135deg, var(--admin-blue), var(--admin-accent));
    box-shadow: 0 0 24px rgba(67, 224, 155, .18);
  }
  .admin-eyebrow {
    margin: 28px 0 7px; color: var(--admin-accent); font-size: 12px; font-weight: 800;
    letter-spacing: .15em; text-transform: uppercase;
  }
  .admin-header h1, .admin-login h1 {
    margin: 0; color: var(--admin-text); font-size: clamp(30px, 4vw, 46px);
    line-height: 1.05; letter-spacing: -.035em;
  }
  .admin-subtitle, .admin-login-copy {
    margin: 10px 0 0; color: var(--admin-muted); font-size: 16px; line-height: 1.6;
  }
  .admin-actions { display: flex; gap: 9px; flex-wrap: wrap; }
  .admin-actions button, .admin-actions a {
    min-height: 42px; border: 1px solid var(--admin-border); background: var(--admin-panel);
    color: var(--admin-text); padding: 10px 15px; border-radius: 10px; cursor: pointer;
    text-decoration: none; font: inherit; font-size: 14px; font-weight: 750;
  }
  .admin-actions button:hover, .admin-actions a:hover { border-color: #3d5875; background: var(--admin-panel-soft); }
  .admin-actions button:disabled { cursor: wait; opacity: .65; }
  .admin-actions .logout-button { color: #ffb2bb; }
  .admin-stats {
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px;
    margin-bottom: 22px;
  }
  .admin-stat {
    position: relative; overflow: hidden; min-height: 145px; padding: 20px;
    background: linear-gradient(145deg, rgba(16, 31, 50, .98), rgba(9, 22, 37, .98));
    border: 1px solid var(--admin-border); border-radius: 16px;
  }
  .admin-stat::after {
    content: ""; position: absolute; right: -18px; bottom: -25px; width: 90px; height: 90px;
    border-radius: 50%; background: rgba(74, 168, 255, .07);
  }
  .admin-stat-total { border-color: rgba(67, 224, 155, .35); }
  .admin-stat span, .admin-stat small { display: block; color: var(--admin-muted); }
  .admin-stat span { font-size: 14px; font-weight: 700; }
  .admin-stat strong { display: block; margin: 12px 0 7px; font-size: 36px; line-height: 1; }
  .admin-stat small { font-size: 12px; }
  .admin-toolbar {
    display: grid; grid-template-columns: 1fr 220px; gap: 14px; padding: 16px;
    background: rgba(11, 23, 39, .8); border: 1px solid var(--admin-border); border-radius: 15px;
  }
  .admin-toolbar label, .admin-card-actions label > span, .admin-login label {
    display: block; margin-bottom: 7px; color: #bdd0e4; font-size: 13px; font-weight: 750;
  }
  .admin-toolbar input, .admin-toolbar select, .admin-card-actions select, .admin-login input {
    width: 100%; min-height: 44px; border: 1px solid #2c425c; border-radius: 10px;
    background: #071321; color: var(--admin-text); padding: 10px 12px; font: inherit; font-size: 15px;
    outline: none;
  }
  .admin-toolbar input:focus, .admin-toolbar select:focus, .admin-card-actions select:focus, .admin-login input:focus {
    border-color: var(--admin-blue); box-shadow: 0 0 0 3px rgba(74, 168, 255, .13);
  }
  .admin-list-meta {
    display: flex; justify-content: space-between; gap: 16px; color: var(--admin-muted);
    padding: 14px 2px; font-size: 13px;
  }
  .admin-list-meta p { margin: 0; }
  .admin-list-meta strong { color: var(--admin-text); }
  .admin-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .admin-card {
    background: linear-gradient(145deg, rgba(14, 28, 46, .98), rgba(8, 20, 34, .98));
    border: 1px solid var(--admin-border); border-radius: 18px; padding: 20px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, .13);
  }
  .admin-card:hover { border-color: #304b69; transform: translateY(-1px); transition: .2s ease; }
  .admin-card-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
  .admin-person { display: flex; gap: 12px; align-items: center; min-width: 0; }
  .admin-avatar {
    flex: 0 0 auto; display: grid; place-items: center; width: 44px; height: 44px;
    border-radius: 12px; color: #bfe4ff; background: #122f4c; font-size: 17px; font-weight: 850;
  }
  .admin-card h2 { margin: 0 0 4px; font-size: 19px; line-height: 1.25; }
  .admin-card p { color: var(--admin-muted); margin: 0; line-height: 1.55; overflow-wrap: anywhere; }
  .status-pill {
    flex: 0 0 auto; padding: 6px 10px; border-radius: 999px; font-size: 12px;
    font-weight: 800; white-space: nowrap; background: #1f354d;
  }
  .status-new { background: #123858; color: #8ed0ff; }
  .status-contacted { background: #463815; color: #ffe18a; }
  .status-in-progress { background: #382568; color: #cdb5ff; }
  .status-completed { background: #103c2a; color: #84edb9; }
  .admin-details {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px;
    border-top: 1px solid var(--admin-border); border-bottom: 1px solid var(--admin-border);
    margin: 18px 0; padding: 16px 0;
  }
  .admin-details div { min-width: 0; }
  .admin-details dt { margin-bottom: 4px; color: #6f879e; font-size: 12px; font-weight: 750; text-transform: uppercase; letter-spacing: .06em; }
  .admin-details dd { margin: 0; color: #dce7f3; font-size: 14px; overflow-wrap: anywhere; }
  .admin-details a { color: #93d1ff; text-decoration: none; }
  .admin-details a:hover { text-decoration: underline; }
  .admin-requirement strong { display: block; margin-bottom: 7px; font-size: 13px; }
  .admin-requirement p { min-height: 48px; }
  .admin-card-actions {
    display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: end; margin-top: 18px;
  }
  .delete-button {
    min-height: 44px; background: transparent; color: #ff9eaa; border: 1px solid #63313b;
    padding: 10px 15px; border-radius: 10px; cursor: pointer; font-weight: 750;
  }
  .delete-button:hover { background: #2e151b; }
  .admin-banner, .admin-loading, .admin-empty {
    background: var(--admin-panel); border: 1px solid var(--admin-border);
    border-radius: 14px; padding: 17px; margin-bottom: 16px;
  }
  .admin-error { color: #ff9eaa; }
  .admin-loading { display: flex; align-items: center; justify-content: center; gap: 10px; color: var(--admin-muted); }
  .admin-spinner {
    width: 17px; height: 17px; border: 2px solid #29415c; border-top-color: var(--admin-accent);
    border-radius: 50%; animation: admin-spin .8s linear infinite;
  }
  @keyframes admin-spin { to { transform: rotate(360deg); } }
  .admin-empty { text-align: center; padding: 54px 20px; }
  .admin-empty > div { color: var(--admin-blue); font-size: 38px; }
  .admin-empty h2 { margin: 10px 0 6px; font-size: 20px; }
  .admin-empty p { margin: 0; color: var(--admin-muted); }
  .admin-login-page { padding-top: 24px; }
  .admin-login-shell { width: min(460px, 100%); margin: 0 auto; }
  .admin-login {
    margin-top: max(50px, 10vh); background: rgba(11, 23, 39, .96);
    border: 1px solid var(--admin-border); border-radius: 22px; padding: 30px;
    box-shadow: 0 30px 90px rgba(0, 0, 0, .35);
  }
  .admin-lock {
    display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 22px;
    border-radius: 14px; color: var(--admin-accent); background: rgba(67, 224, 155, .09);
    border: 1px solid rgba(67, 224, 155, .2); font-size: 28px; font-weight: 800;
  }
  .admin-login .admin-eyebrow { margin-top: 0; }
  .admin-login-copy { margin-bottom: 24px; }
  .admin-key-field { position: relative; }
  .admin-key-field input { padding-right: 70px; }
  .key-toggle {
    position: absolute; right: 7px; top: 7px; min-height: 30px; border: 0; border-radius: 7px;
    padding: 5px 9px; background: #16283d; color: #c8d8e9; cursor: pointer; font-weight: 750;
  }
  .login-button {
    width: 100%; min-height: 46px; margin-top: 14px; border: 0; border-radius: 10px;
    background: linear-gradient(135deg, #2f9cff, #32d58b); color: #03100b;
    cursor: pointer; font: inherit; font-weight: 850;
  }
  .login-button:hover { filter: brightness(1.06); }
  .admin-login .admin-error { margin: 12px 0 0; font-size: 14px; }
  .admin-security-note { margin: 18px 0 0; text-align: center; color: #6f879e; font-size: 12px; }
  @media (max-width: 900px) {
    .admin-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .admin-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 650px) {
    .admin-page { padding: 22px 14px 44px; }
    .admin-header { align-items: flex-start; flex-direction: column; }
    .admin-actions { width: 100%; }
    .admin-actions button, .admin-actions a { flex: 1; text-align: center; }
    .admin-toolbar { grid-template-columns: 1fr; }
    .admin-details { grid-template-columns: 1fr; }
    .admin-list-meta { align-items: flex-start; flex-direction: column; }
    .admin-card-actions { grid-template-columns: 1fr; }
    .delete-button { width: 100%; }
  }
  @media (max-width: 420px) {
    .admin-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
    .admin-stat { min-height: 125px; padding: 16px; }
    .admin-stat strong { font-size: 30px; }
    .admin-login { padding: 23px; }
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
  github,
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

      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="team-github-link"
          aria-label={`View ${name}'s GitHub profile`}
        >
          GitHub Profile →
        </a>
      )}

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
