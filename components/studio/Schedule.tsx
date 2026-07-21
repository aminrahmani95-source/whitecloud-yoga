"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { Modal } from "@/components/ui/Modal";
import { Section } from "@/components/ui/Section";
import { instructorById } from "@/lib/data/instructors";
import {
  timeSlots,
  weekSchedule,
  type ClassSession,
  type ScheduleDay,
} from "@/lib/data/schedule";
import { styleById } from "@/lib/data/styles";

/* ------------------------------------------------------------------ */
/* داده                                                                */
/* ------------------------------------------------------------------ */

type ScheduleEntry = {
  session: ClassSession;
  day: ScheduleDay;
  time: string;
};

/**
 * فهرست تختِ جلسه‌ها بر پایهٔ شناسه.
 *
 * وضعیت مودال فقط «شناسهٔ» جلسه را نگه می‌دارد، نه خودِ شیء آن. این‌طور
 * منبع حقیقت همان lib/data باقی می‌ماند و در state یک کپی از داده نگه
 * نمی‌داریم؛ روز و ساعتِ هر جلسه هم از همین نگاشت درمی‌آید.
 *
 * چون weekSchedule ثابت است، این نگاشت یک‌بار در سطح ماژول ساخته می‌شود.
 */
const entryById = new Map<string, ScheduleEntry>(
  weekSchedule.flatMap((day) =>
    day.sessions.flatMap((session, index) =>
      session
        ? [[session.id, { session, day, time: timeSlots[index] }] as const]
        : [],
    ),
  ),
);

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * ظرفیت در داده یک عدد لاتین است ولی بقیهٔ اعداد صفحه فارسی‌اند.
 * عمداً از toLocaleString("fa-IR") استفاده نمی‌کنیم: خروجی‌اش به ICU نودِ
 * زمان build وابسته است و می‌تواند با رندر سمت کلاینت فرق کند (hydration
 * mismatch). این نگاشت دستی همیشه یک نتیجه می‌دهد.
 */
function toPersianDigits(value: number): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/* ------------------------------------------------------------------ */
/* کامپوننت                                                            */
/* ------------------------------------------------------------------ */

/**
 * حالا که هر مربی صفحهٔ خودش را دارد (/studio/teachers/…)، پروفایل مربی
 * دیگر مودالِ تودرتو نیست و فقط یک مودال در این کامپوننت باز می‌شود. پس
 * کل وضعیت همین یک شناسهٔ جلسه است: null یعنی بسته.
 */
