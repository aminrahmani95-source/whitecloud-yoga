import Link from "next/link";
import { Cloud } from "@/components/brand/Cloud";
import { PhoneLink } from "@/components/ui/PhoneNumber";
import {
  ClockIcon,
  ExternalIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/Icon";
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
              {/*
                فاصلهٔ فهرست از space-y-2 به space-y-0.5 آمده و در عوض خودِ
                پیوند padding عمودی گرفته. مجموع ارتفاع هر ردیف تقریباً همان
                است، ولی حالا تمام آن ارتفاع سطح لمس است نه فقط خط متن —
                پیش از این هدف‌ها ۲۱٫۵ پیکسل بودند، زیر حداقل ۲۴ پیکسلیِ
                WCAG 2.5.8 و خیلی زیر چیزی که با شست بشود زد.
                منفیِ افقی (-mx-2) هم سطح لمس را پهن می‌کند بی‌آنکه ستون از
                تراز چپش بیرون بزند.
              */}
              <ul className="space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="-mx-2 block px-2 py-1.5 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
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
            {/*
              آیکون در بالای بلوک می‌نشیند نه وسط آن: نشانی سه سطر است و
              آیکونِ وسط‌چین کنار سطر دوم می‌افتد که به چشم غلط می‌آید.
              mt-1 آن را با خط اولِ متن هم‌تراز می‌کند.
            */}
            <div className="flex gap-x-2.5">
              <PinIcon className="mt-1 h-4 w-4 shrink-0 text-sky-deep" />
              <address className="not-italic leading-loose text-muted">
                {contact.address.city}، {contact.address.district}
                <br />
                {contact.address.line}
                <br />
                {contact.address.floor}
              </address>
            </div>
            {/* -mb-1.5 فقط padding اضافه‌شده را پس می‌گیرد تا فاصلهٔ دیداری
                با بلوک بعدی همان mt-3 پله‌ی اول بماند */}
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 -mb-1.5 inline-flex items-center gap-1.5 py-1.5 ps-[26px] text-sm font-medium text-sky-text underline-offset-4 hover:underline"
            >
              مسیریابی روی نقشه
              <ExternalIcon />
            </a>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">تماس</h2>
            {/* مثل نقشهٔ سایت: فاصله از فهرست به خودِ پیوند منتقل شده تا
                سطح لمس بزرگ شود و ریتم دیداری همان بماند */}
            <ul className="space-y-0.5 text-muted">
              <li>
                <span className="flex items-center gap-x-2.5">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-sky-deep" />
                  <PhoneLink className="text-sky-text underline-offset-4 hover:underline" />
                </span>
              </li>
              <li>
                <a
                  href={contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-x-2.5 py-1.5 text-sky-text underline-offset-4 hover:underline"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-sky-deep" />
                  {/* نام کاربری لاتین داخل بافت راست‌به‌چپ — bdi مرزش را
                      برای الگوریتم دوجهته مشخص می‌کند */}
                  <bdi>{contact.instagram.display}</bdi>
                </a>
              </li>
            </ul>
            <p className="measure mt-3 text-sm leading-relaxed text-muted">
              برای ثبت‌نام و رزرو کلاس تماس بگیرید یا در دایرکت پیام بدهید.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">ساعت کار</h2>
            <div className="flex gap-x-2.5">
              <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-sky-deep" />
              <p className="leading-loose text-muted">
                {contact.hours.days}
                <br />
                {contact.hours.opens}
              </p>
            </div>
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
