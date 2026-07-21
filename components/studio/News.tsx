import { Section, SectionHeading } from "@/components/ui/Section";
import { news } from "@/lib/data/news";

/**
 * اطلاع‌رسانی‌های استودیو.
 *
 * این بخش عمداً سبک‌تر از بقیهٔ سایت است: کارت‌ها به‌جای پُر شدن با رنگ،
 * فقط یک قاب مویی دارند. خبرها موقتی‌اند و نباید با محتوای اصلی — سبک‌ها
 * و برنامهٔ کلاس‌ها — سر جلب توجه رقابت کنند.
 */
export function News() {
  return (
    <Section id="news">
      <SectionHeading
        eyebrow="اطلاع‌رسانی"
        title="تازه‌های استودیو"
        lead="کارگاه‌ها، کلاس‌های تازه و خبر ثبت‌نام ترم‌ها را این‌جا اعلام می‌کنیم."
      />

      <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
        {news.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-line p-6"
          >
            {/* برچسب و تاریخ کنار هم؛ هر دو کوچک می‌مانند تا تیتر خبر اول دیده شود */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-sky-text">
                {item.tag}
              </span>
              <span className="tabular text-sm text-muted">{item.date}</span>
            </div>

            <h3 className="mt-4 text-base font-semibold leading-snug text-ink">
              {item.title}
            </h3>

            <p className="mt-2.5 text-sm leading-loose text-muted">
              {item.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
