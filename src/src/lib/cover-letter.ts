import type { TailoredResume } from '@/lib/resume';

const AI_PHRASES = [
  'i am writing to express',
  'i am thrilled',
  'i am excited to apply',
  'passionate about',
  'leverage my',
  'dynamic team',
  'synergy',
  'hit the ground running',
  'perfect fit',
  'unique opportunity',
  'delve into',
  'realm of',
  'in today\'s fast-paced',
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function firstKeyword(resume: TailoredResume): string {
  if (resume.keywordsMatched.length > 0) {
    return resume.keywordsMatched[0];
  }
  return 'platform engineering';
}

function recentWin(resume: TailoredResume): string {
  const highlight = resume.experience[0]?.highlights[0];
  if (!highlight) {
    return 'building reliable systems at scale';
  }
  return highlight.replace(/\.$/, '').toLowerCase();
}

function looksHuman(text: string): boolean {
  const lower = text.toLowerCase();
  return !AI_PHRASES.some((phrase) => lower.includes(phrase));
}

export function generateCoverLetter(
  resume: TailoredResume,
  company: string,
  title: string,
  jobDescription: string,
): string {
  const keyword = firstKeyword(resume);
  const win = recentWin(resume);
  const jdSnippet = jobDescription
    .split(/[.!?]/)
    .map((line) => line.trim())
    .find((line) => line.length > 40 && line.length < 160);

  const openings = [
    `Hi,\n\nI came across the ${title} role at ${company} and wanted to reach out directly.`,
    `Hello,\n\nSaw the ${title} posting at ${company} — it stood out because of the ${keyword} focus.`,
    `Hi there,\n\nI'm applying for the ${title} position at ${company}. The job description mentions ${keyword}, which is most of what I've been working on lately.`,
  ];

  const bodies = [
    `I'm ${resume.name}, currently a senior engineer at PayPal. Day to day I work on ${keyword} and related platform problems — ${win}.`,
    `Quick background: 8+ years across PayPal, Oracle, and TCS. Recently I've been heads-down on ${keyword}, including ${win}.`,
    `I've spent the last few years on production systems where ${keyword} actually matters, not just slides. At PayPal that's meant ${win}.`,
  ];

  const bridges = jdSnippet
    ? [
        `Your note about "${jdSnippet.toLowerCase()}" is basically the kind of problem I like — concrete, technical, and tied to real users.`,
        `The part of the JD about ${jdSnippet.toLowerCase()} maps closely to work I've already shipped.`,
      ]
    : [
        `From the JD, it sounds like you need someone who can own ${keyword} end to end — design, build, and keep it running.`,
        `The role reads like a mix of ${keyword} and product judgment, which is where I'm most useful.`,
      ];

  const closings = [
    `Happy to walk through specific projects if useful. Resume is attached.\n\nThanks,\n${resume.name.split(' ')[0]}`,
    `If it helps, I can share more detail on the PayPal inference work or hop on a quick call.\n\nBest,\n${resume.name.split(' ')[0]}`,
    `Let me know if you'd like examples — I can point to repos and production work that line up with this role.\n\nRegards,\n${resume.name.split(' ')[0]}`,
  ];

  let attempt = 0;
  let letter = '';

  while (attempt < 6) {
    letter = [
      pick(openings),
      '',
      pick(bodies),
      '',
      pick(bridges),
      '',
      pick(closings),
    ].join('\n');

    if (looksHuman(letter)) {
      break;
    }
    attempt += 1;
  }

  return letter;
}

export function generateApplicationMessage(
  resume: TailoredResume,
  company: string,
  title: string,
): string {
  const keyword = firstKeyword(resume);

  const templates = [
    `Hi — applying for the ${title} role at ${company}. I work on ${keyword} at PayPal (real-time inference / platform work). Resume attached; happy to chat if it's a fit.`,
    `Hello, I'd like to be considered for ${title} at ${company}. Background is senior full-stack/platform engineering with heavy ${keyword} experience. Let me know if you want more detail.`,
    `Hi, ${resume.name.split(' ')[0]} here. The ${title} opening at ${company} looks relevant — I've been building ${keyword} systems in production for the last few years. Open to a quick intro call.`,
  ];

  return pick(templates);
}

export function generateLinkedInNote(
  resume: TailoredResume,
  company: string,
  title: string,
): string {
  const templates = [
    `Hi — saw the ${title} opening at ${company}. I lead ${resume.keywordsMatched[0] ?? 'platform'} work at PayPal. Worth a quick chat?`,
    `Hello, interested in the ${title} role at ${company}. 8+ yrs in Java/TS + cloud platforms. Happy to share relevant work if helpful.`,
  ];

  return pick(templates);
}
