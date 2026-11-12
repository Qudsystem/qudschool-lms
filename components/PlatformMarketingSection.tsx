import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from '../lucide-icons';
import useI18n from '../hooks/useI18n';

interface MarketingSlide {
  id: string;
  key: string;
  image: string;
  /** عرض الشهادة كاملة (object-contain) بدل قصّها */
  contain?: boolean;
}

const PlatformMarketingSection = () => {
  const { t, language } = useI18n();
  const lang: 'ar' | 'en' = language === 'en' ? 'en' : 'ar';
  // شهادة مطابقة للغة الحالية
  const certificateImage = lang === 'ar'
    ? '/assets/qudschool-certificate-ahmad-hussein.jpg'
    : '/assets/certificate-amr-mohamed-galal-cropped.png';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides: MarketingSlide[] = [
    { id: '1', key: 'platformMarketing.slide1', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop' },
    { id: '2', key: 'platformMarketing.slide2', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop' },
    { id: '3', key: 'platformMarketing.slide3', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop' },
    { id: '4', key: 'platformMarketing.slide4', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop' },
    { id: '5', key: 'platformMarketing.slide5', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop' },
    { id: '6', key: 'platformMarketing.slide6', image: certificateImage, contain: true },
    { id: '7', key: 'platformMarketing.slide7', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop' },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (pauseAnimation) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [pauseAnimation, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="platform-marketing">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t('platformMarketing.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            {t('platformMarketing.subtitle')}
          </p>
          <div className="flex justify-center">
            <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-100 text-sm px-4 py-1 rounded-full font-medium">
              {t('platformMarketing.studentsCount')}
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden mb-10"
          onMouseEnter={() => setPauseAnimation(true)}
          onMouseLeave={() => setPauseAnimation(false)}
          ref={carouselRef}
        >
          {/* Slide Counter */}
          <div className="absolute top-4 ltr:left-4 rtl:right-4 z-10 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentIndex + 1} / {slides.length}
          </div>

          {/* Main Slide */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <div className="mb-6">
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {t(`${currentSlide.key}.badge`)}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {t(`${currentSlide.key}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {t(`${currentSlide.key}.desc`)}
                  </p>
                </div>

                <button className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-fit">
                  {t('platformMarketing.learnMore')}
                  <ArrowRight 
                    size={18} 
                    className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180" 
                  />
                </button>
              </div>

              {/* Image Side */}
              <div className={`relative h-64 md:h-auto order-1 md:order-2 ${currentSlide.contain ? 'cert-image-bg' : ''}`}>
                <img
                  key={currentSlide.image}
                  src={currentSlide.image}
                  alt={t(`${currentSlide.key}.title`)}
                  className={`w-full h-full ${currentSlide.contain ? 'object-contain p-6 md:p-10 drop-shadow-[0_10px_30px_rgba(15,23,42,0.25)]' : 'object-cover'}`}
                  loading="lazy"
                />
                {!currentSlide.contain && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 ltr:left-2 rtl:right-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-all duration-300 z-10 group"
            aria-label={t('platformMarketing.previous')}
          >
            <ChevronDown 
              size={24} 
              className="ltr:rotate-90 rtl:-rotate-90 group-hover:scale-110 transition-transform" 
            />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 ltr:right-2 rtl:left-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg transition-all duration-300 z-10 group"
            aria-label={t('platformMarketing.next')}
          >
            <ChevronDown 
              size={24} 
              className="ltr:-rotate-90 rtl:rotate-90 group-hover:scale-110 transition-transform" 
            />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-3 bg-blue-600'
                  : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`${t('platformMarketing.goToSlide')} ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 border-2 border-blue-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
            {t('platformMarketing.exploreFeatures')}
            <ArrowRight 
              size={22} 
              className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300 rtl:rotate-180" 
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlatformMarketingSection;
