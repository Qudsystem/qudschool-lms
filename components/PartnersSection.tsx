import useI18n from '../hooks/useI18n';

type PartnerName = 'Microsoft' | 'Google' | 'MIT' | 'UNICEF' | 'Stanford University';

const partners: { name: PartnerName; href: string; logo: string; className: string }[] = [
  { name: 'Microsoft', href: 'https://www.microsoft.com/', logo: '/assets/partners/microsoft.svg', className: 'h-12 w-auto' },
  { name: 'Google', href: 'https://www.google.com/', logo: '/assets/partners/google.svg', className: 'h-12 w-auto' },
  { name: 'MIT', href: 'https://www.mit.edu/', logo: '/assets/partners/mit.svg', className: 'h-16 w-auto' },
  { name: 'UNICEF', href: 'https://www.unicef.org/', logo: '/assets/partners/unicef.svg', className: 'h-16 w-auto' },
  { name: 'Stanford University', href: 'https://www.stanford.edu/', logo: '/assets/partners/stanford.svg', className: 'h-12 w-auto' },
];

const PartnersSection = () => {
  const { t } = useI18n();
  return (
    <section className="bg-slate-50 py-16 text-slate-900 dark:bg-[#1c2b39] dark:text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black md:text-5xl">{t('partners.title')}</h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg dark:text-slate-300">{t('partners.subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('partners.visit', { name: partner.name })}
              className="flex h-40 items-center justify-center rounded-[18px] border border-slate-200 bg-white px-10 text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.10)] transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-[#0f1a2a] dark:text-white dark:shadow-[0_10px_30px_rgba(2,6,23,0.35)] dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-[#1c2b39]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.className} max-w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
