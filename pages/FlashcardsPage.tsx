
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { FlashcardDeck, UserStudyStats } from '../types';
import { IconBolt, IconBookOpen, IconPlus, IconSparkles } from '../constants';
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';
import CreateDeckModal from '../components/CreateDeckModal';
import StudyModeModal from '../components/StudyModeModal';

const initialDecks: FlashcardDeck[] = [
    {
        id: 'deck-1',
        titleKey: 'flashcards.decks.react.title',
        descriptionKey: 'flashcards.decks.react.desc',
        icon: <IconBookOpen />,
        cards: [
            { id: 'c1-1', questionKey: 'flashcards.decks.react.q1', answerKey: 'flashcards.decks.react.a1' },
            { id: 'c1-2', questionKey: 'flashcards.decks.react.q2', answerKey: 'flashcards.decks.react.a2' },
            { id: 'c1-3', questionKey: 'flashcards.decks.react.q3', answerKey: 'flashcards.decks.react.a3' },
        ]
    },
    {
        id: 'deck-2',
        titleKey: 'flashcards.decks.dsa.title',
        descriptionKey: 'flashcards.decks.dsa.desc',
        icon: <IconBolt />,
        cards: [
            { id: 'c2-1', questionKey: 'flashcards.decks.dsa.q1', answerKey: 'flashcards.decks.dsa.a1' },
            { id: 'c2-2', questionKey: 'flashcards.decks.dsa.q2', answerKey: 'flashcards.decks.dsa.a2' },
        ]
    }
];

export const allDecksData: FlashcardDeck[] = [...initialDecks];


const DeckCard: React.FC<{ deck: FlashcardDeck; onStudy: () => void }> = ({ deck, onStudy }) => {
    const { t } = useI18n();
    return (
        <Card onClick={onStudy} hoverEffect className="p-6 flex flex-col items-start h-full">
            <div className="flex-shrink-0 bg-primary-light/20 dark:bg-primary-dark/30 p-3 rounded-xl mb-4">
                {React.cloneElement(deck.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-primary dark:text-primary-light" })}
            </div>
            <h3 className="text-xl font-bold text-neutral-dark dark:text-neutral-light">{t(deck.titleKey || '')}</h3>
            <p className="text-sm text-neutral-DEFAULT dark:text-gray-400 mt-1 flex-grow">{t(deck.descriptionKey || '')}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{t('flashcards.cardCount', { count: deck.cards.length })}</p>
        </Card>
    );
};

const FlashcardsPage: React.FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const [studyStats, setStudyStats] = usePersistentState<UserStudyStats>('user-study-stats', { points: 0, streak: 0, lastStudied: null, correctAnswers: 0, gameRounds: 0 });
    const [decks, setDecks] = usePersistentState<FlashcardDeck[]>('user-flashcard-decks', allDecksData);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isStudyModeModalOpen, setIsStudyModeModalOpen] = useState(false);
    const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);

    const handleCreateDeck = (deckData: { title: string; description: string; icon: React.ReactElement }) => {
        const newDeck: FlashcardDeck = {
            id: `deck-${Date.now()}`,
            title: deckData.title,
            description: deckData.description,
            icon: deckData.icon,
            cards: [] // Start with an empty deck
        };
        const updatedDecks = [...decks, newDeck];
        setDecks(updatedDecks);
        setIsCreateModalOpen(false);
    };

    const handleSelectDeck = (deck: FlashcardDeck) => {
        setSelectedDeck(deck);
        setIsStudyModeModalOpen(true);
    };

    const handleSelectMode = (mode: 'classic' | 'rapid') => {
        if (selectedDeck) {
            setIsStudyModeModalOpen(false);
            navigate(`/flashcards/deck/${selectedDeck.id}`, { state: { mode } });
        }
    };

    return (
        <>
            <CreateDeckModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateDeck}
            />
            {selectedDeck && (
                <StudyModeModal
                    isOpen={isStudyModeModalOpen}
                    onClose={() => setIsStudyModeModalOpen(false)}
                    onSelectMode={handleSelectMode}
                    deckTitle={t(selectedDeck.titleKey || '') || selectedDeck.title || ''}
                />
            )}
            <div className="py-12 bg-gray-50 dark:bg-neutral-dark min-h-[calc(100vh-128px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-12">
                        <IconBookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                            {t('flashcards.title')}
                        </h1>
                        <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                            {t('flashcards.subtitle')}
                        </p>
                    </header>

                    <Card className="p-6 mb-10 shadow-lg bg-gradient-to-r from-primary to-teal-500 text-white">
                        <h2 className="text-2xl font-bold mb-4">{t('flashcards.stats.title')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-3xl font-bold flex items-center justify-center">
                                    <IconSparkles className="w-7 h-7 mr-2 text-yellow-300"/> {studyStats.points.toLocaleString()}
                                </p>
                                <p className="text-sm opacity-90">{t('flashcards.stats.points')}</p>
                            </div>
                             <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-3xl font-bold flex items-center justify-center">
                                    <IconBolt className="w-7 h-7 mr-2 text-orange-300"/> {studyStats.streak}
                                </p>
                                <p className="text-sm opacity-90">{t('flashcards.stats.daysStreak')}</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-lg">
                                <p className="text-3xl font-bold">🎯 {studyStats.gameRounds}</p>
                                <p className="text-sm opacity-90">{t('flashcards.stats.gameRounds')}</p>
                            </div>
                        </div>
                        <Button onClick={() => navigate('/sniper-arena')} className="mt-6 w-full bg-gray-900/40 hover:bg-gray-900/60">
                            🎯 {t('flashcards.stats.playGame')}
                        </Button>
                    </Card>

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-light">{t('flashcards.myDecks')}</h2>
                        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-secondary hover:bg-secondary-dark" leftIcon={<IconPlus className="w-5 h-5"/>}>
                            {t('flashcards.createDeck')}
                        </Button>
                    </div>

                    {decks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {decks.map(deck => (
                                <DeckCard key={deck.id} deck={deck} onStudy={() => handleSelectDeck(deck)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <p className="text-xl text-neutral-DEFAULT dark:text-gray-400">{t('flashcards.noDecks')}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FlashcardsPage;
