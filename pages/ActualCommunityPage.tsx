import React, { useState, useMemo, useCallback } from 'react';
import useI18n from '../hooks/useI18n';
import usePersistentState from '../hooks/usePersistentState';
import Card from '../components/Card';
import Button from '../components/Button';
import { MessageSquare, Send, ThumbsUp, MessageCircle, Share2, Plus, X, Trash2 } from 'lucide-react';
import { UserAvatar } from '../constants';
import { CommunityPost } from '../types';
import { FEATURE_FLAGS } from '../config/featureFlags';

const mockPosts: CommunityPost[] = [
    {
        id: 'post1',
        author: 'Fatima Hassan',
        authorAvatar: 'F',
        authorRoleKey: 'userRoles.student',
        timestamp: '2h ago',
        content: "Just finished the React Fundamentals course, what a great introduction! Highly recommended for anyone starting out. What should I learn next?",
        likes: 12,
        comments: 4,
        isLiked: false,
    },
    {
        id: 'post2',
        author: 'Dr. Layla Ibrahim',
        authorAvatar: 'L',
        authorRoleKey: 'userRoles.teacher',
        timestamp: '1d ago',
        content: "Welcome everyone to the new Community Hub! Feel free to ask questions, share your progress, and help each other out. We're excited to see this community grow. #QudSchool #EdTech",
        likes: 35,
        comments: 8,
        isLiked: true,
        tags: ['QudSchool', 'EdTech']
    }
];

interface CommentItem {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
}

