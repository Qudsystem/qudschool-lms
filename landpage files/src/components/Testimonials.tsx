const testimonials = [
  {
    text: 'تجربتي مع كودسكول كانت رائعة بكل المقاييس. ساعدني المعلمون على تحسين مستواي الدراسي بشكل ملحوظ',
    name: 'أحمد محمود',
    role: 'طالب في المرحلة الثانوية',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    text: 'المناهج الدراسية في كودسكول متطورة وتواكب احتياجات سوق العمل. أشعر بالثقة في مستقبلي المهني',
    name: 'نورا علي',
    role: 'خريجة جامعية',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    text: 'كأحد أولياء الأمور، أنا سعيد جدًا بالتقدم الذي أحرزه ابني في كودسكول. الكادر التعليمي متميز والبيئة محفزة',
    name: 'محمد سامي',
    role: 'ولي أمر',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">آراء طلابنا وأولياء الأمور</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نفخر بما يقوله طلابنا وأولياء الأمور عن تجربتهم مع كودسكول
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 card-shadow">
              <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
