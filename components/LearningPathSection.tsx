import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import useI18n from '../hooks/useI18n';

interface Course {
  duration: string;
  sessions: string;
  titleKey: string;
  descKey: string;
  image: string;
}

interface GradeOption {
  id: string;
  labelKey: string;
}

const LearningPathSection: React.FC = () => {
  const { t } = useI18n();
  const [selectedGrade, setSelectedGrade] = useState('1-2');

  const gradeOptions: GradeOption[] = [
    { id: '1-2', labelKey: 'learningPath.grades.1-2' },
    { id: '3-4', labelKey: 'learningPath.grades.3-4' },
    { id: '5-6', labelKey: 'learningPath.grades.5-6' },
    { id: '7-8', labelKey: 'learningPath.grades.7-8' },
    { id: '9-10', labelKey: 'learningPath.grades.9-10' },
    { id: '11-12', labelKey: 'learningPath.grades.11-12' },
  ];

  const pathCourses: Record<string, Course[]> = {
    '1-2': [
      {
        duration: t('learningPath.duration.3months'),
        sessions: '12 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.1-2.tech',
        descKey: 'learningPath.courses.1-2.tech.desc',
        image: '/assets/tech-around-us.jpg'
      },
      {
        duration: t('learningPath.duration.6months'),
        sessions: '24 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.1-2.creative',
        descKey: 'learningPath.courses.1-2.creative.desc',
        image: '/assets/creative-computing.jpg'
      },
      {
        duration: t('learningPath.duration.9months'),
        sessions: '36 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.1-2.minecraft',
        descKey: 'learningPath.courses.1-2.minecraft.desc',
        image: '/assets/minecraft-programming.png'
      },
      {
        duration: t('learningPath.duration.12months'),
        sessions: '48 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.1-2.space',
        descKey: 'learningPath.courses.1-2.space.desc',
        image: '/assets/space-minecraft.jpg'
      }
    ],
    '3-4': [
      {
        duration: t('learningPath.duration.3months'),
        sessions: '12 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.3-4.basics',
        descKey: 'learningPath.courses.3-4.basics.desc',
        image: '/assets/coding-basics-34.jpg'
      },
      {
        duration: t('learningPath.duration.6months'),
        sessions: '24 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.3-4.games',
        descKey: 'learningPath.courses.3-4.games.desc',
        image: '/assets/game-dev-34.jpg'
      },
      {
        duration: t('learningPath.duration.9months'),
        sessions: '36 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.3-4.robotics',
        descKey: 'learningPath.courses.3-4.robotics.desc',
        image: '/assets/robotics-34.jpg'
      },
      {
        duration: t('learningPath.duration.12months'),
        sessions: '48 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.3-4.projects',
        descKey: 'learningPath.courses.3-4.projects.desc',
        image: '/assets/projects-34.jpg'
      }
    ],
    '5-6': [
      {
        duration: t('learningPath.duration.3months'),
        sessions: '12 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.5-6.structural',
        descKey: 'learningPath.courses.5-6.structural.desc',
        image: '/assets/structural-coding-56.jpg'
      },
      {
        duration: t('learningPath.duration.6months'),
        sessions: '24 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.5-6.webdesign',
        descKey: 'learningPath.courses.5-6.webdesign.desc',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.9months'),
        sessions: '36 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.5-6.mobile',
        descKey: 'learningPath.courses.5-6.mobile.desc',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.12months'),
        sessions: '48 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.5-6.fullproject',
        descKey: 'learningPath.courses.5-6.fullproject.desc',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80'
      }
    ],
    '7-8': [
      {
        duration: t('learningPath.duration.3months'),
        sessions: '12 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.7-8.advanced',
        descKey: 'learningPath.courses.7-8.advanced.desc',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.6months'),
        sessions: '24 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.7-8.database',
        descKey: 'learningPath.courses.7-8.database.desc',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.9months'),
        sessions: '36 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.7-8.gamedev',
        descKey: 'learningPath.courses.7-8.gamedev.desc',
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.12months'),
        sessions: '48 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.7-8.professional',
        descKey: 'learningPath.courses.7-8.professional.desc',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'
      }
    ],
    '9-10': [
      {
        duration: t('learningPath.duration.3months'),
        sessions: '12 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.9-10.ai',
        descKey: 'learningPath.courses.9-10.ai.desc',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.6months'),
        sessions: '24 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.9-10.webdev',
        descKey: 'learningPath.courses.9-10.webdev.desc',
        image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.9months'),
        sessions: '36 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.9-10.cloud',
        descKey: 'learningPath.courses.9-10.cloud.desc',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.12months'),
        sessions: '48 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.9-10.startup',
        descKey: 'learningPath.courses.9-10.startup.desc',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80'
      }
    ],
    '11-12': [
      {
        duration: t('learningPath.duration.3months'),
        sessions: '12 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.11-12.ml',
        descKey: 'learningPath.courses.11-12.ml.desc',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.6months'),
        sessions: '24 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.11-12.fullstack',
        descKey: 'learningPath.courses.11-12.fullstack.desc',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.9months'),
        sessions: '36 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.11-12.entrepreneurship',
        descKey: 'learningPath.courses.11-12.entrepreneurship.desc',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
      },
      {
        duration: t('learningPath.duration.12months'),
        sessions: '48 ' + t('learningPath.sessions'),
        titleKey: 'learningPath.courses.11-12.capstone',
        descKey: 'learningPath.courses.11-12.capstone.desc',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
      }
    ]
  };

  const currentCourses = pathCourses[selectedGrade] || pathCourses['1-2'];

  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-dark" id="learning-path">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-4xl">
            {t('learningPath.title')}
          </h2>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400 max-w-2xl mx-auto">
            {t('learningPath.subtitle')}
          </p>
        </div>

        {/* Grade Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {gradeOptions.map((option) => (
            <button
              key={option.id}
              className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedGrade === option.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-neutral-dark dark:text-neutral-light hover:bg-teal-50 dark:hover:bg-gray-600 shadow'
              }`}
              onClick={() => setSelectedGrade(option.id)}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>

        {/* Learning Path Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (desktop only) */}
          <div className="absolute top-0 bottom-0 ltr:left-24 rtl:right-24 w-1 bg-primary/30 hidden md:block"></div>

          {/* Course Items */}
          <div className="space-y-8">
            {currentCourses.map((course, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-start gap-4">
                {/* Timeline Dot (desktop only) */}
                <div className="absolute ltr:left-24 rtl:right-24 w-6 h-6 bg-primary rounded-full -ml-3 rtl:-mr-3 mt-6 z-10 hidden md:block border-4 border-white dark:border-gray-800 shadow-lg"></div>
                
                {/* Timeline Label */}
                <div className="w-full md:w-48 md:flex-shrink-0 text-center md:text-left ltr:md:text-right ltr:md:pr-24 rtl:md:pr-0 rtl:md:pl-24 rtl:md:translate-x-6 ltr:md:-translate-x-6 translate-y-5 mb-4 md:mb-0">
                  <div className="font-bold text-primary text-lg">{course.duration}</div>
                  <div className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                    ({course.sessions})
                  </div>
                </div>
                
                {/* Course Card */}
                <Card className="flex-grow rounded-2xl md:rounded-3xl overflow-hidden" hoverEffect>
                  <div className="flex flex-col sm:flex-row" dir="ltr">
                    <div className="w-full sm:w-2/3 p-6" dir="rtl">
                      <h3 className="font-bold text-xl text-neutral-dark dark:text-neutral-light mb-3">
                        {t(course.titleKey)}
                      </h3>
                      <p className="text-neutral-DEFAULT dark:text-gray-300 mb-4">
                        {t(course.descKey)}
                      </p>
                      <Button variant="solid" size="sm" className="rounded-full bg-secondary hover:bg-secondary-dark">
                        {t('learningPath.viewDetails')}
                      </Button>
                    </div>
                    <div className="w-full sm:w-1/3">
                      <img 
                        src={course.image} 
                        alt={t(course.titleKey)} 
                        className="w-full h-48 sm:h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPathSection;
