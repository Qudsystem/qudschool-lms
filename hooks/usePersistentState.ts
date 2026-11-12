
import { useState, useEffect, useCallback } from 'react';

function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
    return defaultValue;
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        setState(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, state] 
  );
  
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.storageArea === localStorage) {
        if (event.newValue) {
          try {
              setState(JSON.parse(event.newValue) as T);
          } catch (error) {
              console.error(`Error parsing storage change for key "${key}":`, error);
          }
        } else { // Key was removed or set to null
          setState(defaultValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, defaultValue]);

  return [state, setValue];
}

export default usePersistentState;
