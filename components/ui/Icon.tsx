/**
 * آیکون‌های مشترک سایت.
 *
 * همه یک قرارداد دارند: کادر ۲۰×۲۰، خطی (نه توپر)، ضخامت ۱٫۵، و رنگ از
 * currentColor. پس هرجا بروند رنگ و وزن‌شان با متن کنارشان یکی می‌شود و
 * لازم نیست فراخوان چیزی تنظیم کند.
 *
 * پیش از این، پین و ساعت به‌صورت محلی داخل app/studio/page.tsx تعریف شده
 * بودند. یک‌جا جمع شدند تا همه‌جای سایت یک شکل باشند.
 *
 * همه aria-hidden هستند: آیکون کنار متن، تکرار همان معناست و برای
 * صفحه‌خوان فقط نویز اضافه می‌کند.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 20 20",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

/** نشانی */
export function PinIcon({ className = "h-4 w-4 shrink-0" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 17.5s5.5-4.6 5.5-9a5.5 5.5 0 1 0-11 0c0 4.4 5.5 9 5.5 9Z" />
      <circle cx="10" cy="8.5" r="1.9" />
    </svg>
  );
}

/** ساعت کار */
export function ClockIcon({ className = "h-4 w-4 shrink-0" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 5.75V10l2.75 1.75" />
    </svg>
  );
}

/** تلفن */
export function PhoneIcon({ className = "h-4 w-4 shrink-0" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 2.5H3.2c-.4 0-.7.3-.7.7C2.5 9 7 13.5 12.8 13.5c.4 0 .7-.3.7-.7v-2.3l-2.6-.9-1.3 1.3a9.4 9.4 0 0 1-3.5-3.5l1.3-1.3-.9-2.6z" />
    </svg>
  );
}

/**
 * اینستاگرام — نشانِ شناخته‌شده به‌صورت خطی: قاب گردگوشه، لنز، و نقطهٔ فلاش.
 * عمداً خطی است نه توپر، تا با بقیهٔ آیکون‌ها هم‌وزن بماند.
 */
export function InstagramIcon({ className = "h-4 w-4 shrink-0" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="14" height="14" rx="4.4" />
      <circle cx="10" cy="10" r="3.4" />
      <circle cx="14.1" cy="5.9" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * پیوند بیرونی.
 * پیکان رو به بالا-چپ است: در صفحهٔ راست‌به‌چپ، «بیرون رفتن» یعنی سمت چپ.
 */
export function ExternalIcon({ className = "h-3.5 w-3.5 shrink-0" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12.5 4H4v12h12V7.5" />
      <path d="M11.5 3.5H16.5V8.5M16 4l-6.5 6.5" />
    </svg>
  );
}
