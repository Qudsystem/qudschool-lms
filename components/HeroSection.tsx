import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';

const HeroSection: React.FC = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),linear-gradient(135deg,#f8fbff_0%,#eef6ff_52%,#ffffff_100%)] py-16 pt-24 md:py-24 dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),linear-gradient(135deg,#0b1220_0%,#111827_52%,#0b1220_100%)]">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl dark:bg-primary/20" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl dark:bg-secondary/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
          <div className={`order-2 z-10 w-full text-center transition-all duration-700 lg:order-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="mx-auto mb-6 max-w-xl text-center font-black tracking-[-0.04em]" dir="rtl">
              <span className="sr-only">{t('homePage.hero.title') || 'كود سكول — منصة تعليم البرمجة والذكاء الاصطناعي للأطفال'}</span>
              <span aria-hidden="true" className="block">
                <span className="mb-4 inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-2xl font-black tracking-[-0.04em] text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.12)] ring-1 ring-slate-200 md:text-3xl dark:bg-[#111c33] dark:text-white dark:shadow-[0_12px_30px_rgba(2,8,23,0.35)] dark:ring-white/5">
                  <span>جيل</span>
                  <span className="mx-2 text-[#2f7df4]">اليوم</span>
                </span>

                <span className="flex flex-wrap items-center justify-center gap-3 text-3xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl dark:text-white">
                  <span className="leading-none">هم</span>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1d63eb] to-[#3aa9ff] px-5 py-2 text-white shadow-[0_18px_40px_rgba(29,99,235,0.35)] md:px-7 md:py-3">
                    قادة التكنولوجيا
                  </span>
                  <span className="leading-none">غدًا</span>
                </span>
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-lg text-lg text-slate-600 md:text-xl dark:text-slate-300">
              {t('homePage.hero.description')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/courses" className="w-full sm:w-auto">
                <button className="flex w-full items-center justify-center rounded-full border-2 border-[#1f5fe3] bg-transparent px-8 py-3.5 text-base font-bold text-[#1f5fe3] shadow-[0_0_0_1px_rgba(31,95,227,0.08)] transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-500/10">
                  <span>{t('homePage.hero.exploreCourses') || 'المزيد من الطلاب'}</span>
                  <svg className="ltr:ml-2 rtl:mr-2 h-5 w-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>

              <Link to="/auth" className="w-full sm:w-auto">
                <button className="w-full rounded-full bg-[#2ecf9a] px-8 py-3.5 text-base font-bold text-white shadow-[0_14px_28px_rgba(46,207,154,0.28)] transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#26bb8d] sm:w-auto">
                  {t('homePage.hero.getStarted') || 'تواصل معنا'}
                </button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-primary/80 to-secondary/80 text-xs font-bold text-white shadow-md dark:border-slate-900">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white">2,000+</span> {t('homePage.hero.userCount')}
              </p>
            </div>
          </div>

          {/* Brand image column */}
          <div className={`relative order-1 w-full transition-all duration-1000 delay-200 lg:order-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mx-auto max-w-xl">
              {!imgError ? (
                <img
                  src="/assets/qudschool-kids-hero.png"
                  alt="طلاب QudSchool يتعلمون البرمجة والذكاء الاصطناعي في بيئة تفاعلية"
                  onError={() => setImgError(true)}
                  className="h-auto w-full object-contain rounded-3xl"
                  width={521}
                  height={479}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white/60 p-8 shadow-none dark:bg-slate-900/60">
                  <div className="text-5xl font-black tracking-tight">
                    <span className="text-[#4285F4]">Q</span>
                    <span className="text-[#EA4335]">u</span>
                    <span className="text-[#FBBC05]">d</span>
                    <span className="text-[#34A853]">S</span>
                    <span className="text-[#EA4335]">c</span>
                    <span className="text-[#4285F4]">h</span>
                    <span className="text-[#34A853]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#EA4335]">l</span>
                  </div>
                  <div className="text-xl font-bold text-gray-500 dark:text-gray-400">كودسكول</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
