import Link from "next/link";
import { Cloud } from "@/components/brand/Cloud";
import { contact } from "@/lib/data/contact";
import { siteMap } from "@/lib/nav";

/**
 * فوتر مشترک — نقشهٔ سایت، نشانی، تماس و ساعت کار.
 *
 * برای بازدیدکنندهٔ یک باشگاه محلی، بلوک نشانی مهم‌ترین بخش سایت است: جایی
 * که می‌فهمد کجاست و چطور تماس بگیرد. پس اطلاعات تماس متن واقعی و قابل
 * انتخاب است، نه عکس، و شماره تلفن پیوند tel دارد تا در موبایل با یک لمس
 * شماره‌گیری شود.
 */
export function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 border-t border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        {/* نقشهٔ سایت */}
        <nav
          aria-label="نقشهٔ سایت"
          className="grid gap-8 border-b border-line pb-10 sm:grid-cols-3"
        >
          {siteMap.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-sm font-semibold text-ink">
                {column.title}
              </h2>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* تماس و نشانی */}
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">نشانی استودیو</h2>
            <address className="not-italic leading-loose text-muted">
              {contact.address.city}، {contact.address.district}
              <br />
              {contact.address.line}
              <br />
              {contact.address.floor}
            </address>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sky-text underline-offset-4 hover:underline"
            >
              مسیریابی روی نقشه
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 3H3v10h10v-3M9.5 2.5H13.5V6.5M13 3L7.5 8.5" />
              </svg>
            </a>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">تماس</h2>
            <ul className="space-y-2.5 text-muted">
              <li>
                <a
                  href={contact.phone.href}
                  className="tabular text-sky-text underline-offset-4 hover:underline"
                  dir="ltr"
                >
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-text underline-offset-4 hover:underline"
                  dir="ltr"
                >
                  {contact.instagram.display}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              برای ثبت‌نام و رزرو کلاس تماس بگیرید یا در دایرکت پیام بدهید.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">ساعت کار</h2>
            <p className="leading-loose text-muted">
              {contact.hours.days}
              <br />
              {contact.hours.opens}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between">
          <div className="space-y-1 text-center sm:text-start">
            <p className="text-sm text-muted">
              © {contact.name} — تمام حقوق محفوظ است.
            </p>
            {/*
              نام لاتین داخل جملهٔ فارسی: با bdi مرزش برای الگوریتم دوجهته
              مشخص می‌شود، وگرنه اگر روزی نقطه یا کاراکتر دیگری بعدش بیاید
              جای آن در خط جابه‌جا می‌شود.
            */}
            <p className="text-sm text-muted">
              طراحی و توسعه توسط <bdi>Artvoid Company</bdi>
            </p>
          </div>
          <Cloud className="w-11 text-sky-deep/50" />
        </div>
      </div>
    </footer>
  );
}
