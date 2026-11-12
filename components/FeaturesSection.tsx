import { useState, useEffect, useRef } from 'react';
import { Award, Book, Monitor, Users } from 'lucide-react';
import useI18n from '../hooks/useI18n';

const featureKeys = [
  { key: 'features.item1', icon: <Monitor className="text-amber-400 dark:text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" size={36} />, image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80' },
  { key: 'features.item2', icon: <Users className="text-amber-400 dark:text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" size={36} />, image: 'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80' },
  { key: 'features.item3', icon: <Book className="text-amber-400 dark:text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" size={36} />, image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80' },
  { key: 'features.item4', icon: <Award className="text-amber-400 dark:text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" size={36} />, image: '/assets/certificate-amr-mohamed-galal-cropped.png' },
];

const FeaturesSection = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % featureKeys.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 overflow-hidden">
          <h2 className={`text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t('features.title')}
          </h2>
          <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureKeys.map((feature, index) => {
            const isCert = feature.image === '/assets/certificate-amr-mohamed-galal-cropped.png';
            const title = t(`${feature.key}.title`);
            return (
              <div 
                key={index} 
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg dark:shadow-gray-900 transition duration-500 ${activeFeature === index ? 'scale-105 shadow-lg ring-2 ring-blue-500 dark:ring-blue-400' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`h-48 overflow-hidden relative ${isCert ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
                  <img
                    src={feature.image}
                    alt={title}
                    className={`w-full h-full transition-transform duration-700 hover:scale-110 ${isCert ? 'object-contain object-center drop-shadow-[0_6px_16px_rgba(15,23,42,0.25)]' : 'object-cover object-center'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end justify-center pb-4">
                    <div className="text-white">{feature.icon}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{t(`${feature.key}.desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
