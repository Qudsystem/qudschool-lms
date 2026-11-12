<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1fx0VNFfHRjnEmYTue2v3XA0DK5IfPz3v

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Never commit `.env`, `.env.local`, or API keys. Use `.env.example` as the
template for local configuration.

## Publish with GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Enable **Settings
> Pages > Source: GitHub Actions**, then push to `main`; the workflow builds
`dist/` and publishes it automatically. Do not commit `.env` or API keys.

For a custom domain, first register an available name through
[DigitalPlat FreeDomain](https://dash.domain.digitalplat.org/). DigitalPlat
handles registration and nameserver delegation; ordinary `A`, `AAAA`, and
`CNAME` records must be created at the external authoritative DNS provider
chosen by the domain owner. Add the verified domain in GitHub Pages settings
and create the DNS records shown by GitHub. DNS changes can take time to
propagate, so verify the final HTTPS certificate before sharing the URL.

# نظام توليد الصور باستخدام AI

## الإعداد
1. قم بتثبيت المتطلبات:
```bash
pip install google-genai Pillow
```

2. قم بإعداد مفتاح API:
```bash
export GEMINI_API_KEY="your-api-key-here"
```

## تجربة النظام

1. تشغيل الاختبار الكامل:
```bash
python examples/test_features.py
```

2. متابعة النتائج:
- الصور المولدة ستظهر في مجلد `src/assets/generated`
- سيتم عرض تقارير التنفيذ في وحدة التحكم

## الميزات المتوفرة
- توليد صور فردية
- توليد مجموعات صور
- فحص الصور التالفة
- إصلاح تلقائي للصور
- مراقبة جودة الصور
