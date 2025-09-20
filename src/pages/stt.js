import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CodeBlock from '@theme/CodeBlock';

import styles from './api.module.css';

const STT_BASE_URL = 'http://164.52.214.239:8012';

const validationError = `{
  "detail": [
    {
      "loc": ["string", 0],
      "msg": "string",
      "type": "string"
    }
  ]
}`;

const sttInputs = [
  {name: 'file', type: 'file', defaultValue: 'required', description: 'Audio upload. Provide MIME type (for example audio/mpeg).'},
  {name: 'language', type: 'string', defaultValue: '-', description: 'Optional ISO language code to override detection.'},
  {name: 'secret_key', type: 'string', defaultValue: 'required', description: 'Credential string authorising the request.'},
  {name: 'deduct_url', type: 'string', defaultValue: '-', description: 'Optional callback URL for metering or billing hooks.'},
];

const sttOutputs = [
  {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Transcription text returned as a JSON string.'},
  {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
];

const responseExamples = [
  {label: '200 OK', language: 'json', code: '"Call transcript appears here."'},
  {label: '422 Validation Error', language: 'json', code: validationError},
];

const quickIntegrationLanguages = [
  {
    id: 'python',
    label: 'Python',
    language: 'python',
    code: `import requests

url = "${STT_BASE_URL}/stt/transcribe"
with open("synthetic_0038.mp3", "rb") as audio_file:
    files = {"file": ("synthetic_0038.mp3", audio_file, "audio/mpeg")}
    data = {
        "language": "",
        "secret_key": "YOUR_SECRET_KEY",
        "deduct_url": ""
    }
    response = requests.post(url, files=files, data=data)
response.raise_for_status()
print(response.json())
`,
  },
  {
    id: 'node',
    label: 'JavaScript (Node)',
    language: 'javascript',
    code: `import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const form = new FormData();
form.append('file', fs.createReadStream('synthetic_0038.mp3'));
form.append('language', '');
form.append('secret_key', 'YOUR_SECRET_KEY');
form.append('deduct_url', '');

const response = await fetch('${STT_BASE_URL}/stt/transcribe', {
  method: 'POST',
  body: form,
  headers: form.getHeaders(),
});
if (!response.ok) throw new Error('Request failed');
const transcript = await response.json();
console.log(transcript);
`,
  },
  {
    id: 'curl',
    label: 'cURL',
    language: 'bash',
    code: `curl -X POST "${STT_BASE_URL}/stt/transcribe" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@synthetic_0038.mp3;type=audio/mpeg" \\
  -F "language=" \\
  -F "secret_key=YOUR_SECRET_KEY" \\
  -F "deduct_url="
`,
  },
];

function SttEndpoint() {
  const [copied, setCopied] = useState(false);
  const copyValue = `POST ${STT_BASE_URL}/stt/transcribe`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <section id="stt-post-stt-transcribe" className={styles.endpointSection}>
      <div className={styles.endpointHeader}>
        <MethodBadge method="POST" />
        <code className={styles.endpointPath}>/stt/transcribe</code>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy API'}
        </button>
      </div>
      <h3 className={styles.anchorTitle}>Upload Audio for Transcription</h3>
      <p>
        Submit audio via multipart form data. The service transcribes the file and responds with text suitable for
        analytics, captions, or downstream workflows.
      </p>
      <div className={styles.ioGrid}>
        <div className={styles.tableCard}>
          <h4>Form Fields</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {sttInputs.map(input => (
                <tr key={input.name}>
                  <td><code>{input.name}</code></td>
                  <td>{input.type}</td>
                  <td>{input.defaultValue}</td>
                  <td>{input.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableCard}>
          <h4>Outputs</h4>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {sttOutputs.map(output => (
                <tr key={output.name}>
                  <td><code>{output.name}</code></td>
                  <td>{output.type}</td>
                  <td>{output.defaultValue}</td>
                  <td>{output.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.responseExamples}>
        {responseExamples.map(example => (
          <div key={example.label} className={styles.responseExampleCard}>
            <h4>{example.label}</h4>
            <CodeBlock language={example.language}>{example.code}</CodeBlock>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SttPage() {
  return (
    <DocsLayout
      title="Audio Platform API"
      description="Speech-to-text service overview"
      sidebarSections={[
        {
          title: 'Overview',
          links: [
            {label: 'Introduction', to: '/'},
            {label: 'Text-to-Speech', to: '/tts'},
            {label: 'Speech-to-Text', to: '/stt'},
          ],
        },
        {
          title: 'TTS Service',
          links: [
            {label: 'Introduction', to: '/tts'},
            {label: 'Shared Payload', to: '/tts'},
            {label: 'POST /v1/audio/speech', to: '/tts'},
            {label: 'POST /v1/audio/speech/file', to: '/tts'},
            {label: 'POST /v1/audio/speech/preview', to: '/tts'},
          ],
        },
        {
          title: 'STT Service',
          links: [
            {label: 'Introduction', targetId: 'stt-introduction'},
            {label: 'POST /stt/transcribe', targetId: 'stt-post-stt-transcribe', method: 'POST'},
          ],
        },
      ]}
      integration={{
        title: 'Quick Integration',
        description: 'Upload an audio file and retrieve the transcription using your favourite language.',
        defaultLanguage: 'python',
        languages: quickIntegrationLanguages,
      }}
    >
      <section id="stt-introduction" className={styles.pageIntro}>
        <h1>Speech-to-Text Service</h1>
        <p>
          Convert spoken audio into accurate transcripts using a single multipart endpoint. Provide the file, optional
          language hints, and your secret key to obtain text ready for analysis or storage.
        </p>
      </section>
      <SttEndpoint />
    </DocsLayout>
  );
}
