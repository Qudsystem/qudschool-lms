import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import Button from './Button';
import useI18n from '../hooks/useI18n';

interface Project {
  id: number;
  titleKey: string;
  descKey: string;
  badges: string[];
  image: string;
}

const ProjectsGallerySection: React.FC = () => {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      titleKey: 'projectsGallery.projects.aiApp.title',
      descKey: 'projectsGallery.projects.aiApp.desc',
      badges: [t('projectsGallery.badges.ai'), t('projectsGallery.badges.coding')],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1770&q=85'
    },
    {
      id: 2,
      titleKey: 'projectsGallery.projects.robot.title',
      descKey: 'projectsGallery.projects.robot.desc',
      badges: [t('projectsGallery.badges.robotics'), t('projectsGallery.badges.python')],
      image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&q=80'
    },
    {
      id: 3,
      titleKey: 'projectsGallery.projects.game.title',
      descKey: 'projectsGallery.projects.game.desc',
      badges: [t('projectsGallery.badges.games'), t('projectsGallery.badges.scratch')],
      image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&q=80'
    },
    {
      id: 4,
      titleKey: 'projectsGallery.projects.mobileApp.title',
      descKey: 'projectsGallery.projects.mobileApp.desc',
      badges: [t('projectsGallery.badges.mobile'), t('projectsGallery.badges.flutter')],
      image: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=800&q=80'
    },
    {
      id: 5,
      titleKey: 'projectsGallery.projects.translator.title',
      descKey: 'projectsGallery.projects.translator.desc',
      badges: [t('projectsGallery.badges.ai'), t('projectsGallery.badges.nlp')],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80'
    },
    {
      id: 6,
      titleKey: 'projectsGallery.projects.website.title',
      descKey: 'projectsGallery.projects.website.desc',
      badges: [t('projectsGallery.badges.web'), t('projectsGallery.badges.react')],
      image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&q=80'
    },
    {
      id: 7,
      titleKey: 'projectsGallery.projects.physics.title',
      descKey: 'projectsGallery.projects.physics.desc',
      badges: [t('projectsGallery.badges.science'), t('projectsGallery.badges.simulation')],
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80'
    },
    {
      id: 8,
      titleKey: 'projectsGallery.projects.school.title',
      descKey: 'projectsGallery.projects.school.desc',
      badges: [t('projectsGallery.badges.management'), t('projectsGallery.badges.fullstack')],
      image: 'https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?w=800&q=80'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlay, projects.length]);

  const goToProject = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsAutoPlay(false);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-4xl">
            {t('projectsGallery.title')}
          </h2>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
            {t('projectsGallery.subtitle')}
          </p>
        </div>

        {/* Main Project Display */}
        <div className="relative max-w-5xl mx-auto mb-8">
          <Card className="overflow-hidden rounded-2xl" hoverEffect={false}>
            <div className="flex flex-col md:flex-row">
              {/* Project Image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-96">
                <img
                  src={projects[currentIndex].image}
                  alt={t(projects[currentIndex].titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {projects[currentIndex].badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-primary text-xs font-semibold rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mb-4">
                  {t(projects[currentIndex].titleKey)}
                </h3>
                <p className="text-neutral-DEFAULT dark:text-gray-300 mb-6">
                  {t(projects[currentIndex].descKey)}
                </p>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevProject}
                    className="p-2"
                    title={t('projectsGallery.previous')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextProject}
                    className="p-2"
                    title={t('projectsGallery.next')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="p-2"
                    title={isAutoPlay ? t('projectsGallery.pause') : t('projectsGallery.play')}
                  >
                    {isAutoPlay ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Arrows (outside card) */}
          <button
            onClick={prevProject}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors hidden md:block"
            aria-label={t('projectsGallery.previous')}
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextProject}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors hidden md:block"
            aria-label={t('projectsGallery.next')}
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-2 flex-wrap">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => goToProject(index)}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === index
                  ? 'border-primary scale-110 shadow-lg'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Project Counter */}
        <div className="text-center mt-6 text-neutral-DEFAULT dark:text-gray-400">
          <span className="font-semibold text-primary">{currentIndex + 1}</span> / {projects.length}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallerySection;
