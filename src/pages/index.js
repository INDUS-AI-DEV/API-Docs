import React from 'react';
import Link from '@docusaurus/Link';
import DocsLayout from '@site/src/components/DocsLayout/DocsLayout';

import styles from './index.module.css';

const sidebarSections = [
  {
    title: 'Overview',
    links: [
      {label: 'Introduction', targetId: 'home-introduction'},
      {label: 'Text-to-Speech', targetId: 'home-tts'},
      {label: 'Speech-to-Text', targetId: 'home-stt'},
    ],
  },
  {
    title: 'TTS Service',
    links: [
      {label: 'API Reference', to: '/tts'},
    ],
  },
  {
    title: 'STT Service',
    links: [
      {label: 'API Reference', to: '/stt'},
    ],
  },
];

export default function HomePage() {
  return (
    <DocsLayout
      title="Audio Platform API"
      description="Central hub for text-to-speech and speech-to-text integration"
      sidebarSections={sidebarSections}
    >
      <section id="home-introduction" className={styles.hero}>
        <h1>API Documentation</h1>
        <p>
          Discover how to launch expressive voice experiences and reliable transcription with a consistent REST
          interface. Choose one of the services below to get started.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} to="/tts">
            Explore TTS Service
          </Link>
          <Link className={styles.secondaryAction} to="/stt">
            Explore STT Service
          </Link>
        </div>
      </section>
      <section className={styles.columns}>
        <article id="home-tts">
          <h2>Text-to-Speech</h2>
          <p>
            Convert text into natural speech using streaming or file-based modes. Learn about the shared payload,
            chunking preview, and metadata-rich file generation.
          </p>
          <Link to="/tts" className={styles.inlineLink}>
            View TTS APIs →
          </Link>
        </article>
        <article id="home-stt">
          <h2>Speech-to-Text</h2>
          <p>
            Upload audio with multipart form data to receive accurate transcripts. Review supported inputs,
            authentication requirements, and integration snippets.
          </p>
          <Link to="/stt" className={styles.inlineLink}>
            View STT API →
          </Link>
        </article>
      </section>
    </DocsLayout>
  );
}
