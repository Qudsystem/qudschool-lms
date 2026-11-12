import { useState, useCallback } from 'react';
import Toast, { ToastType } from '../components/Toast';

interface ToastConfig {
  message: string;
  type: ToastType;
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
    setToast({ message, type, duration });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const ToastContainer = toast ? (
    <Toast
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      onClose={hideToast}
    />
  ) : null;

  return {
    showToast,
    hideToast,
    ToastContainer,
  };
};
