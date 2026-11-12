import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useI18n from '../hooks/useI18n';
import { Search as IconSearch, X as IconX, Settings as IconAdjustmentsHorizontal } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { trackSearch } from '../src/utils/analytics';

interface SearchResult {
  id: string;
  type: 'course' | 'lesson' | 'deck' | 'page';
  title: string;
  description: string;
  thumbnail?: string;
  path: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const SearchPage: React.FC = () => {
  useSEO({
    title: 'البحث',
    description: 'ابحث في دورات ومحتوى QudSchool.',
    path: '/search',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useI18n();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - في الإنتاج سيتم جلبها من API
  const sampleResults: SearchResult[] = [
    {
      id: '1',
      type: 'course',
      title: 'أساسيات React للمبتدئين',
      description: 'تعلم React من الصفر مع أمثلة عملية وتطبيقات حقيقية',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      path: '/courses/react-basics',
      category: 'برمجة',
      difficulty: 'beginner'
    },
    {
      id: '2',
      type: 'course',
      title: 'TypeScript المتقدمة',
      description: 'احترف TypeScript مع تطبيقات واقعية',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
      path: '/courses/typescript-advanced',
      category: 'برمجة',
      difficulty: 'advanced'
    },
    {
      id: '3',
      type: 'lesson',
      title: 'مقدمة إلى Hooks في React',
      description: 'فهم useState و useEffect بعمق',
      path: '/lessons/react-hooks',
      category: 'برمجة',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      type: 'deck',
      title: 'بطاقات JavaScript ES6',
      description: '50 بطاقة تعليمية لميزات ES6',
      path: '/flashcards/javascript-es6',
      category: 'برمجة',
      difficulty: 'intermediate'
    }
  ];

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, selectedType, selectedDifficulty]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    try {
      // TODO: استدعاء API الحقيقي
      // const response = await fetch(`/api/search?q=${searchQuery}&type=${selectedType}&difficulty=${selectedDifficulty}`);
      // const data = await response.json();
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // تصفية النتائج بناءً على الفلاتر
      let filtered = sampleResults.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (selectedType !== 'all') {
        filtered = filtered.filter(item => item.type === selectedType);
      }
      
      if (selectedDifficulty !== 'all') {
        filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
      }
      
      setResults(filtered);
      trackSearch({ query: searchQuery, resultsCount: filtered.length });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get('search') as string;
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    }
  };

  const clearSearch = () => {
    setSearchParams({});
    setResults([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return '📚';
      case 'lesson':
        return '📖';
      case 'deck':
        return '🎴';
      case 'page':
        return '📄';
      default:
        return '📌';
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    
    const badges = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[difficulty as keyof typeof badges]}`}>
        {t(`search.difficulty.${difficulty}`)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('search.title')}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleNewSearch} className="relative">
            <input
              type="search"
              name="search"
              defaultValue={query}
              placeholder={t('search.placeholder')}
              className="w-full px-12 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <IconSearch className="w-6 h-6 text-gray-400 absolute ltr:left-4 rtl:right-4 top-1/2 transform -translate-y-1/2" />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute ltr:right-4 rtl:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <IconX className="w-5 h-5" />
              </button>
            )}
          </form>
          
          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <IconAdjustmentsHorizontal className="w-5 h-5" />
            <span>{t('search.filters')}</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('search.filter.type')}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">{t('search.filter.allTypes')}</option>
                  <option value="course">{t('search.filter.courses')}</option>
                  <option value="lesson">{t('search.filter.lessons')}</option>
                  <option value="deck">{t('search.filter.decks')}</option>
                  <option value="page">{t('search.filter.pages')}</option>
                </select>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('search.filter.difficulty')}
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">{t('search.filter.allLevels')}</option>
                  <option value="beginner">{t('search.difficulty.beginner')}</option>
                  <option value="intermediate">{t('search.difficulty.intermediate')}</option>
                  <option value="advanced">{t('search.difficulty.advanced')}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        {query && (
          <div className="mb-6 text-gray-600 dark:text-gray-400">
            {isLoading ? (
              <span>{t('search.searching')}</span>
            ) : (
              <span>
                {t('search.resultsCount', { count: results.length, query })}
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <Link
                key={result.id}
                to={result.path}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover-lift"
              >
                {result.thumbnail && (
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getTypeIcon(result.type)}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {t(`search.type.${result.type}`)}
                    </span>
                    {getDifficultyBadge(result.difficulty)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {result.description}
                  </p>
                  {result.category && (
                    <div className="mt-3">
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded">
                        {result.category}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <IconSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('search.noResults')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('search.noResultsDesc')}
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <IconSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('search.startSearching')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('search.startSearchingDesc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
