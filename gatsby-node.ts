import path from 'path';

import { createFilePath } from 'gatsby-source-filesystem';

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/lib/utils': path.resolve(__dirname, 'src/lib/utils'),
      },
    },
  });
};

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query Node {
      allMdx {
        nodes {
          fields {
            slug
          }
          body
          frontmatter {
            type
            title
          }
        }
      }
    }
  `);

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(__dirname, `src/pages/index.tsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
