import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { pages } from "./pages.js";
import { PageContent } from "./PageContent.jsx";

const AdminDashboard = lazy(() => import("./AdminDashboard.jsx"));

export default function App({ pagePath = "/" }) {
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    const sync = () => setShowAdmin(window.location.hash === "#admin");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.content = showAdmin || !pages[pagePath] ? "noindex, follow" : "index, follow";
  }, [showAdmin, pagePath]);
  return showAdmin ? <Suspense fallback={<p role="status">Loading admin portal…</p>}><AdminDashboard /></Suspense> : <PublicSite pagePath={pagePath} />;
}

function PublicSite({ pagePath }) {
  const home = pagePath === "/";
  const page = pages[pagePath];
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);
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
  if (submitLock.current) return;
  submitLock.current = true;
  setSubmitting(true);
  setMessage({ text: "", type: "" });
  try {
  
  const response = await fetch(
  `${(import.meta.env.VITE_API_URL || "").replace(/\/$/, "")}/api/contact`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    signal: AbortSignal.timeout(30000),
  }
);
  
    const data = await response.json();

    if (response.ok && data.success) {
      setMessage({
  text: "Requirement sent successfully! We’ll review your brief and reply by email.",
  type: "success",
});

      window.gtag?.("event", "generate_lead", { form_name: "project_enquiry" });
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
  } catch {
    setMessage({
  text: "Unable to confirm your submission. Email innoflowlink4202@gmail.com for help, or try again later.",
  type: "error",
});
  } finally {
    submitLock.current = false;
    setSubmitting(false);
  }
};
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>

      {/* NAVBAR */}
      <header className="navbar">
        <a href="/#home" className="logo">
          <span className="logo-line"></span>
          InnoFlowlink Tech
        </a>

        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        <nav id="primary-navigation" aria-label="Main navigation" className={menuOpen ? "nav-open" : ""} onClick={() => setMenuOpen(false)}>
          <a href="/" aria-current={home ? "page" : undefined}>Home</a>
          <a href="/#services">Services</a>
          <a href="/portfolio/" aria-current={pagePath === "/portfolio/" ? "page" : undefined}>Portfolio</a>
          <a href="/about/" aria-current={pagePath === "/about/" ? "page" : undefined}>About</a>
          <a href="/contact/" aria-current={pagePath === "/contact/" ? "page" : undefined}>Contact</a>
        </nav>

        <a href="/contact/#contact" className="quote-btn">
          Get a Quote
        </a>
      </header>

      <main id="main" tabIndex="-1">
        {!home && <PageContent page={page} />}

        {/* HERO */}
        {(home) && (<section className="hero" id="home">
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
              <a href="/contact/#contact" className="primary-btn">
                Start a Project
              </a>

              <a href="/portfolio/" className="secondary-btn">
                View Our Work
              </a>
            </div>
          </div>

          <div className="hero-logo-wrap" aria-label="InnoFlowlink Tech company logo">
            <div className="hero-logo-ring">
              <img
                src="/innoflowlink-logo.jpg"
                width="360" height="360" fetchPriority="high" decoding="async"
                alt="InnoFlowlink Tech logo"
                className="hero-logo-image"
              />
            </div>
          </div>
        </section>)}


        {/* SERVICES */}
        {(home) && (<section className="section services" id="services">
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
            <ServiceCard number="07" title="Mobile App Development" text="Discuss Android and iOS workflows, booking features and backend integrations." />
            <ServiceCard number="08" title="Game Development" text="Plan a focused game prototype, core mechanics and a realistic release scope." />
          </div>
        </section>)}

        {/* WHAT WE BUILD */}
        {(home) && (<section className="section solutions">
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
        </section>)}



               {/* CASE STUDIES */}
        {(home || pagePath === "/portfolio/") && (<section className="section projects" id="projects">
          <SectionHeading
            label="Case Studies"
            title="Engineering Ideas Into Working Solutions"
            description="Explore two internal demonstration projects and their technical approach. These examples are not paid client case studies or independently audited products."
          />

          <div className="case-studies-grid">

            {/* BLOCKVAULT */}
            <article className="case-study-card">
              <div className="case-study-top">
                <span className="case-number">01</span>
                <span className="case-type">Blockchain • Web3</span>
              </div>

              <h3>BlockVault</h3>
              <p className="project-status">Internal demonstration project · Blockchain &amp; IPFS</p>

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
              <p className="project-status">Internal demonstration project · AI &amp; ML</p>

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
        </section>)}
               {/* TECH STACK */}
        {(home || pagePath === "/about/") && (<section className="section tech-stack" id="tech-stack">
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
        </section>)}


        {/* TEAM */}
        {(home || pagePath === "/about/") && (<section className="section team" id="about">
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
        </section>)}


        {/* DEVELOPMENT PROCESS */}
        {(home || pagePath === "/about/") && (<section className="section process" id="process">
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
        </section>)}


        {/* CONTACT / GET QUOTE */}
        {(home || pagePath === "/contact/") && (<section className="section contact" id="contact">
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


          <form className="quote-form" onSubmit={handleSubmit} aria-busy={submitting}>
  <p className="form-help">All fields except phone are required. Share your goals, essential features and preferred timeline. We’ll review the scope before quoting.</p>

  <div className="form-row">

    <div className="form-group">
      <label htmlFor="name">Name</label>

      <input
        autoComplete="name"
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
        autoComplete="email"
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
        autoComplete="tel"
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

        <option value="Website Development">Website Development</option>
        <option value="Android App Development">Android App Development</option>
        <option value="iOS App Development">iOS App Development</option>
        <option value="Full-Stack Web Application">Full-Stack Web Application</option>
        <option value="E-commerce Development">E-commerce Development</option>
        <option value="Game Development">Game Development</option>
        <option value="AI / Machine Learning">AI / Machine Learning</option>
        <option value="Data Science & Analytics">Data Science &amp; Analytics</option>
        <option value="Blockchain Development">Blockchain Development</option>
        <option value="UI/UX Design">UI/UX Design</option>
        <option value="API & Backend Development">API &amp; Backend Development</option>
        <option value="Software Testing & Maintenance">Software Testing &amp; Maintenance</option>
        <option value="Other">Other</option>
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
      <option value="Need guidance">Need guidance on budget</option>
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


  <button type="submit" className="submit-btn" disabled={submitting}>
    {submitting ? "Sending…" : "Request a quotation"}
  </button>

  {message.text && (
  <p role={message.type === "error" ? "alert" : "status"} className={`form-message ${message.type}`}>
    {message.text}
  </p>
)}
</form> 
          </div>
        </section>)}

      </main>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">
            <a href="/#home" className="logo">
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
              <h2>Company</h2>

              <a href="/about/">About</a>
              <a href="/#process">Process</a>
              <a href="/portfolio/">Projects</a>
            </div>


            <div>
              <h2>Services</h2>

              <a href="/web-development/">
                Web Development
              </a>

              <a href="/mobile-app-development/">Mobile App Development</a>
              <a href="/game-development/">Game Development</a>

              <a href="/ai-machine-learning/">
                AI / ML
              </a>
            </div>


            <div>
              <h2>Connect</h2>

              <a
                href="https://github.com/gogulaajay2004-design"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a href="/contact/#contact">
                Get a Quote
              </a>

              <a href="mailto:innoflowlink4202@gmail.com">
                innoflowlink4202@gmail.com
              </a>

              <a href="/#admin">
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
      <a className="case-link" href={title.includes("AI") || title.includes("Machine") ? "/ai-machine-learning/" : title.includes("Mobile") ? "/mobile-app-development/" : title.includes("Game") ? "/game-development/" : "/web-development/"}>Explore {title.toLowerCase()} →</a>

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


