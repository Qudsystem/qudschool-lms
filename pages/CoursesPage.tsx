
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Course } from '../types';
import { IconAcademicCap, IconSearch } from '../constants';
import useI18n from '../hooks/useI18n';
import useSEO from '../hooks/useSEO';

// FIX: Export `placeholderCourses` to allow it to be imported in other files.
export const placeholderCourses: Course[] = [
  {
    id: '1',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    titleKey: 'courses.default.webDev.title',
    descriptionKey: 'courses.default.webDev.desc',
    imageUrl: 'https://picsum.photos/seed/course1/600/400',
    instructorKey: 'courses.default.webDev.instructor',
    durationKey: 'courses.default.webDev.duration',
    rating: 4.5,
    difficulty: 'Beginner',
    difficultyKey: 'course.difficulty.beginner',
    category: 'Web Development',
    categoryKey: 'course.category.webDev'
  },
  {
    id: '2',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    titleKey: 'courses.default.react.title',
    descriptionKey: 'courses.default.react.desc',
    imageUrl: 'https://picsum.photos/seed/course2/600/400',
    instructorKey: 'courses.default.react.instructor',
    durationKey: 'courses.default.react.duration',
    rating: 4.8,
    difficulty: 'Intermediate',
    difficultyKey: 'course.difficulty.intermediate',
    category: 'Web Development',
    categoryKey: 'course.category.webDev'
  },
  {
    id: '3',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    titleKey: 'courses.default.ai.title',
    descriptionKey: 'courses.default.ai.desc',
    imageUrl: 'https://picsum.photos/seed/course3/600/400',
    instructorKey: 'courses.default.ai.instructor',
    durationKey: 'courses.default.ai.duration',
    rating: 4.7,
    difficulty: 'Intermediate',
    difficultyKey: 'course.difficulty.intermediate',
    category: 'AI/ML',
    categoryKey: 'course.category.ai'
  },
  {
    id: '4',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    titleKey: 'courses.default.uiux.title',
    descriptionKey: 'courses.default.uiux.desc',
    imageUrl: 'https://picsum.photos/seed/course4/600/400',
    instructorKey: 'courses.default.uiux.instructor',
    durationKey: 'courses.default.uiux.duration',
    rating: 4.6,
    difficulty: 'Beginner',
    difficultyKey: 'course.difficulty.beginner',
    category: 'Design',
    categoryKey: 'course.category.design'
  },
   {
    id: '5',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    titleKey: 'courses.default.dsa.title',
    descriptionKey: 'courses.default.dsa.desc',
    imageUrl: 'https://picsum.photos/seed/course5/600/400',
    instructorKey: 'courses.default.dsa.instructor',
    durationKey: 'courses.default.dsa.duration',
    rating: 4.9,
    difficulty: 'Advanced',
    difficultyKey: 'course.difficulty.advanced',
    category: 'Software Engineering',
    categoryKey: 'course.category.swe'
  },
  {
    id: '6',
    title: '',
    description: '',
    instructor: '',
    duration: '',
    titleKey: 'courses.default.cloud.title',
    descriptionKey: 'courses.default.cloud.desc',
    imageUrl: 'https://picsum.photos/seed/course6/600/400',
    instructorKey: 'courses.default.cloud.instructor',
    durationKey: 'courses.default.cloud.duration',
    rating: 4.7,
    difficulty: 'Advanced',
    difficultyKey: 'course.difficulty.advanced',
    category: 'Cloud Computing',
    categoryKey: 'course.category.cloud'
  },
];

const difficultyStyles = {
  Beginner: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Advanced: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const { t } = useI18n();
  const title = t(course.titleKey || 'courses.default.webDev.title');
  const description = t(course.descriptionKey || 'courses.default.webDev.desc');
  const instructor = t(course.instructorKey || 'courses.default.webDev.instructor');
  const duration = t(course.durationKey || 'courses.default.webDev.duration');
  const difficulty = course.difficulty ? t(course.difficultyKey || 'course.difficulty.beginner') : '';

  return (
    <Card className="flex flex-col group" hoverEffect>
      <div className="relative">
        <img src={course.imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-xl group-hover:opacity-90 transition-opacity" />
        {course.difficulty && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[course.difficulty]}`}>
            {difficulty}
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-2">{title}</h3>
        <p className="text-neutral-DEFAULT dark:text-gray-400 text-sm mb-3 flex-grow">{description}</p>
        <div className="text-xs text-neutral-DEFAULT dark:text-gray-400 mb-3 space-y-1">
          <p><span className="font-semibold">{t('coursesPage.course.instructorLabel')}:</span> {instructor}</p>
          <p><span className="font-semibold">{t('coursesPage.course.durationLabel')}:</span> {duration}</p>
          <div className="flex items-center">
             <span className="font-semibold ltr:mr-1 rtl:ml-1">{t('coursesPage.course.ratingLabel')}:</span> 
             <span className="text-yellow-500">{'⭐'.repeat(Math.round(course.rating))}</span>
             <span className="ltr:ml-1 rtl:mr-1">({course.rating})</span>
          </div>
        </div>
        <Link to={`/courses/${course.id}`}> 
          <Button variant="solid" className="w-full mt-auto bg-primary hover:bg-primary-dark">
            {t('coursesPage.course.viewCourse')}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

const CoursesPage: React.FC = () => {
  const { t } = useI18n();
  useSEO({
    title: 'الدورات — تعليم البرمجة والذكاء الاصطناعي للأطفال',
    description: 'تصفح دورات QudSchool في البرمجة والروبوتات وتطوير الألعاب والذكاء الاصطناعي للأطفال واليافعين. مناهج تفاعلية، مشاريع عملية، وشهادات معتمدة.',
    path: '/courses',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'QudSchool Courses',
      url: 'https://qudschool.com/courses',
      about: { '@id': 'https://qudschool.com/#organization' },
      inLanguage: 'ar',
    },
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const categories = useMemo(() => ['All', ...Array.from(new Set(placeholderCourses.map(c => c.category || ''))).filter(c => c)], []);

  const filteredCourses = useMemo(() => {
    return placeholderCourses.filter(course => {
      const title = t(course.titleKey || '').toLowerCase();
      const description = t(course.descriptionKey || '').toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch = title.includes(search) || description.includes(search);
      const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchTerm, selectedDifficulty, selectedCategory, t]);

  return (
    <div className="py-12 bg-gray-50 dark:bg-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <IconAcademicCap className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
            {t('coursesPage.title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
            {t('coursesPage.subtitle')}
          </p>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="relative md:col-span-1">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('coursesPage.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent text-sm placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400"
              />
              <IconSearch className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 rtl:space-x-reverse md:col-span-2 justify-end">
              <div className="flex-1">
                <label htmlFor="category-filter" className="sr-only">{t('coursesPage.filterByCategory')}</label>
                <select id="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? t('coursesPage.allCategories') : t(placeholderCourses.find(c => c.category === cat)?.categoryKey || '')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 mt-2 sm:mt-0">
                <label htmlFor="difficulty-filter" className="sr-only">{t('coursesPage.filterByDifficulty')}</label>
                <select id="difficulty-filter" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light">
                   {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                       {diff === 'All' ? t('coursesPage.allDifficulties') : t(`course.difficulty.${diff.toLowerCase()}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-DEFAULT dark:text-gray-400">{t('coursesPage.noResults')}</p>
          </div>
        )}

        <div className="mt-12 text-center">
            <p className="text-neutral-DEFAULT dark:text-gray-400">{t('coursesPage.moreComingSoon')}</p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
