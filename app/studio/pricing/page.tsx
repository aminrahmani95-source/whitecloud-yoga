import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Section, SectionHeading } from "@/components/ui/Section";
import { planGroups, formatToman, type Plan } from "@/lib/data/pricing";
import { contact } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "تعرفه‌ها",
  description:
    "تعرفه‌ها و بسته‌های ثبت‌نام استودیو یوگا ابر سفید — جلسهٔ آشنایی رایگان، تک‌جلسه، بسته‌های ماهانه و کلاس خصوصی. ثبت‌نام با تماس تلفنی.",
  alternates: { canonical: "/studio/pricing/" },
};

/*
 * ⚠️ یادداشت داخلی (عمداً روی صفحه نمایش داده نمی‌شود):
 * قیمت‌های lib/data/pricing.ts هنوز placeholder هستند و باید با نرخ واقعی
 * باشگاه جایگزین شوند. این هشدار در کد می‌ماند نه در صفحه — نوشتن
 * «قیمت‌ها موقت است» روی سایت زنده، اعتماد هنرجو را می‌گیرد. تا وقتی
 * نرخ نهایی نشده، بهتر است صفحه منتشر نشود.
 */

/*
 * ── جای اتصال درگاه پرداخت ──────────────────────────────────────────────
 * در این نسخه پرداخت آنلاین وجود ندارد. هر دکمه یک <a href="tel:...">
 * ساده است و هیچ فرآیند خریدی را شبیه‌سازی نمی‌کند — نمایش دادن یک
 * «سبد خرید» که کار نمی‌کند بدتر از نداشتن آن است.
 *
 * وقتی درگاه (زرین‌پال / آی‌دی‌پی / …) اضافه شد:
 *   ۱. در Plan یک فیلد اختیاری مثل `gatewayId` اضافه شود.
 *   ۲. همین <PlanCta> به دکمه‌ای تبدیل شود که آن شناسه را می‌فرستد.
 *   ۳. چون خروجی سایت استاتیک است (output: "export")، فراخوانی پرداخت
 *      باید سمت کلاینت به سرویس بیرونی برود؛ اینجا API route نداریم.
 * بقیهٔ صفحه دست‌نخورده می‌ماند — قیمت، شرط‌ها و چیدمان همه از داده می‌آیند.
 * ────────────────────────────────────────────────────────────────────────
 */

