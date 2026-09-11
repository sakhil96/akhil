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

export type StoryCard = {
  title: string;
  kicker: string;
  year?: string;
  tags: string[];
  problem: string;
  build: string;
  result: string;
  href?: string;
};

export const site = {
  meta: {
    title: 'Akhil Adapala — ML engineer, Bengaluru',
    description:
      'Staff-shaped machine learning engineer in Bengaluru. Model safety, agentic workflows, and Java systems that hold up in production.',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.com',
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
    kicker: 'Bengaluru · PayPal AI Tech',
    headline: 'I build the production side of machine learning.',
    subheadline:
      'Staff-shaped ML engineer: model safety, agentic workflows, and Java services that stay up when the product is live — not just when the demo is.',
    badges: [
      { label: 'Model safety & evals', tone: 'accent' },
      { label: 'Agentic systems', tone: 'success' },
      { label: 'Java at scale', tone: 'muted' },
      { label: '8+ years', tone: 'warning' },
    ] satisfies SiteBadge[],
  },
  sections: [
    { id: 'practice', label: 'Practice' },
    { id: 'work', label: 'Work' },
    { id: 'notes', label: 'Notes' },
    { id: 'contact', label: 'Contact' },
  ],
  systemSnapshot: [
    { label: 'Experience', value: '8+ years' },
    { label: 'Home base', value: 'Bengaluru' },
    { label: 'Now', value: 'PayPal AI Tech' },
    { label: 'Languages', value: 'Java, TypeScript' },
  ],
  terminal: {
    prompt: 'akhil',
    commands: [
      {
        command: 'help',
        description: 'List available commands',
        output: [
          'wins — hackathon highlights',
          'seal — model safety / Project Seal',
          'smartwealth — SmartWealth case study',
          'cursor — Cursor Hackathon notes',
          'projects — selected builds',
          'stack — core skills',
          'contact — reach me',
        ],
      },
      {
        command: 'wins',
        description: 'Show hackathon wins',
        output: [
          'upGrad × Microsoft Agentic AI Hackathon — Student Success Intelligence',
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
          'Idea: money-movement context → responsible personalization',
          'Open: /case-studies/smartwealth',
        ],
      },
      {
        command: 'aiadapt',
        description: 'Alias for smartwealth',
        output: [
          'SmartWealth — AI-powered investing inside PayPal',
          'Winner: AI Adapt Hackathon',
          'Idea: money-movement context → responsible personalization',
          'Open: /case-studies/smartwealth',
        ],
      },
      {
        command: 'cursor',
        description: 'Show Cursor Hackathon summary',
        output: [
          'Two podium finishes in one hackathon.',
          'AI workflows that a team can actually ship.',
          'Notes: /case-studies/cursor-hackathon',
        ],
      },
      {
        command: 'projects',
        description: 'Show selected projects',
        output: [
          'Project Seal — trajectory evals and red-teaming',
          'Student Success Intelligence — upGrad × Microsoft',
          'ProductGravity — product architecture for agentic products',
        ],
      },
      {
        command: 'stack',
        description: 'Show core stack',
        output: [
          'Java, TypeScript, Spring Boot, Next.js',
          'AWS GenAI Developer + ML Engineer shapes, GCP, Kubernetes',
          'Evals, guardrails, agent workflows, observability',
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
      title: 'Student Success Intelligence',
      kicker: 'upGrad × Microsoft Agentic AI Hackathon',
      year: '2025',
      tags: ['Agentic AI', 'Education', 'Microsoft'],
      problem:
        'Support teams see student risk too late — attendance, assignments, and help-seeking live in different tools, so intervention is manual and late.',
      build:
        'An agentic workflow that watches academic signals, drafts a plain-language risk picture, and suggests the next human action instead of pretending a chatbot can replace advising.',
      result:
        'A hackathon system that treats student success as operations: timed, inspectable, and built for the people who actually talk to students.',
    },
    {
      title: 'Cursor Hackathon — 1st Place',
      kicker: 'Team Busters',
      tags: ['AI tooling', 'Developer velocity'],
      problem:
        'Teams lost hours stitching prompts, assets, and deploy steps into something a reviewer could follow.',
      build:
        'A single working path from idea to demo: shared context, visible steps, and a UI that did not need a narrator standing next to it.',
      result:
        'A crisp build that won first place — and a reminder that speed only counts if someone else can run it.',
      href: '/case-studies/cursor-hackathon',
    },
    {
      title: 'Cursor Hackathon — 2nd Place',
      kicker: 'Engineering Impact Platform',
      tags: ['Platform analytics', 'Decision support'],
      problem:
        'Impact was scattered across dashboards, so prioritization turned into a slide argument.',
      build:
        'A cockpit that ranked engineering signals and told a story a staff engineer and a PM could both trust.',
      result:
        'Second place, and a cleaner way to talk about what was worth building next.',
      href: '/case-studies/cursor-hackathon',
    },
    {
      title: 'SmartWealth',
      kicker: 'AI Adapt Hackathon Winner',
      year: '2025',
      tags: ['Fintech', 'Personalization', 'Safety'],
      problem:
        'Investing products often feel bolted onto payments — generic portfolios, weak context, little explanation.',
      build:
        'A one-tap concept inside PayPal: $1 minimum, goals and risk in the open, ETFs, crypto, and high-yield savings with suitability checks.',
      result:
        'Winning pitch for turning everyday money movement into guidance people can actually inspect. Hackathon concept, not a product launch.',
      href: '/case-studies/smartwealth',
    },
  ] satisfies StoryCard[],
  caseStudies: [
    {
      slug: 'cursor-hackathon',
      title: 'Cursor Hackathon',
      subtitle: '1st & 2nd place',
      summary:
        'Two builds in one weekend: an AI workflow a team can run, and an impact cockpit that made priorities visible.',
      tags: ['AI tooling', 'Platform UX', 'Hackathon'],
      href: '/case-studies/cursor-hackathon',
    },
    {
      slug: 'smartwealth',
      title: 'SmartWealth',
      subtitle: 'AI Adapt Hackathon winner',
      summary:
        'A one-tap investing concept that uses PayPal’s money-movement context without hiding the tradeoffs.',
      tags: ['Fintech', 'AI product', 'Trust'],
      href: '/case-studies/smartwealth',
    },
  ] satisfies CaseStudyPreview[],
  projects: [
    {
      title: 'Project Seal',
      kicker: 'Model safety',
      tags: ['Red-teaming', 'Trajectory evals', 'Guardrails'],
      problem:
        'Single-turn scores miss how a model behaves across a session — the failures that show up in production, not in a golden prompt set.',
      build:
        'Trajectory-level evaluations and red-teaming: follow the path, not just the last answer, and surface where an agent drifts, overreaches, or goes quiet.',
      result:
        'A clearer picture of session-level risk, so safety work can land in the same review as latency and cost.',
    },
    {
      title: 'ProductGravity',
      kicker: 'Product architecture',
      tags: ['Agents', 'Platform', 'Design'],
      problem:
        'Agentic product ideas often die between a slide and a backlog — capabilities, data, and runtime never get named.',
      build:
        'Architecture that maps who the agent is for, which tools it may touch, where memory lives, and which Java services actually own the work.',
      result:
        'Designs a product team can hand to engineering without a second translation layer.',
    },
    {
      title: 'Inference platform work',
      kicker: 'PayPal · public-safe',
      tags: ['Java', 'Latency', 'Reliability'],
      problem:
        'Real-time risk scoring only counts if model execution is boringly reliable under traffic.',
      build:
        'Java services, cloud-native rollouts, and platform tooling so teams can onboard models without inventing a new path each time.',
      result:
        'Inference that product and risk teams can reason about — latency, shadow traffic, and safe promotion included.',
    },
  ] satisfies StoryCard[],
  experience: [
    {
      role: 'Senior Software Engineer, AI Tech',
      company: 'PayPal',
      period: 'Dec 2022 — Present',
      highlights: [
        'Own production AI systems for real-time risk scoring — Java services, rollout discipline, and the unglamorous reliability work.',
        'Work on model safety in public-safe terms: red-teaming and trajectory evaluations in the spirit of Project Seal, not just prompt-level scores.',
        'Help teams move models onto cloud-native paths with audit, shadow traffic, and promotions that can be rolled back.',
      ],
    },
    {
      role: 'Senior Software Engineer',
      company: 'Oracle',
      period: 'Nov 2021 — Nov 2022',
      highlights: [
        'Shipped full-stack features for enterprise marketing workflows.',
        'Java services and responsive UI — the same end-to-end habit I still use on ML platforms.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'TCS',
      period: 'Dec 2017 — Oct 2021',
      highlights: [
        'Public-sector workflows with role-based access and delivery you could defend in a review.',
        'Owned backend and UI modules instead of throwing work over a wall.',
      ],
    },
  ],
  skills: [
    {
      group: 'Model safety',
      items: ['Red-teaming', 'Trajectory evals', 'Guardrails', 'Observability'],
    },
    {
      group: 'Agentic AI',
      items: ['Tool-using agents', 'Workflow design', 'MCP tooling', 'Eval harnesses'],
    },
    {
      group: 'Java backends',
      items: ['Java', 'Spring Boot', 'Hibernate/JPA', 'REST APIs', 'SQL', 'MySQL'],
    },
    {
      group: 'Cloud & ML platforms',
      items: ['AWS GenAI Developer', 'AWS ML Engineer', 'GCP', 'GKE', 'Kubernetes', 'Docker'],
    },
    {
      group: 'Product',
      items: ['Product architecture', 'System design', 'UX flows', 'Prototyping'],
    },
    {
      group: 'Frontend',
      items: ['Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS'],
    },
  ],
  aws: {
    title: 'AWS-shaped AI, not slideware',
    body: 'I design against the AWS GenAI Developer and ML Engineer shapes: retrieval and inference, evaluation loops, and the Java services underneath. Useful on AWS, and equally useful when the runtime is GCP and Kubernetes.',
    tags: ['GenAI Developer', 'ML Engineer', 'Inference', 'Evals'],
  },
  cursorCaseStudy: {
    title: 'Cursor Hackathon — 1st & 2nd place',
    subtitle:
      'Two weekend builds that had to work without a narrator: an AI workflow, and an impact cockpit.',
    teams: [
      {
        name: 'Team Busters — 1st place',
        problem:
          'AI workflows were fragmented. Reviewers could not tell what happened between a prompt and a demo.',
        approach:
          'Collapsed the path into one experience: shared context, visible steps, and a UI that stood on its own.',
        outcome:
          'First place. The demo was fast, but more importantly it was legible.',
        why: 'Speed is cheap. A path someone else can rerun is the actual product.',
      },
      {
        name: 'Engineering Impact Platform — 2nd place',
        problem:
          'Engineering impact lived in too many tools, so “what matters” became a meeting.',
        approach:
          'One cockpit for ranking signals and telling the story behind them.',
        outcome:
          'Second place, and a shared picture of priority instead of a pile of charts.',
        why: 'Teams move when impact is visible enough to argue about honestly.',
      },
    ],
    builtWithCursor: [
      'Sketch an architecture a staff engineer would defend in a design review.',
      'Draft a UX flow that does not need a walkthrough voiceover.',
      'Tighten copy until a hiring manager can repeat it.',
    ],
  },
  smartwealthCaseStudy: {
    title: 'SmartWealth',
    subtitle: 'AI-powered investing inside PayPal (AI Adapt Hackathon winner)',
    hero: 'SmartWealth turns everyday PayPal money movement into a one-tap investing experience that feels as ordinary as sending cash. The bet: PayPal already has trust and context — the product should use both without talking down to people.',
    uniqueAdvantage:
      'PayPal sees how money moves through ordinary life. That context can personalize goals, risk, and timing more honestly than a generic portfolio quiz. It is also an advantage most new fintechs cannot copy.',
    vision:
      'Investing inside PayPal — one tap, $1 minimum, ETFs, crypto, and high-yield savings, with the tradeoffs in plain language.',
    experienceJourney: [
      'Set a goal and a timeline, starting at $1.',
      'Confirm risk with tradeoffs you can actually read.',
      'Get a diversified mix with guardrails, not a black box.',
      'Keep getting explainable nudges and rebalancing over time.',
    ],
    aiApproach: [
      'Goal profiles that notice life context instead of a one-time quiz.',
      'Risk calibration with diversification constraints.',
      'Suitability checks and disclosure-aware nudges.',
      'Plain-language rationale next to every recommendation.',
      'Monitoring for drift and unsafe guidance.',
    ],
    whyPayPalWins: [
      '435M+ users (approx.) — distribution without a new acquisition machine.',
      '$1.6T+ annual payment volume (approx.) — behavioral context most brokers never see.',
      '25 years of global trust — the hard part of a money product, already paid for.',
    ],
    role: [
      'Owned the pitch narrative and product framing.',
      'Designed the system and UX concept end to end.',
      'Wrote the demo story so an executive could follow it in one sitting.',
    ],
    nextBuild: [
      'MVP: goal onboarding, risk slider, starter ETF bundles.',
      'Safety: suitability checks, disclosures, hard guardrails.',
      'Measure activation, funded rate, retention, and whether people trust the explanations.',
    ],
    disclaimer:
      'This was a hackathon concept and pitch, not an official PayPal product announcement.',
  },
  contact: {
    headline: 'If the work is agents, evals, or inference that has to stay up — write me.',
    subheadline:
      'Happy to talk about staff-shaped ML platform roles, model safety, and product architecture that engineering can actually run.',
  },
};
