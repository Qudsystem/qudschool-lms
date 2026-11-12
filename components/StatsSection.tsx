import React from 'react';
import useInView from '../hooks/useInView';
import useI18n from '../hooks/useI18n';
import AnimatedCounter from './AnimatedCounter';

const StatsSection: React.FC = () => {
  const { t } = useI18n();
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 });

  const stats = [
    { end: 5000, suffix: '+', label: t('statsSection.students') },
    { end: 50, suffix: '+', label: t('statsSection.mentors') },
    { end: 25, suffix: '+', label: t('statsSection.programs') },
    { end: 15, suffix: '+', label: t('statsSection.branches') },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-lg text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
