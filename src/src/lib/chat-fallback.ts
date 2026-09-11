import { buildKnowledgeBase } from '@/lib/knowledge';
import { site } from '@/lib/site';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type Chunk = {
  id: string;
  tags: string[];
  text: string;
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ');
}

function tokens(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP.has(word));
}

const STOP = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'his', 'her', 'who',
  'what', 'when', 'where', 'how', 'are', 'was', 'does', 'did', 'can', 'you',
  'about', 'tell', 'please', 'just', 'have', 'been',
]);

function chunks(): Chunk[] {
  return [
    {
      id: 'bio',
      tags: ['who', 'about', 'akhil', 'adapala', 'bio', 'summary', 'whoami', 'intro'],
      text: `${site.profile.name} is a ${site.profile.role} in ${site.profile.location}, with 8+ years across backends and applied ML systems. ${site.hero.subheadline}`,
    },
    {
      id: 'paypal',
      tags: ['paypal', 'current', 'inference', 'risk', 'job', 'present', 'ai'],
      text: `At PayPal he is ${site.experience[0].role} (${site.experience[0].period}). ${site.experience[0].highlights.join(' ')}`,
    },
    {
      id: 'oracle',
      tags: ['oracle', 'marketing', 'previous'],
      text: `At Oracle (${site.experience[1].period}) he was ${site.experience[1].role}. ${site.experience[1].highlights.join(' ')}`,
    },
    {
      id: 'tcs',
      tags: ['tcs', 'tata', 'public', 'started', 'career'],
      text: `At TCS (${site.experience[2].period}) he was ${site.experience[2].role}. ${site.experience[2].highlights.join(' ')}`,
    },
    {
      id: 'seal',
      tags: ['seal', 'safety', 'red', 'team', 'trajectory', 'eval', 'guardrail'],
      text: site.focusTiles.find((tile) => tile.id === 'seal')?.body ?? '',
    },
    {
      id: 'aws',
      tags: ['aws', 'bedrock', 'sagemaker', 'genai', 'cloud', 'ml engineer'],
      text: site.focusTiles.find((tile) => tile.id === 'aws')?.body ?? '',
    },
    {
      id: 'agents',
      tags: ['agent', 'agentic', 'workflow', 'tool', 'orchestration'],
      text: site.focusTiles.find((tile) => tile.id === 'agents')?.body ?? '',
    },
    {
      id: 'stack',
      tags: ['stack', 'skill', 'java', 'typescript', 'kubernetes', 'gcp', 'next', 'spring', 'tech', 'language'],
      text: site.skills.map((group) => `${group.group}: ${group.items.join(', ')}`).join('. '),
    },
    {
      id: 'student',
      tags: ['upgrad', 'microsoft', 'student', 'success', 'hackathon', 'education'],
      text: projectBlurb('student-success'),
    },
    {
      id: 'gravity',
      tags: ['productgravity', 'gravity', 'architecture', 'product'],
      text: projectBlurb('productgravity'),
    },
    {
      id: 'wins',
      tags: ['hackathon', 'win', 'trophy', 'award', 'cursor', 'podium'],
      text: site.projects
        .filter((project) => project.id.startsWith('cursor') || project.id === 'smartwealth')
        .map((project) => `${project.name}: ${project.result}`)
        .join(' '),
    },
    {
      id: 'cursor',
      tags: ['cursor', 'busters', 'impact'],
      text: `${site.cursorCaseStudy.subtitle} ${site.cursorCaseStudy.teams.map((team) => `${team.name}: ${team.outcome}`).join(' ')} Write-up: /case-studies/cursor-hackathon`,
    },
    {
      id: 'smartwealth',
      tags: ['smartwealth', 'invest', 'fintech', 'adapt', 'wealth'],
      text: `${site.smartwealthCaseStudy.hero} Akhil's role: ${site.smartwealthCaseStudy.role.join('; ')}. Write-up: /case-studies/smartwealth. ${site.smartwealthCaseStudy.disclaimer}`,
    },
    {
      id: 'projects',
      tags: ['project', 'build', 'work'],
      text: site.projects.map((project) => `${project.name} — ${project.build}`).join(' '),
    },
    {
      id: 'contact',
      tags: ['contact', 'email', 'linkedin', 'github', 'reach', 'connect'],
      text: `Email ${site.profile.email}. LinkedIn ${site.profile.links.linkedin}. GitHub ${site.profile.links.github}.`,
    },
    {
      id: 'open',
      tags: ['available', 'open', 'collaborate', 'looking', 'work'],
      text: `${site.contact.headline} ${site.contact.subheadline}`,
    },
    {
      id: 'summit',
      tags: ['summit', 'google', 'talk', 'speak', 'conference'],
      text: site.notes.map((note) => `${note.title}: ${note.body}`).join(' '),
    },
  ];
}

