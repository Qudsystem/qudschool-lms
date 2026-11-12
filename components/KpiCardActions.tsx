import React, { useEffect, useRef, useState } from 'react';
import { IconDotsVertical } from '../constants';
import useI18n from '../hooks/useI18n';

export interface KpiCardActionsProps {
  /** Card title resolved via t() — used in messages and aria-labels. */
  titleText: string;
  /** Raw display value (e.g. "2,000" or "$12,300"). */
  valueText: string;
  /** Callback invoked when the user chooses "hide". */
  onHide: () => void;
}

/**
 * Compact actions menu for KPI cards (feature flag: moreCardActions).
 * Frontend-only: copy to clipboard, export single-row CSV, hide card.
 * Fully accessible: aria-label on trigger, closes on outside click and Esc.
 */
const KpiCardActions: React.FC<KpiCardActionsProps> = ({ titleText, valueText, onHide }) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  };

  const handleCopy = async () => {
    setOpen(false);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(valueText);
        flash(t('dashboard.kpi.actions.copySuccess'));
      }
    } catch {
      /* clipboard permission denied — fail silently */
    }
  };

  const handleExport = () => {
    setOpen(false);
    try {
      // Basic CSV escaping: wrap in quotes, double internal quotes.
      const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
      const csv = `Metric,Value\n${esc(titleText)},${esc(valueText)}\n`;
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kpi-${titleText.replace(/\s+/g, '-').toLowerCase()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      flash(t('dashboard.kpi.actions.exportSuccess'));
    } catch {
      /* download failure — fail silently */
    }
  };

  const handleHide = () => {
    setOpen(false);
    onHide();
    flash(t('dashboard.kpi.actions.hidden'));
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setOpen(v => !v)}
        aria-label={`${t('dashboard.kpi.actions.more')}: ${titleText}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <IconDotsVertical className="w-5 h-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute ltr:right-0 rtl:left-0 mt-1 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 py-1 text-sm"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="block w-full text-start px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t('dashboard.kpi.actions.copy')}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleExport}
            className="block w-full text-start px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t('dashboard.kpi.actions.export')}
          </button>
          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
          <button
            type="button"
            role="menuitem"
            onClick={handleHide}
            className="block w-full text-start px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            {t('dashboard.kpi.actions.hide')}
          </button>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="absolute ltr:right-0 rtl:left-0 top-full mt-1 text-xs bg-neutral-dark dark:bg-white text-white dark:text-neutral-dark px-2 py-1 rounded shadow z-30 whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default KpiCardActions;
