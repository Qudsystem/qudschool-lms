import { useState, useEffect, useRef } from 'react';
import { Users, Star, GraduationCap, Clock } from '../lucide-icons';
import useI18n from '../hooks/useI18n';
import AnimatedCounter from './AnimatedCounter';

const AdvancedStatsSection = () => {
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

  const stats = [
    {
      id: 1,
      end: 6000000,
      prefix: '+',
      decimals: 0,
      label: t('advancedStats.trainingHours'),
      sublabel: t('advancedStats.delivered'),
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      end: 130,
      prefix: '+',
      decimals: 0,
      label: t('advancedStats.thousandGraduates'),
      sublabel: t('advancedStats.inChildEducation'),
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      end: 4.9,
      suffix: '/5',
      decimals: 1,
      label: t('advancedStats.studentRating'),
      sublabel: t('advancedStats.forUs'),
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 4,
      end: 250000,
      prefix: '+',
      decimals: 0,
      label: t('advancedStats.happyParents'),
      sublabel: t('advancedStats.withProgress'),
      icon: Users,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const partners = [
    { name: 'TechCrunch', logo: '/assets/logos/techcrunch.svg', grayscale: true },
    { name: 'Forbes', logo: '/assets/logos/forbes.svg', grayscale: true },
    { name: 'UCL', logo: '/assets/logos/ucl.svg', grayscale: true },
    { name: 'Entrepreneur', logo: '/assets/logos/entrepreneur.svg', grayscale: true }
  ];

  return (
    <section
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 min-w-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden min-w-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>

              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 break-words leading-tight">
                <AnimatedCounter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>

              <div className="text-gray-800 dark:text-gray-200 font-semibold text-sm sm:text-base mb-1 leading-snug">
                {stat.label}
              </div>

              <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-snug">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-8">
            {t('advancedStats.asSeenIn')}
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group flex items-center justify-center transition-all duration-300 hover:scale-105"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-auto opacity-70 grayscale-[30%] dark:opacity-90 dark:brightness-0 dark:invert dark:hover:opacity-100 hover:opacity-100 transition-all duration-300"
                  style={{
                    height: partner.name === 'UCL' ? '52px' : partner.name === 'Forbes' ? '38px' : '44px',
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedStatsSection;
