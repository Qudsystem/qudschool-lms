import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

const students = [
  {
    name: 'أمنية عصام',
    grade: 'الصف 7',
    country: 'مصر',
    project: 'تطبيق تعليمي',
    avatar: 'https://images.unsplash.com/photo-1517638083100-3f5eb3055a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    name: 'جنى مجدي',
    grade: 'الصف 6',
    country: 'مصر',
    project: 'لعبة تفاعلية',
    avatar: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
  },
  {
    name: 'عمر خالد',
    grade: 'الصف 7',
    country: 'مصر',
    project: 'موقع شخصي',
    avatar: 'https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'ياسين الفحام',
    grade: 'الصف 5',
    country: 'مصر',
    project: 'روبوت برمجي',
    avatar: 'https://images.unsplash.com/photo-1588691547381-c4379019d810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'سارة محمد',
    grade: 'الصف 8',
    country: 'مصر',
    project: 'تطبيق موبايل',
    avatar: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'مالك أحمد',
    grade: 'الصف 6',
    country: 'مصر',
    project: 'لعبة متاهة',
    avatar: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  }
];

const StudentShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Function to move to the next set of students
  const moveToNextSet = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (students.length - 2));
  };

  // Auto-scroll effect
  useEffect(() => {
    if (pauseAnimation) return;
    
    const interval = setInterval(() => {
      moveToNextSet();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [pauseAnimation]);

  // Get visible students (3 at a time)
  const visibleStudents = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % students.length;
    visibleStudents.push(students[index]);
  }

  return (
    <section className="py-16 bg-white" id="students">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تعرف معنا على مبرمجي المستقبل</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            يمكنك مشاهدة ما يصنعه مبرمجي المستقبل من سن 6:18 سنة    
          </p>
          <div className="flex justify-center">
            <div className="inline-block bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full font-medium">
              +60,000 مشروع للطلاب
            </div>
          </div>
        </div>

        <div 
          className="relative overflow-hidden mb-10"
          onMouseEnter={() => setPauseAnimation(true)}
          onMouseLeave={() => setPauseAnimation(false)}
          ref={carouselRef}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out" 
            style={{ width: '100%' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {visibleStudents.map((student, index) => (
                <div 
                  key={`${student.name}-${index}`} 
                  className="bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
                >
                  <div className="relative h-48">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {index === 0 ? (
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        بث مباشر
                      </div>
                    ) : (
                      <div className="absolute bottom-4 left-4 bg-orange-500 hover:bg-orange-600 transition-colors duration-300 rounded-full p-3 text-white cursor-pointer animate-pulse">
                        <Play fill="white" size={20} />
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 text-white text-sm">
                      <div className="font-bold">{student.project}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-blue-600">{student.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span>{student.grade}</span>
                        <span className="mx-2">•</span>
                        <span>{student.country}</span>
                        <img 
                          src="https://flagcdn.com/w20/eg.png" 
                          alt="Egypt flag" 
                          className="w-5 h-auto mr-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {students.slice(0, students.length - 2).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setPauseAnimation(true);
                  setTimeout(() => setPauseAnimation(false), 5000);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a href="#" className="py-3 px-6 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300">
            المزيد من الطلاب
          </a>
          <a href="#contact" className="py-3 px-6 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300">
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
};

export default StudentShowcase;
