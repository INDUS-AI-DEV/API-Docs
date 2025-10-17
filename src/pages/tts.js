import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

import styles from './api.module.css';

const TTS_BASE_URL = 'https://voice.induslabs.io';

const sharedPayload = `{
  "text": "I am pleased to introduce our voice models.",
  "voice": "Indus-hi-maya",
  "output_format": "wav",
  "model": "indus-tts-v1",
  "api_key": "YOUR_API_KEY",
  "normalize": true,
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
  {name: 'voice', type: 'string', defaultValue: 'Indus-hi-maya', description: 'The voice model to be used (e.g., "Indus-hi-maya").'},
  {name: 'output_format', type: 'string', defaultValue: 'wav', description: 'Audio format for output (e.g., "wav", "mp3", "pcm").'},
  {name: 'model', type: 'string', defaultValue: '-', description: 'The TTS model to use (e.g., "indus-tts-v1").'},
  {name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.'},
  {name: 'normalize', type: 'boolean', defaultValue: 'true', description: 'Whether to normalize text before synthesis (default: true).'},
];

const streamInput = {
  name: 'stream',
  type: 'boolean',
  defaultValue: 'true',
  description: 'Whether to stream the output (default: true).',
};

const voiceListExample = `{
  "status_code": 200,
  "message": "Voices fetched successfully",
  "error": null,
  "data": {
    "hindi": [
      {
        "name": "Maya",
        "voice_id": "Indus-hi-maya",
        "gender": "female"
      },
      {
        "name": "Urvashi",
        "voice_id": "Indus-hi-maya",
        "gender": "female"
      },
      {
        "name": "Aditi",
        "voice_id": "Indus-hi-Aditi",
        "gender": "female"
      },
      {
        "name": "Arjun",
        "voice_id": "Indus-hi-Arjun",
        "gender": "male"
      }
    ],
    "english": [
      {
        "name": "Maya",
        "voice_id": "Indus-en-maya",
        "gender": "female"
      },
      {
        "name": "Urvashi",
        "voice_id": "Indus-en-Urvashi",
        "gender": "female"
      },
      {
        "name": "pk",
        "voice_id": "Indus-hi-teju",
        "gender": "male"
      }
    ],
    "bengali": [
      {
        "name": "Alivia",
        "voice_id": "Indus-bn-Alivia",
        "gender": "female"
      },
      {
        "name": "Sayan",
        "voice_id": "Indus-bn-Sayan",
        "gender": "male"
      }
    ],
    "kannada": [
      {
        "name": "Aahna",
        "voice_id": "Indus-bn-Aahna",
        "gender": "female"
      },
      {
        "name": "Chinmay",
        "voice_id": "Indus-bn-Chinmay",
        "gender": "male"
      }
    ],
    "arabic": [
      {
        "name": "Fatima",
        "voice_id": "Indus-ar-Fatima",
        "gender": "female"
      },
      {
        "name": "Hamdan",
        "voice_id": "Indus-ar-Hamdan",
        "gender": "male"
      }
    ]
  }
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
      'Supports streaming for real-time audio playback.',
    ],
    inputs: [...sharedInputs, streamInput],
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
    outputFormat: 'wav',
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
    outputFormat: 'wav',
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
    outputFormat: 'json',
  },
  {
    anchor: 'tts-get-v1-voice-get-voices',
    method: 'GET',
    path: '/api/voice/get-voices',
    title: 'List Available Voices',
    description:
      'Retrieves the catalog of voices available for speech synthesis across multiple languages.',
    notes: [
      'Returns a comprehensive list of available voices organized by language.',
      'Each voice includes name, voice_id, and gender information.',
      'Supports multiple languages including Hindi, English, Bengali, Kannada, Marathi, Telugu, Arabic, and regional languages.',
      'No authentication required for this endpoint.',
    ],
    inputs: null,
    outputs: [
      {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns voice catalog organized by language with name, voice_id, and gender for each voice.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {label: '200 OK', language: 'json', code: voiceListExample},
      {label: '422 Validation Error', language: 'json', code: validationError},
    ],
    outputFormat: 'json',
    isVoiceEndpoint: true,
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

function IntegrationExamples({ endpoint }) {
  const [activeTab, setActiveTab] = useState("python");

  const getFileExtension = (format) => {
    if (format === "json") return "json";
    return format || "wav";
  };

  const ext = getFileExtension(endpoint.outputFormat);

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

url = "${TTS_BASE_URL}${endpoint.path}"
params = {
    "text": "I am pleased to introduce our voice models.",
    "voice": "Indus-hi-maya",
    "output_format": "wav",
    "model": "indus-tts-v1",
    "api_key": "YOUR_API_KEY",
    "normalize": True${endpoint.path !== "/api/voice/get-voices" ? ",\n    \"stream\": True" : ""}
}

response = requests.get(url, params=params)
response.raise_for_status()

with open("output.${ext}", "wb") as f:
    f.write(response.content)
print("✅ Audio saved as output.${ext}")
`,

    javascript: `import fetch from "node-fetch";
import fs from "fs";

const params = new URLSearchParams({
  text: "I am pleased to introduce our voice models.",
  voice: "Indus-hi-maya",
  output_format: "wav",
  model: "indus-tts-v1",
  api_key: "YOUR_API_KEY",
  normalize: true${endpoint.path !== "/api/voice/get-voices" ? ",\n  stream: true" : ""}
});

const response = await fetch("${TTS_BASE_URL}${endpoint.path}?" + params, {
  method: "GET",
  headers: { "accept": "application/json" },
});

if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync("output.${ext}", buffer);
console.log("✅ Audio saved as output.${ext}");
`,

    curl: `curl -X 'GET' \\
  "${TTS_BASE_URL}${endpoint.path}?text=I%20am%20pleased%20to%20introduce%20our%20voice%20models.&voice=Indus-hi-maya&output_format=wav&model=indus-tts-v1&api_key=YOUR_API_KEY&normalize=true${endpoint.path !== "/api/voice/get-voices" ? '&stream=true' : ""}" \\
  -H "accept: application/json" \\
  -o "output.${ext}"`,
  };

  // For get-voices endpoint, use GET request
  if (endpoint.path === "/api/voice/get-voices") {
    examples.python = `import requests

url = "https://api.indusai.app${endpoint.path}"
headers = {"accept": "application/json"}
response = requests.get(url, headers=headers)
response.raise_for_status()

voices_data = response.json()
print("✅ Voices fetched successfully")
print(f"Status: {voices_data['status_code']}")
print(f"Message: {voices_data['message']}")
`;

    examples.javascript = `import fetch from "node-fetch";

const response = await fetch("https://api.indusai.app${endpoint.path}", {
  method: "GET",
  headers: { "accept": "application/json" },
});

if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const voicesData = await response.json();
console.log("✅ Voices fetched successfully");
console.log(\`Status: \${voicesData.status_code}\`);
console.log(\`Message: \${voicesData.message}\`);
`;

    examples.curl = `curl -X 'GET' \\
  'https://api.indusai.app${endpoint.path}' \\
  -H 'accept: application/json'`;
  }

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
  const copyValue = `https://api.indusai.app${endpoint.path}`;

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
              <CopyableCode language={example.language}>{example.code}</CopyableCode>
            </div>
          ))}
        </div>
      )}
      <IntegrationExamples endpoint={endpoint} />
    </section>
  );
}

