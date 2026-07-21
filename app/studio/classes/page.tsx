import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { instructorById, type InstructorId } from "@/lib/data/instructors";
import { weekSchedule } from "@/lib/data/schedule";
import { styles, type StyleId } from "@/lib/data/styles";

export const metadata: Metadata = {
  title: "کلاس‌ها",
  description:
    "شش سبک یوگای استودیو ابر سفید — هاتا، وینیاسا، یین، آشتانگا، هوت یوگا و رستوراتیو. هر سبک برای چه کسی مناسب است و کدام مربی آن را تدریس می‌کند.",
  alternates: { canonical: "/studio/classes/" },
};

/* ------------------------------------------------------------------ */
/* «مناسب برای چه کسی»                                                 */
/* ------------------------------------------------------------------ */

/**
 * توضیح سبک در lib/data می‌گوید کلاس «چه هست»؛ این جمله‌ها می‌گویند «برای
 * کیست». عمداً اینجا زندگی می‌کنند و نه در lib/data/styles.ts، چون آن فایل
 * قرارداد مشترک صفحهٔ خانه و برنامه هم هست و این متن فقط به این صفحه تعلق دارد.
 *
 * تایپ Record<StyleId, string> است نه یک شیء ساده: اگر روزی سبک هفتمی به
 * styles.ts اضافه شود، TypeScript همین‌جا خطا می‌دهد و متن جاافتاده بی‌سروصدا
 * از صفحه غایب نمی‌شود.
 */
const suitedFor: Record<StyleId, string> = {
  hatha:
    "اگر اولین بار است سراغ یوگا می‌آیید، یا مدت‌هاست ورزش نکرده‌اید و می‌خواهید بدون فشار شروع کنید. هاتا وقت می‌گذارد تا بدن‌تان زبان تمرین را یاد بگیرد؛ هیچ‌چیز از شما پنهان یا سریع رد نمی‌شود.",
  vinyasa:
    "اگر وضعیت‌های پایه را می‌شناسید و دنبال تمرینی هستید که نفس‌تان را بالا بیاورد و بدن‌تان را گرم نگه دارد. مناسب کسانی که در کلاس‌های کند حوصله‌شان سر می‌رود.",
  yin: "اگر روزتان پشت میز می‌گذرد و شب‌ها کمر، لگن و پشت پاهایتان گرفته است. یین برای باز کردن گره‌های قدیمی است، نه برای عرق ریختن — و هیچ آمادگی جسمانی خاصی نمی‌خواهد.",
  ashtanga:
    "اگر با نظم و تکرار جان می‌گیرید و دوست دارید پیشرفت‌تان را هفته‌به‌هفته روی یک توالی ثابت اندازه بگیرید. برای شروع از صفر سنگین است؛ بهتر است چند ماه هاتا یا وینیاسا پشت سرتان باشد.",
  hot: "اگر بدن‌تان دیر گرم می‌شود و انعطاف به‌سختی به دست‌تان می‌آید. اگر فشار خون پایین، بارداری یا مشکل قلبی دارید، پیش از ثبت‌نام حتماً با ما و پزشک‌تان مشورت کنید.",
  restorative:
    "اگر خسته‌اید، کم‌خوابیده‌اید یا دورهٔ پرفشاری را می‌گذرانید. سطح آمادگی مهم نیست؛ تنها کاری که باید بکنید این است که اجازه بدهید بدن‌تان روی ابزارها رها شود.",
};

/* ------------------------------------------------------------------ */
/* استخراج مربیان هر سبک از برنامهٔ هفتگی                               */
/* ------------------------------------------------------------------ */

type StyleTeaching = {
  /** مربیان بدون تکرار، به ترتیب اولین حضورشان در هفته */
  instructorIds: InstructorId[];
  /** تعداد جلسه‌های آن سبک در کل هفته */
  sessionCount: number;
};

/**
 * نگاشت «سبک ← مربیان» ساخته می‌شود، نه نوشته.
 *
 * می‌شد از فیلد specialty هر مربی استفاده کرد، ولی آن یک جملهٔ معرفی است نه
 * داده؛ ممکن است مربی‌ای در تخصصش سبکی را بیاورد که این ترم تدریس نمی‌کند.
 * تنها حقیقتِ قابل اتکا خودِ برنامهٔ هفتگی است. پس هر تغییری در schedule.ts —
 * جابه‌جایی یک کلاس یا آمدن مربی جدید — بدون دست‌زدن به این فایل در صفحه
 * می‌نشیند. محاسبه در سطح ماژول است، یعنی یک بار هنگام build.
 */
const teachingByStyle = new Map<StyleId, StyleTeaching>();

