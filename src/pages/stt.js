import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import {getSidebarSections} from '@site/src/config/sidebarSections';
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

const sttConfig = {
  path: '/v1/audio/transcribe/config',
  supportedFormats: ['wav', 'mp3', 'mp4', 'm4a', 'flac', 'ogg'],
  maxFileSizeMb: 25,
  defaults: {
    chunk_length_s: 6,
    stride_s: 5.9,
    overlap_words: 7,
  },
  limits: {
    chunk_length_range: [1, 30],
    stride_range: [1, 29],
    overlap_words_range: [0, 20],
    timeout_seconds: 30,
  },
  supportedLanguages: [
    'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh',
    'ar', 'hi', 'tr', 'pl', 'nl', 'sv', 'da', 'no', 'fi', 'cs',
    'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'mt',
    'ga', 'cy', 'is', 'mk', 'sq', 'az', 'kk', 'ky', 'uz', 'tg',
    'am', 'my', 'km', 'lo', 'si', 'ne', 'bn', 'as', 'or', 'pa',
    'gu', 'ta', 'te', 'kn', 'ml', 'th', 'vi', 'id', 'ms', 'tl',
  ],
  outputFormats: {
    streaming: 'Server-Sent Events (SSE) with real-time partial results',
    file: 'Complete JSON response with final transcript',
  },
  creditSystem: {
    unit: '1 credit = 1 minute of audio',
    billing: 'Based on actual audio duration, not processing time',
  },
};

const languageDisplayNames =
  typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['en'], {type: 'language'})
    : null;

function resolveLanguageLabel(code) {
  if (languageDisplayNames) {
    try {
      const result = languageDisplayNames.of(code);
      if (result) {
        return result.charAt(0).toUpperCase() + result.slice(1);
      }
    } catch (error) {
      // Fallback handled below.
    }
  }
  return code.toUpperCase();
}

const introLanguages = [
  {name: 'English', code: 'en'},
  {name: 'Spanish', code: 'es'},
  {name: 'French', code: 'fr'},
  {name: 'German', code: 'de'},
  {name: 'Italian', code: 'it'},
  {name: 'Portuguese', code: 'pt'},
  {name: 'Russian', code: 'ru'},
  {name: 'Japanese', code: 'ja'},
  {name: 'Korean', code: 'ko'},
  {name: 'Chinese', code: 'zh'},
  {name: 'Arabic', code: 'ar'},
  {name: 'Hindi', code: 'hi'},
  {name: 'Turkish', code: 'tr'},
  {name: 'Polish', code: 'pl'},
  {name: 'Dutch', code: 'nl'},
  {name: 'Swedish', code: 'sv'},
  {name: 'Danish', code: 'da'},
  {name: 'Norwegian', code: 'no'},
  {name: 'Finnish', code: 'fi'},
  {name: 'Czech', code: 'cs'},
  {name: 'Slovak', code: 'sk'},
  {name: 'Hungarian', code: 'hu'},
  {name: 'Romanian', code: 'ro'},
  {name: 'Bulgarian', code: 'bg'},
  {name: 'Croatian', code: 'hr'},
  {name: 'Slovenian', code: 'sl'},
  {name: 'Estonian', code: 'et'},
  {name: 'Latvian', code: 'lv'},
  {name: 'Lithuanian', code: 'lt'},
  {name: 'Maltese', code: 'mt'},
  {name: 'Irish', code: 'ga'},
  {name: 'Welsh', code: 'cy'},
  {name: 'Icelandic', code: 'is'},
  {name: 'Macedonian', code: 'mk'},
  {name: 'Albanian', code: 'sq'},
  {name: 'Azerbaijani', code: 'az'},
  {name: 'Kazakh', code: 'kk'},
  {name: 'Kyrgyz', code: 'ky'},
  {name: 'Uzbek', code: 'uz'},
  {name: 'Tajik', code: 'tg'},
  {name: 'Amharic', code: 'am'},
  {name: 'Burmese', code: 'my'},
  {name: 'Khmer', code: 'km'},
  {name: 'Lao', code: 'lo'},
  {name: 'Sinhala', code: 'si'},
  {name: 'Nepali', code: 'ne'},
  {name: 'Bengali', code: 'bn'},
  {name: 'Assamese', code: 'as'},
  {name: 'Odia', code: 'or'},
  {name: 'Punjabi', code: 'pa'},
  {name: 'Gujarati', code: 'gu'},
  {name: 'Tamil', code: 'ta'},
  {name: 'Telugu', code: 'te'},
  {name: 'Kannada', code: 'kn'},
  {name: 'Malayalam', code: 'ml'},
  {name: 'Thai', code: 'th'},
  {name: 'Vietnamese', code: 'vi'},
  {name: 'Indonesian', code: 'id'},
  {name: 'Malay', code: 'ms'},
  {name: 'Filipino / Tagalog', code: 'tl'},
];

