/**
 * ساختار ناوبری سایت — تنها منبع حقیقت.
 *
 * هم هدر و هم نقشهٔ سایتِ فوتر از همین می‌خوانند، پس افزودن یک صفحهٔ جدید
 * یعنی یک سطر اینجا، نه ویرایش دو کامپوننت جدا که با هم ناهماهنگ می‌شوند.
 */

export type NavLink = { href: string; label: string };

/** لینک‌های اصلی هدر بخش باشگاه */
export const studioNav: NavLink[] = [
  { href: "/studio/", label: "استودیو" },
  { href: "/studio/classes/", label: "کلاس‌ها" },
  { href: "/studio/schedule/", label: "برنامه" },
  { href: "/studio/teachers/", label: "مربیان" },
  { href: "/studio/pricing/", label: "تعرفه‌ها" },
  { href: "/studio/faq/", label: "سؤال‌ها" },
];

/** نقشهٔ سایت فوتر — ستون‌بندی‌شده */
export const siteMap: { title: string; links: NavLink[] }[] = [
  {
    title: "باشگاه",
    links: [
      { href: "/studio/", label: "دربارهٔ استودیو" },
      { href: "/studio/classes/", label: "سبک‌های یوگا" },
      { href: "/studio/schedule/", label: "برنامهٔ هفتگی" },
    ],
  },
  {
    title: "ثبت‌نام",
    links: [
      { href: "/studio/pricing/", label: "تعرفه‌ها و بسته‌ها" },
      { href: "/studio/faq/", label: "سؤال‌های پرتکرار" },
      { href: "/studio/teachers/", label: "مربیان" },
    ],
  },
  {
    title: "فروشگاه",
    links: [{ href: "/shop/", label: "لوازم تمرین" }],
  },
];
