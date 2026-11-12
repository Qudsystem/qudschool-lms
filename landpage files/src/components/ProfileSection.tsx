const ProfileSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            كل طالب يعمل على إنشاء ملف شخصي
            <br />
            جاهز لمستقبله المهني
          </h2>
          
          <p className="text-lg text-gray-600 mb-10">
            الملف مثل موقعك الشخصي، يطور مهاراتك، مشاريعك، وشهاداتك. خزنه
            في أي وقت وشاركه مع الكلية وبرامج الصيف.
          </p>
          
          <div className="mt-12 relative">
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-blue-100 rounded-full opacity-70 z-0"></div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-yellow-100 rounded-full opacity-70 z-0"></div>
            <div className="relative z-10">
              <img 
                src="/assets/student-portfolio.jpg" 
                alt="ملف شخصي مهني للطالب" 
                className="rounded-lg shadow-xl mx-auto max-h-[480px] object-cover"
              />
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300 relative overflow-hidden group">
              <span className="relative z-10">ابدأ رحلتك الآن</span>
              <div className="absolute inset-0 h-full w-0 bg-blue-700 transition-all duration-300 group-hover:w-full"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
