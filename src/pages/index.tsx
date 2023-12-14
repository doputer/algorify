import { FrameIcon } from '@radix-ui/react-icons';
import { graphql, PageProps } from 'gatsby';

function IndexPage({ data }: PageProps<Queries.PagesQuery>) {
  return (
    <div className="flex flex-col gap-8">
      {data.allMdx.nodes.map(({ frontmatter }, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div>
            <a
              href={frontmatter.title.split(' ').join('-').toLowerCase()}
              className="text-2xl font-bold text-sky-700 hover:text-sky-900 dark:hover:text-sky-500"
            >
              {frontmatter.title}
            </a>
          </div>
          <div className="flex gap-1">
            {frontmatter.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 rounded-full bg-gray-100 px-2 dark:bg-gray-600"
              >
                <FrameIcon />
                {tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default IndexPage;

export const query = graphql`
  query Pages {
    allMdx(sort: { frontmatter: { title: ASC } }) {
      nodes {
        frontmatter {
          title
          tags
        }
      }
    }
  }
`;
