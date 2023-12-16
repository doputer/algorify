import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  pathPrefix: '/algorify',
  siteMetadata: {
    title: `Algorify`,
    siteUrl: `https://doputer.github.io/algorify`,
  },
  graphqlTypegen: true,
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts`,
      },
      __key: 'posts',
    },
  ],
  flags: {
    DEV_SSR: true,
  },
};

export default config;
