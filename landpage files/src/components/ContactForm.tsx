import { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ''
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [course, setCourse] = useState('البرمجة التأسيسية');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: 'تم استلام طلبك بنجاح! سيتواصل معك فريقنا قريبًا.'
      });
      setIsFormSubmitting(false);
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setCourse('البرمجة التأسيسية');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: null, message: '' });
      }, 5000);
    }, 1500);
  };

  const courseOptions = [
    'البرمجة التأسيسية',
    'تطوير الألعاب',
    'برمجة الروبوتات',
    'تصميم المواقع',
    'تطبيقات الموبايل',
    'الذكاء الاصطناعي'
  ];

  return (
    <section className="py-16 bg-white" id="contact-us" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار البرنامج المناسب لك أو لطفلك
          </p>
        </div>

        <div className="flex flex-col lg:flex-row max-w-5xl mx-auto bg-white rounded-[2rem] overflow-hidden shadow-lg">
          {/* Contact Info */}
          <div className="w-full lg:w-2/5 bg-blue-600 text-white p-8 rounded-t-[2rem] lg:rounded-s-[2rem] lg:rounded-e-none">
            <div className={`mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h3 className="text-2xl font-bold mb-4">معلومات الاتصال</h3>
              <p className="mb-6">نحن سعداء للغاية بالتواصل معك والإجابة على جميع استفساراتك</p>
            </div>

            <div className="space-y-6">
              <div className={`flex items-start transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '200ms' }}>
                <div className="mt-1 ml-3 bg-blue-500 p-2 rounded-full">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold">رقم الهاتف</h4>
                  <p>(+20) 01151858057</p>
                </div>
              </div>

              <div className={`flex items-start transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="mt-1 ml-3 bg-blue-500 p-2 rounded-full">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold">البريد الإلكتروني</h4>
                  <p>qudschool.edu@gmail.com</p>
                </div>
              </div>

              <div className={`flex items-start transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '400ms' }}>
                <div className="mt-1 ml-3 bg-blue-500 p-2 rounded-full">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold">العنوان</h4>
                  <p>المقر الرئيسي، شارع المدارس، القاهرة، مصر</p>
                </div>
              </div>
            </div>

            <div className={`mt-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '500ms' }}>
              <h4 className="font-bold mb-4">تابعنا على</h4>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.023 10.023 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.954 4.954 0 001.523 6.574 4.91 4.91 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.828 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.93 13.93 0 007.548 2.209c9.054 0 14.004-7.5 14.004-14.001 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.44.218-.938 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.98 0a6.8 6.8 0 0 1 5.22 2.18A42.17 42.17 0 0 1 24 3.9v17.8a6.8 6.8 0 0 1-2.18 5.22A6.8 6.8 0 0 1 16.6 24H7.38a6.8 6.8 0 0 1-5.22-2.18A6.8 6.8 0 0 1 0 16.6V7.38a6.8 6.8 0 0 1 2.18-5.22A6.8 6.8 0 0 1 7.4 0zM12 2.16c-2.67 0-3.01.01-4.06.06a7.42 7.42 0 0 0-2.44.47 4.69 4.69 0 0 0-1.79 1.16A4.66 4.66 0 0 0 2.55 5.6a7.32 7.32 0 0 0-.47 2.45c-.06 1.05-.06 1.38-.06 4.05s.01 3.01.06 4.06c.02.84.17 1.67.47 2.45.48 1.3 1.49 2.31 2.79 2.79.77.3 1.6.45 2.44.47 1.05.05 1.39.06 4.06.06s3.01-.01 4.06-.06a7.42 7.42 0 0 0 2.44-.47 4.66 4.66 0 0 0 1.77-1.16 4.66 4.66 0 0 0 1.16-1.77c.3-.78.45-1.61.47-2.45.05-1.05.06-1.38.06-4.06s-.01-3-.06-4.05a7.32 7.32 0 0 0-.47-2.45 4.66 4.66 0 0 0-1.16-1.77A4.66 4.66 0 0 0 18.5 2.63a7.32 7.32 0 0 0-2.45-.47c-1.05-.05-1.38-.06-4.05-.06zM12 5.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32zm0 2.16a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.4-2.56a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-3/5 p-8">
            <div className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">أرسل رسالة</h3>
              
              {formStatus.type && (
                <div className={`p-4 mb-6 rounded-[1.25rem] ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">الاسم</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="الاسم الكامل"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="بريدك الإلكتروني"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="رقم الهاتف"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="course" className="block text-gray-700 mb-2">البرنامج المطلوب</label>
                    <select
                      id="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {courseOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">الرسالة</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isFormSubmitting}
                  className={`w-full bg-blue-600 text-white px-6 py-3 rounded-full font-bold flex items-center justify-center hover:bg-blue-700 transition duration-300 ${
                    isFormSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isFormSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="ml-2" size={20} />
                      إرسال الرسالة
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
