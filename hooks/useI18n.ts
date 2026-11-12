
import { useContext } from 'react';
import { I18nContext } from '../contexts/I18nContext';
import { I18nContextType } from '../types';

const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default useI18n;
