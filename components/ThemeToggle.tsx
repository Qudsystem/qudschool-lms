import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../contexts/ThemeContext';
import useI18n from '../hooks/useI18n';
import Dropdown from './Dropdown';
import { DropdownItem } from '../types';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  const iconFor = (value: Theme) => {
    if (value === 'light') return <Sun className="h-5 w-5" />;
    if (value === 'dark') return <Moon className="h-5 w-5" />;
    return <Monitor className="h-5 w-5" />;
  };

  const options: { value: Theme; labelKey: string }[] = [
    { value: 'light', labelKey: 'navbar.themeLight' },
    { value: 'dark', labelKey: 'navbar.themeDark' },
    { value: 'system', labelKey: 'navbar.themeSystem' },
  ];

  const items: DropdownItem[] = options.map(opt => ({
    element: (
      <div className={`flex items-center gap-2 ${theme === opt.value ? 'font-semibold text-primary dark:text-primary-light' : ''}`}>
        {iconFor(opt.value)}
        <span>{t(opt.labelKey)}</span>
        {theme === opt.value && <span className="ltr:ml-auto rtl:mr-auto text-primary dark:text-primary-light">●</span>}
      </div>
    ),
    onClick: () => setTheme(opt.value),
  }));

  return (
    <Dropdown
      trigger={
        <button
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/50 transition-all duration-300"
          aria-label={t('navbar.theme')}
          title={t('navbar.theme')}
        >
          {iconFor(theme)}
        </button>
      }
      items={items}
      menuWidthClass="w-40"
      menuAlign="right"
    />
  );
};

export default ThemeToggle;
