import { pages } from './pages.js';

export function PageContent({ page }) {
  if (!page) return <section className="section page-intro"><h1>Page not found</h1><p>This address does not match a public page.</p><a className="case-link" href="/">Return to the homepage</a></section>;
  return <>
    <section className="section page-intro">
      <p className="eyebrow"><a href="/">InnoFlowlink Tech</a></p>
      <h1>{page.heading}</h1>
      <p>{page.intro}</p>
      {page.cta && <div className="hero-buttons"><a className="primary-btn" href="/contact/#contact">{page.cta}</a><a className="secondary-btn" href="/portfolio/">Explore demo projects</a></div>}
    </section>
    {page.sections && <>
      <section className="section detail-content" aria-label="Service details">
        {page.sections.map(([heading, text]) => <article key={heading}><h2>{heading}</h2><p>{text}</p></article>)}
      </section>
      <section className="section faq"><h2>Planning your project</h2>{page.questions.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
      <section className="section related-services"><h2>Explore related services</h2><ul>{Object.entries(pages).filter(([, item]) => item.cta && item !== page).map(([path, item]) => <li key={path}><a href={path}>{item.title.split(' | ')[0]}</a></li>)}</ul><a className="case-link" href="/contact/#contact">Request a consultation and quotation →</a></section>
    </>}
  </>;
}
