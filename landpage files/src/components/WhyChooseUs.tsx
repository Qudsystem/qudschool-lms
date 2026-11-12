import { useState, useEffect, useRef } from 'react';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const gridItems = [
    { id: 1, img: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', title: 'تعلم الألعاب' },
    { id: 2, img: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80', title: 'تطبيقات تفاعلية' },
    { id: 3, img: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80', title: 'مشاريع برمجية' },
    { id: 4, img: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', title: 'علوم الحاسب' },
    { id: 5, img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', title: 'تفكير منطقي' },
    { id: 6, img: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', title: 'تقنيات الذكاء' },
    { id: 7, img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', title: 'تطوير ألعاب' },
    { id: 8, img: 'https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80', title: 'تطبيقات ويب' },
    { id: 9, img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80', title: 'روبوتات برمجية' },
  ];

  // Observer for when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
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
  
  // Cycle through items to highlight
  useEffect(() => {
    if (!isVisible || isHovering) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % gridItems.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isVisible, isHovering, gridItems.length]);

  // Animated background colors
  const [bgColors, setBgColors] = useState({
    circle1: 'bg-yellow-300',
    circle2: 'bg-blue-500'
  });

  // Rotate background colors
  useEffect(() => {
    if (!isVisible) return;
    
    const colors = [
      { circle1: 'bg-yellow-300', circle2: 'bg-blue-500' },
      { circle1: 'bg-blue-300', circle2: 'bg-green-500' },
      { circle1: 'bg-purple-300', circle2: 'bg-pink-500' },
      { circle1: 'bg-red-300', circle2: 'bg-orange-500' }
    ];
    
    let colorIndex = 0;
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setBgColors(colors[colorIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section className="py-16 bg-white" id="why-choose-us" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold text-gray-800 mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            لماذا كودسكول؟
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div 
                className={`w-64 h-64 ${bgColors.circle1} rounded-full absolute -z-10 right-0 -top-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-70 translate-y-0 animate-pulse' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms', animationDuration: '3s' }}
              ></div>
              <img 
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="طالب يستخدم منصة كودسكول" 
                className={`relative z-10 rounded-lg shadow-lg transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0 animate-float' : 'opacity-0 translate-x-20'
                }`}
                style={{ animationDuration: '4s' }}
              />
              <div 
                className={`w-24 h-24 ${bgColors.circle2} rounded-full absolute -z-10 left-0 bottom-10 transition-all duration-1000 ${
                  isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '500ms', animationDuration: '4s' }}
              ></div>
            </div>
          </div>
          <div className="md:w-1/2 md:pr-12">
            <h3 
              className={`text-2xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              خطة مهنية طويلة المدى للبرمجة
            </h3>
            <h4 
              className={`text-xl font-bold text-blue-600 mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              مع رؤية متكاملة لتنمية طفلك
            </h4>
            <p 
              className={`text-gray-600 mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              نتبع تقدم إبنك لحظة بلحظة. احصل على متابعة دورية من المدرب كل حصة.
            </p>

            <div 
              className={`grid grid-cols-3 gap-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {gridItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`bg-gray-100 rounded-lg p-2 overflow-hidden transition-all duration-500 cursor-pointer ${
                    activeIndex === index ? 'transform scale-110 shadow-md bg-blue-50 ring-2 ring-blue-500 animate-glow' : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className={`w-full h-16 object-cover rounded transition-transform duration-700 ${
                        activeIndex === index ? 'scale-110' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center">
                      <span className={`text-white text-xs font-bold pb-1 transition-all duration-300 ${
                        activeIndex === index ? 'scale-110' : ''
                      }`}>
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
