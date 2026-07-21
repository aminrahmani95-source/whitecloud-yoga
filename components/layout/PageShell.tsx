import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CloudField } from "@/components/splash/CloudField";
import { studioNav } from "@/lib/nav";

/**
 * پوستهٔ صفحه‌های داخلی باشگاه.
 *
 * هدر، سربرگ و فوتر را یک‌جا می‌دهد تا شش صفحهٔ داخلی دقیقاً یک ریتم داشته
 * باشند و هر صفحه چیدمان خودش را اختراع نکند. صفحهٔ ورودی و خانهٔ باشگاه
 * از این استفاده نمی‌کنند چون سربرگ اختصاصی خودشان را دارند.
 */
export function PageShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader section="studio" nav={studioNav} />

      {/*
        ابرهای شناور پشت کل صفحه — همان‌هایی که در صفحهٔ ورودی هستند، تا حس
        صفحهٔ ورودی داخل باشگاه هم ادامه پیدا کند.
        behindText شفافیت را نصف می‌کند؛ اینجا متن روی ابرها می‌افتد و بدون
        آن، متن ثانویه از استاندارد کنتراست پایین می‌رفت.
        isolate روی main لازم است تا -z-10 ابرها زیر محتوا بماند و از پس‌زمینهٔ
        صفحه بیرون نزند.
      */}
      <main className="relative isolate flex-1">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <CloudField behindText />
        </div>

        <header className="relative border-b border-line bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="mb-3 text-sm font-medium tracking-wide text-sky-text">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                {title}
              </h1>
              {lead && (
                <p className="mt-4 text-base leading-loose text-muted sm:text-lg">
                  {lead}
                </p>
              )}
            </div>
          </div>
        </header>

        {children}
      </main>

      <SiteFooter />
    </>
  );
}
