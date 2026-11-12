import { useState, useEffect, useRef } from 'react';
import useI18n from '../hooks/useI18n';

const WhyQudSchoolSection = () => {
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

  const skills = [
    {
      id: 1,
      title: t('whyQudSchool.skills.programmingProjects'),
      image: '/assets/illustrations/skills/programming-projects.svg'
    },
    {
      id: 2,
      title: t('whyQudSchool.skills.interactiveLessons'),
      image: '/assets/illustrations/skills/interactive-lessons.svg'
    },
    {
      id: 3,
      title: t('whyQudSchool.skills.gameDesign'),
      image: '/assets/illustrations/skills/game-design.svg'
    },
    {
      id: 4,
      title: t('whyQudSchool.skills.aiNetworks'),
      image: '/assets/illustrations/skills/ai-networks.svg'
    },
    {
      id: 5,
      title: t('whyQudSchool.skills.logicalThinking'),
      image: '/assets/illustrations/skills/logical-thinking.svg'
    },
    {
      id: 6,
      title: t('whyQudSchool.skills.computerScience'),
      image: '/assets/illustrations/skills/computer-science.svg'
    },
    {
      id: 7,
      title: t('whyQudSchool.skills.codingDiary'),
      image: '/assets/illustrations/skills/coding-diary.svg'
    },
    {
      id: 8,
      title: t('whyQudSchool.skills.webApps'),
      image: '/assets/illustrations/skills/web-apps.svg'
    },
    {
      id: 9,
      title: t('whyQudSchool.skills.gameDevelopment'),
      image: '/assets/illustrations/skills/game-development.svg'
    }
  ];

  return (
    <section 
      className="py-16 bg-white dark:bg-gray-900" 
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t('whyQudSchool.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Skills Grid */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                {t('whyQudSchool.careerPlan.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {t('whyQudSchool.careerPlan.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gray-900"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <img
                    src={skill.image}
                    alt={skill.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs md:text-sm font-bold text-center leading-tight">
                      {skill.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Main Image */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/illustrations/career-plan-main.svg"
                alt={t('whyQudSchool.mainImageAlt')}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 ltr:right-6 rtl:left-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold">
                {t('whyQudSchool.codingBadge')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyQudSchoolSection;
