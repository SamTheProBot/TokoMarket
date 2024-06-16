import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useScrollTop = (children: any) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname, children]);
  return null;
};
