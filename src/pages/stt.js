import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

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
  {name: 'file', type: 'file', defaultValue: 'required', description: 'Audio file to transcribe.'},
  {name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.'},
  {name: 'language', type: 'string', defaultValue: '-', description: 'Language code (e.g., "en", "hi") for forced detection.'},
  {name: 'chunk_length_s', type: 'number', defaultValue: '-', description: 'Length of each chunk in seconds (1–30).'},
  {name: 'stride_s', type: 'number', defaultValue: '-', description: 'Stride between chunks in seconds (1–29).'},
  {name: 'overlap_words', type: 'integer', defaultValue: '-', description: 'Number of overlapping words for context handling (0–20).'},
];

const streamingOutputs = [
  {name: '200 OK', type: 'text/event-stream', defaultValue: '-', description: 'Returns transcription results in JSON (streamed via SSE).'},
  {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
];

const fileOutputs = [
  {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns the complete transcript and metrics as JSON.'},
  {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
];

const responseExamples = [
  {
    label: '200 OK (SSE stream)',
    language: 'json',
    code: `{
  "type": "partial",
  "word": "hello",
  "provisional": true,
  "chunk_start": 0.0,
  "chunk_end": 6.0
}

{
  "type": "chunk_final",
  "text": "full chunk text",
  "chunk_start": 0.0,
  "chunk_end": 6.0
}

{
  "type": "final",
  "text": "final transcript",
  "audio_duration_seconds": 10.5,
  "processing_time_seconds": 2.1
}`,
  },
  {
    label: '200 OK (JSON)',
    language: 'json',
    code: `{
  "text": "This is the complete transcript of the audio file.",
  "audio_duration_seconds": 10.5,
  "processing_time_seconds": 2.1
}`,
  },
  {label: '422 Validation Error', language: 'json', code: validationError},
];

const endpoints = [
    {
      id: 'stt-post-v1-audio-transcribe',
      method: 'POST',
      path: '/v1/audio/transcribe',
      title: 'Transcribe Audio (Streaming)',
      description: 'This endpoint is used to transcribe audio files into text with streaming results via Server-Sent Events (SSE).',
      notes: [
        'Accepts an audio file and returns real-time transcription results.',
        'Outputs partial, chunk-level, and final transcripts as the audio is processed.',
        'Suitable for low-latency transcription where results are streamed back continuously.',
      ],
      inputs: sttInputs,
      outputs: streamingOutputs,
      examples: [responseExamples[0], responseExamples[2]],
    },
    {
      id: 'stt-post-v1-audio-transcribe-file',
      method: 'POST',
      path: '/v1/audio/transcribe/file',
      title: 'Transcribe Audio File (JSON)',
      description: 'This endpoint is used to transcribe an audio file and return the complete transcript as JSON (non-streaming).',
      notes: [
        'Accepts an audio file and returns the full transcription result after processing.',
        'Provides metrics in the JSON response (non-streaming, unlike the /v1/audio/transcribe endpoint).',
      ],
      inputs: sttInputs,
      outputs: fileOutputs,
      examples: [responseExamples[1], responseExamples[2]],
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

function OutputCard({rows}) {
    const headerLabels = ['Status', 'Type', 'Description'];
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
                    <td data-label={headerLabels[2]}>{row.description}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}
  
function IntegrationExamples({ endpoint }) {
    const [activeTab, setActiveTab] = useState("python");
  
    const tabStyles = {
      integrationExamples: {
        background: "#ffffff",
        border: "1px solid rgba(16, 22, 64, 0.08)",
        borderRadius: "18px",
        padding: "1.8rem",
        boxShadow: "0 22px 48px rgba(10, 14, 64, 0.06)",
        marginTop: "1.5rem",
      },
      tabButtons: {
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1.25rem",
        flexWrap: "wrap",
      },
      tabButton: {
        border: "1px solid rgba(16, 22, 64, 0.12)",
        borderRadius: "999px",
        background: "rgba(84, 104, 255, 0.08)",
        color: "#2730a6",
        padding: "0.5rem 1.2rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        cursor: "pointer",
        transition: "all 0.2s ease",
        outline: "none",
      },
      activeTabButton: {
        background: "#5468ff",
        color: "#ffffff",
        borderColor: "#5468ff",
      },
    };
  
    const examples = {
        python: `import requests
  
url = "${STT_BASE_URL}${endpoint.path}"
with open("audio.mp3", "rb") as audio_file:
    files = {"file": ("audio.mp3", audio_file, "audio/mpeg")}
    data = {
        "api_key": "YOUR_API_KEY",
        "language": "en"
    }
    # For streaming endpoint, use stream=True
    # with requests.post(url, files=files, data=data, stream=True) as response:
    #     response.raise_for_status()
    #     for line in response.iter_lines():
    #         if line:
    #             print(line.decode('utf-8'))

    # For file endpoint
    response = requests.post(url, files=files, data=data)
    response.raise_for_status()
    print(response.json())
`,
        javascript: `import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const form = new FormData();
form.append('file', fs.createReadStream('audio.mp3'));
form.append('api_key', 'YOUR_API_KEY');
form.append('language', 'en');

const response = await fetch('${STT_BASE_URL}${endpoint.path}', {
  method: 'POST',
  body: form,
  headers: form.getHeaders(),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

// For streaming, you would handle the response body as a stream.
// For the file endpoint:
const transcript = await response.json();
console.log(transcript);
`,
        curl: `curl -X 'POST' \\
  '${STT_BASE_URL}${endpoint.path}' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: multipart/form-data' \\
  -F 'file=@audio.mp3;type=audio/mpeg' \\
  -F 'api_key=YOUR_API_KEY' \\
  -F 'language=en'`,
      };
  
    return (
      <div style={tabStyles.integrationExamples}>
        <h4 style={{ margin: "0 0 1.25rem 0" }}>Code Examples</h4>
        <div style={tabStyles.tabButtons}>
          {["python", "javascript", "curl"].map((lang) => (
            <button
              key={lang}
              style={{
                ...tabStyles.tabButton,
                ...(activeTab === lang ? tabStyles.activeTabButton : {}),
              }}
              onClick={() => setActiveTab(lang)}
              onMouseEnter={(e) => {
                if (activeTab !== lang)
                  e.target.style.background = "rgba(84, 104, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== lang)
                  e.target.style.background = "rgba(84, 104, 255, 0.08)";
              }}
            >
              {lang === "curl"
                ? "cURL"
                : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
        <CopyableCode language={activeTab === "curl" ? "bash" : activeTab}>
          {examples[activeTab]}
        </CopyableCode>
      </div>
    );
}

function EndpointSection({endpoint}) {
    const [copied, setCopied] = useState(false);
    const copyValue = `${STT_BASE_URL}${endpoint.path}`;
  
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
      <section id={endpoint.id} className={styles.endpointSection}>
        <div className={styles.endpointHeader}>
          <MethodBadge method={endpoint.method} />
          <code className={styles.endpointPath}>{endpoint.path}</code>
          <button type="button" className={styles.copyButton} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy API'}
          </button>
        </div>
        <h3 className={styles.anchorTitle}>{endpoint.title}</h3>
        <p>{endpoint.description}</p>
        {endpoint.notes.length > 0 && (
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
            <TableCard title="Form Fields" rows={endpoint.inputs} headerLabels={['Name', 'Type', 'Default', 'Description']} />
            <OutputCard rows={endpoint.outputs} />
        </div>
        <div className={styles.responseExamples}>
          {endpoint.examples.map(example => (
            <div key={example.label} className={styles.responseExampleCard}>
              <h4>{example.label}</h4>
              <CopyableCode language={example.language}>{example.code}</CopyableCode>
            </div>
          ))}
        </div>
        <IntegrationExamples endpoint={endpoint} />
      </section>
    );
}

export default function SttPage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Speech-to-text service overview"
      sidebarSections={[
        {
          title: 'Overview',
          links: [
            {label: 'Introduction', to: '/'},
            {label: 'Text-to-Speech', to: '/tts'},
            {label: 'Speech-to-Text', to: '/stt'},
            {label: 'Python SDK', to: '/sdk'},
          ],
        },
        {
          title: 'STT Service',
          links: [
            {label: 'Introduction', targetId: 'stt-introduction'},
            {label: 'POST /v1/audio/transcribe', targetId: 'stt-post-v1-audio-transcribe', method: 'POST'},
            {label: 'POST /v1/audio/transcribe/file', targetId: 'stt-post-v1-audio-transcribe-file', method: 'POST'},
          ],
        },
        {
          title: 'TTS Service',
          links: [
            {label: 'Introduction', to: '/tts'},
            {label: 'POST /v1/audio/speech', to: '/tts'},
            {label: 'POST /v1/audio/speech/file', to: '/tts'},
          ],
        },
      ]}
    >
      <section id="stt-introduction" className={styles.pageIntro}>
        <h1>Speech-to-Text Service</h1>
        <p>
          Convert spoken audio into accurate transcripts using flexible endpoints.  
          Use <code>/v1/audio/transcribe</code> for streaming SSE results, or <code>/v1/audio/transcribe/file</code> for complete JSON output.
        </p>
        <div className={styles.apiKeyNotice} style={{
          background: 'rgba(84, 104, 255, 0.08)',
          border: '1px solid rgba(84, 104, 255, 0.2)',
          borderRadius: '16px',
          padding: '1.2rem 1.5rem',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}>
          <p style={{margin: 0}}>
            <strong>Need an API Key?</strong> If you don't have an API key yet, you can create one here:{' '}
            <a 
              href="https://playground.induslabs.io/register" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#5468ff',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(84, 104, 255, 0.3)',
              }}
            >
              https://playground.induslabs.io/register
            </a>
          </p>
        </div>
        <details className={styles.languageDropdown}>
          <summary>Available languages</summary>
          <ul>
            <li><span>English</span><code>en</code></li>
            <li><span>Hindi</span><code>hi</code></li>
            <li><span>Urdu</span><code>ur</code></li>
            <li><span>Tamil</span><code>ta</code></li>
            <li><span>Malayalam</span><code>ml</code></li>
            <li><span>Telugu</span><code>te</code></li>
            <li><span>Bengali</span><code>bn</code></li>
            <li><span>Nepali</span><code>ne</code></li>
            <li><span>Kannada</span><code>kn</code></li>
            <li><span>Marathi</span><code>mr</code></li>
            <li><span>Punjabi</span><code>pa</code></li>
          </ul>
        </details>
      </section>

      {endpoints.map(endpoint => (
          <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}
    </DocsLayout>
  );
}
