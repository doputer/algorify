import { graphql, useStaticQuery } from 'gatsby';

interface Node {
  frontmatter: {
    type: string;
    title: string;
  };
}

function Nav() {
  const { allMdx } = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            type
            title
          }
        }
      }
    }
  `);

  const items: { [key: string]: string[] } = {};

  allMdx.nodes.forEach(({ frontmatter }: Node) => {
    if (frontmatter.type in items) {
      items[frontmatter.type].push(frontmatter.title);
    } else {
      items[frontmatter.type] = [frontmatter.title];
    }
  });

  const isCurrentPath = (path: string) => window.location.pathname === `/${path.toLowerCase()}/`;

  return (
    <aside className="border-r-1 sticky left-0 top-14 flex h-[calc(100vh-3.5rem)] min-w-[300px] flex-col items-center overflow-y-scroll border-r border-solid border-gray-200 px-8 pt-6">
      <div className="flex h-full w-full flex-col gap-4">
        {Object.entries(items).map(([groupName, groupItems]) => {
          return (
            <div key={groupName}>
              <div className="pb-2 font-bold">{groupName.split('-').join(' ')}</div>
              <ul>
                {groupItems.map((groupItem) => (
                  <a key={groupItem} href={'/' + groupItem.toLowerCase()}>
                    <li
                      className={`border-l border-solid px-2 py-1 font-medium hover:border-gray-500 ${
                        isCurrentPath(groupItem)
                          ? 'border-gray-500'
                          : 'border-gray-300 text-muted-foreground'
                      }`}
                    >
                      {groupItem.split('-').join(' ')}
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Nav;
