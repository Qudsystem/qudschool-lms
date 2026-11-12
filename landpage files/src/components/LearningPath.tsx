import { useState } from 'react';

const LearningPath = () => {
  const [selectedGrade, setSelectedGrade] = useState('1-2');

  const gradeOptions = [
    { id: '1-2', label: 'الصف 1-2' },
    { id: '3-4', label: 'الصف 3-4' },
    { id: '5-6', label: 'الصف 5-6' },
    { id: '7-8', label: 'الصف 7-8' },
    { id: '9-10', label: 'الصف 9-10' },
    { id: '11-12', label: 'الصف 11-12' },
  ];

  const pathCourses = {
    '1-2': [
      {
        duration: '3 شهور',
        sessions: '12 حصة',
        title: 'التكنولوجيا حولنا',
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
      },
      {
        duration: '6 شهور',
        sessions: '12 حصة',
        title: 'الحوسبة الإبداعية',
        image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      {
        duration: '9 شهور',
        sessions: '12 حصة',
        title: 'البرمجة مع ماينكرافت',
        image: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80'
      },
      {
        duration: '12 شهر',
        sessions: '12 حصة',
        title: 'استكشاف الفضاء مع ماينكرافت',
        image: '/assets/space-minecraft-program.png'
      }
    ],
    '3-4': [
      {
        duration: '3 شهور',
        sessions: '12 حصة',
        title: 'أساسيات البرمجة',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      {
        duration: '6 شهور',
        sessions: '12 حصة',
        title: 'تطوير الألعاب البسيطة',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
      },
      {
        duration: '9 شهور',
        sessions: '12 حصة',
        title: 'الروبوتات والبرمجة',
        image: 'https://images.unsplash.com/photo-1625014618427-fbc980b974f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
      },
      {
        duration: '12 شهر',
        sessions: '12 حصة',
        title: 'مشاريع برمجية متكاملة',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80'
      }
    ],
    '5-6': [
      {
        duration: '3 شهور',
        sessions: '12 حصة',
        title: 'البرمجة الهيكلية',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
      },
      {
        duration: '6 شهور',
        sessions: '12 حصة',
        title: 'تصميم المواقع',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      {
        duration: '9 شهور',
        sessions: '12 حصة',
        title: 'تطوير تطبيقات الموبايل',
        image: 'https://images.unsplash.com/photo-1573496130407-57329f01f769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
      },
      {
        duration: '12 شهر',
        sessions: '12 حصة',
        title: 'مشروع تقني متكامل',
        image: '/assets/illustrations/learning-hero.svg'
      }
    ],
    '7-8': [
      {
        duration: '3 شهور',
        sessions: '12 حصة',
        title: 'البرمجة المتقدمة',
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
      },
      {
        duration: '6 شهور',
        sessions: '12 حصة',
        title: 'قواعد البيانات',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1766&q=80'
      },
      {
        duration: '9 شهور',
        sessions: '12 حصة',
        title: 'تطوير الألعاب المتقدمة',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'
      },
      {
        duration: '12 شهر',
        sessions: '12 حصة',
        title: 'مشروع تقني احترافي',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      }
    ],
    '9-10': [
      {
        duration: '3 شهور',
        sessions: '12 حصة',
        title: 'أساسيات الذكاء الاصطناعي',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      {
        duration: '6 شهور',
        sessions: '12 حصة',
        title: 'تطوير الويب المتقدم',
        image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
      },
      {
        duration: '9 شهور',
        sessions: '12 حصة',
        title: 'تطوير التطبيقات السحابية',
        image: 'https://images.unsplash.com/photo-1573495612937-f22e7f442b79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
      },
      {
        duration: '12 شهر',
        sessions: '12 حصة',
        title: 'مشروع تقني ريادي',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      }
    ],
    '11-12': [
      {
        duration: '3 شهور',
        sessions: '12 حصة',
        title: 'تعلم الآلة',
        image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
      },
      {
        duration: '6 شهور',
        sessions: '12 حصة',
        title: 'تطوير برمجيات متكاملة',
        image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1747&q=80'
      },
      {
        duration: '9 شهور',
        sessions: '12 حصة',
        title: 'المشاريع الريادية التقنية',
        image: 'https://images.unsplash.com/photo-1576400883215-7083980b6193?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      },
      {
        duration: '12 شهر',
        sessions: '12 حصة',
        title: 'مشروع تخرج تقني',
        image: 'https://images.unsplash.com/photo-1601482438502-77a50a8f34ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80'
      }
    ]
  };

  const currentCourses = pathCourses[selectedGrade] || pathCourses['1-2'];

  return (
    <section className="py-16 bg-gray-50" id="learning-path">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">مسار التعلم الخاص بك</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            حدد صف/عمر الطالب لاستكشاف مسار التعلم الموصى به
          </p>
        </div>

        {/* Grade Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {gradeOptions.map((option) => (
            <button
              key={option.id}
              className={`rounded-full px-5 py-3 font-medium transition-colors ${
                selectedGrade === option.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedGrade(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Learning Path Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 right-[7.5rem] md:right-24 w-1 bg-blue-200 hidden md:block"></div>

          {/* Course Items */}
          {currentCourses.map((course, index) => (
            <div key={index} className="relative flex flex-col md:flex-row mb-12">
              {/* Timeline Dot (hidden on mobile) */}
              <div className="absolute right-[7.5rem] md:right-24 w-5 h-5 bg-blue-500 rounded-full -mr-2.5 mt-3 z-10 hidden md:block"></div>
              
              {/* Timeline Label */}
              <div className="w-full md:w-48 md:flex-shrink-0 text-center md:text-right pr-0 md:pr-24 rtl:md:translate-x-6 ltr:md:-translate-x-6 translate-y-5 mt-0 md:mt-1 mb-4 md:mb-0">
                <div className="font-bold text-blue-800">{course.duration}</div>
                <div className="text-sm text-gray-500">({course.sessions})</div>
              </div>
              
              {/* Course Card */}
              <div className="flex-grow bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mr-0 md:mr-12">
                <div className="flex flex-col sm:flex-row" dir="ltr">
                  <div className="w-full sm:w-2/3 p-4" dir="rtl">
                    <h3 className="font-bold text-lg text-gray-800">{course.title}</h3>
                    <p className="text-gray-600 mt-2">
                      دورة شاملة تغطي المفاهيم الأساسية بطريقة تفاعلية وممتعة
                    </p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                      عرض التفاصيل
                    </button>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-40 sm:h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;
