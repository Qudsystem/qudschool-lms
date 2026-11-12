import React from 'react';
import { Link } from 'react-router-dom';
import { IconCommunityFeature } from '../constants';
import Button from '../components/Button';
import useI18n from '../hooks/useI18n';

const CommunityPage: React.FC = () => {
  const { t } = useI18n();
  const appName = t('app.name');

  return (
    <div className="py-16 md:py-24 bg-primary text-white min-h-[calc(100vh-128px)] flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <IconCommunityFeature className="h-24 w-24 text-white mx-auto mb-8 opacity-90" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          {t('communityPage.landing.title', { appName })}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-teal-100">
          {t('communityPage.landing.description')}
        </p>
        <div className="mt-12">
          <Link to="/community/hub">
            <Button 
              size="lg" 
              variant="solid" 
              className="bg-secondary hover:bg-secondary-dark text-white px-10 py-4 text-lg"
            >
              {t('communityPage.landing.cta')}
            </Button>
          </Link>
        </div>
         <p className="mt-10 text-sm text-teal-200 opacity-90">
            {t('communityPage.landing.whatsInside')}
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;