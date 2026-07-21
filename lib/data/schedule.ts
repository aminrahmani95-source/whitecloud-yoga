import type { InstructorId } from "./instructors";
import type { StyleId } from "./styles";

/**
 * برنامهٔ هفتگی کلاس‌ها.
 *
 * هفتهٔ کاری ایران: شنبه تا پنج‌شنبه (جمعه تعطیل).
 *
 * دو اصلاح نسبت به برنامهٔ اولیهٔ پرامپت:
 *  ۱. شنبه ۱۷:۳۰ «وینیاسا» به نگار موسوی سپرده شد. در نسخهٔ اول به مربی‌ای
 *     داده شده بود که تخصصش آشتانگا و هوت یوگا بود — با معرفی خودش نمی‌خواند.
 *  ۲. چهارشنبه ۱۹:۰۰ از وینیاسا به هوت یوگا تغییر کرد. هوت یوگا در کل هفته
 *     فقط یک جلسه داشت، در حالی که به‌عنوان یکی از شش سبک اصلی معرفی می‌شود.
 *
 * ساختار عمداً داده‌محور است تا افزودن دکمهٔ «رزرو» بعداً فقط یک تغییر در
 * کامپوننت باشد، نه بازنویسی برنامه.
 */

export const timeSlots = ["۹:۰۰ صبح", "۱۷:۳۰ عصر", "۱۹:۰۰ شب"] as const;

export type Level = "مبتدی" | "متوسط" | "پیشرفته" | "همهٔ سطوح";

export type ClassSession = {
  id: string;
  styleId: StyleId;
  instructorId: InstructorId;
  level: Level;
  capacity: number;
  note: string;
};

export type ScheduleDay = {
  id: string;
  label: string;
  /** هم‌طول با timeSlots؛ null یعنی آن ساعت کلاسی ندارد */
  sessions: (ClassSession | null)[];
};

export const weekSchedule: ScheduleDay[] = [
  {
    id: "sat",
    label: "شنبه",
    sessions: [
      {
        id: "sat-1",
        styleId: "hatha",
        instructorId: "negar",
        level: "مبتدی",
        capacity: 14,
        note: "شروع آرام هفته. مناسب کسانی که تازه به یوگا آمده‌اند.",
      },
      {
        id: "sat-2",
        styleId: "vinyasa",
        instructorId: "negar",
        level: "متوسط",
        capacity: 12,
        note: "جریان پیوسته با ریتم متوسط. آشنایی قبلی با وضعیت‌های پایه لازم است.",
      },
      {
        id: "sat-3",
        styleId: "yin",
        instructorId: "sara",
        level: "همهٔ سطوح",
        capacity: 16,
        note: "کشش‌های طولانی و آرام برای پایان روز.",
      },
    ],
  },
  {
    id: "sun",
    label: "یکشنبه",
    sessions: [
      {
        id: "sun-1",
        styleId: "restorative",
        instructorId: "sara",
        level: "همهٔ سطوح",
        capacity: 16,
        note: "با بولستر و پتو. هیچ فشاری روی بدن نیست.",
      },
      {
        id: "sun-2",
        styleId: "ashtanga",
        instructorId: "elham",
        level: "متوسط",
        capacity: 12,
        note: "توالی ثابت آشتانگا، قدم‌به‌قدم و با سرعت خودتان.",
      },
      {
        id: "sun-3",
        styleId: "hatha",
        instructorId: "mina",
        level: "مبتدی",
        capacity: 14,
        note: "تمرکز روی جزئیات وضعیت‌ها و تنفس.",
      },
    ],
  },
  {
    id: "mon",
    label: "دوشنبه",
    sessions: [
      {
        id: "mon-1",
        styleId: "vinyasa",
        instructorId: "negar",
        level: "متوسط",
        capacity: 12,
        note: "کلاس صبحگاهی پرانرژی برای شروع روز.",
      },
      {
        id: "mon-2",
        styleId: "hot",
        instructorId: "elham",
        level: "متوسط",
        capacity: 10,
        note: "فضای گرم. حتماً آب و حولهٔ کوچک همراه بیاورید.",
      },
      {
        id: "mon-3",
        styleId: "yin",
        instructorId: "sara",
        level: "همهٔ سطوح",
        capacity: 16,
        note: "رهاسازی عمیق پس از یک روز کاری.",
      },
    ],
  },
  {
    id: "tue",
    label: "سه‌شنبه",
    sessions: [
      {
        id: "tue-1",
        styleId: "hatha",
        instructorId: "mina",
        level: "مبتدی",
        capacity: 14,
        note: "پایه‌های هاتا با توضیح کامل هر حرکت.",
      },
      {
        id: "tue-2",
        styleId: "vinyasa",
        instructorId: "negar",
        level: "پیشرفته",
        capacity: 10,
        note: "توالی‌های طولانی‌تر و انتقال‌های سریع‌تر.",
      },
      {
        id: "tue-3",
        styleId: "restorative",
        instructorId: "sara",
        level: "همهٔ سطوح",
        capacity: 16,
        note: "کلاسی برای روزهایی که خسته‌اید.",
      },
    ],
  },
  {
    id: "wed",
    label: "چهارشنبه",
    sessions: [
      {
        id: "wed-1",
        styleId: "ashtanga",
        instructorId: "elham",
        level: "پیشرفته",
        capacity: 10,
        note: "سری کامل آشتانگا. نیازمند تمرین منظم.",
      },
      {
        id: "wed-2",
        styleId: "hatha",
        instructorId: "mina",
        level: "مبتدی",
        capacity: 14,
        note: "مناسب کسانی که هفته‌ای یک بار تمرین می‌کنند.",
      },
      {
        id: "wed-3",
        styleId: "hot",
        instructorId: "elham",
        level: "متوسط",
        capacity: 10,
        note: "فضای گرم. حتماً آب همراه بیاورید.",
      },
    ],
  },
  {
    id: "thu",
    label: "پنج‌شنبه",
    sessions: [
      {
        id: "thu-1",
        styleId: "yin",
        instructorId: "sara",
        level: "همهٔ سطوح",
        capacity: 16,
        note: "صبح آرام پنج‌شنبه، بدون عجله.",
      },
      {
        id: "thu-2",
        styleId: "hatha",
        instructorId: "negar",
        level: "همهٔ سطوح",
        capacity: 14,
        note: "جمع‌بندی هفته با تمرینی متعادل.",
      },
      null,
    ],
  },
];
