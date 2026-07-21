"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Cloud";
import { SectionSwitch } from "./SectionSwitch";
import type { NavLink } from "@/lib/nav";

/**
 * هدر چسبان مشترک هر دو بخش.
 *
 * لینک‌ها حالا صفحه‌های واقعی‌اند نه لنگر داخل یک صفحه، پس صفحهٔ فعال با
 * aria-current علامت می‌خورد تا هم بصری و هم برای صفحه‌خوان معلوم باشد
 * کاربر کجاست.
 *
 * در موبایل لینک‌های داخلی داخل منوی بازشونده می‌روند، ولی سوییچ
 * باشگاه/فروشگاه همیشه دیده می‌شود — جابه‌جایی بین دو بخش مهم‌ترین کار
 * ناوبری است و نباید پشت منو پنهان شود.
 */
export function SiteHeader({
  section,
  nav,
}: {
  section: "studio" | "shop";
  nav: NavLink[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // «استودیو» فقط وقتی فعال است که دقیقاً روی خودش باشیم، وگرنه چون همهٔ
  // مسیرها با /studio/ شروع می‌شوند همیشه فعال می‌ماند.
  const isActive = (href: string) =>
    href === "/studio/" ? pathname === "/studio" || pathname === "/studio/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="صفحهٔ ورودی ابر سفید" className="shrink-0">
          <Logo />
        </Link>

        {nav.length > 0 && (
          <nav aria-label="صفحه‌های باشگاه" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`
                      rounded-full px-3 py-2 text-sm transition-colors duration-300
                      ${
                        isActive(item.href)
                          ? "bg-surface font-medium text-ink"
                          : "text-muted hover:bg-surface hover:text-ink"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mr-auto flex items-center gap-2">
          <SectionSwitch active={section} />

          {nav.length > 0 && (
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
              className="rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-ink lg:hidden"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {menuOpen && nav.length > 0 && (
        <nav
          id="mobile-nav"
          aria-label="صفحه‌های باشگاه"
          className="border-t border-line/70 bg-bg lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`
                    block rounded-xl px-3 py-2.5 text-sm transition-colors
                    ${
                      isActive(item.href)
                        ? "bg-surface font-medium text-ink"
                        : "text-muted hover:bg-surface hover:text-ink"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
