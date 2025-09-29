import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CodeBlock from '@theme/CodeBlock';

import styles from './api.module.css';

const STT_BASE_URL = 'https://voice.induslabs.io';

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
  {name: 'file', type: 'file', defaultValue: 'required', description: 'Audio file to transcribe (binary).'},
  {name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.'},
  {name: 'language', type: 'string', defaultValue: '-', description: "Optional ISO code (e.g., 'en', 'hi') for forced language detection."},
  {name: 'chunk_length_s', type: 'number', defaultValue: '-', description: 'Chunk length in seconds (1.0–30.0).'},
  {name: 'stride_s', type: 'number', defaultValue: '-', description: 'Stride in seconds between chunks (1.0–29.0).'},
  {name: 'overlap_words', type: 'integer', defaultValue: '-', description: 'Number of overlapping words for deduplication (0–20).'},
];

const sttOutputs = [
  {name: '200 OK', type: 'application/json / text/event-stream', defaultValue: '-', description: 'Successful response: SSE stream (for /v1/audio/transcribe) or JSON (for /file).'},
  {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
];

const responseExamples = [
  {
    label: '200 OK (SSE stream)',
    language: 'json',
    code: `{"type":"partial","word":"hello","provisional":true,"chunk_start":0.0,"chunk_end":6.0}
{"type":"chunk_final","text":"full chunk text","chunk_start":0.0,"chunk_end":6.0}
{"type":"final","text":"final transcript","audio_duration_seconds":10.5,"processing_time_seconds":2.1}`,
  },
  {
    label: '200 OK (JSON)',
    language: 'json',
    code: `{
  "text": "full transcript here",
  "audio_duration_seconds": 10.5,
  "processing_time_seconds": 2.1
}`,
  },
  {label: '422 Validation Error', language: 'json', code: validationError},
];

const quickIntegrationLanguages = [
  {
    id: 'python',
    label: 'Python',
    language: 'python',
    code: `import requests

url = "${STT_BASE_URL}/v1/audio/transcribe/file"
with open("audio.mp3", "rb") as audio_file:
    files = {"file": ("audio.mp3", audio_file, "audio/mpeg")}
    data = {
        "api_key": "YOUR_API_KEY",
        "language": "en",
        "chunk_length_s": 15.0,
        "stride_s": 5.0,
        "overlap_words": 3,
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
form.append('file', fs.createReadStream('audio.mp3'));
form.append('api_key', 'YOUR_API_KEY');
form.append('language', 'en');
form.append('chunk_length_s', '15.0');
form.append('stride_s', '5.0');
form.append('overlap_words', '3');

const response = await fetch('${STT_BASE_URL}/v1/audio/transcribe/file', {
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
    code: `curl -X POST "${STT_BASE_URL}/v1/audio/transcribe/file" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@audio.mp3;type=audio/mpeg" \\
  -F "api_key=YOUR_API_KEY" \\
  -F "language=en" \\
  -F "chunk_length_s=15.0" \\
  -F "stride_s=5.0" \\
  -F "overlap_words=3"
`,
  },
];

// Generic section renderer
function EndpointSection({id, method, path, title, description, examples}) {
  const [copied, setCopied] = useState(false);
  const copyValue = `${method} ${STT_BASE_URL}${path}`;

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
    <section id={id} className={styles.endpointSection}>
      <div className={styles.endpointHeader}>
        <MethodBadge method={method} />
        <code className={styles.endpointPath}>{path}</code>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy API'}
        </button>
      </div>
      <h3 className={styles.anchorTitle}>{title}</h3>
      <p>{description}</p>
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
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {sttOutputs.map(output => (
                <tr key={output.name}>
                  <td><code>{output.name}</code></td>
                  <td>{output.type}</td>
                  <td>{output.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.responseExamples}>
        {examples.map(example => (
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
          title: 'STT Service',
          links: [
            {label: 'Introduction', targetId: 'stt-introduction'},
            {label: 'POST /v1/audio/transcribe', targetId: 'stt-post-v1-audio-transcribe', method: 'POST'},
            {label: 'POST /v1/audio/transcribe/file', targetId: 'stt-post-v1-audio-transcribe-file', method: 'POST'},
            {label: 'GET /v1/audio/transcribe/config', targetId: 'stt-get-v1-audio-transcribe-config', method: 'GET'},
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
          Convert spoken audio into accurate transcripts using flexible endpoints.  
          Use <code>/v1/audio/transcribe</code> for streaming SSE results, or <code>/v1/audio/transcribe/file</code> for complete JSON output.
        </p>
      </section>

      <EndpointSection
        id="stt-post-v1-audio-transcribe"
        method="POST"
        path="/v1/audio/transcribe"
        title="Transcribe Audio (Streaming)"
        description="Transcribe audio file to text with streaming results via Server-Sent Events (SSE)."
        examples={[
          responseExamples[0],
          responseExamples[2] || {label: '422 Validation Error', language: 'json', code: validationError},
        ]}
      />

      <EndpointSection
        id="stt-post-v1-audio-transcribe-file"
        method="POST"
        path="/v1/audio/transcribe/file"
        title="Transcribe Audio File (JSON)"
        description="Transcribe audio file and return complete transcript as JSON (non-streaming)."
        examples={[
          responseExamples[1],
          {label: '422 Validation Error', language: 'json', code: validationError},
        ]}
      />

      <EndpointSection
        id="stt-get-v1-audio-transcribe-config"
        method="GET"
        path="/v1/audio/transcribe/config"
        title="Get STT Config"
        description="Retrieve STT configuration and supported options."
        examples={[
          {label: '200 OK', language: 'json', code: `{"supported_languages": ["en", "hi"], "max_chunk_length": 30}`},
        ]}
      />
    </DocsLayout>
  );
}
