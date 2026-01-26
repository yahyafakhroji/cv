'use client';

import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};
