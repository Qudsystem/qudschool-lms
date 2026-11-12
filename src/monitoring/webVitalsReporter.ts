// Web Vitals monitoring — optional but recommended.
// Package: web-vitals v6+ (onINP replaces the deprecated onFID).
// Uses dynamic import + try/catch so telemetry failures never break the app.
import type { Metric } from 'web-vitals';

function sendMetric(metric: Metric): void {
  try {
    const payload = {
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      id: metric.id,
      url: window.location.href,
      ts: Date.now(),
    };
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/monitor/perf', JSON.stringify(payload));
    } else {
      fetch('/api/monitor/perf', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => { /* ignore */ });
    }
  } catch {
    /* fail-safe: never throw from telemetry */
  }
}

export async function initWebVitals(): Promise<void> {
  try {
    const mod = await import('web-vitals');
    mod.onCLS(sendMetric);
    mod.onINP(sendMetric);  // Interaction to Next Paint (replaces FID)
    mod.onLCP(sendMetric);
    mod.onFCP(sendMetric);
    mod.onTTFB(sendMetric);
  } catch {
    /* fail-safe: optional telemetry, never block the app */
  }
}
