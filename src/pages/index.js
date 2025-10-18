import React from 'react';
import Link from '@docusaurus/Link';
import DocsLayout from '@site/src/components/DocsLayout/DocsLayout';
import {getSidebarSections} from '@site/src/sidebarConfig';

import styles from './index.module.css';

export default function HomePage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Speech services with REST and SDK interfaces"
      sidebarSections={getSidebarSections('home')}
    >
      <section id="home-introduction" className={styles.pageIntro}>
        <h1 className={styles.heroTitle}>API Documentation</h1>
        <p className={styles.heroDescription}>
          Discover how to launch expressive voice experiences and reliable transcription with a consistent REST
          interface. Choose one of the services below to get started.
        </p>
        <div className={styles.heroActions}>
          <Link to="/tts" className={styles.heroButton}>
            Explore TTS Service
          </Link>
          <Link to="/stt" className={styles.heroButton}>
            Explore STT Service
          </Link>
          {/* NEW: Add SDK button */}
          <Link to="/sdk" className={styles.heroButton}>
            Python SDK
          </Link>
        </div>
      </section>

      <section className={styles.servicesGrid}>
        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>Text-to-Speech</h2>
          <p className={styles.serviceDescription}>
            Convert text into natural speech using streaming or file-based modes. Learn about the shared payload,
            chunking preview, and metadata-rich file generation.
          </p>
          <Link to="/tts" className={styles.serviceLink}>
            View TTS APIs →
          </Link>
        </div>
        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>Speech-to-Text</h2>
          <p className={styles.serviceDescription}>
            Upload audio with multipart form data to receive accurate transcripts. Review supported inputs,
            authentication requirements, and integration snippets.
          </p>
          <Link to="/stt" className={styles.serviceLink}>
            View STT API →
          </Link>
        </div>

        {/* NEW: Add SDK card */}
        <div className={styles.serviceCard}>
          <h2 className={styles.serviceTitle}>Python SDK</h2>
          <p className={styles.serviceDescription}>
            Official Python SDK for seamless integration. Features synchronous and asynchronous APIs, streaming
            support, and comprehensive error handling for production use.
          </p>
          <Link to="/sdk" className={styles.serviceLink}>
            View SDK Docs →
          </Link>
        </div>
      </section>
    </DocsLayout>
  );
}
