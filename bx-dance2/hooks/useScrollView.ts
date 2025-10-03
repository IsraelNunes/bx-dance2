import { useRef, useCallback } from 'react';
import { ScrollView } from 'react-native';

export const useScrollView = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });

  const scrollToTop = useCallback(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      scrollPositionRef.current = { x: 0, y: 0 };
    }
  }, []);

  const scrollToPosition = useCallback((x: number, y: number, animated: boolean = true) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, y, animated });
      scrollPositionRef.current = { x, y };
    }
  }, []);

  const scrollToEnd = useCallback((animated: boolean = true) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated });
    }
  }, []);

  const getScrollPosition = useCallback(() => {
    return scrollPositionRef.current;
  }, []);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset } = event.nativeEvent;
    scrollPositionRef.current = {
      x: contentOffset.x,
      y: contentOffset.y,
    };
  }, []);

  const scrollToItem = useCallback((index: number, itemHeight: number, animated: boolean = true) => {
    const yPosition = index * itemHeight;
    scrollToPosition(0, yPosition, animated);
  }, [scrollToPosition]);

  return {
    scrollViewRef,
    scrollToTop,
    scrollToPosition,
    scrollToEnd,
    scrollToItem,
    getScrollPosition,
    handleScroll,
  };
};