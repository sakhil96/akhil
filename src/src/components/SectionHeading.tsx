import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl space-y-4', className)}>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-mute">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl leading-[1.15] text-ink sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {description ? <p className="max-w-xl text-base leading-relaxed text-mute">{description}</p> : null}
    </div>
  );
}
