import { buildKnowledgeBase } from '@/lib/knowledge';
import { sanitizeResponse } from '@/lib/humanizer';
import { site } from '@/lib/site';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function scoreMatch(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.reduce((score, word) => (lower.includes(word) ? score + 1 : score), 0);
}

function answerExperience(): string {
  const latest = site.experience[0];
  return `Akhil is a ${latest.role} at ${latest.company} (${latest.period}). Main work: ${latest.highlights.join(' ')} Before that: ${site.experience
    .slice(1)
    .map((role) => `${role.role} at ${role.company}`)
    .join(', ')}.`;
}

function answerHackathons(): string {
  return site.trophies
    .map((trophy) => `${trophy.title}: ${trophy.bullets[0]}`)
    .join(' ');
}

function answerStack(): string {
  const groups = site.skills.map((group) => `${group.group}: ${group.items.slice(0, 5).join(', ')}`);
  return `Stack spans ${groups.join('. ')}.`;
}

function answerContact(): string {
  return `Email: ${site.profile.email}. LinkedIn: ${site.profile.links.linkedin}. GitHub: ${site.profile.links.github}.`;
}

function answerProjects(): string {
  return site.projects
    .map((project) => `${project.name} — ${project.description}`)
    .join(' ');
}

function answerSmartwealth(): string {
  return `${site.smartwealthCaseStudy.title}: ${site.smartwealthCaseStudy.hero} Full write-up: /case-studies/smartwealth. ${site.smartwealthCaseStudy.disclaimer}`;
}

function answerDefault(): string {
  return `Akhil Adapala — ${site.profile.role} in ${site.profile.location}. ${site.hero.subheadline} Ask about experience, hackathons, projects, skills, or contact info.`;
}

export function generateFallbackReply(message: string, history: ChatMessage[]): string {
  const query = message.toLowerCase();
  const topics = [
    { keys: ['paypal', 'work', 'job', 'experience', 'oracle', 'tcs', 'role'], answer: answerExperience },
    { keys: ['hackathon', 'win', 'trophy', 'cursor', 'smartwealth', 'award'], answer: answerHackathons },
    { keys: ['stack', 'skill', 'tech', 'language', 'java', 'typescript', 'kubernetes'], answer: answerStack },
    { keys: ['contact', 'email', 'linkedin', 'github', 'reach', 'hire'], answer: answerContact },
    { keys: ['project', 'build', 'platform', 'inference', 'mcp'], answer: answerProjects },
    { keys: ['smartwealth', 'invest', 'fintech', 'ai adapt'], answer: answerSmartwealth },
  ];

  const ranked = topics
    .map((topic) => ({ topic, score: scoreMatch(query, topic.keys) }))
    .sort((a, b) => b.score - a.score);

  let reply =
    ranked[0]?.score > 0 ? ranked[0].topic.answer() : answerDefault();

  if (history.length > 0 && query.includes('more')) {
    reply += ' Happy to go deeper on any specific project or role.';
  }

  return sanitizeResponse(reply);
}

export function getKnowledgeContext(): string {
  return buildKnowledgeBase();
}
