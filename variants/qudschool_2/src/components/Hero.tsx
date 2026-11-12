import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Pause, Play } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
    "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    "https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ];

  const slideDuration = 5000; // 5 seconds per slide
  const progressUpdateInterval = 50; // Update progress every 50ms for smooth progress bar

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

  const startSlideshow = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    
    slideIntervalRef.current = window.setInterval(() => {
      if (!isPaused) {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }
    }, slideDuration);
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
    resetProgress();
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Initialize slideshow when component mounts
  useEffect(() => {
    setIsVisible(true);
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
  }, []);

  // Reset progress when changing slides
  useEffect(() => {
    resetProgress();
  }, [currentImageIndex]);

  // Handle pause/play state changes
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    } else {
      resetProgress();
    }
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToSlide((currentImageIndex + 1) % heroImages.length);
      } else if (e.key === 'ArrowLeft') {
        goToSlide((currentImageIndex - 1 + heroImages.length) % heroImages.length);
      } else if (e.key === ' ') {
        togglePause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex]);

  return (
    <section className="hero-gradient text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 
              className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              تعلم مع كودسكول
              <br />
              <span className="text-yellow-300 animate-pulse">المستقبل يبدأ من هنا</span>
            </h1>
            <p 
              className={`text-lg md:text-xl mb-6 opacity-90 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              نقدم أفضل البرامج التعليمية لمساعدة الطلاب على تحقيق التفوق في عالم البرمجة
              وتنمية مهاراتهم التقنية في بيئة تعليمية حديثة
            </p>
            <div 
              className={`flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <button className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition duration-300 hover-expand">
                تواصل معنا
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition duration-300 flex items-center justify-center group">
                استكشف البرامج
                <ArrowLeft className="mr-2 group-hover:translate-x-[-5px] transition-transform duration-300" size={20} />
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full opacity-70 blur-md animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-70 blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Image carousel */}
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                {heroImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`طلاب يتعلمون البرمجة ${index + 1}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-lg ${
                      currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  />
                ))}
                
                {/* Control buttons */}
                <div className="absolute top-4 left-4 z-20">
                  <button 
                    onClick={togglePause}
                    className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors duration-300"
                    aria-label={isPaused ? "تشغيل العرض" : "إيقاف العرض مؤقتًا"}
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                </div>
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                  {heroImages.map((_, index) => (
                    <button 
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={() => goToSlide(index)}
                      aria-label={`الانتقال إلى الصورة ${index + 1}`}
                      aria-current={currentImageIndex === index ? "true" : "false"}
                    />
                  ))}
                </div>
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-20">
                  <div 
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Slideshow counter */}
              <div className="absolute top-4 right-4 bg-black/40 text-white text-sm px-2 py-1 rounded z-20">
                {currentImageIndex + 1} / {heroImages.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
