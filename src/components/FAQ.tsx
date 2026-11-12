import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  animationDelay: number;
  isVisible: boolean;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, animationDelay, isVisible }: FAQItemProps) => {
  return (
    <div 
      className={`border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <button
        className={`w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 transition-colors ${
          isOpen ? 'bg-blue-50' : 'bg-white'
        }`}
        onClick={toggleOpen}
      >
        <span className={`text-blue-600 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}>
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
        <h3 className={`text-lg font-medium ${
          isOpen ? 'text-blue-700' : 'text-gray-800'
        } transition-colors duration-300`}>
          {question}
        </h3>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoOpenIndex, setAutoOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Auto-open questions in sequence
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      if (openIndex === null) {
        setOpenIndex(autoOpenIndex);
        setAutoOpenIndex((prev) => (prev + 1) % faqItems.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible, autoOpenIndex, openIndex]);

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

  const faqItems = [
    {
      question: 'ما هو العمر المناسب لتعلم البرمجة؟',
      answer: 'يمكن للأطفال بدء تعلم البرمجة من سن 6 سنوات. نقدم برامج مختلفة تناسب كل فئة عمرية وتتدرج في المستويات بما يتناسب مع قدراتهم ومهاراتهم.'
    },
    {
      question: 'ما هو نظام تعليم البرمجة في كودسكول للأطفال؟',
      answer: 'نعتمد نظاماً تعليمياً متكاملاً يجمع بين الدروس المباشرة عبر الإنترنت والتطبيقات العملية والمشاريع التفاعلية، ويشرف على تدريب الطلاب مدربون محترفون ذوو خبرة واسعة في مجال تعليم البرمجة للأطفال.'
    },
    {
      question: 'ما الذي يتعلمه الأطفال في رحلتهم التعليمية مع البرمجة؟',
      answer: 'يتعلم الأطفال أساسيات البرمجة والتفكير المنطقي وحل المشكلات وتطوير الألعاب والتطبيقات والذكاء الاصطناعي، بالإضافة إلى مهارات القرن الـ21 مثل العمل الجماعي والإبداع والتواصل.'
    },
    {
      question: 'هل تطوير الألعاب جزء من البرمجة؟',
      answer: 'نعم، تطوير الألعاب هو جزء أساسي من مناهجنا التعليمية. نستخدم تطوير الألعاب كوسيلة ممتعة لتعليم البرمجة حيث يتعلم الطلاب المفاهيم البرمجية من خلال إنشاء ألعابهم الخاصة.'
    },
    {
      question: 'هل البرمجة من المواد صعبة التعليم؟',
      answer: 'ليست صعبة عندما تُقدم بطريقة مناسبة لعمر الطفل. نحن نقدم المفاهيم البرمجية بأسلوب مبسط وممتع يتناسب مع كل فئة عمرية، باستخدام لغات برمجة بصرية سهلة للأطفال الصغار ونتدرج معهم.'
    },
    {
      question: 'هل يستطيع طفل في عمر السادسة أن يكتب أكواد؟',
      answer: 'نعم، يمكن للأطفال في عمر السادسة البدء في تعلم البرمجة باستخدام لغات البرمجة البصرية مثل Scratch التي تعتمد على السحب والإفلات، وتمكنهم من فهم المفاهيم البرمجية الأساسية دون الحاجة لكتابة أكواد نصية.'
    },
    {
      question: 'هل يمكنني تعلم البرمجة بنفسي؟',
      answer: 'نعم، نقدم دورات تعليمية ذاتية مع دعم فني مستمر ومواد تعليمية تفاعلية تساعد المتعلمين على تطوير مهاراتهم البرمجية بشكل ذاتي وفقًا لوتيرتهم الخاصة.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="faq" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            إليك إجابات على أكثر الأسئلة شيوعًا حول برامجنا التعليمية في كودسكول
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleQuestion(index)}
              animationDelay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
