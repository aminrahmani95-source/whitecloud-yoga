import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // خروجی کاملاً استاتیک — بدون سرور، قابل انتشار روی GitHub Pages
  output: "export",

  // بهینه‌سازی تصویر Next نیاز به سرور دارد؛ روی خروجی استاتیک خاموش می‌شود
  images: { unoptimized: true },

  // هر مسیر را به شکل پوشه/index.html می‌سازد تا /studio/ روی هاست استاتیک
  // بدون بازنویسی سمت سرور هم درست باز شود
  trailingSlash: true,
};

export default nextConfig;