/** تیک کوچک کنار هر شرط — تزئینی، پس از صفحه‌خوان پنهان است */
function CheckMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1.5 h-3.5 w-3.5 shrink-0 text-sky-deep"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  // جدا کردن price تا باریک‌سازی نوع (null یا عدد) بدون cast انجام شود
  const { price } = plan;

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-surface p-6 shadow-soft sm:p-7 ${
        plan.featured
          ? // بستهٔ شاخص با حاشیه و بج متمایز می‌شود، نه با پُرکردن کارت از آبی —
            // متن روشن روی آبی خوانا نیست و کل کارت هم پررنگ‌تر از حد این طرح می‌شود.
            "border-sky-deep ring-1 ring-sky-deep"
          : "border-line"
      }`}
    >
      {/* نام و بج در یک سطر می‌نشینند تا نام بسته‌ها در همهٔ کارت‌ها هم‌تراز بماند */}
      <div className="flex min-h-7 flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
        {plan.featured && (
          <span className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-ink">
            پیشنهاد ما
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="flex flex-wrap items-baseline gap-x-2">
          {/* بدون کلاس tabular — ارقام فارسیِ هم‌عرض در استعداد خیلی باز
              می‌شوند و قیمت کش‌آمده به نظر می‌رسد؛ اینجا ستونی هم نیست که
              بخواهد هم‌تراز بماند (برخلاف جدول برنامه). */}
          <span className="text-2xl font-semibold text-ink">
            {price === null ? "رایگان" : formatToman(price)}
          </span>
          {price !== null && <span className="text-sm text-muted">تومان</span>}
        </p>
        {plan.unit && <p className="mt-1.5 text-sm text-muted">{plan.unit}</p>}
      </div>

      <p className="mt-5 text-sm leading-loose text-muted">{plan.description}</p>

      <ul className="mt-5 space-y-2.5">
        {plan.notes.map((note) => (
          <li key={note} className="flex gap-x-2.5 text-sm leading-relaxed text-muted">
            <CheckMark />
            <span>{note}</span>
          </li>
        ))}
      </ul>

      {/* mt-auto دکمه را ته کارت نگه می‌دارد تا در یک ردیف همه هم‌تراز باشند */}
      <div className="mt-auto pt-7">
        <a
          href={contact.phone.href}
          aria-label={`تماس برای ثبت‌نام در ${plan.name} — ${contact.phone.display}`}
          className="block rounded-full bg-sky px-5 py-3 text-center text-sm font-medium text-ink shadow-soft transition-colors duration-300 hover:bg-sky-hover"
        >
          تماس برای ثبت‌نام
        </a>
      </div>
    </div>
  );
}

/** پیکان «برو به» — در صفحهٔ راست‌به‌چپ، جهتِ جلو یعنی سمت چپ */
function ArrowStart() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-sky-deep"
    >
      <path d="M11.5 4.5 6 10l5.5 5.5" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="تعرفه‌ها"
      title="بسته‌ها و شرایط ثبت‌نام"
      lead="هر بسته‌ای که انتخاب کنید، اولین قدم یکی است: یک تماس کوتاه تا با هم ببینیم کدام کلاس و کدام ساعت به شما می‌خورد."
    >
      {planGroups.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          // خط مویی بالا فقط برای گروه‌های بعدی — مرز گروه‌ها بدون شلوغی دیده شود
          className={index > 0 ? "border-t border-line" : ""}
        >
          <SectionHeading title={group.title} lead={group.lead} />

          <div
            className={`grid gap-6 sm:grid-cols-2 ${
              // فقط گروه سه‌تایی به ستون سوم می‌رود؛ گروه دوتایی در سه‌ستونه لنگ می‌ماند
              group.plans.length >= 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {group.plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </Section>
      ))}

      <Section className="border-t border-line">
        <SectionHeading
          title="قدم بعدی"
          // شماره با جداکنندهٔ دوطرفه (LRI…PDI) جدا می‌شود: ارقام فارسی کلاس
          // دوطرفهٔ EN دارند و فاصلهٔ بین گروه‌ها در جملهٔ راست‌به‌چپ به R تبدیل
          // می‌شود، پس بدون این جداسازی «۰۹۳۸ ۷۷ ۷۷ ۳۳۷» وارونه و به شکل
          // «۳۳۷ ۷۷ ۷۷ ۰۹۳۸» دیده می‌شود. جاهای دیگر سایت همین کار را با
          // dir="ltr" می‌کنند؛ اینجا مقدار یک رشته است نه JSX.
          lead={`ثبت‌نام حضوری یا تلفنی انجام می‌شود — شمارهٔ استودیو \u2066${contact.phone.display}\u2069. اگر هنوز مطمئن نیستید، این دو صفحه معمولاً جواب سؤال‌ها را می‌دهند.`}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/studio/faq/"
            className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-colors duration-300 hover:bg-bg sm:p-7"
          >
            <span className="flex items-center gap-x-2 text-base font-semibold text-sky-text">
              <ArrowStart />
              سؤال‌های پرتکرار
            </span>
            <span className="mt-3 text-sm leading-loose text-muted">
              چه بپوشم، مت لازم است، دیر رسیدن اشکالی دارد — جواب چیزهایی که
              پیش از اولین جلسه ذهن‌تان را مشغول می‌کند.
            </span>
          </Link>

          <Link
            href="/studio/schedule/"
            className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-colors duration-300 hover:bg-bg sm:p-7"
          >
            <span className="flex items-center gap-x-2 text-base font-semibold text-sky-text">
              <ArrowStart />
              برنامهٔ هفتگی
            </span>
            <span className="mt-3 text-sm leading-loose text-muted">
              ساعت کلاس‌ها را ببینید و مطمئن شوید بستهٔ انتخابی‌تان با روزهایی
              که وقت دارید جور درمی‌آید.
            </span>
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
