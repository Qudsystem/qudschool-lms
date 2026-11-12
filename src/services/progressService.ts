export const progressService = {
  updateProgress: async (userId: string, courseId: string, progress: number) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`progress.courses.${courseId}`]: progress
    });
  },
  
  awardAchievement: async (userId: string, achievementId: string) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`achievements.${achievementId}`]: true
    });
  }
};
