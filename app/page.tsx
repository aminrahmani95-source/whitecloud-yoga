import { CloudGate } from "@/components/splash/CloudGate";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { contact } from "@/lib/data/contact";
import { styles } from "@/lib/data/styles";

/**
 * صفحهٔ ورودی.
 *
 * صحنهٔ دو ابر، ویترین حس برند است و اول از همه دیده می‌شود. اما اگر تنها
 * محتوای این صفحه دو ابر باشد، آدرس اصلی سایت هیچ حرفی برای گوگل ندارد و
 * کسی که «یوگا کرج» را جست‌وجو می‌کند ما را پیدا نمی‌کند. پس زیر صحنه،
 * معرفی واقعی استودیو می‌آید: چه هستیم، کجاییم، چه کلاسی داریم.
 * حس برند حفظ می‌شود و هزینهٔ سئو صفر است.
 */
export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <CloudGate />

      {/*
        لنگر فلشِ پایینِ صحنهٔ ابرها به همین‌جا می‌آید.
        این بخش فقط برای خواندن و برای موتور جست‌وجوست؛ ورود به سایت عمداً
        از همان دو ابر انجام می‌شود، پس اینجا دکمهٔ ورود گذاشته نشده.
      */}
      <section id="about" className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <h2 className="text-xl font-semibold leading-snug text-ink sm:text-2xl">
            استودیو یوگای ابر سفید، در مهرویلای کرج
          </h2>

          <div className="mt-5 space-y-4 leading-loose text-muted">
            <p>
              ابر سفید یک باشگاه تخصصی یوگا برای بانوان است؛ فضایی آرام و کم‌شلوغ
              که در آن می‌توانید بی‌عجله تمرین کنید. کلاس‌ها در گروه‌های کوچک
              برگزار می‌شود تا مربی فرصت داشته باشد به هر نفر جداگانه برسد.
            </p>
            <p>
              چه تازه شروع کرده باشید و چه سال‌ها تمرین کرده باشید، کلاسی متناسب
              با سطح شما هست. سبک‌هایی که ارائه می‌کنیم:{" "}
              {styles.map((s) => s.name).join("، ")}.
            </p>
            <p>
              استودیو در {contact.address.city}، {contact.address.district} قرار
              دارد — {contact.address.line}. برای مشاوره و ثبت‌نام می‌توانید با
              شمارهٔ{" "}
              <a
                href={contact.phone.href}
                className="tabular font-medium text-sky-text underline-offset-4 hover:underline"
                dir="ltr"
              >
                {contact.phone.display}
              </a>{" "}
              تماس بگیرید.
            </p>
          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
