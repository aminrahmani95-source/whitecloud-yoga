import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Schedule } from "@/components/studio/Schedule";
import { Section } from "@/components/ui/Section";
import { contact } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "برنامهٔ هفتگی",
  description:
    "برنامهٔ هفتگی کلاس‌های استودیو یوگا ابر سفید در کرج، مهرویلا — از شنبه تا پنج‌شنبه، در سه بازهٔ صبح، عصر و شب. سطح، مربی و ظرفیت هر کلاس.",
  alternates: { canonical: "/studio/schedule/" },
};

export default function SchedulePage() {
  return (
    <PageShell
      eyebrow="برنامه"
      title="برنامهٔ هفتگی کلاس‌ها"
      lead="هفته از شنبه شروع می‌شود و تا پنج‌شنبه ادامه دارد. روی هر کلاس بزنید تا سطح، مربی، ظرفیت و توضیح کوتاهش را ببینید."
    >
      {/* تیتر داخلی خاموش است تا با سربرگ همین صفحه دوباره‌کاری نشود */}
      <Schedule />

      {/* ---------- نکته‌های کوتاه زیر جدول ---------- */}
      {/* pt-0 چون بخش برنامه خودش فاصلهٔ پایینی دارد و دو فاصله روی هم زیاد است */}
      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="font-medium text-ink">جمعه‌ها تعطیل است</h2>
            <p className="mt-3 text-sm leading-loose text-muted">
              کلاس‌ها {contact.hours.days} برگزار می‌شوند و جمعه‌ها استودیو باز
              نیست. پنج‌شنبه‌ها هم برنامه عصر تمام می‌شود و کلاس شب نداریم. در
              روزهای دیگر، در استودیو از {contact.hours.opens} باز است.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="font-medium text-ink">نگه‌داشتن جا در کلاس</h2>
            <p className="mt-3 text-sm leading-loose text-muted">
              ظرفیت هر کلاس محدود است، پس بهتر است پیش از آمدن جایتان را رزرو
              کنید. کافی است با شمارهٔ{" "}
              <a
                href={contact.phone.href}
                dir="ltr"
                className="
                  tabular font-medium text-sky-text underline underline-offset-4
                  transition-colors duration-300 hover:text-ink
                "
              >
                {contact.phone.display}
              </a>{" "}
              تماس بگیرید و بگویید کدام روز و ساعت را می‌خواهید. جلسهٔ آشنایی و
              بسته‌های چندجلسه‌ای در{" "}
              <Link
                href="/studio/pricing/"
                className="
                  font-medium text-sky-text underline underline-offset-4
                  transition-colors duration-300 hover:text-ink
                "
              >
                صفحهٔ تعرفه‌ها
              </Link>{" "}
              آمده است.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
