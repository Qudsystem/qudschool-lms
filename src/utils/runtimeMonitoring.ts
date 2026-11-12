type RuntimeErrorDetails = {
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  timestamp: string;
  path: string;
};

const STORAGE_KEY = 'qudschool.runtime-errors';
const MAX_EVENTS = 20;
const IMAGE_FALLBACK = '/assets/illustrations/learning-platform.svg';
const LOGO_FALLBACK = '/assets/logos/fallback-logo.svg';

function normalizeError(error: unknown, source: string): RuntimeErrorDetails {
  const value = error instanceof Error ? error : new Error(String(error));
  return {
    message: value.message,
    stack: value.stack,
    source,
    timestamp: new Date().toISOString(),
    path: window.location.href,
  };
}

export function recordRuntimeError(error: unknown, source: string) {
  const event = normalizeError(error, source);
  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const events = Array.isArray(previous) ? previous.slice(-MAX_EVENTS + 1) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...events, event]));
  } catch {
    // Diagnostics must never crash the application or hide the original error.
  }
  window.dispatchEvent(new CustomEvent('qudschool:runtime-error', { detail: event }));
}

export function installRuntimeMonitoring() {
  const onError = (event: ErrorEvent) => {
    recordRuntimeError(event.error || event.message, 'window.error');
  };
  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    recordRuntimeError(event.reason, 'unhandledrejection');
  };
  const onImageError = (event: Event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === 'true') {
      return;
    }

    image.dataset.fallbackApplied = 'true';
    image.src = /logo|brand|partner/i.test(image.alt)
      ? LOGO_FALLBACK
      : IMAGE_FALLBACK;
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);
  window.addEventListener('error', onImageError, true);
  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
    window.removeEventListener('error', onImageError, true);
  };
}
