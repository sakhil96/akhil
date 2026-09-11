import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export function CaseStudyGrid() {
  return (
    <section id="notes" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Notes"
          title="Longer write-ups when a weekend build deserves more than a card."
        />
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {site.caseStudies.map((study, index) => (
          <Reveal key={study.slug} delay={index * 0.08}>
            <Link href={study.href} className="block h-full">
              <GlassCard className="h-full">
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 font-serif text-2xl text-fog">{study.title}</h3>
                <p className="mt-1 text-sm text-aqua/80">{study.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-mist">{study.summary}</p>
                <p className="mt-6 text-sm text-fog/80">Read →</p>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
