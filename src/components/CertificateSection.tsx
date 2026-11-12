const CertificateSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-200 rounded-full z-0"></div>
                <div className="bg-white p-3 rounded-lg shadow-xl transform rotate-3 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                    alt="شهادة البرمجة من كودسكول" 
                    className="rounded-md w-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full z-0"></div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pr-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">احصل على شهادة معتمدة</h2>
              <p className="text-gray-600 mb-6">
                عند إكمال البرنامج التعليمي، يحصل الطالب على شهادة معتمدة تؤكد إتقانه للمهارات 
                والمفاهيم البرمجية التي تعلمها خلال الدورة.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>شهادة معترف بها في مجال التكنولوجيا</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>تضيف قيمة إلى السيرة الذاتية للطالب</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>إثبات للمهارات البرمجية التي تم اكتسابها</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>تساعد في التقديم للجامعات والبرامج الصيفية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
