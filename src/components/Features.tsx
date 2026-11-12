import { useState, useEffect, useRef } from 'react';
import { Award, Book, Monitor, Users } from 'lucide-react';

const features = [
  {
    title: 'منصة تعليمية متكاملة',
    description: 'توفر كودسكول منصة تعليمية متكاملة تجمع بين التعلم الإلكتروني والأنشطة العملية',
    icon: <Monitor className="text-blue-600" size={36} />,
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
  {
    title: 'كادر تعليمي متميز',
    description: 'يضم فريق كودسكول نخبة من المعلمين المؤهلين ذوي الخبرة في مجال التعليم',
    icon: <Users className="text-blue-600" size={36} />,
    image: 'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
  },
  {
    title: 'مناهج دراسية متطورة',
    description: 'نقدم مناهج دراسية متطورة تواكب احتياجات سوق العمل وتنمي مهارات الطلاب',
    icon: <Book className="text-blue-600" size={36} />,
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
  },
  {
    title: 'شهادات معتمدة',
    description: 'نمنح الطلاب شهادات معتمدة تؤهلهم للالتحاق بأفضل الجامعات والوظائف',
    icon: <Award className="text-blue-600" size={36} />,
    image: 'https://images.unsplash.com/photo-1616628188540-925673e521f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
  },
];

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Observer for when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  // Auto rotate features 
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, features.length]);

  return (
    <section className="py-16 bg-white" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 overflow-hidden">
          <h2 className={`text-3xl font-bold text-gray-800 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            لماذا تختار كودسكول؟
          </h2>
          <p className={`text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            نسعى لتقديم تجربة تعليمية فريدة تجمع بين جودة المحتوى التعليمي وأحدث التقنيات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg overflow-hidden card-shadow hover:shadow-lg transition duration-500 ${
                activeFeature === index ? 'animate-pulse scale-105 shadow-lg' : ''
              } ${isVisible ? 'animate-scale-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end ${
                  activeFeature === index ? 'opacity-80' : 'opacity-50'
                } transition-opacity duration-300`}>
                  <h3 className="text-white text-xl font-bold p-4">{feature.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className={`mb-4 flex justify-center transition-transform duration-500 ${
                  activeFeature === index ? 'rotate-12 scale-110' : ''
                }`}>
                  {feature.icon}
                </div>
                <p className={`text-gray-600 text-center transition-all duration-500 ${
                  activeFeature === index ? 'text-blue-600 font-medium' : ''
                }`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