export function Schedule() {
  const [openSessionId, setOpenSessionId] = useState<string | null>(null);

  // ارجاع ثابت لازم است: Modal این تابع را در یک شنوندهٔ رویداد می‌بندد.
  const closeSession = useCallback(() => setOpenSessionId(null), []);

  const activeEntry = openSessionId
    ? (entryById.get(openSessionId) ?? null)
    : null;

  return (
    <Section id="schedule">
      {/*
       * تیتر دیدنی را صفحهٔ برنامه از PageShell می‌گیرد، پس اینجا تکرار
       * نمی‌شود. ولی بدون این تیتر پنهان، زنجیرهٔ تیترها از h1 صفحه یک‌راست
       * به h3 روزها می‌پرد و ساختار صفحه برای صفحه‌خوان ناقص می‌ماند.
       */}
      <h2 className="sr-only">کلاس‌های این هفته</h2>

      {/* ---------- دسکتاپ: جدول واقعی، روزها سطر و ساعت‌ها ستون ---------- */}
      {/* در RTL اولین ستون سمت راست می‌نشیند، پس ستون روز خودبه‌خود راست است. */}
      <table className="hidden w-full table-fixed border-collapse md:table">
        <caption className="sr-only">
          برنامهٔ هفتگی کلاس‌های ابر سفید، از شنبه تا پنج‌شنبه در سه بازهٔ زمانی
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-24 p-1.5">
              <span className="sr-only">روز</span>
            </th>
            {timeSlots.map((slot) => (
              <th
                key={slot}
                scope="col"
                className="tabular p-1.5 pb-3 text-sm font-medium text-muted"
              >
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekSchedule.map((day) => (
            <tr key={day.id}>
              <th
                scope="row"
                className="p-1.5 text-start align-middle text-sm font-medium text-ink"
              >
                {day.label}
              </th>
              {day.sessions.map((session, index) => (
                <td key={`${day.id}-${index}`} className="p-1.5 align-top">
                  {session ? (
                    <SessionTile
                      session={session}
                      onOpen={setOpenSessionId}
                      className="min-h-[5.75rem] flex-col justify-center gap-1"
                    />
                  ) : (
                    <EmptyCell className="min-h-[5.75rem] justify-center" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- موبایل: یک کارت برای هر روز ---------- */}
      {/* جدول ۶×۳ در ۳۷۵ پیکسل جا نمی‌شود و اسکرول افقی هم راه‌حل نیست — */}
      {/* کاربر ستون‌های پنهان را پیدا نمی‌کند. پس روزها روی هم چیده می‌شوند. */}
      <div className="space-y-4 md:hidden">
        {weekSchedule.map((day) => (
          <div
            key={day.id}
            className="rounded-2xl border border-line bg-surface p-4"
          >
            <h3 className="px-1 pb-3 font-medium text-ink">{day.label}</h3>
            <ul className="space-y-2">
              {day.sessions.map((session, index) => (
                <li key={`${day.id}-${index}`}>
                  {session ? (
                    <SessionTile
                      session={session}
                      time={timeSlots[index]}
                      onOpen={setOpenSessionId}
                      className="items-center justify-between gap-3"
                    />
                  ) : (
                    <EmptyCell
                      time={timeSlots[index]}
                      className="justify-between"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ---------- مودال جزئیات کلاس ---------- */}
      <Modal
        open={activeEntry !== null}
        onClose={closeSession}
        title={activeEntry ? styleById(activeEntry.session.styleId).name : ""}
      >
        {activeEntry && (
          <div>
            <p className="tabular text-sm text-muted">
              {activeEntry.day.label} · {activeEntry.time}
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-muted">سطح</dt>
                <dd className="text-ink">{activeEntry.session.level}</dd>
              </div>

              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-muted">مربی</dt>
                <dd>
                  {/*
                   * پیوند به صفحهٔ مربی، نه مودالِ روی مودال: با رفتن به
                   * مسیر جدید این صفحه ترک می‌شود، پس مودال کلاس همراهش
                   * برچیده می‌شود و کاربر وسط دو دیالوگ روی هم گیر نمی‌افتد.
                   */}
                  <Link
                    href={`/studio/teachers/${activeEntry.session.instructorId}/`}
                    className="
                      font-medium text-sky-text underline underline-offset-4
                      transition-colors duration-300 hover:text-ink
                    "
                  >
                    {instructorById(activeEntry.session.instructorId).name}
                  </Link>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="w-16 shrink-0 text-muted">ظرفیت</dt>
                <dd className="tabular text-ink">
                  {toPersianDigits(activeEntry.session.capacity)} نفر
                </dd>
              </div>
            </dl>

            <p className="mt-5 leading-loose text-muted">
              {activeEntry.session.note}
            </p>

            {/*
             * ── جای دکمهٔ «رزرو» ──────────────────────────────────────────
             * سامانهٔ رزرو هنوز ساخته نشده، اما جایش همین‌جاست: پس از توضیح
             * کلاس و پیش از لبهٔ پایینی مودال. هرچه لازم دارد همین حالا در
             * activeEntry موجود است (شناسهٔ جلسه، ظرفیت، روز و ساعت)، پس
             * افزودنش نباید ساختار این کامپوننت را عوض کند.
             *
             * <button
             *   type="button"
             *   className="mt-6 w-full rounded-full bg-sky px-5 py-3 font-medium text-ink transition-colors duration-300 hover:bg-sky-hover"
             * >
             *   رزرو این کلاس
             * </button>
             * ─────────────────────────────────────────────────────────────
             */}
          </div>
        )}
      </Modal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* اجزای کوچک                                                          */
/* ------------------------------------------------------------------ */

/**
 * یک جلسه — همیشه <button> واقعی، نه div کلیک‌پذیر، تا با Tab برسد و
 * حلقهٔ فوکوس سراسری (globals.css) رویش بیفتد. outline را سرکوب نمی‌کنیم.
 *
 * کاشی روی bg است و در هاور به surface می‌رود: هر دو سطح برای متن ثانویه
 * کنتراست کافی دارند، برخلاف تینت‌های آبی که text-muted را زیر ۴٫۵:۱ می‌برند.
 */
function SessionTile({
  session,
  time,
  onOpen,
  className = "",
}: {
  session: ClassSession;
  /** فقط در نمای موبایل؛ در جدول، ساعت از سرستون خوانده می‌شود */
  time?: string;
  onOpen: (sessionId: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => onOpen(session.id)}
      className={`
        flex w-full rounded-xl border border-line bg-bg px-4 py-3 text-start
        transition-colors duration-300 hover:border-sky-deep hover:bg-surface
        ${className}
      `}
    >
      <span className="min-w-0">
        <span className="block font-medium text-ink">
          {styleById(session.styleId).name}
        </span>
        <span className="mt-0.5 block text-sm text-muted">
          {instructorById(session.instructorId).name}
        </span>
      </span>
      {time && (
        <span className="tabular shrink-0 text-sm text-muted">{time}</span>
      )}
    </button>
  );
}

/**
 * ساعتی که کلاس ندارد (پنج‌شنبه ۱۹:۰۰).
 * حاشیهٔ خط‌چین یعنی «اینجا عمداً خالی است»، نه اینکه سلول خراب شده.
 * قابل کلیک نیست، پس <div> است و از ترتیب Tab بیرون می‌ماند.
 */
function EmptyCell({
  time,
  className = "",
}: {
  time?: string;
  className?: string;
}) {
  return (
    <div
      className={`
        flex items-center rounded-xl border border-dashed border-line
        px-4 py-3 ${className}
      `}
    >
      <span className="text-sm text-muted">بدون کلاس</span>
      {time && (
        <span className="tabular shrink-0 text-sm text-muted">{time}</span>
      )}
    </div>
  );
}
