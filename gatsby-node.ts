import path from 'path';

import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  actions.createTypes(`
    type PagesQuery {
      allMdx: AllMdx!
    }

    type PageQuery {
      mdx: Nodes!
    }

    type AllMdx {
      nodes: [Nodes!]!
    }

    type Nodes {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
      type: String!
      title: String!
      tags: [String!]!
    }
  `);
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
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const postTemplate = path.resolve(__dirname, `src/pages/post.tsx`);

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: node.fields.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
