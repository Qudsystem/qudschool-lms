import React from 'react';
import { GraduationCap, Award, Users, Code, Brain, Gamepad2, Bot, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';

const InstructorCard: React.FC<{
  name: string;
  roleKey: string;
  bioKey: string;
  image: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  specialtyKeys: string[];
}> = ({ name, roleKey, bioKey, image, icon: Icon, specialtyKeys }) => {
  const { t } = useI18n();
  return (
    <article className="group rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-start gap-5 mb-5">
        <div className="relative">
          <div className="h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-blue-100 dark:ring-blue-900/40">
            <img src={image} alt={name} width={80} height={80} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-2 ltr:-right-2 rtl:-left-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            <Icon className="h-4 w-4" aria-hidden={true} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{t(roleKey)}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t(bioKey)}</p>
      <div className="flex flex-wrap gap-2">
        {specialtyKeys.map((s) => (
          <span key={s} className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
            {t(s)}
          </span>
        ))}
      </div>
    </article>
  );
};

const InstructorsPage: React.FC = () => {
  const { t } = useI18n();

  const instructors = [
    { name: 'Hossam Galal', roleKey: 'instructors.role.founder', bioKey: 'instructors.bio.hossam', image: '/assets/team-hossam-galal.jpg', icon: Sparkles, specialtyKeys: ['instructors.spec.leadership', 'instructors.spec.ai', 'instructors.spec.curriculum'] },
    { name: 'Hassan Orabi', roleKey: 'instructors.role.devLead', bioKey: 'instructors.bio.hassan', image: '/assets/team-hassan-orabi.jpg', icon: Code, specialtyKeys: ['instructors.spec.web', 'instructors.spec.programming'] },
    { name: 'Omar Essam', roleKey: 'instructors.role.techLead', bioKey: 'instructors.bio.omar', image: '/assets/team-omar-essam.jpg', icon: Brain, specialtyKeys: ['instructors.spec.ai', 'instructors.spec.cs'] },
    { name: 'Amr Mohamed Galal', roleKey: 'instructors.role.foundingMember', bioKey: 'instructors.bio.amr', image: '/assets/team-founder-qudsystem.png', icon: Gamepad2, specialtyKeys: ['instructors.spec.gameDev', 'instructors.spec.creative'] },
  ];

  useSEO({
    title: 'المدربون والفريق',
    description: 'تعرّف على مدربي QudSchool: خبراء في البرمجة والذكاء الاصطناعي وتطوير الألعاب والروبوتات. فريق متخصص لبناء مستقبل طفلك التقني.',
    path: '/instructors',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'QudSchool Instructors',
      url: 'https://qudschool.com/instructors',
      itemListElement: instructors.map((i, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: { '@type': 'Person', name: i.name, image: 'https://qudschool.com' + i.image, worksFor: { '@id': 'https://qudschool.com/#organization' } },
      })),
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="mx-auto mb-6 h-12 w-12 text-blue-200" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t('instructorsPage.hero.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed">{t('instructorsPage.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instructors.map((i) => (
              <InstructorCard key={i.name} {...i} />
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center">
              <Award className="mx-auto mb-3 h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('instructorsPage.why.certified.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('instructorsPage.why.certified.desc')}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center">
              <Users className="mx-auto mb-3 h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('instructorsPage.why.mentorship.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('instructorsPage.why.mentorship.desc')}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center">
              <Bot className="mx-auto mb-3 h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t('instructorsPage.why.ai.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('instructorsPage.why.ai.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorsPage;
