import React, { useState } from 'react';
import Button from './Button';
import { IconLockClosed, IconEye, IconEyeOff } from '../constants';
import useI18n from '../hooks/useI18n';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useI18n();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  if (!isOpen) return null;

  // Password strength checker
  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 1) return { strength: 20, label: t('password.weak'), color: 'bg-red-500' };
    if (strength === 2) return { strength: 40, label: t('password.fair'), color: 'bg-orange-500' };
    if (strength === 3) return { strength: 60, label: t('password.good'), color: 'bg-yellow-500' };
    if (strength === 4) return { strength: 80, label: t('password.strong'), color: 'bg-blue-500' };
    return { strength: 100, label: t('password.veryStrong'), color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!currentPassword) {
      newErrors.currentPassword = t('password.validation.currentRequired');
    }

    if (!newPassword) {
      newErrors.newPassword = t('password.validation.newRequired');
    } else if (newPassword.length < 8) {
      newErrors.newPassword = t('password.validation.tooShort');
    } else if (newPassword === currentPassword) {
      newErrors.newPassword = t('password.validation.sameAsOld');
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t('password.validation.confirmRequired');
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = t('password.validation.noMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // *** TODO: Replace with real API call ***
      // const response = await fetch('/api/users/change-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ currentPassword, newPassword })
      // });
      // if (!response.ok) throw new Error('Password change failed');

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success!
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Password change error:', error);
      setErrors({ currentPassword: t('password.error.failed') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const inputBaseClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 sm:mx-0 sm:h-10 sm:w-10">
                  <IconLockClosed className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="ltr:ml-3 rtl:mr-3 text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  {t('password.title')}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                disabled={isLoading}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('password.current')}
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => { setCurrentPassword(e.target.value); setErrors(prev => ({ ...prev, currentPassword: undefined })); }}
                    className={`${inputBaseClasses} ${errors.currentPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showCurrentPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('password.new')}
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => { setNewPassword(e.target.value); setErrors(prev => ({ ...prev, newPassword: undefined })); }}
                    className={`${inputBaseClasses} ${errors.newPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showNewPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
                
                {/* Password Strength Indicator */}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">{t('password.strength')}</span>
                      <span className="text-xs font-medium" style={{ color: passwordStrength.color.replace('bg-', 'text-') }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {t('password.requirements')}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('password.confirm')}
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: undefined })); }}
                    className={`${inputBaseClasses} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute ltr:right-3 rtl:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark disabled:opacity-50"
            >
              {isLoading ? t('password.changing') : t('password.change')}
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="mt-3 sm:mt-0 w-full sm:w-auto"
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
