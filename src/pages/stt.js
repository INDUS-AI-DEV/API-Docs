import React, { useState } from 'react';
import DocsLayout, { MethodBadge } from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import { getSidebarSections } from '@site/src/sidebarConfig';

import styles from './api.module.css';

const STT_BASE_URL = 'https://voice.induslabs.io';
const STT_WS_URL = 'wss://voice.induslabs.io';

const sttQuickIntegration = {
  title: 'Quick Integration',
  description: 'Sample requests to get transcription running in minutes.',
  defaultApi: 'stt-post-v1-audio-transcribe',
  apis: [
    {
      id: 'stt-post-v1-audio-transcribe',
      label: 'POST /v1/audio/transcribe',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${STT_BASE_URL}/v1/audio/transcribe"
with open("audio.mp3", "rb") as audio_file:
    files = {"file": ("audio.mp3", audio_file, "audio/mpeg")}
    data = {
        "api_key": "YOUR_API_KEY",
        "language": "en"
    }
    with requests.post(url, files=files, data=data, stream=True, timeout=30) as response:
        response.raise_for_status()
        for line in response.iter_lines():
            if not line:
                continue
            print(line.decode("utf-8"))`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const form = new FormData();
form.append('file', fs.createReadStream('audio.mp3'));
form.append('api_key', 'YOUR_API_KEY');
form.append('language', 'en');

const response = await fetch('${STT_BASE_URL}/v1/audio/transcribe', {
  method: 'POST',
  body: form,
  headers: form.getHeaders(),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

for await (const chunk of response.body) {
  process.stdout.write(chunk.toString());
}`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -N -X POST \\
  "${STT_BASE_URL}/v1/audio/transcribe" \\
  -H "accept: text/event-stream" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@audio.mp3;type=audio/mpeg" \\
  -F "api_key=YOUR_API_KEY" \\
  -F "language=en"`,
        },
      ],
    },
    /*
    {
      id: 'stt-post-v1-audio-transcribe-file',
      label: 'POST /v1/audio/transcribe/file',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${STT_BASE_URL}/v1/audio/transcribe/file"
with open("audio.mp3", "rb") as audio_file:
    files = {"file": ("audio.mp3", audio_file, "audio/mpeg")}
    data = {
        "api_key": "YOUR_API_KEY",
        "language": "en",
        "chunk_length_s": 6,
        "stride_s": 5.9,
        "overlap_words": 7
    }
    response = requests.post(url, files=files, data=data, timeout=30)
    response.raise_for_status()
    print(response.json())`,
        },
        {
          id: 'python-sdk',
          label: 'Python SDK (Basic Usage)',
          language: 'python',
          code: `from induslabs import Client

client = Client(api_key="YOUR_API_KEY")

result = client.stt.transcribe(
    "audio.mp3",
    language="en",
    chunk_length_s=6,
    stride_s=5.9,
    overlap_words=7
)

print(result.text)
print(f"Detected language: {result.language_detected}")`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const form = new FormData();
form.append('file', fs.createReadStream('audio.mp3'));
form.append('api_key', 'YOUR_API_KEY');
form.append('language', 'en');

const response = await fetch('${STT_BASE_URL}/v1/audio/transcribe/file', {
  method: 'POST',
  body: form,
  headers: form.getHeaders(),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const transcript = await response.json();
console.log(transcript);`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${STT_BASE_URL}/v1/audio/transcribe/file" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@audio.mp3;type=audio/mpeg" \\
  -F "api_key=YOUR_API_KEY" \\
  -F "language=en"`,
        },
      ],
    },
    */
    {
      id: 'stt-post-v1-audio-transcribe-file-async',
      label: 'POST /v1/audio/transcribe_file (Batch)',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import time
import requests

upload_url = "${STT_BASE_URL}/v1/audio/transcribe_file"

with open("meeting.wav", "rb") as audio_file:
    files = {"file": ("meeting.wav", audio_file, "audio/wav")}
    data = {
        "api_key": "YOUR_API_KEY",
        "model": "indus-stt-v1",
        "language": "en",
        "noise_cancellation": "true"
    }
    response = requests.post(upload_url, files=files, data=data, timeout=60)
    response.raise_for_status()
    job = response.json()

status_url = f"${STT_BASE_URL}/v1/audio/transcribe_status/{job['request_id']}?api_key=YOUR_API_KEY"

while True:
    poll = requests.get(status_url, timeout=30)
    poll.raise_for_status()
    payload = poll.json()
    if payload["status"] == "completed":
        print(payload["text"])
        break
    if payload["status"] == "failed":
        raise RuntimeError(payload.get("error", "transcription failed"))
    time.sleep(job.get("poll_interval", 5))`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const uploadUrl = '${STT_BASE_URL}/v1/audio/transcribe_file';
const statusBase = '${STT_BASE_URL}/v1/audio/transcribe_status';

async function transcribeBatch() {
  const form = new FormData();
  form.append('file', fs.createReadStream('meeting.wav'));
  form.append('api_key', 'YOUR_API_KEY');
  form.append('model', 'indus-stt-v1');
  form.append('language', 'en');
  form.append('noise_cancellation', 'true');

  const upload = await fetch(uploadUrl, {
    method: 'POST',
    body: form,
    headers: form.getHeaders(),
  });
  if (!upload.ok) throw new Error(\`Upload failed: \${upload.status}\`);
  const job = await upload.json();

  async function poll() {
    const res = await fetch(
      \`\${statusBase}/\${job.request_id}?api_key=YOUR_API_KEY\`
    );
    if (!res.ok) throw new Error(\`Status failed: \${res.status}\`);
    const payload = await res.json();
    if (payload.status === 'completed') {
      console.log(payload.text);
      return;
    }
    if (payload.status === 'failed') {
      throw new Error(payload.error || 'Transcription failed');
    }
    await new Promise(resolve => setTimeout(resolve, (job.poll_interval || 5) * 1000));
    return poll();
  }

  await poll();
}

transcribeBatch();`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${STT_BASE_URL}/v1/audio/transcribe_file" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@meeting.wav;type=audio/wav" \\
  -F "api_key=YOUR_API_KEY" \\
  -F "model=indus-stt-v1" \\
  -F "language=en" \\
  -F "noise_cancellation=false"

# Poll using the returned request_id
curl -X GET \\
  "${STT_BASE_URL}/v1/audio/transcribe_status/REQUEST_ID?api_key=YOUR_API_KEY" \\
  -H "accept: application/json"`,
        },
      ],
    },
    {
      id: 'stt-post-v1-audio-transcribe-diarize',
      label: 'POST /v1/audio/transcribe/diarize',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import json
import time
import requests

upload_url = "${STT_BASE_URL}/v1/audio/transcribe/diarize"
status_base = "${STT_BASE_URL}/v1/audio/transcribe/diarize/status"

config = {"language": "en", "noise_cancellation": True, "max_concurrency": 4}

with open("meeting.wav", "rb") as audio_file:
    files = {"file": ("meeting.wav", audio_file, "audio/wav")}
    data = {
        "api_key": "YOUR_API_KEY",
        "config_json": json.dumps(config)
    }
    response = requests.post(upload_url, files=files, data=data, timeout=90)
    response.raise_for_status()
    job = response.json()

status_url = f"{status_base}/{job['job_id']}?api_key=YOUR_API_KEY"

while True:
    poll = requests.get(status_url, timeout=30)
    poll.raise_for_status()
    payload = poll.json()
    if payload["status"] == "completed":
        for r in payload.get("results", []):
            print(f"{r.get('speaker')}: {r.get('text')}")
        break
    if payload["status"] == "failed":
        raise RuntimeError(payload.get("error", "diarization failed"))
    time.sleep(job.get("poll_interval", 5))`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const uploadUrl = '${STT_BASE_URL}/v1/audio/transcribe/diarize';
const statusBase = '${STT_BASE_URL}/v1/audio/transcribe/diarize/status';

async function diarize() {
  const form = new FormData();
  form.append('file', fs.createReadStream('meeting.wav'));
  form.append('api_key', 'YOUR_API_KEY');
  form.append('config_json', JSON.stringify({ language: 'en', noise_cancellation: true }));

  const upload = await fetch(uploadUrl, {
    method: 'POST',
    body: form,
    headers: form.getHeaders(),
  });
  if (!upload.ok) throw new Error('Upload failed: ' + upload.status);
  const job = await upload.json();

  async function poll() {
    const res = await fetch(statusBase + '/' + job.job_id + '?api_key=YOUR_API_KEY');
    if (!res.ok) throw new Error('Status failed: ' + res.status);
    const payload = await res.json();
    if (payload.status === 'completed') {
      payload.results?.forEach(r => console.log(r.speaker + ': ' + r.text));
      return;
    }
    if (payload.status === 'failed') {
      throw new Error(payload.error || 'Diarization failed');
    }
    await new Promise(resolve => setTimeout(resolve, (job.poll_interval || 5) * 1000));
    return poll();
  }

  await poll();
}

diarize();`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${STT_BASE_URL}/v1/audio/transcribe/diarize" \\
  -H "accept: application/json" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@meeting.wav;type=audio/wav" \\
  -F "api_key=YOUR_API_KEY" \\
  -F 'config_json={"language":"en","noise_cancellation":true}'

# Poll using the returned job_id
curl -X GET \\
  "${STT_BASE_URL}/v1/audio/transcribe/diarize/status/JOB_ID?api_key=YOUR_API_KEY" \\
  -H "accept: application/json"`,
        },
      ],
    },
    {
      id: 'stt-get-v1-audio-transcribe-config',
      label: 'GET /v1/audio/transcribe/config',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${STT_BASE_URL}/v1/audio/transcribe/config"
response = requests.get(url, timeout=30)
response.raise_for_status()

config = response.json()
print("Supported formats:", ", ".join(config["supported_formats"]))
print("Max file size (MB):", config["max_file_size_mb"])`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `const response = await fetch('${STT_BASE_URL}/v1/audio/transcribe/config', {
  method: 'GET',
  headers: {'accept': 'application/json'}
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const config = await response.json();
console.log('Supported formats:', config.supported_formats);
console.log('Max file size (MB):', config.max_file_size_mb);`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X GET \\
  "${STT_BASE_URL}/v1/audio/transcribe/config" \\
  -H "accept: application/json"`,
        },
      ],
    },
    {
      id: 'stt-ws-v1-audio-transcribe',
      label: 'WS /v1/audio/transcribe_ws',
      defaultLanguage: 'python-sdk',
      languages: [
        {
          id: 'python-sdk',
          label: 'Python SDK',
          language: 'python',
          code: `from induslabs import Client, STTSegment

client = Client(api_key="YOUR_API_KEY")

def on_segment(segment: STTSegment):
    """Called for each transcribed segment in real-time"""
    print(f"[segment] {segment.text}")

# Stream transcription with real-time callbacks
result = client.stt.transcribe(
    file="audio.wav",
    model="indus-stt-hi-en",  # Use indus-stt-hi-en for streaming
    streaming=True,
    language="hindi",
    on_segment=on_segment
)

print(f"\\n[final] {result.text}")
if result.metrics:
    print(f"RTF: {result.metrics.rtf:.3f}")`,
        },
        {
          id: 'python-async',
          label: 'Python Async',
          language: 'python',
          code: `import asyncio
from induslabs import Client, STTSegment

async def stream_transcription():
    async with Client(api_key="YOUR_API_KEY") as client:
        segments_received = []
        
        def on_segment(segment: STTSegment):
            segments_received.append(segment)
            print(f"[segment] {segment.text}")
        
        result = await client.stt.transcribe_async(
            "audio.wav",
            model="indus-stt-hi-en",
            streaming=True,
            language="hindi",
            on_segment=on_segment
        )
        
        print(f"\\n[final] {result.text}")
        print(f"Total segments: {len(segments_received)}")
        if result.metrics:
            print(f"RTF: {result.metrics.rtf:.3f}")

asyncio.run(stream_transcription())`,
        },
        {
          id: 'python-websocket',
          label: 'Python (WebSocket)',
          language: 'python',
          code: `import asyncio
import websockets
import json

async def transcribe_ws():
    # Pass API key and parameters in the URL query string
    params = {
        "api_key": "YOUR_API_KEY",
        "model": "indus-stt-hi-en",
        "language": "hindi",
        "streaming": "false",
        "noise_cancellation": "true"
    }
    query_string = "&".join([f"{k}={v}" for k, v in params.items()])
    uri = f"${STT_WS_URL}/v1/audio/transcribe_ws?{query_string}"
    
    async with websockets.connect(uri) as ws:
        # Read and send audio in chunks
        with open("audio.wav", "rb") as f:
            while chunk := f.read(4096):
                await ws.send(chunk)
        
        # Signal end of audio with __END__ marker
        await ws.send(b"__END__")
        
        # Receive transcription results
        async for message in ws:
            data = json.loads(message)
            msg_type = data.get("type")
            
            if msg_type == "chunk_interim":
                print(f"[interim] {data.get('text', '')}")
            elif msg_type == "chunk_final":
                print(f"[chunk] {data.get('text', '')}")
            elif msg_type == "final":
                print(f"\\n[final] {data.get('text', '')}")
                break

asyncio.run(transcribe_ws())`,
        },
        {
          id: 'javascript',
          label: 'JavaScript (WebSocket)',
          language: 'javascript',
          code: `const WebSocket = require('ws');
const fs = require('fs');

// Pass API key and parameters in the URL query string
const params = new URLSearchParams({
  api_key: 'YOUR_API_KEY',
  model: 'indus-stt-hi-en',
  language: 'hindi',
  streaming: 'false',
  noise_cancellation: 'true'
});

const ws = new WebSocket(\`${STT_WS_URL}/v1/audio/transcribe_ws?\${params}\`);

ws.on('open', () => {
  console.log('WebSocket connected');
  
  // Stream audio file in chunks
  const audioStream = fs.createReadStream('audio.wav', { 
    highWaterMark: 4096 
  });
  
  audioStream.on('data', (chunk) => {
    ws.send(chunk);
  });
  
  audioStream.on('end', () => {
    // Send __END__ marker as binary
    ws.send(Buffer.from('__END__'));
    console.log('Audio sent, waiting for transcription...');
  });
});

ws.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.type === 'chunk_interim') {
    console.log(\`[interim] \${msg.text}\`);
  } else if (msg.type === 'chunk_final') {
    console.log(\`[chunk] \${msg.text}\`);
  } else if (msg.type === 'final') {
    console.log(\`\\n[final] \${msg.text}\`);
    ws.close();
  }
});

ws.on('error', (err) => console.error('WebSocket error:', err));
ws.on('close', (code, reason) => console.log(\`WebSocket closed: \${code} \${reason}\`));`,
        },
      ],
    },
  ],
};

