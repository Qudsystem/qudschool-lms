import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface Progress {
  courseId: string;
  completedLessons: string[];
  lastAccessed: Date;
  quizScores: Record<string, number>;
}

interface ProgressContextType {
  userProgress: Record<string, Progress>;
  loading: boolean;
  updateLessonProgress: (courseId: string, lessonId: string, completed: boolean) => Promise<void>;
  updateQuizScore: (courseId: string, quizId: string, score: number) => Promise<void>;
  getCourseProgress: (courseId: string) => Progress | null;
  getCompletionPercentage: (courseId: string) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProgress, setUserProgress] = useState<Record<string, Progress>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth() as { user: any };

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!user) {
        setUserProgress({});
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'userProgress', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserProgress(userDocSnap.data() as Record<string, Progress>);
        } else {
          // Initialize empty progress if user has no progress yet
          await setDoc(userDocRef, {});
          setUserProgress({});
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [user]);

  const updateLessonProgress = async (courseId: string, lessonId: string, completed: boolean) => {
    if (!user) return;

    try {
      // Get current progress for this course
      const courseProgress = userProgress[courseId] || {
        courseId,
        completedLessons: [],
        lastAccessed: new Date(),
        quizScores: {}
      };

      // Update completed lessons
      let updatedLessons = [...courseProgress.completedLessons];
      if (completed && !updatedLessons.includes(lessonId)) {
        updatedLessons.push(lessonId);
      } else if (!completed && updatedLessons.includes(lessonId)) {
        updatedLessons = updatedLessons.filter(id => id !== lessonId);
      }

      // Create updated progress
      const updatedProgress = {
        ...courseProgress,
        completedLessons: updatedLessons,
        lastAccessed: new Date()
      };

      // Update local state
      const newUserProgress = {
        ...userProgress,
        [courseId]: updatedProgress
      };
      setUserProgress(newUserProgress);

      // Update Firestore
      const userDocRef = doc(db, 'userProgress', user.uid);
      await updateDoc(userDocRef, newUserProgress);
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  const updateQuizScore = async (courseId: string, quizId: string, score: number) => {
    if (!user) return;

    try {
      // Get current progress for this course
      const courseProgress = userProgress[courseId] || {
        courseId,
        completedLessons: [],
        lastAccessed: new Date(),
        quizScores: {}
      };

      // Update quiz scores
      const updatedScores = {
        ...courseProgress.quizScores,
        [quizId]: score
      };

      // Create updated progress
      const updatedProgress = {
        ...courseProgress,
        quizScores: updatedScores,
        lastAccessed: new Date()
      };

      // Update local state
      const newUserProgress = {
        ...userProgress,
        [courseId]: updatedProgress
      };
      setUserProgress(newUserProgress);

      // Update Firestore
      const userDocRef = doc(db, 'userProgress', user.uid);
      await updateDoc(userDocRef, newUserProgress);
    } catch (error) {
      console.error('Error updating quiz score:', error);
    }
  };

  const getCourseProgress = (courseId: string): Progress | null => {
    return userProgress[courseId] || null;
  };

  const getCompletionPercentage = (courseId: string): number => {
    const progress = userProgress[courseId];
    if (!progress) return 0;
    
    // This would need to be adjusted based on total lessons in the course
    // For now, we'll assume a fixed number (e.g., 10 lessons per course)
    const totalLessons = 10; // This should come from course data
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        userProgress,
        loading,
        updateLessonProgress,
        updateQuizScore,
        getCourseProgress,
        getCompletionPercentage
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};