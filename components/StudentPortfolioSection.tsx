import { useState, useEffect, useRef } from 'react';
import { FileText } from '../lucide-icons';
import useI18n from '../hooks/useI18n';

const StudentPortfolioSection = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Right Side - Content */}
            <div 
              className={`order-2 md:order-1 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-6 shadow-lg">
                <FileText className="text-white" size={32} />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
                {t('studentPortfolio.title')}
              </h2>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {t('studentPortfolio.description')}
              </p>

              {/* CTA Button */}
              <button className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {t('studentPortfolio.startNow')}
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Left Side - Code Image */}
            <div 
              className={`order-1 md:order-2 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="/assets/student-portfolio.jpg"
                  alt={t('studentPortfolio.imageAlt')}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Floating Code Badge */}
                <div className="absolute bottom-6 ltr:left-6 rtl:right-6 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <code className="text-white text-xs font-bold">{'</>'}</code>
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-bold text-sm">
                        {t('studentPortfolio.liveCode')}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        JavaScript • React
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentPortfolioSection;
