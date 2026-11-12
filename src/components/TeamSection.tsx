import { Github, Linkedin, Twitter } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const teamMembers: TeamMember[] = [
    {
      name: "د. أحمد محمود",
      role: "المدير التنفيذي",
      bio: "خبير في علوم الحاسب مع أكثر من 15 عام خبرة في تعليم البرمجة للأطفال والشباب",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "م. سارة علي",
      role: "مديرة التطوير التعليمي",
      bio: "متخصصة في تطوير المناهج التعليمية الحديثة وتصميم تجارب التعلم التفاعلية",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "م. خالد عبدالله",
      role: "كبير المدربين",
      bio: "مطور برامج وخبير في تعليم البرمجة بأساليب إبداعية تناسب جميع الأعمار",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "م. نور محمد",
      role: "مدربة ذكاء اصطناعي",
      bio: "متخصصة في مجال الذكاء الاصطناعي وتعلم الآلة مع خبرة في تبسيط المفاهيم المعقدة للأطفال",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "م. يوسف كمال",
      role: "مدرب تطوير الألعاب",
      bio: "مطور ألعاب محترف مع شغف كبير لتعليم الأطفال أساسيات صناعة الألعاب وتصميمها",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "أ. ليلى أحمد",
      role: "مدربة المرحلة الابتدائية",
      bio: "متخصصة في تعليم البرمجة للأطفال في المرحلة الابتدائية باستخدام أساليب تفاعلية ومبتكرة",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      social: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
      }
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="team" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">فريق العمل المتميز</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            يضم فريق كودسكول نخبة من المعلمين والمطورين ذوي الخبرات المتميزة في مجالات البرمجة والتعليم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 ${
                isVisible ? 'animate-scale-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-1">{member.name}</h3>
                <p className="text-gray-500 mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4 space-x-reverse">
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition duration-300"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700 transition duration-300"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
