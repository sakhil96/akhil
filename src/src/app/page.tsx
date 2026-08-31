import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { ChatBot } from '@/components/ChatBot';
import { CTAButton } from '@/components/CTAButton';
import { CopyButton } from '@/components/CopyButton';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { AchievementCard } from '@/components/AchievementCard';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <div className="page">
      <main className="container">
        <section className="hero hero--split">
          <div className="hero-copy stack-lg">
            <div className="hero-meta">
              <span className="pill">Hyderabad · Available for work</span>
            </div>
            <div className="stack-md">
              <p className="hero-eyebrow">{site.profile.role}</p>
              <h1 className="hero-title">
                {site.profile.name}
                <span className="text-gradient">{site.hero.headline}</span>
              </h1>
              <p className="hero-body">{site.hero.subheadline}</p>
              <div className="badge-row">
                {site.hero.badges.map((badge) => (
                  <Badge key={badge.label} label={badge.label} tone={badge.tone ?? 'accent'} />
                ))}
              </div>
            </div>
            <div className="cta-row">
              <CTAButton href="#chat" label="Ask the assistant" />
              <CTAButton href="#contact" label="Contact" variant="ghost" />
            </div>
          </div>

          <div className="hero-stats">
            {site.systemSnapshot.map((item) => (
              <Card key={item.label} className="stat-card stack-sm">
                <span className="eyebrow">{item.label}</span>
                <span className="stat-value">{item.value}</span>
              </Card>
            ))}
          </div>
        </section>

        <section id="chat" className="section">
          <SectionHeading
            eyebrow="Interactive"
            title="Chat with my portfolio"
            description="Ask about experience, hackathons, projects, skills, or how to get in touch. Answers stay grounded in my actual work — no fluff."
          />
          <ChatBot variant="embedded" />
        </section>

        <section id="work" className="section">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies & platform builds"
            description="Deep dives and production-grade systems."
          />
          <div className="grid-2">
            {site.caseStudies.map((study) => (
              <Reveal key={study.slug}>
                <Card className="stack-md feature-card">
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

        <section id="wins" className="section">
          <SectionHeading
            eyebrow="Recognition"
            title="Hackathon wins"
            description="Problem → build → result."
          />
          <div className="grid-3">
            {site.trophies.map((trophy) => (
              <Reveal key={trophy.title}>
                <AchievementCard {...trophy} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHeading
            eyebrow="Projects"
            title="Systems I build"
            description="Platform work with reliability and product judgment."
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
            title="Where I've shipped"
            description="PayPal, Oracle, and TCS — full-stack and platform."
          />
          <div className="timeline">
            {site.experience.map((role) => (
              <Reveal key={role.company}>
                <Card className="timeline-item stack-md">
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
          <Card className="contact-card stack-md">
            <div className="stack-sm text-muted text-small">
              <div>
                Email:{' '}
                <Link href={`mailto:${site.profile.email}`} className="text-link">
                  {site.profile.email}
                </Link>
              </div>
              <div>
                LinkedIn:{' '}
                <Link href={site.profile.links.linkedin} className="text-link" target="_blank" rel="noreferrer">
                  {site.profile.links.linkedin}
                </Link>
              </div>
              <div>
                GitHub:{' '}
                <Link href={site.profile.links.github} className="text-link" target="_blank" rel="noreferrer">
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
