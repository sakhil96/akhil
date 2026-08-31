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
- Open to: collaborations on AI-first systems, product strategy, and platform UX.

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

Career path in one line: TCS (2017–2021, public-sector full-stack) → Oracle (2021–2022, enterprise marketing full-stack) → PayPal (2022–present, AI inference / real-time risk platforms).

## Skills
${site.skills.map((group) => `${group.group}: ${group.items.join(', ')}`).join('\n')}

Core stack: Java, TypeScript, Spring Boot, Next.js, GKE/Kubernetes, Docker, GCP, SQL, REST APIs, MLOps/observability.

## Projects
${site.projects.map((project) => `- ${project.name}: ${project.description} (${project.tags.join(', ')})`).join('\n')}

## Hackathon wins
${site.trophies
    .map((trophy) => {
      const extra = trophy.subtitle ? ` — ${trophy.subtitle}` : '';
      return `### ${trophy.title}${extra}
${trophy.bullets.map((item) => `- ${item}`).join('\n')}
Case study: ${trophy.href ?? 'n/a'}`;
    })
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
- PayPal × Google Cloud Summit: shared high-level platform insights and cloud-native patterns for AI inference at scale.

## Contact
${site.contact.headline}
${site.contact.subheadline}

## Things that are NOT in this public profile
Age, salary, visa status, family, education institution, phone number, home address. If asked, say that isn't listed publicly and offer email.
`.trim();
}

export const CHAT_SUGGESTIONS = [
  'What does Akhil do at PayPal?',
  'Would he fit a staff platform role?',
  'Walk me through SmartWealth',
  'What did he win at the Cursor hackathon?',
  'What is his tech stack?',
  'How can I contact him?',
];

export const CONSOLE_COMMANDS = [
  { command: 'help', hint: 'list commands' },
  { command: 'clear', hint: 'wipe the session' },
  { command: 'whoami', hint: 'quick bio' },
  { command: 'wins', hint: 'hackathon trophies' },
  { command: 'stack', hint: 'languages and tools' },
  { command: 'paypal', hint: 'current role' },
  { command: 'smartwealth', hint: 'AI Adapt case' },
  { command: 'cursor', hint: 'hackathon case' },
  { command: 'contact', hint: 'email and links' },
];
