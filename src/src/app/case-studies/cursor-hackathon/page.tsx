import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { CTAButton } from '@/components/CTAButton';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/lib/site';

export const metadata = {
  title: `${site.cursorCaseStudy.title} — Case Study`,
  description: site.cursorCaseStudy.subtitle,
};

export default function CursorHackathonPage() {
  const caseStudy = site.cursorCaseStudy;

  return (
    <main className="container container-narrow">
      <div className="topbar">
        <Link href="/" className="text-link">
          ← Back to home
        </Link>
        <Badge label="Cursor Hackathon" tone="accent" />
      </div>

      <section className="section-tight">
        <h1 className="hero-title">{caseStudy.title}</h1>
        <p className="text-muted text-small">{caseStudy.subtitle}</p>
      </section>

      <section className="section-tight">
        {caseStudy.teams.map((team) => (
          <Card key={team.name} className="stack-md">
            <div>
              <h2 className="heading-md">{team.name}</h2>
            </div>
            <div className="grid-2">
              <div>
                <h3 className="label">Problem</h3>
                <p className="text-muted text-small">{team.problem}</p>
              </div>
              <div>
                <h3 className="label">Approach</h3>
                <p className="text-muted text-small">{team.approach}</p>
              </div>
              <div>
                <h3 className="label">Outcome</h3>
                <p className="text-muted text-small">{team.outcome}</p>
              </div>
              <div>
                <h3 className="label">Why it matters</h3>
                <p className="text-muted text-small">{team.why}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="section-tight">
        <SectionHeading
          eyebrow="Built with Cursor"
          title="Workflow prompts"
          description="Example prompts that shaped the builds (public-safe)."
        />
        <Card className="stack-sm text-muted text-small">
          {caseStudy.builtWithCursor.map((prompt) => (
            <div key={prompt} className="panel">
              {prompt}
            </div>
          ))}
        </Card>
      </section>

      <CTAButton href="/#wins" label="Back to trophy cabinet" variant="ghost" />
    </main>
  );
}
