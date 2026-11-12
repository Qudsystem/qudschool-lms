import React from 'react';
import { IconBell, IconBookOpen, IconClipboardDocumentList, IconSettings as IconSystem, IconChatBubbleLeftRight as IconAnnouncement } from '../constants'; // Renamed IconSettings to avoid conflict
import useI18n from '../hooks/useI18n';
import { NotificationItem } from '../types'; // Import the type

const NotificationsPage: React.FC = () => {
  const { t } = useI18n();

  const allNotifications: NotificationItem[] = [
    { id: '1', titleKey: 'notification.newCourse.title', descriptionKey: 'notification.newCourse.desc', timeAgo: '2h ago', read: false, type: 'new_course', icon: <IconBookOpen /> },
    { id: '2', titleKey: 'notification.assignmentDue.title', descriptionKey: 'notification.assignmentDue.desc', timeAgo: '1d ago', read: false, type: 'assignment', icon: <IconClipboardDocumentList /> },
    { id: '3', titleKey: 'notification.systemMaintenance.title', descriptionKey: 'notification.systemMaintenance.desc', timeAgo: '3d ago', read: true, type: 'system', icon: <IconSystem /> },
    { id: '4', titleKey: 'notification.adminMessage.title', descriptionKey: 'notification.adminMessage.desc', timeAgo: '5d ago', read: true, type: 'announcement', icon: <IconAnnouncement />},
    // Example for reminder - make sure keys exist in locale files
    { id: '5', titleKey: 'notification.progressSummary.title', descriptionKey: 'notification.progressSummary.desc', timeAgo: '6d ago', read: true, type: 'reminder', icon: <IconBell /> },
    { id: '6', titleKey: 'notification.newBadge.title', descriptionKey: 'notification.newBadge.desc', timeAgo: '1w ago', read: true, type: 'system', icon: <IconSystem /> },
  ];
  // Add to en.json: "notification.progressSummary.title": "Weekly Progress Summary", "notification.progressSummary.desc": "You've completed 5 lessons this week. Keep it up!", "notification.newBadge.title": "New Badge Unlocked", "notification.newBadge.desc": "Congratulations! You've earned the 'Problem Solver' badge."
  // Add to ar.json: (similar translations)

  const getIconForType = (type: NotificationItem['type'], icon?: React.ReactElement<{ className?: string }>) => {
    if (icon) return React.cloneElement(icon, { className: "h-5 w-5" });
    switch (type) {
        case 'new_course': return <IconBookOpen className="h-5 w-5" />;
        case 'assignment': return <IconClipboardDocumentList className="h-5 w-5" />;
        case 'system': return <IconSystem className="h-5 w-5" />;
        case 'announcement': return <IconAnnouncement className="h-5 w-5" />;
        default: return <IconBell className="h-5 w-5" />;
    }
  };


  return (
    <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
            <IconBell className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
            {t('notificationsPage.title')}
            </h1>
            <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                {t('notificationsPage.subtitle')}
            </p>
        </div>

        {allNotifications.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {allNotifications.map((notification) => (
                <li key={notification.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-primary-light/10 dark:bg-primary-dark/20' : ''}`}>
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        notification.type === 'new_course' ? 'bg-blue-500 text-white' : 
                        notification.type === 'assignment' ? 'bg-orange-500 text-white' :
                        notification.type === 'system' ? 'bg-gray-400 text-white' : 
                        'bg-primary text-white'}`}>
                        {getIconForType(notification.type, notification.icon)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${!notification.read ? 'text-primary-dark dark:text-primary-light' : 'text-neutral-dark dark:text-neutral-light'}`}>
                        {t(notification.titleKey)}
                      </p>
                      <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 truncate">{t(notification.descriptionKey)}</p>
                    </div>
                    <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <time>{notification.timeAgo}</time> {/* Time might need localization in a real app */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-10">
            <IconBell className="h-12 w-12 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-neutral-DEFAULT dark:text-gray-400">{t('notificationsPage.noNotifications')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;