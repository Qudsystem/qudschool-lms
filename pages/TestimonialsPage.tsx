import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, Trophy, TrendingUp, Code, Briefcase, Star, ArrowRight, MapPin, Calendar } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';

export interface CaseStudy {
  id: string;
  nameKey: string;
  ageKey: string;
  locationKey: string;
  programKey: string;
  durationKey: string;
  image: string;
  quoteKey: string;
  beforeKey: string;
  afterKey: string;
  achievementKeys: string[];
  outcomeKey: string;
  linkedCourse: string;
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ahmad-galal',
    nameKey: 'caseStudies.cs1.name',
    ageKey: 'caseStudies.cs1.age',
    locationKey: 'caseStudies.cs1.location',
    programKey: 'caseStudies.cs1.program',
    durationKey: 'caseStudies.cs1.duration',
    image: '/assets/qudschool-certificate-ahmad-galal.png',
    quoteKey: 'caseStudies.cs1.quote',
    beforeKey: 'caseStudies.cs1.before',
    afterKey: 'caseStudies.cs1.after',
    achievementKeys: ['caseStudies.cs1.a1', 'caseStudies.cs1.a2', 'caseStudies.cs1.a3'],
    outcomeKey: 'caseStudies.cs1.outcome',
    linkedCourse: '/courses',
    featured: true,
  },
  {
    id: 'amr-mohamed',
    nameKey: 'caseStudies.cs2.name',
    ageKey: 'caseStudies.cs2.age',
    locationKey: 'caseStudies.cs2.location',
    programKey: 'caseStudies.cs2.program',
    durationKey: 'caseStudies.cs2.duration',
    image: '/assets/certificate-amr-mohamed-galal.png',
    quoteKey: 'caseStudies.cs2.quote',
    beforeKey: 'caseStudies.cs2.before',
    afterKey: 'caseStudies.cs2.after',
    achievementKeys: ['caseStudies.cs2.a1', 'caseStudies.cs2.a2', 'caseStudies.cs2.a3'],
    outcomeKey: 'caseStudies.cs2.outcome',
    linkedCourse: '/courses',
  },
  {
    id: 'ahmad-hussein',
    nameKey: 'caseStudies.cs3.name',
    ageKey: 'caseStudies.cs3.age',
    locationKey: 'caseStudies.cs3.location',
    programKey: 'caseStudies.cs3.program',
    durationKey: 'caseStudies.cs3.duration',
    image: '/assets/qudschool-certificate-ahmad-hussein.jpg',
    quoteKey: 'caseStudies.cs3.quote',
    beforeKey: 'caseStudies.cs3.before',
    afterKey: 'caseStudies.cs3.after',
    achievementKeys: ['caseStudies.cs3.a1', 'caseStudies.cs3.a2', 'caseStudies.cs3.a3'],
    outcomeKey: 'caseStudies.cs3.outcome',
    linkedCourse: '/courses',
  },
];

const TestimonialsPage: React.FC = () => {
  const { t } = useI18n();

  useSEO({
    title: 'قصص النجاح ودراسات الحالة',
    description: 'قصص نجاح حقيقية من طلاب كود سكول: من البدايات إلى الإنجازات، مع تفاصيل المشاريع والاعتمادات والأثر.',
    path: '/success-stories',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'QudSchool Success Stories',
      url: 'https://qudschool.com/success-stories',
      inLanguage: 'ar',
      itemListElement: CASE_STUDIES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Person',
          name: t(c.nameKey),
          description: t(c.quoteKey),
          affiliation: { '@id': 'https://qudschool.com/#organization' },
        },
      })),
    },
  });

  const featured = CASE_STUDIES.find((c) => c.featured);
  const rest = CASE_STUDIES.filter((c) => !c.featured);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="mx-auto mb-6 h-14 w-14 text-yellow-300" aria-hidden="true" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">{t('caseStudies.hero.title')}</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">{t('caseStudies.hero.subtitle')}</p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { v: '2,000+', k: 'caseStudies.hero.stat.students' },
              { v: '50+', k: 'caseStudies.hero.stat.projects' },
              { v: '5', k: 'caseStudies.hero.stat.programs' },
              { v: '4.8★', k: 'caseStudies.hero.stat.rating' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/10 backdrop-blur p-4">
                <div className="text-2xl md:text-3xl font-black mb-1">{s.v}</div>
                <div className="text-xs md:text-sm text-blue-100">{t(s.k)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured case study */}
      {featured && (
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-4 py-1.5 text-sm font-bold text-yellow-700 dark:text-yellow-300 mb-6">
              <Star className="h-4 w-4" aria-hidden="true" />
              {t('caseStudies.featured')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t(featured.nameKey)}</h2>

                <div className="flex flex-wrap gap-3 mb-6 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><Calendar className="h-4 w-4" aria-hidden="true" />{t(featured.ageKey)}</span>
                  <span className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300"><MapPin className="h-4 w-4" aria-hidden="true" />{t(featured.locationKey)}</span>
                </div>

                <blockquote className="relative rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6 mb-6">
                  <Quote className="absolute top-4 ltr:left-4 rtl:right-4 h-8 w-8 text-blue-300 dark:text-blue-700" aria-hidden="true" />
                  <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed pt-4">{t(featured.quoteKey)}</p>
                </blockquote>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">{t('caseStudies.before')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t(featured.beforeKey)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">{t('caseStudies.after')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t(featured.afterKey)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400 mb-3">{t('caseStudies.achievements')}</h3>
                    <ul className="space-y-2">
                      {featured.achievementKeys.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <Trophy className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5" aria-hidden="true" />
                          <span>{t(a)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-5">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-6 w-6 shrink-0 text-green-600 dark:text-green-400 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="font-bold text-green-800 dark:text-green-300 mb-1">{t('caseStudies.outcome')}</div>
                        <p className="text-sm text-green-700 dark:text-green-400">{t(featured.outcomeKey)}</p>
                      </div>
                    </div>
                  </div>
                  <Link to={featured.linkedCourse} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5">
                    {t('caseStudies.viewCourse')}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2 sticky top-24">
                <figure className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl">
                  <img src={featured.image} alt={t(featured.nameKey)} width={800} height={600} loading="eager" decoding="async" className="w-full h-auto" />
                  <figcaption className="p-5">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 dark:text-gray-400 mb-1">{t('caseStudies.program')}</div>
                        <div className="font-bold text-gray-900 dark:text-white">{t(featured.programKey)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 dark:text-gray-400 mb-1">{t('caseStudies.duration')}</div>
                        <div className="font-bold text-gray-900 dark:text-white">{t(featured.durationKey)}</div>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other case studies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('caseStudies.moreStories')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((cs) => (
              <article key={cs.id} className="group rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 aspect-square md:aspect-auto overflow-hidden">
                    <img src={cs.image} alt={t(cs.nameKey)} width={400} height={400} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t(cs.nameKey)}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span>{t(cs.ageKey)}</span>
                      <span>·</span>
                      <span>{t(cs.programKey)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 line-clamp-3 italic">"{t(cs.quoteKey)}"</p>
                    <Link to={cs.linkedCourse} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      {t('caseStudies.viewCourse')}
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Code className="mx-auto mb-6 h-14 w-14 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('caseStudies.cta.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t('caseStudies.cta.desc')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/courses" className="rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5">
              {t('caseStudies.cta.courses')}
            </Link>
            <Link to="/contact" className="rounded-full border-2 border-blue-600 px-8 py-3.5 font-bold text-blue-600 dark:text-blue-400 dark:border-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              {t('caseStudies.cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
