import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Settings,
  Zap,
  FileText,
  Edit2,
  Trash2
} from 'lucide-react';
import { UserAvatar } from '../constants';
import { User } from '../types';

interface KpiCardProps {
  titleKey: string;
  value: string;
  trend?: string;
  icon: React.ReactElement;
  iconBgColor?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ titleKey, value, trend, icon, iconBgColor = 'bg-primary-light' }) => {
  const { t } = useI18n();
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-DEFAULT dark:text-gray-400">{t(titleKey)}</p>
          <h3 className="text-3xl font-bold mt-2 text-neutral-dark dark:text-neutral-light">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2 text-success-DEFAULT dark:text-success-light">
              <TrendingUp className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
              <span className="text-sm">{trend}</span>
            </div>
          )}
        </div>
        <div className={`${iconBgColor} dark:bg-opacity-20 rounded-lg p-3`}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}
        </div>
      </div>
    </Card>
  );
};

const AdminDashboardPage: React.FC = () => {
  const { t } = useI18n();
  const [showMockAccounts, setShowMockAccounts] = usePersistentState<boolean>('admin-show-mock-accounts', true);

  // Mock data for users
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 'Student',
      roleKey: 'roles.student',
      joinedDate: '2024-01-15',
      status: 'active',
      statusKey: 'adminDashboard.userStatus.active'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      role: 'Instructor',
      roleKey: 'roles.instructor',
      joinedDate: '2024-02-20',
      status: 'active',
      statusKey: 'adminDashboard.userStatus.active'
    },
    {
      id: '3',
      name: 'محمد حسن',
      email: 'mohamed@example.com',
      role: 'Student',
      roleKey: 'roles.student',
      joinedDate: '2024-03-10',
      status: 'active',
      statusKey: 'adminDashboard.userStatus.active'
    },
    {
      id: '4',
      name: 'سارة خالد',
      email: 'sara@example.com',
      role: 'Student',
      roleKey: 'roles.student',
      joinedDate: '2024-03-25',
      status: 'suspended',
      statusKey: 'adminDashboard.userStatus.suspended'
    },
    {
      id: '5',
      name: 'عمر يوسف',
      email: 'omar@example.com',
      role: 'Instructor',
      roleKey: 'roles.instructor',
      joinedDate: '2024-04-05',
      status: 'active',
      statusKey: 'adminDashboard.userStatus.active'
    },
  ];

  const displayedUsers = showMockAccounts ? mockUsers : [];

  const getInitials = (name?: string, email?: string): string => {
    if (name) {
      const names = name.split(' ');
      return names.length >= 2
        ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
        : names[0][0].toUpperCase();
    }
    return email ? email[0].toUpperCase() : 'U';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-dark dark:text-neutral-light">
          {t('adminDashboard.title')}
        </h1>
        <p className="mt-2 text-neutral-DEFAULT dark:text-gray-400">
          {t('adminDashboard.welcomeMessage')}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          titleKey="dashboard.kpi.totalUsers"
          value="1,234"
          trend="+12% this month"
          icon={<Users />}
          iconBgColor="bg-primary-light"
        />
        <KpiCard
          titleKey="dashboard.kpi.activeCourses"
          value="45"
          trend="+3 new"
          icon={<GraduationCap />}
          iconBgColor="bg-success-light"
        />
        <KpiCard
          titleKey="dashboard.kpi.revenue"
          value="$52,340"
          trend="+8.2%"
          icon={<DollarSign />}
          iconBgColor="bg-warning-light"
        />
        <KpiCard
          titleKey="dashboard.kpi.completionRate"
          value="87%"
          trend="+5.1%"
          icon={<CheckCircle2 />}
          iconBgColor="bg-secondary-light"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-primary-light dark:bg-primary-dark rounded-lg p-3 ltr:mr-4 rtl:ml-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
              {t('adminDashboard.userManagement.title')}
            </h3>
          </div>
          <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">
            {t('dashboard.sections.users.description')}
          </p>
          <Link to="/admin/users">
            <Button variant="outline" size="sm" className="w-full">
              {t('dashboard.viewMore')}
            </Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-success-light dark:bg-success-dark rounded-lg p-3 ltr:mr-4 rtl:ml-4">
              <GraduationCap className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
              {t('adminDashboard.contentManagement.title')}
            </h3>
          </div>
          <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">
            {t('dashboard.sections.courses.description')}
          </p>
          <Link to="/admin/courses">
            <Button variant="outline" size="sm" className="w-full">
              {t('dashboard.viewMore')}
            </Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-warning-light dark:bg-warning-dark rounded-lg p-3 ltr:mr-4 rtl:ml-4">
              <Zap className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
              {t('admin.decks.title')}
            </h3>
          </div>
          <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">
            {t('admin.decks.subtitle')}
          </p>
          <Link to="/admin/decks">
            <Button variant="outline" size="sm" className="w-full">
              {t('dashboard.viewMore')}
            </Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-secondary-light dark:bg-secondary-dark rounded-lg p-3 ltr:mr-4 rtl:ml-4">
              <FileText className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
              {t('admin.pages.title')}
            </h3>
          </div>
          <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">
            {t('admin.pages.subtitle')}
          </p>
          <Link to="/admin/pages">
            <Button variant="outline" size="sm" className="w-full">
              {t('dashboard.viewMore')}
            </Button>
          </Link>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-warning-light dark:bg-warning-dark rounded-lg p-3 ltr:mr-4 rtl:ml-4">
              <Settings className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
              {t('adminDashboard.siteSettings.title')}
            </h3>
          </div>
          <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4">
            {t('dashboard.sections.settings.description')}
          </p>
          <Link to="/admin/settings">
            <Button variant="outline" size="sm" className="w-full">
              {t('dashboard.viewMore')}
            </Button>
          </Link>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-light mb-4 md:mb-0">
            {t('adminDashboard.userManagement.title')}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMockAccounts(!showMockAccounts)}
          >
            {t('adminDashboard.toggleMockAccounts')}
          </Button>
        </div>

        {showMockAccounts && displayedUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                    {t('adminDashboard.userTable.header.name')}
                  </th>
                  <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                    {t('adminDashboard.userTable.header.email')}
                  </th>
                  <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                    {t('adminDashboard.userTable.header.role')}
                  </th>
                  <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                    {t('adminDashboard.userTable.header.joined')}
                  </th>
                  <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                    {t('adminDashboard.userTable.header.status')}
                  </th>
                  <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                    {t('adminDashboard.userTable.header.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <UserAvatar
                          initial={getInitials(user.name, user.email)}
                          size="sm"
                          className="ltr:mr-3 rtl:ml-3"
                        />
                        <span className="font-medium text-neutral-dark dark:text-neutral-light">
                          {user.name || user.email.split('@')[0]}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-primary-light dark:bg-primary-dark text-primary dark:text-primary-light rounded-full text-sm font-medium">
                        {user.roleKey ? t(user.roleKey) : user.role}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                      {user.joinedDate}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === 'active'
                            ? 'bg-success-light text-success-dark dark:bg-success-dark dark:text-success-light'
                            : 'bg-error-light text-error-dark dark:bg-error-dark dark:text-error-light'
                        }`}
                      >
                        {user.statusKey ? t(user.statusKey) : user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                          {t('common.edit')}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-error hover:text-error-dark">
                          <Trash2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                          {t('common.delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-neutral-DEFAULT dark:text-gray-400">
              {t('dashboard.noData')}
            </p>
          </div>
        )}
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-light mb-4">
          {t('dashboard.sections.recentActivity.title')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="bg-success-light dark:bg-success-dark rounded-full p-2 ltr:mr-4 rtl:ml-4">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-dark dark:text-neutral-light">
                {t('dashboard.activity.newUser')}
              </p>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('dashboard.activity.timeAgo', { time: '5 minutes' })}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="bg-primary-light dark:bg-primary-dark rounded-full p-2 ltr:mr-4 rtl:ml-4">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-dark dark:text-neutral-light">
                {t('dashboard.activity.coursePublished')}
              </p>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('dashboard.activity.timeAgo', { time: '2 hours' })}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="bg-warning-light dark:bg-warning-dark rounded-full p-2 ltr:mr-4 rtl:ml-4">
              <DollarSign className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-dark dark:text-neutral-light">
                {t('dashboard.activity.newPayment')}
              </p>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('dashboard.activity.timeAgo', { time: '1 day' })}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