for (const day of weekSchedule) {
  for (const session of day.sessions) {
    if (!session) continue; // ساعت‌های خالی برنامه

    const current = teachingByStyle.get(session.styleId) ?? {
      instructorIds: [],
      sessionCount: 0,
    };

    current.sessionCount += 1;
    if (!current.instructorIds.includes(session.instructorId)) {
      current.instructorIds.push(session.instructorId);
    }

    teachingByStyle.set(session.styleId, current);
  }
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** مثل جدول برنامه، از toLocaleString پرهیز می‌کنیم تا خروجی به ICU وابسته نباشد. */
function toPersianDigits(value: number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/* ------------------------------------------------------------------ */
/* صفحه                                                                */
/* ------------------------------------------------------------------ */

export default function ClassesPage() {
  return (
    <PageShell
      eyebrow="کلاس‌ها"
      title="شش سبک، شش ریتم متفاوت"
      lead="لازم نیست از قبل بدانید دنبال چه هستید. هر سبک را با ریتم، مخاطب و مربی‌اش اینجا آورده‌ایم تا ببینید کدام‌یک با حال و وقت این روزهای شما جور درمی‌آید."
    >
      <Section>
        {/* پرش سریع به هر سبک — صفحه بلند است و کسی که دنبال یک سبک مشخص
            آمده نباید شش بلوک را اسکرول کند. لنگرها با scroll-padding-top
            سراسری (globals.css) زیر هدر چسبان پنهان نمی‌شوند. */}
        <nav aria-label="فهرست سبک‌ها" className="mb-12 sm:mb-16">
          <ul className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <li key={style.id}>
                <a
                  href={`#${style.id}`}
                  className="
                    block rounded-full border border-line bg-surface px-4 py-2
                    text-sm text-ink transition-colors duration-300
                    hover:border-sky-deep hover:bg-bg
                  "
                >
                  {style.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6 sm:space-y-8">
          {styles.map((style) => {
            const teaching = teachingByStyle.get(style.id);

            return (
              <article
                key={style.id}
                id={style.id}
                aria-labelledby={`${style.id}-title`}
                className="rounded-2xl bg-surface p-6 shadow-soft sm:p-8 lg:p-10"
              >
                {/* در RTL ستون اول سمت راست می‌نشیند، پس شناسنامهٔ سبک راست
                    و شرح آن چپ قرار می‌گیرد. زیر md همه‌چیز روی هم می‌آید. */}
                <div className="grid gap-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10 lg:gap-14">
                  <div>
                    <h2
                      id={`${style.id}-title`}
                      className="text-xl font-semibold leading-snug text-ink sm:text-2xl"
                    >
                      {style.name}
                    </h2>
                    {/* نام لاتین در متن راست‌به‌چپ باید جهت خودش را داشته باشد */}
                    <p className="mt-1 text-sm text-muted">
                      <span dir="ltr">{style.nameEn}</span>
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                      {/* پُرکنندهٔ آبی همیشه متن ink می‌گیرد — قاعدهٔ ۱ */}
                      <span className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-ink">
                        <span className="sr-only">شدت تمرین: </span>
                        {style.intensity}
                      </span>

                      {teaching && (
                        <span className="tabular text-xs text-muted">
                          {toPersianDigits(teaching.sessionCount)} جلسه در هفته
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-base leading-loose text-muted">
                      {style.description}
                    </p>

                    <div className="mt-6 rounded-xl bg-bg p-5 sm:p-6">
                      <h3 className="text-sm font-semibold text-ink">
                        مناسب برای چه کسی
                      </h3>
                      <p className="mt-2 text-sm leading-loose text-muted">
                        {suitedFor[style.id]}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-ink">
                        مربیان این سبک
                      </h3>

                      {teaching ? (
                        <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-4">
                          {teaching.instructorIds.map((id) => {
                            const instructor = instructorById(id);
                            return (
                              <li key={id}>
                                <Link
                                  href={`/studio/teachers/${id}/`}
                                  className="
                                    font-medium text-sky-text underline underline-offset-4
                                    transition-colors duration-300 hover:text-ink
                                  "
                                >
                                  {instructor.name}
                                </Link>
                                <span className="mt-1 block text-sm text-muted">
                                  {instructor.short}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        /* حالت ممکن، نه فرضی: اگر سبکی از برنامهٔ هفته حذف شود
                           این بلوک به‌جای فهرست خالی، دلیلش را می‌گوید. */
                        <p className="mt-3 text-sm leading-loose text-muted">
                          این سبک فعلاً در برنامهٔ هفتگی کلاسی ندارد. اگر
                          دنبالش هستید به ما بگویید — با رسیدن تعداد کافی
                          دوباره در برنامه می‌گذاریمش.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ---------- دعوت به قدم بعد ---------- */}
        <div className="mt-16 rounded-2xl border border-line bg-surface p-6 text-center sm:mt-20 sm:p-10">
          <h2 className="text-xl font-semibold leading-snug text-ink sm:text-2xl">
            هنوز مطمئن نیستید کدام کلاس؟
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-loose text-muted">
            برنامهٔ هفتگی را ببینید و کلاسی را انتخاب کنید که با ساعت‌های آزادتان
            جور است. اگر تازه شروع می‌کنید، «جلسهٔ آشنایی» رایگان است و همان‌جا
            با مربی حرف می‌زنید تا سبک مناسب‌تان را پیدا کنید.
          </p>

          {/* در ۳۷۵ پیکسل دو دکمه کنار هم جا نمی‌شوند و متن‌شان می‌شکند؛
              پس زیر sm روی هم می‌نشینند و تمام‌عرض می‌شوند. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/studio/schedule/"
              className="
                rounded-full bg-sky px-6 py-3 font-medium text-ink
                transition-colors duration-300 hover:bg-sky-hover
              "
            >
              دیدن برنامهٔ هفتگی
            </Link>
            <Link
              href="/studio/pricing/"
              className="
                rounded-full border border-line bg-bg px-6 py-3 font-medium text-ink
                transition-colors duration-300 hover:border-sky-deep
              "
            >
              تعرفه‌ها و بسته‌ها
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
