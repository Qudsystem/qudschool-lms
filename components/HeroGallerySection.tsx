import React, { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, TrendingUp, Play, Pause, MonitorPlay } from 'lucide-react';
import useI18n from '../hooks/useI18n';
import useInView from '../hooks/useInView';
import AnimatedCounter from './AnimatedCounter';

const HeroGallerySection: React.FC = () => {
  const { t } = useI18n();
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.15 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const heroImages = [
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80',
    '/assets/hero-qudschool-ai.png',
    'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?auto=format&fit=crop&w=1200&q=80',
  ];

  const slideDuration = 5000;
  const progressUpdateInterval = 50;

  const resetProgress = () => {
    setProgress(0);
    if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    if (!isPaused) {
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 100 / (slideDuration / progressUpdateInterval)));
      }, progressUpdateInterval);
    }
  };

  const startSlideshow = () => {
    if (slideIntervalRef.current) window.clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = window.setInterval(() => {
      if (!isPaused) setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, slideDuration);
  };

  const goToSlide = (index: number) => { setCurrentImageIndex(index); resetProgress(); };
  const togglePause = () => setIsPaused(prev => !prev);

  useEffect(() => {
    startSlideshow();
    resetProgress();
    return () => {
      if (slideIntervalRef.current) window.clearInterval(slideIntervalRef.current);
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  useEffect(() => { resetProgress(); }, [currentImageIndex]);

  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    } else {
      resetProgress();
    }
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToSlide((currentImageIndex + 1) % heroImages.length);
      else if (e.key === 'ArrowLeft') goToSlide((currentImageIndex - 1 + heroImages.length) % heroImages.length);
      else if (e.key === ' ') togglePause();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);

  const stats = [
    { icon: GraduationCap, end: 12, suffix: 'K+', labelKey: 'homePage.heroGallery.stat.students', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, end: 180, suffix: '+', labelKey: 'homePage.heroGallery.stat.mentors', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, end: 94, suffix: '%', labelKey: 'homePage.heroGallery.stat.successRate', color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_35%),linear-gradient(135deg,#f8fbff_0%,#eef6ff_45%,#ffffff_100%)] py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(135deg,#0b1220_0%,#111827_45%,#0f172a_100%)] md:py-24" ref={sectionRef}>
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl dark:bg-primary/20" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl dark:bg-secondary/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          {/* Heading */}
          <div className={`mb-12 text-center transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm dark:border-primary/30 dark:bg-slate-900/70 dark:text-primary-light">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(45,212,191,0.7)] animate-pulse" />
              {t('homePage.heroGallery.badge')}
            </div>
            <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-black leading-tight text-slate-900 dark:text-white md:text-4xl">
              {t('homePage.heroGallery.title')}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-300">
              {t('homePage.heroGallery.subtitle')}
            </p>
          </div>

          {/* Media card */}
          <div className={`relative w-full transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/50 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/40">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
                <div className="relative h-[420px] w-full overflow-hidden sm:h-[500px]">
                  {heroImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={t('homePage.heroGallery.imageAlt')}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/20 to-primary/40" />

                  {/* Live badge */}
                  <div className="absolute left-5 top-5 rounded-2xl border border-white/20 bg-slate-950/50 px-4 py-2.5 text-white shadow-xl backdrop-blur-md">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      {t('homePage.heroGallery.liveCohort')}
                    </p>
                    <p className="mt-1 text-lg font-bold">{t('homePage.heroGallery.cohortTitle')}</p>
                  </div>

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePause}
                      aria-label={isPaused ? t('homePage.heroGallery.play') : t('homePage.heroGallery.pause')}
                      className="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20"
                    >
                      {isPaused ? <Play className="h-8 w-8 ltr:ml-1 rtl:mr-1" fill="currentColor" /> : <Pause className="h-8 w-8" fill="currentColor" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-lg shadow-slate-200/60 backdrop-blur-sm dark:bg-slate-900/80 dark:shadow-none">
                <button
                  onClick={togglePause}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition hover:bg-primary hover:text-white dark:bg-primary/15 dark:text-primary-light"
                  aria-label={isPaused ? t('homePage.heroGallery.play') : t('homePage.heroGallery.pause')}
                >
                  {isPaused ? (
                    <Play className="h-5 w-5 ltr:ml-0.5 rtl:mr-0.5" fill="currentColor" />
                  ) : (
                    <Pause className="h-5 w-5" fill="currentColor" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{
                        transform: `scaleX(${progress / 100})`,
                        transition: isPaused ? 'none' : 'transform 50ms linear',
                        transformOrigin: 'left center',
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {heroImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 w-2.5 overflow-hidden rounded-full transition ${currentImageIndex === index ? 'ring-2 ring-primary ring-offset-1 dark:ring-offset-slate-900' : 'opacity-60 hover:opacity-100'}`}
                      aria-label={`${t('homePage.heroGallery.goToSlide')} ${index + 1}`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.labelKey}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/80 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                  <div className={`absolute inset-x-0 -top-10 mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30`} />
                  <div className={`mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    {t(stat.labelKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroGallerySection;
