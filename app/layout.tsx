import type { Metadata } from "next";
import "./globals.css";

// نکته: عمداً از next/font/google استفاده نمی‌کنیم — موقع build به سرور گوگل
// وصل می‌شود. فونت استعداد به‌صورت لوکال در app/fonts.css تعریف شده است.

export const metadata: Metadata = {
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
