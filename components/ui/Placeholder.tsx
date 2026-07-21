/**
 * جای‌نگهدار عکس.
 *
 * تا وقتی عکس واقعی نداریم، به‌جای فراخوانی سرویس بیرونی (که هم تحریم است و
 * هم وابستگی خارجی می‌آورد) یک باکس هم‌رنگ پالت با حروف اول نام یا یک نماد
 * نشان می‌دهیم. سایت پر و یکدست دیده می‌شود بدون هیچ درخواست شبکه‌ای.
 */
export function Placeholder({
  label,
  className = "",
  size = "md",
}: {
  label: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={`
        flex items-center justify-center overflow-hidden
        bg-surface text-sky-text
        ${className}
      `}
      aria-hidden="true"
    >
      {/*
       * lg برای کاشی‌های ۴:۳ فروشگاه است، نه آواتار کوچک مربی‌ها — نماد باید
       * به‌قدری بزرگ باشد که در آن کادر گم نشود.
       */}
      <span
        className={`
          select-none font-medium tracking-widest
          ${size === "lg" ? "text-6xl" : "text-xl"}
        `}
      >
        {label}
      </span>
    </div>
  );
}
