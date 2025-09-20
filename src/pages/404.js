import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <main className="container margin-vert--xl text--center">
        <h1>Page not found</h1>
        <p>The page you were looking for does not exist.</p>
        <p>
          Return to the{' '}
          <Link to="/">Audio Platform API home page</Link>{' '}to explore the
          TTS and STT endpoints.
        </p>
        <div id="tts-apis" hidden />
        <div id="stt-api" hidden />
        <div id="quickstart" hidden />
      </main>
    </Layout>
  );
}
