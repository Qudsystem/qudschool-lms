import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/GeminiService';
import useI18n from '../hooks/useI18n';
import Card from './Card';
import Button from './Button';
import { IconSparkles, IconAcademicCap } from '../constants';

const geminiService = new GeminiService();

interface Recommendation {
    title: string;
    reason: string;
}

const RecommendedCourses: React.FC = () => {
    const { t } = useI18n();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // In a real app, you would dynamically get the user's enrolled courses.
                const enrolledCourses = "'Advanced React Programming', 'AI and Machine Learning Basics'";
                const prompt = `I am a student enrolled in the following courses: ${enrolledCourses}. Based on these, recommend 3 other courses I might like from the QudSchool catalog. Provide the response as a valid JSON array of objects, where each object has a "title" (string) and a "reason" (string) key.`;
                
                const result = await geminiService.generateJsonData<Recommendation[]>(prompt);
                setRecommendations(result);

            } catch (err: any) {
                console.error("Failed to get recommendations:", err);
                setError(t('dashboard.recommendations.error'));
            } finally {
                setIsLoading(false);
            }
        };

        // Check for API key before fetching
        if (process && process.env && process.env.API_KEY) {
            fetchRecommendations();
        } else {
            setError("API key is not configured.");
            setIsLoading(false);
        }
    }, [t]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <IconSparkles className="w-12 h-12 text-primary mx-auto animate-pulse mb-4" />
                    <p className="text-neutral-DEFAULT dark:text-gray-400">{t('dashboard.recommendations.loading')}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-8 text-red-600 dark:text-red-400">
                    <p>{error}</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {recommendations.map((rec, index) => (
                    <Card key={index} className="p-6 flex flex-col" hoverEffect>
                        <div className="flex-shrink-0">
                            <IconAcademicCap className="w-8 h-8 text-secondary mb-3" />
                        </div>
                        <h4 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light mb-2">{rec.title}</h4>
                        <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 flex-grow">{rec.reason}</p>
                        <Button variant="outline" size="sm" className="mt-4 w-full">
                            {t('coursesPage.course.viewCourse')}
                        </Button>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl col-span-1 md:col-span-2 xl:col-span-4">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('dashboard.recommendations.title')}</h3>
                <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 flex items-center">
                    {t('dashboard.recommendations.subtitle')}
                    <span className="text-xs ltr:ml-2 rtl:mr-2 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full flex items-center">
                        <IconSparkles className="w-3 h-3 text-primary ltr:mr-1 rtl:ml-1" />
                        {t('dashboard.recommendations.poweredBy')}
                    </span>
                </p>
            </div>
            {renderContent()}
        </div>
    );
};

export default RecommendedCourses;
