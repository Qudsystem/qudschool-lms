import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, ChevronDown } from 'lucide-react';
import useI18n from '../hooks/useI18n';

const ContactFormSection = () => {
  const { t } = useI18n();
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ''
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [course, setCourse] = useState('contact.course.foundational');

  const courseOptions = [
    'contact.course.foundational',
    'contact.course.games',
    'contact.course.robotics',
    'contact.course.web',
    'contact.course.mobile',
    'contact.course.ai',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setTimeout(() => {
      setFormStatus({ type: 'success', message: t('contact.form.success') });
      setIsFormSubmitting(false);
      setName(''); setEmail(''); setPhone(''); setMessage('');
      setCourse('contact.course.foundational');
      setTimeout(() => setFormStatus({ type: null, message: '' }), 5000);
    }, 1500);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="contact-us" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-lg">
          {/* Contact Info */}
          <div className="w-full lg:w-2/5 bg-blue-600 text-white p-8 rounded-t-[2rem] lg:rounded-s-[2rem] lg:rounded-e-none">
            <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-2xl font-bold mb-4">{t('contact.info.title')}</h3>
              <p className="mb-6">{t('contact.info.desc')}</p>
            </div>

            <div className="space-y-6">
              <div className={`flex items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
                <div className="mt-1 ltr:mr-3 rtl:ml-3 bg-blue-500 p-2 rounded-full"><Phone size={20} /></div>
                <div>
                  <h4 className="font-semibold mb-1">{t('contact.phone')}</h4>
                  <p className="text-blue-100">(+20) 01151858057</p>
                </div>
              </div>

              <div className={`flex items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
                <div className="mt-1 ltr:mr-3 rtl:ml-3 bg-blue-500 p-2 rounded-full"><Mail size={20} /></div>
                <div>
                  <h4 className="font-semibold mb-1">{t('contact.email')}</h4>
                  <p className="text-blue-100">qudschool.edu@gmail.com</p>
                </div>
              </div>

              <div className={`flex items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
                <div className="mt-1 ltr:mr-3 rtl:ml-3 bg-blue-500 p-2 rounded-full"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-semibold mb-1">{t('contact.address')}</h4>
                  <p className="text-blue-100">{t('contact.address.line1')}</p>
                  <p className="text-blue-100">{t('contact.address.line2')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-3/5 p-8 rounded-b-[2rem] lg:rounded-e-[2rem] lg:rounded-s-none">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.name')}</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('contact.form.namePlaceholder')} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.email')}</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@email.com" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.phone')}</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent rtl:text-right"
                  placeholder={t('contact.form.phonePlaceholder')} />
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.program')}</label>
                <div className="relative">
                  <select id="course" value={course} onChange={(e) => setCourse(e.target.value)}
                    className="w-full appearance-none px-4 py-2 ltr:pr-10 rtl:pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {courseOptions.map((option, index) => (
                      <option key={index} value={option}>{t(option)}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 text-gray-500 dark:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('contact.form.message')}</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={t('contact.form.messagePlaceholder')} />
              </div>

              <button type="submit" disabled={isFormSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400 hover-expand">
                {isFormSubmitting ? (
                  <span>{t('contact.form.sending')}</span>
                ) : (
                  <>
                    <Send size={20} className="ltr:mr-2 rtl:ml-2" />
                    <span>{t('contact.form.send')}</span>
                  </>
                )}
              </button>

              {formStatus.type && (
                <div className={`p-4 rounded-[1.5rem] text-center ${formStatus.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
