import type { HeadFC, PageProps } from 'gatsby';

import Header from '@/components/header';
import Main from '@/components/main';
import Nav from '@/components/nav';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-auto">
        <Nav />
        <Main />
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Visual Algorithm</title>;
