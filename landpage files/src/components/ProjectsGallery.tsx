import { useState, useEffect, useRef } from 'react';

// 15 مشروع مميز دون تكرار
const projects = [
  {
    id: 1,
    title: 'تطبيق ذكاء اصطناعي',
    description: 'تطبيق يستخدم الذكاء الاصطناعي لحل المشكلات البرمجية البسيطة',
    badges: ['ذكاء اصطناعي', 'برمجة'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1770&q=85'
  },
  {
    id: 2,
    title: 'روبوت تعليمي',
    description: 'برمجة روبوت تعليمي بسيط باستخدام Python',
    badges: ['روبوتات', 'برمجة'],
    image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80'
  },
  {
    id: 3,
    title: 'لعبة مغامرات',
    description: 'لعبة مغامرات تفاعلية مبرمجة باستخدام Scratch',
    badges: ['ألعاب', 'مغامرة'],
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
  },
  {
    id: 4,
    title: 'تطبيق موبايل تعليمي',
    description: 'تطبيق موبايل لتعليم الأطفال أساسيات البرمجة',
    badges: ['تطبيقات', 'موبايل'],
    image: 'https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    id: 5,
    title: 'مترجم ذكي',
    description: 'تطبيق يستخدم الذكاء الاصطناعي لترجمة النصوص بين اللغات',
    badges: ['ذكاء اصطناعي', 'لغات'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 6,
    title: 'موقع تفاعلي',
    description: 'تصميم وبرمجة موقع تفاعلي للتعلم الإلكتروني',
    badges: ['ويب', 'تفاعلي'],
    image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 7,
    title: 'محاكاة فيزيائية',
    description: 'برنامج محاكاة للتجارب الفيزيائية للطلاب في المدارس',
    badges: ['فيزياء', 'محاكاة'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 8,
    title: 'نظام إدارة مدرسية',
    description: 'تطبيق ويب لإدارة المدارس والفصول الدراسية والطلاب',
    badges: ['إدارة', 'تعليم'],
    image: 'https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 9,
    title: 'ألعاب تعليمية للرياضيات',
    description: 'مجموعة ألعاب لتعليم الرياضيات للمراحل الابتدائية بطريقة ممتعة',
    badges: ['رياضيات', 'ألعاب'],
    image: 'https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80'
  },
  {
    id: 10,
    title: 'نظام محادثة ذكي',
    description: 'روبوت محادثة ذكي لمساعدة الطلاب في الواجبات المدرسية',
    badges: ['ذكاء اصطناعي', 'تعليم'],
    image: 'https://images.unsplash.com/photo-1677442135568-6638e402f07b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
  },
  {
    id: 11,
    title: 'تطبيق للتعلم عن بعد',
    description: 'منصة متكاملة للتعلم عن بعد مع ميزات تفاعلية وجلسات مباشرة',
    badges: ['تعليم عن بعد', 'منصة'],
    image: 'https://images.unsplash.com/photo-1601482438502-77a50a8f34ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80'
  },
  {
    id: 12,
    title: 'نظام تحليل البيانات',
    description: 'أداة لتحليل البيانات وإنشاء تقارير ورسوم بيانية تفاعلية',
    badges: ['بيانات', 'تحليل'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 13,
    title: 'تطبيق الواقع المعزز',
    description: 'تطبيق تعليمي يستخدم تقنية الواقع المعزز لتعلم العلوم',
    badges: ['واقع معزز', 'علوم'],
    image: 'https://images.unsplash.com/photo-1617437454594-13738c8fcbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    id: 14,
    title: 'ألعاب برمجة للأطفال',
    description: 'مجموعة ألعاب مصممة لتعليم الأطفال مفاهيم البرمجة بطريقة ممتعة',
    badges: ['أطفال', 'برمجة'],
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
  },
  {
    id: 15,
    title: 'نظام إدارة المكتبات',
    description: 'نظام متكامل لإدارة المكتبات المدرسية والمحتوى الرقمي',
    badges: ['مكتبات', 'إدارة'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  isActive: boolean;
  index: number;
}

const ProjectCard = ({ project, isActive, index }: ProjectCardProps) => {
  return (
    <div 
      className={`project-slide absolute inset-0 transition-opacity duration-1000 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row h-full items-center bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500">
        <div className="w-full md:w-1/2 h-64 md:h-full relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 right-4 left-4 flex flex-wrap gap-2">
            {project.badges?.map((badge, idx) => (
              <span key={idx} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-3">{project.title}</h3>
          <p className="text-gray-600 mb-6 text-lg">{project.description}</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg self-start hover:bg-blue-700 transition-colors duration-300">
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectsGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const slideDuration = 6000; // 6 seconds per slide
  const progressUpdateInterval = 50; // Update progress every 50ms
  
  // Observer for when component is in viewport
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
  
  // Reset progress and start progress bar
  const resetProgress = () => {
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    if (!isPaused) {
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + (100 / (slideDuration / progressUpdateInterval));
        });
      }, progressUpdateInterval);
    }
  };
  
  // Start slideshow when visible
  useEffect(() => {
    if (!isVisible) return;
    
    startSlideshow();
    resetProgress();
    
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isVisible]);
  
  // Handle pause/play state changes
  useEffect(() => {
    if (isPaused) {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      startSlideshow();
      resetProgress();
    }
  }, [isPaused]);
  
  // Reset progress when changing slides
  useEffect(() => {
    resetProgress();
  }, [currentIndex]);
  
  const startSlideshow = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    
    slideIntervalRef.current = window.setInterval(() => {
      if (!isPaused) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);
      }
    }, slideDuration);
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };
  
  // Next/Previous slide functions
  const goToNextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % projects.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-16 bg-gray-50" id="projects" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">
            اكتشف أكثر من <span className="text-blue-600">+60,000</span> من مشاريع الطلاب
          </h2>
          <p className="text-gray-600 mt-4 mb-10">
            تصفح مشاريع مبرمجي كودسكول الآن في أكثر من عشرين دولة
          </p>
        </div>

        {/* Slideshow container */}
        <div 
          className={`relative mb-8 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main slideshow */}
          <div className="relative w-full h-[400px] md:h-[450px] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                isActive={currentIndex === index}
                index={index}
              />
            ))}
            
            {/* Controls overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
              <button 
                onClick={togglePause}
                className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors duration-300"
                aria-label={isPaused ? "تشغيل العرض" : "إيقاف العرض مؤقتًا"}
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                )}
              </button>
              
              <div className="bg-black/40 text-white text-sm px-3 py-1 rounded">
                {currentIndex + 1} / {projects.length}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-300 z-20"
              aria-label="المشروع السابق"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button 
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors duration-300 z-20"
              aria-label="المشروع التالي"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 z-20">
              <div 
                className="h-full bg-blue-600 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`انتقل إلى المشروع ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="py-3 px-6 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300">
            المزيد من المشاريع
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
