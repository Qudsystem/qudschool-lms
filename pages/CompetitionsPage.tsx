import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Target, Users, Calendar, Award, Zap, Star, CheckCircle2, Clock } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';
import { trackCtaClick } from '../src/utils/analytics';

type CompStatus = 'upcoming' | 'ongoing' | 'past';

interface Competition {
  id: string;
  titleKey: string;
  descKey: string;
  status: CompStatus;
  date: string;
  prizeKey: string;
  ageKey: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  featured?: boolean;
}

const COMPETITIONS: Competition[] = [
  { id: 'startup-teen-2026', titleKey: 'competitions.item1.title', descKey: 'competitions.item1.desc', status: 'upcoming', date: '2026-11-15', prizeKey: 'competitions.prize.gold', ageKey: 'competitions.age.10to16', icon: Trophy, featured: true },
  { id: 'ai-challenge-2026', titleKey: 'competitions.item2.title', descKey: 'competitions.item2.desc', status: 'upcoming', date: '2026-10-20', prizeKey: 'competitions.prize.silver', ageKey: 'competitions.age.12to18', icon: Zap },
  { id: 'game-jam-2026', titleKey: 'competitions.item3.title', descKey: 'competitions.item3.desc', status: 'upcoming', date: '2026-12-05', prizeKey: 'competitions.prize.bronze', ageKey: 'competitions.age.8to15', icon: Star },
  { id: 'robotics-cup-2026', titleKey: 'competitions.item4.title', descKey: 'competitions.item4.desc', status: 'past', date: '2026-06-10', prizeKey: 'competitions.prize.mention', ageKey: 'competitions.age.10to16', icon: Target },
  { id: 'code-sprint-2026', titleKey: 'competitions.item5.title', descKey: 'competitions.item5.desc', status: 'past', date: '2026-04-22', prizeKey: 'competitions.prize.winner', ageKey: 'competitions.age.12to18', icon: Award },
];

const FILTERS: Array<{ id: CompStatus | 'all'; labelKey: string }> = [
  { id: 'all', labelKey: 'competitions.filter.all' },
  { id: 'upcoming', labelKey: 'competitions.filter.upcoming' },
  { id: 'ongoing', labelKey: 'competitions.filter.ongoing' },
  { id: 'past', labelKey: 'competitions.filter.past' },
];

const statusColors: Record<CompStatus, string> = {
  upcoming: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  ongoing: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  past: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
};

const CompetitionsPage: React.FC = () => {
  const { t } = useI18n();
  const [filter, setFilter] = useState<CompStatus | 'all'>('all');

  const filtered = COMPETITIONS.filter((c) => filter === 'all' || c.status === filter);

  useSEO({
    title: 'المسابقات والجوائز',
    description: 'مسابقات كود سكول لطلاب البرمجة والذكاء الاصطناعي وتطوير الألعاب: تحديات بأجوائز قيمة، شهادات، وفرص لإبراز المواهب.',
    path: '/competitions',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'QudSchool Competitions',
      url: 'https://qudschool.com/competitions',
      inLanguage: 'ar',
      itemListElement: COMPETITIONS.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Event',
          name: t(c.titleKey),
          description: t(c.descKey),
          startDate: c.date,
          eventStatus: c.status === 'past' ? 'https://schema.org/EventPostponed' : 'https://schema.org/EventScheduled',
          organizer: { '@id': 'https://qudschool.com/#organization' },
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        },
      })),
    },
  });

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Trophy className="mx-auto mb-6 h-14 w-14 text-yellow-200" aria-hidden="true" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">{t('competitions.hero.title')}</h1>
          <p className="max-w-3xl mx-auto text-lg text-yellow-50 leading-relaxed">{t('competitions.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  filter === f.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <article key={c.id} className={`group flex flex-col rounded-3xl border bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                c.featured ? 'border-orange-300 dark:border-orange-700 ring-2 ring-orange-200/50' : 'border-gray-200 dark:border-gray-700'
              }`}>
                {c.featured && (
                  <span className="mb-3 inline-flex self-start items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-900/40 px-3 py-1 text-xs font-bold text-orange-700 dark:text-orange-300">
                    <Star className="h-3 w-3" aria-hidden="true" />{t('competitions.featured')}
                  </span>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400">
                    <c.icon className="h-7 w-7" aria-hidden={true} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColors[c.status]} mb-2`}>
                      {t(`competitions.status.${c.status}`)}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{t(c.titleKey)}</h2>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1">{t(c.descKey)}</p>
                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>{c.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span>{t(c.ageKey)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400">
                    <Medal className="h-4 w-4" aria-hidden="true" />
                    <span>{t(c.prizeKey)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('competitions.how.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['register', 'prepare', 'compete', 'celebrate'].map((step, i) => (
                <div key={step} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-black text-xl shadow-lg">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t(`competitions.how.${step}.title`)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t(`competitions.how.${step}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-8 md:p-12 text-white text-center">
            <Trophy className="mx-auto mb-6 h-14 w-14 text-yellow-200" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('competitions.cta.title')}</h2>
            <p className="max-w-2xl mx-auto mb-8 text-orange-50">{t('competitions.cta.desc')}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                onClick={() => trackCtaClick({ ctaId: 'competition-register', location: 'competitions-cta' })}
                className="rounded-full bg-white px-8 py-3.5 font-bold text-orange-600 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:-translate-y-0.5"
              >
                {t('competitions.cta.register')}
              </Link>
              <Link
                to="/courses"
                onClick={() => trackCtaClick({ ctaId: 'competition-courses', location: 'competitions-cta' })}
                className="rounded-full border-2 border-white/80 px-8 py-3.5 font-bold text-white transition-all duration-300 hover:bg-white/10"
              >
                {t('competitions.cta.courses')}
              </Link>
            </div>
          </div>

          {/* Winners showcase */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('competitions.winners.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['first', 'second', 'third'].map((rank, i) => {
                const icons = [Trophy, Medal, Award];
                const Icon = icons[i];
                const colors = ['text-yellow-500', 'text-gray-400', 'text-orange-600'];
                return (
                  <div key={rank} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center">
                    <Icon className={`mx-auto mb-4 h-12 w-12 ${colors[i]}`} aria-hidden="true" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t(`competitions.winners.${rank}.title`)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t(`competitions.winners.${rank}.desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompetitionsPage;
