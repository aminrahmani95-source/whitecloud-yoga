import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ClockIcon, InstagramIcon, PinIcon } from "@/components/ui/Icon";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { Intro } from "@/components/studio/Intro";
import { News } from "@/components/studio/News";
import { CloudField } from "@/components/splash/CloudField";
import { studioNav } from "@/lib/nav";
import { contact } from "@/lib/data/contact";
import { styles } from "@/lib/data/styles";
import { instructors } from "@/lib/data/instructors";
import { weekSchedule } from "@/lib/data/schedule";

export const metadata: Metadata = {
  title: "باشگاه",
  description:
    "خانهٔ باشگاه بانوان ابر سفید در کرج، مهرویلا — سبک‌های کلاس، برنامهٔ هفتگی، معرفی مربیان، تعرفه‌ها و تازه‌های استودیو.",
  alternates: { canonical: "/studio/" },
};

/* ------------------------------------------------------------------ */
/* مقصدهای صفحهٔ خانه                                                  */
/* ------------------------------------------------------------------ */

/**
 * این صفحه دیگر محتوای بخش‌ها را در خودش نگه نمی‌دارد؛ کارش راهنمایی است.
 *
 * توضیح هر مقصد عمداً همین‌جا نوشته شده و نه در lib/nav.ts: آن فایل فقط
 * برچسب و نشانی را نگه می‌دارد و هدر و فوتر هم از آن می‌خوانند، در حالی که
 * این جمله‌ها فقط به این صفحه تعلق دارند و لحن‌شان برای همین‌جا نوشته شده.
 *
 * اما شمار سبک‌ها و مربیان و روزهای هفته از خود فایل‌های داده خوانده می‌شود،
 * نه دستی نوشته: اگر سبکی اضافه یا مربی‌ای کم شود، این جمله‌ها بی‌سروصدا
 * دروغ نمی‌شوند.
 */
const fa = (n: number) => n.toLocaleString("fa-IR");
const firstDay = weekSchedule[0].label;
const lastDay = weekSchedule[weekSchedule.length - 1].label;

const destinations: { href: string; label: string; description: string }[] = [
  {
    href: "/studio/classes/",
    label: "کلاس‌ها",
    description: `${fa(
      styles.length,
    )} سبک یوگا، از هاتای کند تا آشتانگای منظم — با ریتم و مخاطب هرکدام، تا ببینید کدام به این روزهای شما می‌خورد.`,
  },
  {
    href: "/studio/schedule/",
    label: "برنامهٔ هفتگی",
    description: `ساعت کلاس‌های ${firstDay} تا ${lastDay}، همراه با سطح هر جلسه، نام مربی و ظرفیتش.`,
  },
  {
    href: "/studio/teachers/",
    label: "مربیان",
    description: `${fa(
      instructors.length,
    )} مربی با چهار جور کلاس — پیش از اولین جلسه ببینید هرکدام کلاس را چطور پیش می‌برند.`,
  },
  {
    href: "/studio/pricing/",
    label: "تعرفه‌ها",
    description:
      "جلسهٔ آشنایی رایگان، تک‌جلسه و بسته‌های ماهانه — با شرط‌های هر بسته، بدون ستارهٔ ریز.",
  },
];

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

