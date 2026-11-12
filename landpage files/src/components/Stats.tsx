const stats = [
  { value: '5000+', label: 'طالب' },
  { value: '50+', label: 'مدرس' },
  { value: '25+', label: 'برنامج' },
  { value: '15+', label: 'فرع' }
];

const Stats = () => {
  return (
    <section className="hero-gradient text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
