import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';
import { Course } from '../types';

const AdminCoursesPage: React.FC = () => {
  const { t } = useI18n();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'React للمبتدئين',
      titleKey: 'courses.default.react.title',
      description: 'تعلم أساسيات React من الصفر',
      descriptionKey: 'courses.default.react.desc',
      instructor: 'أحمد محمد',
      instructorKey: 'courses.default.react.instructor',
      duration: '8 أسابيع',
      durationKey: 'courses.default.react.duration',
      imageUrl: 'https://picsum.photos/seed/course1/600/400',
      rating: 4.8,
      difficulty: 'Beginner',
      difficultyKey: 'coursesPage.difficulty.beginner',
      category: 'Web Development',
      categoryKey: 'coursesPage.category.webDevelopment',
      enrolled: 1250,
      lessons: 24
    },
    {
      id: '2',
      title: 'الذكاء الاصطناعي وتعلم الآلة',
      titleKey: 'courses.default.ai.title',
      description: 'استكشف عالم AI/ML',
      descriptionKey: 'courses.default.ai.desc',
      instructor: 'فاطمة علي',
      instructorKey: 'courses.default.ai.instructor',
      duration: '12 أسبوع',
      durationKey: 'courses.default.ai.duration',
      imageUrl: 'https://picsum.photos/seed/course2/600/400',
      rating: 4.9,
      difficulty: 'Advanced',
      difficultyKey: 'coursesPage.difficulty.advanced',
      category: 'AI/ML',
      categoryKey: 'coursesPage.category.aiMl',
      enrolled: 890,
      lessons: 36
    },
    {
      id: '3',
      title: 'هياكل البيانات والخوارزميات',
      titleKey: 'courses.default.dsa.title',
      description: 'أتقن مفاهيم DSA الأساسية',
      descriptionKey: 'courses.default.dsa.desc',
      instructor: 'يوسف محمد',
      instructorKey: 'courses.default.dsa.instructor',
      duration: '10 أسابيع',
      durationKey: 'courses.default.dsa.duration',
      imageUrl: 'https://picsum.photos/seed/course3/600/400',
      rating: 4.7,
      difficulty: 'Intermediate',
      difficultyKey: 'coursesPage.difficulty.intermediate',
      category: 'Computer Science',
      categoryKey: 'coursesPage.category.computerScience',
      enrolled: 1450,
      lessons: 30
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleDelete = (courseId: string) => {
    if (confirm(t('admin.courses.confirmDelete'))) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowCreateModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark dark:text-neutral-light">
            {t('admin.courses.title')}
          </h1>
          <p className="mt-2 text-neutral-DEFAULT dark:text-gray-400">
            {t('admin.courses.subtitle')}
          </p>
        </div>
        <Button
          variant="solid"
          size="md"
          onClick={() => {
            setEditingCourse(null);
            setShowCreateModal(true);
          }}
          className="mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
          {t('admin.courses.createNew')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.courses.stats.total')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {courses.length}
              </p>
            </div>
            <div className="bg-primary-light dark:bg-primary-dark rounded-lg p-3">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.courses.stats.totalStudents')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {courses.reduce((sum, c) => sum + (c.enrolled || 0), 0)}
              </p>
            </div>
            <div className="bg-success-light dark:bg-success-dark rounded-lg p-3">
              <GraduationCap className="w-8 h-8 text-success" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.courses.stats.avgRating')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {(courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-warning-light dark:bg-warning-dark rounded-lg p-3">
              <GraduationCap className="w-8 h-8 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-light mb-6">
          {t('admin.courses.allCourses')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.courses.table.course')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.courses.table.instructor')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.courses.table.category')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.courses.table.enrolled')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.courses.table.rating')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.courses.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded ltr:mr-3 rtl:ml-3"
                      />
                      <div>
                        <p className="font-medium text-neutral-dark dark:text-neutral-light">
                          {course.title}
                        </p>
                        <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                          {course.lessons} {t('admin.courses.table.lessons')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                    {course.instructor}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-primary-light dark:bg-primary-dark text-primary dark:text-primary-light rounded-full text-sm">
                      {course.category}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                    {course.enrolled}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-warning">★</span>
                      <span className="ltr:ml-1 rtl:mr-1 font-medium text-neutral-dark dark:text-neutral-light">
                        {course.rating}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                      >
                        <Edit2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                        {t('common.edit')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error-dark"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                        {t('common.delete')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mb-4">
                {editingCourse ? t('admin.courses.editCourse') : t('admin.courses.createNew')}
              </h2>
              <p className="text-neutral-DEFAULT dark:text-gray-400 mb-6">
                {t('admin.courses.modal.description')}
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCourse(null);
                  }}
                >
                  {t('modal.cancel')}
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCourse(null);
                    alert(t('admin.courses.modal.success'));
                  }}
                >
                  {t('modal.confirm')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminCoursesPage;
