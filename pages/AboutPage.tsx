import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, Rocket, Heart, Lightbulb, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';

const AboutPage: React.FC = () => {
  const { t } = useI18n();

  useSEO({
    title: 'من نحن — قصة QudSchool',
    description: 'تعرّف على QudSchool (كود سكول): منصة تعليمية مدعومة بالذكاء الاصطناعي تهدف لبناء جيل متمكّن من التكنولوجيا. مهمتنا، رؤيتنا، فريقنا، وقيمنا.',
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About QudSchool',
      url: 'https://qudschool.com/about',
      about: { '@id': 'https://qudschool.com/#organization' },
      inLanguage: 'ar',
    },
  });

  const values = [
    { icon: Lightbulb, titleKey: 'about.value.innovation.title', descKey: 'about.value.innovation.desc' },
    { icon: Heart, titleKey: 'about.value.passion.title', descKey: 'about.value.passion.desc' },
    { icon: ShieldCheck, titleKey: 'about.value.trust.title', descKey: 'about.value.trust.desc' },
    { icon: TrendingUp, titleKey: 'about.value.excellence.title', descKey: 'about.value.excellence.desc' },
  ];

  const stats = [
    { value: '2,000+', labelKey: 'about.stats.students' },
    { value: '5', labelKey: 'about.stats.programs' },
    { value: '50+', labelKey: 'about.stats.projects' },
    { value: '2023', labelKey: 'about.stats.founded' },
  ];

  const team = [
    { name: 'Hossam Galal', role: 'المؤسس والرئيس التنفيذي', image: '/assets/team-hossam-galal.jpg' },
    { name: 'Hassan Orabi', role: 'مدير التطوير', image: '/assets/team-hassan-orabi.jpg' },
    { name: 'Omar Essam', role: 'قائد الفريق التقني', image: '/assets/team-omar-essam.jpg' },
    { name: 'Amr Mohamed Galal', role: 'عضو الفريق المؤسس', image: '/assets/team-founder-qudsystem.png' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-yellow-300" aria-hidden="true" />
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {t('aboutPage.hero.title')}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
            {t('aboutPage.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-4">
                <Target className="h-4 w-4" aria-hidden="true" />
                {t('aboutPage.mission.badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('aboutPage.mission.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {t('aboutPage.mission.p1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('aboutPage.mission.p2')}
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/assets/ai-classroom-program.png"
                alt={t('aboutPage.mission.imageAlt')}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.labelKey} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">{s.value}</div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('aboutPage.values.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('aboutPage.values.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.titleKey} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <v.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t(v.titleKey)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{t(v.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/40 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-4">
              <Users className="h-4 w-4" aria-hidden="true" />
              {t('aboutPage.team.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('aboutPage.team.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('aboutPage.team.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="mb-4 mx-auto h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full ring-4 ring-blue-100 dark:ring-blue-900/40 transition-all duration-300 group-hover:ring-blue-300 dark:group-hover:ring-blue-700">
                  <img
                    src={m.image}
                    alt={m.name}
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{m.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards / Trust */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white text-center">
            <Award className="mx-auto mb-6 h-14 w-14 text-yellow-300" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('aboutPage.trust.title')}</h2>
            <p className="max-w-3xl mx-auto text-blue-100 leading-relaxed mb-8">
              {t('aboutPage.trust.desc')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-90">
              {['google', 'microsoft', 'mit', 'stanford', 'unicef'].map((p) => (
                <img key={p} src={`/assets/partners/${p}.svg`} alt={p} width={80} height={40} loading="lazy" decoding="async" className="h-8 md:h-10 w-auto brightness-0 invert" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Rocket className="mx-auto mb-6 h-14 w-14 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t('aboutPage.cta.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('aboutPage.cta.desc')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/courses" className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5">
              {t('aboutPage.cta.exploreCourses')}
            </Link>
            <Link to="/contact" className="rounded-full border-2 border-blue-600 px-8 py-3.5 text-base font-bold text-blue-600 dark:text-blue-400 dark:border-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              {t('aboutPage.cta.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
