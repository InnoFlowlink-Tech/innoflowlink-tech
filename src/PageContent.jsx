import { pages } from './pages.js';

const pageVisuals = {
  '/web-development/': {
    theme: 'web',
    number: '01',
    section: 'Services',
    breadcrumb: 'Web development',
    kicker: 'SERVICES / WEB DEVELOPMENT',
    accent: 'business workflow',
    title: 'A website shaped around your work',
    description: 'Bring the interface, data and everyday workflow into one clear product plan.',
    steps: [['Map', 'Pages & people'], ['Build', 'UI & systems'], ['Launch', 'Handover']],
    tags: ['Business websites', 'Web applications', 'Backend APIs'],
    primary: 'Discuss your website',
    secondary: 'View our work',
    secondaryHref: '/portfolio/',
    foot: 'WEB / PRODUCT',
  },
  '/mobile-app-development/': {
    theme: 'mobile',
    number: '02',
    section: 'Services',
    breadcrumb: 'Mobile apps',
    kicker: 'SERVICES / MOBILE APPS',
    accent: 'first release',
    title: 'A focused path from tap to task',
    description: 'Start with what people need to do on their phone, then shape the app around that journey.',
    steps: [['Journey', 'User needs'], ['Screens', 'Core actions'], ['Release', 'Device checks']],
    tags: ['Android', 'iOS', 'App workflows'],
    primary: 'Discuss your app requirements',
    secondary: 'View our work',
    secondaryHref: '/portfolio/',
    foot: 'MOBILE / PRODUCT',
  },
  '/ai-machine-learning/': {
    theme: 'ai',
    number: '03',
    section: 'Services',
    breadcrumb: 'AI & machine learning',
    kicker: 'SERVICES / AI & MACHINE LEARNING',
    accent: 'business problem',
    title: 'Start with a useful question',
    description: 'Connect the problem, available data and a practical way to evaluate an AI feature.',
    steps: [['Define', 'The task'], ['Evaluate', 'Real examples'], ['Integrate', 'Useful output']],
    tags: ['Prediction', 'Automation', 'AI integrations'],
    primary: 'Discuss your AI use case',
    secondary: 'See the demo projects',
    secondaryHref: '/portfolio/',
    foot: 'AI / EVALUATION',
  },
  '/game-development/': {
    theme: 'game',
    number: '04',
    section: 'Services',
    breadcrumb: 'Game development',
    kicker: 'SERVICES / GAME DEVELOPMENT',
    accent: 'first scope',
    title: 'Shape a game idea into a testable first scope',
    description: 'Focus the brief on the core play loop, target platform and the smallest useful prototype.',
    steps: [['Imagine', 'Core loop'], ['Prototype', 'Playable slice'], ['Review', 'Next scope']],
    tags: ['Game concepts', 'Prototypes', 'Platform planning'],
    primary: 'Discuss your game brief',
    secondary: 'Explore our services',
    secondaryHref: '/web-development/',
    foot: 'GAME / PROTOTYPE',
  },
  '/portfolio/': {
    theme: 'work',
    number: '05',
    section: 'Selected work',
    breadcrumb: 'Portfolio',
    kicker: 'SELECTED WORK / INTERNAL DEMOS',
    accent: 'demonstration projects',
    title: 'Explore our demonstration projects',
    description: 'Two internal builds explore blockchain file sharing and machine-learning system monitoring.',
    steps: [['BlockVault', 'Blockchain & IPFS'], ['AI Monitor', 'Metrics & ML'], ['Explore', 'Tools & approach']],
    tags: ['Internal demos', 'Project details', 'Technology choices'],
    primary: 'Discuss a project',
    secondary: 'Explore our services',
    secondaryHref: '/web-development/',
    foot: 'PROJECTS / LAB',
  },
  '/about/': {
    theme: 'team',
    number: '06',
    section: 'Company',
    breadcrumb: 'About us',
    kicker: 'INNOFLOWLINK TECH / OUR TEAM',
    accent: 'full product',
    title: 'A development team for the full product',
    description: 'Meet the people, technology and working process behind our web and software projects.',
    steps: [['Understand', 'Users & goals'], ['Create', 'Product & systems'], ['Deliver', 'Review & handover']],
    tags: ['Our team', 'Technology', 'How we work'],
    primary: 'Meet the team',
    primaryHref: '#about',
    secondary: 'See our process',
    secondaryHref: '#process',
    foot: 'TEAM / DELIVERY',
  },
  '/contact/': {
    theme: 'contact',
    number: '07',
    section: 'Contact',
    breadcrumb: 'Start a project',
    kicker: 'CONTACT / PROJECT ENQUIRY',
    accent: 'build',
    title: 'Tell us what you want to build next',
    description: 'Share the people you want to help, the work you need done and the features that matter first.',
    steps: [['Your idea', 'The problem'], ['Priorities', 'Key features'], ['Next step', 'Scope discussion']],
    tags: ['Project type', 'Budget guidance', 'Timeline'],
    primary: 'Go to the enquiry form',
    primaryHref: '#contact',
    secondary: 'Email the team',
    secondaryHref: 'mailto:innoflowlink4202@gmail.com',
    foot: 'CONTACT / PROJECT',
  },
};

