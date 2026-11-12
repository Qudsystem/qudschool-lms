import React from 'react';
import { Languages } from 'lucide-react';
import useI18n from '../hooks/useI18n';
import Dropdown from './Dropdown';
import { DropdownItem } from '../types';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  const options: { value: 'ar' | 'en'; label: string }[] = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
  ];

  const items: DropdownItem[] = options.map(opt => ({
    element: (
      <div className={`flex items-center gap-2 ${language === opt.value ? 'font-semibold text-primary dark:text-primary-light' : ''}`}>
        <span>{opt.label}</span>
        {language === opt.value && <span className="ltr:ml-auto rtl:mr-auto text-primary dark:text-primary-light">●</span>}
      </div>
    ),
    onClick: () => setLanguage(opt.value),
  }));

  return (
    <Dropdown
      trigger={
        <button
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/50 transition-all duration-300"
          aria-label={t('navbar.language')}
          title={t('navbar.language')}
        >
          <Languages className="h-5 w-5" />
        </button>
      }
      items={items}
      menuWidthClass="w-36"
      menuAlign="right"
    />
  );
};

export default LanguageToggle;
