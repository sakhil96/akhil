import { site } from '@/lib/site';

function storyLines(item: {
  title: string;
  kicker?: string;
  problem: string;
  build: string;
  result: string;
  href?: string;
}) {
  const extra = item.kicker ? ` — ${item.kicker}` : '';
  const link = item.href ? `\nWrite-up: ${item.href}` : '';
  return `### ${item.title}${extra}
Problem: ${item.problem}
Build: ${item.build}
Result: ${item.result}${link}`;
}

export function buildKnowledgeBase(): string {
  return `
# Public profile: ${site.profile.name}

## Identity
- Name: ${site.profile.name}
- Role: ${site.profile.role}
- Location: ${site.profile.location}
- Years of experience: 8+
- Email: ${site.profile.email}
- LinkedIn: ${site.profile.links.linkedin}
- GitHub: ${site.profile.links.github}
- Open to: staff-shaped ML platform roles, model safety, agentic workflows, Java inference systems.

## Positioning
${site.hero.headline}
${site.hero.subheadline}

Highlights: ${site.hero.badges.map((item) => item.label).join('; ')}

Snapshot: ${site.systemSnapshot.map((item) => `${item.label}=${item.value}`).join('; ')}

## Experience (newest first)
${site.experience
    .map(
      (role) => `### ${role.role} @ ${role.company} (${role.period})
${role.highlights.map((item) => `- ${item}`).join('\n')}`,
    )
    .join('\n\n')}

Career path in one line: TCS (2017–2021, public-sector full-stack) → Oracle (2021–2022, enterprise marketing full-stack) → PayPal (2022–present, AI inference / real-time risk / model safety).

## Skills
${site.skills.map((group) => `${group.group}: ${group.items.join(', ')}`).join('\n')}

Core stack: Java, TypeScript, Spring Boot, Next.js, AWS (GenAI Developer + ML Engineer paradigms), GCP, GKE/Kubernetes, Docker, SQL, REST APIs, evals, guardrails.

AWS: ${site.aws.title} ${site.aws.body}

## Selected work
${[...site.trophies, ...site.projects].map((item) => storyLines(item)).join('\n\n')}

## Case studies
${site.caseStudies.map((study) => `- ${study.title} (${study.subtitle}): ${study.summary} → ${study.href}`).join('\n')}

## Cursor Hackathon
${site.cursorCaseStudy.subtitle}
${site.cursorCaseStudy.teams
    .map(
      (team) => `### ${team.name}
Problem: ${team.problem}
Approach: ${team.approach}
Outcome: ${team.outcome}
Why: ${team.why}`,
    )
    .join('\n\n')}
Built-with-Cursor prompts: ${site.cursorCaseStudy.builtWithCursor.join(' | ')}

## SmartWealth (AI Adapt Hackathon Winner)
${site.smartwealthCaseStudy.hero}
Advantage: ${site.smartwealthCaseStudy.uniqueAdvantage}
Vision: ${site.smartwealthCaseStudy.vision}
Journey: ${site.smartwealthCaseStudy.experienceJourney.join(' → ')}
AI approach: ${site.smartwealthCaseStudy.aiApproach.join('; ')}
Why PayPal: ${site.smartwealthCaseStudy.whyPayPalWins.join('; ')}
Akhil's role: ${site.smartwealthCaseStudy.role.join('; ')}
Next build: ${site.smartwealthCaseStudy.nextBuild.join('; ')}
${site.smartwealthCaseStudy.disclaimer}

## Talks / public
- PayPal × Google Cloud Summit: shared high-level platform patterns for running AI inference at scale.

## Contact
${site.contact.headline}
${site.contact.subheadline}

## Things that are NOT in this public profile
Age, salary, visa status, family, education institution, phone number, home address. If asked, say that isn't listed publicly and offer email.
`.trim();
}

export const CHAT_SUGGESTIONS = [
  'What does Akhil do at PayPal?',
  'Tell me about Project Seal',
  'What was the Microsoft hackathon work?',
  'Would he fit a staff ML platform role?',
  'What is his tech stack?',
  'How can I contact him?',
];

export const CONSOLE_COMMANDS = [
  { command: 'help', hint: 'list commands' },
  { command: 'clear', hint: 'wipe the session' },
  { command: 'whoami', hint: 'quick bio' },
  { command: 'seal', hint: 'model safety' },
  { command: 'microsoft', hint: 'upGrad × Microsoft' },
  { command: 'wins', hint: 'hackathon work' },
  { command: 'stack', hint: 'languages and tools' },
  { command: 'paypal', hint: 'current role' },
  { command: 'smartwealth', hint: 'AI Adapt case' },
  { command: 'cursor', hint: 'hackathon notes' },
  { command: 'contact', hint: 'email and links' },
];
