// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  sttSidebar: [
    {
      type: 'category',
      label: 'Speech-to-Text APIs',
      collapsed: false,
      items: [
        {
          type: 'link',
          label: 'POST /v1/audio/transcribe',
          href: '/stt#stt-post-v1-audio-transcribe',
        },
        {
          type: 'link',
          label: 'POST /v1/audio/transcribe/file',
          href: '/stt#stt-post-v1-audio-transcribe-file',
        },
      ],
    },
  ],
};

export default sidebars;
