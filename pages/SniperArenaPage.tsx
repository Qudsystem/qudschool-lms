import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';
import { UserStudyStats } from '../types';

const ROUND_SECONDS = 30;

const SniperArenaPage: React.FC = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const [stats, setStats] = usePersistentState<UserStudyStats>('user-study-stats', {
        points: 0, streak: 0, lastStudied: null, correctAnswers: 0, gameRounds: 0
    });
    const [active, setActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
    const [hits, setHits] = useState(0);
    const [target, setTarget] = useState({ top: 35, left: 50 });

    const finishRound = useCallback(() => {
        setActive(false);
        setStats(prev => ({ ...prev, points: prev.points + hits * 5 }));
    }, [hits, setStats]);

    useEffect(() => {
        if (!active) return;
        if (timeLeft <= 0) {
            finishRound();
            return;
        }
        const timer = window.setTimeout(() => setTimeLeft(value => value - 1), 1000);
        return () => window.clearTimeout(timer);
    }, [active, timeLeft, finishRound]);

    const startRound = () => {
        if (stats.gameRounds < 1) return;
        setStats(prev => ({ ...prev, gameRounds: prev.gameRounds - 1 }));
        setHits(0);
        setTimeLeft(ROUND_SECONDS);
        setTarget({ top: 25 + Math.random() * 55, left: 12 + Math.random() * 76 });
        setActive(true);
    };

    const hitTarget = () => {
        if (!active) return;
        setHits(value => value + 1);
        setTarget({ top: 15 + Math.random() * 65, left: 8 + Math.random() * 84 });
    };

    return (
        <div className="min-h-[calc(100vh-128px)] bg-slate-950 py-10 px-4 text-white">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold">🎯 {t('game.title')}</h1>
                        <p className="mt-2 text-slate-300">{t('game.subtitle')}</p>
                    </div>
                    <Button onClick={() => navigate('/flashcards')} variant="outline" className="border-slate-500 text-white hover:bg-slate-800">
                        {t('game.back')}
                    </Button>
                </div>
                <Card className="overflow-hidden border border-slate-700 bg-slate-900 p-0 text-white">
                    <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
                        <span>{t('game.rounds')}: <strong>{stats.gameRounds}</strong></span>
                        <span>{t('game.points')}: <strong>{stats.points}</strong></span>
                        {active && <span className="text-amber-300">{timeLeft}s</span>}
                    </div>
                    <div className="relative h-[420px] overflow-hidden bg-gradient-to-br from-slate-800 via-blue-950 to-slate-950">
                        {!active ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                                <div className="mb-4 text-6xl">🔫</div>
                                <h2 className="text-2xl font-bold">{t('game.ready')}</h2>
                                <p className="mt-2 max-w-md text-slate-300">{t('game.rule')}</p>
                                <Button onClick={startRound} disabled={stats.gameRounds < 1} className="mt-6 bg-primary hover:bg-primary-dark">
                                    {stats.gameRounds > 0 ? t('game.start') : t('game.noRounds')}
                                </Button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                aria-label={t('game.targetLabel')}
                                onClick={hitTarget}
                                className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-red-400 bg-red-500/20 text-3xl shadow-[0_0_30px_rgba(248,113,113,0.8)] transition-transform hover:scale-110"
                                style={{ top: `${target.top}%`, left: `${target.left}%` }}
                            >
                                ⊕
                            </button>
                        )}
                    </div>
                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-slate-300">{t('game.hits')}: <strong className="text-white">{hits}</strong></span>
                        {!active && hits > 0 && <span className="text-emerald-300">{t('game.earned', { points: hits * 5 })}</span>}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SniperArenaPage;