export default function StudioHomePage() {
  return (
    <>
      <SiteHeader section="studio" nav={studioNav} />

      {/*
        همان ابرهای شناور صفحهٔ ورودی، پشت کل صفحهٔ باشگاه.
        behindText شفافیت را نصف می‌کند؛ اینجا متن روی ابرها می‌افتد و بدون
        آن، متن ثانویه از استاندارد کنتراست پایین می‌رفت.
      */}
      <main className="relative isolate flex-1">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <CloudField behindText />
        </div>

        <Intro />

        {/*
         * لنگر id="schedule" عمداً روی این بخش نشسته است.
         * دکمهٔ اصلی Intro هنوز به #schedule اشاره می‌کند، ولی برنامهٔ هفتگی
         * از این صفحه بیرون رفته و صفحهٔ خودش را دارد. بدون این لنگر آن دکمه
         * هیچ کاری نمی‌کرد؛ با آن، بازدیدکننده روی همین کارت‌ها می‌نشیند که
         * اولین گزینه‌شان همان برنامهٔ هفتگی است.
         * وقتی Intro اصلاح شد و مستقیم به /studio/schedule/ رفت، این id
         * بی‌مصرف می‌شود و می‌تواند حذف شود.
         */}
        <Section id="schedule" className="border-t border-line">
          <SectionHeading
            eyebrow="کجا برویم"
            title="از این‌جا شروع کنید"
            lead="چهار صفحه‌ای که معمولاً پیش از اولین جلسه سراغ‌شان می‌روند. هرکدام یک قدم از راه را روشن می‌کند."
          />

          {/*
           * دو ستون و نه چهار: توضیح هر کارت یک جملهٔ کامل فارسی است و در
           * ستون‌های باریک به سه سطر تکه‌تکه می‌شکند. ۲×۲ فضای نفس‌کشیدن
           * دارد و با آرامش بقیهٔ سایت جور است.
           */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {destinations.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft transition-colors duration-300 hover:bg-bg sm:p-7"
              >
                <span className="flex items-center gap-x-2 text-base font-semibold text-sky-text">
                  <ArrowStart />
                  {item.label}
                </span>
                <span className="mt-3 text-sm leading-loose text-muted">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <News />

        {/*
          ---- نوار پایانی تماس ----
          شناسه عمداً «visit» است و نه «contact»: خودِ SiteFooter روی عنصر
          <footer> شناسهٔ contact را دارد و هر دو در همین صفحه رندر می‌شوند.
          دو عنصر با یک id هم HTML نامعتبر است و هم پرش لنگر را غیرقابل‌پیش‌بینی
          می‌کند.
        */}
        <Section id="visit" className="border-t border-line">
          <SectionHeading
            eyebrow="تماس"
            title="سری به ما بزنید"
            lead="ثبت‌نام آنلاین نداریم؛ همه‌چیز تلفنی یا حضوری انجام می‌شود. برای گرفتن جا یا پرسیدن سؤالی که ماندنی شده، یک تماس کوتاه کافی است."
          />

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {/* ستون نشانی */}
              <div>
                <h3 className="text-base font-semibold text-ink">نشانی استودیو</h3>

                <p className="mt-4 flex gap-x-2.5 text-sm leading-loose text-muted">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-deep" />
                  <span>
                    {contact.address.full}
                  </span>
                </p>

                <p className="mt-3 flex gap-x-2.5 text-sm leading-loose text-muted">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky-deep" />
                  <span>
                    {contact.hours.days}، {contact.hours.opens}
                  </span>
                </p>

                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-x-2 text-sm font-medium text-sky-text transition-colors duration-300 hover:text-ink"
                >
                  <ArrowStart />
                  مسیریابی روی نقشه
                </a>
              </div>

              {/* ستون تماس */}
              <div>
                <h3 className="text-base font-semibold text-ink">
                  راه‌های تماس
                </h3>

                <p className="mt-4 text-sm leading-loose text-muted">
                  تلفن استودیو در ساعت کار جواب داده می‌شود. اگر ترجیح می‌دهید
                  بنویسید، دایرکت اینستاگرام هم باز است.
                </p>

                {/* در موبایل تمام‌عرض و روی هم — دکمه‌ها نباید در ۳۷۵ پیکسل بشکنند */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    href={contact.phone.href}
                    aria-label={`تماس با استودیو، ${contact.phone.display}`}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-sky px-6 py-3.5 text-base font-medium text-ink shadow-soft transition-colors duration-300 hover:bg-sky-hover sm:w-auto"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5.5 2.5H3.2c-.4 0-.7.3-.7.7C2.5 9 7 13.5 12.8 13.5c.4 0 .7-.3.7-.7v-2.3l-2.6-.9-1.3 1.3a9.4 9.4 0 01-3.5-3.5l1.3-1.3-.9-2.6z" />
                    </svg>
                    <PhoneNumber />
                  </a>

                  <a
                    href={contact.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`اینستاگرام استودیو، ${contact.instagram.display}`}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-base font-medium text-sky-text transition-colors duration-300 hover:bg-bg sm:w-auto"
                  >
                    <InstagramIcon />
                    {/*
                     * شناسه در موبایل کوتاه می‌شود تا دکمه از عرض ۳۷۵ بیرون
                     * نزند؛ روی نمایشگر بزرگ‌تر کامل دیده می‌شود.
                     */}
                    <span className="truncate">
                      <span className="sm:hidden">اینستاگرام</span>
                      {/* فقط شناسهٔ لاتین dir="ltr" می‌گیرد، نه واژهٔ فارسی */}
                      <span dir="ltr" className="hidden sm:inline">
                        {contact.instagram.display}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />

      {/*
        دادهٔ ساخت‌یافته برای موتورهای جست‌وجو.
        باعث می‌شود گوگل نشانی و ساعت کار را مستقیم در نتایج نشان دهد —
        برای یک کسب‌وکار محلی مهم‌ترین چیزی است که می‌شود به صفحه اضافه کرد.
        فقط اقلامی اینجا هستند که راستی‌آزمایی چندمنبعی شده‌اند (نگاه کنید به
        توضیحات lib/data/contact.ts).
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            name: contact.name,
            alternateName: contact.nameEn,
            description:
              "استودیو تخصصی یوگای بانوان در کرج، مهرویلا. کلاس‌های هاتا، وینیاسا، یین، آشتانگا، هوت یوگا و رستوراتیو.",
            address: {
              "@type": "PostalAddress",
              addressLocality: contact.address.city,
              addressRegion: "البرز",
              addressCountry: "IR",
              streetAddress: `${contact.address.district}، ${contact.address.line}`,
            },
            telephone: "+989387777337",
            sameAs: [contact.instagram.url],
          }),
        }}
      />
    </>
  );
}
