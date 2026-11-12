import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Trophy, Users, BookOpen, Star } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';

const CertificationsPage: React.FC = () => {
  const { t } = useI18n();

  const certifications = [
    { iconKey: 'certifications.item1.icon', titleKey: 'certifications.item1.title', descKey: 'certifications.item1.desc' },
    { iconKey: 'certifications.item2.icon', titleKey: 'certifications.item2.title', descKey: 'certifications.item2.desc' },
    { iconKey: 'certifications.item3.icon', titleKey: 'certifications.item3.title', descKey: 'certifications.item3.desc' },
    { iconKey: 'certifications.item4.icon', titleKey: 'certifications.item4.title', descKey: 'certifications.item4.desc' },
  ];

  useSEO({
    title: 'الشهادات والاعتمادات',
    description: 'شهادات QudSchool المعتمدة ومستويات الإنجاز: شهادات إتمام، ملف إنجاز، اعتمادات معيارية لتعلم البرمجة للأطفال.',
    path: '/certifications',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'QudSchool Certifications',
      url: 'https://qudschool.com/certifications',
      inLanguage: 'ar',
      about: { '@id': 'https://qudschool.com/#organization' },
    },
  });

  const samples = [
    { image: '/assets/qudschool-certificate-ahmad-galal.png', nameKey: 'certifications.sample.ahmad', altKey: 'certifications.sample.ahmadAlt' },
    { image: '/assets/certificate-amr-mohamed-galal.png', nameKey: 'certifications.sample.amr', altKey: 'certifications.sample.amrAlt' },
    { image: '/assets/qudschool-certificate-ahmad-hussein.jpg', nameKey: 'certifications.sample.hussein', altKey: 'certifications.sample.husseinAlt' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="mx-auto mb-6 h-12 w-12 text-yellow-300" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t('certificationsPage.hero.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed">{t('certificationsPage.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {certifications.map((c, i) => {
              const icons = [Award, ShieldCheck, Trophy, Star];
              const Icon = icons[i];
              return (
                <div key={c.titleKey} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 transition-all duration-300 hover:shadow-xl">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t(c.titleKey)}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t(c.descKey)}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('certificationsPage.samples.title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('certificationsPage.samples.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samples.map((s) => (
              <figure key={s.image} className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <img src={s.image} alt={t(s.altKey)} width={600} height={450} loading="lazy" decoding="async" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                <figcaption className="p-4 text-center font-semibold text-gray-900 dark:text-white">{t(s.nameKey)}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {['portfolio', 'skills', 'career'].map((k) => (
              <div key={k} className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6">
                <CheckCircle2 className="mb-3 h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t(`certificationsPage.benefit.${k}.title`)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t(`certificationsPage.benefit.${k}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificationsPage;