const sttInputs = [
  {name: 'file', type: 'file', defaultValue: 'req', description: 'Audio file to transcribe.'},
  {name: 'api_key', type: 'string', defaultValue: 'req', description: 'Authentication API key.'},
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
    code: `"string"`,
  },
  {label: '422 Validation Error', language: 'json', code: validationError},
];

const quickIntegrationLanguages = [
  {
    id: 'python-sdk',
    label: 'Python SDK (Basic Usage)',
    language: 'python',
    code: `from induslabs import Client

client = Client(api_key="your_api_key")

result = client.stt.transcribe(
    "audio.mp3",
    language="en",
    chunk_length_s=6,
    stride_s=5.9,
    overlap_words=7,
)

print(result.text)
print(f"Detected language: {result.language_detected}")`,
  },
  {
    id: 'python',
    label: 'Python (REST API)',
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
  {
    id: 'curl-config',
    label: 'cURL (Config)',
    language: 'bash',
    code: `curl -X GET "${STT_BASE_URL}/v1/audio/transcribe/config" \\
  -H "accept: application/json"`
  },
];

// Generic section renderer
function EndpointSection({
  id,
  method,
  path,
  title,
  description,
  examples,
  inputs = sttInputs,
  outputs = streamingOutputs,
  notes = [],
}) {
  const [copied, setCopied] = useState(false);
  const copyValue = `${STT_BASE_URL}${path}`;
  const inputHeaders = ['Name', 'Type', 'Default', 'Description'];
  const outputHeaders = ['Status', 'Type', 'Description'];

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
      {notes.length > 0 && (
        <div className={styles.callout}>
          <strong>Functionality</strong>
          <ul>
            {notes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.ioGrid}>
        <div className={styles.tableCard}>
          <h4>Form Fields</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  {inputHeaders.map(label => (
                    <th key={label}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inputs.map(input => {
                  const normalizedDefault =
                    typeof input.defaultValue === 'string' ? input.defaultValue.toLowerCase() : input.defaultValue;
                  const isRequired = normalizedDefault === 'required';
                  return (
                    <tr key={input.name}>
                      <td data-label={inputHeaders[0]}>
                        <code>{input.name}</code>
                        {isRequired && <span className={styles.requiredBadgeMobile} aria-hidden="true">*</span>}
                      </td>
                      <td data-label={inputHeaders[1]}>{input.type}</td>
                      <td
                        data-label={inputHeaders[2]}
                        data-required={isRequired ? 'true' : 'false'}
                      >
                        {isRequired ? 'required' : input.defaultValue}
                      </td>
                      <td data-label={inputHeaders[3]}>{input.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.tableCard}>
          <h4>Outputs</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  {outputHeaders.map(label => (
                    <th key={label}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {outputs.map(output => (
                  <tr key={output.name}>
                    <td data-label={outputHeaders[0]}><code>{output.name}</code></td>
                    <td data-label={outputHeaders[1]}>{output.type}</td>
                    <td data-label={outputHeaders[2]}>{output.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

function ConfigSection() {
  const [copied, setCopied] = useState(false);
  const copyValue = `${STT_BASE_URL}${sttConfig.path}`;
  const languageEntries = sttConfig.supportedLanguages.map(code => ({
    code,
    label: resolveLanguageLabel(code),
  }));

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
    <section id="stt-get-v1-audio-transcribe-config" className={styles.endpointSection}>
      <div className={styles.endpointHeader}>
        <MethodBadge method="GET" />
        <code className={styles.endpointPath}>{sttConfig.path}</code>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy API'}
        </button>
      </div>
      <h3 className={styles.anchorTitle}>Retrieve STT Configuration</h3>
      <p>
        Use this endpoint to inspect current defaults, limits, supported formats, and language coverage for the
        speech-to-text service. Call it before uploads to keep your client-side validation in sync with server rules.
      </p>
      <div className={styles.callout}>
        <strong>Highlights</strong>
        <ul>
          <li>No authentication payload beyond your API key is required.</li>
          <li>Returns upload constraints (including the 25&nbsp;MB file cap) and recommended chunking values.</li>
          <li>Lists every language, audio format, and output mode supported by the STT runtime.</li>
        </ul>
      </div>
      <div className={styles.ioGrid}>
        <div className={styles.tableCard}>
          <h4>Default Parameters</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Name"><code>chunk_length_s</code></td>
                  <td data-label="Value">{sttConfig.defaults.chunk_length_s}</td>
                  <td data-label="Description">Seconds of audio processed per chunk when chunking is enabled.</td>
                </tr>
                <tr>
                  <td data-label="Name"><code>stride_s</code></td>
                  <td data-label="Value">{sttConfig.defaults.stride_s}</td>
                  <td data-label="Description">Overlap between consecutive chunks for smoother stitching.</td>
                </tr>
                <tr>
                  <td data-label="Name"><code>overlap_words</code></td>
                  <td data-label="Value">{sttConfig.defaults.overlap_words}</td>
                  <td data-label="Description">Word-level overlap used to preserve context between chunk boundaries.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.tableCard}>
          <h4>Limits &amp; Constraints</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Rule"><code>max_file_size_mb</code></td>
                  <td data-label="Value">{sttConfig.maxFileSizeMb} MB</td>
                  <td data-label="Notes">Maximum upload size per request.</td>
                </tr>
                <tr>
                  <td data-label="Rule"><code>chunk_length_range</code></td>
                  <td data-label="Value">{sttConfig.limits.chunk_length_range[0]}&ndash;{sttConfig.limits.chunk_length_range[1]} s</td>
                  <td data-label="Notes">Customize chunk length within this window.</td>
                </tr>
                <tr>
                  <td data-label="Rule"><code>stride_range</code></td>
                  <td data-label="Value">{sttConfig.limits.stride_range[0]}&ndash;{sttConfig.limits.stride_range[1]} s</td>
                  <td data-label="Notes">Stride must remain smaller than the chunk length.</td>
                </tr>
                <tr>
                  <td data-label="Rule"><code>overlap_words_range</code></td>
                  <td data-label="Value">{sttConfig.limits.overlap_words_range[0]}&ndash;{sttConfig.limits.overlap_words_range[1]}</td>
                  <td data-label="Notes">Keep overlaps modest to avoid repetition.</td>
                </tr>
                <tr>
                  <td data-label="Rule"><code>timeout_seconds</code></td>
                  <td data-label="Value">{sttConfig.limits.timeout_seconds}</td>
                  <td data-label="Notes">Server-side processing timeout per transcription request.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.tableCard}>
        <h4>Supported Audio Formats</h4>
        <ul>
          {sttConfig.supportedFormats.map(format => (
            <li key={format}>
              <code>{format}</code>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.tableCard}>
        <h4>Output Modes</h4>
        <ul>
          <li>
            <strong>Streaming:</strong> {sttConfig.outputFormats.streaming}
          </li>
          <li>
            <strong>File:</strong> {sttConfig.outputFormats.file}
          </li>
        </ul>
      </div>
      <div className={styles.tableCard}>
        <h4>Credit System</h4>
        <ul>
          <li>{sttConfig.creditSystem.unit}</li>
          <li>{sttConfig.creditSystem.billing}</li>
        </ul>
      </div>
      <details className={styles.languageDropdown}>
        <summary>Supported languages</summary>
        <ul>
          {languageEntries.map(({code, label}) => (
            <li key={code}>
              <span>{label}</span>
              <code>{code}</code>
            </li>
          ))}
        </ul>
      </details>
      <div className={styles.responseExamples}>
        <div className={styles.responseExampleCard}>
          <h4>Sample Response</h4>
          <CodeBlock language="json">{`{
  "supported_formats": [
    "wav",
    "mp3",
    "mp4",
    "m4a",
    "flac",
    "ogg"
  ],
  "max_file_size_mb": 25,
  "defaults": {
    "chunk_length_s": 6,
    "stride_s": 5.9,
    "overlap_words": 7
  },
  "limits": {
    "chunk_length_range": [1, 30],
    "stride_range": [1, 29],
    "overlap_words_range": [0, 20],
    "timeout_seconds": 30
  },
  "supported_languages": [
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt"
  ],
  "output_formats": {
    "streaming": "Server-Sent Events (SSE) with real-time partial results",
    "file": "Complete JSON response with final transcript"
  },
  "credit_system": {
    "unit": "1 credit = 1 minute of audio",
    "billing": "Based on actual audio duration, not processing time"
  }
}`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}

export default function SttPage() {
  const sidebarSections = getSidebarSections('stt');

  return (
    <DocsLayout
      title="Audio Platform API"
      description="Speech-to-text service overview"
      sidebarSections={sidebarSections}
      integration={{
        title: 'Quick Integration',
        description: 'Upload an audio file and retrieve the transcription using your favourite language.',
        defaultLanguage: 'python-sdk',
        languages: quickIntegrationLanguages,
      }}
    >
      <section id="stt-introduction" className={styles.pageIntro}>
        <h1>Speech-to-Text Service</h1>
        <p>
          Convert spoken audio into accurate transcripts using flexible endpoints.  
          Use <code>/v1/audio/transcribe</code> for streaming SSE results, or <code>/v1/audio/transcribe/file</code> for complete JSON output.
        </p>
        <details className={styles.languageDropdown}>
          <summary>Available languages</summary>
          <ul>
            {introLanguages.map(({code, name}) => (
              <li key={code}>
                <span>{name}</span>
                <code>{code}</code>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <EndpointSection
        id="stt-post-v1-audio-transcribe"
        method="POST"
        path="/v1/audio/transcribe"
        title="Transcribe Audio (Streaming)"
        description="This endpoint is used to transcribe audio files into text with streaming results via Server-Sent Events (SSE)."
        notes={[
          'Accepts an audio file and returns real-time transcription results.',
          'Outputs partial, chunk-level, and final transcripts as the audio is processed.',
          'Suitable for low-latency transcription where results are streamed back continuously.',
        ]}
        examples={[responseExamples[0], responseExamples[2]]}
      />

      <EndpointSection
        id="stt-post-v1-audio-transcribe-file"
        method="POST"
        path="/v1/audio/transcribe/file"
        title="Transcribe Audio File (JSON)"
        description="This endpoint is used to transcribe an audio file and return the complete transcript as JSON (non-streaming)."
        notes={[
          'Accepts an audio file and returns the full transcription result after processing.',
          'Provides metrics in the JSON response (non-streaming, unlike the /v1/audio/transcribe endpoint).',
        ]}
        examples={[responseExamples[1], responseExamples[2]]}
        outputs={fileOutputs}
      />
      <ConfigSection />
    </DocsLayout>
  );
}
