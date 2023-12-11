import { GitHubLogoIcon, MagnifyingGlassIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

function Header() {
  return (
    <header className="sticky left-0 top-0 flex h-14 items-center justify-between gap-8 border-b border-solid border-gray-200 px-8 py-0">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">😀 Visual Algorithm</h1>
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Button variant="outline" className="gap-2 pr-24">
            <MagnifyingGlassIcon />
            <span className="text-sm text-muted-foreground">검색하기</span>
          </Button>
        </div>
        <GitHubLogoIcon className="h-6 w-6" />
        <SunIcon className="h-6 w-6" />
      </div>
    </header>
  );
}

export default Header;
