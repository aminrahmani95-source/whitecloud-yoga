/**
 * محصولات فروشگاه — اسکلت نسخهٔ اول.
 *
 * پرداخت آنلاین در این نسخه وجود ندارد. ساختار داده عمداً شبیه یک کاتالوگ
 * واقعی است تا افزودن سبد خرید و درگاه پرداخت بعداً فقط لایهٔ جدید باشد،
 * نه بازنویسی. سفارش فعلاً از راه تماس یا دایرکت انجام می‌شود.
 */

export type Product = {
  id: string;
  name: string;
  /** نماد کوتاه برای جای‌نگهدار عکس تا وقتی عکس واقعی نداریم */
  symbol: string;
  price: number;
  description: string;
  inStock: boolean;
};

/** قیمت را با جداکنندهٔ هزارگان و ارقام فارسی نشان می‌دهد */
export const formatPrice = (toman: number): string =>
  toman.toLocaleString("fa-IR");

export const products: Product[] = [
  {
    id: "mat",
    name: "مت یوگا",
    symbol: "▤",
    price: 850_000,
    description:
      "مت ضدلغزش با ضخامت ۶ میلی‌متر. سطح مناسب برای تمرین‌های ایستاده و نشسته.",
    inStock: true,
  },
  {
    id: "block",
    name: "بلوک یوگا",
    symbol: "▣",
    price: 220_000,
    description:
      "بلوک سبک فومی برای کمک به وضعیت‌هایی که هنوز دسترسی کامل ندارید.",
    inStock: true,
  },
  {
    id: "strap",
    name: "کش مقاومتی",
    symbol: "∿",
    price: 180_000,
    description:
      "کش کششی برای باز کردن شانه‌ها و افزایش دامنهٔ حرکتی، در سه سطح مقاومت.",
    inStock: true,
  },
  {
    id: "bottle",
    name: "قمقمه",
    symbol: "◍",
    price: 320_000,
    description:
      "قمقمهٔ استیل نیم‌لیتری. مخصوصاً برای کلاس‌های هوت یوگا لازم است.",
    inStock: false,
  },
];
