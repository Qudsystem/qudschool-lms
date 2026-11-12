import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useI18n from '../hooks/useI18n';

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
      className={`border border-gray-200 dark:border-gray-700 rounded-[1.5rem] mb-4 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <button
        className={`w-full flex items-center justify-between p-4 rtl:text-right ltr:text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isOpen ? 'bg-blue-50 dark:bg-blue-900' : 'bg-white dark:bg-gray-800'}`}
        onClick={toggleOpen}
      >
        <span className={`text-blue-600 dark:text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </span>
        <h3 className={`text-lg font-medium ${isOpen ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-gray-100'} transition-colors duration-300`}>
          {question}
        </h3>
      </button>
      
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-[1.5rem]">
          <p className="text-gray-700 dark:text-gray-300">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [autoOpenIndex, setAutoOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [1, 2, 3, 4, 5, 6].map(n => ({
    question: t(`faq.q${n}`),
    answer: t(`faq.a${n}`),
  }));

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      if (openIndex === null) {
        setOpenIndex(autoOpenIndex);
        setAutoOpenIndex((prev) => (prev + 1) % faqItems.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible, autoOpenIndex, openIndex, faqItems.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {t('faq.title')}
          </h2>
          <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            {t('faq.subtitle')}
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

export default FAQSection;
