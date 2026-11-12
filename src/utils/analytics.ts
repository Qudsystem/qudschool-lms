/**
 * analytics.ts — Conditional GA4 + Search Console/Bing/Yandex verification meta tags.
 * All values come from Vite env vars; nothing loads if the corresponding var is empty.
 * Safe for SSR/prerender (guards on typeof document).
 *
 * To test events locally: set VITE_GA4_DEBUG=true and check the console.
 * In production, events fire only when VITE_GA4_ID is set.
 */

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const GA4_DEBUG = import.meta.env.VITE_GA4_DEBUG === 'true';
const GSC = import.meta.env.VITE_GSC_VERIFICATION as string | undefined;
const BING = import.meta.env.VITE_BING_VERIFICATION as string | undefined;
const YANDEX = import.meta.env.VITE_YANDEX_VERIFICATION as string | undefined;

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

function addMetaVerification(name: string, content: string | undefined) {
  if (!content || !isBrowser) return;
  if (document.head.querySelector(`meta[name="${name}"]`)) return;
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

function loadGA4(id: string) {
  if (!id || !isBrowser) return;
  if (document.getElementById('ga4-script')) return;
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal && !GA4_DEBUG) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  (window as unknown as { dataLayer: unknown[] }).dataLayer =
    (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
  function gtag(...args: unknown[]) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
  }
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true, send_page_view: true });
}

/** Install verification meta tags + GA4. Idempotent. */
export function installAnalytics(): void {
  addMetaVerification('google-site-verification', GSC);
  addMetaVerification('msvalidate.01', BING);
  addMetaVerification('yandex-verification', YANDEX);
  loadGA4(GA4_ID || '');
}

/** True when events will actually be forwarded (GA4 configured). */
function isActive(): boolean {
  if (!isBrowser) return false;
  if (!GA4_ID) return false;
  const gtag = (window as unknown as { gtag?: unknown }).gtag;
  return typeof gtag === 'function';
}

/** Track an SPA page view (route change). No-op when GA4 is disabled. */
export function trackPageView(path: string, title: string): void {
  if (!isActive()) return;
  const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
  gtag('event', 'page_view', { page_path: path, page_title: title });
}

/** Low-level event tracker. No-op when GA4 is disabled. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!isActive()) {
    if (GA4_DEBUG) console.info('[analytics] (skipped)', name, params);
    return;
  }
  const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
  gtag('event', name, params || {});
}

// ===================== Typed convenience helpers =====================
// All helpers no-op safely when GA4 is disabled. Params are optional and are
// passed through to GA4 verbatim (see GA4 docs for reserved parameter names).

/** User signed up (account created). */
export function trackSignup(params?: { method?: string; role?: string }): void {
  trackEvent('sign_up', { method: params?.method || 'email', role: params?.role });
}

/** User logged in. */
export function trackLogin(params?: { method?: string; role?: string }): void {
  trackEvent('login', { method: params?.method || 'email', role: params?.role });
}

/** User logged out. */
export function trackLogout(): void {
  trackEvent('logout');
}

/** User started a course / lesson / study session. */
export function trackCourseStart(params: {
  courseId?: string;
  courseName?: string;
  category?: string;
  level?: string;
}): void {
  trackEvent('course_start', params);
}

/** User completed a course / lesson. */
export function trackCourseComplete(params: {
  courseId?: string;
  courseName?: string;
}): void {
  trackEvent('course_complete', params);
}

/** User downloaded a file (certificate, export, resource). */
export function trackDownload(params: {
  fileName: string;
  fileType?: string;
  context?: string;
}): void {
  trackEvent('file_download', params);
}

/** User clicked a primary call-to-action button. */
export function trackCtaClick(params: {
  ctaId: string;
  label?: string;
  location?: string;
}): void {
  trackEvent('cta_click', params);
}

/** User submitted a form (contact, newsletter, etc.). */
export function trackFormSubmit(params: {
  formId: string;
  success: boolean;
  context?: string;
}): void {
  trackEvent('form_submit', params);
}

/** User performed a site search. */
export function trackSearch(params: { query: string; resultsCount?: number }): void {
  trackEvent('search', params);
}

/** User viewed a pricing plan or clicked on a plan. */
export function trackPlanClick(params: { planId: string; planName?: string }): void {
  trackEvent('select_content', { content_type: 'plan', item_id: params.planId, item_name: params.planName });
}

/** User clicked an outbound link. */
export function trackOutboundClick(params: { url: string; label?: string }): void {
  trackEvent('outbound_click', params);
}
