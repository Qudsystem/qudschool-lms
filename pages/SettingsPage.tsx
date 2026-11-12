import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';
import ConfirmationModal from '../components/ConfirmationModal';
import DataExportModal from '../components/DataExportModal'; // *** Data Export Modal ***
import { IconSettings, IconBell, IconShieldCheck, IconCog, IconTrash, IconDownload, IconLanguage } from '../constants';
import { User } from '../types';
import { Theme } from '../contexts/ThemeContext';
import usePersistentState from '../hooks/usePersistentState';
import useI18n from '../hooks/useI18n';
import { useToast } from '../hooks/useToast'; // *** Toast Notifications ***
import { FEATURE_FLAGS, getComingSoonMessage } from '../config/featureFlags'; // *** Feature Flags ***

interface SettingsPageProps {
  currentUser: User;
  currentTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

interface SelectOption {
  value: string;
  labelKey: string;
}

const SelectInput: React.FC<{id: string, labelKey: string, options: SelectOption[], value: string, onChange: (value: string) => void, className?: string}> = 
  ({id, labelKey, options, value, onChange, className=""}) => {
  const { t } = useI18n();
  return (
  <div className={`py-2 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-neutral-dark dark:text-gray-300 mb-1">
      {t(labelKey)}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-neutral-dark border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {t(option.labelKey)}
        </option>
      ))}
    </select>
  </div>
  );
};


const SettingsPage: React.FC<SettingsPageProps> = ({ currentUser, currentTheme, setTheme }) => {
  const { t, language, setLanguage: setI18nLanguage } = useI18n();
  const { showToast, ToastContainer } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDataExportModalOpen, setIsDataExportModalOpen] = useState(false); // *** Data Export Modal State ***
  
  const [courseNotifications, setCourseNotifications] = usePersistentState('settings-courseNotifications', true);
  const [assignmentReminders, setAssignmentReminders] = usePersistentState('settings-assignmentReminders', true);
  const [communityDigest, setCommunityDigest] = usePersistentState('settings-communityDigest', false);
  const [promotionalUpdates, setPromotionalUpdates] = usePersistentState('settings-promotionalUpdates', false);
  
  const [profileVisibility, setProfileVisibility] = usePersistentState('settings-profileVisibility', 'connected');
  const [dataPersonalization, setDataPersonalization] = usePersistentState('settings-dataPersonalization', true);

  const languageOptionsSelect: SelectOption[] = [
    { value: 'en', labelKey: 'settings.general.language.en' },
    { value: 'ar', labelKey: 'settings.general.language.ar' },
  ];

  const profileVisibilityOptions: SelectOption[] = [
    { value: 'public', labelKey: 'settings.privacy.profileVisibility.public' },
    { value: 'connected', labelKey: 'settings.privacy.profileVisibility.connected' },
    { value: 'private', labelKey: 'settings.privacy.profileVisibility.private' },
  ];
  
  // *** تم تفعيل Data Export مع Modal ***
  const handleRequestData = () => {
    if (!FEATURE_FLAGS.dataExport) {
      showToast(getComingSoonMessage(t('settings.privacy.requestData')), 'info');
      return;
    }
    setIsDataExportModalOpen(true);
  };

  const handleDataExportSuccess = () => {
    showToast(t('dataExport.success'), 'success');
  };

  const confirmAccountDeletion = () => {
    setIsDeleteModalOpen(false);
    // In a real app, this would trigger an API call.
    alert(t('settings.deleteAccountAlert'));
  };
  
  const themeName = currentTheme === 'dark' ? t('theme.dark') : t('theme.light');
  const themeDescription = currentTheme === 'dark' ? t('settings.general.theme.darkDesc') : t('settings.general.theme.lightDesc');

  return (
    <>
    {ToastContainer}
    <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmAccountDeletion}
        titleKey="settings.actions.deleteModal.title"
        messageKey="settings.actions.deleteModal.message"
        confirmTextKey="settings.actions.deleteModal.confirm"
        variant="destructive"
    />
    <div className="py-8 md:py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <IconSettings className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-dark dark:text-neutral-light">
            {t('settings.title')}
          </h1>
          <p className="mt-2 text-lg text-neutral-DEFAULT dark:text-gray-400">{t('settings.subtitle')}</p>
        </header>

        <div className="space-y-8">
          <Card className="p-6 shadow-lg">
            <div className="flex items-center mb-5">
                <IconCog className={`w-6 h-6 text-primary ${t('langDir') === 'rtl' ? 'ml-3' : 'mr-3'}`}/>
                <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('settings.general.title')}</h2>
            </div>
            <div className="space-y-3">
              <SelectInput id="language" labelKey="settings.general.language" options={languageOptionsSelect} value={language} onChange={(val) => setI18nLanguage(val as 'en' | 'ar')} />
              <ToggleSwitch 
                id="theme" 
                label={t('settings.general.theme', {themeName: themeName})} 
                checked={currentTheme === 'dark'} 
                onChange={(isChecked) => setTheme(isChecked ? 'dark' : 'light')} 
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 ps-1">{themeDescription}</p>
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <div className="flex items-center mb-5">
                <IconBell className={`w-6 h-6 text-primary ${t('langDir') === 'rtl' ? 'ml-3' : 'mr-3'}`}/>
                <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('settings.notifications.title')}</h2>
            </div>
            <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">{t('settings.notifications.description')}</p>
            <div className="space-y-1 divide-y divide-gray-200 dark:divide-gray-700">
              <ToggleSwitch id="courseNotifications" label={t('settings.notifications.courseAnnouncements')} checked={courseNotifications} onChange={setCourseNotifications} />
              <ToggleSwitch id="assignmentReminders" label={t('settings.notifications.assignmentReminders')} checked={assignmentReminders} onChange={setAssignmentReminders} />
              <ToggleSwitch id="communityDigest" label={t('settings.notifications.communityDigest')} checked={communityDigest} onChange={setCommunityDigest} />
              <ToggleSwitch id="promotionalUpdates" label={t('settings.notifications.promotionalUpdates')} checked={promotionalUpdates} onChange={setPromotionalUpdates} />
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
             <div className="flex items-center mb-5">
                <IconShieldCheck className={`w-6 h-6 text-primary ${t('langDir') === 'rtl' ? 'ml-3' : 'mr-3'}`}/>
                <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('settings.privacy.title')}</h2>
            </div>
            <div className="space-y-3">
              <SelectInput id="profileVisibility" labelKey="settings.privacy.profileVisibility" options={profileVisibilityOptions} value={profileVisibility} onChange={setProfileVisibility} />
              <ToggleSwitch id="dataPersonalization" label={t('settings.privacy.dataPersonalization')} checked={dataPersonalization} onChange={setDataPersonalization} />
              <p className="text-xs text-gray-500 dark:text-gray-400 ps-1">{t('settings.privacy.dataPersonalizationDesc')}</p>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <Button variant="outline" onClick={handleRequestData} leftIcon={<IconDownload className="w-4 h-4"/>} className="w-full md:w-auto">
                    {t('settings.privacy.downloadData')}
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 shadow-lg border-red-500 border">
             <div className="flex items-center mb-5">
                <IconTrash className={`w-6 h-6 text-red-500 ${t('langDir') === 'rtl' ? 'ml-3' : 'mr-3'}`}/>
                <h2 className="text-xl font-semibold text-red-600">{t('settings.actions.title')}</h2>
            </div>
            <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">{t('settings.actions.description')}</p>
            <Button 
                variant="solid" 
                onClick={() => setIsDeleteModalOpen(true)} 
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                leftIcon={<IconTrash className="w-4 h-4"/>}
            >
                {t('settings.actions.deleteAccount')}
            </Button>
            <p className="text-xs text-red-500 mt-2 ps-1">{t('settings.actions.deleteAccountWarning')}</p>
          </Card>

          <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
            <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('settings.footerNote')}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* *** Data Export Modal *** */}
    <DataExportModal
      isOpen={isDataExportModalOpen}
      onClose={() => setIsDataExportModalOpen(false)}
      onSuccess={handleDataExportSuccess}
    />
    </>
  );
};

export default SettingsPage;