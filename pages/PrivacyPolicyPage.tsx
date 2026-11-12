import React from 'react';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import useSEO from '../hooks/useSEO';

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useI18n();
    useSEO({
      title: 'سياسة الخصوصية',
      description: 'سياسة الخصوصية في QudSchool: كيف نجمع بياناتك ونحميها ونستخدمها.',
      path: '/privacy-policy',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: 'https://qudschool.com/privacy-policy',
        isPartOf: { '@id': 'https://qudschool.com/#website' },
      },
    });
    const currentDate = new Date().toLocaleDateString(t('langDir') === 'rtl' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const sections = [
        { titleKey: 'privacy.introduction.title', contentKey: 'privacy.introduction.p1' },
        { titleKey: 'privacy.informationWeCollect.title', contentKey: 'privacy.informationWeCollect.p1' },
        { titleKey: 'privacy.howWeUseInformation.title', contentKey: 'privacy.howWeUseInformation.p1' },
    ];

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                        {t('privacy.title')}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                        {t('privacy.subtitle')}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {t('privacy.lastUpdated', { date: currentDate })}
                    </p>
                </header>

                <Card className="p-8 md:p-10 shadow-xl">
                    <div className="prose dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-light">
                        {sections.map(section => (
                            <section key={section.titleKey} className="mb-8">
                                <h2 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                                    {t(section.titleKey)}
                                </h2>
                                <p className="leading-relaxed">
                                    {t(section.contentKey)}
                                </p>
                            </section>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