function projectBlurb(id: string): string {
  const project = site.projects.find((item) => item.id === id);
  if (!project) return '';
  return `${project.name} (${project.kicker}). Problem: ${project.problem} Build: ${project.build} Result: ${project.result}`;
}

function scoreChunk(query: string, chunk: Chunk): number {
  const queryTokens = tokens(query);
  const hay = normalize(`${chunk.id} ${chunk.tags.join(' ')} ${chunk.text}`);
  let score = 0;
  for (const token of queryTokens) {
    if (chunk.tags.some((tag) => tag.includes(token) || token.includes(tag))) score += 3;
    if (hay.includes(token)) score += 1;
  }
  return score;
}

function topChunks(query: string, limit = 2): Chunk[] {
  const ranked = chunks()
    .map((chunk) => ({ chunk, score: scoreChunk(query, chunk) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) return [];
  const best = ranked[0].score;
  return ranked
    .filter((item) => item.score >= Math.max(2, best * 0.7))
    .slice(0, limit)
    .map((item) => item.chunk);
}

function has(query: string, words: string[]): boolean {
  const hay = normalize(query);
  return words.some((word) => hay.includes(word));
}

export function generateFallbackReply(message: string, history: ChatMessage[]): string {
  const query = message.trim();
  const lower = query.toLowerCase();
  const previous = [...history].reverse().find((item) => item.role === 'user')?.content ?? '';
  const followUp = /^(more|why|and\b|what about|that|those|continue)/i.test(lower);
  const effective = followUp ? `${query} ${previous}` : query;

  if (has(effective, ['hello', 'hey', 'hi ']) && query.length < 22) {
    return `Hey. This is ${site.profile.name}'s site — ${site.profile.role}, ${site.profile.location}. Ask about PayPal, Project Seal, the hackathons, or fit for a role.`;
  }

  if (has(effective, ['salary', 'ctc', 'compensation', 'age', 'married', 'phone', 'visa', 'degree', 'college', 'university', 'cgpa'])) {
    return `Not on the public profile. Email him: ${site.profile.email}.`;
  }

  if (has(effective, ['fit', 'staff', 'principal', 'hire', 'interview', 'strength', 'good for', 'right person', 'why akhil', 'screening'])) {
    return `Honest read: senior platform / applied-ML engineer, not a research scientist. Evidence for a staff-shaped role — 8+ years; production inference and real-time risk at PayPal; Java plus cloud (GCP/GKE, AWS-shaped ML and GenAI patterns); model safety (red-teaming, trajectory evals, Project Seal); and he can tell a product story (Cursor 1st + 2nd, SmartWealth, upGrad × Microsoft). Probe in interview: team size he led, and depth outside the public write-ups. ${site.profile.email}`;
  }

  const selected = topChunks(effective, 2);
  if (selected.length === 0) {
    return `${site.profile.name} — ${site.profile.role} in ${site.profile.location}. ${site.hero.subheadline} Try PayPal, Project Seal, SmartWealth, or "would he fit X role?".`;
  }

  return selected.map((chunk) => chunk.text).join('\n\n');
}

export function getKnowledgeContext(): string {
  return buildKnowledgeBase();
}
