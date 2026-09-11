import { HoverRevealCard } from '@/components/HoverRevealCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

export function ProjectShowcase() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:px-12">
      <Reveal>
        <SectionHeading
          eyebrow={site.projectsIntro.eyebrow}
          title={site.projectsIntro.title}
          description={site.projectsIntro.body}
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
        {site.projects.map((project, index) => (
          <Reveal
            key={project.id}
            delay={index * 0.05}
            className={cn(
              project.span === 'wide' ? 'md:col-span-2 lg:col-span-6' : 'lg:col-span-3',
            )}
          >
            <HoverRevealCard project={project} />
          </Reveal>
        ))}
      </div>
      {site.notes[0] ? (
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-mute">
            <span className="text-sand">{site.notes[0].kicker}. </span>
            {site.notes[0].title} — {site.notes[0].body}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