function highlightHeading(title, accent) {
  const start = title.toLowerCase().lastIndexOf(accent.toLowerCase());
  if (start < 0) return title;
  return <>{title.slice(0, start)}<span>{title.slice(start)}</span></>;
}

export function PageContent({ page, pagePath = '/' }) {
  if (!page) {
    return (
      <section className="section page-404">
        <p className="page-kicker"><span />INNOFLOWLINK TECH / 404</p>
        <h1>We couldn’t find that page.</h1>
        <p>This address does not match a public page.</p>
        <a className="primary-btn" href="/">Return to the homepage</a>
      </section>
    );
  }

  const visual = pageVisuals[pagePath] || pageVisuals['/web-development/'];
  const servicePages = Object.entries(pages).filter(([, item]) => item.cta && item !== page);
  const actionHref = visual.primaryHref || (page.cta ? '/contact/#contact' : '/contact/#contact');

  return (
    <>
      <section className={`section page-intro route-hero route-hero--${visual.theme}`} aria-labelledby="route-page-title">
        <div className="route-hero-copy">
          <div className="route-breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>{visual.breadcrumb}</span></div>
          <p className="page-kicker"><span />{visual.kicker}</p>
          <h1 id="route-page-title">{highlightHeading(page.heading, visual.accent)}</h1>
          <p className="route-hero-intro">{page.intro}</p>
          <div className="route-hero-actions">
            <a className="primary-btn" href={actionHref}>{page.cta || visual.primary}</a>
            <a className="secondary-btn" href={visual.secondaryHref}>{visual.secondary}</a>
          </div>
          <div className="route-tags" aria-label="Page topics">
            {visual.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div className={`route-visual route-visual--${visual.theme}`} aria-hidden="true">
          <div className="route-orbit" />
          <article className="route-product-window">
            <div className="route-product-bar">
              <span className="route-product-mark">IF</span>
              <span>{visual.section.toLowerCase()} / system</span>
              <b><i /> IN MOTION</b>
            </div>
            <div className="route-product-content">
              <small className="route-map-label">BUILD MAP / {visual.number}</small>
              <h2>{visual.title}</h2>
              <p>{visual.description}</p>
              <div className="route-flow">
                {visual.steps.map(([title, detail], index) => (
                  <div className="route-flow-step" key={title}>
                    <small>0{index + 1}</small>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="route-product-foot"><span>INNOFLOWLINK TECH</span><span>{visual.foot}</span></div>
          </article>
        </div>
      </section>

      {page.sections?.length > 0 && (
        <section className="section route-detail-section" aria-labelledby="route-details-title">
          <div className="section-heading route-section-heading">
            <p>HOW WE APPROACH THE WORK</p>
            <h2 id="route-details-title">Make the important parts clear.</h2>
            <span>Start with the people and workflow, then agree on what the first release needs to do.</span>
          </div>
          <div className="route-detail-grid">
            {page.sections.map(([heading, text], index) => (
              <article className="route-detail-card" key={heading}>
                <span className="route-detail-number">0{index + 1}</span>
                <h3>{heading}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {page.questions?.length > 0 && (
        <section className="section faq route-faq" aria-labelledby="route-faq-title">
          <div className="section-heading route-section-heading">
            <p>PROJECT QUESTIONS</p>
            <h2 id="route-faq-title">A few things to plan early.</h2>
            <span>Every project has its own requirements. These answers can help you prepare for a first conversation.</span>
          </div>
          <div className="route-faq-list">
            {page.questions.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {page.sections?.length > 0 && (
        <section className="section related-services" aria-labelledby="related-services-title">
          <div className="section-heading route-section-heading">
            <p>KEEP EXPLORING</p>
            <h2 id="related-services-title">Related ways we can help.</h2>
            <span>Explore another service or share your requirements with the team.</span>
          </div>
          <div className="route-related-grid">
            {servicePages.map(([path, item], index) => (
              <a className="route-related-card" href={path} key={path}>
                <span>0{index + 1}</span>
                <strong>{item.title.split(' | ')[0]}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
          <a className="case-link route-contact-link" href="/contact/#contact">Talk through your project →</a>
        </section>
      )}
    </>
  );
}
