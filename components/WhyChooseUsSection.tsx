import { useEffect, useRef, useState } from 'react';
import {
  BrainCircuit,
  Code2,
  Cuboid,
  Gamepad2,
  Laptop,
  PanelsTopLeft,
  Smartphone,
  Blocks,
} from 'lucide-react';
import useI18n from '../hooks/useI18n';

const learningTracks = [
  { key: 'item1', icon: Smartphone, tone: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300' },
  { key: 'item2', icon: BrainCircuit, tone: 'bg-sky-50 text-sky-500 dark:bg-sky-500/15 dark:text-sky-300' },
  { key: 'item3', icon: Cuboid, tone: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300' },
  { key: 'item4', icon: Gamepad2, tone: 'bg-orange-50 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300' },
  { key: 'item5', icon: Code2, tone: 'bg-amber-50 text-amber-500 dark:bg-amber-500/15 dark:text-amber-300' },
  { key: 'item6', icon: Laptop, tone: 'bg-slate-100 text-blue-700 dark:bg-slate-700/60 dark:text-blue-300' },
  { key: 'item7', icon: PanelsTopLeft, tone: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300' },
  { key: 'item8', icon: Blocks, tone: 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300' },
];

const WhyChooseUsSection = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-gray-950 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div
          className={`mx-auto max-w-6xl rounded-[2.5rem] bg-white px-6 py-12 shadow-[0_20px_60px_rgba(30,64,175,0.08)] transition-all duration-700 dark:bg-gray-900 dark:shadow-black/20 md:px-14 md:py-16 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-[1.45] text-slate-900 dark:text-white md:text-4xl">
            {t('learningTracks.title')}
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-10 md:gap-y-12">
            {learningTracks.map(({ key, icon: Icon, tone }, index) => (
              <div
                key={key}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tone} shadow-sm`}>
                  <Icon size={30} strokeWidth={2.2} />
                </div>
                <p className="mt-5 min-h-[3rem] text-sm font-medium leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                  {t(`learningTracks.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
