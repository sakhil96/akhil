import { HoverRevealCard } from '@/components/work/HoverRevealCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export function ProjectShowcase() {
  const stories = [...site.trophies, ...site.projects];

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Hackathons and systems, written as problem → build → result."
          description="Hover a card on desktop to open the story. On a phone, it’s already there."
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {stories.map((story, index) => (
          <Reveal key={story.title} delay={index * 0.05} className={index === 0 ? 'md:col-span-2' : undefined}>
            <HoverRevealCard story={story} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
