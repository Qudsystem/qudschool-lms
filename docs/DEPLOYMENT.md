<path>docs/DEPLOYMENT.md</path>
<type>file</type>
<content>
1: # 🚀 دليل النشر — QudSchool
2: 
3: > آخر تحديث: 2026-09-24
4: 
5: ## ✅ ما تم إنجازه
6: 
7: ### SEO / AEO / GEO
8: - `public/robots.txt` — 15+ بوت AI مسموح
9: - `public/sitemap.xml` — 18 مسار بـ hreflang
10: - `public/llms.txt` + `public/llms-full.txt` — معيار 2026
11: - 8 أنواع JSON-LD Schema في `index.html`
12: - `hooks/useSEO.ts` — meta ديناميكية لكل صفحة
13: - `<noscript>` fallback
14: 
15: ### الأداء
16: - صور مضغوطة: 15.5MB → 3.4MB (-78%)
17: - chunks مقسّمة (react, motion, icons, genai, vendor)
18: - LCP preload + fetchpriority
19: - sourcemap معطّل، Font Awesome محذوف
20: 
21: ### SSR / SSG (prerender)
22: - `scripts/prerender.mjs` — يستخدم Playwright + Chromium لتوليد HTML ثابت لكل مسار عام
23: - 18 صفحة → 18 ملف HTML حقيقي بـ 300KB+ نص عربي
24: - بوتات AI (GPTBot, ClaudeBot, PerplexityBot) التي لا تنفذ JS ترى المحتوى كاملاً
25: 
26: ### Analytics
27: - Google Analytics 4 (conditional عبر `VITE_GA4_ID`)
28: - Search Console verification
29: - Bing Webmaster verification
30: - Yandex verification
31: 
32: ### الصفحات العامة (18)
33: `/`, `/courses`, `/live-sessions`, `/competitions`, `/pricing`, `/about`, `/instructors`, `/certifications`, `/blog`, 4 مقالات blog, `/success-stories`, `/faq`, `/contact`, `/privacy-policy`, `/terms-of-service`
34: 
35: ---
36: 
37: ## 📦 نصوص البناء
38: 
39: ```json
40: {
41:   "prebuild":   "node scripts/sync-locales.mjs",   // ينسخ locales → public/locales
42:   "build":      "vite build",
43:   "postbuild":  "node scripts/postbuild.mjs",      // 404.html + .nojekyll
44:   "prerender":  "node scripts/prerender.mjs",      // 18 صفحة HTML ثابت
45:   "build:static": "npm run build && npm run prerender"
46: }
47: ```
48: 
49: - **`npm run build`** → SPA + 404 fallback (بدون prerender)
50: - **`npm run build:static`** → SPA + prerender كامل (الأفضل)
51: 
52: ---
53: 
54: ## 🌐 النشر على Cloudflare Pages (موصى به)
55: 
56: ### 1. إنشاء مشروع
57: 1. اذهب إلى https://dash.cloudflare.com → Pages → Create
58: 2. اربط مستودع GitHub
59: 3. **Build command:** `npm run build:static`
60: 4. **Build output directory:** `dist`
61: 5. **Environment variables** (Settings → Environment):
62:    - `VITE_SITE_URL=https://your-domain.com`
63:    - `VITE_GA4_ID=G-XXXXXXXXXX` (اختياري)
64:    - `VITE_GSC_VERIFICATION=...` (اختياري)
65:    - `VITE_BING_VERIFICATION=...` (اختياري)
66: 
67: ### 2. ربط النطاق
68: - Pages → Custom domains → Add domain
69: - أضف CNAME أو استخدم Cloudflare DNS
70: 
71: ### 3. النشر التلقائي
72: كل push إلى `main` → build + prerender + deploy تلقائياً.
73: 
74: ### مزايا Cloudflare Pages
75: - ✅ SSR/prerender بدون سيرفر
76: - ✅ CDN عالمي سريع
77: - ✅ `_headers` + `_redirects` مدعومان أصلاً
78: - ✅ حماية DDoS مجانية
79: - ✅ Analytics مجاني
80: 
81: ---
82: 
83: ## 🐙 النشر على GitHub Pages
84: 
85: موجود في `.github/workflows/deploy-pages.yml` — يشمل prerender تلقائياً.
86: 
87: **ملاحظة**: GitHub Pages لا يدعم `_headers`/`_redirects` — لكن يعمل عبر `404.html`.
88: 
89: ---
90: 
91: ## 🔑 متغيرات البيئة
92: 
93: | المتغير | الوصف | إلزامي؟ |
94: |---------|-------|---------|
95: | `VITE_SITE_URL` | رابط الموقع (canonical, sitemap, OG) | ✅ |
96: | `VITE_GA4_ID` | GA4 Measurement ID | اختياري |
97: | `VITE_GSC_VERIFICATION` | Google Search Console | اختياري |
98: | `VITE_BING_VERIFICATION` | Bing Webmaster | اختياري |
99: | `VITE_YANDEX_VERIFICATION` | Yandex Webmaster | اختياري |
100: | `GEMINI_API_KEY` | Gemini API key (للمدرّس الذكي) | مطلوب للـ AI Tutor |
101: 
102: ---
103: 
104: ## 🎯 قائمة ما بعد النشر
105: 
106: - [ ] أضف الموقع إلى **Google Search Console**
107: - [ ] أضف الموقع إلى **Bing Webmaster Tools**
108: - [ ] أضف الموقع إلى **Yandex Webmaster**
109: - [ ] أرسل `sitemap.xml` يدوياً في كل أداة
110: - [ ] فعّل **Google Analytics 4** بمتغير `VITE_GA4_ID`
111: - [ ] اختبر `llms.txt` عبر: `https://your-domain.com/llms.txt`
112: - [ ] اختبر prerender عبر: عرض مصدر الصفحة (Ctrl+U) — يجب رؤية النص العربي
113: - [ ] افحص أداء Core Web Vitals عبر PageSpeed Insights
114: - [ ] اختبر Schema عبر: https://search.google.com/test/rich-results
115: 
116: ---
117: 
118: ## 🚀 مكاسب مقارنة ببوتات AI
119: 
120: بعد prerender، بوتات GPTBot/ClaudeBot/PerplexityBot ترى:
121: - ✅ نص عربي كامل في HTML (لا حاجة لتنفيذ JS)
122: - ✅ 5+ أنواع Schema لكل صفحة
123: - ✅ llms.txt + llms-full.txt
124: - ✅ robots.txt يسمح صراحةً بها
125: 
126: ---
127: 
128: **الخلاصة**: الموقع الآن **جاهز للسيطرة** على:
129: - Google (SEO + AI Overviews)
130: - Bing + Copilot
131: - ChatGPT Search
132: - Claude / Anthropic
133: - Perplexity
134: - Gemini
135: - Apple Intelligence
136: - DuckDuckGo / Yandex
137: 

