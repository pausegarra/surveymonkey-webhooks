"use client";

import { useState, useEffect, useRef } from 'react';

export function useDebouncedState<T> (initialValue: T, delay: number): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialValue);
  const [debouncedState, setDebouncedState] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state, delay]);

  return [debouncedState, setState];
}
