const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const value = {
    user,
    setUser,
    courses,
    setCourses,
    achievements,
    setAchievements,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
