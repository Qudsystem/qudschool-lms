// FIX: Removed invalid file content markers that caused parsing errors.
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { APP_NAME_KEY, IconUserCircle } from '../constants';
import { User } from '../types';
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';
import { trackLogin, trackSignup } from '../src/utils/analytics';

const testUsers: User[] = [
  {
    id: 'admin1',
    role: 'System Admin', // This role would be a key in a real app for translation
    email: 'admin@qudschool.com',
    roleKey: 'userRoles.systemAdmin'
  },
  {
    id: 'teacher1',
    role: 'Teacher / Instructor',
    email: 'teacher@qudschool.com',
    roleKey: 'userRoles.teacher'
  },
  {
    id: 'student1',
    role: 'Student',
    email: 'student@qudschool.com',
    roleKey: 'userRoles.student'
  },
];
const testUserCredentials: Record<string, string> = {
    'admin@qudschool.com': 'adminpassword',
    'teacher@qudschool.com': 'teacherpassword',
    'student@qudschool.com': 'studentpassword',
};

const REMEMBER_ME_KEY = 'qudschool_remembered_email';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const { t } = useI18n();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appName = t(APP_NAME_KEY);
  const [showMockAccounts, setShowMockAccounts] = usePersistentState('show-mock-accounts', true);

  // Quick Admin Access state
  const [adminClickCount, setAdminClickCount] = useState(0);
  const adminClickTimer = useRef<number | null>(null);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBER_ME_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleAdminIconClick = () => {
    if (adminClickTimer.current) {
      clearTimeout(adminClickTimer.current);
    }

    const newClickCount = adminClickCount + 1;
    setAdminClickCount(newClickCount);

    if (newClickCount === 6) {
      const adminUser = testUsers.find(user => user.role === 'System Admin');
      if (adminUser) {
        onLogin(adminUser);
      }
    }

    adminClickTimer.current = window.setTimeout(() => {
      setAdminClickCount(0);
    }, 1500); // Reset after 1.5 seconds
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      if (isLogin) {
        const foundUser = testUsers.find(user => user.email === email);
        const expectedPassword = testUserCredentials[email];

        if (foundUser && expectedPassword === password) {
          if (rememberMe) {
            localStorage.setItem(REMEMBER_ME_KEY, email);
          } else {
            localStorage.removeItem(REMEMBER_ME_KEY);
          }
          onLogin(foundUser);
          trackLogin({ method: 'email', role: foundUser.role });
        } else {
          setError(t('auth.error.invalidCredentials'));
        }
      } else {
        if (password !== confirmPassword) {
          setError(t('auth.error.passwordsDoNotMatch'));
          setIsLoading(false);
          return;
        }
        const newUserRoleKey = email.includes('admin') ? 'userRoles.systemAdmin' : (email.includes('teacher') ? 'userRoles.teacher' : 'userRoles.student');
        const newUser: User = { id: `new-${Date.now()}`, email, role: t(newUserRoleKey), roleKey: newUserRoleKey };
        alert(t('auth.signUpSuccess'));
        if (rememberMe) {
          localStorage.setItem(REMEMBER_ME_KEY, email);
        } else {
          localStorage.removeItem(REMEMBER_ME_KEY);
        }
        onLogin(newUser);
        trackSignup({ method: 'email', role: t(newUserRoleKey) });
      }
      setIsLoading(false);
    }, 700);
  };
  
  const inputBaseClasses = "appearance-none relative block w-full px-3 py-3 bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400";

  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light to-primary-dark">
      <Card className="max-w-md w-full space-y-8 p-10 shadow-2xl mb-8">
        <div>
          <IconUserCircle onClick={handleAdminIconClick} className="mx-auto h-16 w-auto text-primary cursor-pointer" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-dark dark:text-neutral-light">
            {isLogin ? t('auth.signInTo', { appName }) : t('auth.createYourAccount', { appName })}
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-DEFAULT dark:text-gray-400">
            {t('auth.or')}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setPassword('');
                setConfirmPassword('');
              }}
              className="font-medium text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary"
            >
              {isLogin ? t('auth.createAnAccount') : t('auth.signInToYourAccount')}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t('auth.emailAddress')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputBaseClasses} rounded-t-md`}
                placeholder={t('auth.emailAddress')}
              />
            </div>
            <div>
              <label htmlFor="password-input" className="sr-only">
                {t('auth.password')}
              </label>
              <input
                id="password-input"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputBaseClasses} ${isLogin ? 'rounded-b-md' : 'rounded-none'}`}
                placeholder={t('auth.password')}
              />
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputBaseClasses} rounded-b-md`}
                  placeholder={t('auth.confirmPassword')}
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center bg-red-100 dark:bg-red-900/30 p-2 rounded-md">{error}</p>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                />
                <label htmlFor="remember-me" className="ltr:ml-2 rtl:mr-2 block text-sm text-neutral-dark dark:text-neutral-light">
                  {t('auth.rememberMe')}
                </label>
              </div>

              <div className="text-sm">
                <Link to="#" className="font-medium text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
            </div>
          )}

          <div>
            <Button type="submit" isLoading={isLoading} className="w-full bg-primary hover:bg-primary-dark focus:ring-primary">
              {isLogin ? t('auth.signIn') : t('auth.createAccount')}
            </Button>
          </div>
        </form>
                   <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                     {t('auth.placeholderForm')}
                   </p>
               </Card>
         
               <div className="max-w-md w-full text-center mb-4">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => setShowMockAccounts(!showMockAccounts)}
                   className="bg-white/20 text-white hover:bg-white/30 dark:bg-gray-800/50 dark:text-neutral-light dark:hover:bg-gray-800/80"
                 >
                   {t('adminDashboard.toggleMockAccounts')}
                 </Button>
               </div>
         
               {showMockAccounts && (
                 <Card className="max-w-md w-full p-6 md:p-8 shadow-xl bg-neutral-light dark:bg-gray-800/80 border border-primary-light dark:border-primary-dark/50">
                   <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-3 text-center">{t('auth.testAccounts.title')}</h3>
                   <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mb-4 text-center">
                     {t('auth.testAccounts.description')}
                   </p>          <div className="space-y-4">
            {testUsers.map((user) => (
              <div key={user.id} className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-primary-dark dark:text-primary-light">{user.roleKey ? t(user.roleKey) : user.role}</h4>
                <p className="text-sm text-neutral-dark dark:text-neutral-light">
                  <strong>{t('auth.testAccounts.email')}</strong> <span className="select-all">{user.email}</span>
                </p>
                <p className="text-sm text-neutral-dark dark:text-neutral-light">
                  <strong>{t('auth.testAccounts.password')}</strong> <span className="select-all">{testUserCredentials[user.email]}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
              {t('auth.testAccounts.note')}
            </p>
        </Card>
      )}
    </div>
  );
};

export default AuthPage;
