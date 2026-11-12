import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

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
      setIsScrolling(true);
      
      // Reset scrolling state after scrolling stops
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrollPosition > 50 ? 'shadow-md py-2' : 'py-3'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-row-reverse">
          {/* Navigation Menu - Now on the right */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover-lift ${
                  scrollPosition > 50 ? 'py-1' : 'py-2'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 hover-expand animate-pulse"
            >
              تسجيل الدخول
            </a>
          </nav>

          {/* Mobile menu button - Now on the right for mobile */}
          <div className="md:hidden order-1">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-gray-700 hover:text-blue-600 focus:outline-none transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMenuOpen ? <X size={24} className="animate-spin" style={{animationDuration: '0.5s'}} /> : <Menu size={24} className="hover-rotate" />}
            </button>
          </div>

          {/* Logo - Now on the left */}
          <div className="flex items-center order-2 md:order-1">
            <div className={`relative transition-all duration-500 ${
              isScrolling ? 'animate-shake' : ''
            }`}>
              {/* Logo with Google colors - Fixed arrangement */}
              <div className="text-2xl font-bold flex items-baseline dir-ltr" style={{ direction: 'ltr' }}>
                <span className="text-blue-600">Qud</span>
                <div className="flex">
                  <span className="google-red">S</span>
                  <span className="google-blue">c</span>
                  <span className="google-green">h</span>
                  <span className="google-yellow">o</span>
                  <span className="google-red">o</span>
                  <span className="google-blue">l</span>
                </div>
                <span className="text-xs text-gray-500 absolute -bottom-1 right-0 rtl:right-auto rtl:left-0">كودسكول</span>
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
                className="block text-gray-700 hover:text-blue-600 font-medium transition duration-300 animate-fadeIn hover-lift"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#login" 
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition duration-300 animate-fadeIn hover-expand"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '300ms' }}
            >
              تسجيل الدخول
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
