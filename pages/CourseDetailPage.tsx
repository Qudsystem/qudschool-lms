import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course, Review } from '../types';
import { placeholderCourses } from './CoursesPage';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import usePersistentState from '../hooks/usePersistentState';
import { FEATURE_FLAGS } from '../config/featureFlags';
import { IconClock, IconUser, IconChartBar, IconCheckCircle, UserAvatar, IconBookOpen, IconPlayCircle, IconChevronDown } from '../constants';

const mockCurriculum = [
    { id: 'm1', titleKey: 'course.curriculum.module1', lessons: ['course.curriculum.m1l1', 'course.curriculum.m1l2', 'course.curriculum.m1l3'] },
    { id: 'm2', titleKey: 'course.curriculum.module2', lessons: ['course.curriculum.m2l1', 'course.curriculum.m2l2'] },
    { id: 'm3', titleKey: 'course.curriculum.module3', lessons: ['course.curriculum.m3l1', 'course.curriculum.m3l2', 'course.curriculum.m3l3', 'course.curriculum.m3l4'] },
];

const mockReviews: Review[] = [
    { id: 'r1', author: 'Fatima H.', authorInitial: 'F', rating: 5, commentKey: 'course.review.r1', date: '2023-10-15' },
    { id: 'r2', author: 'Ahmed A.', authorInitial: 'A', rating: 4.5, commentKey: 'course.review.r2', date: '2023-10-12' },
    { id: 'r3', author: 'Layla I.', authorInitial: 'L', rating: 5, commentKey: 'course.review.r3', date: '2023-10-10' },
];

interface UserReview extends Review {
    courseId: string;
    comment?: string;
}

