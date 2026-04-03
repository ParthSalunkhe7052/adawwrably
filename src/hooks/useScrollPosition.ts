import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currScrollY = window.scrollY;
      setScrollPosition({
        scrollY: currScrollY,
        scrollX: window.scrollX,
        isScrolled: currScrollY > 80,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}
