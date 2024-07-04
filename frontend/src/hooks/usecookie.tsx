import { useState, useEffect } from 'react';

export const useCookie = (name: string): string | null => {
  const [cookie, setCookie] = useState<string | null>('');

  useEffect(() => {
    const match = document.cookie
      .split(';')
      .find((item) => item.split(`=`)[0] === name);

    setCookie(match ? decodeURIComponent(match.split(`=`)[1]) : null);
  }, [name]);

  return cookie;
};
