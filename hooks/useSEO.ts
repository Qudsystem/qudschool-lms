import { useEffect } from 'react';

interface SEOOptions {
  /** Page title (without site name). */
  title: string;
  /** Meta description, 120-160 chars ideal. */
  description: string;
  /** Canonical path, e.g. "/courses". */
  path: string;
  /** Optional: image for og:image / twitter:image. Absolute URL or /-rooted path. */
  image?: string;
  /** Optional: JSON-LD object to inject for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Optional: og:type, default "website". */
  type?: 'website' | 'article' | 'product';
}

const SITE_NAME = 'QudSchool | كود سكول';
const SITE_URL = 'https://qudschool.com';
const DEFAULT_IMAGE = SITE_URL + '/assets/hero-qudschool-ai.png';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * useSEO — imperative per-route SEO/AEO/GEO manager.
 * Updates title, canonical, hreflang, OG, Twitter, and per-page JSON-LD on route change.
 * Does not depend on any external library; safe for SPA without SSR.
 */
export default function useSEO(options: SEOOptions): void {
  const { title, description, path, image, jsonLd, type = 'website' } = options;

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = SITE_URL + (path === '/' ? '/' : path);
    const img = image
      ? (image.startsWith('http') ? image : SITE_URL + image)
      : DEFAULT_IMAGE;

    // --- title ---
    document.title = fullTitle;

    // --- primary ---
    setMeta('name', 'description', description);

    // --- canonical ---
    setLink('canonical', url);

    // --- hreflang ---
    setLink('alternate', url, 'ar');
    setLink('alternate', url + (url.includes('?') ? '&' : '?') + 'lang=en', 'en');
    setLink('alternate', url, 'x-default');

    // --- Open Graph ---
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', type);

    // --- Twitter ---
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);

    // --- per-page JSON-LD ---
    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'route');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [title, description, path, image, jsonLd, type]);
}
