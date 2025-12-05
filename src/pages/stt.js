import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import {getSidebarSections} from '@site/src/sidebarConfig';

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
    print(f"{segment.text}")

# Stream transcription with real-time callbacks
result = client.stt.transcribe(
    file="audio.wav",
    model="indus-stt-hi-en",  # Use indus-stt-hi-en for streaming
    streaming=True,
    language="hindi",
    on_segment=on_segment
)

print(f"\\nFinal transcript: {result.text}")
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
            print(f"{segment.text}")
        
        result = await client.stt.transcribe_async(
            "audio.wav",
            model="indus-stt-hi-en",
            streaming=True,
            language="hindi",
            on_segment=on_segment
        )
        
        print(f"\\nFinal: {result.text}")
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
        "streaming": "true",  # Use "true" for streaming, "false" for non-streaming
        "noise_cancellation": "false"  # Set to "true" to enable noise filtering
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
                print(f"[INTERIM] {data.get('text', '')}")
            elif msg_type == "chunk_final":
                print(f"[CHUNK] {data.get('text', '')}")
            elif msg_type == "final":
                print(f"\\nFinal: {data.get('text', '')}")
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
  streaming: 'true',  // Use 'true' for streaming, 'false' for non-streaming
  noise_cancellation: 'false'  // Set to 'true' to enable noise filtering
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
    console.log(\`[INTERIM] \${msg.text}\`);
  } else if (msg.type === 'chunk_final') {
    console.log(\`[CHUNK] \${msg.text}\`);
  } else if (msg.type === 'final') {
    console.log(\`\\nFinal: \${msg.text}\`);
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
  {name: 'Filipino/Tagalog', code: 'tl'},
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
  {name: 'api_key', type: 'string', defaultValue: 'required', description: 'Authentication API key passed in URL query string.'},
  {name: 'model', type: 'string', defaultValue: 'indus-stt-hi-en', description: 'Model to use (e.g., "indus-stt-hi-en").'},
  {name: 'language', type: 'string', defaultValue: '-', description: 'Language name or ISO code (e.g., "english", "hindi", "en", "hi").'},
  {name: 'streaming', type: 'string', defaultValue: '"true"', description: 'Use "true" for streaming mode (interim results), "false" for non-streaming.'},
  {name: 'noise_cancellation', type: 'string', defaultValue: '"false"', description: 'Use "true" to enable noise cancellation for cleaner audio in noisy environments. Filters low-frequency rumble, high-frequency hiss, and ambient background noise to reduce hallucinations and improve accuracy.'},
];

const wsMessageTypes = [
  {name: 'URL Query Params', type: 'URL', defaultValue: 'connection', description: 'Pass api_key, model, language, streaming as URL query parameters when connecting.'},
  {name: 'Audio Chunks', type: 'binary', defaultValue: 'continuous', description: 'Raw audio data sent as binary WebSocket frames (recommended: 4096 bytes per chunk).'},
  {name: 'End Signal', type: 'binary', defaultValue: 'last', description: 'Send b"__END__" to signal audio stream completion.'},
];

const wsOutputs = [
  {name: 'chunk_interim', type: 'JSON', defaultValue: '-', description: 'Interim transcription result during processing (when streaming="true").'},
  {name: 'chunk_final', type: 'JSON', defaultValue: '-', description: 'Final transcription for a processed audio chunk.'},
  {name: 'final', type: 'JSON', defaultValue: '-', description: 'Complete transcription with full text after all chunks processed.'},
  {name: 'error', type: 'JSON', defaultValue: '-', description: 'Error message if processing fails.'},
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
    {
      id: 'stt-ws-v1-audio-transcribe',
      method: 'WS',
      path: '/v1/audio/transcribe_ws',
      title: 'WebSocket Streaming Transcription',
      description: 'Real-time speech-to-text transcription using WebSocket for bidirectional streaming. Perfect for live audio, voice assistants, and low-latency applications.',
      notes: [
        '**Persistent Connection**: Maintains a WebSocket connection for continuous audio streaming.',
        '**Real-time Results**: Receive transcription segments as audio is processed—no waiting for the complete file.',
        '**Low Latency**: Optimized for live microphone input and real-time voice applications.',
        '**Segment Callbacks**: Get word-level and segment-level results via callbacks as they become available.',
        '**Bidirectional**: Send audio chunks and receive transcriptions simultaneously.',
        '**Noise Cancellation**: Optional audio enhancement that filters background noise for improved accuracy in noisy environments.',
      ],
      models: [
        {name: 'indus-stt-v1', description: 'Default model that supports all languages.'},
        {name: 'indus-stt-hi-en', description: 'Specialized model for Hindi and English with real-time streaming input/output and very low processing time.'},
      ],
      inputs: wsInputs,
      outputs: wsOutputs,
      messageTypes: wsMessageTypes,
      examples: wsResponseExamples,
      isWebSocket: true,
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

function MessageTypeCard({rows}) {
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
  
function EndpointSection({endpoint}) {
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
          Use <code>/v1/audio/transcribe</code> for streaming SSE results, <code>/v1/audio/transcribe/file</code> for complete JSON output, <code>/v1/audio/transcribe_ws</code> for real-time WebSocket streaming, and <code>GET /v1/audio/transcribe/config</code> to inspect supported formats and defaults before uploading.
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
            {supportedLanguageList.map(language => (
              <li key={language.code}>
                <span>{language.name}</span>
                <code>{language.code}</code>
              </li>
            ))}
          </ul>
        </details>
      </section>
      
      <div style={{marginTop: '0.75rem'}}>
        <div className={styles.apiKeyImage}>
          <img src="/img/api-key-location.png" alt="Where to get your API key" style={{maxWidth: '420px', width: '100%', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)'}} />
          <p style={{fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: 0}}>
            Screenshot: where to find your API key. Create one at{' '}
            <a href="https://playground.induslabs.io/register" target="_blank" rel="noopener noreferrer">playground.induslabs.io/register</a>
          </p>
        </div>
      </div>

      {endpoints.map(endpoint => (
          <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}
    </DocsLayout>
  );
}
