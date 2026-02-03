export type SiteBadge = {
  label: string;
  tone?: 'accent' | 'muted' | 'success' | 'warning';
};

export type TerminalCommand = {
  command: string;
  description: string;
  output: string[];
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
    title: 'Akhil Adapala — AI Inference Control Room',
    description:
      'Award-winning product designer and senior software engineer building AI-first platforms with product-grade execution.',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.com',
  },
  profile: {
    name: 'Akhil Adapala',
    role: 'Senior Software Engineer, AI Tech',
    location: 'Hyderabad, India',
    email: 'akhilsambasiva@gmail.com',
    imageUrl: '/public/profile.jpg',
    imageAlt: 'Akhil Adapala portrait',
    links: {
      linkedin: 'https://www.linkedin.com/in/akhil-adapala-57b6bba5/',
      github: 'https://github.com/sakhil96',
    },
  },
  hero: {
    headline: 'Control Room for AI Inference + Product Thinking',
    subheadline:
      'Award-winning product designer and senior software engineer shipping AI-first platforms with product-grade execution.',
    badges: [
      { label: 'Cursor Hackathon Winner', tone: 'accent' },
      { label: 'AI Adapt Hackathon Winner', tone: 'success' },
      { label: 'PayPal × Google Cloud Summit', tone: 'muted' },
      { label: 'Top ___', tone: 'warning' },
    ],
  },
  sections: [
    { id: 'system', label: 'System Snapshot' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'wins', label: 'Trophy Cabinet' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],
  systemSnapshot: [
    { label: 'Experience', value: '8+ years' },
    { label: 'Focus', value: 'AI inference platforms' },
    { label: 'Cloud', value: 'GCP + Kubernetes' },
    { label: 'Languages', value: 'Java, TypeScript, SQL' },
  ],
  terminal: {
    prompt: 'control-room',
    commands: [
      {
        command: 'help',
        description: 'List available commands',
        output: [
          'wins — trophy highlights',
          'smartwealth SmartWealth case study',
          'aiadapt Same as smartwealth',
          'cursor — Cursor Hackathon case',
          'projects — platform builds',
          'stack — core skills',
          'contact — reach me',
        ],
      },
      {
        command: 'wins',
        description: 'Show hackathon wins',
        output: [
          'Cursor Hackathon — 1st Place (Team Busters)',
          'Cursor Hackathon — 2nd Place (Engineering Impact Platform)',
          'AI Adapt Hackathon — SmartWealth',
        ],
      },
      {
        command: 'smartwealth',
        description: 'Show SmartWealth summary',
        output: [
          'SmartWealth — AI-powered investing inside PayPal',
          'Winner: AI Adapt Hackathon',
          'Idea: money-movement signal → responsible personalization',
          'Open: /case-studies/smartwealth',
        ],
      },
      {
        command: 'aiadapt',
        description: 'Alias for smartwealth',
        output: [
          'SmartWealth — AI-powered investing inside PayPal',
          'Winner: AI Adapt Hackathon',
          'Idea: money-movement signal → responsible personalization',
          'Open: /case-studies/smartwealth',
        ],
      },
      {
        command: 'cursor',
        description: 'Show Cursor Hackathon summary',
        output: [
          'Built AI-first workflows that ship fast.',
          'Two podium wins in one hackathon.',
          'Case study: /case-studies/cursor-hackathon',
        ],
      },
      {
        command: 'projects',
        description: 'Show selected projects',
        output: [
          'Inference Control Plane — low-latency scoring platform',
          'MCP Tooling — developer workflows for AI ops',
          'Risk Signal Observatory — model health + drift insights',
        ],
      },
      {
        command: 'stack',
        description: 'Show core stack',
        output: [
          'Java, TypeScript, Spring Boot, Next.js',
          'GKE, Kubernetes, Docker',
          'MLOps pipelines, monitoring, guardrails',
        ],
      },
      {
        command: 'contact',
        description: 'Show contact info',
        output: [
          'Email: akhilsambasiva@gmail.com',
          'LinkedIn: linkedin.com/in/akhil-adapala-57b6bba5',
          'GitHub: github.com/sakhil96',
        ],
      },
    ] satisfies TerminalCommand[],
  },
  trophies: [
    {
      title: 'Cursor Hackathon — 1st Place (Team Busters)',
      tags: ['AI tooling', 'Developer velocity'],
      bullets: [
        'Problem: teams lose time stitching AI workflows.',
        'Built: a fast control room that unified prompt → build → deploy.',
        'Result: shipped a crisp demo that won 1st place.',
      ],
      href: '/case-studies/cursor-hackathon',
      cta: 'Read case study →',
    },
    {
      title: 'Cursor Hackathon — 2nd Place (Engineering Impact Platform)',
      tags: ['Platform analytics', 'Decision support'],
      bullets: [
        'Problem: impact visibility was fragmented across systems.',
        'Built: a unified engineering cockpit for impact signals.',
        'Result: clearer prioritization with platform-grade UX.',
      ],
      href: '/case-studies/cursor-hackathon',
      cta: 'Read case study →',
    },
    {
      title: 'AI Adapt Hackathon — Winner',
      when: '2025',
      subtitle: 'SmartWealth — AI-powered investing inside PayPal',
      tags: ['Hackathon Winner', 'AI Product', 'Fintech', 'Personalization'],
      bullets: [
        'Presented SmartWealth: AI-powered investing inside PayPal with one-tap onboarding, $1 minimum, and ETFs/crypto/high-yield savings.',
        'Core insight: PayPal’s money-movement signal enables responsible personalization with goals, risk context, and explainable guidance.',
        'Strategy: use PayPal distribution and trust to move from transactions to lifelong financial relationships (hackathon concept).',
      ],
      href: '/case-studies/smartwealth',
      cta: 'Read case study →',
    },
  ],
  caseStudies: [
    {
      slug: 'cursor-hackathon',
      title: 'Cursor Hackathon',
      subtitle: '1st & 2nd Place',
      summary:
        'Two winning builds that turn AI workflows into platform-grade execution.',
      tags: ['AI tooling', 'Platform UX', 'Hackathon'],
      href: '/case-studies/cursor-hackathon',
    },
    {
      slug: 'smartwealth',
      title: 'SmartWealth',
      subtitle: 'AI Adapt Hackathon Winner',
      summary:
        'A one-tap investing experience leveraging the world’s richest money-movement signal.',
      tags: ['Fintech', 'AI product', 'Vision'],
      href: '/case-studies/smartwealth',
    },
  ] satisfies CaseStudyPreview[],
  projects: [
    {
      name: 'Inference Control Plane',
      description:
        'Low-latency orchestration for real-time risk scoring and model execution.',
      tags: ['Platform', 'Reliability', 'Latency'],
    },
    {
      name: 'MCP Tooling',
      description:
        'Developer workflows that standardize onboarding, config validation, and deployments.',
      tags: ['Tooling', 'Ops', 'Automation'],
    },
    {
      name: 'Signal Observatory',
      description:
        'Monitoring and guardrails for model health, drift, and incident response.',
      tags: ['MLOps', 'Observability', 'Safety'],
    },
  ],
  experience: [
    {
      role: 'Senior Software Engineer, AI Tech',
      company: 'PayPal',
      period: 'Dec 2022 — Present',
      highlights: [
        'Build AI inference platforms for real-time risk scoring at scale.',
        'Drive cloud-native migration with audit/shadow validation and safe rollouts.',
        'Deliver platform tooling that speeds up model onboarding.',
      ],
    },
    {
      role: 'Senior Software Engineer',
      company: 'Oracle',
      period: 'Nov 2021 — Nov 2022',
      highlights: [
        'Shipped full-stack features for enterprise marketing workflows.',
        'Built reliable Java services and responsive web modules.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'TCS',
      period: 'Dec 2017 — Oct 2021',
      highlights: [
        'Delivered public-sector workflows with secure, role-based UX.',
        'Owned end-to-end delivery across backend and UI modules.',
      ],
    },
  ],
  skills: [
    {
      group: 'Product + Design',
      items: ['Product strategy', 'System thinking', 'UX flows', 'Prototyping'],
    },
    {
      group: 'Frontend',
      items: ['Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Oracle JET', 'jQuery'],
    },
    {
      group: 'Backend + MLOps',
      items: [
        'Java',
        'Spring Boot',
        'Hibernate/JPA',
        'REST APIs',
        'SQL',
        'MySQL',
        'ActiveMQ',
        'Nginx',
        'Gradle',
        'Git',
      ],
    },
    {
      group: 'Cloud + DevOps',
      items: ['GCP', 'GKE', 'Kubernetes', 'Docker', 'Observability'],
    },
  ],
  cursorCaseStudy: {
    title: 'Cursor Hackathon — 1st & 2nd Place',
    subtitle:
      'Two award-winning builds that made AI workflows feel effortless and scalable.',
    teams: [
      {
        name: 'Team Busters — 1st Place',
        problem:
          'AI workflows were fragmented and slow to operationalize across teams.',
        approach:
          'Designed a control-room experience that stitched prompts, assets, and deployment signals into one flow.',
        outcome:
          'Delivered a cohesive demo that showcased speed, clarity, and platform readiness.',
        why: 'Great AI products need a command center—this proved the model.',
      },
      {
        name: 'Engineering Impact Platform — 2nd Place',
        problem:
          'Engineering impact data was scattered, making prioritization unclear.',
        approach:
          'Built a unified cockpit for impact signals with clear ranking and storytelling.',
        outcome:
          'Improved decision velocity with a single source of truth UX.',
        why: 'Teams move faster when impact is visible and trusted.',
      },
    ],
    builtWithCursor: [
      'Generate an architecture that maps signals → inference → outcome.',
      'Draft a clean UX flow for command-center navigation.',
      'Refine copy to be executive-level and launch-ready.',
    ],
  },
  smartwealthCaseStudy: {
    title: 'SmartWealth',
    subtitle: 'AI-powered investing inside PayPal (AI Adapt Hackathon Winner)',
    hero:
      'SmartWealth turns PayPal’s money-movement signal into a trusted, one-tap investing experience that feels as simple as paying someone. It reframes PayPal from a payments utility into a lifelong wealth partner.',
    uniqueAdvantage:
      'PayPal sees how money moves across everyday life, creating a signal rich enough to personalize goals, risk, and timing. That context enables safer guidance than generic portfolios, at public scale. It is an advantage new fintechs cannot easily replicate.',
    vision:
      'AI-powered investing inside PayPal—frictionless, intuitive, and accessible. One tap. $1 minimum. ETFs, crypto, and high-yield savings inside the platform people already trust.',
    experienceJourney: [
      'Set goal: choose a target and timeline with a $1 minimum.',
      'Confirm risk: calibrate comfort with clear tradeoffs.',
      'Get portfolio: receive a diversified mix with guardrails.',
      'Ongoing guidance: explainable nudges and steady rebalancing.',
    ],
    aiApproach: [
      'Goal-based profiles that adapt to life context.',
      'Risk calibration with diversification guardrails.',
      'Suitability checks and disclosure-aware nudges.',
      'Explainability with plain-language rationale.',
      'Monitoring for drift and unsafe guidance.',
    ],
    whyPayPalWins: [
      '435M+ users (approx.) → built-in distribution with near-zero CAC.',
      '$1.6T+ annual payment volume (approx.) → unmatched behavioral signal.',
      '25 years of global trust → a foundation no new fintech can recreate.',
    ],
    role: [
      'Owned the pitch narrative and product framing.',
      'Designed the system and UX concept end-to-end.',
      'Crafted the demo story for executive clarity.',
    ],
    nextBuild: [
      'MVP: goal-based onboarding, risk slider, starter ETF bundles.',
      'Safety/compliance: suitability checks, disclosures, guardrails.',
      'Experimentation: activation, funded rate, retention, trust signals.',
    ],
    disclaimer:
      'Note: This was a hackathon concept/pitch, not an official PayPal product announcement.',
  },
  contact: {
    headline: 'Let’s build the next control room.',
    subheadline:
      'Open to collaborations on AI-first systems, product strategy, and platform UX.',
  },
};
