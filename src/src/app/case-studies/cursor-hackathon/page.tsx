import { CaseStudyLayout } from '@/components/CaseStudyLayout';
import { GlassCard } from '@/components/GlassCard';
import { site } from '@/lib/site';

export const metadata = {
  title: `${site.cursorCaseStudy.title} — Case study`,
  description: site.cursorCaseStudy.subtitle,
};

export default function CursorHackathonPage() {
  const caseStudy = site.cursorCaseStudy;

  return (
    <CaseStudyLayout kicker="Cursor Hackathon" title={caseStudy.title} subtitle={caseStudy.subtitle}>
      {caseStudy.teams.map((team) => (
        <GlassCard key={team.name} className="space-y-8">
          <h2 className="font-serif text-2xl text-ink">{team.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Block label="Problem" text={team.problem} />
            <Block label="Approach" text={team.approach} />
            <Block label="Outcome" text={team.outcome} />
            <Block label="Why it matters" text={team.why} />
          </div>
        </GlassCard>
      ))}

      <section>
        <h2 className="font-serif text-2xl text-ink">How Cursor was used</h2>
        <p className="mt-2 text-sm text-mute">Public-safe prompts that shaped the builds.</p>
        <div className="mt-6 space-y-3">
          {caseStudy.builtWithCursor.map((prompt) => (
            <p key={prompt} className="glass rounded-2xl px-5 py-4 text-sm leading-relaxed text-mute">
              {prompt}
            </p>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-sand">{label}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
    </div>
  );
}
