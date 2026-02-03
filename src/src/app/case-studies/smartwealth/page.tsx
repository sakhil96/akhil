import Link from 'next/link';
import { Card } from '@/components/Card';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/lib/site';

export const metadata = {
  title: 'SmartWealth — AI Adapt Hackathon Winner',
  description:
    'SmartWealth is a hackathon concept for AI-powered investing inside PayPal, turning money-movement signal into responsible personalization.',
};

export default function SmartWealthPage() {
  const caseStudy = site.smartwealthCaseStudy;

  return (
    <main className="container container-narrow">
      <div className="topbar">
        <Link href="/" className="text-link">
          ← Back to home
        </Link>
        <Link href="/resume.pdf" target="_blank" rel="noreferrer" className="text-link">
          Resume ↗
        </Link>
      </div>

      <section className="section-tight">
        <h1 className="hero-title">{caseStudy.title}</h1>
        <p className="text-muted text-small">{caseStudy.subtitle}</p>
        <p className="hero-body">{caseStudy.hero}</p>
      </section>

      <section className="section-tight">
        <SectionHeading title="The unique advantage" />
        <Card className="text-muted text-small">
          <p>{caseStudy.uniqueAdvantage}</p>
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading title="The vision" />
        <Card className="text-muted text-small">
          <p>{caseStudy.vision}</p>
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading title="Experience design" />
        <Card className="stack-sm text-muted text-small">
          {caseStudy.experienceJourney.map((step) => (
            <div key={step} className="bullet-item">
              <span className="bullet-dot" />
              <span>{step}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading title="AI approach (high level)" />
        <Card className="stack-sm text-muted text-small">
          {caseStudy.aiApproach.map((item) => (
            <div key={item} className="bullet-item">
              <span className="bullet-dot" />
              <span>{item}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading title="Why this wins for PayPal" />
        <Card className="stack-sm text-muted text-small">
          {caseStudy.whyPayPalWins.map((item) => (
            <div key={item} className="bullet-item">
              <span className="bullet-dot" />
              <span>{item}</span>
            </div>
          ))}
          <p className="text-xsmall text-muted">
            *Stats are approximate / from public reporting.*
          </p>
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading title="My role" />
        <Card className="stack-sm text-muted text-small">
          {caseStudy.role.map((item) => (
            <div key={item} className="bullet-item">
              <span className="bullet-dot" />
              <span>{item}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading title="What I’d build next" />
        <Card className="stack-sm text-muted text-small">
          {caseStudy.nextBuild.map((item) => (
            <div key={item} className="bullet-item">
              <span className="bullet-dot" />
              <span>{item}</span>
            </div>
          ))}
        </Card>
      </section>

      <Card className="card-warning text-small">
        {caseStudy.disclaimer}
      </Card>

      <Card className="row-between">
        <div>
          <p className="heading-md">Want the 60-second version?</p>
          <p className="text-muted text-small">Jump back to the wins recap.</p>
        </div>
        <Link
          href="/hashtag#wins"
          className="btn-link"
        >
          Back to wins →
        </Link>
      </Card>
    </main>
  );
}
