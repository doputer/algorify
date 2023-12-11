import { ChevronRight } from 'lucide-react';

interface MainProps {
  body: string | null;
  frontmatter: {
    type: string | null;
    title: string | null;
  } | null;
}

function Main({ content }: { content: MainProps | null }) {
  const formatText = (text: string | null | undefined) => text!.split('-').join(' ');

  return (
    <div className=" flex flex-1">
      <main className="flex-1 p-6">
        <div className="mb-4 flex">
          <div className="text-muted-foreground">{formatText(content?.frontmatter?.type)}</div>
          <ChevronRight />
          <div className="font-semibold">{formatText(content?.frontmatter?.title)}</div>
        </div>
        <div>
          <h1 className="mb-12 scroll-m-20 text-4xl font-bold tracking-tight">
            {formatText(content?.frontmatter?.title)}
          </h1>
          <div>{content?.body}</div>
        </div>
      </main>
      <div className="h-[calc(100vh-3.5rem)] min-w-[300px]"></div>
    </div>
  );
}

export default Main;
