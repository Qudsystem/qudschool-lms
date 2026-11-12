import React, { useState } from 'react';
import useI18n from '../hooks/useI18n';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Edit2, Trash2, Zap } from 'lucide-react';
import { FlashcardDeck } from '../types';

const AdminDecksPage: React.FC = () => {
  const { t } = useI18n();
  const [decks, setDecks] = useState<FlashcardDeck[]>([
    {
      id: '1',
      titleKey: 'decks.react.title',
      title: 'React الأساسيات',
      descriptionKey: 'decks.react.desc',
      description: 'بطاقات لمراجعة أساسيات React',
      icon: <Zap className="w-6 h-6" />,
      cards: Array(20).fill({}).map((_, i) => ({
        id: `1-${i}`,
        questionKey: `decks.react.q${i + 1}`,
        answerKey: `decks.react.a${i + 1}`,
      }))
    },
    {
      id: '2',
      titleKey: 'decks.js.title',
      title: 'JavaScript المتقدم',
      descriptionKey: 'decks.js.desc',
      description: 'مفاهيم متقدمة في JS',
      icon: <Zap className="w-6 h-6" />,
      cards: Array(15).fill({}).map((_, i) => ({
        id: `2-${i}`,
        questionKey: `decks.js.q${i + 1}`,
        answerKey: `decks.js.a${i + 1}`,
      }))
    },
    {
      id: '3',
      titleKey: 'decks.python.title',
      title: 'Python للمبتدئين',
      descriptionKey: 'decks.python.desc',
      description: 'أساسيات Python',
      icon: <Zap className="w-6 h-6" />,
      cards: Array(25).fill({}).map((_, i) => ({
        id: `3-${i}`,
        questionKey: `decks.python.q${i + 1}`,
        answerKey: `decks.python.a${i + 1}`,
      }))
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDeck, setEditingDeck] = useState<FlashcardDeck | null>(null);

  const handleDelete = (deckId: string) => {
    if (confirm(t('admin.decks.confirmDelete'))) {
      setDecks(decks.filter(d => d.id !== deckId));
    }
  };

  const handleEdit = (deck: FlashcardDeck) => {
    setEditingDeck(deck);
    setShowCreateModal(true);
  };

  const totalCards = decks.reduce((sum, d) => sum + d.cards.length, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark dark:text-neutral-light">
            {t('admin.decks.title')}
          </h1>
          <p className="mt-2 text-neutral-DEFAULT dark:text-gray-400">
            {t('admin.decks.subtitle')}
          </p>
        </div>
        <Button
          variant="solid"
          size="md"
          onClick={() => {
            setEditingDeck(null);
            setShowCreateModal(true);
          }}
          className="mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
          {t('admin.decks.createNew')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.decks.stats.totalDecks')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {decks.length}
              </p>
            </div>
            <div className="bg-primary-light dark:bg-primary-dark rounded-lg p-3">
              <Zap className="w-8 h-8 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.decks.stats.totalCards')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {totalCards}
              </p>
            </div>
            <div className="bg-success-light dark:bg-success-dark rounded-lg p-3">
              <Zap className="w-8 h-8 text-success" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                {t('admin.decks.stats.avgCardsPerDeck')}
              </p>
              <p className="text-3xl font-bold text-neutral-dark dark:text-neutral-light mt-1">
                {Math.round(totalCards / decks.length)}
              </p>
            </div>
            <div className="bg-warning-light dark:bg-warning-dark rounded-lg p-3">
              <Zap className="w-8 h-8 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Decks Table */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-light mb-6">
          {t('admin.decks.allDecks')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.decks.table.deck')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.decks.table.cards')}
                </th>
                <th className="text-start p-4 text-sm font-semibold text-neutral-DEFAULT dark:text-gray-400">
                  {t('admin.decks.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {decks.map((deck) => (
                <tr
                  key={deck.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="bg-primary-light dark:bg-primary-dark rounded-lg p-3 ltr:mr-3 rtl:ml-3">
                        {deck.icon}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-dark dark:text-neutral-light">
                          {deck.title}
                        </p>
                        <p className="text-sm text-neutral-DEFAULT dark:text-gray-400">
                          {deck.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-DEFAULT dark:text-gray-400">
                    {deck.cards.length} {t('admin.decks.table.cards')}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(deck)}
                      >
                        <Edit2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                        {t('common.edit')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-error hover:text-error-dark"
                        onClick={() => handleDelete(deck.id)}
                      >
                        <Trash2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                        {t('common.delete')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light mb-4">
                {editingDeck ? t('admin.decks.editDeck') : t('admin.decks.createNew')}
              </h2>
              <p className="text-neutral-DEFAULT dark:text-gray-400 mb-6">
                {t('admin.decks.modal.description')}
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingDeck(null);
                  }}
                >
                  {t('modal.cancel')}
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingDeck(null);
                    alert(t('admin.decks.modal.success'));
                  }}
                >
                  {t('modal.confirm')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDecksPage;
