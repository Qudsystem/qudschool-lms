import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';

interface FAQItem {
  qKey: string;
  aKey: string;
  category: string;
}

const FAQS: FAQItem[] = [
  { category: 'general', qKey: 'faqPage.q.whatIs', aKey: 'faqPage.a.whatIs' },
  { category: 'general', qKey: 'faqPage.q.ages', aKey: 'faqPage.a.ages' },
  { category: 'general', qKey: 'faqPage.q.languages', aKey: 'faqPage.a.languages' },
  { category: 'courses', qKey: 'faqPage.q.courses', aKey: 'faqPage.a.courses' },
  { category: 'courses', qKey: 'faqPage.q.duration', aKey: 'faqPage.a.duration' },
  { category: 'courses', qKey: 'faqPage.q.prerequisites', aKey: 'faqPage.a.prerequisites' },
  { category: 'payment', qKey: 'faqPage.q.pricing', aKey: 'faqPage.a.pricing' },
  { category: 'payment', qKey: 'faqPage.q.refund', aKey: 'faqPage.a.refund' },
  { category: 'certificates', qKey: 'faqPage.q.certificate', aKey: 'faqPage.a.certificate' },
  { category: 'certificates', qKey: 'faqPage.q.portfolio', aKey: 'faqPage.a.portfolio' },
  { category: 'support', qKey: 'faqPage.q.support', aKey: 'faqPage.a.support' },
  { category: 'support', qKey: 'faqPage.q.parentAccess', aKey: 'faqPage.a.parentAccess' },
];

const CATEGORIES = ['all', 'general', 'courses', 'payment', 'certificates', 'support'] as const;

const FaqPage: React.FC = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('all');
  const [query, setQuery] = useState('');

  const filtered = FAQS.filter((f) => {
    if (category !== 'all' && f.category !== category) return false;
    if (query && !t(f.qKey).toLowerCase().includes(query.toLowerCase()) && !t(f.aKey).toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  // JSON-LD FAQPage for AI Overviews + Google rich results
  useSEO({
    title: 'الأسئلة الشائعة',
    description: 'إجابات مباشرة على أكثر الأسئلة شيوعاً حول QudSchool: البرامج، الأعمار، الأسعار، الشهادات، والدعم.',
    path: '/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      url: 'https://qudschool.com/faq',
      inLanguage: 'ar',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: t(f.qKey),
        acceptedAnswer: { '@type': 'Answer', text: t(f.aKey) },
      })),
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="mx-auto mb-6 h-12 w-12 text-blue-200" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t('faqPage.hero.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed">{t('faqPage.hero.subtitle')}</p>

          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('faqPage.searchPlaceholder')}
              aria-label={t('faqPage.searchPlaceholder')}
              className="w-full rounded-full border-0 bg-white/95 dark:bg-gray-900/95 px-12 py-4 text-gray-900 dark:text-white shadow-xl outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  category === c
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t(`faqPage.category.${c}`)}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">{t('faqPage.noResults')}</div>
            )}
            {filtered.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={f.qKey} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start"
                  >
                    <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">{t(f.qKey)}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div id={`faq-panel-${i}`} className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">{t(f.aKey)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-3xl bg-blue-50 dark:bg-blue-900/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('faqPage.cta.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('faqPage.cta.desc')}</p>
            <Link to="/contact" className="inline-block rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5">
              {t('faqPage.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
