import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Users, Clock, Calendar, CheckCircle2, MessageCircle, Award, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';
import { trackCtaClick } from '../src/utils/analytics';

const LiveSessionsPage: React.FC = () => {
  const { t } = useI18n();
  const [selected, setSelected] = useState<'group' | 'oneOnOne' | 'family'>('group');

  const plans = [
    { id: 'group' as const, icon: Users, titleKey: 'liveSessions.plan.group.title', descKey: 'liveSessions.plan.group.desc', features: ['liveSessions.plan.group.f1', 'liveSessions.plan.group.f2', 'liveSessions.plan.group.f3', 'liveSessions.plan.group.f4'], size: '1:6', duration: '60 min' },
    { id: 'oneOnOne' as const, icon: MessageCircle, titleKey: 'liveSessions.plan.one.title', descKey: 'liveSessions.plan.one.desc', features: ['liveSessions.plan.one.f1', 'liveSessions.plan.one.f2', 'liveSessions.plan.one.f3', 'liveSessions.plan.one.f4'], size: '1:1', duration: '45 min' },
    { id: 'family' as const, icon: Sparkles, titleKey: 'liveSessions.plan.family.title', descKey: 'liveSessions.plan.family.desc', features: ['liveSessions.plan.family.f1', 'liveSessions.plan.family.f2', 'liveSessions.plan.family.f3', 'liveSessions.plan.family.f4'], size: '2-4', duration: '60 min' },
  ];

  useSEO({
    title: 'الحصص المباشرة',
    description: 'حصص QudSchool المباشرة مع مدربين معتمدين: جماعية (1:6)، فردية (1:1)، أو عائلية. جلسات تفاعلية مع مشاريع عملية.',
    path: '/live-sessions',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'QudSchool Live Sessions',
      url: 'https://qudschool.com/live-sessions',
      provider: { '@id': 'https://qudschool.com/#organization' },
      serviceType: 'Live Online Coding Classes for Kids',
      areaServed: { '@type': 'Place', name: 'Online' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Live Session Plans',
        itemListElement: plans.map((p) => ({
          '@type': 'Offer',
          name: t(p.titleKey),
          description: t(p.descKey),
          category: p.size,
        })),
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Video className="mx-auto mb-6 h-12 w-12 text-blue-200" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t('liveSessions.hero.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed">{t('liveSessions.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((p) => {
              const isSelected = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`text-start rounded-3xl border-2 p-6 transition-all duration-300 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-xl scale-[1.02]'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'}`}>
                    <p.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t(p.titleKey)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t(p.descKey)}</p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" aria-hidden="true" />{p.size}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{p.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected plan details */}
          {plans.filter((p) => p.id === selected).map((p) => (
            <div key={p.id} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{t(p.titleKey)}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{t(p.descKey)}</p>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" aria-hidden="true" />
                        <span>{t(f)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5 flex items-center gap-4">
                    <Calendar className="h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{t('liveSessions.detail.schedule')}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{t('liveSessions.detail.scheduleValue')}</div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5 flex items-center gap-4">
                    <Award className="h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{t('liveSessions.detail.certificate')}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{t('liveSessions.detail.certificateValue')}</div>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    onClick={() => trackCtaClick({ ctaId: 'book-trial', label: t('liveSessions.detail.book'), location: 'live-sessions-detail' })}
                    className="block text-center rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5"
                  >
                    {t('liveSessions.detail.book')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LiveSessionsPage;
