import React, { Fragment } from 'react';
import Card from './Card';
import Button from './Button';
import { IconTrash, IconSparkles } from '../constants'; 
import useI18n from '../hooks/useI18n';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titleKey: string;
  messageKey: string;
  confirmTextKey?: string;
  cancelTextKey?: string;
  variant?: 'default' | 'destructive';
  icon?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  titleKey,
  messageKey,
  confirmTextKey = 'modal.confirm',
  cancelTextKey = 'modal.cancel',
  variant = 'default',
  icon
}) => {
  const { t } = useI18n();

  if (!isOpen) {
    return null;
  }

  const confirmButtonClasses = variant === 'destructive'
    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    : 'bg-primary hover:bg-primary-dark focus:ring-primary';
  
  const defaultIcon = variant === 'destructive' 
    ? <IconTrash className="h-10 w-10 text-red-500" /> 
    : <IconSparkles className="h-10 w-10 text-primary" />;

  return (
    <Fragment>
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
        <Card className="w-full max-w-md p-6 text-center shadow-2xl animate-fade-in-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                {icon || defaultIcon}
            </div>
            <h3 id="modal-title" className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">
                {t(titleKey)}
            </h3>
            <div className="mt-2">
                <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                    {t(messageKey)}
                </p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                <Button 
                    onClick={onConfirm}
                    className={`w-full sm:w-auto ${confirmButtonClasses}`}
                >
                    {t(confirmTextKey)}
                </Button>
                <Button 
                    onClick={onClose}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    {t(cancelTextKey)}
                </Button>
            </div>
        </Card>
        <style>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </Fragment>
  );
};

export default ConfirmationModal;
