import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';

type AchievementCardProps = {
  title: string;
  tags: string[];
  bullets: string[];
  subtitle?: string;
  when?: string;
  href?: string;
  cta?: string;
};

export function AchievementCard({
  title,
  tags,
  bullets,
  subtitle,
  when,
  href,
  cta,
}: AchievementCardProps) {
  return (
    <Card>
      <div className="card-orb" />
      <div className="card-content">
        <div className="tag-row">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} tone="muted" />
          ))}
        </div>
        <div className="stack-sm">
          <h3 className="heading-md">{title}</h3>
          {(subtitle || when) && (
            <div className="tag-row text-muted">
              {subtitle && <span>{subtitle}</span>}
              {when && (
                <span className="badge badge--muted">{when}</span>
              )}
            </div>
          )}
        </div>
        <ul className="bullet-list">
          {bullets.map((bullet) => (
            <li key={bullet} className="bullet-item">
              <span className="bullet-dot" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        {href ? (
          <Link
            href={href}
            className="btn-link"
          >
            {cta ?? 'Read more →'}
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
