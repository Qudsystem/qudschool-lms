import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '#about' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'البرامج', href: '#programs' },
    { name: 'المشاريع', href: '#projects' },
    { name: 'التواصل', href: '#contact' },
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`bg-background sticky top-0 z-50 transition-all duration-300 ${
      scrollPosition > 50 ? 'shadow-card py-2' : 'py-3'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-row-reverse">
          {/* Navigation Menu - Now on the right */}
          <nav className="hidden md:flex space-x-8 space-x-reverse items-center">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`text-text-primary hover:text-primary font-medium transition duration-300 hover-lift ${
                  scrollPosition > 50 ? 'py-1' : 'py-2'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#login" 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition duration-300 hover-expand animate-pulse"
            >
              تسجيل الدخول
            </a>
            <button 
              onClick={toggleTheme}
              className="text-text-primary hover:text-primary focus:outline-none transition-transform duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </nav>

          {/* Mobile menu button - Now on the right for mobile */}
          <div className="md:hidden order-1">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-text-primary hover:text-primary focus:outline-none transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMenuOpen ? <X size={24} className="animate-spin" style={{animationDuration: '0.5s'}} /> : <Menu size={24} className="hover-rotate" />}
            </button>
          </div>

          {/* Logo - Now on the left */}
          <div className="flex items-center order-2 md:order-1">
            <div className={`relative transition-all duration-500`}>
              {/* Logo with Google colors - Fixed arrangement */}
              <div className="text-2xl font-bold flex items-baseline dir-ltr" style={{ direction: 'ltr' }}>
                <span className="text-primary">Qud</span>
                <div className="flex">
                  <span className="google-red">S</span>
                  <span className="google-blue">c</span>
                  <span className="google-green">h</span>
                  <span className="google-yellow">o</span>
                  <span className="google-red">o</span>
                  <span className="google-blue">l</span>
                </div>
                <span className="text-xs text-text-secondary absolute -bottom-1 right-0 rtl:right-auto rtl:left-0">كودسكول</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.href} 
                className="block text-text-primary hover:text-primary font-medium transition duration-300 animate-fadeIn hover-lift"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#login" 
              className="block bg-primary text-white px-4 py-2 rounded-lg text-center hover:bg-primary-hover transition duration-300 animate-fadeIn hover-expand"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '300ms' }}
            >
              تسجيل الدخول
            </a>
             <button 
              onClick={toggleTheme}
              className="w-full text-text-primary hover:text-primary focus:outline-none transition-transform duration-300 flex items-center justify-center py-2"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
