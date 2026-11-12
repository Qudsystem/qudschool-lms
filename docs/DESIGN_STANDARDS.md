# QudSchool — نظام التصميم ومعايير الجودة

> **مرجع إلزامي** لكل تعديل على الواجهة. مبني على ممارسات الصناعة الرائدة:
> GitHub Primer · Radix UI · Material Design 3 · Apple HIG · Tailwind ·
> Refactoring UI (Adam Wathan) · WAI-ARIA · Inclusive Components.

**القاعدة الذهبية:** *لا تُسلّم شيئاً لم تختبره في الوضعين (فاتح/داكن) والاتجاهين (عربي/إنجليزي).*

---

## 1. الاستدارات (Radius) — قاعدة نصف القطر المتداخل ⭐

**القانون:** عند تداخل عنصر داخل آخر:
\`\`\`
innerRadius = outerRadius − padding
\`\`\`
إذا كان الناتج ≤ 0 → \`rounded-none\`.

| الخارجي | الحشوة | الداخلي |
|---------|--------|---------|
| rounded-2xl (16) | p-2 (8) | rounded-lg (8) |
| rounded-2xl (16) | p-4 (16) | rounded-none |
| rounded-xl (12) | p-1 (4) | rounded (6–8) |
| rounded-3xl (24) | p-3 (12) | rounded-xl (12) |

### سلّم الاستدارات المعتمد (استخدم هذه فقط)
| الرمز | Tailwind | px | الاستخدام |
|------|----------|-----|-----------|
| xs | rounded-sm | 4 | شارات دقيقة |
| sm | rounded | 6 | حقول صغيرة |
| md | rounded-lg | 8 | أزرار، حقول، بطاقات داخلية |
| lg | rounded-xl | 12 | بطاقات، لوحات |
| xl | rounded-2xl | 16 | بطاقات كبيرة، أقسام |
| 2xl | rounded-3xl | 24 | hero، أقسام رئيسية |
| pill | rounded-full | ∞ | أزرار دائرية، شارات، صور رمزية |

⛔ **ممنوع** القيم العشوائية مثل \`rounded-[1.7rem]\` أو \`rounded-[2.3rem]\`.

### المكوّنات المركّبة (Compound)
**الطريقة الصحيحة:**
\`\`\`tsx
<div className="rounded-xl overflow-hidden">      {/* الخارجي فقط */}
  <div className="bg-gray-50 p-6">رأس</div>       {/* بلا استدارة (تُقصّ) */}
  <div className="bg-white p-6">جسم</div>
</div>
\`\`\`
**أو** بلا \`overflow-hidden\`: اجعل كل قسم يطابق الخارجي (\`rounded-t-xl\` / \`rounded-b-xl\`).

---

## 2. المسافات (Spacing) — سلّم 4px

استخدم **مضاعفات 4px** فقط (نظام 8-point الشائع):

| الحجم | Tailwind | px | الاستخدام |
|------|----------|-----|-----------|
| 1 | p-1 / gap-1 | 4 | دقيق جداً |
| 2 | p-2 | 8 | داخل الأزرار الصغيرة |
| 3 | p-3 | 12 | حقول، بطاقات صغيرة |
| 4 | p-4 | 16 | بطاقات قياسي |
| 5 | p-5 | 20 | بطاقات مريحة |
| 6 | p-6 | 24 | بطاقات كبيرة |
| 8 | p-8 | 32 | أقسام داخلية |
| 12 | py-12 | 48 | بين الأقسام الصغيرة |
| 16 | py-16 | 64 | بين الأقسام القياسي |
| 24 | py-24 | 96 | فاصل الأقسام الكبير |

**قواعد:**
- التناسق > التنوّع: استخدم 3–4 أحجام في المكوّن الواحد بحد أقصى.
- المسافة بين الأقسام: \`py-16 md:py-24\`.
- الفجوات في الشبكة: \`gap-4 md:gap-6 lg:gap-8\`.
- ⛔ لا تستخدم \`mt-[13px]\` أو \`p-[22px]\` — استخدم أقرب مضاعف لـ4.

---

## 3. الطباعة (Typography)

### السلّم
| العنصر | Class | الوزن |
|--------|-------|------|
| Hero H1 | \`text-4xl md:text-5xl lg:text-6xl font-black\` | 900 |
| عنوان قسم H2 | \`text-3xl md:text-4xl font-bold\` | 700 |
| عنوان فرعي H3 | \`text-xl md:text-2xl font-bold\` | 700 |
| نص أساسي | \`text-base md:text-lg\` | 400 |
| نص صغير | \`text-sm\` | 400–500 |
| تسمية دقيقة | \`text-xs uppercase tracking-wider\` | 600 |

### قواعد
- **ارتفاع السطر:** العناوين \`leading-tight\`، النصوص \`leading-relaxed\`.
- **طول السطر:** \`max-w-2xl\` أو \`max-w-prose\` (لا سطور طويلة جداً).
- **العنوان + الوصف:** مسافة \`mb-4\` بينهما.
- **الخط:** \`Tajawal\` للعربية، \`Inter\` للإنجليزية (معرّفة في tailwind.config).
- **الأرقام في RTL:** استخدم \`tabular-nums\` للأرقام المتغيّرة (العدّادات).

---

## 4. الألوان (Color)

### القاعدة الأساسية
- **استخدم متغيّرات CSS** من \`styles.css\` (\`--color-primary\` ...) أو أصناف Tailwind الدلالية.
- **كل لون يحتاج مقابل داكن** عبر \`dark:\`.
- **تباين WCAG AA:** نص عادي ≥ 4.5:1، نص كبير ≥ 3:1.

### الرسائل الدلالية
| الحالة | فاتح | داكن |
|--------|------|------|
| نجاح | \`bg-green-100 text-green-800\` | \`dark:bg-green-900/30 dark:text-green-300\` |
| خطأ | \`bg-red-100 text-red-800\` | \`dark:bg-red-900/30 dark:text-red-300\` |
| تحذير | \`bg-amber-100 text-amber-800\` | \`dark:bg-amber-900/30 dark:text-amber-300\` |
| معلومة | \`bg-blue-100 text-blue-800\` | \`dark:bg-blue-900/30 dark:text-blue-300\` |

### الرمادي للنص (تدرّج واضح)
- أساسي: \`text-gray-900 dark:text-white\`
- ثانوي: \`text-gray-600 dark:text-gray-300\`
- خافت: \`text-gray-500 dark:text-gray-400\`
- ⛔ لا تستخدم \`text-gray-300\` على خلفية بيضاء (باهت).

---

## 5. الظلال (Shadows / Elevation)

| المستوى | Class | الاستخدام |
|---------|-------|-----------|
| مسطّح | بلا ظل | عناصر ثابتة |
| 1 | \`shadow-sm\` | حقول، بطاقات دقيقة |
| 2 | \`shadow-md\` | بطاقات قياسي |
| 3 | \`shadow-lg\` | بطاقات بارزة، قوائم |
| 4 | \`shadow-xl\` | نوافذ، عناصر عائمة |
| 5 | \`shadow-2xl\` | عناصر مميّزة/hero |
| ملون | \`shadow-lg shadow-primary/25\` | أزرار CTA |

**قواعد:**
- الظل **يعني** الارتفاع — لا تضع ظلاً على شيء مسطّح.
- التفاعل: \`shadow-md hover:shadow-xl\`.
- الوضع الداكن: الظل أقل وضوحاً — استخدم حدوداً \`dark:border-gray-700\` معه.

---

## 6. الحالات (States) — إلزامية لكل عنصر تفاعلي

| الحالة | التطبيق |
|--------|---------|
| default | — |
| hover | \`hover:bg-*\` + \`transition\` (150–300ms) |
| focus | \`focus:ring-2 focus:ring-primary/50 focus:outline-none\` |
| active | \`active:scale-95\` |
| disabled | \`disabled:opacity-50 disabled:cursor-not-allowed\` |
| loading | spinner + تعطيل التفاعل |

**الانتقالات:** \`transition-all duration-200 ease-out\` (لا تزيد عن 300ms للتفاعلات).

---

## 7. الحركة (Motion)

- **المدة:** 150–300ms للتفاعلات الصغيرة، 500–700ms للدخول.
- **التخفيف (easing):** \`ease-out\` للدخول، \`ease-in\` للخروج.
- **احترم التفضيل:** \`@media (prefers-reduced-motion: reduce) { animation: none; }\`.
- **لا تُحرّك أكثر من خاصيتين** في وقت واحد (مثل opacity + transform).
- الحركات المفضّلة: \`fade-in\`, \`slide-up\`, \`scale\`.
- ⛔ لا تحرّك \`width\`/\`height\` (تسبب reflow) — استخدم \`transform\`/\`opacity\`.

---

## 8. RTL / LTR (إلزامي)

- **الخصائص الاتجاهية:** استخدم \`ltr:\` و \`rtl:\` دائماً (margin, padding, position).
  - مثال: \`ltr:mr-2 rtl:ml-2\` بدل \`mr-2\`.
- **الأيقونات الاتجاهية** (أسهم، chevrons): \`rtl:rotate-180\` أو \`rtl:-scale-x-100\`.
- **حقول \`type="tel"\` و \`type="email"\`:** المتصفح يفرض LTR → أضف \`rtl:text-right\`.
- **حقول \`select\`:** استخدم \`appearance-none\` + سهم مخصّص (لأن السهم الافتراضي يخرج من \`rounded-full\`).
- **القوائم المنسدلة:** تُفتح في الاتجاه الصحيح حسب اللغة.

---

## 9. الوضعان الفاتح والداكن (Theming)

- **كل عنصر مرئي** يجب اختباره في الوضعين.
- استخدم \`dark:\` لكل لون خلفية/نص/حدود.
- **الخلفيات المتدرّجة**: عرّفها في \`styles.css\` كصنف مخصّص (مثل \`.cert-image-bg\`) لأن Tailwind لا يدعم \`dark:\` على الألوان الصلبة المخصّصة.
- **الصور الفاتحة** على خلفية داكنة: قد تحتاج \`dark:brightness-0 dark:invert\` (للشعارات الأحادية).
- **الشفافية**: استخدم \`/20\` أو \`/30\` في الداكن لخفض الحدّة.

---

## 10. إمكانية الوصول (A11y)

- **الأزرار الأيقونية**: \`aria-label\` إلزامي.
- **الصور**: \`alt\` وصفي (أو \`alt=""\` للزخرفي).
- **حقول النماذج**: \`<label htmlFor>\` + \`id\` مترابط.
- **الحالة**: \`aria-expanded\` للقوائم، \`aria-current\` للتبويب النشط.
- **التباين**: اختبره بـ[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
- **التنقّل بلوحة المفاتيح**: كل تفاعل يجب أن يعمل بـTab + Enter.
- **\`focus-visible\`**: حافظ على مؤشّر واضح دائماً.

---

## 11. التجاوب (Responsive)

**نقاط الانكسار (Breakpoints):**
| الرمز | px | الجهاز |
|------|-----|--------|
| (افتراضي) | 0 | جوال صغير |
| sm | 640 | جوال كبير |
| md | 768 | تابلت |
| lg | 1024 | لابتوب |
| xl | 1280 | شاشة كبيرة |

**قواعد:**
- ابدأ من الجوال (Mobile-first).
- الشبكة: \`grid-cols-1 md:grid-cols-2 lg:grid-cols-3\`.
- ⛔ لا تفرض عرضاً ثابتاً؛ استخدم \`w-full max-w-*\`.
- الأحجام المتغيرة: \`text-2xl md:text-3xl lg:text-4xl\`.
- اختبر على 375px و768px و1440px على الأقل.

---

## 12. أفضل ممارسات الكود (Code Quality)

- **مكوّن واحد = مسؤولية واحدة.**
- **لا تكرار** — استخرج المكوّن إن تكرّر 3+ مرات.
- **الترجمات**: كل نص مرئي عبر \`t('key')\` (لا نصوص مثبّتة).
- **الأيقونات**: من \`lucide-react\` فقط (لا SVG يدوي بمسارات ناقصة).
- **الأنواع**: لا \`any\` — استخدم \`unknown\` + تحقق.
- **الأداء**: \`loading="lazy"\` للصور أسفل الطية، \`React.memo\` للقوائم الطويلة.
- **التعليقات**: بالعربية للمنطق المعقّد فقط.

---

## 13. قائمة الفحص قبل التسليم ✅

**التصميم:**
- [ ] الاستدارة الداخلية ≤ الخارجية (قاعدة نصف القطر).
- [ ] كل الاستدارات من السلّم المعتمد (لا قيم عشوائية).
- [ ] المسافات مضاعفات 4px.
- [ ] الظلال وفق سلّم الارتفاع.
- [ ] الحالات كلها موجودة (hover/focus/disabled/loading).

**العرض:**
- [ ] الوضع الفاتح ✅
- [ ] الوضع الداكن ✅
- [ ] العربية RTL ✅
- [ ] الإنجليزية LTR ✅
- [ ] الجوال (375px) ✅
- [ ] التابلت (768px) ✅
- [ ] سطح المكتب (1440px) ✅

**الجودة:**
- [ ] لا أخطاء \`npx tsc --noEmit\` في ملفاتي.
- [ ] لا نصوص مثبّتة (كل شيء عبر \`t()\`).
- [ ] \`aria-label\` للأزرار الأيقونية.
- [ ] التباين ≥ WCAG AA.
- [ ] لا انهيار/تراكب بصري (فحص \`getBoundingClientRect\`).

---

## 14. أنماط ممنوعة ❌ (Anti-patterns)

- استدارة داخلية أكبر من الخارجية.
- نصوص رمادية باهتة بلا مقابل داكن.
- أيقونات SVG بمسارات يدوية مكسورة (استخدم Lucide).
- \`overflow-hidden\` لإخفاء عيب بدل تصحيحه.
- نصوص مثبّتة (hardcoded) بدل \`t()\`.
- قيم عشوائية للمسافات/الاستدارات.
- حركة أطول من 300ms للتفاعلات.
- \`mr-*\` بدون \`ltr:\`/\`rtl:\`.
- صور بلا \`alt\`.
- أزرار بلا \`aria-label\` (إن كانت أيقونية فقط).

---

## 15. مراجع الصناعة

- [GitHub Primer](https://primer.style/) — نظام تصميم مفتوح
- [Radix UI Themes](https://www.radix-ui.com/themes) — مكوّنات عالية الجودة
- [Material Design 3](https://m3.material.io/) — جووجل
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) — آبل
- [Refactoring UI](https://www.refactoringui.com/) — آدم واثان
- [Inclusive Components](https://inclusive-components.design/) — A11y
- [Tailwind CSS Docs](https://tailwindcss.com/docs) — المرجع التقني
- [WebAIM Contrast](https://webaim.org/resources/contrastchecker/)

---

**آخر تحديث:** 2026-09-22
**الحالة:** إلزامي — يُراجع في كل تعديل واجهة
