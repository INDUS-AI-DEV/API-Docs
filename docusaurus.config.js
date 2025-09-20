import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Audio Platform API',
  tagline: 'Complete reference for speech synthesis and transcription endpoints',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://audio-api.example.com',
  baseUrl: '/',

  organizationName: 'audio-platform',
  projectName: 'api-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
