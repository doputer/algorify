import { graphql, PageProps } from 'gatsby';

function IndexPage({ data }: PageProps<Queries.PagesQuery>) {
  const links: { [key: string]: string[] } = {};

  data.allMdx.nodes.forEach((node) => {
    const { frontmatter } = node;
    const { type, title } = frontmatter;

    if (type in links) links[type].push(title);
    else links[type] = [title];
  });

  return (
    <div>
      {Object.entries(links).map(([groupName, groupItems]) => (
        <div key={groupName} className="flex flex-col gap-2">
          <div className="text-xl font-bold">{groupName}</div>
          {groupItems.map((groupItem) => (
            <a
              key={groupItem}
              href={groupItem.split(' ').join('-').toLowerCase()}
              className="hover:font-semibold"
            >
              <div>{groupItem}</div>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default IndexPage;

export const query = graphql`
  query Pages {
    allMdx {
      nodes {
        frontmatter {
          type
          title
        }
      }
    }
  }
`;
