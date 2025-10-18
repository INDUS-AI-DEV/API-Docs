import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import {getSidebarSections} from '@site/src/sidebarConfig';

import styles from './api.module.css';

const TTS_BASE_URL = 'https://voice.induslabs.io';

const ttsQuickIntegration = {
  title: 'Quick Integration',
  description: 'Reference snippets for generating speech instantly.',
  defaultApi: 'tts-post-v1-audio-speech',
  apis: [
    {
      id: 'tts-post-v1-audio-speech',
      label: 'POST /v1/audio/speech',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${TTS_BASE_URL}/v1/audio/speech"
payload = {
    "text": "Hello from IndusLabs Voice API",
    "voice": "Indus-hi-maya",
    "output_format": "mp3",
    "stream": False,
    "model": "indus-tts-v1",
    "api_key": "YOUR_API_KEY"
}

response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=30)
response.raise_for_status()

with open("output.mp3", "wb") as f:
    f.write(response.content)
print("Audio saved to output.mp3")`,
        },
        {
          id: 'python-sdk',
          label: 'Python SDK (Basic Usage)',
          language: 'python',
          code: `from induslabs import Client

client = Client(api_key="YOUR_API_KEY")

speech = client.tts.speak(
    text="Hello from IndusLabs Voice API",
    voice="Indus-hi-maya",
    output_format="mp3",
    stream=False
)

speech.save("output.mp3")
print("Audio saved to output.mp3")`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fetch from 'node-fetch';
import fs from 'fs';

const url = "${TTS_BASE_URL}/v1/audio/speech";
const payload = {
  text: "Hello from IndusLabs Voice API",
  voice: "Indus-hi-maya",
  output_format: "mp3",
  stream: false,
  model: "indus-tts-v1",
  api_key: "YOUR_API_KEY",
  normalize: true,
  speed: 1,
  pitch_shift: 0,
  loudness_db: 0
};

const response = await fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'application/json', accept: 'application/json'},
  body: JSON.stringify(payload),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync('output.mp3', buffer);
console.log('Audio saved to output.mp3');`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${TTS_BASE_URL}/v1/audio/speech" \\
  -H "Content-Type: application/json" \\
  -d '{
  "text": "Hello from IndusLabs Voice API",
  "voice": "Indus-hi-maya",
  "output_format": "mp3",
  "stream": false,
  "model": "indus-tts-v1",
  "api_key": "YOUR_API_KEY",
  "normalize": true,
  "speed": 1,
  "pitch_shift": 0,
  "loudness_db": 0
}' \\
  -o output.mp3`,
        },
      ],
    },
    {
      id: 'tts-post-v1-audio-speech-file',
      label: 'POST /v1/audio/speech/file',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${TTS_BASE_URL}/v1/audio/speech/file"
payload = {
    "text": "Hello from IndusLabs Voice API",
    "voice": "Indus-hi-maya",
    "output_format": "wav",
    "response_format": "base64",
    "stream": False,
    "model": "indus-tts-v1",
    "api_key": "YOUR_API_KEY"
}

response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=30)
response.raise_for_status()

audio = response.json()
print(audio)`,
        },
        {
          id: 'python-sdk',
          label: 'Python SDK (Basic Usage)',
          language: 'python',
          code: `from induslabs import Client

client = Client(api_key="YOUR_API_KEY")

speech = client.tts.speak(
    text="Hello from IndusLabs Voice API",
    voice="Indus-hi-maya",
    output_format="wav",
    stream=False
)

speech.save("output.wav")
print("Audio saved to output.wav")`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fetch from 'node-fetch';

const url = "${TTS_BASE_URL}/v1/audio/speech/file";
const payload = {
  text: "Hello from IndusLabs Voice API",
  voice: "Indus-hi-maya",
  output_format: "wav",
  response_format: "base64",
  stream: false,
  model: "indus-tts-v1",
  api_key: "YOUR_API_KEY"
};

const response = await fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'application/json', accept: 'application/json'},
  body: JSON.stringify(payload),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const metadata = await response.json();