export default function TtsPage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Text-to-speech service overview"
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
          title: 'TTS Service',
          links: [
            {label: 'Introduction', targetId: 'tts-introduction'},
            {label: 'Shared Payload', targetId: 'tts-shared-payload'},
            {label: 'POST /v1/audio/speech', targetId: 'tts-post-v1-audio-speech', method: 'POST'},
            {label: 'POST /v1/audio/speech/file', targetId: 'tts-post-v1-audio-speech-file', method: 'POST'},
            {label: 'POST /v1/audio/speech/preview', targetId: 'tts-post-v1-audio-speech-preview', method: 'POST'},
            {label: 'POST /api/voice/get-voices', targetId: 'tts-get-v1-voice-get-voices', method: 'GET'},
          ],
        },
        {
          title: 'STT Service',
          links: [
            {label: 'Introduction', to: '/stt'},
            {label: 'POST /v1/audio/transcribe',  to: '/stt'},
            {label: 'POST /v1/audio/transcribe/file',  to: '/stt'},
          ],
        },
      ]}
    >
      <section id="tts-introduction" className={styles.pageIntro}>
        <h1>Text-to-Speech Service</h1>
        <p>
          Deliver natural-sounding speech with configurable voices, streaming playback, and file-based output.
          All endpoints share a consistent payload so you can reuse the same integration across streaming and
          download workflows.
        </p>
        <div className={styles.apiKeyNotice} style={{
          background: 'rgba(84, 104, 255, 0.08)',
          border: '1px solid rgba(84, 104, 255, 0.2)',
          borderRadius: '16px',
          padding: '1.2rem 1.5rem',
          marginTop: '1rem',
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
      </section>
      <section id="tts-shared-payload" className={styles.sectionHeading}>
        <h2>Shared Request Payload</h2>
        <p>
          Use the same JSON schema for every text-to-speech endpoint. Override optional fields (for example
          output_format or stream on file/preview calls) depending on the output you need.
        </p>
      </section>
      <div className={styles.payloadCard}>
        <CopyableCode language="json">{sharedPayload}</CopyableCode>
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
            <tr>
              <td data-label="Name">
                <code>stream</code>
              </td>
              <td data-label="Type">boolean</td>
              <td data-label="Default">true</td>
              <td data-label="Description">Whether to stream the output (default: true).</td>
            </tr>
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
