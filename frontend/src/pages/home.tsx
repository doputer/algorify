import Header from '@/components/header';
import Nav from '@/components/nav';

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-auto">
        <Nav />
        <main className="py-6"></main>
      </div>
    </div>
  );
}

export default HomePage;
