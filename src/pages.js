// One source for public routes, page copy, metadata and the sitemap.
export const origin = 'https://innoflowlink-tech.onrender.com';
export const pages = {
  '/': {
    title: 'InnoFlowlink Tech | Web, App & AI Development',
    description: 'Explore web development, mobile apps, AI solutions and software services from InnoFlowlink Tech. View our demo projects and discuss your requirements.',
  },
  '/web-development/': {
    title: 'Web Development Services | InnoFlowlink Tech',
    heading: 'Web development built around your business workflow',
    description: 'Plan a business website, e-commerce platform or full-stack application with InnoFlowlink Tech. Discuss your pages, integrations and quotation.',
    intro: 'A useful website gives visitors a clear next step and gives your team a manageable way to run the business behind it. We work on business websites, full-stack applications, dashboards and backend APIs.',
    sections: [
      ['Choose the right starting point', 'For an enquiry website, begin with your services, project examples and a contact flow. For an online store, map the catalog, cart, checkout and order management. For an internal tool, identify the users, permissions and daily tasks before adding screens.'],
      ['Connect the interface to the work', 'A project can include responsive React interfaces, Python or Node.js APIs and database integration. Authentication, payment providers and email notifications need their own requirements and testing. We agree which integrations belong in the first release.'],
      ['Make the handover practical', 'Discuss hosting ownership, deployment access, source code, documentation and support as part of the scope. Include mobile checks and important user journeys in acceptance criteria so delivery can be reviewed against the agreed requirements.'],
    ],
    questions: [['What should I send for an estimate?', 'Share the pages or workflows you need, example sites, existing branding, required integrations and a preferred launch window. If the feature list is unclear, start with the problem you want to solve.'], ['Can you work with an existing backend?', 'Share its public API documentation and describe the change you need. Compatibility, access and testing requirements should be assessed before a quotation is agreed.']],
    cta: 'Discuss your website',
  },
  '/mobile-app-development/': {
    title: 'Mobile App Development | InnoFlowlink Tech',
    heading: 'Plan a mobile app with a focused first release',
    description: 'Discuss Android and iOS app requirements with InnoFlowlink Tech, including customer journeys, booking features, backend APIs and an MVP scope.',
    intro: 'A mobile app starts with a repeatable task people need to complete on their phone. Tell us whether that task is browsing products, making a booking or managing a service, and which platform your users need first.',
    sections: [
      ['Map the complete customer journey', 'Define the steps from sign-in to the main action and its confirmation. A booking app may also need cancellations and booking history; a shopping app may need order status and support. These flows help identify what is essential for launch.'],
      ['Include the operational side', 'Customer screens often depend on a business dashboard, authentication and backend APIs. Location, notifications and payments introduce permissions and third-party services. List these dependencies early so their costs and responsibilities are visible.'],
      ['Agree how release readiness is checked', 'Choose target devices and platform versions, then define checks for navigation, slow connections and failed requests. Store accounts, privacy disclosures, assets and review time need planning. Store approval is controlled by the platform.'],
    ],
    questions: [['Should the first version support both Android and iOS?', 'That depends on the audience, budget and maintenance plan. Starting with the platform your users already use can reduce the first release scope.'], ['What affects an app quotation?', 'The number of user roles, screens, backend features, integrations and device tests all affect the work. Send a simple journey and must-have list to begin a scope discussion.']],
    cta: 'Discuss your app requirements',
  },
  '/ai-machine-learning/': {
    title: 'AI & Machine Learning Solutions | InnoFlowlink Tech',
    heading: 'AI and machine learning for a defined business problem',
    description: 'Explore prediction, anomaly detection and AI integration with InnoFlowlink Tech. See our internal monitoring demo and discuss data and evaluation needs.',
    intro: 'Useful AI work begins with the decision or task you want to improve. We discuss prediction, anomaly detection, automation and generative AI integrations in the context of the data and workflow available.',
    sections: [
      ['Start with the data and a baseline', 'Describe where your data comes from, whether it is usable for the task and how success will be measured. A simple baseline makes it easier to judge whether a model adds value. Avoid committing to an accuracy target before evaluating representative data.'],
      ['Build an evaluation into the prototype', 'Test predictions against held-out examples and inspect mistakes. For an assistant, identify supported questions, source material and situations that require human review. Usage cost, response time and information handling should be considered alongside model output.'],
      ['See the approach in a demonstration', 'Our AI System Monitor is an internal demonstration using Python, Streamlit and machine learning to examine system metrics, short-term resource predictions and anomalies. It illustrates a technical workflow; it does not establish results for a client’s data.'],
    ],
    questions: [['Do I need a large dataset?', 'The data needed depends on the task. Some integrations use existing models, while custom prediction needs relevant historical examples. Begin by describing the available data without sharing private records.'], ['Can you guarantee model accuracy?', 'No fixed accuracy is promised before evaluation. Agree the baseline, test data and acceptance criteria as part of the project scope.']],
    cta: 'Discuss your AI use case',
  },
  '/game-development/': {
    title: 'Game Development Planning & Prototypes | InnoFlowlink Tech',
    heading: 'Turn a game idea into a testable first scope',
    description: 'Discuss a game prototype with InnoFlowlink Tech. Define the core loop, target platform, assets, multiplayer needs and acceptance criteria.',
    intro: 'A game brief needs more than a genre and a list of features. Start with what the player does repeatedly, why that is enjoyable and how a small prototype will test the idea. Contact us to assess the requirements and feasibility.',
    sections: [
      ['Define one playable loop', 'Describe the controls, camera, rules, win condition and intended session length. Choose a small slice that can be reviewed through play. Additional modes, progression and cosmetic systems can then be considered separately.'],
      ['Separate assets and online systems', 'Art, animation, audio and interface assets need a clear ownership and licensing plan. Multiplayer introduces synchronization, hosting and abuse prevention. These requirements should be assessed independently from an offline prototype.'],
      ['Scope before committing to a release', 'Agree target devices, performance expectations, test scenarios and required specialist work. The portfolio currently shows internal software demonstrations; it does not claim a released commercial game. A quotation depends on a review of the game brief.'],
    ],
    questions: [['Can the first version include every game mode?', 'Prioritize the core loop and one initial mode. More modes increase the design, asset and testing work and should be estimated separately.'], ['What should a game brief include?', 'Send the target platform, genre, player perspective, core mechanics, offline or online requirements and references. Identify any assets you already own and your budget range.']],
    cta: 'Discuss your game brief',
  },
  '/portfolio/': {
    title: 'Portfolio & Internal Demo Projects | InnoFlowlink Tech',
    heading: 'Explore our internal demonstration projects',
    description: 'Read about BlockVault and AI System Monitor: internal demonstrations of blockchain file sharing, backend integration and machine learning workflows.',
    intro: 'These examples explain the problems explored and the technologies used. They are internal demonstrations, not paid client endorsements. No client outcomes, security certifications or measured business gains are claimed.',
  },
  '/about/': {
    title: 'About Our Development Team | InnoFlowlink Tech',
    heading: 'A development team working across the full product',
    description: 'Meet the InnoFlowlink Tech team and explore our frontend, backend, Python, Java and AI skills, technology choices and development process.',
    intro: 'InnoFlowlink Tech brings together four developers working across interfaces, backend systems, integrations and client communication. Our process starts by understanding the users and agreeing a scope that can be reviewed and tested.',
  },
  '/contact/': {
    title: 'Contact & Request a Quotation | InnoFlowlink Tech',
    heading: 'Tell us what you want to build',
    description: 'Contact InnoFlowlink Tech to discuss a website, mobile app, AI solution or game project. Share your requirements and budget to request a quotation.',
    intro: 'Use the form below to describe your users, essential features and preferred timeline. Choose a budget range or ask for guidance. We’ll use your contact details to respond to your enquiry and discuss the scope before an estimate is agreed.',
  },
};
export function normalizePath(path) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}
