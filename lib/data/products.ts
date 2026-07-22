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
      "مت ضدلغزش با ضخامت ۶ میلی‌متر. کف دست و کف پا رویش سُر نمی‌خورد، حتی وقتی دست‌تان عرق کرده باشد.",
    inStock: true,
  },
  {
    id: "block",
    name: "بلوک یوگا",
    symbol: "▣",
    price: 220_000,
    description:
      "بلوک فومی و سبک. وقتی دست‌تان هنوز به زمین نمی‌رسد، زمین را می‌آورد بالاتر.",
    inStock: true,
  },
  {
    id: "strap",
    name: "کش مقاومتی",
    symbol: "∿",
    price: 180_000,
    description:
      "کش کششی در سه سطح مقاومت. برای باز کردن شانه‌ها و رسیدن به پا در وضعیت‌هایی که هنوز دست‌تان کوتاه است.",
    inStock: true,
  },
  {
    id: "bottle",
    name: "قمقمه",
    symbol: "◍",
    price: 320_000,
    description:
      "قمقمهٔ استیل نیم‌لیتری. برای کلاس‌های هوت یوگا لازمش دارید؛ برای بقیهٔ کلاس‌ها هم بد نیست.",
    inStock: false,
  },
];
