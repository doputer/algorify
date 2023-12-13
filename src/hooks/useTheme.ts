import { useEffect, useState } from 'react';

const useTheme = (): [string, () => void] => {
  const checkTheme = () => {
    const theme = localStorage.getItem('theme');

    if (!theme) return 'light';
    return theme;
  };
  const [theme, setDark] = useState(() => checkTheme());
  const toggleTheme = () => {
    setDark(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