const supportedLanguageList = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Italian', code: 'it' },
  { name: 'Portuguese', code: 'pt' },
  { name: 'Russian', code: 'ru' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Korean', code: 'ko' },
  { name: 'Chinese', code: 'zh' },
  { name: 'Arabic', code: 'ar' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Turkish', code: 'tr' },
  { name: 'Polish', code: 'pl' },
  { name: 'Dutch', code: 'nl' },
  { name: 'Swedish', code: 'sv' },
  { name: 'Danish', code: 'da' },
  { name: 'Norwegian', code: 'no' },
  { name: 'Finnish', code: 'fi' },
  { name: 'Czech', code: 'cs' },
  { name: 'Slovak', code: 'sk' },
  { name: 'Hungarian', code: 'hu' },
  { name: 'Romanian', code: 'ro' },
  { name: 'Bulgarian', code: 'bg' },
  { name: 'Croatian', code: 'hr' },
  { name: 'Slovenian', code: 'sl' },
  { name: 'Estonian', code: 'et' },
  { name: 'Latvian', code: 'lv' },
  { name: 'Lithuanian', code: 'lt' },
  { name: 'Maltese', code: 'mt' },
  { name: 'Irish', code: 'ga' },
  { name: 'Welsh', code: 'cy' },
  { name: 'Icelandic', code: 'is' },
  { name: 'Macedonian', code: 'mk' },
  { name: 'Albanian', code: 'sq' },
  { name: 'Azerbaijani', code: 'az' },
  { name: 'Kazakh', code: 'kk' },
  { name: 'Kyrgyz', code: 'ky' },
  { name: 'Uzbek', code: 'uz' },
  { name: 'Tajik', code: 'tg' },
  { name: 'Amharic', code: 'am' },
  { name: 'Burmese', code: 'my' },
  { name: 'Khmer', code: 'km' },
  { name: 'Lao', code: 'lo' },
  { name: 'Sinhala', code: 'si' },
  { name: 'Nepali', code: 'ne' },
  { name: 'Bengali', code: 'bn' },
  { name: 'Assamese', code: 'as' },
  { name: 'Odia', code: 'or' },
  { name: 'Punjabi', code: 'pa' },
  { name: 'Gujarati', code: 'gu' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Telugu', code: 'te' },
  { name: 'Kannada', code: 'kn' },
  { name: 'Malayalam', code: 'ml' },
  { name: 'Thai', code: 'th' },
  { name: 'Vietnamese', code: 'vi' },
  { name: 'Indonesian', code: 'id' },
  { name: 'Malay', code: 'ms' },
  { name: 'Filipino/Tagalog', code: 'tl' },
];

const validationError = `{
  "detail": [
    {
      "loc": ["string", 0],
      "msg": "string",
      "type": "string"
    }
  ]
}`;

const sttConfigResponse = `{
  "model_id": "openai/whisper-large-v3",
  "supported_formats": ["wav", "mp3", "mp4", "m4a", "flac", "ogg"],
  "max_file_size_mb": 25,
  "hindi_model": {
    "enabled": true,
    "model_id": null
  },
  "defaults": {
    "chunk_length_s": 6.0,
    "stride_s": 5.9,
    "overlap_words": 7
  },
  "limits": {
    "chunk_length_range": [1.0, 30.0],
    "stride_range": [1.0, 29.0],
    "overlap_words_range": [0, 20],
    "timeout_seconds": 30
  },
  "supported_languages": [
    "en", "es", "fr", "de", "it", "pt", "ru", "ja", "ko", "zh",
    "ar", "hi", "tr", "pl", "nl", "sv", "da", "no", "fi", "cs",
    "sk", "hu", "ro", "bg", "hr", "sl", "et", "lv", "lt", "mt",
    "ga", "cy", "is", "mk", "sq", "az", "kk", "ky", "uz", "tg",
    "am", "my", "km", "lo", "si", "ne", "bn", "as", "or", "pa",
    "gu", "ta", "te", "kn", "ml", "th", "vi", "id", "ms", "tl"
  ],
  "output_formats": {
    "streaming": "Server-Sent Events (SSE) with real-time partial results",
    "file": "Complete JSON response with final transcript"
  },
  "credit_system": {
    "unit": "1 credit = 1 minute of audio",
    "billing": "Based on actual audio duration, not processing time"
  }
}`;

const sttInputs = [
  { name: 'file', type: 'file', defaultValue: 'required', description: 'Audio file to transcribe.' },
  { name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.' },
  { name: 'language', type: 'string', defaultValue: '-', description: 'Language code (e.g., "en", "hi") for forced detection.' },
  { name: 'chunk_length_s', type: 'number', defaultValue: '-', description: 'Length of each chunk in seconds (1–30).' },
  { name: 'stride_s', type: 'number', defaultValue: '-', description: 'Stride between chunks in seconds (1–29).' },
  { name: 'overlap_words', type: 'integer', defaultValue: '-', description: 'Number of overlapping words for context handling (0–20).' },
];

const streamingOutputs = [
  { name: '200 OK', type: 'text/event-stream', defaultValue: '-', description: 'Returns transcription results in JSON (streamed via SSE).' },
  { name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.' },
];

const fileOutputs = [
  { name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns the complete transcript and metrics as JSON.' },
  { name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.' },
];

const asyncFileInputs = [
  { name: 'file', type: 'file', defaultValue: 'required', description: 'Audio file up to 10 minutes (600 seconds).' },
  { name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.' },
  { name: 'model', type: 'string', defaultValue: '"default"', description: 'Use "default", "indus-stt-v1", "hi-en", or "indus-stt-hi-en".' },
  { name: 'language', type: 'string', defaultValue: '-', description: 'Language hint (ISO code or name).' },
  { name: 'noise_cancellation', type: 'boolean', defaultValue: 'false', description: 'Enable server-side denoising before inference.' },
];

const asyncFileOutputs = [
  { name: '202 Accepted', type: 'application/json', defaultValue: '-', description: 'Returns request_id, duration, estimated_time, and status_url for polling.' },
  { name: '400 Bad Request', type: 'application/json', defaultValue: '-', description: 'Audio rejected (e.g., longer than 10 minutes or invalid format).' },
  { name: '401 / 402', type: 'application/json', defaultValue: '-', description: 'Authentication failure or insufficient credits.' },
];

const asyncStatusInputs = [
  { name: 'request_id', type: 'path', defaultValue: 'required', description: 'Identifier returned from /v1/audio/transcribe_file.' },
  { name: 'api_key', type: 'string (query)', defaultValue: 'required', description: 'Same key used when creating the job.' },
];

const asyncStatusOutputs = [
  { name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Current status plus transcript, segments, and metrics when completed.' },
  { name: '404 Not Found', type: 'application/json', defaultValue: '-', description: 'Unknown or expired request_id.' },
  { name: '500 Internal Server Error', type: 'application/json', defaultValue: '-', description: 'Job failed; see error field for details.' },
];

const diarizeInputs = [
  { name: 'file', type: 'file', defaultValue: 'required', description: 'Audio file to diarize (max 30 minutes).' },
  { name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key.' },
  { name: 'config_json', type: 'string', defaultValue: '"{}"', description: 'Optional JSON string to tune language, models, padding, and concurrency.' },
];

const diarizeOutputs = [
  { name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns job_id, estimated_time, and status_url for polling diarization results.' },
  { name: '400 Bad Request', type: 'application/json', defaultValue: '-', description: 'Invalid audio, malformed config_json, or duration beyond 30 minutes.' },
  { name: '401 / 402', type: 'application/json', defaultValue: '-', description: 'Authentication failure or insufficient credits.' },
  { name: '503 Service Unavailable', type: 'application/json', defaultValue: '-', description: 'Credit service unavailable.' },
];

const diarizeStatusInputs = [
  { name: 'job_id', type: 'path', defaultValue: 'required', description: 'Identifier returned from /v1/audio/transcribe/diarize.' },
  { name: 'api_key', type: 'string (query)', defaultValue: 'required', description: 'Same key used when creating the job.' },
];

const diarizeStatusOutputs = [
  { name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Current diarization status plus speaker-labeled results when completed.' },
  { name: '404 Not Found', type: 'application/json', defaultValue: '-', description: 'Unknown or expired job_id.' },
  { name: '401 Unauthorized', type: 'application/json', defaultValue: '-', description: 'Invalid API key.' },
  { name: '503 Service Unavailable', type: 'application/json', defaultValue: '-', description: 'Credit service unavailable.' },
];

const configOutputs = [
  {
    name: '200 OK',
    type: 'application/json',
    defaultValue: '-',
    description: 'Returns defaults, limits, and supported languages/formats for the STT service.',
  },
  {
    name: '422 Validation Error',
    type: 'application/json',
    defaultValue: '-',
    description: 'Validation failure. Inspect detail array.',
  },
];

// WebSocket-specific definitions
const wsInputs = [
  { name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key passed in URL query string.' },
  { name: 'model', type: 'string', defaultValue: 'indus-stt-hi-en', description: 'Model to use (e.g., "indus-stt-hi-en").' },
  { name: 'language', type: 'string', defaultValue: '-', description: 'Language name or ISO code (e.g., "english", "hindi", "en", "hi").' },
  { name: 'streaming', type: 'string', defaultValue: '"true"', description: 'Use "true" for streaming mode (interim results), "false" for non-streaming.' },
  { name: 'noise_cancellation', type: 'string', defaultValue: '"false"', description: 'Use "true" to enable noise cancellation for cleaner audio in noisy environments. Filters low-frequency rumble, high-frequency hiss, and ambient background noise to reduce hallucinations and improve accuracy.' },
];

const wsMessageTypes = [
  { name: 'URL Query Params', type: 'URL', defaultValue: 'connection', description: 'Pass api_key, model, language, streaming as URL query parameters when connecting.' },
  { name: 'Audio Chunks', type: 'binary', defaultValue: 'continuous', description: 'Raw audio data sent as binary WebSocket frames (recommended: 4096 bytes per chunk).' },
  { name: 'End Signal', type: 'binary', defaultValue: 'last', description: 'Send b"__END__" to signal audio stream completion.' },
];

const wsOutputs = [
  { name: 'chunk_interim', type: 'JSON', defaultValue: '-', description: 'Interim transcription result during processing (when streaming="true").' },
  { name: 'chunk_final', type: 'JSON', defaultValue: '-', description: 'Final transcription for a processed audio chunk.' },
  { name: 'final', type: 'JSON', defaultValue: '-', description: 'Complete transcription with full text after all chunks processed.' },
  { name: 'error', type: 'JSON', defaultValue: '-', description: 'Error message if processing fails.' },
];

const wsResponseExamples = [
  {
    label: 'Chunk Interim Response',
    language: 'json',
    code: `{
  "type": "chunk_interim",
  "text": "यह एक टेस्ट है"
}`,
  },
  {
    label: 'Chunk Final Response',
    language: 'json',
    code: `{
  "type": "chunk_final",
  "text": "यह एक टेस्ट है, भाषन से पाट रूपांतरन का परिच्छन।",
  "chunk_index": 1,
  "total_chunks": 1
}`,
  },
  {
    label: 'Final Response',
    language: 'json',
    code: `{
  "type": "final",
  "text": "यह एक टेस्ट है, भाषन से पाट रूपांतरन का परिच्छन।",
  "audio_duration_seconds": 3.413375,
  "language_detected": "hi",
  "request_id": "df3a5974-6b24-4b15-a9d9-7c9df9513306"
}`,
  },
  {
    label: 'Error Response',
    language: 'json',
    code: `{
  "type": "error",
  "message": "Invalid API key",
  "code": "AUTH_ERROR"
}`,
  },
];

const responseExamples = [
  {
    label: '200 OK (SSE stream)',
    language: 'json',
    code: `data: {"type": "partial", "word": "यह", "provisional": true, "chunk_start": 0.0, "chunk_end": 3.413375, "chunk_index": 1, "total_chunks": 1}

data: {"type": "partial", "word": "एक", "provisional": true, "chunk_start": 0.0, "chunk_end": 3.413375, "chunk_index": 1, "total_chunks": 1}

data: {"type": "partial", "word": "टेस्ट", "provisional": true, "chunk_start": 0.0, "chunk_end": 3.413375, "chunk_index": 1, "total_chunks": 1}

data: {"type": "chunk_final", "text": "यह एक टेस्ट है, भाषन से पाट रूपांतरन का परिच्छन।", "chunk_start": 0.0, "chunk_end": 3.413375, "chunk_index": 1, "total_chunks": 1}

data: {"type": "final", "text": "यह एक टेस्ट है, भाषन से पाट रूपांतरन का परिच्छन।", "audio_duration_seconds": 3.413375, "processing_time_seconds": 1.44447922706604, "first_token_time_seconds": 0.136627197265625, "language_detected": "hi", "request_id": "df3a5974-6b24-4b15-a9d9-7c9df9513306"}`,
  },
  {
    label: '200 OK (JSON)',
    language: 'json',
    code: `{
  "request_id": "dcb7ca67-d379-45eb-aa45-7c31a6aa7946",
  "text": "यह एक टेस्ट है, भाषन से पाट रूपांतरन का परिच्छन।",
  "language_detected": "hi",
  "audio_duration_seconds": 3.413375,
  "processing_time_seconds": 1.0817227363586426,
  "first_token_time_seconds": 0.0055081844329833984,
  "credits_used": 0.017066875
}`,
  },
  {
    label: '200 OK (Config)',
    language: 'json',
    code: sttConfigResponse,
  },
  { label: '422 Validation Error', language: 'json', code: validationError },
  {
    label: '202 Accepted (Batch Upload)',
    language: 'json',
    code: `{
  "request_id": "13c8b15a-59f9-4cda-a3bb-3bf06f5e2c9b",
  "status": "processing",
  "message": "File uploaded successfully. Processing in background.",
  "duration": 126.42,
  "estimated_time": 18.96,
  "status_url": "/v1/audio/transcribe_status/13c8b15a-59f9-4cda-a3bb-3bf06f5e2c9b",
  "poll_interval": 5
}`,
  },
  {
    label: '200 OK (Batch Status)',
    language: 'json',
    code: `{
  "request_id": "13c8b15a-59f9-4cda-a3bb-3bf06f5e2c9b",
  "status": "completed",
  "progress_percentage": 100,
  "progress": "3/3",
  "text": "Final transcription text...",
  "segments": [
    {"text": "segment text", "start": 0, "end": 12.5}
  ],
  "processing_time": 98.11,
  "model": "indus-stt-v1"
}`,
  },
  {
    label: '200 OK (Diarization Upload)',
    language: 'json',
    code: `{
  "job_id": "7a5f2f0e4c8d4b2ab6d2c5d0fdc4b5e0",
  "status": "processing",
  "message": "File uploaded successfully. Processing in background.",
  "duration": 312.44,
  "estimated_time": 93.73,
  "status_url": "/v1/audio/transcribe/diarize/status/7a5f2f0e4c8d4b2ab6d2c5d0fdc4b5e0",
  "poll_interval": 5
}`,
  },
  {
    label: '200 OK (Diarization Status)',
    language: 'json',
    code: `{
  "job_id": "7a5f2f0e4c8d4b2ab6d2c5d0fdc4b5e0",
  "status": "completed",
  "results": [
    {
      "utterance_index": 1,
      "start_sec": 0.0,
      "end_sec": 14.2,
      "duration_sec": 14.2,
      "speaker": "speaker_0",
      "endpoint": "transcribe_file",
      "text": "Welcome everyone, let's review the agenda.",
      "status": "completed"
    },
    {
      "utterance_index": 2,
      "start_sec": 14.2,
      "end_sec": 29.8,
      "duration_sec": 15.6,
      "speaker": "speaker_1",
      "endpoint": "transcribe_ws",
      "text": "I will cover the launch metrics next.",
      "status": "completed"
    }
  ],
  "processing_time": 108.51,
  "model": "diarization"
}`,
  },
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
    id: 'stt-ws-v1-audio-transcribe',
    method: 'WS',
    path: '/v1/audio/transcribe_ws',
    title: 'WebSocket Streaming Transcription',
    description: 'Real-time STT via WebSocket. Supports bidirectional streaming for live audio input.',
    notes: [
      '**Persistent Connection**: Maintains open WebSocket for continuous audio streaming.',
      '**Real-time Results**: Receives transcription segments as audio is processed.',
      '**Low Latency**: Optimized for live microphone input and voice applications.',
      '**Segment Callbacks**: Provides word-level and segment-level results via callbacks.',
      '**Bidirectional**: Sends audio chunks and receives transcriptions simultaneously.',
      '**Noise Cancellation**: Optional server-side denoising before inference.',
    ],
    models: [
      { name: 'indus-stt-v1', description: 'Default model that supports all languages.' },
      { name: 'indus-stt-hi-en', description: 'Specialized model for Hindi and English with real-time streaming input/output and very low processing time.' },
    ],
    inputs: wsInputs,
    outputs: wsOutputs,
    messageTypes: wsMessageTypes,
    examples: wsResponseExamples,
    isWebSocket: true,
  },
  // {
  //   id: 'stt-post-v1-audio-transcribe-file',
  //   method: 'POST',
  //   path: '/v1/audio/transcribe/file',
  //   title: 'Transcribe Audio File (JSON)',
  //   description: 'This endpoint is used to transcribe an audio file and return the complete transcript as JSON (non-streaming).',
  //   notes: [
  //     'Accepts an audio file and returns the full transcription result after processing.',
  //     'Provides metrics in the JSON response (non-streaming, unlike the /v1/audio/transcribe endpoint).',
  //   ],
  //   inputs: sttInputs,
  //   outputs: fileOutputs,
  //   examples: [responseExamples[1], responseExamples[2]],
  // },
  {
    id: 'stt-post-v1-audio-transcribe-file-async',
    method: 'POST',
    path: '/v1/audio/transcribe_file',
    title: 'Transcribe Audio File (Batch Async)',
    description: 'Launches background transcription for files up to 10 minutes and immediately returns a request_id to poll later.',
    notes: [
      'Designed for long recordings up to 10 minutes (600 seconds).',
      'Returns immediately so your UI can poll the status endpoint or notify the user.',
      'Available via REST on the web — SDK helpers are not yet available.',
      'Supports optional noise cancellation before inference begins.',
    ],
    inputs: asyncFileInputs,
    outputs: asyncFileOutputs,
    examples: [responseExamples[4]],
  },
  {
    id: 'stt-get-v1-audio-transcribe-status',
    method: 'GET',
    path: '/v1/audio/transcribe_status/{request_id}',
    title: 'Get Batch Transcription Status',
    description: 'Polls the progress of a batch job created by /v1/audio/transcribe_file and returns the final transcript when completed.',
    notes: [
      'Call every poll_interval seconds until the job reports completed or failed.',
      'Completed responses include full text, segments, word-level timestamps (if available), and processing metrics.',
      'Failed jobs return an error string so that you can surface actionable feedback to users.',
    ],
    inputs: asyncStatusInputs,
    outputs: asyncStatusOutputs,
    examples: [responseExamples[5]],
  },
  {
    id: 'stt-post-v1-audio-transcribe-diarize',
    method: 'POST',
    path: '/v1/audio/transcribe/diarize',
    title: 'Diarize + Transcribe (Async)',
    description: 'Uploads audio for speaker diarization and per-speaker transcription, returning a job_id for polling.',
    notes: [
      'Runs speaker diarization before transcription to label speakers.',
      'Supports files up to 30 minutes; processing occurs in the background.',
      'Use config_json to tune language, noise_cancellation, padding, and concurrency parameters.',
      'Returns an estimated_time and status_url so clients can poll without blocking.',
    ],
    inputs: diarizeInputs,
    outputs: diarizeOutputs,
    examples: [responseExamples[6]],
  },
  {
    id: 'stt-get-v1-audio-transcribe-diarize-status',
    method: 'GET',
    path: '/v1/audio/transcribe/diarize/status/{job_id}',
    title: 'Get Diarization Status',
    description: 'Polls the progress of a diarization + transcription job created by /v1/audio/transcribe/diarize.',
    notes: [
      'Poll every poll_interval seconds until status is completed or failed.',
      'Completed responses return per-speaker utterances with start/end timestamps and transcript text.',
      'Failed jobs include an error string so you can surface actionable feedback.',
    ],
    inputs: diarizeStatusInputs,
    outputs: diarizeStatusOutputs,
    examples: [responseExamples[7]],
  },
  {
    id: 'stt-get-v1-audio-transcribe-config',
    method: 'GET',
    path: '/v1/audio/transcribe/config',
    title: 'Retrieve Transcription Configuration',
    description: 'Fetch default parameters, limits, and supported formats before sending audio for transcription.',
    notes: [
      'Provides current defaults for chunk sizing, stride, and overlap handling.',
      'Lists accepted media formats and the maximum upload size in megabytes.',
      'Use these values to validate client-side settings and avoid failed uploads.',
    ],
    inputs: [],
    outputs: configOutputs,
    examples: [responseExamples[3], responseExamples[2]],
  },
];

function TableCard({ title, rows, headerLabels }) {
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

function OutputCard({ rows }) {
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

function MessageTypeCard({ rows }) {
  const headerLabels = ['Message', 'Type', 'Order', 'Description'];
  return (
    <div className={styles.tableCard}>
      <h4>WebSocket Message Flow</h4>
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

function EndpointSection({ endpoint }) {
  const [copied, setCopied] = useState(false);
  const isWebSocket = endpoint.isWebSocket || endpoint.method === 'WS';
  const copyValue = isWebSocket
    ? `${STT_WS_URL}${endpoint.path}`
    : `${STT_BASE_URL}${endpoint.path}`;

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
          <strong>{isWebSocket ? 'Key Features' : 'Functionality'}</strong>
          <ul>
            {endpoint.notes.map(note => (
              <li key={note} dangerouslySetInnerHTML={{ __html: note.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </ul>
        </div>
      )}

      {/* WebSocket-specific connection info */}
      {isWebSocket && (
        <div className={styles.callout} style={{ background: 'rgba(156, 39, 176, 0.06)', borderColor: 'rgba(156, 39, 176, 0.2)' }}>
          <strong>WebSocket Connection</strong>
          <p style={{ margin: '0.5rem 0 0' }}>
            Connect to: <code>{STT_WS_URL}{endpoint.path}</code>
          </p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', opacity: 0.85 }}>
            Unlike REST endpoints, WebSocket maintains a persistent bidirectional connection for real-time streaming.
          </p>
        </div>
      )}

      {/* Available Models */}
      {endpoint.models && endpoint.models.length > 0 && (
        <div className={styles.callout} style={{ background: 'rgba(46, 125, 50, 0.06)', borderColor: 'rgba(46, 125, 50, 0.2)' }}>
          <strong>Available Models</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.5rem' }}>
            {endpoint.models.map(model => (
              <li key={model.name} style={{ marginBottom: '0.4rem' }}>
                <code style={{ fontWeight: 600 }}>{model.name}</code>: {model.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* WebSocket message flow */}
      {isWebSocket && endpoint.messageTypes && (
        <MessageTypeCard rows={endpoint.messageTypes} />
      )}

      <div className={styles.ioGrid}>
        <TableCard
          title={isWebSocket ? "Configuration Parameters" : "Form Fields"}
          rows={endpoint.inputs}
          headerLabels={['Name', 'Type', 'Default', 'Description']}
        />
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
    </section>
  );
}

function EmotionTranscript({ text, model, language }) {
  // Regex to match <|emotion_{name}|> tags
  const parts = text.split(/(<\|emotion_[a-z]+\|>)/g);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <div style={{
        lineHeight: '1.6',
        fontSize: '0.9rem',
        color: 'var(--color-text-primary, #e5e5e5)',
        background: 'var(--color-bg-secondary, #141414)',
        padding: '0.75rem',
        borderRadius: '6px',
        border: '1px solid var(--color-border, #333)'
      }}>
        {parts.map((part, index) => {
          const match = part.match(/<\|emotion_([a-z]+)\|>/);
          if (match) {
            const emotion = match[1];
            let bg = '#3b82f6'; // default blue

            if (emotion === 'whisper') { bg = '#8b5cf6'; } // purple
            else if (emotion === 'laugh') { bg = '#f59e0b'; } // yellow/orange
            else if (emotion === 'angry') { bg = '#ef4444'; } // red
            else if (emotion === 'shout') { bg = '#b91c1c'; } // dark red
            else if (emotion === 'uhm') { bg = '#6b7280'; } // gray

            return (
              <span key={index} className={styles.emotionTag} style={{ backgroundColor: bg }}>
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
      <div style={{
        marginTop: '0.25rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted, #737373)',
        display: 'flex',
        gap: '1rem',
        fontFamily: 'SF Mono, Monaco, monospace'
      }}>
        <span>model: <span style={{ color: 'var(--color-text-primary, #e5e5e5)' }}>{model || 'swarmitra-v2'}</span></span>
        <span>language: <span style={{ color: 'var(--color-text-primary, #e5e5e5)' }}>{language}</span></span>
      </div>
    </div>
  );
}

function SwarmitraSection() {
  const sample1 = "I think I saw a ghost in the hallway last night. <|emotion_whisper|> It was a dark shadow that just moved across the wall. <|emotion_laugh|> Okay, it was probably just the cat, but I didn't sleep for an hour.";
  const sample2 = "<|emotion_whisper|> Hi Rohit, how are you? I heard you are getting out of India right now. <|emotion_laugh|> That was just a joke, Rohit. <|emotion_angry|> What are you looking at like this?  Is it? Are you sure? No, don't worry.";
  const sample3 = "<|emotion_angry|> मैंने क्लियरली कहा था कि ये टास्क आज ही कंप्लीट होना चाहिए, <|emotion_shout|> लेकिन किसी ने सीरियसली नहीं लिया। <|emotion_uhm|> एंड, अब डेडलाइन पास है, इसलिए सब पैनिक कर रहे हैं और प्रेशर बहुत बढ़ गया है।";

  return (
    <section className={styles.endpointSection} id="swarmitra-emotional-models">
      <div className={styles.endpointHeader}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Swarmitra (Emotional Models)</h3>
      </div>
      <p style={{ marginTop: '0.5rem' }}>
        Unlock deeper insights with <code>indus-stt-emo</code> and <code>swarmitra-v2</code>. These specialized models go beyond transcription to detect <strong>emotional nuance</strong> in <strong>Hindi</strong> and <strong>English</strong> speech.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Sample 1: English (Ghost Story)</h4>
          <audio controls src="/audio/english_1.wav" style={{ width: '100%', borderRadius: '4px' }} />
          <EmotionTranscript text={sample1} language="English" />
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Sample 2: English (Conversation)</h4>
          <audio controls src="/audio/english_2.wav" style={{ width: '100%', borderRadius: '4px' }} />
          <EmotionTranscript text={sample2} language="English" />
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>Sample 3: Hindi (Work Pressure)</h4>
          <audio controls src="/audio/hindi_1.wav" style={{ width: '100%', borderRadius: '4px' }} />
          <EmotionTranscript text={sample3} language="Hindi" />
        </div>
      </div>

      <div className={styles.callout} style={{ background: 'rgba(233, 30, 99, 0.08)', borderColor: 'rgba(233, 30, 99, 0.4)', marginTop: '2rem' }}>
        <strong>Integration</strong>
        <p style={{ marginTop: '0.5rem' }}>
          Use these models seamlessly with existing endpoints:
        </p>
        <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.25rem' }}>
          <li><code>transcribe_ws</code> (Real-time streaming)</li>
          <li><code>transcribe_file</code> (Batch processing)</li>
        </ul>
      </div>
    </section>
  );
}

export default function SttPage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Speech-to-text service overview"
      sidebarSections={getSidebarSections('stt')}
      integration={sttQuickIntegration}
    >
      <section id="stt-introduction" className={styles.pageIntro}>
        <h1>Speech-to-Text Service</h1>
        <p>
          Convert spoken audio into accurate transcripts using flexible endpoints.
          Use <code>/v1/audio/transcribe</code> for streaming SSE results, <code>/v1/audio/transcribe_ws</code> for real-time WebSocket streaming, <code>/v1/audio/transcribe_file</code> + <code>GET /v1/audio/transcribe_status/{'{'}request_id{'}'}</code> for web-only batch jobs up to 10 minutes, <code>/v1/audio/transcribe/diarize</code> + <code>GET /v1/audio/transcribe/diarize/status/{'{'}job_id{'}'}</code> for speaker-labeled transcription up to 30 minutes, and <code>GET /v1/audio/transcribe/config</code> to inspect supported formats and defaults before uploading.
        </p>
        <div className={styles.apiKeyNotice} style={{
          background: 'rgba(84, 104, 255, 0.08)',
          border: '1px solid rgba(84, 104, 255, 0.2)',
          borderRadius: '16px',
          padding: '1.2rem 1.5rem',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}>
          <p style={{ margin: 0 }}>
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
            {supportedLanguageList.map(language => (
              <li key={language.code}>
                <span>{language.name}</span>
                <code>{language.code}</code>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <div style={{ marginTop: '0.75rem' }}>
        <div className={styles.apiKeyImage}>
          <img src="/img/api-key-location.png" alt="Where to get your API key" style={{ maxWidth: '420px', width: '100%', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }} />
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0 }}>
            Screenshot: where to find your API key. Create one at{' '}
            <a href="https://playground.induslabs.io/register" target="_blank" rel="noopener noreferrer">playground.induslabs.io/register</a>
          </p>
        </div>
      </div>

      <SwarmitraSection />

      {endpoints.map(endpoint => (
        <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}
    </DocsLayout>
  );
}
