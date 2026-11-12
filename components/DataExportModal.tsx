import React, { useState } from 'react';
import Button from './Button';
import { IconDownload, IconCheckCircleSolid } from '../constants';
import useI18n from '../hooks/useI18n';
import { trackDownload } from '../src/utils/analytics';

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ExportFormat = 'json' | 'csv';
type ExportStatus = 'idle' | 'requesting' | 'processing' | 'ready' | 'error';

const DataExportModal: React.FC<DataExportModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useI18n();
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [includeActivity, setIncludeActivity] = useState(true);
  const [includeCourses, setIncludeCourses] = useState(true);
  const [includeProgress, setIncludeProgress] = useState(true);
  const [exportStatus, setExportStatus] = useState<ExportStatus>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [estimatedSize, setEstimatedSize] = useState('2.5 MB');

  if (!isOpen) return null;

  const handleExport = async () => {
    setExportStatus('requesting');

    try {
      // *** TODO: Replace with real API call ***
      // const response = await fetch('/api/users/export-data', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     format: exportFormat,
      //     includeActivity,
      //     includeCourses,
      //     includeProgress
      //   })
      // });
      // const data = await response.json();
      // setDownloadUrl(data.downloadUrl);

      // Mock processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExportStatus('processing');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock download URL
      const mockUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(
        JSON.stringify({
          user: { name: 'User', email: 'user@example.com' },
          exportDate: new Date().toISOString(),
          format: exportFormat,
          data: { message: 'Mock data export' }
        }, null, 2)
      )}`;
      
      setDownloadUrl(mockUrl);
      setExportStatus('ready');
      
      // Success notification
      onSuccess();
      
    } catch (error) {
      console.error('Data export error:', error);
      setExportStatus('error');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const fileName = `qudschool-data-export-${Date.now()}.${exportFormat}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      trackDownload({ fileName, fileType: exportFormat, context: 'data-export' });
      
      // Close modal after download
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  };

  const handleClose = () => {
    setExportFormat('json');
    setIncludeActivity(true);
    setIncludeCourses(true);
    setIncludeProgress(true);
    setExportStatus('idle');
    setDownloadUrl(null);
    onClose();
  };

  const isProcessing = exportStatus === 'requesting' || exportStatus === 'processing';
  const canExport = exportStatus === 'idle' || exportStatus === 'error';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={!isProcessing ? handleClose : undefined}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 sm:mx-0 sm:h-10 sm:w-10">
                  <IconDownload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="ltr:ml-3 rtl:mr-3 text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  {t('dataExport.title')}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                disabled={isProcessing}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {exportStatus === 'ready' ? (
              // Download Ready State
              <div className="text-center py-6">
                <IconCheckCircleSolid className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('dataExport.ready.title')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('dataExport.ready.message')}
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('dataExport.fileName')}: qudschool-data-export.{exportFormat}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {estimatedSize}
                    </span>
                  </div>
                </div>
              </div>
            ) : exportStatus === 'processing' ? (
              // Processing State
              <div className="text-center py-6">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('dataExport.processing.title')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('dataExport.processing.message')}
                </p>
              </div>
            ) : exportStatus === 'requesting' ? (
              // Requesting State
              <div className="text-center py-6">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t('dataExport.requesting.title')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('dataExport.requesting.message')}
                </p>
              </div>
            ) : (
              // Configuration State
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('dataExport.description')}
                </p>

                {/* Format Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dataExport.format.label')}
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setExportFormat('json')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        exportFormat === 'json'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-semibold">JSON</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t('dataExport.format.jsonDesc')}
                      </div>
                    </button>
                    <button
                      onClick={() => setExportFormat('csv')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        exportFormat === 'csv'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-semibold">CSV</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t('dataExport.format.csvDesc')}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Data Inclusion Options */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dataExport.include.label')}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={includeActivity}
                        onChange={(e) => setIncludeActivity(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="ltr:ml-2 rtl:mr-2 text-sm text-gray-700 dark:text-gray-300">
                        {t('dataExport.include.activity')}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={includeCourses}
                        onChange={(e) => setIncludeCourses(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="ltr:ml-2 rtl:mr-2 text-sm text-gray-700 dark:text-gray-300">
                        {t('dataExport.include.courses')}
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={includeProgress}
                        onChange={(e) => setIncludeProgress(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="ltr:ml-2 rtl:mr-2 text-sm text-gray-700 dark:text-gray-300">
                        {t('dataExport.include.progress')}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 ltr:mr-2 rtl:ml-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      {t('dataExport.info')}
                    </p>
                  </div>
                </div>

                {exportStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {t('dataExport.error')}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
            {exportStatus === 'ready' ? (
              <>
                <Button
                  onClick={handleDownload}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                >
                  {t('dataExport.download')}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="mt-3 sm:mt-0 w-full sm:w-auto"
                >
                  {t('common.close')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleExport}
                  disabled={!canExport}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-dark disabled:opacity-50"
                >
                  {exportStatus === 'requesting' || exportStatus === 'processing'
                    ? t('dataExport.processing.title')
                    : t('dataExport.request')}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="mt-3 sm:mt-0 w-full sm:w-auto"
                >
                  {t('common.cancel')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportModal;
