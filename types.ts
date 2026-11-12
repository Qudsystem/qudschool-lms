// FIX: Populated the types.ts file with definitions based on usage across the application.
import React from 'react';

// General
export type Language = 'en' | 'ar';

export interface NavLinkItem {
  labelKey: string;
  path: string;
}

// User and Session
export interface User {
  id: string;
  name?: string; // Optional as not always present
  email: string;
  role: string;
  roleKey?: string; // For translation
  joinedDate?: string;
  status?: string;
  statusKey?: string;
}

export interface SessionLog {
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  loginTime: Date;
  logoutTime?: Date;
  durationMinutes?: number;
}

// UI Components
export interface DropdownItem {
  element?: React.ReactNode;
  labelKey?: string;
  path?: string;
  icon?: React.ReactNode;
  isDivider?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface NotificationItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  timeAgo: string;
  read: boolean;
  type: 'new_course' | 'assignment' | 'system' | 'announcement' | 'reminder';
  icon?: React.ReactElement;
  link?: string;
}

export interface FeatureItem {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

export interface Badge {
    id: string;
    nameKey: string;
    descriptionKey: string;
    icon: React.ReactElement;
    dateEarned: string;
}

// Chat / AI
export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: Date;
  image?: string;
  isStreaming?: boolean;
}

// Learning Content
export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  instructorKey: string;
  durationKey: string;
  rating: number;
  difficulty: CourseDifficulty;
  difficultyKey: string;
  category: string;
  categoryKey: string;
  // Optional metadata (used by admin pages)
  enrolled?: number;
  lessons?: number;
}

export interface StudentCourseProgress {
    id: string;
    title: string;
    titleKey: string;
    progress: number;
    imageUrl: string;
    instructor: string;
    instructorKey: string;
    nextLesson: string;
    nextLessonKey: string;
}

export interface Review {
    id: string;
    author: string;
    authorInitial: string;
    rating: number;
    commentKey: string;
    date: string;
}

// Flashcards
export interface Flashcard {
  id: string;
  question?: string; // for new cards
  answer?: string; // for new cards
  questionKey?: string; // for existing cards
  answerKey?: string; // for existing cards
}

export interface FlashcardDeck {
  id: string;
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  icon: React.ReactElement;
  cards: Flashcard[];
}

// User Stats
export interface UserStudyStats {
  points: number;
  streak: number;
  lastStudied: string | null;
  correctAnswers: number;
  gameRounds: number;
}

// Admin / Dashboard
export interface KpiCardItem {
  id: string;
  titleKey: string;
  value: string;
  trend?: string;
  icon: React.ReactElement;
  iconBgColor?: string;
}

export interface ActiveUserItem {
  id: string;
  name: string;
  email: string;
  roleKey: string;
  avatarInitial: string;
  avatarUrl?: string;
  statusKey: 'online' | 'idle';
  lastSeenKey: string;
}

export interface TableRow {
  id: string | number;
  [key: string]: any; // Allow other properties
}

export interface TableColumn<T extends TableRow> {
  key: keyof T | string;
  headerKey: string;
  render?: (item: T, index: number) => React.ReactNode;
  width?: string;
}


// i18n
export type Translations = Record<string, string | object>;

export interface I18nContextType {
  language: Language;
  langDir: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  translations: Record<string, Translations>;
}

// Pricing
export interface PricingPlan {
  id: string;
  nameKey: string;
  priceMonthly: string;
  priceYearly?: string;
  featureKeys: string[];
  ctaTextKey: string;
  isPopular?: boolean;
  ctaAction: string;
}

// Community
export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  authorRoleKey: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags?: string[];
}

export interface CommunityThread {
    id: string;
    title: string;
    content: string;
    author: string;
    authorAvatar: string;
    authorRoleKey: string;
    timestamp: string;
    likes: number;
    replies: number;
    isLiked: boolean;
    tags?: string[];
}

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  titleKey: string;
  rating: number;
  quoteKey: string;
  avatarUrl: string;
  source: string;
  courseId?: string;
  isFeatured?: boolean;
}
