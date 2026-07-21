import { Cloud, type CloudShape } from "@/components/brand/Cloud";

/**
 * میدان ابرهای پس‌زمینه — ابرهایی که آرام از عرض صفحه عبور می‌کنند.
 *
 * هر ابر دو لایه دارد:
 *   بیرونی → عبور افقی از کل عرض صفحه (drift-across)
 *   درونی  → بالا-پایین رفتن ملایم (drift)
 * اگر هر دو روی یک عنصر بودند، transform یکی دیگری را می‌خورد.
 *
 * هیچ‌کدام از این عددها تصادفیِ زمانِ اجرا نیست — با Math.random سرور و کلاینت
 * دو خروجی متفاوت می‌دادند و hydration می‌شکست. مقادیر دستی و نامنظم انتخاب
 * شده‌اند تا الگو به چشم نیاید.
 *
 * delay منفی یعنی هر ابر از وسط مسیرش شروع می‌کند، پس در لحظهٔ باز شدن صفحه
 * ابرها همه‌جا پخش‌اند، نه اینکه صفحه خالی باشد و یکی‌یکی از راست وارد شوند.
 *
 * هر سه فرم به‌تناوب به کار می‌روند (سه‌تا از هر کدام) تا دو ابری که پشت سر هم
 * از صفحه می‌گذرند هیچ‌وقت هم‌شکل نباشند.
 */

type AmbientCloud = {
  /** موقعیت عمودی */
  top: string;
  /** مکان ثابت افقی — وقتی «کاهش حرکت» روشن باشد ابر همین‌جا می‌ماند */
  left: string;
  width: string;
  /** ۰ تا ۱ — روی صفحات پرمتن با ضریب کاهش ضرب می‌شود */
  opacity: number;
  duration: string;
  delay: string;
  /** دامنهٔ بالا-پایین رفتن */
  bob: { y: string; duration: string };
  shape: CloudShape;
};

const clouds: AmbientCloud[] = [
  { top: "6%",  left: "12%", width: "7rem",   opacity: 0.22, duration: "78s",  delay: "-12s", bob: { y: "-14px", duration: "11s" }, shape: "chubby" },
  { top: "14%", left: "62%", width: "4.5rem", opacity: 0.16, duration: "112s", delay: "-64s", bob: { y: "-9px",  duration: "15s" }, shape: "long"   },
  { top: "26%", left: "30%", width: "9rem",   opacity: 0.13, duration: "94s",  delay: "-38s", bob: { y: "-18px", duration: "13s" }, shape: "main"   },
  { top: "38%", left: "80%", width: "5.5rem", opacity: 0.20, duration: "68s",  delay: "-51s", bob: { y: "-11px", duration: "9s"  }, shape: "long"   },
  { top: "52%", left: "8%",  width: "6.5rem", opacity: 0.15, duration: "126s", delay: "-20s", bob: { y: "-13px", duration: "17s" }, shape: "chubby" },
  { top: "61%", left: "46%", width: "4rem",   opacity: 0.24, duration: "84s",  delay: "-73s", bob: { y: "-8px",  duration: "12s" }, shape: "main"   },
  { top: "72%", left: "70%", width: "8rem",   opacity: 0.12, duration: "104s", delay: "-30s", bob: { y: "-16px", duration: "14s" }, shape: "long"   },
  { top: "83%", left: "22%", width: "5rem",   opacity: 0.19, duration: "72s",  delay: "-58s", bob: { y: "-10px", duration: "10s" }, shape: "chubby" },
  { top: "91%", left: "88%", width: "6rem",   opacity: 0.14, duration: "118s", delay: "-9s",  bob: { y: "-12px", duration: "16s" }, shape: "main"   },
];

/**
 * روی صفحهٔ ورودی متنی پشت ابرها نیست، پس شفافیت کامل مشکلی ندارد.
 * روی صفحات باشگاه اما متن روی همین ابرها می‌افتد و کنتراست را پایین می‌آورد.
 *
 * اندازه‌گیری: متن ثانویه (muted) روی زمینهٔ اصلی ۵٫۲:۱ است. با ابری به
 * شفافیت ۲۰٪ پشتش به ۴٫۴:۱ می‌رسد و از استاندارد AA می‌افتد؛ با ۱۰٪ روی
 * ۴٫۸:۱ می‌ماند. پس روی صفحات پرمتن شفافیت نصف می‌شود.
 */
const DIM_FACTOR = 0.45;

export function CloudField({
  behindText = false,
}: {
  /** روی صفحاتی که متن روی ابرها می‌افتد true بدهید */
  behindText?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {clouds.map((cloud, index) => (
        <span
          key={index}
          className="ambient-cloud absolute will-change-transform"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            animation: `drift-across ${cloud.duration} linear ${cloud.delay} infinite`,
          }}
        >
          <span
            className="block will-change-transform"
            style={
              {
                "--drift-x": "0px",
                "--drift-y": cloud.bob.y,
                animation: `drift ${cloud.bob.duration} ease-in-out infinite`,
              } as React.CSSProperties
            }
          >
            <Cloud
              shape={cloud.shape}
              className="w-full text-sky-deep"
              style={{
                opacity: behindText
                  ? +(cloud.opacity * DIM_FACTOR).toFixed(3)
                  : cloud.opacity,
              }}
            />
          </span>
        </span>
      ))}
    </div>
  );
}
