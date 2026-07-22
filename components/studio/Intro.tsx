import { Cloud } from "@/components/brand/Cloud";
import { Section } from "@/components/ui/Section";
import { PhoneNumber } from "@/components/ui/PhoneNumber";
import { contact } from "@/lib/data/contact";

/**
 * سربرگ صفحهٔ باشگاه — اولین چیزی که بازدیدکننده می‌بیند.
 *
 * عمداً از SectionHeading استفاده نشده: تیتر بخش‌ها h2 است، ولی این
 * نقطهٔ شروع صفحه است و باید h1 داشته باشد. پس نشانه‌گذاری تیتر اینجا
 * اختصاصی نوشته شده و فقط پوستهٔ Section مشترک است تا فاصله‌ها یکدست بماند.
 *
 * «باشگاه بانوان بودن» به‌جای پانوشت، در بج بالای تیتر و در همان جملهٔ اول
 * معرفی آمده — برای کسی که دنبال فضای بانوان می‌گردد این اولین چیزی است
 * که باید ببیند، نه چیزی که ته صفحه پیدایش کند.
 */
export function Intro() {
  return (
    <Section id="intro" className="relative">
      {/*
       * ابرهای تزئینیِ ثابت اینجا حذف شدند: حالا میدان ابرهای شناور پشت کل
       * صفحهٔ باشگاه در جریان است و ابرِ ساکن کنارِ ابرِ متحرک، ناهماهنگ
       * دیده می‌شد.
       */}
      <div className="max-w-2xl">
        {/* بج معرفی — همان جمله‌ای که خود باشگاه در بیوی رسمی‌اش نوشته */}
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-sky-text">
          <Cloud className="w-6 shrink-0 text-sky-deep" />
          {contact.tagline}
        </p>

        <h1 className="mt-7 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          <span className="block text-base font-medium tracking-wide text-muted sm:text-lg">
            {contact.name}
          </span>
          {/*
           * تیتر عمداً وعدهٔ حال‌وهوایی نمی‌دهد («بازگشت به خودتان» و مانند آن).
           * بیشترِ کسانی که این صفحه را باز می‌کنند نگران یک چیزند: اینکه بدن‌شان
           * به درد یوگا نخورد. جواب همان نگرانی، همین‌جا در تیتر می‌آید.
           */}
          <span className="mt-3 block">تمرینی به اندازهٔ بدن خودتان</span>
        </h1>

        <p className="mt-6 text-base leading-loose text-muted sm:text-lg">
          ابر سفید باشگاه بانوان است؛ در {contact.address.city}، محلهٔ{" "}
          {contact.address.district}. سالن روشن و ساکت است و کلاس‌ها کوچک، پس
          مربی فرصت دارد کنار هرکدام‌تان بایستد. از شما انعطاف یا سابقهٔ تمرین
          خواسته نمی‌شود — هر وضعیت با بلوک و کش به اندازهٔ بدن شما تنظیم می‌شود.
          کافی است بیایید و بگذارید نفس‌تان جا بیفتد.
        </p>


        {/* در موبایل تمام‌عرض و روی هم، از sm به بعد کنار هم */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="#schedule"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-3.5 text-base font-medium text-ink shadow-soft transition-colors duration-300 hover:bg-sky-hover sm:w-auto"
          >
            برنامهٔ کلاس‌ها را ببینید
            {/*
             * فلش رو به پایین انتخاب شد نه افقی: این پیوند به بخش پایین‌ترِ
             * همین صفحه می‌رود، و پیکان عمودی در RTL و LTR یک معنا دارد.
             */}
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 3v10M4 9.5L8 13.5l4-4" />
            </svg>
          </a>

          <a
            href={contact.phone.href}
            aria-label={`تماس با استودیو، ${contact.phone.display}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-base font-medium text-sky-text transition-colors duration-300 hover:bg-surface sm:w-auto"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5.5 2.5H3.2c-.4 0-.7.3-.7.7C2.5 9 7 13.5 12.8 13.5c.4 0 .7-.3.7-.7v-2.3l-2.6-.9-1.3 1.3a9.4 9.4 0 01-3.5-3.5l1.3-1.3-.9-2.6z" />
            </svg>
            <PhoneNumber />
          </a>
        </div>
      </div>
    </Section>
  );
}
