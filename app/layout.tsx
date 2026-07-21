import type { Metadata } from "next";
import "./globals.css";

// نکته: عمداً از next/font/google استفاده نمی‌کنیم — موقع build به سرور گوگل
// وصل می‌شود. فونت استعداد به‌صورت لوکال در app/fonts.css تعریف شده است.

/**
 * پایهٔ همهٔ نشانی‌های مطلق در متادیتا (canonical و OpenGraph).
 *
 * بدون این، canonical صفحه‌ها به شکل «/studio/» تولید می‌شود که فقط وقتی
 * درست است که سایت روی ریشهٔ دامنه باشد. الان زیر زیرمسیرِ نام مخزن است،
 * پس آن نشانی وجود ندارد و گوگل را به ۴۰۴ می‌فرستد.
 *
 * مقدارش در CI ست می‌شود (.github/workflows/deploy.yml). با وصل شدن دامنهٔ
 * اختصاصی فقط کافی است همان‌جا عوضش کنید — راهنما: DEPLOY.md
 */
const siteUrl =
  process.env.PAGES_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "استودیو یوگا ابر سفید | باشگاه بانوان در کرج، مهرویلا",
    template: "%s | ابر سفید",
  },
  description:
    "استودیو یوگای ابر سفید در کرج، مهرویلا — باشگاه تخصصی بانوان با کلاس‌های هاتا، وینیاسا، یین، آشتانگا، هوت یوگا و رستوراتیو. برنامهٔ هفتگی کلاس‌ها و معرفی مربیان.",
  keywords: [
    "یوگا کرج",
    "باشگاه یوگا بانوان",
    "یوگا مهرویلا",
    "کلاس یوگا کرج",
    "ابر سفید",
    "هاتا یوگا",
    "وینیاسا",
  ],
  openGraph: {
    title: "استودیو یوگا ابر سفید — باشگاه بانوان، کرج",
    description:
      "فضایی آرام برای تمرین یوگا در مهرویلای کرج. کلاس‌های هاتا، وینیاسا، یین، آشتانگا، هوت یوگا و رستوراتیو.",
    locale: "fa_IR",
    type: "website",
  },

  /*
   * ⚠️ موقتی — تا نهایی شدن محتوا.
   *
   * قیمت‌های تعرفه هنوز ساختگی‌اند و این سایت به نام یک باشگاه واقعی با
   * تلفن و آدرس واقعی بالاست. اگر گوگل ایندکسش کند، قیمت ساختگی به اسم آن
   * باشگاه در نتایج جست‌وجو می‌نشیند.
   *
   * فقط robots.txt کافی نیست: آن جلوی خزیدن را می‌گیرد، ولی صفحه‌ای که از
   * جای دیگری لینک شده باشد باز هم می‌تواند ایندکس شود. این متاتگ صریحاً
   * ایندکس را ممنوع می‌کند.
   *
   * برای برداشتن: همین بلوک robots را حذف کنید و public/robots.txt را هم.
   * راهنما: DEPLOY.md
   */
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
