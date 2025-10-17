import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import {getSidebarSections} from '@site/src/config/sidebarSections';
import CodeBlock from '@theme/CodeBlock';

import styles from './api.module.css';

const TTS_BASE_URL = 'https://voice.induslabs.io';

const sharedPayload = `{
  "text": "Hello world from INDUSLABS",
  "voice": "Indus-hi-urvashi",
  "output_format": "pcm",
  "stereo": false,
  "model": "oryphus-3b",
  "api_key": "YOUR_API_KEY",
  "normalize": false,
  "read_urls_as": "verbatim"
}`;

const validationError = `{
  "detail": [
    {
      "loc": ["string", 0],
      "msg": "string",
      "type": "string"
    }
  ]
}`;

const sharedInputs = [
  {name: 'text', type: 'string', defaultValue: 'required', description: 'The text to be synthesized into speech.'},
  {name: 'voice', type: 'string', defaultValue: '-', description: 'The voice model to be used (e.g., "Indus-hi-urvashi").'},
  {name: 'output_format', type: 'string', defaultValue: '-', description: 'Audio format for output (e.g., "pcm").'},
  {name: 'stereo', type: 'boolean', defaultValue: 'false', description: 'Whether the output should be stereo (default: false).'},
  {name: 'model', type: 'string', defaultValue: '-', description: 'The TTS model to use (e.g., "oryphus-3b").'},
  {name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.'},
  {name: 'normalize', type: 'boolean', defaultValue: 'false', description: 'Whether to normalize text before synthesis (default: false).'},
  {name: 'read_urls_as', type: 'string', defaultValue: '-', description: 'Option to handle URLs in the text (e.g., "verbatim").'},
];

const streamInput = {
  name: 'stream',
  type: 'boolean',
  defaultValue: 'false',
  description: 'Whether to stream the output (default: false).',
};

const voiceListExample = `{
  "voices": [
    {
      "id": "Indus-hi-urvashi",
      "language": "hi",
      "gender": "female",
      "description": "Conversational Hindi voice",
      "tags": ["hi", "female", "neural"]
    }
  ]
}`;

const endpoints = [
  {
    anchor: 'tts-post-v1-audio-speech',
    method: 'POST',
    path: '/v1/audio/speech',
    title: 'Synthesize Speech',
    description:
      'This endpoint is used to synthesize speech (TTS - Text-to-Speech).',
    notes: [
      'Converts input text into speech audio.',
      'Uses credit system authentication.',
      'Provides a simplified request model with environment-based defaults.',
    ],
    inputs: sharedInputs,
    outputs: [
      {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns synthesized speech audio or related metadata.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {
        label: '200 OK',
        language: 'json',
        code: `"string"`,
      },
      {label: '422 Validation Error', language: 'json', code: validationError},
    ],
  },
  {
    anchor: 'tts-post-v1-audio-speech-file',
    method: 'POST',
    path: '/v1/audio/speech/file',
    title: 'Synthesize Speech File',
    description:
      'This endpoint is used to synthesize speech (TTS - Text-to-Speech) and return the complete audio file as a downloadable file.',
    notes: [
      'Converts input text into speech audio.',
      'Returns the synthesized audio as a file download (unlike /v1/audio/speech which may provide metadata or stream results).',
    ],
    inputs: [...sharedInputs, streamInput],
    outputs: [
      {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns the synthesized speech audio as a downloadable file.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {
        label: '200 OK',
        language: 'json',
        code: `"string"`,
      },
      {label: '422 Validation Error', language: 'json', code: validationError},
    ],
  },
  {
    anchor: 'tts-post-v1-audio-speech-preview',
    method: 'POST',
    path: '/v1/audio/speech/preview',
    title: 'Speech Preview',
    description:
      'This endpoint provides a preview of how text will be processed for speech synthesis without actually generating audio.',
    notes: [
      'Accepts input text and parameters, then shows how the text would be processed by the TTS system.',
      'Does not generate audio, only returns metadata/processed form of the input.',
    ],
    inputs: [...sharedInputs, streamInput],
    outputs: [
      {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns processed text preview as JSON.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {label: '200 OK', language: 'json', code: `"string"`},
      {label: '422 Validation Error', language: 'json', code: validationError},
    ],
  },
  {
    anchor: 'tts-get-v1-voice-get-voices',
    method: 'GET',
    path: '/v1/voice/get-voices',
    title: 'List Available Voices',
    description:
      'Retrieves the catalog of voices available for speech synthesis.',
    notes: [
      'Proxies the Indus AI voice registry and returns structured metadata for each supported voice.',
      'No request payload is required; the endpoint streams the latest catalog on every call.',
    ],
    inputs: null,
    outputs: [
      {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Collection of voice definitions with language, gender, and identifiers.'},
      {name: '500 Internal Server Error', type: 'application/json', defaultValue: '-', description: 'Returned when the upstream voice service is unavailable.'},
    ],
    examples: [
      {label: '200 OK', language: 'json', code: voiceListExample},
    ],
  },
];

function TableCard({title, rows, headerLabels}) {
  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <div className={styles.tableCard}>
      <h4>{title}</h4>
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>
              {headerLabels.map(label => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              const normalizedDefault =
                typeof row.defaultValue === 'string' ? row.defaultValue.toLowerCase() : row.defaultValue;
              const isRequired = normalizedDefault === 'required';
              return (
                <tr key={row.name}>
                  <td data-label={headerLabels[0]}>
                    <code>{row.name}</code>
                    {isRequired && <span className={styles.requiredBadgeMobile} aria-hidden="true">*</span>}
                  </td>
                  <td data-label={headerLabels[1]}>{row.type}</td>
                  <td data-label={headerLabels[2]} data-required={isRequired ? 'true' : 'false'}>
                    {isRequired ? 'required' : row.defaultValue}
                  </td>
                  <td data-label={headerLabels[3]}>{row.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const outputHeaderLabels = ['Status', 'Type', 'Default', 'Description'];

function OutputCard({rows, headerLabels = outputHeaderLabels}) {
  return (
    <div className={styles.tableCard}>
      <h4>Outputs</h4>
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>
              {headerLabels.map(label => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.name}>
                <td data-label={headerLabels[0]}><code>{row.name}</code></td>
                <td data-label={headerLabels[1]}>{row.type}</td>
                <td data-label={headerLabels[2]}>{row.defaultValue}</td>
                <td data-label={headerLabels[3]}>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EndpointSection({endpoint}) {
  const [copied, setCopied] = useState(false);
  const copyValue = `${TTS_BASE_URL}${endpoint.path}`;

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
    <section id={endpoint.anchor} className={styles.endpointSection}>
      <div className={styles.endpointHeader}>
        <MethodBadge method={endpoint.method} />
        <code className={styles.endpointPath}>{endpoint.path}</code>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy API'}
        </button>
      </div>
      <h3 className={styles.anchorTitle}>{endpoint.title}</h3>
      <p>{endpoint.description}</p>
      {endpoint.notes?.length > 0 && (
        <div className={styles.callout}>
          <strong>Functionality</strong>
          <ul>
            {endpoint.notes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.ioGrid}>
        <TableCard
          title="Inputs"
          rows={endpoint.inputs}
          headerLabels={['Name', 'Type', 'Default', 'Description']}
        />
        <OutputCard rows={endpoint.outputs} />
      </div>
      {endpoint.examples?.length > 0 && (
        <div className={styles.responseExamples}>
          {endpoint.examples.map(example => (
            <div key={example.label} className={styles.responseExampleCard}>
              <h4>{example.label}</h4>
              <CodeBlock language={example.language}>{example.code}</CodeBlock>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function TtsPage() {
  const sidebarSections = getSidebarSections('tts');

  return (
    <DocsLayout
      title="Audio Platform API"
      description="Text-to-speech service overview"
      sidebarSections={sidebarSections}
      integration={{
        title: 'Quick Integration',
        description: 'Choose a ready-to-run example, including the Python SDK basic usage snippet.',
        defaultLanguage: 'python-sdk',
        languages: [
          {
            id: 'python-sdk',
            label: 'Python SDK (Basic Usage)',
            language: 'python',
            code: `from induslabs import Client

client = Client(api_key="your_api_key")

# Simple synthesis
response = client.tts.speak(
    text="Hello, this is a test",
    voice="Indus-hi-Urvashi"
)

# Save to file
response.save("output.wav")

# Access metadata
print(f"Sample Rate: {response.sample_rate}Hz")
print(f"Channels: {response.channels}")
print(f"Format: {response.format}")
print(f"Request ID: {response.request_id}")`,
          },
          {
            id: 'python',
            label: 'Python (REST API)',
            language: 'python',
            code: `import requests

url = "${TTS_BASE_URL}/v1/audio/speech"
payload = {
    "text": "Hello world from INDUSLABS",
    "voice": "Indus-hi-urvashi",
    "output_format": "mp3",
    "stereo": False,
    "model": "oryphus-3b",
    "api_key": "YOUR_API_KEY",
    "normalize": False,
    "read_urls_as": "verbatim"
}
response = requests.post(url, json=payload)
response.raise_for_status()
print(response.json())
`,
          },
          {
            id: 'node',
            label: 'JavaScript (Node)',
            language: 'javascript',
            code: `import fetch from 'node-fetch';

const payload = {
  text: 'Hello world from INDUSLABS',
  voice: 'Indus-hi-urvashi',
  output_format: 'mp3',
  stereo: false,
  model: 'oryphus-3b',
  api_key: 'YOUR_API_KEY',
  normalize: false,
  read_urls_as: 'verbatim',
};

const response = await fetch('${TTS_BASE_URL}/v1/audio/speech', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
if (!response.ok) throw new Error('Request failed');
const apiResult = await response.json();
console.log(apiResult);
`,
          },
          {
            id: 'curl',
            label: 'cURL',
            language: 'bash',
            code: `curl -X POST "${TTS_BASE_URL}/v1/audio/speech" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Hello world from INDUSLABS", "voice": "Indus-hi-urvashi", "output_format": "mp3", "stereo": false, "model": "oryphus-3b", "api_key": "YOUR_API_KEY", "normalize": false, "read_urls_as": "verbatim"}'
`,
          },
        ],
      }}
    >
      <section id="tts-introduction" className={styles.pageIntro}>
        <h1>Text-to-Speech Service</h1>
        <p>
          Deliver natural-sounding speech with configurable voices, streaming playback, and file-based output.
          All endpoints share a consistent payload so you can reuse the same integration across streaming and
          download workflows.
        </p>
      </section>
      <section id="tts-shared-payload" className={styles.sectionHeading}>
        <h2>Shared Request Payload</h2>
        <p>
          Use the same JSON schema for every text-to-speech endpoint. Override optional fields (for example
          output_format or stream on file/preview calls) depending on the output you need.
        </p>
      </section>
      <div className={styles.payloadCard}>
        <CodeBlock language="json">{sharedPayload}</CodeBlock>
      </div>
      <div className={styles.tableCard}>
        <h3>Payload Fields</h3>
        <div className={styles.tableScroll}>
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
            {sharedInputs.map(field => {
              const normalizedDefault =
                typeof field.defaultValue === 'string' ? field.defaultValue.toLowerCase() : field.defaultValue;
              const isRequired = normalizedDefault === 'required';
              return (
                <tr key={field.name}>
                  <td data-label="Name">
                    <code>{field.name}</code>
                    {isRequired && <span className={styles.requiredBadgeMobile} aria-hidden="true">*</span>}
                  </td>
                  <td data-label="Type">{field.type}</td>
                  <td
                    data-label="Default"
                    data-required={isRequired ? 'true' : 'false'}
                  >
                    {isRequired ? 'required' : field.defaultValue}
                  </td>
                  <td data-label="Description">{field.description}</td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
      {endpoints.map(endpoint => (
        <EndpointSection key={endpoint.anchor} endpoint={endpoint} />
      ))}
    </DocsLayout>
  );
}
