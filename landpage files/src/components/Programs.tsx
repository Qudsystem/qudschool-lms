const programs = [
  {
    title: 'برنامج البرمجة التأسيسي',
    description: 'برنامج شامل يغطي المهارات الأساسية في البرمجة والتفكير المنطقي للمبتدئين',
    image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'المرحلة الابتدائية'
  },
  {
    title: 'برنامج تطوير الألعاب',
    description: 'يركز على تعليم تطوير ألعاب تفاعلية ممتعة باستخدام أدوات برمجية مناسبة للأطفال',
    image: '/assets/game-development-program.png',
    category: 'المرحلة الإعدادية'
  },
  {
    title: 'برنامج الذكاء الاصطناعي',
    description: 'يقدم مفاهيم الذكاء الاصطناعي وتطبيقاته بطريقة مبسطة تناسب الطلاب المتقدمين',
    image: '/assets/ai-classroom-program.png',
    category: 'المرحلة الثانوية'
  }
];

const Programs = () => {
  return (
    <section className="py-16 bg-gray-50" id="programs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">برامجنا التعليمية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مجموعة متنوعة من البرامج التعليمية المصممة لتلبية احتياجات الطلاب في مختلف المراحل الدراسية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden card-shadow hover:shadow-lg transition duration-300">
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                />
                <div className="absolute bottom-2 right-3 text-sm bg-blue-600 text-white px-3 py-1 rounded-full z-20">
                  {program.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300 flex items-center">
                  اكتشف المزيد
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            عرض جميع البرامج
          </button>
        </div>
      </div>
    </section>
  );
};

export default Programs;
