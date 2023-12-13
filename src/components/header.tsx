import { GitHubLogoIcon, SunIcon } from '@radix-ui/react-icons';

function Header() {
  return (
    <header className="mt-8 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight">Algorify</div>
      <div className="flex items-center gap-2">
        <div>
          <SunIcon width={20} height={20} />
        </div>
        <div>
          <GitHubLogoIcon width={20} height={20} />
        </div>
      </div>
    </header>
  );
}

export default Header;
