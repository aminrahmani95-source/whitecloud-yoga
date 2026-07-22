import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { instructors, type InstructorId } from "@/lib/data/instructors";
import { weekSchedule } from "@/lib/data/schedule";

export const metadata: Metadata = {
  title: "مربیان",
  description:
    "چهار مربی باشگاه بانوان ابر سفید در کرج — از تمرین‌های آرام یین و رستوراتیو تا کلاس‌های پرانرژی آشتانگا و هوت یوگا. معرفی و برنامهٔ هفتگی هر مربی.",
};

/* ------------------------------------------------------------------ */
/* شمارش جلسه‌های هفتگی هر مربی                                        */
/* ------------------------------------------------------------------ */

/**
 * تعداد جلسه‌های هر مربی از خودِ برنامهٔ هفتگی درمی‌آید، نه از عددی که
 * دستی کنار نام او نوشته شده باشد. اگر فردا یک کلاس در lib/data/schedule.ts
 * جابه‌جا شود، این صفحه بدون هیچ ویرایشی درست می‌ماند.
 *
 * weekSchedule ثابت است، پس این شمارش یک‌بار در سطح ماژول انجام می‌شود.
 */
const sessionsPerWeek = weekSchedule.reduce<Partial<Record<InstructorId, number>>>(
  (tally, day) => {
    for (const session of day.sessions) {
      // خانه‌های خالی برنامه null‌اند و باید رد شوند
      if (!session) continue;
      tally[session.instructorId] = (tally[session.instructorId] ?? 0) + 1;
    }
    return tally;
  },
  {},
);

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * همان دلیل کامپوننت برنامه: عمداً از toLocaleString("fa-IR") استفاده
 * نمی‌کنیم چون خروجی‌اش به ICU نودِ زمان build وابسته است. نگاشت دستی
 * همیشه یک نتیجه می‌دهد.
 */
function toPersianDigits(value: number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/* ------------------------------------------------------------------ */
/* صفحه                                                                */
/* ------------------------------------------------------------------ */

/**
 * فهرست مربیان.
 *
 * تفاوت این صفحه با بخش مربیانِ صفحهٔ خانه عمدی است: آنجا کارت‌ها مودال باز
 * می‌کنند چون کاربر وسط اسکرول صفحهٔ اصلی است و نباید جایش را از دست بدهد.
 * اینجا هر کارت یک <Link> واقعی به صفحهٔ اختصاصی مربی است — نشانی قابل
 * اشتراک‌گذاری دارد، موتور جست‌وجو ایندکسش می‌کند و دکمهٔ back مرورگر کار
 * می‌کند. به همین دلیل این صفحه هیچ state ای ندارد و Server Component می‌ماند.
 */
export default function TeachersPage() {
  return (
    <PageShell
      eyebrow="مربیان"
      title="کسانی که کنارتان تمرین می‌کنند"
      lead="چهار مربی با چهار جور کلاس — از تمرین‌های آرام و کشدار تا جلسه‌های پرانرژی. روی هر کارت بزنید تا ببینید هرکدام کلاس را چطور پیش می‌برند و چه روزهایی هستند."
    >
      <Section id="teachers">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => {
            const count = sessionsPerWeek[instructor.id] ?? 0;

            return (
              <li key={instructor.id}>
                <Link
                  href={`/studio/teachers/${instructor.id}/`}
                  className="
                    group flex h-full flex-col rounded-2xl
                    border border-line bg-bg p-6 shadow-soft
                    transition-shadow duration-300 hover:shadow-lift
                  "
                >
                  <Placeholder
                    label={instructor.initials}
                    className="h-16 w-16 rounded-full"
                  />

                  <h2 className="mt-5 font-semibold text-ink">
                    {instructor.name}
                  </h2>
                  <p className="mt-1 text-sm text-sky-text">
                    {instructor.specialty}
                  </p>
                  <p className="mt-3 text-sm leading-loose text-muted">
                    {instructor.short}
                  </p>

                  {/*
                    mt-auto ته کارت را به کف می‌چسباند تا در ردیف چهارتایی،
                    خطِ «پروفایل کامل» همهٔ کارت‌ها هم‌تراز بماند حتی وقتی
                    معرفی‌ها یک سطر با هم فرق دارند.
                  */}
                  <div className="mt-auto pt-5">
                    <p className="text-sm text-muted">
                      <span className="tabular">{toPersianDigits(count)}</span>{" "}
                      جلسه در هفته
                    </p>

                    <span className="mt-3 flex items-center gap-1.5 text-sm font-medium text-sky-text">
                      پروفایل کامل
                      {/*
                        در صفحهٔ راست‌به‌چپ، «جلو رفتن» یعنی سمت چپ؛ پس پیکان
                        به چپ اشاره می‌کند. با هاور دو پیکسل جلوتر می‌رود —
                        همان‌قدر که حس کلیک‌پذیری بدهد و بیشتر نه.
                      */}
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="
                          h-4 w-4 transition-transform duration-300
                          group-hover:-translate-x-0.5
                        "
                      >
                        <path d="M10 3.5 5.5 8l4.5 4.5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </PageShell>
  );
}
