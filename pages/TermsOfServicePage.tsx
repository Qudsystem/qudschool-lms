
import React from 'react';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import useSEO from '../hooks/useSEO';

const TermsOfServicePage: React.FC = () => {
    const { t } = useI18n();
    useSEO({
      title: 'شروط الخدمة',
      description: 'شروط استخدام منصة QudSchool التعليمية.',
      path: '/terms-of-service',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Service',
        url: 'https://qudschool.com/terms-of-service',
        isPartOf: { '@id': 'https://qudschool.com/#website' },
      },
    });
    const currentDate = new Date().toLocaleDateString(t('langDir') === 'rtl' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const sections = [
        { titleKey: 'terms.acceptance.title', contentKey: 'terms.acceptance.p1' },
        { titleKey: 'terms.accounts.title', contentKey: 'terms.accounts.p1' },
        { titleKey: 'terms.userContent.title', contentKey: 'terms.userContent.p1' },
        { titleKey: 'terms.termination.title', contentKey: 'terms.termination.p1' },
        { titleKey: 'terms.disclaimers.title', contentKey: 'terms.disclaimers.p1' },
    ];

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                        {t('terms.title')}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                        {t('terms.subtitle')}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {t('terms.lastUpdated', { date: currentDate })}
                    </p>
                </header>

                <Card className="p-8 md:p-10 shadow-xl">
                    <div className="prose dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-light">
                         <p className="leading-relaxed mb-8">{t('terms.introduction')}</p>
                        {sections.map(section => (
                            <section key={section.titleKey} className="mb-8">
                                <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                                    {t(section.titleKey)}
                                </h2>
                                <p className="leading-relaxed">
                                    {t(section.contentKey, { appName: t('app.name')})}
                                </p>
                            </section>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TermsOfServicePage;