interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center flex flex-col items-center justify-center mb-12">
      <div className="inline-block backdrop-blur-[8px] bg-black/20 border border-white/10 px-8 py-4 rounded-3xl shadow-lg">
        <h2 className="section-heading">{title}</h2>
        {subtitle && (
          <p className="section-subtitle mt-3">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
