"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Cloud } from "@/components/brand/Cloud";
import { CloudField } from "./CloudField";

type Gate = {
  href: string;
  label: string;
  caption: string;
  /** پارامترهای شناوری — عمداً برای هر ابر متفاوت است تا هم‌قدم حرکت نکنند */
  drift: { x: string; y: string; duration: string; delay: string };
};

const gates: Gate[] = [
  {
    href: "/studio/",
    label: "باشگاه",
    caption: "کلاس‌ها، مربیان و برنامهٔ هفتگی",
    drift: { x: "7px", y: "-15px", duration: "7.5s", delay: "0s" },
  },
  {
    href: "/shop/",
    label: "فروشگاه",
    caption: "مت، بلوک و لوازم تمرین",
    drift: { x: "-6px", y: "-11px", duration: "9s", delay: "-2.5s" },
  },
];

export function CloudGate() {
  const router = useRouter();
  const [leaving, setLeaving] = useState<string | null>(null);

  /**
   * ترنزیشن کلیک: صحنه نرم محو می‌شود و بعد جابه‌جایی انجام می‌گیرد.
   * اگر کاربر کاهش حرکت را روشن کرده باشد بلافاصله می‌رویم — انتظارِ بی‌دلیل
   * پشت انیمیشنی که قرار نیست دیده شود، فقط سایت را کند نشان می‌دهد.
   */
  const enter = (href: string) => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      router.push(href);
      return;
    }

    setLeaving(href);
    window.setTimeout(() => router.push(href), 420);
  };

  return (
    <div
      className={`
        relative flex min-h-[88svh] flex-col items-center justify-center
        overflow-hidden px-5 py-16
        transition-all duration-500 ease-out
        ${leaving ? "scale-[0.98] opacity-0" : "scale-100 opacity-100"}
      `}
    >
      {/* آسمانِ خیلی کم‌رنگ پشت صحنه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-sky/12 to-transparent"
      />

      {/* ابرهایی که آرام از عرض صفحه عبور می‌کنند */}
      <CloudField />

      <header className="relative mb-14 text-center sm:mb-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
          استودیو یوگا ابر سفید
        </h1>
        <p className="mt-2.5 text-sm text-muted sm:text-base">
          باشگاه بانوان — کرج، مهرویلا
        </p>
      </header>

      <nav
        aria-label="ورود به بخش‌های سایت"
        className="relative flex flex-col items-center gap-10 sm:flex-row sm:gap-14 lg:gap-20"
      >
        {gates.map((gate) => (
          <button
            key={gate.href}
            type="button"
            onClick={() => enter(gate.href)}
            className="group flex flex-col items-center rounded-2xl outline-offset-8"
          >
            {/* لایهٔ بیرونی شناور است و لایهٔ درونی روی هاور بزرگ می‌شود.
                اگر هر دو روی یک عنصر بودند، transform یکی دیگری را می‌خورد. */}
            <span
              className="block"
              style={
                {
                  "--drift-x": gate.drift.x,
                  "--drift-y": gate.drift.y,
                  animation: `drift ${gate.drift.duration} ease-in-out ${gate.drift.delay} infinite`,
                } as React.CSSProperties
              }
            >
              <span
                className="
                  relative block w-[15rem] transition-transform duration-500 ease-out
                  group-hover:scale-[1.04] group-focus-visible:scale-[1.04]
                  sm:w-[17rem] lg:w-[19rem]
                "
              >
                {/* روی هاور سایه عمیق‌تر می‌شود — حس «نزدیک‌تر آمدن»
                    بدون اینکه رنگ ابر عوض شود. */}
                <Cloud
                  className="
                    cloud-shadow w-full text-sky
                    transition-[filter] duration-500
                    group-hover:cloud-shadow-lift group-focus-visible:cloud-shadow-lift
                  "
                />
                {/* برچسب در مرکز تنهٔ ابر می‌نشیند — متن ink روی پُرکنندهٔ sky، ۶٫۶:۱.
                    فرم‌های جدید لُپ‌های بالا و پایین متقارن دارند، پس برخلاف
                    فرم قدیمیِ کف‌صاف، مرکز جرم همان مرکز کادر است و کشیدن
                    برچسب به پایین لازم نیست. */}
                <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-ink sm:text-xl">
                  {gate.label}
                </span>
              </span>
            </span>

            <span className="mt-5 text-sm text-muted transition-colors duration-300 group-hover:text-ink">
              {gate.caption}
            </span>
          </button>
        ))}
      </nav>

      {/*
        نشانهٔ «پایین‌تر برو» — به‌جای جمله، یک فلش.
        دکمه است نه آیکون تزئینی، چون کاری انجام می‌دهد و باید با کیبورد هم
        در دسترس باشد؛ aria-label معنایش را برای صفحه‌خوان نگه می‌دارد.
        بالا-پایین رفتن ملایمش همان keyframe ابرهاست تا با صحنه یکدست بماند.
      */}
      <a
        href="#about"
        aria-label="بیشتر دربارهٔ استودیو"
        className="
          group relative mt-16 rounded-full p-2 text-sky-deep
          transition-colors duration-300 hover:text-ink sm:mt-20
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={
            {
              "--drift-x": "0px",
              "--drift-y": "-6px",
              animation: "drift 2.6s ease-in-out infinite",
            } as React.CSSProperties
          }
        >
          <path d="M12 5v13M6 12.5l6 6 6-6" />
        </svg>
      </a>
    </div>
  );
}