console.log(metadata);`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${TTS_BASE_URL}/v1/audio/speech/file" \\
  -H "Content-Type: application/json" \\
  -d '{
  "text": "Hello from IndusLabs Voice API",
  "voice": "Indus-hi-maya",
  "output_format": "wav",
  "response_format": "base64",
  "stream": false,
  "model": "indus-tts-v1",
  "api_key": "YOUR_API_KEY"
}'`,
        },
      ],
    },
    {
      id: 'tts-post-v1-audio-speech-preview',
      label: 'POST /v1/audio/speech/preview',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${TTS_BASE_URL}/v1/audio/speech/preview"
payload = {
    "text": "Hello from IndusLabs Voice API",
    "voice": "Indus-hi-maya",
    "output_format": "wav",
    "stream": True,
    "model": "indus-tts-v1",
    "api_key": "YOUR_API_KEY",
    "normalize": True,
    "speed": 1,
    "pitch_shift": 0,
    "loudness_db": 0
}

response = requests.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=30)
response.raise_for_status()

preview = response.json()
print(preview["analysis"]["estimated_duration_seconds"])`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fetch from 'node-fetch';

const url = "${TTS_BASE_URL}/v1/audio/speech/preview";
const payload = {
  text: "Hello from IndusLabs Voice API",
  voice: "Indus-hi-maya",
  output_format: "wav",
  stream: true,
  model: "indus-tts-v1",
  api_key: "YOUR_API_KEY",
  normalize: true,
  speed: 1,
  pitch_shift: 0,
  loudness_db: 0
};

const response = await fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'application/json', accept: 'application/json'},
  body: JSON.stringify(payload),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const preview = await response.json();
console.log('Estimated duration (s):', preview.analysis.estimated_duration_seconds);`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${TTS_BASE_URL}/v1/audio/speech/preview" \\
  -H "Content-Type: application/json" \\
  -d '{
  "text": "Hello from IndusLabs Voice API",
  "voice": "Indus-hi-maya",
  "output_format": "wav",
  "stream": true,
  "model": "indus-tts-v1",
  "api_key": "YOUR_API_KEY",
  "normalize": true,
  "speed": 1,
  "pitch_shift": 0,
  "loudness_db": 0
}'`,
        },
      ],
    },
    {
      id: 'tts-get-v1-voice-get-voices',
      label: 'GET /api/voice/get-voices',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "https://api.indusai.app/api/voice/get-voices"
response = requests.get(url, headers={"accept": "application/json"}, timeout=30)
response.raise_for_status()

voices = response.json()
print("Languages:", ", ".join(voices["data"].keys()))`,
        },
        {
          id: 'python-sdk',
          label: 'Python SDK (Basic Usage)',
          language: 'python',
          code: `from induslabs import Client

client = Client(api_key="YOUR_API_KEY")

voices = client.voices.list()
for voice in voices.voices:
    print(f"{voice.voice_id}: {voice.name} ({voice.gender})")`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fetch from 'node-fetch';

const response = await fetch('https://api.indusai.app/api/voice/get-voices', {
  method: 'GET',
  headers: {'accept': 'application/json'},
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const voices = await response.json();
console.log('Languages:', Object.keys(voices.data));`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X GET \\
  "https://api.indusai.app/api/voice/get-voices" \\
  -H "accept: application/json"`,
        },
      ],
    },
  ],
};

const sharedPayload = `{
  "text": "Hello, this is a test request.",
  "voice": "Indus-hi-maya",
  "output_format": "wav",
  "model": "indus-tts-v1",
  "api_key": "YOUR_API_KEY",
  "normalize": true,
  "stream": true,
  "speed": 1,
  "pitch_shift": 0,
  "loudness_db": 0
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

const previewResponse = `{
  "analysis": {
    "total_characters": 30,
    "total_words": 6,
    "estimated_duration_seconds": 2.4,
    "estimated_credits": 0.04,
    "chunking_strategy": {
      "total_chunks": 1,
      "max_words_per_chunk": 15,
      "overlap_words": 0,
      "chunks": [
        {
          "index": 0,
          "word_count": 6,
          "text_preview": "Hello, this is a test request.",
          "is_final": true
        }
      ]
    }
  },
  "configuration": {
    "voice": "Indus-hi-maya",
    "model": "indus-tts-v1",
    "output_format": "wav",
    "stream": true,
    "temperature": 0.6,
    "max_tokens": 1800,
    "top_p": 0.8,
    "repetition_penalty": 1.1,
    "bitrate": null
  },
  "user_info": {
    "user_id": "USR_A3E785AF",
    "credits_remaining": 399.58,
    "tts_unit_cost": 1,
    "sufficient_credits": true
  },
  "output_settings": {
    "format": "wav",
    "voice": "Indus-hi-maya",
    "model": "indus-tts-v1",
    "streaming": true,
    "sample_rate": 24000,
    "channels": 1,
    "bit_depth": 16
  },
  "text_processing": {
    "original_text": "Hello, this is a test request.",
    "processed_text": null,
    "normalization_applied": false,
    "normalize_setting": true,
    "character_change": 0
  },
  "size_estimates": {
    "pcm_bytes": 115200,
    "wav_bytes": 115244,
    "mp3_bytes": 38400,
    "target_format_bytes": 115244
  }
}`;

const sharedInputs = [
  {name: 'text', type: 'string', defaultValue: 'required', description: 'The text to be synthesized into speech.'},
  {name: 'voice', type: 'string', defaultValue: 'Indus-hi-maya', description: 'The voice model to be used (e.g., "Indus-hi-maya").'},
  {name: 'output_format', type: 'string', defaultValue: 'wav', description: 'Audio format for output (e.g., "wav", "mp3", "pcm").'},
  {name: 'model', type: 'string', defaultValue: 'indus-tts-v1', description: 'The TTS model to use (e.g., "indus-tts-v1").'},
  {name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.'},
  {name: 'normalize', type: 'boolean', defaultValue: 'true', description: 'Whether to normalize text before synthesis (default: true).'},
  {name: 'stream', type: 'boolean', defaultValue: 'true', description: 'Whether to stream the output (default: true).'},
  {name: 'speed', type: 'number', defaultValue: '1', description: 'Speed of speech synthesis (default: 1).'},
  {name: 'pitch_shift', type: 'number', defaultValue: '0', description: 'Pitch shift adjustment (default: 0).'},
  {name: 'loudness_db', type: 'number', defaultValue: '0', description: 'Loudness adjustment in decibels (default: 0).'},
];

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
      'This endpoint is used to synthesize speech (TTS - Text-to-Speech) and stream the audio data.',
    notes: [
      'Converts input text into speech audio.',
      'Uses credit system authentication.',
      'Returns audio data directly in the response body.',
      'Supports streaming for real-time audio playback.',
    ],
    inputs: sharedInputs,
    outputs: [
      {name: '200 OK', type: 'audio/wav', defaultValue: '-', description: 'Returns synthesized speech audio as binary data.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {
        label: '200 OK',
        language: 'text',
        code: `Binary audio data (WAV format)`,
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
      'Returns the synthesized audio as a complete file download.',
      'Unlike /v1/audio/speech, this endpoint returns the full audio file at once.',
    ],
    inputs: sharedInputs,
    outputs: [
      {name: '200 OK', type: 'audio/wav', defaultValue: '-', description: 'Returns the synthesized speech audio as a downloadable file.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {
        label: '200 OK',
        language: 'text',
        code: `Binary audio data (WAV format)`,
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
      'Does not generate audio, only returns metadata and analysis of the input.',
      'Useful for estimating credits, duration, and validating parameters before synthesis.',
    ],
    inputs: sharedInputs,
    outputs: [
      {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns detailed analysis including character count, word count, estimated duration, credit cost, and configuration details.'},
      {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
    ],
    examples: [
      {label: '200 OK', language: 'json', code: previewResponse},
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
              <CopyableCode language={example.language}>{example.code}</CopyableCode>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function TtsPage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Text-to-speech service overview"
      sidebarSections={getSidebarSections('tts')}
      integration={ttsQuickIntegration}
    >
      <section id="tts-introduction" className={styles.pageIntro}>
        <h1>Text-to-Speech Service</h1>
        <p>
          Deliver natural-sounding speech with configurable voices, streaming playback, and file-based output.
          All endpoints use a consistent JSON payload via POST requests, making integration simple and straightforward.
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
          All text-to-speech endpoints use the same JSON schema sent via POST request. Simply adjust parameters 
          like output_format or stream depending on your use case.
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
