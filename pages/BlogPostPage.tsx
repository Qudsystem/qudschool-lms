import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, BookOpen } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useI18n from '../hooks/useI18n';
import { BLOG_POSTS } from './BlogPage';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useI18n();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useSEO({
    title: post ? t(post.titleKey) : 'مقال غير موجود',
    description: post ? t(post.excerptKey) : '',
    path: '/blog/' + (slug || ''),
    image: post?.image,
    type: 'article',
    jsonLd: post ? {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: t(post.titleKey),
      description: t(post.excerptKey),
      image: 'https://qudschool.com' + post.image,
      datePublished: post.date,
      dateModified: post.date,
      url: 'https://qudschool.com/blog/' + post.slug,
      inLanguage: 'ar',
      author: { '@type': 'Organization', name: 'QudSchool', url: 'https://qudschool.com' },
      publisher: { '@id': 'https://qudschool.com/#organization' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qudschool.com/blog/' + post.slug },
    } : undefined,
  });

  if (!post) return <Navigate to="/blog" replace />;

  // Split content by newline-separated paragraphs
  const paragraphs = t(post.contentKey).split('\n').filter(Boolean);

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors text-sm font-semibold">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {t('blogPost.backToBlog')}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {t(post.categoryKey)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-blue-200"><Calendar className="h-3.5 w-3.5" aria-hidden="true" />{post.date}</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-blue-200"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{post.readMinutes} {t('blogPage.minRead')}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{t(post.titleKey)}</h1>
          <p className="text-lg text-blue-100 leading-relaxed">{t(post.excerptKey)}</p>
        </div>
      </section>

      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 -mt-24 relative z-10">
            <img src={post.image} alt={t(post.titleKey)} width={1200} height={630} loading="eager" decoding="async" className="w-full rounded-3xl shadow-2xl" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-loose">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-blue-50 dark:bg-blue-900/20 p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('blogPost.cta.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('blogPost.cta.desc')}</p>
            <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5">
              {t('blogPost.cta.button')}
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
