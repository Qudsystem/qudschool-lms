import React from 'react';
import { IconBookOpen } from '../constants';
import useI18n from '../hooks/useI18n';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { StudentCourseProgress } from '../types';

const enrolledCourses: StudentCourseProgress[] = [
    {
        id: '2',
        title: '',
        titleKey: 'courses.default.react.title',
        imageUrl: 'https://picsum.photos/seed/course2/600/400',
        instructor: '',
        instructorKey: 'courses.default.react.instructor',
        progress: 75,
        nextLesson: '',
        nextLessonKey: 'myLearning.nextLesson.react'
    },
    {
        id: '3',
        title: '',
        titleKey: 'courses.default.ai.title',
        imageUrl: 'https://picsum.photos/seed/course3/600/400',
        instructor: '',
        instructorKey: 'courses.default.ai.instructor',
        progress: 30,
        nextLesson: '',
        nextLessonKey: 'myLearning.nextLesson.ai'
    },
    {
        id: '5',
        title: '',
        titleKey: 'courses.default.dsa.title',
        imageUrl: 'https://picsum.photos/seed/course5/600/400',
        instructor: '',
        instructorKey: 'courses.default.dsa.instructor',
        progress: 95,
        nextLesson: '',
        nextLessonKey: 'myLearning.nextLesson.dsa'
    }
];

const CourseProgressCard: React.FC<{ course: StudentCourseProgress }> = ({ course }) => {
    const { t } = useI18n();
    const title = t(course.titleKey);

    return (
        <Card className="flex flex-col group" hoverEffect>
            <img src={course.imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-2">{title}</h3>
                <p className="text-xs text-neutral-DEFAULT dark:text-gray-400 mb-4">{t('coursesPage.course.instructorLabel')}: {t(course.instructorKey)}</p>
                
                <div className="mb-2">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-neutral-dark dark:text-neutral-light">{t('myLearning.progress')}</span>
                        <span className="text-sm font-medium text-primary dark:text-primary-light">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                </div>

                <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mt-2">
                    <span className="font-semibold">{t('myLearning.nextLessonLabel')}:</span> {t(course.nextLessonKey)}
                </p>

                <Button variant="solid" className="w-full mt-auto bg-secondary hover:bg-secondary-dark">
                    {t('myLearning.continueLearning')}
                </Button>
            </div>
        </Card>
    );
};


const MyLearningPage: React.FC = () => {
  const { t } = useI18n();
  return (
    <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <IconBookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
            {t('myLearning.title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
            {t('myLearning.subtitle')}
          </p>
        </div>

        {enrolledCourses.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map(course => (
                    <CourseProgressCard key={course.id} course={course} />
                ))}
            </div>
        ) : (
             <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-light mb-4">
                    {t('myLearning.noCourses.title')}
                </h2>
                <p className="text-neutral-DEFAULT dark:text-gray-400">
                    {t('myLearning.noCourses.description')}
                </p>
                <div className="mt-8">
                    <Link
                    to="/courses" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                    {t('myLearning.exploreCourses')}
                    </Link>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyLearningPage;