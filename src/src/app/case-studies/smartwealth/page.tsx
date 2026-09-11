import { CaseStudyLayout } from '@/components/CaseStudyLayout';
import { GlassCard } from '@/components/GlassCard';
import { site } from '@/lib/site';

export const metadata = {
  title: 'SmartWealth — AI Adapt Hackathon winner',
  description:
    'SmartWealth is a hackathon concept for investing inside PayPal, using money-movement context without pretending it is advice.',
};

export default function SmartWealthPage() {
  const study = site.smartwealthCaseStudy;

  return (
    <CaseStudyLayout kicker="AI Adapt · Winner" title={study.title} subtitle={study.subtitle}>
      <p className="text-lg leading-relaxed text-ink/90">{study.hero}</p>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">The advantage</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-mute">{study.uniqueAdvantage}</p>
      </GlassCard>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">The vision</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-mute">{study.vision}</p>
      </GlassCard>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">The path</h2>
        <ol className="mt-5 space-y-3 text-[15px] leading-relaxed text-mute">
          {study.experienceJourney.map((step, index) => (
            <li key={step}>
              <span className="text-sand">{index + 1}. </span>
              {step}
            </li>
          ))}
        </ol>
      </GlassCard>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">How the AI behaves</h2>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-mute">
          {study.aiApproach.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">Why PayPal</h2>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-mute">
          {study.whyPayPalWins.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <p className="mt-4 text-xs text-mute">Figures are approximate, from public reporting.</p>
      </GlassCard>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">My role</h2>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-mute">
          {study.role.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="font-serif text-2xl text-ink">If this were real</h2>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-mute">
          {study.nextBuild.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </GlassCard>

      <p className="rounded-2xl border border-clay/30 bg-clay/10 px-5 py-4 text-sm text-sand">{study.disclaimer}</p>
    </CaseStudyLayout>
  );
}
