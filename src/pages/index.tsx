import { graphql, type HeadFC, type PageProps } from 'gatsby';

import Header from '@/components/header';
import Main from '@/components/main';
import Nav from '@/components/nav';

function IndexPage({ data }: PageProps<Queries.AlgorithmQuery>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-auto">
        <Nav />
        <Main content={data.mdx} />
      </div>
    </div>
  );
}

export default IndexPage;

export const Head: HeadFC = () => <title>Visual Algorithm</title>;

export const query = graphql`
  query Algorithm($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        type
        title
      }
      body
    }
  }
`;
