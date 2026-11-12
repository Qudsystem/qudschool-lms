const About = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:ml-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                رحلة تعليمية متكاملة لتعليم البرمجة للأطفال!
              </h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  كودسكول هو المكان الأمثل حيث يمكن للأطفال استكشاف عالم البرمجة! نحن المنصة
                  الرائدة لتعليم البرمجة للأطفال عبر الإنترنت، حيث نقدم دروساً أون لاين مع أفضل
                  مدربي البرمجة في العالم.
                </p>
                
                <p>
                  منذ عام 2018، قمنا بتمكين جيل جديد من القادة التقنيين. في كودسكول نقدم 
                  دروس البرمجة باستخدام طرق مبتكرة حيث نقوم بتدريس الذكاء الاصطناعي 
                  وتطوير التطبيقات وتطوير الألعاب، وغير ذلك.
                </p>
                
                <p>
                  مناهجنا متنوعة ومعتمدة دولياً، وهي مصممة بعناية لتعزيز التفكير الإبداعي 
                  والمهارات الأساسية ونحن هنا لبناء مستقبل مشرق للأطفال من خلال تقديم رحلة 
                  تعليمية متكاملة عبر الإنترنت.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2 mb-10 md:mb-0 overflow-hidden">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-32 h-32 bg-blue-100 rounded-full z-0"></div>
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-yellow-100 rounded-full z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="طلاب يتعلمون البرمجة في كودسكول" 
                  className="rounded-lg shadow-lg relative z-10 w-full object-cover h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
