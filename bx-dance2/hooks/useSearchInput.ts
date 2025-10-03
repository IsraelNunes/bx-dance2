import { useRef, useCallback, useEffect } from 'react';
import { TextInput } from 'react-native';

export const useSearchInput = () => {
  const searchInputRef = useRef<TextInput>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const previousValueRef = useRef<string>('');

  const focusSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const blurSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, []);

  const clearSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.clear();
      previousValueRef.current = '';
    }
  }, []);

  const createDebouncedCallback = useCallback((callback: (value: string) => void, delay: number) => {
    return (value: string) => {
      // Limpar timer anterior se existir
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Criar novo timer
      debounceTimerRef.current = setTimeout(() => {
        if (previousValueRef.current !== value) {
          previousValueRef.current = value;
          callback(value);
        }
      }, delay);
    };
  }, []);

  // useEffect para cleanup do timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const getInputValue = useCallback(() => {
    return previousValueRef.current;
  }, []);

  return {
    searchInputRef,
    focusSearchInput,
    blurSearchInput,
    clearSearchInput,
    createDebouncedCallback,
    getInputValue,
  };
};