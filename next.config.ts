import type { NextConfig } from "next";

/**
 * روی GitHub Pages و بدون دامنهٔ اختصاصی، سایت زیر یک زیرمسیر سِرو می‌شود:
 *   aminrahmani95-source.github.io/whitecloud-yoga/
 * پس همهٔ نشانی‌ها باید با همان زیرمسیر شروع شوند، وگرنه CSS و فونت ۴۰۴ می‌شوند.
 *
 * این مقدار فقط در CI ست می‌شود (در .github/workflows/deploy.yml)، پس
 * توسعهٔ محلی روی localhost:3000 بدون زیرمسیر و دست‌نخورده می‌ماند.
 *
 * ⚠️ وقتی دامنهٔ اختصاصی وصل شد:
 *   ۱. متغیر PAGES_BASE_PATH را از فایل ورک‌فلو بردارید
 *   ۲. فایل public/CNAME را با نام دامنه بسازید
 *   ۳. همان دامنه را در تنظیمات Pages مخزن ثبت کنید
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // خروجی کاملاً استاتیک — بدون سرور، قابل انتشار روی GitHub Pages
  output: "export",

  // بهینه‌سازی تصویر Next نیاز به سرور دارد؛ روی خروجی استاتیک خاموش می‌شود
  images: { unoptimized: true },

  // هر مسیر را به شکل پوشه/index.html می‌سازد تا /studio/ روی هاست استاتیک
  // بدون بازنویسی سمت سرور هم درست باز شود
  trailingSlash: true,

  basePath,
};

export default nextConfig;
