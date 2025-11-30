---
id: audio-speech-apis
title: Audio & Speech APIs
slug: /api/audio-speech
description: Reference documentation for text-to-speech and speech-to-text REST endpoints.
sidebar_label: Audio & Speech
---

This page documents the available audio-focused REST endpoints, including text-to-speech (TTS) synthesis and speech-to-text (STT) transcription. All endpoints accept and return JSON unless otherwise noted.

![Where to get your API key](/img/api-key-location.png)

_Screenshot: where to find your API key. Create one at [playground.induslabs.io/register](https://playground.induslabs.io/register)._ 

## Base URLs

- TTS endpoints: Append the listed paths to your deployment host, for example `https://<host>/v1/audio/speech`.
- STT endpoint: Hosted at `http://164.52.214.239:8012`.

## Endpoint Overview

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/v1/audio/speech` | Synthesize speech. Supports streaming and non-streaming replies in OpenAI-compatible format. |
| `POST` | `/v1/audio/speech/file` | Synthesize speech and return the full audio file as base64. |
| `POST` | `/v1/audio/speech/preview` | Preview how text will be chunked and processed without generating audio. |
| `POST` | `/stt/transcribe` | Submit audio for speech-to-text transcription. |

## Shared TTS Request Payload

Unless stated otherwise, all TTS endpoints accept the same JSON payload:

```json
{
  "text": "string",
  "voice": "tara",
  "output_format": "pcm",
  "response_format": "pcm",
  "stream": false,
  "language": "en",
  "temperature": 0.6,
  "max_tokens": 1800,
  "top_p": 0.8,
  "repetition_penalty": 1.1,
  "max_words_per_chunk": 15,
  "chunk_overlap_words": 0,
  "bitrate": 128
}
```

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `text` | string | Yes | - | Text to synthesize. |
| `voice` | string | Yes | `tara` | Target voice model. |
| `output_format` | string | Yes | `pcm` | Audio encoding produced by the service. |
| `response_format` | string | Yes | `pcm` | Response container format; match with client decoder expectations. |
| `stream` | boolean | Yes | `false` | Set to `true` for chunked streaming responses when supported. |
| `language` | string | Yes | `en` | ISO language code for the input text. |
| `temperature` | number | Yes | `0.6` | Controls speech variation. Lower values sound more deterministic. |
| `max_tokens` | integer | Yes | `1800` | Maximum token budget for generated speech. |
| `top_p` | number | Yes | `0.8` | Nucleus sampling parameter; lower narrows voice variation. |
| `repetition_penalty` | number | Yes | `1.1` | Penalizes repeated phrases. Values > 1 curb repetition. |
| `max_words_per_chunk` | integer | Yes | `15` | Chunk size used when streaming or chunking text. |
| `chunk_overlap_words` | integer | Yes | `0` | Number of overlapping words between adjacent chunks. |
| `bitrate` | integer | Yes | `128` | Target audio bitrate (kbps) when format allows. |

> Tip: Ensure `output_format` and `response_format` align with your decoder pipeline. For example, use `mp3` to request compressed output suitable for browsers.

## POST /v1/audio/speech - Synthesize Speech

Main TTS endpoint compatible with the OpenAI `/v1/audio/speech` format. Supports both streaming and non-streaming responses.

### Request

- **Headers**: `Content-Type: application/json`
- **Body**: JSON described in [Shared TTS Request Payload](#shared-tts-request-payload).

#### Example

```bash
curl -X POST "https://<host>/v1/audio/speech" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "Welcome to the audio API",
        "voice": "tara",
        "output_format": "mp3",
        "response_format": "mp3",
        "stream": false,
        "language": "en"
      }'
```

### Responses

- `200 OK`: Returns raw audio bytes when `response_format` is a binary media type (e.g., `mp3`). For PCM responses the service returns binary PCM data. Handle the body according to the chosen format.
- `422 Unprocessable Entity`: Validation error. Payload structure:

```json
{
  "detail": [
    {
      "loc": ["string", 0],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

## POST /v1/audio/speech/file - Synthesize Speech File

Generates speech and returns metadata plus the full audio contents encoded as base64. Use this endpoint when you need deterministic duration and file size information.

### Request

- **Headers**: `Content-Type: application/json`
- **Body**: Same as [Shared TTS Request Payload](#shared-tts-request-payload). Streaming must remain `false`.

#### Example

```bash
curl -X POST "https://<host>/v1/audio/speech/file" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "Generate a complete downloadable file",
        "voice": "tara",
        "output_format": "wav",
        "response_format": "base64",
        "stream": false
      }'
```

### Responses

- `200 OK`: Returns synthesis metadata and base64-encoded audio.

```json
{
  "request_id": "string",
  "text": "string",
  "voice": "string",
  "output_format": "string",
  "duration_seconds": 0,
  "size_bytes": 0,
  "processing_time_ms": 0,
  "stream": false
}
```

- `422 Unprocessable Entity`: Validation error payload identical to `/v1/audio/speech`.

## POST /v1/audio/speech/preview - Speech Preview

Provides a dry-run preview that reveals how the input text will be chunked and scored without generating audio. Useful for estimating token usage, verifying chunk boundaries, and optimizing costs.

### Request

- **Headers**: `Content-Type: application/json`
- **Body**: Same as [Shared TTS Request Payload](#shared-tts-request-payload).

#### Example

```bash
curl -X POST "https://<host>/v1/audio/speech/preview" \
  -H "Content-Type: application/json" \
  -d '{
        "text": "Check chunking without audio output",
        "voice": "tara"
      }'
```

### Responses

- `200 OK`: Returns a preview string describing chunking decisions.
- `422 Unprocessable Entity`: Validation error payload identical to `/v1/audio/speech`.

## POST /stt/transcribe - Speech to Text

Uploads audio and returns a transcription. Requires multipart form data.

### Request

- **URL**: `http://164.52.214.239:8012/stt/transcribe`
- **Headers**: `accept: application/json`, `Content-Type: multipart/form-data`
- **Form fields**:
  - `file` (required): Audio file upload. Include the MIME type (e.g., `audio/mpeg`).
  - `language` (optional): Override automatic language detection by providing an ISO code.
  - `secret_key` (required): API credential string.
  - `deduct_url` (optional): Callback URL for metering or billing hooks.

#### Example

```bash
curl -X POST "http://164.52.214.239:8012/stt/transcribe" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@synthetic_0038.mp3;type=audio/mpeg" \
  -F "language=" \
  -F "secret_key=YOUR_SECRET_KEY" \
  -F "deduct_url="
```

### Responses

- `200 OK`: Returns the transcription text as a JSON string.
- `422 Unprocessable Entity`: Validation error payload matches the structure used by TTS endpoints.

## Error Handling

All endpoints use HTTP status `422` to report validation problems. The `detail` array identifies the parameter that failed validation, the reason, and the error type. Log the response body when troubleshooting invalid requests.

## Usage Notes

- Reuse the same base payload across TTS endpoints to keep configuration consistent.
- When using streaming, ensure the client can parse chunked responses; the `/v1/audio/speech/file` endpoint is strictly non-streaming.
- Update `secret_key` and network configuration to match your deployment environment before deploying your applications.
- Monitor `duration_seconds` and `size_bytes` from the file endpoint to track storage and bandwidth costs.

