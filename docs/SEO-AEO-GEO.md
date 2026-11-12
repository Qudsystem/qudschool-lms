# 🚀 استراتيجية SEO / AEO / GEO — QudSchool

> آخر تحديث: 2026-09-24

## 📄 الصفحات العامة (17 صفحة)

| المسار | الصفحة | Schema |
|--------|---------|--------|
| `/` | الرئيسية | ItemList + HomePage entities |
| `/courses` | الدورات | CollectionPage |
| `/live-sessions` | الحصص المباشرة | Service + OfferCatalog |
| `/pricing` | التسعير | WebPage |
| `/about` | من نحن | AboutPage + Organization |
| `/instructors` | المدربون | ItemList + Person |
| `/certifications` | الشهادات | WebPage |
| `/blog` | المدونة | Blog + BlogPosting |
| `/blog/:slug` | مقالات | BlogPosting (per post) |
| `/success-stories` | قصص النجاح | WebPage |
| `/faq` | الأسئلة الشائعة | **FAQPage** (12 سؤال) |
| `/contact` | تواصل معنا | ContactPage |
| `/privacy-policy` | سياسة الخصوصية | WebPage |
| `/terms-of-service` | شروط الخدمة | WebPage |
| `/search` | البحث (noindex) | — |

## ✅ ما تم تطبيقه

### 1. الوصول للبوتات
- **robots.txt** — يسمح: OAI-SearchBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot, DuckDuckBot, YandexBot + social crawlers. يمنع: /admin, /dashboard, /profile, /settings, /notifications, /my-learning, /community, /support, /flashcards, /sniper-arena, /ai-tutor, /search.

### 2. خرائط الموقع
- **sitemap.xml** — 17 صفحة بـ hreflang (ar/en/x-default)
- **llms.txt** — خريطة موجزة (المعيار الناشئ 2026)
- **llms-full.txt** — محتوى كامل نصي

### 3. Schema.org JSON-LD (5 كيانات في index.html)
- EducationalOrganization (مع الفريق والمؤسس)
- WebSite (مع SearchAction)
- WebPage
- FAQPage (7 أسئلة)
- Service + OfferCatalog (5 برامج + 3 Live Session plans)

### 4. useSEO hook — dynamic meta
كل صفحة عامة تستدعي `useSEO()`:
- title, description, canonical, hreflang
- og:title, og:description, og:url, og:image, og:type
- twitter:title, twitter:description, twitter:image
- JSON-LD خاص بالصفحة

### 5. الأداء
- صور مضغوطة: 15.5MB → 3.4MB (-78%)
- chunks مقسّمة: react, motion, icons, genai, vendor
- LCP image preloaded + fetchpriority
- sourcemap مُزال، Font Awesome مُزال
- 300ms artificial delay مُزال

### 6. SPA Routing
- BrowserRouter بدل HashRouter
- 404.html fallback تلقائي (postbuild)
- .nojekyll

### 7. PWA + i18n
- manifest.webmanifest
- sync-locales.mjs ينسخ locales قبل كل build (prebuild hook)

## 🛠️ نصوص البناء

```json
{
  "prebuild": "node scripts/sync-locales.mjs",     // ← جديد
  "build": "vite build",
  "postbuild": "node scripts/postbuild.mjs"
}
```

`prebuild` ينسخ `locales/*.json` إلى `public/locales/` تلقائياً قبل كل build.

## 📋 عند حجز النطاق

ابحث واستبدل:
```bash
grep -r "qudschool.com" . --include="*.txt" --include="*.xml" --include="*.ts" --include="*.html"
```

الملفات:
1. `public/robots.txt`
2. `public/sitemap.xml`
3. `public/llms.txt` + `public/llms-full.txt`
4. `hooks/useSEO.ts` (SITE_URL)
5. `index.html` (JSON-LD @graph)
6. أنشئ `public/CNAME` = نطاقك
7. GitHub Pages Settings → Custom Domain

## ⚠️ تنبيه أمني

`.env.local` يحتوي على Gemini API key حقيقي. **دوّره فوراً** إن رُفع لأي مستودع عام.

## 🚀 التوصية القادمة

- نقل إلى Cloudflare Pages / Vercel للـ SSR الكامل (استخراج AI أفضل)
- إضافة Google Analytics 4 + Search Console
- بناء backlinks (LinkedIn, YouTube, Reddit)
- إثراء Wikidata / Crunchbase
