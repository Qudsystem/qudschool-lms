import useI18n from '../hooks/useI18n';

const programKeys = [
  { key: 'programs.item1', image: '/assets/programming-primary-stage.png' },
  { key: 'programs.item2', image: '/assets/game-development-program.png' },
  { key: 'programs.item3', image: '/assets/ai-classroom-program.png' },
];

const ProgramsSection = () => {
  const { t } = useI18n();
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800" id="programs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('programs.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('programs.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programKeys.map((program, index) => {
            const title = t(`${program.key}.title`);
            return (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img 
                    src={program.image} 
                    alt={title} 
                    className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                  />
                  <div className="absolute bottom-2 ltr:right-3 rtl:left-3 text-sm bg-blue-600 text-white px-3 py-1 rounded-full z-20">
                    {t(`${program.key}.category`)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t(`${program.key}.desc`)}</p>
                  <button className="inline-flex items-center rounded-full px-4 py-2 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 dark:hover:text-blue-300 transition duration-300">
                    {t('programs.learnMore')}
                    <svg className="w-4 h-4 ltr:ml-1 rtl:mr-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition duration-300 hover-expand">
            {t('programs.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
