import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { CTAButton } from '@/components/CTAButton';
import { CopyButton } from '@/components/CopyButton';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Terminal } from '@/components/Terminal';
import { AchievementCard } from '@/components/AchievementCard';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <div className="page">
      <main className="container">
        <section className="hero">
          <div className="hero-meta">
            <span className="pill">Signal → Inference → Outcome</span>
            <span>{site.profile.location}</span>
          </div>
          <div className="stack-lg">
            <div className="stack-md">
              <h1 className="hero-title">
                {site.profile.name}
                <span className="text-gradient" style={{ display: 'block' }}>
                  {site.hero.headline}
                </span>
              </h1>
              <p className="hero-subtitle">{site.profile.role}</p>
              <p className="hero-body">{site.hero.subheadline}</p>
              <div className="badge-row">
                {site.hero.badges.map((badge) => (
                  <Badge key={badge.label} label={badge.label} tone={badge.tone} />
                ))}
              </div>
            </div>
            <div className="cta-row">
              <CTAButton href="#case-studies" label="View case studies" />
              <CTAButton href="#contact" label="Get in touch" variant="ghost" />
            </div>
          </div>
        </section>

        <section id="system" className="section">
          <SectionHeading
            eyebrow="System Snapshot"
            title="Platform-grade execution, product-first thinking."
            description="A quick glance at the signal surface I operate on."
          />
          <div className="grid-4">
            {site.systemSnapshot.map((item) => (
              <Reveal key={item.label}>
                <Card className="stack-sm">
                  <span className="eyebrow">{item.label}</span>
                  <span className="heading-md">{item.value}</span>
                </Card>
              </Reveal>
            ))}
          </div>
          <Card className="card-outline">
            <div className="stack-sm">
              <Badge label="PayPal × Google Cloud Summit" tone="muted" />
              <p className="text-muted text-small">
                Shared platform insights and modern cloud-native patterns for AI inference at scale.
                Public-safe, high-level, and focused on product outcomes.
              </p>
            </div>
          </Card>
        </section>

        <section id="terminal" className="section-tight">
          <SectionHeading
            eyebrow="Interactive"
            title="Control room terminal"
            description="Quick commands to explore wins, projects, and contact."
          />
          <Terminal />
        </section>

        <section id="wins" className="section">
          <SectionHeading
            eyebrow="Trophy Cabinet"
            title="Hackathon wins with platform-grade execution."
            description="Problem → Build → Result, with no internal-only details."
          />
          <div className="grid-3">
            {site.trophies.map((trophy) => (
              <Reveal key={trophy.title}>
                <AchievementCard {...trophy} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="case-studies" className="section">
          <SectionHeading
            eyebrow="Case Studies"
            title="Deep dives on AI-first product strategy."
            description="Two flagship builds that show platform thinking and product execution."
          />
          <div className="grid-2">
            {site.caseStudies.map((study) => (
              <Reveal key={study.slug}>
                <Card className="stack-md">
                  <div className="tag-row">
                    {study.tags.map((tag) => (
                      <Badge key={tag} label={tag} tone="muted" />
                    ))}
                  </div>
                  <div>
                    <h3 className="heading-md">{study.title}</h3>
                    <p className="text-muted text-small">{study.subtitle}</p>
                  </div>
                  <p className="text-muted text-small">{study.summary}</p>
                  <CTAButton href={study.href} label="Read case study →" variant="ghost" />
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHeading
            eyebrow="Projects"
            title="AI-first systems with a product spine."
            description="Platform-style builds that prioritize reliability and clarity."
          />
          <div className="grid-3">
            {site.projects.map((project) => (
              <Reveal key={project.name}>
                <Card className="stack-md">
                  <h3 className="heading-md">{project.name}</h3>
                  <p className="text-muted text-small">{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <Badge key={tag} label={tag} tone="muted" />
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading
            eyebrow="Experience"
            title="Credibility at scale, delivered safely."
            description="Public-safe highlights across PayPal, Oracle, and TCS."
          />
          <div className="stack-md">
            {site.experience.map((role) => (
              <Reveal key={role.company}>
                <Card className="stack-md">
                  <div className="row-between">
                    <div>
                      <h3 className="heading-md">{role.role}</h3>
                      <p className="text-muted text-small">{role.company}</p>
                    </div>
                    <span className="text-muted text-xsmall">{role.period}</span>
                  </div>
                  <ul className="bullet-list">
                    {role.highlights.map((item) => (
                      <li key={item} className="bullet-item">
                        <span className="bullet-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeading
            eyebrow="Skills"
            title="Full-stack product systems."
            description="Design, frontend, and backend skills that connect end-to-end."
          />
          <div className="grid-3">
            {site.skills.map((group) => (
              <Reveal key={group.group}>
                <Card className="stack-md">
                  <h3 className="heading-md">{group.group}</h3>
                  <div className="tag-row">
                    {group.items.map((item) => (
                      <Badge key={item} label={item} tone="muted" />
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section-tight">
          <SectionHeading
            eyebrow="Contact"
            title={site.contact.headline}
            description={site.contact.subheadline}
          />
          <Card className="stack-md">
            <div className="stack-sm text-muted text-small">
              <div>
                Email:{' '}
                <Link href={`mailto:${site.profile.email}`} className="text-link">
                  {site.profile.email}
                </Link>
              </div>
              <div>
                LinkedIn:{' '}
                <Link
                  href={site.profile.links.linkedin}
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.profile.links.linkedin}
                </Link>
              </div>
              <div>
                GitHub:{' '}
                <Link
                  href={site.profile.links.github}
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.profile.links.github}
                </Link>
              </div>
            </div>
            <div className="cta-row">
              <CTAButton href={`mailto:${site.profile.email}`} label="Email me" />
              <CopyButton value={site.profile.email} />
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
