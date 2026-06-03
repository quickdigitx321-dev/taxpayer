type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p
          className={`mb-4 text-xs font-bold uppercase tracking-[0.24em] ${
            light ? "text-gold-200" : "text-forest-700"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-4xl leading-tight md:text-5xl ${
          light ? "text-white" : "text-charcoal-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-8 ${
            light ? "text-white/65" : "text-charcoal-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