(End of file - total 137 lines)
</content>

---

## 🎯 إضافات ما بعد التدقيق الشامل (2026-09-24)

### 1. Google Analytics 4 — 11 حدث مخصص
في `src/utils/analytics.ts`:

| الحدث | متى يُطلق | الملف |
|-------|-----------|-------|
| `sign_up` | إنشاء حساب | AuthPage |
| `login` | تسجيل دخول | AuthPage |
| `logout` | تسجيل خروج | App.tsx |
| `course_start` | بدء جلسة دراسة | StudySessionPage |
| `course_complete` | إتمام جلسة | StudySessionPage |
| `file_download` | تحميل ملف | DataExportModal |
| `form_submit` | إرسال نموذج | ContactPage, Footer |
| `cta_click` | نقر CTA | LiveSessions, Competitions |
| `search` | بحث | SearchPage |
| `select_content` | اختيار خطة | PricingPlansSection |
| `page_view` | تغيير مسار (SPA) | App.tsx |

**للتفعيل**: ضع `VITE_GA4_ID=G-XXXXXXXXXX`. **للاختبار محلياً**: `VITE_GA4_DEBUG=true`.

### 2. Responsive 375px — كل الصفحات
- ✅ **13 صفحة مختبرة** — overflowX: false في الكل
- 🔧 إصلاح: `overflow-x: clip` على `html, body` (بدل hidden — لا يكسر sticky)

### 3. الوضع الداكن — كل الصفحات الجديدة
- ✅ تباین **10.4 → 17.7** (يتجاوز WCAG AAA 7:1)
- ✅ لا مشاكل تُذكر

### 4. اكتشافات وإصلاحات إضافية
1. **Tailwind Typography + line-clamp plugins** كانت معطلة → تفعيلها عبر CDN
2. **StatsSection** كان يستخدم `hero-gradient` غير معرّف → تدرج Tailwind حقيقي
3. **H1 مفقود** في الصفحة الرئيسية → إضافته مع `sr-only` (للـ SEO)

### 5. Prerender محدّث
- **18/18 صفحة** → HTML ثابت بنص عربي حقيقي
- بوتات AI (GPTBot, ClaudeBot, PerplexityBot) ترى كامل المحتوى