interface ReviewFormProps {
    alreadyRated: boolean;
    onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ alreadyRated, onSubmit }) => {
    const { t } = useI18n();
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (alreadyRated) {
        return (
            <Card className="p-6 mt-8 text-center">
                <p className="text-neutral-DEFAULT dark:text-gray-400">{t('course.review.alreadyRated')}</p>
            </Card>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userRating === 0) {
            setError(t('course.review.selectRating'));
            return;
        }
        setError(null);
        setIsSubmitting(true);
        // Frontend-only: simulate async save, then persist via callback
        window.setTimeout(() => {
            onSubmit(userRating, userComment.trim());
            setUserRating(0);
            setUserComment('');
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <Card className="p-6 mt-8">
            <h3 className="text-xl font-bold text-neutral-dark dark:text-neutral-light mb-4">{t('course.review.leaveReviewTitle')}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('course.review.yourRating')}</label>
                    <StarRating rating={userRating} onRate={setUserRating} isInteractive size="w-7 h-7" />
                    {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                </div>
                <div className="mb-4">
                     <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('course.review.yourComment')}</label>
                     <textarea
                        id="review-comment"
                        rows={4}
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder={t('course.review.commentPlaceholder')}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-neutral-light dark:placeholder-gray-400"
                     />
                </div>
                <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
                    {t('course.review.submitButton')}
                </Button>
            </form>
        </Card>
    );
};


const CourseDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useI18n();
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [activeTab, setActiveTab] = useState('curriculum');
    const [isVideoSectionOpen, setIsVideoSectionOpen] = useState(true);
    const [isPlayerActive, setIsPlayerActive] = useState(false);
    const [userReviews, setUserReviews] = usePersistentState<UserReview[]>(
        `course-reviews-${id ?? 'unknown'}`,
        []
    );
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        const foundCourse = placeholderCourses.find(c => c.id === id);
        setCourse(foundCourse);
    }, [id]);

    const alreadyRated = userReviews.some(r => r.courseId === id);

    const handleReviewSubmit = (rating: number, comment: string) => {
        if (!id || !course) return;
        const newReview: UserReview = {
            id: `ur-${Date.now()}`,
            courseId: id,
            author: 'Student User',
            authorInitial: 'S',
            rating,
            commentKey: '',
            date: new Date().toISOString().slice(0, 10),
            // Store the comment text as a fallback when there is no i18n key
            ...(comment ? { comment } : {}),
        } as UserReview;
        setUserReviews(prev => [newReview, ...prev]);
        setToast(t('course.review.thanksToast'));
        window.setTimeout(() => setToast(null), 2400);
    };
    
    const toggleVideoSection = () => {
        if (isVideoSectionOpen) {
            setIsPlayerActive(false);
        }
        setIsVideoSectionOpen(!isVideoSectionOpen);
    };

    if (!course) {
        return (
            <div className="py-20 text-center text-neutral-DEFAULT dark:text-gray-400">{t('course.detail.loading')}</div>
        );
    }

    const title = t(course.titleKey || '');
    const description = t(course.descriptionKey || '');
    const instructor = t(course.instructorKey || '');
    const duration = t(course.durationKey || '');
    const difficulty = course.difficulty ? t(course.difficultyKey || '') : '';

    const tabs = [
        { id: 'curriculum', labelKey: 'course.detail.tabs.curriculum' },
        { id: 'reviews', labelKey: 'course.detail.tabs.reviews' },
        { id: 'instructor', labelKey: 'course.detail.tabs.instructor' },
    ];

    return (
        <div className="bg-gray-50 dark:bg-neutral-dark">
            {/* Hero Section */}
            <header className="bg-primary-dark text-white py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                        <Link to="/courses" className="text-sm text-primary-light hover:underline mb-2 inline-block">
                            &larr; {t('course.detail.backToCourses')}
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
                        <p className="mt-4 text-lg text-teal-100">{description}</p>
                        <div className="mt-6 flex items-center space-x-4 rtl:space-x-reverse">
                            <StarRating rating={course.rating} />
                            <span className="text-sm font-semibold">({course.rating} / 5)</span>
                            <span className="text-sm text-gray-300">|</span>
                            <span className="text-sm">{mockReviews.length} {t('course.detail.reviews')}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left/Main Column */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-neutral-dark dark:text-neutral-light">{t('course.detail.whatYouWillLearn')}</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[1,2,3,4].map(i => (
                                    <li key={i} className="flex items-start space-x-2 rtl:space-x-reverse">
                                        <IconCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-DEFAULT dark:text-gray-400">{t(`course.detail.learningPoint${i}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="mt-8 overflow-hidden">
                            <div 
                                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                onClick={toggleVideoSection}
                                aria-expanded={isVideoSectionOpen}
                                aria-controls="video-content"
                            >
                                <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-light">{t('course.detail.video.title')}</h2>
                                <IconChevronDown className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isVideoSectionOpen ? 'rotate-180' : ''}`} />
                            </div>
                            <div 
                                id="video-content"
                                className={`transition-[max-height,opacity] duration-500 ease-in-out ${isVideoSectionOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-4 pt-0">
                                    {!isPlayerActive ? (
                                        <div className="relative cursor-pointer group rounded-lg overflow-hidden" onClick={() => { setIsPlayerActive(true); if(!isVideoSectionOpen) { setIsVideoSectionOpen(true); } }}>
                                            <img src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="Video thumbnail" className="w-full shadow-md" />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-30">
                                                <IconPlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="absolute bottom-4 ltr:left-4 rtl:right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm font-semibold">
                                                {t('course.detail.video.watch')}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="aspect-video">
                                            <iframe
                                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full rounded-lg"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                        
                        <div className="mt-8">
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <nav className="-mb-px flex space-x-6 rtl:space-x-reverse" aria-label="Tabs">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                                activeTab === tab.id
                                                ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                                            }`}
                                        >
                                            {t(tab.labelKey)}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="mt-6">
                                {activeTab === 'curriculum' && (
                                    <div className="space-y-6">
                                        {mockCurriculum.map(module => (
                                            <div key={module.id}>
                                                <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">{t(module.titleKey)}</h3>
                                                <ul className="mt-2 space-y-2">
                                                    {module.lessons.map((lessonKey, index) => (
                                                        <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                                            <IconBookOpen className="w-5 h-5 text-primary dark:text-primary-light"/>
                                                            <span className="text-sm text-neutral-DEFAULT dark:text-gray-300">{t(lessonKey)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                     <div>
                                        <div className="space-y-6">
                                            {[...userReviews.filter(r => r.courseId === id), ...mockReviews].map(review => {
                                                const isUserReview = (review as UserReview).courseId === id;
                                                const comment = (review as UserReview).comment;
                                                return (
                                                    <div key={review.id} className="flex items-start space-x-4 rtl:space-x-reverse">
                                                        <UserAvatar initial={review.authorInitial} size="md" />
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                                <h4 className="font-semibold text-neutral-dark dark:text-neutral-light">{review.author}</h4>
                                                                <StarRating rating={review.rating} size="w-4 h-4" />
                                                                {isUserReview && (
                                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-light/20 text-primary dark:text-primary-light">
                                                                        {t('course.review.yourReviewTag')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mt-1">
                                                                {comment || t(review.commentKey)}
                                                            </p>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{review.date}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {FEATURE_FLAGS.rateCourses && (
                                            <ReviewForm alreadyRated={alreadyRated} onSubmit={handleReviewSubmit} />
                                        )}
                                     </div>
                                )}
                                 {activeTab === 'instructor' && (
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-dark dark:text-neutral-light">{instructor}</h3>
                                        <p className="text-primary dark:text-primary-light font-medium">{t('course.detail.instructor.title')}</p>
                                        <p className="mt-4 text-neutral-DEFAULT dark:text-gray-400">{t('course.detail.instructor.bio')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right/Sidebar Column */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 shadow-xl">
                            <img src={course.imageUrl} alt={title} className="w-full h-56 object-cover rounded-t-xl" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mb-4">$49.99</h3>
                                <Button size="lg" className="w-full bg-secondary hover:bg-secondary-dark">{t('course.detail.enrollNow')}</Button>
                                <ul className="mt-6 space-y-3 text-sm">
                                    <li className="flex items-center space-x-2 rtl:space-x-reverse"><IconClock className="w-5 h-5 text-primary"/> <span className="font-semibold">{t('coursesPage.course.durationLabel')}:</span> <span className="text-neutral-DEFAULT dark:text-gray-400">{duration}</span></li>
                                    <li className="flex items-center space-x-2 rtl:space-x-reverse"><IconChartBar className="w-5 h-5 text-primary"/> <span className="font-semibold">{t('course.difficulty.label')}:</span> <span className="text-neutral-DEFAULT dark:text-gray-400">{difficulty}</span></li>
                                    <li className="flex items-center space-x-2 rtl:space-x-reverse"><IconUser className="w-5 h-5 text-primary"/> <span className="font-semibold">{t('coursesPage.course.instructorLabel')}:</span> <span className="text-neutral-DEFAULT dark:text-gray-400">{instructor}</span></li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {toast && (
                <div
                    role="status"
                    className="fixed bottom-6 ltr:right-6 rtl:left-6 bg-neutral-dark dark:bg-white text-white dark:text-neutral-dark px-4 py-3 rounded-lg shadow-lg z-[100] animate-fade-in"
                >
                    {toast}
                </div>
            )}
        </div>
    );
};

export default CourseDetailPage;