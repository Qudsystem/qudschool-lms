import React from 'react';
import { Play } from 'lucide-react';
import useI18n from '../hooks/useI18n';

interface Student {
  name: { ar: string; en: string };
  grade: number;
  image: string;
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=480&q=80`;

const imagePool = [
  img('photo-1503454537195-1dcabb73ffb9'),
  img('photo-1519340241574-2cec6aef0c01'),
  img('photo-1607453998774-d533f65dac99'),
  img('photo-1596464716127-f2a82984de30'),
  img('photo-1544717305-2782549b5136'),
  img('photo-1503919545889-aef636e10ad4'),
  img('photo-1503676260728-1c00da094a0b'),
  img('photo-1509062522246-3755977927d7'),
  img('photo-1531482615713-2afd69097998'),
  img('photo-1522202176988-66273c2fd55f'),
  img('photo-1522071820081-009f0129c71c'),
  img('photo-1516321318423-f06f85e504b3'),
];

const rawStudents: { ar: string; en: string; grade: number }[] = [
  { ar: 'عبد المنعم حراز', en: 'Abdel Moneim Haraz', grade: 9 },
  { ar: 'محمود محمد', en: 'Mahmoud Mohamed', grade: 8 },
  { ar: 'عبدالرحمن طارق', en: 'Abdelrahman Tarek', grade: 11 },
  { ar: 'يوسف أحمد', en: 'Youssef Ahmed', grade: 7 },
  { ar: 'أحمد زكريا', en: 'Ahmed Zakaria', grade: 9 },
  { ar: 'مريم حسن', en: 'Mariam Hassan', grade: 10 },
  { ar: 'ليلى إبراهيم', en: 'Layla Ibrahim', grade: 6 },
  { ar: 'عمر خالد', en: 'Omar Khaled', grade: 12 },
  { ar: 'سارة محمود', en: 'Sara Mahmoud', grade: 8 },
  { ar: 'علي مصطفى', en: 'Ali Mustafa', grade: 7 },
  { ar: 'جنى سمير', en: 'Jana Samir', grade: 6 },
  { ar: 'ياسين فؤاد', en: 'Yassin Fouad', grade: 10 },
  { ar: 'هدى ناصر', en: 'Huda Nasser', grade: 9 },
  { ar: 'كريم رمضان', en: 'Karim Ramadan', grade: 11 },
  { ar: 'نورا عادل', en: 'Noura Adel', grade: 7 },
  { ar: 'زياد شعبان', en: 'Ziad Shaaban', grade: 8 },
  { ar: 'ملك حسام', en: 'Malak Hossam', grade: 6 },
  { ar: 'أنس طارق', en: 'Anas Tarek', grade: 12 },
  { ar: 'رنا وليد', en: 'Rana Walid', grade: 10 },
  { ar: 'بلال أشرف', en: 'Bilal Ashraf', grade: 9 },
];

const students: Student[] = rawStudents.map((s, i) => ({
  name: { ar: s.ar, en: s.en },
  grade: s.grade,
  image: imagePool[i % imagePool.length],
}));

const StudentCard: React.FC<{ student: Student; lang: 'ar' | 'en'; gradeLabel: string }> = ({ student, lang, gradeLabel }) => (
  <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="group mx-2 w-[210px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-md ring-0 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl sm:mx-3 sm:w-[240px] dark:bg-gray-800">
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
      <img
        src={student.image}
        alt={student.name[lang]}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute h-14 w-14 rounded-full bg-rose-500/30 animate-ping" style={{ animationDuration: '2.4s' }} />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-600">
          <Play className="h-5 w-5 ltr:ml-0.5 rtl:mr-0.5" fill="currentColor" />
        </span>
      </div>
    </div>

    <div className="p-3 text-center md:p-4">
      <h3 className="truncate text-sm font-bold text-gray-900 md:text-base dark:text-white">
        {student.name[lang]}
      </h3>
      <p className="mt-0.5 text-xs text-gray-500 md:text-sm dark:text-gray-400">
        {gradeLabel}
      </p>
    </div>
  </div>
);

const FutureProgrammersSection: React.FC = () => {
  const { t, language } = useI18n();
  const lang: 'ar' | 'en' = language === 'en' ? 'en' : 'ar';
  const gradeLabel = (grade: number) => t('futureProgrammers.grade', { grade });

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/40 to-white transition-colors duration-300 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      {/* Keyframes for the marquee */}
      <style>{`
        @keyframes fp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fp-track { animation: fp-marquee 60s linear infinite; }
        .fp-marquee-wrap:hover .fp-track { animation-play-state: paused; }
        .fp-mask {
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-track { animation: none; }
        }
      `}</style>

      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-20 ltr:-left-20 rtl:-right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 ltr:-right-20 rtl:-left-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto max-w-7xl px-4 text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-3xl font-black leading-tight text-gray-900 md:text-4xl dark:text-white">
            {t('futureProgrammers.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg dark:text-gray-300">
            {t('futureProgrammers.subtitle')}
          </p>
        </div>

        {/* Infinite single-row marquee */}
        <div className="fp-marquee-wrap relative">
          <div className="fp-mask overflow-hidden py-4" dir="ltr">
            <div className="fp-track flex w-max will-change-transform">
              {/* two identical copies for a seamless loop */}
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                  {students.map((student) => (
                    <StudentCard
                      key={`${copy}-${student.name.en}`}
                      student={student}
                      lang={lang}
                      gradeLabel={gradeLabel(student.grade)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mt-14 flex flex-wrap justify-center gap-4 md:mt-20">
            <button className="rounded-full border-2 border-primary px-7 py-3 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lg md:text-base">
              {t('futureProgrammers.moreStudents')}
            </button>
            <button className="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:text-base">
              {t('futureProgrammers.contact')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureProgrammersSection;
