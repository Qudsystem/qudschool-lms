import React from 'react';
import PricingPlansSection from '../components/PricingPlansSection';
import useI18n from '../hooks/useI18n';
import useSEO from '../hooks/useSEO';

const PricingPage: React.FC = () => {
  const { t } = useI18n();
  useSEO({
    title: 'خطط الأسعار',
    description: 'اختر الخطة المناسبة لطفلك في QudSchool. خطط مرنة لتعليم البرمجة والذكاء الاصطناعي مع مشاريع عملية وشهادات معتمدة.',
    path: '/pricing',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'QudSchool Pricing',
      url: 'https://qudschool.com/pricing',
      isPartOf: { '@id': 'https://qudschool.com/#website' },
      inLanguage: 'ar',
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('pricing.title') || 'خطط الأسعار'}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t('pricing.subtitle') || 'اختر الخطة المناسبة لطفلك واستمتع برحلة تعليمية فريدة في عالم البرمجة'}
          </p>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <PricingPlansSection />
    </div>
  );
};

export default PricingPage;
