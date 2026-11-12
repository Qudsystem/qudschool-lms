import React from 'react';
import { Badge } from '../types';
import Card from './Card';
import useI18n from '../hooks/useI18n';
import { IconSparkles } from '../constants';

interface AchievementsCardProps {
    badges: Badge[];
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ badges }) => {
    const { t } = useI18n();

    return (
        <Card className="p-6">
            <div className="flex items-center mb-4">
                <IconSparkles className={`w-6 h-6 text-yellow-500 ${t('langDir') === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('profilePage.achievements.title')}</h3>
            </div>
            {badges.length > 0 ? (
                <div className="space-y-4">
                    {badges.map(badge => (
                        <div key={badge.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <div className="flex-shrink-0 text-yellow-500 mt-1">
                                {React.cloneElement(badge.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}
                            </div>
                            <div>
                                <h4 className="font-semibold text-neutral-dark dark:text-neutral-light">{t(badge.nameKey)}</h4>
                                <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">{t(badge.descriptionKey)}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t('profilePage.achievements.earnedOn')} {badge.dateEarned}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">{t('profilePage.achievements.noBadges')}</p>
            )}
        </Card>
    );
};

export default AchievementsCard;
