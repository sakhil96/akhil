import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export const metadata = {
  title: `${site.cursorCaseStudy.title} — Case note`,
  description: site.cursorCaseStudy.subtitle,
};

export default function CursorHackathonPage() {
  const caseStudy = site.cursorCaseStudy;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <div className="mb-10 flex items-center justify-between">
        <Link href="/" className="text-sm text-mist hover:text-fog">
          ← Home
        </Link>
        <Badge label="Cursor Hackathon" />
      </div>

      <section className="space-y-4">
        <h1 className="font-serif text-4xl leading-tight text-fog md:text-5xl">{caseStudy.title}</h1>
        <p className="text-lg leading-relaxed text-mist">{caseStudy.subtitle}</p>
      </section>

      <section className="mt-12 space-y-4">
        {caseStudy.teams.map((team) => (
          <GlassCard key={team.name} className="space-y-6">
            <h2 className="font-serif text-2xl text-fog">{team.name}</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-fog">Problem</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{team.problem}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-fog">Approach</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{team.approach}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-fog">Outcome</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{team.outcome}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-fog">Why it matters</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{team.why}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      <section className="mt-12 space-y-4">
        <SectionHeading
          eyebrow="Built with Cursor"
          title="Prompts that shaped the builds"
          description="Public-safe examples — the kind of instruction that keeps a weekend honest."
        />
        <GlassCard hover={false} className="space-y-3">
          {caseStudy.builtWithCursor.map((prompt) => (
            <p key={prompt} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-mist">
              {prompt}
            </p>
          ))}
        </GlassCard>
      </section>

      <div className="mt-10">
        <Button href="/#work" variant="ghost">
          Back to work
        </Button>
      </div>
    </main>
  );
}
