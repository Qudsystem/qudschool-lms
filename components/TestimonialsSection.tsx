import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import useInView from '../hooks/useInView';
import AnimatedCounter from './AnimatedCounter';
import StarRating from './StarRating';
import { richTestimonials, RichTestimonial } from '../data/testimonials';

/* صورة رمزية مولّدة محلياً (بدون اعتماد على شبكة) */
const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&fontFamily=Arial`;

const TestimonialCard: React.FC<{ item: RichTestimonial; index: number; lang: 'ar' | 'en' }> = ({ item, index, lang }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
      className={`group h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatarUrl(item.avatarSeed)}
          alt={item.name[lang]}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
          loading="lazy"
        />
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white truncate">{item.name[lang]}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.role[lang]}</p>
        </div>
      </div>
      <StarRating rating={item.rating} />
      <blockquote className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>"{item.quote[lang]}"</p>
      </blockquote>
      <p className="mt-4 text-xs font-semibold text-gray-400 dark:text-gray-500">
        {item.source[lang]}
      </p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { t, language } = useI18n();
  const lang: 'ar' | 'en' = language === 'en' ? 'en' : 'ar';

  /* نعرض عدداً محدوداً فقط في الصفحة الرئيسية */
  const previewItems = useMemo(() => richTestimonials.slice(0, 6), []);

  const statsRef = useInView<HTMLDivElement>({ once: true, threshold: 0.3 });

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Animated aggregate stats */}
        <div
          ref={statsRef.ref}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 transition-all duration-700 ${
            statsRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 text-center shadow-md border border-gray-100 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl font-black text-primary dark:text-primary-light">
              <AnimatedCounter end={4.9} decimals={1} />
              <span className="text-xl"> / 5.0</span>
            </div>
            <StarRating rating={4.9} className="justify-center mt-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('testimonials.reviewsFrom')}</p>
          </div>
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 text-center shadow-md border border-gray-100 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl font-black text-primary dark:text-primary-light">
              <AnimatedCounter end={1000} suffix="+" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {t('testimonials.verifiedReviews')}
            </p>
          </div>
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 text-center shadow-md border border-gray-100 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl font-black text-primary dark:text-primary-light">
              <AnimatedCounter end={100} suffix="+" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('testimonials.successStories')}</p>
          </div>
        </div>

        {/* Preview grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewItems.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} lang={lang} />
          ))}
        </div>

        {/* View all -> navigates to full testimonials page */}
        <div className="text-center mt-12">
          <Link
            to="/success-stories"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>{t('testimonials.viewAllStories')}</span>
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
