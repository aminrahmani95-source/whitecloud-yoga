import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { instructors } from "@/lib/data/instructors";
import { timeSlots, weekSchedule } from "@/lib/data/schedule";
import { styleById } from "@/lib/data/styles";

/**
 * پروفایل یک مربی.
 *
 * این مسیر پویاست ولی سایت خروجی کاملاً استاتیک دارد (output: "export")، پس
 * generateStaticParams اجباری است: بدون آن build شکست می‌خورد. چهار صفحه در
 * زمان build ساخته می‌شود، یکی به‌ازای هر مربی.
 */

/** هر شناسه‌ای که در generateStaticParams نیامده باشد ۴۰۴ می‌شود، نه رندر درلحظه. */
export const dynamicParams = false;

export function generateStaticParams() {
  return instructors.map((instructor) => ({ id: instructor.id }));
}

type Props = { params: Promise<{ id: string }> };

/**
 * شناسهٔ مسیر یک رشتهٔ خام است، نه InstructorId؛ پس instructorById (که با `!`
 * وجود مربی را قطعی فرض می‌کند) اینجا مناسب نیست و خودمان جست‌وجو می‌کنیم.
 */
const findInstructor = (id: string) => instructors.find((i) => i.id === id);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const instructor = findInstructor(id);

  if (!instructor) return { title: "مربی پیدا نشد" };

  return {
    // قالب «%s | ابر سفید» در layout ریشه اعمال می‌شود، پس فقط نام را می‌دهیم
    title: instructor.name,
    description: `${instructor.name} — مربی ${instructor.specialty} در استودیو یوگا ابر سفید، کرج. ${instructor.short}`,
  };
}

/**
 * کلاس‌های همین مربی در برنامهٔ هفتگی.
 *
 * weekSchedule از شنبه تا پنج‌شنبه و در هر روز از صبح به شب مرتب است، پس
 * خروجی این flatMap خودبه‌خود ترتیب زمانی درستی دارد و نیازی به sort نیست.
 * خانه‌های null (ساعت‌های بدون کلاس) در همین‌جا کنار گذاشته می‌شوند.
 */
function classesOf(instructorId: string) {
  return weekSchedule.flatMap((day) =>
    day.sessions.flatMap((session, index) =>
      session && session.instructorId === instructorId
        ? [{ session, day, time: timeSlots[index] }]
        : [],
    ),
  );
}

export default async function TeacherPage({ params }: Props) {
  const { id } = await params;
  const instructor = findInstructor(id);

  if (!instructor) notFound();

  const classes = classesOf(instructor.id);

  return (
    <PageShell
      eyebrow={instructor.specialty}
      title={instructor.name}
      lead={instructor.short}
    >
      <Section id="teacher">
        {/* ---------- معرفی ---------- */}
        {/* در موبایل ستونی می‌ماند تا آواتار و متن هیچ‌کدام فشرده نشوند */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          <div className="shrink-0">
            <Placeholder
              label={instructor.initials}
              size="lg"
              className="h-36 w-36 rounded-full sm:h-44 sm:w-44"
            />
          </div>

          {/* min-w-0 لازم است وگرنه متن بلند، آیتم فلکس را از عرض ستون بیرون می‌زند */}
          <div className="min-w-0">
            {/*
             * تخصص مربی همین بالا به‌عنوان eyebrow بالای نام آمده است؛ تکرارش
             * اینجا فقط همان جمله را دو بار در فاصلهٔ چند سانتی‌متری می‌گذارد.
             */}
            <p className="text-sm text-muted">
              مربی ابر سفید از سال {instructor.since}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-loose text-muted">
              {instructor.bio}
            </p>
          </div>
        </div>

        {/* ---------- کلاس‌های هفتگی این مربی ---------- */}
        <div className="mt-16 border-t border-line pt-14">
          <h2 className="text-xl font-semibold leading-snug text-ink sm:text-2xl">
            کلاس‌های هفتگی
          </h2>

          {classes.length > 0 ? (
            <>
              <p className="mt-4 max-w-2xl text-base leading-loose text-muted">
                کلاس‌هایی که این هفته با {instructor.name} دارید. برای آشنایی
                با هر سبک، روی نامش بزنید.
              </p>

              <ul className="mt-8 space-y-3">
                {classes.map(({ session, day, time }) => (
                  <li
                    key={session.id}
                    className="
                      flex flex-col gap-2 rounded-xl border border-line
                      bg-surface px-5 py-4
                      sm:flex-row sm:items-baseline sm:justify-between sm:gap-4
                    "
                  >
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      {/* py/-my سطح لمس را بدون تغییر فاصلهٔ دیداری بزرگ
                          می‌کند — نام سبک اینجا برچسبِ یک ردیف است، نه
                          لینکی داخل جمله، پس معافیت WCAG شاملش نمی‌شود */}
                      <Link
                        href="/studio/classes/"
                        className="
                          -my-1.5 inline-block py-1.5
                          font-medium text-sky-text underline underline-offset-4
                          transition-colors duration-300 hover:text-ink
                        "
                      >
                        {styleById(session.styleId).name}
                      </Link>
                      <span className="text-sm text-muted">{session.level}</span>
                    </span>

                    {/* اعداد ساعت هم‌عرض بمانند تا ستون راست نلرزد */}
                    <span className="tabular shrink-0 text-sm text-muted">
                      {day.label} · {time}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            /*
             * حالت خالی: هیچ‌کدام از چهار مربی فعلی بی‌کلاس نیستند، ولی اگر
             * برنامهٔ هفته عوض شود صفحه نباید یک فهرست خالی و بی‌توضیح بدهد.
             */
            <div className="mt-6 rounded-2xl border border-dashed border-line px-6 py-8">
              <p className="max-w-2xl text-base leading-loose text-muted">
                این هفته کلاسی با {instructor.name} در برنامه نیست. سری به{" "}
                <Link
                  href="/studio/schedule/"
                  className="text-sky-text underline underline-offset-4 transition-colors duration-300 hover:text-ink"
                >
                  برنامهٔ هفتگی
                </Link>{" "}
                بزنید تا کلاس مناسب‌تان را پیدا کنید.
              </p>
            </div>
          )}
        </div>

        {/* ---------- بازگشت ---------- */}
        <div className="mt-14">
          <Link
            href="/studio/teachers/"
            className="
              -my-1.5 inline-flex items-center gap-2 py-1.5 text-sky-text
              transition-colors duration-300 hover:text-ink
            "
          >
            {/* صفحه راست‌به‌چپ است؛ «برگشت» یعنی حرکت به سمت راست */}
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
            بازگشت به همهٔ مربیان
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
