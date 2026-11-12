import { useState, useEffect, useRef } from 'react';
import { Check } from '../lucide-icons';
import useI18n from '../hooks/useI18n';

const CertificationSection = () => {
  const { t, language } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // شهادة مطابقة للغة الحالية
  const certificateByLang: Record<'ar' | 'en', string> = {
    ar: '/assets/qudschool-certificate-ahmad-hussein.jpg',
    en: '/assets/qudschool-certificate-ahmad-galal.png',
  };
  const currentCertificate = certificateByLang[language === 'en' ? 'en' : 'ar'];

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

  const benefits = [
    {
      id: 1,
      text: t('certification.benefits.recognized')
    },
    {
      id: 2,
      text: t('certification.benefits.addValue')
    },
    {
      id: 3,
      text: t('certification.benefits.proofOfSkills')
    },
    {
      id: 4,
      text: t('certification.benefits.helpsAdmission')
    }
  ];

  return (
    <section 
      className="py-16 bg-white dark:bg-gray-900" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
                {t('certification.title')}
              </h2>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {t('certification.description')}
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.id}
                    className={`flex items-start gap-4 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Check className="text-green-600 dark:text-green-400" size={20} strokeWidth={3} />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed pt-1">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Certificate Image */}
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative">
                {/* Yellow Circle Decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300 dark:bg-yellow-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 dark:bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Certificate Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-700 bg-white dark:bg-gray-800">
                  <img
                    key={currentCertificate}
                    src={currentCertificate}
                    alt={t('certification.imageAlt')}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-xl text-sm font-bold whitespace-nowrap">
                  {t('certification.officialBadge')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
