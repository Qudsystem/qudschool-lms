import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import Button from '../components/Button';
import { Edit2, FileText } from 'lucide-react';

interface StaticPage {
  id: string;
  title: string;
  titleKey: string;
  slug: string;
  lastModified: string;
  status: 'published' | 'draft';
  statusKey: string;
}

const AdminStaticPagesPage: React.FC = () => {
  const { t } = useI18n();
  const [pages, setPages] = useState<StaticPage[]>([
    {
      id: '1',
      title: 'سياسة الخصوصية',
      titleKey: 'footer.privacyPolicy',
      slug: 'privacy-policy',
      lastModified: '2024-10-10',
      status: 'published',
      statusKey: 'admin.pages.status.published'
    },
    {
      id: '2',
      title: 'شروط الخدمة',
      titleKey: 'footer.termsOfService',
      slug: 'terms-of-service',
      lastModified: '2024-10-08',
      status: 'published',
      statusKey: 'admin.pages.status.published'
    },
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);

  const handleEdit = (page: StaticPage) => {
    setEditingPage(page);
    setShowEditor(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark dark:text-neutral-light">
            {t('admin.pages.title')}
          </h1>
          <p className="mt-2 text-neutral-DEFAULT dark:text-gray-400">
            {t('admin.pages.subtitle')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.pages.stats.totalPages')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {pages.length}
              </p>
            </div>
            <div className="bg-primary-light dark:bg-primary-dark rounded-lg p-3">
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.pages.stats.published')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {pages.filter(p => p.status === 'published').length}
              </p>
            </div>
            <div className="bg-success-light dark:bg-success-dark rounded-lg p-3">
              <FileText className="w-8 h-8 text-success" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.pages.stats.draft')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {pages.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <div className="bg-warning-light dark:bg-warning-dark rounded-lg p-3">
              <FileText className="w-8 h-8 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pages Table */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-light mb-6">
          {t('admin.pages.allPages')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.pages.table.page')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.pages.table.slug')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.pages.table.lastModified')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.pages.table.status')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.pages.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="bg-primary-light dark:bg-primary-dark rounded-lg p-2 ltr:mr-3 rtl:ml-3">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-neutral-dark dark:text-neutral-light">
                        {page.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                    /{page.slug}
                  </td>
                  <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                    {page.lastModified}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        page.status === 'published'
                          ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light'
                          : 'bg-warning-light text-warning-dark dark:bg-warning-dark dark:text-warning-light'
                      }`}
                    >
                      {t(page.statusKey)}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(page)}
                    >
                      <Edit2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                      {t('common.edit')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Editor Modal */}
      {showEditor && editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mb-4">
                {t('admin.pages.editing')} - {editingPage.title}
              </h2>
              <p className="text-neutral-DEFAULT dark:text-gray-400 mb-6">
                {t('admin.pages.editor.description')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <p className="text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.pages.editor.mockNote')}
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditor(false);
                    setEditingPage(null);
                  }}
                >
                  {t('modal.cancel')}
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    setShowEditor(false);
                    setEditingPage(null);
                    alert(t('admin.pages.editor.success'));
                  }}
                >
                  {t('admin.pages.editor.save')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminStaticPagesPage;
