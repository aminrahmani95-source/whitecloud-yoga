import Link from "next/link";

/**
 * سوییچ باشگاه ⇄ فروشگاه.
 *
 * هدفش این است که کاربر بدون برگشتن به صفحهٔ ورودی بین دو بخش جابه‌جا شود.
 * بخش فعال با aria-current علامت‌گذاری می‌شود تا صفحه‌خوان هم بفهمد کجاست،
 * نه فقط کسی که رنگ را می‌بیند.
 */
export function SectionSwitch({ active }: { active: "studio" | "shop" }) {
  const items = [
    { key: "studio", href: "/studio/", label: "باشگاه" },
    { key: "shop", href: "/shop/", label: "فروشگاه" },
  ] as const;

  return (
    <nav aria-label="جابه‌جایی بین بخش‌ها">
      <ul className="flex items-center gap-0.5 rounded-full bg-surface p-0.5">
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300
                  ${
                    isActive
                      ? "bg-bg font-medium text-ink shadow-soft"
                      : "text-muted hover:text-ink"
                  }
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
