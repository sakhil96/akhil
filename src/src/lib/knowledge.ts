import { site } from '@/lib/site';

export function buildKnowledgeBase(): string {
  const sections: string[] = [];

  sections.push(`# ${site.profile.name}`);
  sections.push(`Role: ${site.profile.role}`);
  sections.push(`Location: ${site.profile.location}`);
  sections.push(`Email: ${site.profile.email}`);
  sections.push(`LinkedIn: ${site.profile.links.linkedin}`);
  sections.push(`GitHub: ${site.profile.links.github}`);
  sections.push('');
  sections.push(`## Summary`);
  sections.push(site.hero.subheadline);
  sections.push('');
  sections.push(`## Highlights`);
  site.hero.badges.forEach((badge) => sections.push(`- ${badge.label}`));
  sections.push('');
  sections.push(`## System snapshot`);
  site.systemSnapshot.forEach((item) => sections.push(`- ${item.label}: ${item.value}`));
  sections.push('');
  sections.push(`## Experience`);
  site.experience.forEach((role) => {
    sections.push(`### ${role.role} @ ${role.company} (${role.period})`);
    role.highlights.forEach((highlight) => sections.push(`- ${highlight}`));
  });
  sections.push('');
  sections.push(`## Skills`);
  site.skills.forEach((group) => {
    sections.push(`### ${group.group}`);
    sections.push(group.items.join(', '));
  });
  sections.push('');
  sections.push(`## Projects`);
  site.projects.forEach((project) => {
    sections.push(`### ${project.name}`);
    sections.push(project.description);
    sections.push(`Tags: ${project.tags.join(', ')}`);
  });
  sections.push('');
  sections.push(`## Hackathon wins`);
  site.trophies.forEach((trophy) => {
    sections.push(`### ${trophy.title}`);
    if (trophy.subtitle) sections.push(trophy.subtitle);
    trophy.bullets.forEach((bullet) => sections.push(`- ${bullet}`));
    if (trophy.href) sections.push(`Case study: ${trophy.href}`);
  });
  sections.push('');
  sections.push(`## Case studies`);
  site.caseStudies.forEach((study) => {
    sections.push(`### ${study.title} — ${study.subtitle}`);
    sections.push(study.summary);
    sections.push(`Link: ${study.href}`);
  });
  sections.push('');
  sections.push(`## Cursor Hackathon detail`);
  sections.push(site.cursorCaseStudy.subtitle);
  site.cursorCaseStudy.teams.forEach((team) => {
    sections.push(`### ${team.name}`);
    sections.push(`Problem: ${team.problem}`);
    sections.push(`Approach: ${team.approach}`);
    sections.push(`Outcome: ${team.outcome}`);
  });
  sections.push('');
  sections.push(`## SmartWealth detail`);
  sections.push(site.smartwealthCaseStudy.hero);
  sections.push(site.smartwealthCaseStudy.uniqueAdvantage);
  sections.push(site.smartwealthCaseStudy.disclaimer);
  sections.push('');
  sections.push(`## Contact`);
  sections.push(site.contact.headline);
  sections.push(site.contact.subheadline);

  return sections.join('\n');
}

export const CHAT_SUGGESTIONS = [
  'What does Akhil do at PayPal?',
  'Tell me about his hackathon wins',
  'What is his tech stack?',
  'How can I contact him?',
];
