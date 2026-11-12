import React from 'react';
import Card from './Card';
import Button from './Button';
import useI18n from '../hooks/useI18n';
import { IconBookOpen, IconBolt } from '../constants';

interface StudyModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'classic' | 'rapid') => void;
  deckTitle: string;
}

const StudyModeModal: React.FC<StudyModeModalProps> = ({ isOpen, onClose, onSelectMode, deckTitle }) => {
  const { t } = useI18n();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-75 z-[9998] transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <Card className="w-full max-w-2xl p-6 shadow-2xl animate-fade-in-up">
            <h3 id="modal-title" className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-2 text-center">
                {t('study.modeSelect.title')}
            </h3>
            <p className="text-center text-neutral-DEFAULT dark:text-gray-400 mb-6">{deckTitle}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Classic Mode */}
                <div onClick={() => onSelectMode('classic')} className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center cursor-pointer hover:border-primary hover:bg-primary-light/10 dark:hover:border-primary-light dark:hover:bg-primary-dark/20 transition-all duration-200">
                    <IconBookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-neutral-dark dark:text-neutral-light">{t('study.modeSelect.classic.title')}</h4>
                    <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mt-1">{t('study.modeSelect.classic.desc')}</p>
                </div>

                {/* Rapid Review Mode */}
                <div onClick={() => onSelectMode('rapid')} className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center cursor-pointer hover:border-secondary hover:bg-secondary-light/10 dark:hover:border-secondary-light dark:hover:bg-secondary-dark/20 transition-all duration-200">
                    <IconBolt className="w-12 h-12 text-secondary mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-neutral-dark dark:text-neutral-light">{t('study.modeSelect.rapid.title')}</h4>
                    <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mt-1">{t('study.modeSelect.rapid.desc')}</p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Button onClick={onClose} variant="ghost">
                    {t('modal.cancel')}
                </Button>
            </div>
        </Card>
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `}</style>
      </div>
    </>
  );
};

export default StudyModeModal;