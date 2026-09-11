import { site } from '@/lib/site';

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
- Open to: roles between models and production — safety, agents, platforms. Bengaluru, and remote when the work is real.

## Positioning
${site.hero.headlineLead} ${site.hero.headlineEmphasis}
${site.hero.subheadline}

## Experience (newest first)
${site.experience
    .map(
      (role) => `### ${role.role} @ ${role.company} (${role.period})
${role.highlights.map((item) => `- ${item}`).join('\n')}`,
    )
    .join('\n\n')}

Career path: TCS (2017–2021, public-sector full-stack) → Oracle (2021–2022, enterprise marketing full-stack) → PayPal (2022–present, AI inference / real-time risk).

## Focus
${site.focusTiles.map((tile) => `### ${tile.title} (${tile.kicker})\n${tile.body}`).join('\n\n')}

## Skills
${site.skills.map((group) => `${group.group}: ${group.items.join(', ')}`).join('\n')}

Core stack: Java, Spring Boot, TypeScript/Next.js, SQL, GCP/GKE/Kubernetes, Docker, AWS-shaped ML Engineer and GenAI Developer architectures, agent orchestration, red-teaming and trajectory evaluation.

## Selected work
${site.projects
    .map(
      (project) => `### ${project.name} — ${project.kicker}
Problem: ${project.problem}
Build: ${project.build}
Result: ${project.result}${project.href ? `\nWrite-up: ${project.href}` : ''}`,
    )
    .join('\n\n')}

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
${site.notes.map((note) => `- ${note.title}: ${note.body}`).join('\n')}

## Contact
${site.contact.headline}
${site.contact.subheadline}

## Things that are NOT in this public profile
Age, salary, visa status, family, education institution, phone number, home address. If asked, say that isn't listed publicly and offer email.
`.trim();
}

export const CHAT_SUGGESTIONS = [
  'What does he do at PayPal?',
  'How does he think about model safety?',
  'What is Project Seal?',
  'Walk through Student Success Intelligence',
  'Would he fit a staff platform role?',
  'How can I contact him?',
];

export const CONSOLE_COMMANDS = [
  { command: 'help', hint: 'what you can ask' },
  { command: 'clear', hint: 'reset this thread' },
  { command: 'whoami', hint: 'short bio' },
  { command: 'paypal', hint: 'current role' },
  { command: 'seal', hint: 'model safety' },
  { command: 'stack', hint: 'languages and cloud' },
  { command: 'contact', hint: 'email and links' },
];
