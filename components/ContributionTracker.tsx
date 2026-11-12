import React from 'react';
import useI18n from '../hooks/useI18n';
import Card from './Card';

// This is a placeholder component for a future feature.
const ContributionTracker: React.FC = () => {
    const { t } = useI18n();

    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
                {/* Placeholder for translation key */}
                Contribution Activity
            </h3>
            <div className="mt-4 text-center text-neutral-DEFAULT dark:text-gray-400">
                <p>Contribution tracking feature coming soon!</p>
            </div>
        </Card>
    );
};

export default ContributionTracker;