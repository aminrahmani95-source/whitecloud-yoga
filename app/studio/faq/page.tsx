import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { faqs } from "@/lib/data/faq";
import { contact } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "سؤال‌های پرتکرار",
  description:
    "پاسخ سؤال‌های رایج دربارهٔ کلاس‌های باشگاه بانوان ابر سفید در کرج، مهرویلا — از انعطاف و انتخاب کلاس مبتدی و لباس مناسب تا تمرین در دوران بارداری و قاعدگی و نحوهٔ ثبت‌نام.",
  alternates: { canonical: "/studio/faq/" },
};

/**
 * سؤالی که به‌صورت پیش‌فرض باز است.
 *
 * با شناسه انتخاب می‌شود نه با اندیس صفر، تا اگر روزی ترتیب faq.ts عوض شد
 * همچنان همان سؤالِ «انعطاف ندارم» باز بماند — نه هر چیزی که تصادفاً اول شد.
 */
const OPEN_BY_DEFAULT = "flexibility";

export default function FaqPage() {
  return (
    <PageShell
      eyebrow="سؤال‌های پرتکرار"
      title="چیزهایی که خوب است پیش از اولین کلاس بدانید"
      lead="هرچه بیشتر از ما پرسیده‌اند این‌جا جمع است؛ از «انعطاف ندارم» تا لباس و وسایل و ثبت‌نام. روی هر سؤال بزنید تا پاسخش باز شود."
    >
      <Section>
        {/*
          آکاردئون با <details> بومی مرورگر ساخته شده — بدون جاوااسکریپت،
          بدون state. یعنی صفحه سرور-کامپوننت می‌ماند، با کیبورد و صفحه‌خوان
          از همان اول درست کار می‌کند و اگر جاوااسکریپت هم نرسد باز شدنی است.
        */}
        <ul className="space-y-3 sm:space-y-4">
          {faqs.map((item) => (
            <li key={item.id}>
              <details
                open={item.id === OPEN_BY_DEFAULT}
                className="group overflow-hidden rounded-2xl bg-surface shadow-soft"
              >
                {/*
                  list-none و پنهان‌کردن مارکر وبکیت، مثلث پیش‌فرض مرورگر را
                  برمی‌دارد تا فلش خودمان جایش بنشیند.
                */}
                <summary
                  className="
                    flex cursor-pointer list-none items-center justify-between gap-4
                    px-5 py-5 transition-colors duration-300 hover:bg-line/50
                    sm:px-7 sm:py-6
                    [&::-webkit-details-marker]:hidden
                  "
                >
                  <h2 className="text-base font-semibold leading-relaxed text-ink sm:text-lg">
                    {item.question}
                  </h2>

                  {/*
                    فلش رو به پایین است و با باز شدن ۱۸۰ درجه می‌چرخد. عمداً
                    فلش عمودی انتخاب شده نه افقی: شکلش نسبت به محور عمودی
                    قرینه است، پس در صفحهٔ راست‌به‌چپ هم به سمت درست می‌ماند و
                    نیازی به وارونه‌سازی ندارد.
                  */}
                  <svg
                    viewBox="0 0 16 16"
                    className="
                      h-4 w-4 shrink-0 text-sky-deep
                      transition-transform duration-300 group-open:rotate-180
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 6L8 10L12 6" />
                  </svg>
                </summary>

                <p className="px-5 pb-6 text-sm leading-loose text-muted sm:px-7 sm:pb-7 sm:text-base">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Section>

      {/* راه خروج صفحه: کسی که جوابش را پیدا نکرد نباید به بن‌بست بخورد */}
      <Section className="pt-0">
        <div className="rounded-2xl bg-surface p-7 shadow-soft sm:p-10">
          <h2 className="text-xl font-semibold leading-snug text-ink sm:text-2xl">
            سؤال‌تان این‌جا نبود؟
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-loose text-muted sm:text-base">
            بپرسید. یک تماس یا یک پیام کافی است. اگر دربارهٔ شرایط جسمی خاصی
            تردید دارید، بهتر است پیش از ثبت‌نام تلفنی صحبت کنیم تا کلاس درست
            را با هم انتخاب کنیم.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* پُرکنندهٔ آبی همیشه متن ink می‌گیرد — قاعدهٔ ۱ */}
            <a
              href={contact.phone.href}
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                bg-sky px-6 py-3 text-sm font-medium text-ink
                transition-colors duration-300 hover:bg-sky-hover
              "
            >
              تماس با استودیو
              <PhoneNumber />
            </a>

            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                border border-line bg-bg px-6 py-3 text-sm font-medium text-ink
                transition-colors duration-300 hover:bg-line/60
              "
            >
              پیام در اینستاگرام
              <span dir="ltr">{contact.instagram.display}</span>
            </a>
          </div>

          <p className="mt-5 text-sm leading-loose text-muted">
            پاسخ‌گویی {contact.hours.days}، {contact.hours.opens}.
          </p>
        </div>
      </Section>

      {/*
        دادهٔ ساخت‌یافتهٔ FAQPage.
        برای یک باشگاه محلی ارزشش زیاد است: گوگل می‌تواند همین سؤال‌ها را
        مستقیم زیر نتیجهٔ سایت نشان دهد، پس کسی که «یوگا کرج» را جست‌وجو
        می‌کند جوابش را پیش از کلیک هم می‌بیند. متن دقیقاً همان faq.ts است
        تا با آنچه کاربر روی صفحه می‌بیند یکی باشد.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: `سؤال‌های پرتکرار — ${contact.name}`,
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </PageShell>
  );
}
