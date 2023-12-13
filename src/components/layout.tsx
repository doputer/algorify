import Header from '@/components/header';

interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto my-0 max-w-3xl">
      <Header />
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default Layout;
