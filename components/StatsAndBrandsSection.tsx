import React from 'react';
import useInView from '../hooks/useInView';
import useI18n from '../hooks/useI18n';
import AnimatedCounter from './AnimatedCounter';

const StatsAndBrandsSection = () => {
  const { t, language } = useI18n();
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.2 });

  const thousandSuffix = language === 'ar' ? ' ألف خريج' : 'k graduates';

  const stats = [
    { kind: 'count' as const, end: 6000000, prefix: '+', label: t('statsBrands.hours') },
    { kind: 'count' as const, end: 130, prefix: '+', suffix: thousandSuffix, label: t('statsBrands.experience') },
    { kind: 'count' as const, end: 4.9, decimals: 1, suffix: '/5', label: t('statsBrands.rating') },
    { kind: 'count' as const, end: 250000, prefix: '+', label: t('statsBrands.parents') },
  ];

  const brands = [
    { name: 'TechCrunch', logo: '/assets/logos/techcrunch.svg' },
    { name: 'Forbes', logo: '/assets/logos/forbes.svg' },
    { name: 'UCL', logo: '/assets/logos/ucl.svg' },
    { name: 'Entrepreneur', logo: '/assets/logos/entrepreneur.svg' },
  ];

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10" ref={ref}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  <AnimatedCounter
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center text-gray-400 dark:text-gray-500 text-sm mb-4">{t('statsBrands.asSeenIn')}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center items-center p-4">
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  style={{ height: brand.name === 'UCL' ? '52px' : brand.name === 'Forbes' ? '38px' : '44px' }}
                  className="w-auto object-contain opacity-75 grayscale-[20%] transition-all duration-300 hover:scale-105 hover:opacity-100 dark:brightness-0 dark:invert"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsAndBrandsSection;
