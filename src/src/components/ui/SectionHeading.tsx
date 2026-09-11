type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mist">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight text-fog md:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-mist">{description}</p> : null}
    </div>
  );
}
