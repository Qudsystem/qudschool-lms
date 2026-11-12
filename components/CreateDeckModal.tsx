import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import useI18n from '../hooks/useI18n';
import { SELECTABLE_DECK_ICONS } from '../constants';

interface CreateDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (deckData: { title: string; description: string; icon: React.ReactElement }) => void;
}

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({ isOpen, onClose, onCreate }) => {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIconName, setSelectedIconName] = useState(SELECTABLE_DECK_ICONS[0].name);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setTitle('');
      setDescription('');
      setSelectedIconName(SELECTABLE_DECK_ICONS[0].name);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError(t('createDeckModal.error.titleRequired'));
      return;
    }
    const selectedIcon = SELECTABLE_DECK_ICONS.find(icon => icon.name === selectedIconName);
    if (!selectedIcon) return; // Should not happen

    const IconComponent = selectedIcon.Component;
    onCreate({
      title,
      description,
      icon: <IconComponent />,
    });
  };

  if (!isOpen) {
    return null;
  }
  
  const inputBaseClasses = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400";

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
        <Card className="w-full max-w-lg p-6 shadow-2xl animate-fade-in-up">
            <h3 id="modal-title" className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-4">
                {t('createDeckModal.title')}
            </h3>
            <div className="space-y-4 text-left rtl:text-right">
                <div>
                    <label htmlFor="deck-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('createDeckModal.deckTitleLabel')}</label>
                    <input type="text" id="deck-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('createDeckModal.deckTitlePlaceholder')} className={inputBaseClasses} />
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <div>
                    <label htmlFor="deck-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('createDeckModal.deckDescriptionLabel')}</label>
                    <textarea id="deck-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('createDeckModal.deckDescriptionPlaceholder')} rows={3} className={inputBaseClasses}></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('createDeckModal.selectIconLabel')}</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {SELECTABLE_DECK_ICONS.map(({ name, Component }) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => setSelectedIconName(name)}
                                className={`p-3 rounded-lg border-2 transition-colors ${selectedIconName === name ? 'border-primary bg-primary-light/20' : 'border-gray-300 dark:border-gray-600 hover:border-primary-light'}`}
                                aria-label={`Select ${name} icon`}
                            >
                                <Component className="w-6 h-6 text-neutral-dark dark:text-neutral-light" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                <Button onClick={handleSubmit} className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark">{t('createDeckModal.createButton')}</Button>
                <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">{t('createDeckModal.cancelButton')}</Button>
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

export default CreateDeckModal;