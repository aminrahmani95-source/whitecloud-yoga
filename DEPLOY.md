# انتشار

سایت با هر push به شاخهٔ `main` خودکار build و روی GitHub Pages منتشر می‌شود.
پیکربندی: `.github/workflows/deploy.yml`

## نشانی فعلی

```
https://aminrahmani95-source.github.io/whitecloud-yoga/
```

## چرا سایت فعلاً در گوگل نمی‌آید

در `app/layout.tsx` دستور `noindex` فعال است و `public/robots.txt` هم
خزنده‌ها را رد می‌کند. دلیلش این است که **قیمت‌های تعرفه هنوز ساختگی‌اند**
و نباید به نام یک باشگاه واقعی در نتایج جست‌وجو بنشینند.

پس از نهایی شدن قیمت‌ها و محتوا، برای دیده شدن در گوگل:

1. در `app/layout.tsx` بلوک `robots` را از `metadata` حذف کنید
2. `public/robots.txt` را حذف کنید یا `Disallow: /` را بردارید

## وصل کردن دامنهٔ اختصاصی

الان سایت زیر یک زیرمسیر (`/whitecloud-yoga/`) سِرو می‌شود، پس
`PAGES_BASE_PATH` در ورک‌فلو ست شده است. با دامنهٔ اختصاصی، سایت روی ریشه
می‌آید و آن متغیر باید برداشته شود:

1. در `.github/workflows/deploy.yml` خط `PAGES_BASE_PATH` را حذف کنید
2. فایل `public/CNAME` را بسازید و فقط نام دامنه را داخلش بنویسید
   (مثلاً `whitecloud.ir` — بدون `https://` و بدون `/`)
3. رکورد DNS دامنه را به GitHub Pages اشاره دهید
4. همان دامنه را در Settings → Pages → Custom domain مخزن ثبت کنید

اگر مرحلهٔ ۱ را فراموش کنید، همهٔ نشانی‌ها یک `/whitecloud-yoga` اضافه
می‌گیرند و CSS و فونت‌ها ۴۰۴ می‌شوند.

## نشانی‌های canonical

`metadataBase` در `app/layout.tsx` از متغیر `PAGES_SITE_URL` خوانده می‌شود و
canonical همهٔ صفحه‌ها از روی آن ساخته می‌شود. با تغییر دامنه فقط همان یک
متغیر در ورک‌فلو باید عوض شود؛ لازم نیست تک‌تک صفحه‌ها را دست بزنید.
