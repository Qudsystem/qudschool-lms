import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight, Tag, Search } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';

export interface BlogPost {
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  categoryKey: string;
  date: string;
  readMinutes: number;
  image: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-kids-should-learn-programming-2026',
    titleKey: 'blog.post.1.title',
    excerptKey: 'blog.post.1.excerpt',
    contentKey: 'blog.post.1.content',
    categoryKey: 'blog.category.programming',
    date: '2026-09-15',
    readMinutes: 7,
    image: '/assets/ai-classroom-program.png',
    featured: true,
  },
  {
    slug: 'ai-for-kids-guide',
    titleKey: 'blog.post.2.title',
    excerptKey: 'blog.post.2.excerpt',
    contentKey: 'blog.post.2.content',
    categoryKey: 'blog.category.ai',
    date: '2026-09-08',
    readMinutes: 6,
    image: '/assets/qudschool-kids-hero.png',
  },
  {
    slug: 'game-development-for-beginners',
    titleKey: 'blog.post.3.title',
    excerptKey: 'blog.post.3.excerpt',
    contentKey: 'blog.post.3.content',
    categoryKey: 'blog.category.games',
    date: '2026-08-30',
    readMinutes: 8,
    image: '/assets/game-development-program.png',
  },
  {
    slug: 'robotics-stem-kids',
    titleKey: 'blog.post.4.title',
    excerptKey: 'blog.post.4.excerpt',
    contentKey: 'blog.post.4.content',
    categoryKey: 'blog.category.robotics',
    date: '2026-08-22',
    readMinutes: 5,
    image: '/assets/robotics-34.jpg',
  },
];

const BlogPage: React.FC = () => {
  const { t } = useI18n();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return BLOG_POSTS;
    const q = query.toLowerCase();
    return BLOG_POSTS.filter((p) =>
      t(p.titleKey).toLowerCase().includes(q) ||
      t(p.excerptKey).toLowerCase().includes(q) ||
      t(p.categoryKey).toLowerCase().includes(q)
    );
  }, [query, t]);

  useSEO({
    title: 'المدونة — مقالات تعليم البرمجة للأطفال',
    description: 'مقالات وأدلة تعليمية من QudSchool حول تعليم البرمجة والذكاء الاصطناعي وتطوير الألعاب والروبوتات للأطفال واليافعين.',
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'QudSchool Blog',
      url: 'https://qudschool.com/blog',
      inLanguage: 'ar',
      publisher: { '@id': 'https://qudschool.com/#organization' },
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: t(p.titleKey),
        url: 'https://qudschool.com/blog/' + p.slug,
        datePublished: p.date,
        image: 'https://qudschool.com' + p.image,
        author: { '@type': 'Organization', name: 'QudSchool' },
      })),
    },
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="mx-auto mb-6 h-12 w-12 text-blue-200" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">{t('blogPage.hero.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed">{t('blogPage.hero.subtitle')}</p>

          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('blogPage.searchPlaceholder')}
              aria-label={t('blogPage.searchPlaceholder')}
              className="w-full rounded-full border-0 bg-white/95 dark:bg-gray-900/95 px-12 py-4 text-gray-900 dark:text-white shadow-xl outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featured && (
            <Link to={`/blog/${featured.slug}`} className="group block mb-12">
              <article className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
                <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                  <img src={featured.image} alt={t(featured.titleKey)} width={800} height={600} loading="eager" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 text-xs font-bold text-yellow-700 dark:text-yellow-300">
                      {t('blogPage.featured')}
                    </span>
                    <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                      {t(featured.categoryKey)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t(featured.titleKey)}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t(featured.excerptKey)}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" />{featured.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{featured.readMinutes} {t('blogPage.minRead')}</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                <article className="h-full flex flex-col rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={t(p.titleKey)} width={600} height={400} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 mb-3">
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      {t(p.categoryKey)}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {t(p.titleKey)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3 flex-1">{t(p.excerptKey)}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" aria-hidden="true" />{p.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{p.readMinutes} {t('blogPage.minRead')}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">{t('blogPage.noResults')}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
