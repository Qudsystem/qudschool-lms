import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import Button from '../components/Button';
import { IconQuestionMarkCircle, IconSparkles, IconPaperAirplane, IconArrowPath } from '../constants';
import { GeminiService } from '../services/GeminiService';

const geminiService = new GeminiService();

const SupportPage: React.FC = () => {
    const { t } = useI18n();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResponse('');
        
        try {
            const knowledgeBasePrompt = t('supportPage.ai.knowledgeBase');
            const fullPrompt = `${knowledgeBasePrompt}\n\nUser Question: "${input}"`;

            const stream = geminiService.generateTextStream(fullPrompt);
            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk;
                setResponse(fullResponse);
            }
        } catch (err: any) {
            console.error("AI Support Error:", err);
            const errorMessage = err.message || t('homePage.aiTutor.error.default');
            setError(errorMessage);
            setResponse('');
        } finally {
            setIsLoading(false);
        }
    };
    
    const topics = [
        { titleKey: 'supportPage.topic.gettingStarted', descKey: 'supportPage.topic.gettingStartedDesc', link: '/support/getting-started' },
        { titleKey: 'supportPage.topic.accountManagement', descKey: 'supportPage.topic.accountManagementDesc', link: '/support/account-management' },
        { titleKey: 'supportPage.topic.billing', descKey: 'supportPage.topic.billingDesc', link: '/support/billing-subscriptions' },
        { titleKey: 'supportPage.topic.technicalIssues', descKey: 'supportPage.topic.technicalIssuesDesc', link: '/support/technical-issues' },
    ];

    const inputBaseClasses = "flex-grow p-3 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400";

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <IconQuestionMarkCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                        {t('supportPage.ai.title')}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                        {t('supportPage.ai.subtitle')}
                    </p>
                </header>

                <Card className="p-6 shadow-xl mb-12">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                         <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={t('supportPage.ai.inputPlaceholder')}
                            className={inputBaseClasses}
                            disabled={isLoading}
                          />
                          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="bg-secondary hover:bg-secondary-dark">
                            {isLoading ? <IconArrowPath className="w-5 h-5 animate-spin" /> : t('supportPage.ai.getHelpButton')}
                          </Button>
                    </div>
                    
                    <div className="mt-6 min-h-[150px] p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        {isLoading && (
                            <div className="flex items-center text-neutral-DEFAULT dark:text-gray-400">
                                <IconSparkles className="w-5 h-5 text-primary animate-pulse ltr:mr-2 rtl:ml-2" />
                                <span>{t('supportPage.ai.loading')}</span>
                            </div>
                        )}
                        {!isLoading && !response && !error && (
                            <p className="text-neutral-DEFAULT dark:text-gray-400 text-center pt-10">{t('supportPage.ai.initialPrompt')}</p>
                        )}
                        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
                        {response && (
                             <div>
                                <h3 className="font-semibold text-neutral-dark dark:text-neutral-light mb-2">{t('supportPage.ai.responseTitle')}</h3>
                                <p className="text-neutral-dark dark:text-neutral-light whitespace-pre-wrap">{response}</p>
                             </div>
                        )}
                    </div>
                </Card>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-light mb-6 text-center">{t('supportPage.ai.browseTopicsTitle')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {topics.map(topic => (
                            <Link
                                key={topic.link}
                                to={topic.link}
                                className="block p-6 h-full text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-primary dark:text-primary-light">{t(topic.titleKey)}</h3>
                                <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mt-1">{t(topic.descKey, { appName: t('app.name') })}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SupportPage;