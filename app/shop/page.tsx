/**
 * فروشگاه — اسکلت نسخهٔ اول.
 *
 * ── درز معماری برای سبد خرید و درگاه پرداخت ─────────────────────────────
 * این صفحه عمداً فقط یک «کاتالوگ» است: داده از lib/data/products.ts می‌آید و
 * کارت‌ها هیچ حالتی (state) ندارند، پس صفحه یک Server Component خالص می‌ماند و
 * با خروجی استاتیک (output: "export") سازگار است.
 *
 * وقتی سبد خرید اضافه شود، شکل کار این است و نه بیشتر:
 *   ۱. کارت محصول به یک کامپوننت کلاینتی جدا منتقل می‌شود («use client»)،
 *      همین صفحه سرور می‌ماند و فقط داده را پاس می‌دهد.
 *   ۲. یک CartProvider بالای درخت (در layout بخش فروشگاه) وضعیت سبد را نگه می‌دارد.
 *   ۳. دکمهٔ «سفارش» به addToCart وصل می‌شود — دقیقاً همان جایی که الان
 *      کامنت درز را گذاشته‌ایم.
 * تا آن روز، فروش از راه تماس تلفنی و دایرکت اینستاگرام انجام می‌شود؛ هر دو
 * در فوتر همین صفحه هستند. درگاه پرداخت ایرانی (زرین‌پال و مانند آن) به سرور
 * نیاز دارد و بیرون از این خروجی استاتیک قرار می‌گیرد.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { products, formatPrice } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "فروشگاه",
  description:
    "لوازم تمرین یوگا در استودیو ابر سفید — مت، بلوک، کش مقاومتی و قمقمه. برای سفارش تماس بگیرید یا در دایرکت پیام بدهید.",
};

export default function ShopPage() {
  return (
    <>
      {/* فروشگاه لینک داخلی ندارد؛ nav خالی است تا هدر فقط سوییچ بخش را نشان دهد */}
      <SiteHeader section="shop" nav={[]} />

      <main className="flex-1">
        <Section id="products">
          <SectionHeading
            eyebrow="فروشگاه"
            title="لوازم تمرین"
            lead="چند قلم ساده و بادوام که در کلاس‌ها هم از همان‌ها استفاده می‌کنیم. برای سفارش تماس بگیرید یا در دایرکت پیام بدهید."
          />

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                {/* تا عکس واقعی نداریم، نماد محصول جای عکس می‌نشیند */}
                <div className="relative">
                  <Placeholder
                    label={product.symbol}
                    size="lg"
                    className="aspect-[4/3] w-full"
                  />
                  {!product.inStock && (
                    <span className="absolute end-3 top-3 rounded-full border border-line bg-bg px-3 py-1 text-xs font-medium text-muted">
                      ناموجود
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-loose text-muted">
                    {product.description}
                  </p>

                  <p className="mt-4 text-ink">
                    <span className="tabular font-semibold">
                      {formatPrice(product.price)}
                    </span>{" "}
                    <span className="text-sm text-muted">تومان</span>
                  </p>

                  {/*
                   * ── درز سفارش ──
                   * این دکمه عمداً هیچ رفتاری ندارد و به هیچ‌جا وصل نیست.
                   * در نسخهٔ بعد یکی از این سه به آن وصل می‌شود:
                   *   • تماس تلفنی  → پیوند tel از lib/data/contact.ts
                   *   • دایرکت      → پیوند اینستاگرام از همان فایل
                   *   • درگاه پرداخت → onClick به addToCart سبد خرید
                   * تا آن موقع <button> واقعی می‌ماند (نه <div>) تا فوکوس کیبورد،
                   * حالت disabled و رفتار صفحه‌خوان همین حالا درست باشد.
                   */}
                  <button
                    type="button"
                    disabled={!product.inStock}
                    aria-label={
                      product.inStock
                        ? `سفارش ${product.name}`
                        : `${product.name} — ناموجود`
                    }
                    className={`
                      mt-5 w-full rounded-full px-4 py-2.5 text-sm font-medium
                      transition-colors duration-300
                      ${
                        product.inStock
                          ? "bg-sky text-ink hover:bg-sky-hover"
                          : // برای حالت غیرفعال از opacity استفاده نمی‌کنیم؛
                            // شفافیت کنتراست را می‌شکند. متن muted روی surface
                            // همچنان ۴٫۷:۱ است و AA را رد می‌کند.
                            "cursor-not-allowed border border-line bg-surface text-muted"
                      }
                    `}
                  >
                    {product.inStock ? "سفارش" : "ناموجود"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-xl text-sm leading-loose text-muted">
            پرداخت آنلاین هنوز فعال نیست. سفارش‌ها را تلفنی یا در دایرکت ثبت
            می‌کنیم و کالا را می‌توانید در خود استودیو تحویل بگیرید.
          </p>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
