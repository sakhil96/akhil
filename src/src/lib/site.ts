export type SiteBadge = {
  label: string;
  tone?: 'accent' | 'muted' | 'success' | 'warning';
};

export type ShowcaseProject = {
  id: string;
  name: string;
  kicker: string;
  problem: string;
  build: string;
  result: string;
  href?: string;
  span?: 'wide' | 'tall' | 'default';
};

export type CaseStudyPreview = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  href: string;
};

export const site = {
  meta: {
    title: 'Akhil Adapala — production ML, safety, and systems',
    description:
      'Senior software engineer in Bengaluru working on model safety, agentic systems, and production Java backends. Currently at PayPal.',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aakhil.vercel.app',
  },
  profile: {
    name: 'Akhil Adapala',
    role: 'Senior Software Engineer, AI Tech',
    location: 'Bengaluru, India',
    email: 'akhilsambasiva@gmail.com',
    imageUrl: '/public/profile.jpg',
    imageAlt: 'Akhil Adapala portrait',
    links: {
      linkedin: 'https://www.linkedin.com/in/akhil-adapala-57b6bba5/',
      github: 'https://github.com/sakhil96',
    },
  },
  hero: {
    kicker: 'Bengaluru · PayPal',
    headlineLead: 'The model is the easy part.',
    headlineEmphasis: 'I work on everything around it.',
    subheadline:
      'Safety evaluations, agent workflows, and Java systems that have to hold under real traffic. Eight years from public-sector backends to inference at PayPal.',
    primaryCta: 'Ask me anything',
    secondaryCta: 'See selected work',
  },
  sections: [
    { id: 'work', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  workIntro: {
    eyebrow: 'Work',
    title: 'A career spent making systems trustworthy when they meet the world.',
    body: 'The through-line is not a stack. It is the habit of putting models, services, and people in the same picture — then making that picture hold.',
  },
  experience: [
    {
      role: 'Senior Software Engineer, AI Tech',
      company: 'PayPal',
      period: 'Dec 2022 — Present',
      highlights: [
        'I run the serving path for real-time risk models: latency budgets, progressive rollouts, and an audit trail that makes a release defensible.',
        'Cloud migration here meant shadow traffic and then a cutover — not a slide about Kubernetes.',
        'I also write the internal tooling so onboarding a model is a path, not folklore.',
      ],
    },
    {
      role: 'Senior Software Engineer',
      company: 'Oracle',
      period: 'Nov 2021 — Nov 2022',
      highlights: [
        'Full-stack on enterprise marketing: Java services and the screens operators actually used.',
        'A lot of unglamorous reliability — persistence, APIs, pages that could not flake mid-campaign.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'TCS',
      period: 'Dec 2017 — Oct 2021',
      highlights: [
        'Public-sector workflows with role-based access and long memories.',
        'Backend and UI, start to finish. That is where the Java habit formed.',
      ],
    },
  ],
  focusTiles: [
    {
      id: 'seal',
      kicker: 'Model safety',
      title: 'Project Seal',
      body: 'Red-team the agent. Score the trajectory it actually took. Catch the failure before a user does. Seal is that evaluation loop — not a slogan about responsible AI.',
    },
    {
      id: 'aws',
      kicker: 'Cloud shape',
      title: 'Two AWS habits I keep',
      body: 'The ML Engineer path: data, training, hosting, drift. The GenAI Developer path: retrieval, agents, tool-calling, guardrails. I design as if both have to live on the same account.',
    },
    {
      id: 'agents',
      kicker: 'Agents',
      title: 'Workflows that survive users',
      body: 'Tool use, memory, hand-offs, and a human in the loop when the model should not decide. Agentic systems fail in production the same way services do — quietly, then all at once.',
    },
    {
      id: 'java',
      kicker: 'Backend',
      title: 'Java, still the spine',
      body: 'Spring Boot, persistence, queues, and APIs that stay boring on purpose. The models change. The service contracts should not.',
    },
  ],
  skills: [
    {
      group: 'Safety & evaluation',
      items: ['Red-teaming', 'Trajectory evals', 'Guardrails', 'Shadow validation'],
    },
    {
      group: 'Agents & product',
      items: ['Agent orchestration', 'Tool calling', 'Product architecture', 'Operator UX'],
    },
    {
      group: 'Backend',
      items: ['Java', 'Spring Boot', 'REST', 'SQL', 'Hibernate/JPA'],
    },
    {
      group: 'Cloud',
      items: ['AWS GenAI & ML patterns', 'GCP', 'GKE', 'Kubernetes', 'Docker'],
    },
  ],
  projectsIntro: {
    eyebrow: 'Selected work',
    title: 'Hackathons, architecture, and the safety work in between.',
    body: 'Hover a card for the short version — what was wrong, what we built, what changed. No bullet theatre.',
  },
  projects: [
    {
      id: 'student-success',
      name: 'Student Success Intelligence',
      kicker: 'upGrad × Microsoft · Agentic AI Hackathon',
      problem:
        'Faculty get dashboards. Students still slip. Progress, struggle, and drop-off live in different tools, so the next intervention is a guess.',
      build:
        'An agent stack that reads those signals and routes a next action — not another chart. Built for the upGrad × Microsoft Agentic AI Hackathon.',
      result:
        'A working picture of student success as a workflow: observe, decide, intervene. The kind of agent system that has somewhere to put a human.',
      span: 'wide',
    },
    {
      id: 'productgravity',
      name: 'ProductGravity',
      kicker: 'Product architecture',
      problem:
        'Teams ship screens before they decide what the product is allowed to be. Data, agents, and the human loop get designed in three different rooms.',
      build:
        'Architecture for ProductGravity: one picture for the system — what decides, what merely executes, and where a person has to stay in the loop.',
      result:
        'A product that can grow without collapsing into a pile of features. The design is the constraint, not the decoration.',
      span: 'wide',
    },
    {
      id: 'seal',
      name: 'Project Seal',
      kicker: 'Trajectory evaluation',
      problem:
        'A single-turn eval will bless an agent that fails three tools later. Safety work that only looks at the last answer is theatre.',
      build:
        'Red-team prompts plus trajectory scoring: the path, the tools, the moment it went wrong. Seal is that harness.',
      result:
        'Failures show up as a story you can debug, not a red number on a leaderboard.',
    },
    {
      id: 'smartwealth',
      name: 'SmartWealth',
      kicker: 'AI Adapt Hackathon · Winner',
      problem:
        'PayPal already sees how money moves. Investing products usually ignore that and start from a risk questionnaire.',
      build:
        'A one-tap investing concept inside PayPal — goals, risk, ETFs and savings — using money-movement context without pretending it is advice.',
      result:
        'Won the AI Adapt Hackathon. The pitch was a product, not a model card.',
      href: '/case-studies/smartwealth',
    },
    {
      id: 'cursor-busters',
      name: 'Cursor Hackathon · 1st',
      kicker: 'Team Busters',
      problem:
        'AI workflows were a pile of prompts, tabs, and hope. Shipping meant stitching.',
      build:
        'A single path from idea to running software — the unglamorous orchestration, not a chat skin.',
      result:
        'First place. The demo was fast because the system was one piece.',
      href: '/case-studies/cursor-hackathon',
    },
    {
      id: 'cursor-impact',
      name: 'Cursor Hackathon · 2nd',
      kicker: 'Engineering impact',
      problem:
        'Impact lived in five tools. Prioritisation was a meeting.',
      build:
        'One view of engineering signal that a lead could actually use on a Monday.',
      result:
        'Second place in the same hackathon. Two podiums, two different jobs.',
      href: '/case-studies/cursor-hackathon',
    },
  ] satisfies ShowcaseProject[],
  caseStudies: [
    {
      slug: 'cursor-hackathon',
      title: 'Cursor Hackathon',
      subtitle: '1st & 2nd place',
      summary: 'Two builds in one weekend: an AI workflow that actually shipped, and a cockpit for engineering impact.',
      tags: ['AI tooling', 'Platform', 'Hackathon'],
      href: '/case-studies/cursor-hackathon',
    },
    {
      slug: 'smartwealth',
      title: 'SmartWealth',
      subtitle: 'AI Adapt winner',
      summary: 'Investing, designed as a PayPal motion — one tap, a dollar, and context the company already has.',
      tags: ['Fintech', 'Product', 'Hackathon'],
      href: '/case-studies/smartwealth',
    },
  ] satisfies CaseStudyPreview[],
  cursorCaseStudy: {
    title: 'Cursor Hackathon — 1st & 2nd place',
    subtitle: 'Two different problems, same weekend, neither of them a chatbot reskin.',
    teams: [
      {
        name: 'Team Busters — 1st place',
        problem:
          'AI work was scattered across prompts, files, and deploy steps. Teams lost time stitching a workflow that should have been one path.',
        approach:
          'We designed a single run from idea to something running — the orchestration and the screens, not a pile of tabs.',
        outcome:
          'A demo that was fast because the system was one piece. First place.',
        why: 'Speed is a design problem. The model was not the product.',
      },
      {
        name: 'Engineering Impact Platform — 2nd place',
        problem:
          'Engineering impact lived in too many tools. Prioritisation became a meeting with slides.',
        approach:
          'One cockpit: the signals a lead actually needs on a Monday, ranked and readable.',
        outcome:
          'Second place, same hackathon. A different job than the first-place build.',
        why: 'Teams move when they can see the work, not when they are told to be data-driven.',
      },
    ],
    builtWithCursor: [
      'Map the workflow as a system, not a prompt chain.',
      'Draft the operator path — where a human still has to decide.',
      'Cut the copy until a judge can understand it in one pass.',
    ],
  },
  smartwealthCaseStudy: {
    title: 'SmartWealth',
    subtitle: 'AI-powered investing inside PayPal — AI Adapt Hackathon winner',
    hero: 'SmartWealth treats investing as a PayPal motion: one tap, a dollar minimum, and the money-movement context the company already has. The idea was to stop pretending PayPal is only a place you pay, and start treating it as a place wealth can live.',
    uniqueAdvantage:
      'PayPal already sees how money moves. That is a better starting point than a generic risk quiz. Used carefully, it supports goals, timing, and explanations a person can actually read — without claiming to be a replacement for advice.',
    vision:
      'Frictionless on purpose. ETFs, crypto, high-yield savings, sitting next to the balance people already check. Accessible at a dollar. Honest about risk.',
    experienceJourney: [
      'Set a goal and a timeline. One dollar is enough to start.',
      'Say how much uncertainty you can live with. Show the tradeoff, not a score.',
      'Get a mix with guardrails, written in plain language.',
      'Stay in the loop: nudges you can explain, rebalancing you can see.',
    ],
    aiApproach: [
      'Goal profiles that can change when life does.',
      'Risk, named as tradeoffs, with diversification as a default.',
      'Suitability checks and disclosures before a cheerful recommendation.',
      'Explanations in the same language as the rest of PayPal.',
      'Watch for drift and for guidance that should not have been given.',
    ],
    whyPayPalWins: [
      'Hundreds of millions of people already open the app. Distribution is not the problem.',
      'Payment volume is a behavioural signal most brokerages would buy and cannot.',
      'A long trust record. A new fintech has to rent that; PayPal already has it.',
    ],
    role: [
      'Owned the story: what the product is, and what it is not.',
      'Designed the system and the path a person would take.',
      'Wrote the demo so an executive could follow it without a glossary.',
    ],
    nextBuild: [
      'MVP: goal onboarding, a risk control, starter ETF bundles.',
      'Safety: suitability, disclosures, a kill-switch for bad guidance.',
      'Then measure activation, funded accounts, and whether people still trust it in month three.',
    ],
    disclaimer:
      'A hackathon concept and pitch — not an official PayPal product.',
  },
  notes: [
    {
      kicker: 'Talk',
      title: 'PayPal × Google Cloud Summit',
      body: 'A public, high-level look at running inference in a cloud-native setup. Patterns, not internals.',
    },
  ],
  contact: {
    headline: 'If the work sounds like a fit, write.',
    subheadline:
      'Roles that live between models and production. Safety, agents, platforms. Bengaluru, and remote when it is real work.',
  },
};
