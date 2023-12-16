import * as React from 'react';

import Layout from './src/components/layout';

import './src/styles/global.css';

const scriptElement = [
  React.createElement('script', {
    dangerouslySetInnerHTML: {
      __html: `
        try {
          const theme = localStorage.getItem('theme');

          window.__setTheme = (newTheme) => {
            if (newTheme === 'dark') document.body.classList.add('dark');
            else document.body.classList.remove('dark');

            localStorage.setItem('theme', newTheme);
          }

          window.__theme = theme;
          window.__setTheme(theme);
        } catch (e) {}
      `,
    },
  }),
];

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(scriptElement);
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
