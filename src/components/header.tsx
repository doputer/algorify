import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

import useTheme from '@/hooks/useTheme';

function Header() {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="flex items-center justify-between">
      <a href="/algorify">
        <div className="text-xl font-bold tracking-tight">Algorify</div>
      </a>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {theme === 'light' ? (
            <SunIcon width={20} height={20} />
          ) : (
            <MoonIcon width={20} height={20} />
          )}
        </button>
        <a href="https://github.com/doputer/algorify" target="_blank" rel="noreferrer">
          <GitHubLogoIcon width={20} height={20} />
        </a>
      </div>
    </header>
  );
}

export default Header;
