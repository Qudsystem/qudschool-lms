import React from 'react';
import KpiCardActions from '../components/KpiCardActions';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import RecommendedCourses from '../components/RecommendedCourses';
import { FEATURE_FLAGS, getComingSoonMessage } from '../config/featureFlags'; // *** Feature Flags ***
import {
  IconAcademicCap,
  IconDotsVertical,
  IconSparkles,
  IconCurrencyDollar,
  IconTrendingUp,
  IconUsers,
  IconCheckCircleSolid,
  IconBriefcase,
  IconChatBubbleLeftRight,
  UserAvatar,
  IconBolt
} from '../constants';
import { User, KpiCardItem, ActiveUserItem, SessionLog, StudentCourseProgress, UserStudyStats } from '../types'; 
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';

const enrolledCourses: StudentCourseProgress[] = [
    {
        id: '2',
        title: '',
        titleKey: 'courses.default.react.title',
        progress: 75,
        imageUrl: 'https://picsum.photos/seed/course2/600/400',
        instructor: '',
        instructorKey: 'courses.default.react.instructor',
        nextLesson: '',
        nextLessonKey: 'myLearning.nextLesson.react'
    },
    {
        id: '3',
        title: '',
        titleKey: 'courses.default.ai.title',
        progress: 30,
        imageUrl: 'https://picsum.photos/seed/course3/600/400',
        instructor: '',
        instructorKey: 'courses.default.ai.instructor',
        nextLesson: '',
        nextLessonKey: 'myLearning.nextLesson.ai'
    },
];

interface DashboardPageProps {
  currentUser: User; 
  sessionLogs: SessionLog[]; 
}

const DashboardHeader: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useI18n();
  const userName = user.email.split('@')[0] || "Learner";
  const isArabicName = /[ء-ي]/.test(userName); 
  const translatedRole = user.roleKey ? t(user.roleKey) : user.role;

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-neutral-light">
        {t('dashboard.welcomeBack', { userName: isArabicName ? userName : userName.charAt(0).toUpperCase() + userName.slice(1) })}
      </h1>
      <p className="mt-1 text-sm text-neutral-DEFAULT dark:text-gray-400">
        {t('dashboard.role', {role: translatedRole})} {t('dashboard.learningOverview')}
      </p>
    </div>
  );
};

const CongratulationsCard: React.FC<{ userName: string }> = ({ userName }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const isArabicName = /[ء-ي]/.test(userName);
  const displayedUserName = isArabicName ? userName : userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
  <Card className="p-6 bg-gradient-to-r from-primary to-teal-500 text-white shadow-lg col-span-1 md:col-span-2 xl:col-span-2">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{t('dashboard.congratulations', {userName: displayedUserName})}</h2>
        <p className="mt-1 text-teal-100">{t('dashboard.monthlyGoal')}</p>
        <p className="text-3xl font-bold mt-3">$28.4k <span className="text-sm font-normal text-teal-200">{t('dashboard.targetAchieved')}</span></p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4 !border-white/80 !bg-white !text-blue-950 shadow-sm hover:!bg-slate-100 hover:!text-blue-950 focus-visible:!ring-white dark:!border-blue-200/70 dark:!bg-slate-950/85 dark:!text-blue-100 dark:hover:!bg-slate-900 dark:hover:!text-white dark:focus-visible:!ring-blue-200"
          onClick={() => navigate('/my-learning')}
        >
          {t('dashboard.viewProgress')}
        </Button>
      </div>
      <div className="mt-6 md:mt-0">
        <IconSparkles className="w-24 h-24 text-teal-300 opacity-70" />
      </div>
    </div>
  </Card>
  );
};

