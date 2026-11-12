import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import { IconQuestionMarkCircle } from '../constants';

const SupportArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, langDir } = useI18n();

    // Map slug to translation keys
    const articleKeys: { [key: string]: { title: string; subtitle: string; content: string[] } } = {
        'getting-started': {
            title: 'support.article.gettingStarted.title',
            subtitle: 'support.article.gettingStarted.subtitle',
            content: [
                'support.article.gettingStarted.content.p1',
                'support.article.gettingStarted.content.p2',
            ]
        },
        'account-management': {
            title: 'support.article.accountManagement.title',
            subtitle: 'support.article.accountManagement.subtitle',
            content: [
                'support.article.accountManagement.content.p1',
                'support.article.accountManagement.content.p2',
            ]
        },
        'billing-subscriptions': {
            title: 'support.article.billing.title',
            subtitle: 'support.article.billing.subtitle',
            content: [
                'support.article.billing.content.p1',
                'support.article.billing.content.p2',
            ]
        },
        'technical-issues': {
            title: 'support.article.technical.title',
            subtitle: 'support.article.technical.subtitle',
            content: [
                'support.article.technical.content.p1',
                'support.article.technical.content.p2',
            ]
        }
    };

    const currentArticle = slug ? articleKeys[slug] : null;

    if (!currentArticle) {
        return (
            <div className="py-20 text-center">
                <p>Article not found.</p>
                <Link to="/support" className="text-primary hover:underline">Return to Support Center</Link>
            </div>
        );
    }
    
    const breadcrumbSeparator = langDir === 'rtl' ? <span className="mx-2">/</span> : <span className="mx-2">/</span>;

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex text-sm mb-6" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link to="/support" className="text-neutral-DEFAULT dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                                {t('support.article.breadcrumb')}
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                {breadcrumbSeparator}
                                <span className="text-neutral-dark dark:text-neutral-light font-medium">{t(currentArticle.title)}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <header className="text-center mb-10">
                    <IconQuestionMarkCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                        {t(currentArticle.title)}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                        {t(currentArticle.subtitle)}
                    </p>
                </header>

                <Card className="p-8 md:p-10 shadow-xl">
                    <div className="prose dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-light space-y-4">
                        {currentArticle.content.map((pKey, index) => (
                            <p key={index} className="leading-relaxed">
                                {t(pKey)}
                            </p>
                        ))}
                    </div>
                </Card>

                 <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
                    <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                        {t('supportPage.contactSupportPrompt')}{' '}
                        <a href="#" onClick={(e) => {e.preventDefault(); alert('Contact form would be here.');}} className="text-primary dark:text-primary-light hover:underline font-medium">
                            {t('supportPage.contactSupportLink')}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SupportArticlePage;