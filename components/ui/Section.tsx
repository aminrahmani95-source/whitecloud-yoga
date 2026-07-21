/**
 * پوسته و تیتر مشترک بخش‌ها.
 *
 * همهٔ بخش‌های سایت از این دو استفاده می‌کنند تا فاصله‌ها، عرض ستون و
 * سلسله‌مراتب تیترها یکدست بماند و هر بخش سلیقهٔ خودش را اعمال نکند.
 */

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium tracking-wide text-sky-text">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-loose text-muted sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
