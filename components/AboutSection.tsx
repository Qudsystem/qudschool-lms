import useI18n from '../hooks/useI18n';

const AboutSection = () => {
  const { t } = useI18n();
  return (
    <section className="py-16 bg-white dark:bg-gray-800" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:ml-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                {t('about.title')}
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>{t('about.p3')}</p>
              </div>
            </div>

            <div className="md:w-1/2 mb-10 md:mb-0 overflow-hidden">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full z-0"></div>
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-yellow-100 dark:bg-yellow-900 rounded-full z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt={t('about.imageAlt')}
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

export default AboutSection;