interface PostCardProps {
    post: CommunityPost;
    onToggleLike: (id: string) => void;
    onShare: (post: CommunityPost) => void;
    onDelete: (id: string) => void;
    isOwner?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike, onShare, onDelete, isOwner }) => {
    const { t } = useI18n();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<CommentItem[]>([]);

    const addComment = () => {
        if (!commentText.trim()) return;
        setComments(prev => [
            ...prev,
            {
                id: `c${Date.now()}`,
                author: 'Student User',
                avatar: 'S',
                text: commentText.trim(),
                timestamp: t('time.justNow'),
            },
        ]);
        setCommentText('');
    };

    return (
        <Card className="p-5">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <UserAvatar initial={post.authorAvatar} size="md" />
                    <div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <p className="font-semibold text-neutral-dark dark:text-neutral-light">{post.author}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">· {post.timestamp}</p>
                        </div>
                        <p className="text-xs text-primary dark:text-primary-light">{t(post.authorRoleKey)}</p>
                    </div>
                </div>
                {isOwner && (
                    <button
                        onClick={() => onDelete(post.id)}
                        aria-label={t('communityPage.hub.deletePost')}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>
            <p className="mt-4 text-neutral-dark dark:text-neutral-light">{post.content}</p>
            {post.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">#{tag}</span>
                    ))}
                </div>
            )}
            <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleLike(post.id)}
                    className={post.isLiked ? 'text-primary dark:text-primary-light' : ''}
                    aria-label={t('communityPage.hub.like')}
                >
                    <ThumbsUp className={`w-4 h-4 ltr:mr-1 rtl:ml-1 ${post.isLiked ? 'fill-current' : ''}`} />
                    {t('communityPage.hub.like')} ({post.likes})
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(v => !v)}
                    aria-label={t('communityPage.hub.comment')}
                >
                    <MessageCircle className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    {t('communityPage.hub.comment')} ({post.comments + comments.length})
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare(post)}
                    aria-label={t('communityPage.hub.share')}
                >
                    <Share2 className="w-4 h-4 ltr:mr-1 rtl:ml-1" />
                    {t('communityPage.hub.share')}
                </Button>
            </div>

            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    {comments.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                            {t('communityPage.hub.noComments')}
                        </p>
                    )}
                    {comments.map(c => (
                        <div key={c.id} className="flex items-start space-x-2 rtl:space-x-reverse">
                            <UserAvatar initial={c.avatar} size="sm" />
                            <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                                    <span className="text-sm font-semibold text-neutral-dark dark:text-neutral-light">{c.author}</span>
                                    <span className="text-xs text-gray-400">· {c.timestamp}</span>
                                </div>
                                <p className="text-sm text-neutral-DEFAULT dark:text-gray-300">{c.text}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-start gap-2 pt-2">
                        <textarea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder={t('communityPage.hub.writeComment')}
                            rows={2}
                            className="flex-1 p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary resize-none text-sm text-neutral-dark dark:text-neutral-light placeholder-gray-400"
                        />
                        <Button
                            variant="solid"
                            size="sm"
                            onClick={addComment}
                            disabled={!commentText.trim()}
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

const ActualCommunityPage: React.FC = () => {
    const { t } = useI18n();
    const [posts, setPosts] = usePersistentState<CommunityPost[]>('community-posts', mockPosts);
    const [newPost, setNewPost] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [toast, setToast] = useState<string | null>(null);

    const showToast = useCallback((msg: string) => {
        setToast(msg);
        window.setTimeout(() => setToast(null), 2200);
    }, []);

    const handleCreatePost = () => {
        if (!newPost.trim()) return;
        const post: CommunityPost = {
            id: `post${Date.now()}`,
            author: 'Student User',
            authorAvatar: 'S',
            authorRoleKey: 'userRoles.student',
            timestamp: t('time.justNow'),
            content: postTitle.trim()
                ? `**${postTitle.trim()}**\n\n${newPost}`
                : newPost,
            likes: 0,
            comments: 0,
            isLiked: false,
        };
        setPosts(prev => [post, ...prev]);
        setNewPost('');
        setPostTitle('');
        setShowModal(false);
        showToast(t('communityPage.hub.postSuccess'));
    };

    const handleToggleLike = useCallback((id: string) => {
        setPosts(prev => prev.map(p => {
            if (p.id !== id) return p;
            const liked = !p.isLiked;
            return { ...p, isLiked: liked, likes: Math.max(0, p.likes + (liked ? 1 : -1)) };
        }));
    }, [setPosts]);

    const handleShare = useCallback(async (post: CommunityPost) => {
        const url = `${window.location.origin}${window.location.pathname}#post-${post.id}`;
        const text = `${post.author}: ${post.content}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: t('communityPage.hub.title'), text, url });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                showToast(t('communityPage.hub.shareSuccess'));
            }
        } catch {
            /* user cancelled — ignore */
        }
    }, [t, showToast]);

    const handleDelete = useCallback((id: string) => {
        if (!window.confirm(t('communityPage.hub.confirmDelete'))) return;
        setPosts(prev => prev.filter(p => p.id !== id));
        showToast(t('communityPage.hub.deleteSuccess'));
    }, [setPosts, t, showToast]);

    const renderPost = (post: CommunityPost) => (
        <PostCard
            key={post.id}
            post={post}
            onToggleLike={handleToggleLike}
            onShare={handleShare}
            onDelete={handleDelete}
            isOwner={post.author === 'Student User'}
        />
    );

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-dark">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                 <header className="text-center mb-10">
                    <MessageSquare className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-neutral-dark dark:text-neutral-light sm:text-5xl">
                        {t('communityPage.hub.title')}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-DEFAULT dark:text-gray-400">
                        {t('communityPage.hub.subtitle')}
                    </p>
                </header>

                {/* Quick Post Card */}
                <Card className="p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light">
                            {t('communityPage.hub.shareThoughts')}
                        </h3>
                        {FEATURE_FLAGS.createThreads && (
                            <Button
                                onClick={() => setShowModal(true)}
                                variant="solid"
                                size="sm"
                            >
                                <Plus className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                                {t('communityPage.hub.newTopicButton')}
                            </Button>
                        )}
                    </div>
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder={t('communityPage.hub.postPlaceholder')}
                        rows={3}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary resize-none text-neutral-dark dark:text-neutral-light placeholder-gray-400"
                    />
                    <div className="flex justify-end mt-3">
                        <Button
                            onClick={handleCreatePost}
                            disabled={!newPost.trim()}
                            variant="outline"
                            size="sm"
                        >
                            <Send className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                            {t('communityPage.hub.postButton')}
                        </Button>
                    </div>
                </Card>

                {/* Create Topic Modal */}
                {FEATURE_FLAGS.createThreads && showModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" >
                            <div className="p-6" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-neutral-light">
                                        {t('communityPage.hub.newTopicTitle')}
                                    </h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        aria-label={t('modal.cancel')}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="topic-title" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-2">
                                            {t('communityPage.hub.topicTitleLabel')}
                                        </label>
                                        <input
                                            id="topic-title"
                                            type="text"
                                            value={postTitle}
                                            onChange={(e) => setPostTitle(e.target.value)}
                                            placeholder={t('communityPage.hub.topicTitlePlaceholder')}
                                            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary text-neutral-dark dark:text-neutral-light"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="topic-content" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-2">
                                            {t('communityPage.hub.topicContentLabel')}
                                        </label>
                                        <textarea
                                            id="topic-content"
                                            value={newPost}
                                            onChange={(e) => setNewPost(e.target.value)}
                                            placeholder={t('communityPage.hub.topicContentPlaceholder')}
                                            rows={8}
                                            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary resize-none text-neutral-dark dark:text-neutral-light"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowModal(false);
                                            setNewPost('');
                                            setPostTitle('');
                                        }}
                                    >
                                        {t('modal.cancel')}
                                    </Button>
                                    <Button
                                        variant="solid"
                                        onClick={handleCreatePost}
                                        disabled={!newPost.trim() || !postTitle.trim()}
                                    >
                                        <Send className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                                        {t('communityPage.hub.publishButton')}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                <div className="space-y-6">
                    {posts.map(renderPost)}
                </div>
            </div>

            {/* Toast */}
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

export default ActualCommunityPage;