const KpiCard: React.FC<KpiCardItem & { onHide?: (id: string) => void }> = ({ id, titleKey, value, trend, icon, iconBgColor = 'bg-primary-light', onHide }) => {
  const { t } = useI18n();
  const darkIconBgColor = iconBgColor.replace('100', '800').replace('light', 'dark/30'); 
  return (
  <Card className="p-5 shadow-lg">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2 rounded-full ${iconBgColor} dark:${darkIconBgColor}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-primary dark:text-primary-light"})}
      </div>
      {FEATURE_FLAGS.moreCardActions && (
        <KpiCardActions
          titleText={t(titleKey)}
          valueText={String(value)}
          onHide={() => onHide?.(id)}
        />
      )}
    </div>
    <h3 className="text-sm font-medium text-neutral-DEFAULT dark:text-gray-400 uppercase tracking-wider">{t(titleKey)}</h3>
    <p className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mt-1">{value}</p>
    {trend && (
      <div className={`text-xs mt-1 flex items-center ${trend.includes('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
        <IconTrendingUp className={`w-4 h-4 ${t('langDir') === 'rtl' ? 'ml-1' : 'mr-1'} ${trend.includes('+') ? '' : 'transform rotate-180'}`} />
        {trend}
      </div>
    )}
  </Card>
  );
};

interface LearningCategory {
  nameKey: string;
  value: number;
  color: string; 
  darkColor: string; 
  percentage: number;
  offset: number;
}

const LearningOverviewCard: React.FC = () => {
  const { t } = useI18n();
  const rawData = [
    { nameKey: "dashboard.learningCategory.webDevelopment", value: 900, color: 'primary', darkColor: 'primary-light' },
    { nameKey: "dashboard.learningCategory.aiMl", value: 600, color: 'secondary', darkColor: 'secondary-light' },
    { nameKey: "dashboard.learningCategory.design", value: 300, color: 'sky-500', darkColor: 'sky-400' },
    { nameKey: "dashboard.learningCategory.dataScience", value: 200, color: 'lime-500', darkColor: 'lime-400' }
  ];

  const totalValue = rawData.reduce((sum, item) => sum + item.value, 0);
  
  let cumulativePercentage = 0;
  const learningCategories: LearningCategory[] = rawData.map(item => {
    const percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0;
    const offset = -cumulativePercentage;
    cumulativePercentage += percentage;
    return { ...item, percentage, offset };
  });

  const overallCompletionPercentage = 72;

  return (
    <Card className="p-6 shadow-lg col-span-1 md:col-span-2 xl:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">{t('dashboard.learningOverview')}</h3>
        {/* *** تم تطبيق Feature Flag: detailedReports *** */}
        {FEATURE_FLAGS.detailedReports && (
          <Button variant="ghost" size="sm" onClick={() => alert("View Report clicked! (Placeholder action)")}>{t('dashboard.viewReport')}</Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle className="text-gray-200 dark:text-gray-600"
              strokeWidth="3.8"
              stroke="currentColor" fill="transparent"
              r="15.9155" cx="18" cy="18"
            />
            {learningCategories.map((category) => (
              <circle key={category.nameKey} className={`text-${category.color} dark:text-${category.darkColor}`}
                strokeWidth="3.8"
                strokeDasharray={`${category.percentage.toFixed(2)}, 100`}
                strokeDashoffset={category.offset.toFixed(2)}
                strokeLinecap="butt"
                stroke="currentColor" fill="transparent"
                r="15.9155" cx="18" cy="18"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-neutral-dark dark:text-neutral-light">{overallCompletionPercentage}%</span>
            <span className="text-xs text-neutral-DEFAULT dark:text-gray-400">{t('dashboard.learningCategory.completed')}</span>
          </div>
        </div>
        <div className="space-y-3 mt-4 md:mt-0">
          {learningCategories.map((category) => (
            <div key={category.nameKey} className="flex items-center justify-between text-sm">
              <span className="flex items-center text-neutral-dark dark:text-neutral-light">
                <span className={`w-3 h-3 rounded-full bg-${category.color} dark:bg-${category.darkColor} ${t('langDir') === 'rtl' ? 'ml-2' : 'mr-2'}`}></span>
                {t(category.nameKey)}
              </span>
              <span className="font-semibold text-neutral-dark dark:text-neutral-light">
                {category.value} <span className="text-xs text-gray-500 dark:text-gray-400">({category.percentage.toFixed(0)}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

const ActivityTimelineCard: React.FC = () => {
  const { t } = useI18n();
  const activities = [
    { id: 1, textKey: "dashboard.activity.completedUnit", time: "منذ ساعتين", icon: <IconCheckCircleSolid className="w-5 h-5 text-green-500 dark:text-green-400" /> },
    { id: 2, textKey: "dashboard.activity.enrolled", time: "بالأمس", icon: <IconAcademicCap className="w-5 h-5 text-primary dark:text-primary-light" /> },
    { id: 3, textKey: "dashboard.activity.askedQuestion", time: "منذ 3 أيام", icon: <IconChatBubbleLeftRight className="w-5 h-5 text-secondary dark:text-secondary-light" /> },
    { id: 4, textKey: "dashboard.activity.earnedBadge", time: "منذ 3 أيام", icon: <IconSparkles className="w-5 h-5 text-yellow-500 dark:text-yellow-400" /> },
  ];
  return (
  <Card className="p-6 shadow-lg col-span-1 md:col-span-2 xl:col-span-2">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">{t('dashboard.activityTimeline')}</h3>
      {/* *** تم تطبيق Feature Flag: timelineActions *** */}
      {FEATURE_FLAGS.timelineActions && (
        <button 
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          onClick={() => alert("Timeline actions coming soon!")}
          aria-label="Timeline actions"
        >
          <IconDotsVertical className="w-5 h-5" />
        </button>
      )}
    </div>
    <ul className="space-y-4">
      {activities.map(activity => (
        <li key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0 mt-1">{activity.icon}</div>
          <div>
            <p className="text-sm text-neutral-dark dark:text-neutral-light">{t(activity.textKey)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
          </div>
        </li>
      ))}
    </ul>
     {/* *** تم تطبيق Feature Flag: viewAllActivity *** */}
     {FEATURE_FLAGS.viewAllActivity && (
       <Button variant="link" size="sm" className="mt-4" onClick={() => alert("View All Activity clicked! (Placeholder)")}>{t('dashboard.activity.viewAll')}</Button>
     )}
  </Card>
  );
};

const ActiveUsersCard: React.FC = () => {
  const { t } = useI18n();
  const activeUsers: ActiveUserItem[] = [
    { id: '1', name: 'فاطمة حسن', email: 'fatima.h@example.com', roleKey: 'userRoles.student', avatarInitial: 'ف', avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80', statusKey: 'online', lastSeenKey: 'dashboard.activeUsers.lastSeen.now' },
    { id: '2', name: 'أحمد علي', email: 'ahmed.a@example.com', roleKey: 'userRoles.teacher', avatarInitial: 'أ', avatarUrl: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=120&q=80', statusKey: 'online', lastSeenKey: 'dashboard.activeUsers.lastSeen.minutesAgo' },
    { id: '3', name: 'ليلى إبراهيم', email: 'layla.i@example.com', roleKey: 'userRoles.student', avatarInitial: 'ل', avatarUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=120&q=80', statusKey: 'idle', lastSeenKey: 'dashboard.activeUsers.lastSeen.minutesAgo' },
    { id: 'admin1', name: 'عمر سعيد', email: 'omar.s@example.com', roleKey: 'userRoles.systemAdmin', avatarInitial: 'ع', avatarUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=120&q=80', statusKey: 'online', lastSeenKey: 'dashboard.activeUsers.lastSeen.now' },
  ];

  return (
    <Card className="p-6 shadow-lg col-span-1 md:col-span-2 xl:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">{t('dashboard.activeUsers')}</h3>
        <span className="text-sm text-primary dark:text-primary-light font-semibold">{t('dashboard.activeUsers.onlineCount', {count: activeUsers.filter(u => u.statusKey === 'online').length})}</span>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2">
        {activeUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <UserAvatar initial={user.avatarInitial} imageUrl={user.avatarUrl} size="sm" />
              <div>
                <p className="text-sm font-medium text-neutral-dark dark:text-neutral-light">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t(user.roleKey)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className={`text-xs px-2 py-0.5 rounded-full ${user.statusKey === 'online' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300'}`}>
                {t(`dashboard.activeUsers.status.${user.statusKey}`)}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                {user.lastSeenKey.includes('minutesAgo') ? t(user.lastSeenKey, {minutes: user.id === '2' ? 2 : 15}) : t(user.lastSeenKey)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const MyProgressCard: React.FC = () => {
    const { t } = useI18n();
    return (
        <Card className="p-6 shadow-lg col-span-1 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{t('dashboard.myProgress.title')}</h2>
                <Link to="/my-learning">
                    <Button variant="link" size="sm">{t('dashboard.myProgress.viewAll')}</Button>
                </Link>
            </div>
            <div className="space-y-4">
                {enrolledCourses.map(course => (
                    <div key={course.id}>
                        <p className="text-sm font-medium text-neutral-dark dark:text-neutral-light truncate">{t(course.titleKey)}</p>
                        <div className="flex items-center mt-1">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 flex-1">
                                <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-neutral-DEFAULT dark:text-gray-400 font-semibold ltr:ml-3 rtl:mr-3">{course.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};


const DashboardPage: React.FC<DashboardPageProps> = ({ currentUser, sessionLogs }) => {
  const { t } = useI18n();
  const userName = currentUser.email.split('@')[0] || "Learner";
  const userForHeader = {...currentUser, roleKey: currentUser.role === 'System Admin' ? 'userRoles.systemAdmin' : currentUser.role === 'Teacher / Instructor' ? 'userRoles.teacher' : 'userRoles.student'};
  
  const [studyStats] = usePersistentState<UserStudyStats>('user-study-stats', { points: 0, streak: 0, lastStudied: null, correctAnswers: 0, gameRounds: 0 });
  const [hiddenKpiIds, setHiddenKpiIds] = usePersistentState<string[]>(
    `dashboard-hidden-kpis-${currentUser.id || currentUser.email}`,
    []
  );

  const handleHideKpi = (id: string) => {
    setHiddenKpiIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const handleRestoreKpis = () => {
    setHiddenKpiIds([]);
  };


  const kpiCardsData: KpiCardItem[] = [
    { id: 'students', titleKey: 'dashboard.kpi.totalStudents', value: '2,000', trend: `+50 ${t('dashboard.kpi.thisMonth')}`, icon: <IconUsers />, iconBgColor: 'bg-blue-100 dark:bg-blue-900/50' },
    { id: 'courses', titleKey: 'dashboard.kpi.activeCourses', value: '78', trend: '+5', icon: <IconBriefcase />, iconBgColor: 'bg-green-100 dark:bg-green-900/50' },
    { id: 'streak', titleKey: 'dashboard.kpi.studyStreak', value: `${studyStats.streak} ${t('flashcards.stats.days')}`, icon: <IconBolt />, iconBgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
    { id: 'revenue', titleKey: 'dashboard.kpi.monthlyRevenue', value: '$12,300', trend: '+8.2%', icon: <IconCurrencyDollar />, iconBgColor: 'bg-purple-100 dark:bg-purple-900/50' },
  ];


  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-neutral-900 min-h-[calc(100vh-128px)]"> 
      <DashboardHeader user={userForHeader} />

      {hiddenKpiIds.length > 0 && (
        <div className="mb-3">
          <Button variant="ghost" size="sm" onClick={handleRestoreKpis}>
            {t('dashboard.kpi.actions.restore')} ({hiddenKpiIds.length})
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <CongratulationsCard userName={userName} />
        {kpiCardsData
          .filter(item => !hiddenKpiIds.includes(item.id))
          .map(item => (
            <KpiCard key={item.id} {...item} onHide={handleHideKpi} />
          ))}
        
        <RecommendedCourses />
        
        <MyProgressCard />
        <ActiveUsersCard />
        
        <LearningOverviewCard />
        <ActivityTimelineCard />
        
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
          {t('dashboard.footerNote')}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
