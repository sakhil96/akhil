import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export const metadata = {
  title: 'SmartWealth — AI Adapt Hackathon winner',
  description:
    'SmartWealth is a hackathon concept for AI-powered investing inside PayPal, using money-movement context without hiding the tradeoffs.',
};

export default function SmartWealthPage() {
  const caseStudy = site.smartwealthCaseStudy;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <div className="mb-10 flex items-center justify-between text-sm text-mist">
        <Link href="/" className="hover:text-fog">
          ← Home
        </Link>
        <Link href="/#work" className="hover:text-fog">
          Work
        </Link>
      </div>

      <section className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-aqua/80">Case note</p>
        <h1 className="font-serif text-4xl leading-tight text-fog md:text-5xl">{caseStudy.title}</h1>
        <p className="text-mist">{caseStudy.subtitle}</p>
        <p className="text-lg leading-relaxed text-mist">{caseStudy.hero}</p>
      </section>

      <section className="mt-12 space-y-4">
        <SectionHeading title="The unique advantage" />
        <GlassCard hover={false}>
          <p className="text-sm leading-relaxed text-mist">{caseStudy.uniqueAdvantage}</p>
        </GlassCard>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeading title="The vision" />
        <GlassCard hover={false}>
          <p className="text-sm leading-relaxed text-mist">{caseStudy.vision}</p>
        </GlassCard>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeading title="Experience design" />
        <GlassCard hover={false} className="space-y-3">
          {caseStudy.experienceJourney.map((step) => (
            <p key={step} className="border-l border-iris/40 pl-4 text-sm text-mist">
              {step}
            </p>
          ))}
        </GlassCard>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeading title="AI approach" />
        <GlassCard hover={false} className="space-y-3">
          {caseStudy.aiApproach.map((item) => (
            <p key={item} className="border-l border-iris/40 pl-4 text-sm text-mist">
              {item}
            </p>
          ))}
        </GlassCard>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeading title="Why this wins for PayPal" />
        <GlassCard hover={false} className="space-y-3">
          {caseStudy.whyPayPalWins.map((item) => (
            <p key={item} className="border-l border-iris/40 pl-4 text-sm text-mist">
              {item}
            </p>
          ))}
          <p className="text-xs text-mist/70">Stats are approximate, from public reporting.</p>
        </GlassCard>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeading title="My role" />
        <GlassCard hover={false} className="space-y-3">
          {caseStudy.role.map((item) => (
            <p key={item} className="border-l border-iris/40 pl-4 text-sm text-mist">
              {item}
            </p>
          ))}
        </GlassCard>
      </section>

      <section className="mt-10 space-y-4">
        <SectionHeading title="What I’d build next" />
        <GlassCard hover={false} className="space-y-3">
          {caseStudy.nextBuild.map((item) => (
            <p key={item} className="border-l border-iris/40 pl-4 text-sm text-mist">
              {item}
            </p>
          ))}
        </GlassCard>
      </section>

      <GlassCard hover={false} className="mt-10 border-amber-400/20 bg-amber-400/8 text-sm text-amber-100">
        {caseStudy.disclaimer}
      </GlassCard>

      <GlassCard className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl text-fog">Want the short version?</p>
          <p className="text-sm text-mist">Back to the work grid.</p>
        </div>
        <Link href="/#work" className="text-sm text-fog hover:text-white">
          Back to work →
        </Link>
      </GlassCard>
    </main>
  );
}
