import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

import useTheme from '@/hooks/useTheme';

function Header() {
  const [toggleTheme] = useTheme();

  return (
    <header className="flex items-center justify-between">
      <a href="/algorify">
        <div className="text-xl font-bold tracking-tight">Algorify</div>
      </a>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          <SunIcon width={20} height={20} className="hidden dark:block" />
          <MoonIcon width={20} height={20} className="dark:hidden" />
        </button>
        <a href="https://github.com/doputer/algorify" target="_blank" rel="noreferrer">
          <GitHubLogoIcon width={20} height={20} />
        </a>
      </div>
    </header>
  );
}

export default Header;
