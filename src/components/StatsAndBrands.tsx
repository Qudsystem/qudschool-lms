const stats = [
  {
    value: '+6,000,000',
    label: 'ساعات تدريبية تم تقديمها'
  },
  {
    value: '+130 ألف خريج',
    label: 'خبرة في تعليم الأطفال'
  },
  {
    value: '4.9/5',
    label: 'معدل تقييم الطلاب لنا'
  },
  {
    value: '+250,000',
    label: 'أب وأم سعداء بتدريبهم معنا'
  }
];

const brands = [
  { name: 'TechCrunch', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.png' },
  { name: 'Forbes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/640px-Forbes_logo.svg.png' },
  { name: 'UCL', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f7/UcLogo.svg' },
  { name: 'Entrepreneur', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Entrepreneur-magazine-logo.png' }
];

const StatsAndBrands = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center text-gray-400 text-sm mb-4">كما ظهرنا في</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-8 md:h-10 object-contain opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsAndBrands;
