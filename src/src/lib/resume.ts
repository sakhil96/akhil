import { site } from '@/lib/site';

export type ResumeExperience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type BaseResume = {
  name: string;
  email: string;
  location: string;
  role: string;
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  links: {
    linkedin: string;
    github: string;
  };
};

export type TailoredResume = BaseResume & {
  matchScore: number;
  keywordsMatched: string[];
  keywordsMissing: string[];
};

const TECH_KEYWORDS = [
  'java',
  'typescript',
  'javascript',
  'python',
  'spring boot',
  'spring',
  'next.js',
  'nextjs',
  'react',
  'node',
  'kubernetes',
  'k8s',
  'gke',
  'docker',
  'gcp',
  'aws',
  'azure',
  'mlops',
  'machine learning',
  'ai',
  'inference',
  'llm',
  'rest',
  'api',
  'microservices',
  'sql',
  'mysql',
  'postgres',
  'redis',
  'kafka',
  'activemq',
  'gradle',
  'maven',
  'git',
  'ci/cd',
  'devops',
  'observability',
  'monitoring',
  'platform',
  'fintech',
  'payments',
  'risk',
  'scalability',
  'latency',
  'distributed',
  'cloud',
  'full stack',
  'full-stack',
  'backend',
  'frontend',
  'product',
  'ux',
  'design',
  'leadership',
  'mentoring',
  'agile',
  'scrum',
];

export function getBaseResume(): BaseResume {
  const allSkills = site.skills.flatMap((group) => group.items);

  return {
    name: site.profile.name,
    email: site.profile.email,
    location: site.profile.location,
    role: site.profile.role,
    summary:
      'Senior software engineer with 8+ years building full-stack and platform systems. Currently at PayPal working on AI inference and real-time risk scoring. Comfortable across Java, TypeScript, GCP, and Kubernetes.',
    skills: allSkills,
    experience: site.experience.map((item) => ({
      role: item.role,
      company: item.company,
      period: item.period,
      highlights: [...item.highlights],
    })),
    links: site.profile.links,
  };
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s+\-/]/g, ' ');
}

export function extractKeywords(jobDescription: string): string[] {
  const normalized = normalizeText(jobDescription);
  const found = new Set<string>();

  for (const keyword of TECH_KEYWORDS) {
    if (normalized.includes(keyword)) {
      found.add(keyword);
    }
  }

  const extraPatterns = [
    /\b(\d+\+?\s*years?\s*(?:of\s*)?experience)\b/gi,
    /\b(bachelor(?:'s)?|master(?:'s)?|phd)\b/gi,
    /\b(team lead|tech lead|staff engineer|principal engineer)\b/gi,
  ];

  for (const pattern of extraPatterns) {
    const matches = jobDescription.match(pattern) ?? [];
    for (const match of matches) {
      found.add(match.toLowerCase().trim());
    }
  }

  return [...found];
}

function scoreText(text: string, keywords: string[]): number {
  const normalized = normalizeText(text);
  return keywords.reduce((score, keyword) => {
    return normalized.includes(keyword) ? score + 1 : score;
  }, 0);
}

function rewriteBullet(bullet: string, keywords: string[]): string {
  const normalized = normalizeText(bullet);
  const missing = keywords.filter((keyword) => !normalized.includes(keyword));
  if (missing.length === 0 || missing.length > 2) {
    return bullet;
  }

  const additions = missing.slice(0, 2).join(' and ');
  if (bullet.endsWith('.')) {
    return `${bullet.slice(0, -1)}, with hands-on work in ${additions}.`;
  }
  return `${bullet}, including ${additions}.`;
}

function buildSummary(keywords: string[], company: string, title: string): string {
  const topKeywords = keywords.slice(0, 4);
  const keywordPhrase =
    topKeywords.length > 0
      ? topKeywords.join(', ')
      : 'full-stack platform engineering';

  const openings = [
    `${title} at ${company} caught my eye — the work around ${keywordPhrase} lines up with what I've been doing at PayPal.`,
    `I'm a senior engineer focused on ${keywordPhrase}. The ${title} role at ${company} looks like a solid fit for that background.`,
    `Eight years in, mostly on platform and product-facing systems. ${company}'s ${title} opening maps well to my recent work with ${keywordPhrase}.`,
  ];

  return openings[Math.floor(Math.random() * openings.length)];
}

function rankBullets(bullets: string[], keywords: string[]): string[] {
  return [...bullets]
    .map((bullet) => ({
      bullet,
      score: scoreText(bullet, keywords),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ bullet }) => rewriteBullet(bullet, keywords));
}

export function tailorResume(
  jobDescription: string,
  company: string,
  title: string,
): TailoredResume {
  const base = getBaseResume();
  const keywords = extractKeywords(jobDescription);
  const resumeKeywords = [
    ...base.skills.map((skill) => skill.toLowerCase()),
    ...base.experience.flatMap((role) => [
      role.company.toLowerCase(),
      role.role.toLowerCase(),
      ...role.highlights.flatMap((highlight) => extractKeywords(highlight)),
    ]),
  ];

  const keywordsMatched = keywords.filter((keyword) =>
    resumeKeywords.some((item) => item.includes(keyword) || keyword.includes(item)),
  );
  const keywordsMissing = keywords.filter(
    (keyword) => !keywordsMatched.includes(keyword),
  );

  const prioritizedSkills = [...base.skills].sort((a, b) => {
    return scoreText(b, keywords) - scoreText(a, keywords);
  });

  const tailoredExperience = base.experience.map((role) => ({
    ...role,
    highlights: rankBullets(role.highlights, keywords).slice(0, 3),
  }));

  tailoredExperience.sort((a, b) => {
    const aScore =
      scoreText(`${a.role} ${a.company}`, keywords) +
      a.highlights.reduce((sum, highlight) => sum + scoreText(highlight, keywords), 0);
    const bScore =
      scoreText(`${b.role} ${b.company}`, keywords) +
      b.highlights.reduce((sum, highlight) => sum + scoreText(highlight, keywords), 0);
    return bScore - aScore;
  });

  const matchScore =
    keywords.length === 0
      ? 72
      : Math.min(98, Math.round((keywordsMatched.length / keywords.length) * 100));

  return {
    ...base,
    role: title,
    summary: buildSummary(keywordsMatched, company, title),
    skills: prioritizedSkills,
    experience: tailoredExperience,
    matchScore,
    keywordsMatched,
    keywordsMissing,
  };
}

export function resumeToText(resume: TailoredResume | BaseResume): string {
  const lines = [
    resume.name,
    `${resume.email} · ${resume.location}`,
    resume.role,
    '',
    'Summary',
    resume.summary,
    '',
    'Skills',
    resume.skills.join(' · '),
    '',
    'Experience',
  ];

  for (const role of resume.experience) {
    lines.push(`${role.role} — ${role.company} (${role.period})`);
    for (const highlight of role.highlights) {
      lines.push(`• ${highlight}`);
    }
    lines.push('');
  }

  lines.push(`LinkedIn: ${resume.links.linkedin}`);
  lines.push(`GitHub: ${resume.links.github}`);

  return lines.join('\n');
}
