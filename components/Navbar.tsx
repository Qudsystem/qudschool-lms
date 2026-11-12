import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
    NAV_LINKS_GUEST, 
    NAV_LINKS_AUTHENTICATED,
    IconAcademicCap, 
    IconSearch, 
    IconBell, 
    IconUserCircle, 
    IconSettings, 
    IconLogout, 
    IconChevronDown,
    UserAvatar,
    IconChatBubbleLeftRight,
    IconBookOpen,
    IconClipboardDocumentList,
    IconQuestionMarkCircle,
    IconShieldCheck
} from '../constants';
import { NavLinkItem, User, DropdownItem, NotificationItem } from '../types';
import Button from './Button';
import Dropdown from './Dropdown';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import useI18n from '../hooks/useI18n';
import '../src/styles/animations.css';

interface NavbarProps {
  appName: string;
  currentUser: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ appName, currentUser, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollPosition = useRef(0);
  const scrollAnimationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { t } = useI18n();

  // إغلاق البحث عند النقر خارجاً أو الضغط على Escape
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isSearchOpen]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setIsScrolled(currentPosition > 10);

      if (currentPosition !== lastScrollPosition.current) {
        const direction = currentPosition > lastScrollPosition.current ? 'down' : 'up';
        lastScrollPosition.current = currentPosition;

        if (scrollAnimationTimeout.current) {
          clearTimeout(scrollAnimationTimeout.current);
        }
        setScrollDirection(null);
        requestAnimationFrame(() => setScrollDirection(direction));
        scrollAnimationTimeout.current = setTimeout(() => setScrollDirection(null), 360);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollAnimationTimeout.current) {
        clearTimeout(scrollAnimationTimeout.current);
      }
    };
  }, []);

  const userInitial = currentUser ? currentUser.email.charAt(0).toUpperCase() : '?';

  const userDropdownItems: DropdownItem[] = currentUser ? [
    { 
      element: (
        <div className="px-4 py-2 text-sm text-neutral-dark dark:text-neutral-light font-semibold border-b dark:border-gray-600 mb-1">
          {currentUser.email}
        </div>
      ) 
    },
    { 
      labelKey: 'navbar.profile', 
      path: '/profile', 
      icon: <IconUserCircle className="w-5 h-5" />,
      className: 'animate-fade-in animation-delay-100'
    }, 
    { 
      labelKey: 'navbar.settings', 
      path: '/settings', 
      icon: <IconSettings className="w-5 h-5" />,
      className: 'animate-fade-in animation-delay-150'
    },
    ...(currentUser.role === 'System Admin' ? ([{
      isDivider: true,
      className: 'my-1'
    }, {
      labelKey: 'navbar.adminPanel', 
      path: '/admin', 
      icon: <IconShieldCheck className="w-5 h-5" />,
      className: 'animate-fade-in animation-delay-200 bg-blue-50 dark:bg-blue-900/20 mt-1'
    }] as DropdownItem[]) : []),
    { 
      isDivider: true,
      className: 'my-1'
    },
    { 
      labelKey: 'navbar.logout', 
      onClick: () => { 
        onLogout(); 
        setIsMobileMenuOpen(false); 
      }, 
      icon: <IconLogout className="w-5 h-5" />,
      className: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 animate-fade-in animation-delay-250'
    },
  ] : [];

  const sampleNotifications: NotificationItem[] = [
    { 
      id: '1', 
      titleKey: 'notification.newCourse.title', 
      descriptionKey: 'notification.newCourse.desc', 
      timeAgo: '2h ago', 
      read: false, 
      type: 'new_course', 
      icon: <IconBookOpen className="text-primary w-5 h-5"/>, 
      link: '/courses' 
    },
    // ... other notifications
  ];

  const notificationDropdownItems: DropdownItem[] = [
    { 
      element: (
        <div className="px-4 pt-2 pb-1 text-sm font-semibold text-neutral-dark dark:text-neutral-light animate-fade-in">
          {t('navbar.notifications')}
        </div>
      ) 
    },
    ...sampleNotifications.map((notif, index) => ({
      element: (
        <Link 
          to={notif.link || '#'} 
          key={notif.id}
          className={`block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 ${
            !notif.read ? 'bg-primary-light/10 dark:bg-primary-dark/20' : ''
          } animate-fade-in`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <div className="flex-shrink-0 mt-0.5">
              {React.cloneElement(notif.icon || <IconBell className="w-5 h-5"/>)}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${
                !notif.read ? 'text-primary-dark dark:text-primary-light' : 'text-neutral-dark dark:text-neutral-light'
              }`}>
                {t(notif.titleKey)}
              </p>
              <p className="text-xs text-neutral-DEFAULT dark:text-gray-400 truncate">
                {t(notif.descriptionKey)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {notif.timeAgo}
              </p>
            </div>
          </div>
        </Link>
      )
    })),
    { 
      isDivider: true,
      className: 'my-1'
    },
    { 
      labelKey: 'navbar.viewAllNotifications', 
      path: '/notifications', 
      className: 'text-center !text-primary dark:!text-primary-light hover:!bg-primary-light/20 dark:hover:!bg-primary-dark/30 animate-fade-in animation-delay-200',
      icon: <IconBell className="w-4 h-4" />
    }
  ];

  const currentNavLinks = currentUser ? NAV_LINKS_AUTHENTICATED : NAV_LINKS_GUEST;

  const renderNavLink = (item: NavLinkItem, index: number, isMobile: boolean = false) => (
    <NavLink
      key={item.labelKey}
      to={item.path}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
          isActive
            ? 'bg-primary text-white shadow-md'
            : 'text-neutral-dark dark:text-neutral-light hover:bg-primary-light/10 dark:hover:bg-primary-dark/20 hover:text-primary dark:hover:text-primary-light'
        } ${isMobile ? 'block w-full text-left' : 'nav-item'} animate-fade-in`
      }
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
    >
      {t(item.labelKey)}
    </NavLink>
  );

  const searchInputClasses = "w-full py-2 ltr:pl-4 ltr:pr-10 rtl:pr-4 rtl:pl-10 bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary-light focus:border-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 rtl:text-right ltr:text-left";

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-1' 
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo & Nav Links */}
          <div className="flex items-center">
            <Link 
              to={currentUser ? "/dashboard" : "/"} 
              className={`flex-shrink-0 flex items-center group relative logo-container ${scrollDirection ? `logo-scroll-${scrollDirection}` : ''}`}
              aria-label="Home"
            >
              <div className="flex items-baseline" style={{ direction: 'ltr' }}>
                {/* Qud with كودسكول below it */}
                <div className="relative">
                  <span className="text-xl md:text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300 logo-char">Qud</span>
                  <span className="absolute -bottom-5 ltr:left-0 rtl:right-0 text-base text-gray-500 dark:text-gray-400 font-arabic whitespace-nowrap tracking-tight" style={{ textDecoration: 'none' }}>
                    <span className="animate-fade-in animation-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>كودسكول</span>
                  </span>
                </div>
                {/* School with colored letters */}
                <div className="flex text-xl md:text-2xl font-bold">
                  {['S', 'c', 'h', 'o', 'o', 'l'].map((char, i) => {
                    const colors = [
                      'text-[#EA4335]', // Red
                      'text-[#4285F4]', // Blue
                      'text-[#34A853]', // Green
                      'text-[#FBBC05]', // Yellow
                      'text-[#EA4335]', // Red
                      'text-[#4285F4]', // Blue
                    ];
                    return (
                      <span 
                        key={i}
                        className={`${colors[i]} logo-char inline-block animate-fade-in`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>
              <span className="absolute bottom-[5px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ltr:ml-6 md:rtl:mr-10 md:flex md:items-baseline md:space-x-2 md:rtl:space-x-reverse">
              {currentNavLinks.map((item, index) => renderNavLink(item, index))}
            </div>
          </div>

          {/* Center Section: Expandable Search (Desktop) */}
          <div className="hidden md:flex flex-grow justify-center px-4">
            <div ref={searchWrapRef} className="relative flex items-center justify-end">
              {/* حقل البحث: يعتمد على max-width للحركة السلسة */}
              <div
                style={{ opacity: isSearchOpen ? 1 : 0, maxWidth: isSearchOpen ? '22rem' : '0px' }}
                className="overflow-hidden transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              >
                <input
                  type="search"
                  placeholder={t('navbar.searchPlaceholder')}
                  aria-hidden={!isSearchOpen}
                  tabIndex={isSearchOpen ? 0 : -1}
                  className="w-[22rem] max-w-[22rem] py-2 ltr:pl-4 rtl:pr-4 ltr:pr-11 rtl:pl-11 bg-white/95 dark:bg-gray-700/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-primary-light focus:border-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 rtl:text-right ltr:text-left outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen((v) => !v)}
                aria-label={t('navbar.searchPlaceholder')}
                aria-expanded={isSearchOpen}
                className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ltr:right-0 rtl:left-0 ${
                  isSearchOpen
                    ? 'h-9 w-9 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'h-10 w-10 bg-white/95 dark:bg-gray-700/95 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 shadow-sm hover:shadow-md hover:text-primary dark:hover:text-primary-light'
                }`}
              >
                <IconSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Section: Actions & User Menu */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Theme & Language toggles (desktop) */}
            <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {currentUser ? (
              <>
                <Dropdown
                  trigger={
                    <button 
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light/50 transition-all duration-300 hover-lift relative"
                      aria-label={t('navbar.notifications')}
                    >
                      <IconBell className="w-6 h-6 text-neutral-DEFAULT dark:text-gray-400" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </button>
                  }
                  items={notificationDropdownItems}
                  menuWidthClass="w-80" 
                  menuAlign="right"
                  className="animate-fade-in animation-delay-200"
                />
                <Dropdown
                  trigger={
                    <button className="focus:outline-none">
                      <UserAvatar 
                        initial={userInitial} 
                        size="md" 
                        className="cursor-pointer hover:ring-2 hover:ring-primary-light/50 hover-lift transition-all duration-300"
                      />
                    </button>
                  }
                  items={userDropdownItems}
                  menuAlign="right"
                  className="animate-fade-in animation-delay-300"
                />
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  to="/login" 
                  className="hidden md:inline-flex animate-fade-in animation-delay-200"
                >
                  {t('navbar.login')}
                </Button>
                <Button 
                  to="/register" 
                  className="hidden md:inline-flex animate-fade-in animation-delay-300"
                >
                  {t('navbar.signUp')}
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-expanded="false"
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
                </span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800">
          {/* Mobile Search */}
          <div className="relative px-3 py-2">
            <input
              type="search"
              placeholder={t('navbar.searchPlaceholder')}
              className={searchInputClasses}
            />
            <IconSearch className="w-5 h-5 text-gray-500 dark:text-gray-300 absolute top-1/2 -translate-y-1/2 pointer-events-none ltr:left-6 rtl:right-6" />
          </div>
          
          {/* Mobile Theme & Language toggles */}
          <div className="flex items-center justify-center gap-2 px-3 py-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Navigation Links */}
          {currentNavLinks.map((item, index) => 
            renderNavLink(item, index, true)
          )}
          
          {/* Mobile Auth Buttons */}
          {!currentUser && (
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2 px-2">
                <Button 
                  variant="outline" 
                  to="/login" 
                  fullWidth
                  className="animate-fade-in"
                  style={{ animationDelay: '100ms' }}
                >
                  {t('navbar.login')}
                </Button>
                <Button 
                  to="/register" 
                  fullWidth
                  className="animate-fade-in"
                  style={{ animationDelay: '200ms' }}
                >
                  {t('navbar.signUp')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
