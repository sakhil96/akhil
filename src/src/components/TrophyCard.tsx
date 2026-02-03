import { Card } from '@/components/Card';
import { CTAButton } from '@/components/CTAButton';
import { Badge } from '@/components/Badge';

type TrophyCardProps = {
  title: string;
  tags: string[];
  bullets: string[];
  cta: { label: string; href: string };
};

export function TrophyCard({ title, tags, bullets, cta }: TrophyCardProps) {
  return (
    <Card>
      <div className="card-orb" />
      <div className="card-content">
        <div className="tag-row">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} tone="muted" />
          ))}
        </div>
        <h3 className="heading-md">{title}</h3>
        <ul className="bullet-list">
          {bullets.map((bullet) => (
            <li key={bullet} className="bullet-item">
              <span className="bullet-dot" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <CTAButton href={cta.href} label={cta.label} variant="ghost" />
      </div>
    </Card>
  );
}
