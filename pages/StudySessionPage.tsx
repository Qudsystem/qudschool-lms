import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FlashcardDeck, UserStudyStats, Flashcard as FlashcardType } from '../types';
import { allDecksData } from './FlashcardsPage';
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';
import Flashcard from '../components/Flashcard';
import Button from '../components/Button';
import Card from '../components/Card';
import ConfirmationModal from '../components/ConfirmationModal';
import { IconBolt, IconCheckCircle, IconXCircle, IconArrowPath, IconSparkles } from '../constants';
import { trackCourseStart, trackCourseComplete } from '../src/utils/analytics';

const RAPID_REVIEW_SECONDS = 60;

const Confetti: React.FC = () => {
    const confettiCount = 100;
    const colors = ['#F97316', '#FB923C', '#0D9488', '#2DD4BF', '#FBBF24', '#EC4899'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(confettiCount)].map((_, i) => (
                <div
                    key={i}
                    className="confetti-piece"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                />
            ))}
        </div>
    );
};


const StudySessionPage: React.FC = () => {
    const { deckId } = useParams<{ deckId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useI18n();
    
    const studyMode = location.state?.mode || 'classic'; // 'classic' or 'rapid'
    
    const [deck, setDeck] = useState<FlashcardDeck | null>(null);
    const [shuffledCards, setShuffledCards] = useState<FlashcardType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSessionComplete, setIsSessionComplete] = useState(false);

    // Rapid Review State
    const [timeLeft, setTimeLeft] = useState(RAPID_REVIEW_SECONDS);
    const [score, setScore] = useState(0);
    const [correctAnswersInSession, setCorrectAnswersInSession] = useState(0);
    const [isSessionActive, setIsSessionActive] = useState(false);

    const [, setStudyStats] = usePersistentState<UserStudyStats>('user-study-stats', { points: 0, streak: 0, lastStudied: null, correctAnswers: 0, gameRounds: 0 });

    useEffect(() => {
        const foundDeck = allDecksData.find(d => d.id === deckId);
        if (foundDeck) {
            setDeck(foundDeck);
            const shuffled = [...foundDeck.cards].sort(() => Math.random() - 0.5);
            setShuffledCards(shuffled);
            trackCourseStart({ courseId: foundDeck.id, courseName: foundDeck.title, level: studyMode });
        } else {
            navigate('/flashcards');
        }
    }, [deckId, navigate, studyMode]);

    useEffect(() => {
        if (studyMode === 'rapid' && isSessionActive && timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
        if (studyMode === 'rapid' && isSessionActive && timeLeft === 0) {
            endRapidReviewSession();
        }
    }, [timeLeft, isSessionActive, studyMode]);

    const updateStats = useCallback((pointsEarned: number, correctAnswersEarned = 0) => {
        setStudyStats(prev => {
            const today = new Date().toISOString().split('T')[0];
            const lastStudiedDate = prev.lastStudied ? new Date(prev.lastStudied).toISOString().split('T')[0] : null;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayDate = yesterday.toISOString().split('T')[0];
            
            let newStreak = prev.streak;
            if (lastStudiedDate === yesterdayDate) {
                newStreak += 1; // Continued streak
            } else if (lastStudiedDate !== today) {
                newStreak = 1; // New streak
            }

            const correctAnswers = (prev.correctAnswers || 0) + correctAnswersEarned;
            const earnedRounds = Math.floor(correctAnswers / 5) - Math.floor((prev.correctAnswers || 0) / 5);
            return {
                points: prev.points + pointsEarned,
                streak: newStreak,
                lastStudied: new Date().toISOString(),
                correctAnswers,
                gameRounds: (prev.gameRounds || 0) + earnedRounds,
            };
        });
    }, [setStudyStats]);

    const handleNextCard = () => {
        if (currentIndex < shuffledCards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex + 1), 150); // Delay for flip animation
        } else {
            setIsSessionComplete(true);
            updateStats(0); // Update streak even if no points
            if (deck) trackCourseComplete({ courseId: deck.id, courseName: deck.title });
        }
    };

    const handlePrevCard = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
        }
    };

    const handleRapidReviewAnswer = (correct: boolean) => {
        let points = 0;
        if (correct) {
            points = 10;
            setScore(prev => prev + points);
            setCorrectAnswersInSession(prev => prev + 1);
        }
        if (currentIndex === shuffledCards.length - 1) {
            endRapidReviewSession(points, correct ? 1 : 0);
        } else {
            handleNextCard();
        }
    };

    const startRapidReview = () => {
        setCurrentIndex(0);
        setScore(0);
        setCorrectAnswersInSession(0);
        setTimeLeft(RAPID_REVIEW_SECONDS);
        setIsSessionActive(true);
    };

    const endRapidReviewSession = useCallback((finalPoints = 0, finalCorrectAnswers = 0) => {
        setIsSessionActive(false);
        setIsSessionComplete(true);
        updateStats(score + finalPoints, correctAnswersInSession + finalCorrectAnswers);
        if (deck) trackCourseComplete({ courseId: deck.id, courseName: deck.title });
    }, [score, correctAnswersInSession, updateStats, deck]);
    
    const restartSession = () => {
        setIsSessionComplete(false);
        const shuffled = [...(deck?.cards || [])].sort(() => Math.random() - 0.5);
        setShuffledCards(shuffled);
        if (studyMode === 'rapid') {
            startRapidReview();
        } else {
            setCurrentIndex(0);
        }
    };
    
    if (!deck) {
        return <div>{t('studySession.loading')}</div>;
    }
    
    const currentCard = shuffledCards[currentIndex];
    const deckTitle = t(deck.titleKey || '') || deck.title || '';
    
    const renderCompletionScreen = () => (
        <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Confetti />
            <Card className="p-8 text-center animate-card-enter relative z-10">
                <div className="absolute top-4 right-4">
                  <IconSparkles className="w-8 h-8 text-yellow-400" />
                </div>
                 <div className="absolute top-10 left-6 transform -rotate-12">
                  <IconBolt className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-4">
                    {studyMode === 'rapid' ? t('studySession.rapid.complete.title') : t('studySession.complete.title')}
                </h2>
                <p className="mt-2 text-lg text-neutral-DEFAULT dark:text-gray-400">
                    {studyMode === 'rapid' 
                        ? t('studySession.rapid.complete.score', { score }) 
                        : t('studySession.complete.subtitle')
                    }
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={restartSession} variant="solid" className="bg-primary hover:bg-primary-dark">
                        {t('studySession.complete.studyAgain')}
                    </Button>
                    <Button onClick={() => navigate('/flashcards')} variant="outline">
                        {t('studySession.backToDecks')}
                    </Button>
                </div>
            </Card>
        </div>
    );

    const renderClassicMode = () => (
        <>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1 text-sm text-neutral-DEFAULT dark:text-gray-400 px-1">
                    <span>{deckTitle}</span>
                    <span>{t('studySession.progress', { current: currentIndex + 1, total: shuffledCards.length })}</span>
                </div>
                <div
                    className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
                    role="progressbar"
                    aria-label={t('studySession.progressBarLabel')}
                    aria-valuenow={currentIndex + 1}
                    aria-valuemin={1}
                    aria-valuemax={shuffledCards.length}
                >
                    <div className="bg-secondary h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / shuffledCards.length) * 100}%` }}></div>
                </div>
            </div>
            <div key={currentIndex} className="w-full h-64 sm:h-80 md:h-96 animate-card-enter" onClick={() => setIsFlipped(!isFlipped)}>
                <Flashcard 
                    frontContent={t(currentCard.questionKey)}
                    backContent={t(currentCard.answerKey)}
                    isFlipped={isFlipped}
                />
            </div>
            <div className="flex justify-between items-center mt-6">
                <Button onClick={handlePrevCard} disabled={currentIndex === 0} variant="outline">{t('studySession.previousCard')}</Button>
                <Button onClick={handleNextCard} variant="solid" className="bg-primary-light hover:bg-primary">
                    {currentIndex === shuffledCards.length - 1 ? t('studySession.complete.title') : t('studySession.nextCard')}
                </Button>
            </div>
        </>
    );

    const renderRapidMode = () => {
        if (!isSessionActive) {
            return (
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">{t('studySession.rapid.readyTitle')}</h2>
                    <p className="mb-6">{t('studySession.rapid.readyDesc', {time: RAPID_REVIEW_SECONDS})}</p>
                    <Button onClick={startRapidReview} size="lg" className="bg-secondary hover:bg-secondary-dark">
                        {t('studySession.rapid.start')}
                    </Button>
                </div>
            );
        }
        return (
            <>
                <div className="mb-4">
                     <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-secondary">{t('studySession.rapid.score')}: {score}</span>
                        <span className="text-primary">{t('studySession.rapid.time')}: {timeLeft}s</span>
                    </div>
                </div>
                <div key={currentIndex} className="w-full h-64 sm:h-80 md:h-96 animate-card-enter">
                    <Flashcard
                        frontContent={t(currentCard.questionKey)}
                        backContent={t(currentCard.answerKey)}
                        isFlipped={isFlipped}
                    />
                </div>
                 <div className="mt-6 flex justify-around">
                    <Button onClick={() => handleRapidReviewAnswer(false)} className="bg-red-500 hover:bg-red-600 w-40" leftIcon={<IconXCircle />}>
                        {t('studySession.incorrect')}
                    </Button>
                    <Button onClick={() => handleRapidReviewAnswer(true)} className="bg-green-500 hover:bg-green-600 w-40" leftIcon={<IconCheckCircle />}>
                        {t('studySession.correct')}
                    </Button>
                </div>
            </>
        );
    };

    return (
        <>
            <ConfirmationModal
                isOpen={isExitModalOpen}
                onClose={() => setIsExitModalOpen(false)}
                onConfirm={() => navigate('/flashcards')}
                titleKey="studySession.exit.title"
                messageKey="studySession.exit.message"
                confirmTextKey="studySession.exit.confirm"
                variant="destructive"
            />
            <div className="py-12 bg-gray-100 dark:bg-neutral-900 min-h-[calc(100vh-128px)] flex flex-col items-center justify-center">
                {isSessionComplete ? (
                    renderCompletionScreen()
                ) : (
                    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <header className="mb-6">
                            <h1 className="text-3xl font-bold text-center text-neutral-dark dark:text-neutral-light">{deckTitle}</h1>
                            <p className="text-center text-primary dark:text-primary-light font-semibold">
                                {studyMode === 'rapid' ? t('study.modeSelect.rapid.title') : t('study.modeSelect.classic.title')}
                            </p>
                        </header>
                        <Card className="p-4 sm:p-6 shadow-2xl">
                            {shuffledCards.length > 0 ? (
                                studyMode === 'classic' ? renderClassicMode() : renderRapidMode()
                            ) : (
                                <div className="text-center p-8">
                                    <p>{t('studySession.noCards')}</p>
                                </div>
                            )}
                        </Card>
                        <div className="mt-6 flex justify-center">
                            <Button onClick={() => setIsExitModalOpen(true)} variant="link">{t('studySession.exitSession')}</Button>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes card-enter {
                  from { opacity: 0; transform: scale(0.95) translateY(10px); }
                  to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-card-enter {
                  animation: card-enter 0.4s ease-out forwards;
                }
                @keyframes confetti-fall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .confetti-piece {
                    position: absolute;
                    top: -10%;
                    width: 8px;
                    height: 16px;
                    opacity: 0;
                    animation-name: confetti-fall;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }
            `}</style>
        </>
    );
};

export default StudySessionPage;
