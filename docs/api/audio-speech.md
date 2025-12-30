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
- STT endpoints: Hosted at `https://voice.induslabs.io`. Append the REST paths below (for example `https://voice.induslabs.io/v1/audio/transcribe`).

## Endpoint Overview

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/v1/audio/speech` | Synthesize speech. Supports streaming and non-streaming replies in OpenAI-compatible format. |
| `POST` | `/v1/audio/speech/file` | Synthesize speech and return the full audio file as base64. |
| `POST` | `/v1/audio/speech/preview` | Preview how text will be chunked and processed without generating audio. |
| `POST` | `/v1/audio/transcribe` | Submit audio for SSE streaming transcription (REST). |
| `POST` | `/v1/audio/transcribe/file` | Submit audio for blocking JSON transcription. |
| `POST` | `/v1/audio/transcribe_file` | Launch batch processing for files up to 10 minutes (web-only). |
| `GET` | `/v1/audio/transcribe_status/{request_id}` | Poll background jobs created by `/v1/audio/transcribe_file`. |
| `POST` | `/v1/audio/transcribe/diarize` | Submit audio for diarization + transcription (async). |
| `GET` | `/v1/audio/transcribe/diarize/status/{job_id}` | Poll diarization jobs created by `/v1/audio/transcribe/diarize`. |

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

## POST /v1/audio/transcribe - Streaming Speech to Text

Uploads audio via multipart form data and streams transcription events over Server-Sent Events (SSE).

### Request

- **URL**: `https://voice.induslabs.io/v1/audio/transcribe`
- **Headers**: `accept: text/event-stream`, `Content-Type: multipart/form-data`
- **Form fields**:
  - `file` (required): Audio file upload. Include the MIME type (e.g., `audio/mpeg`).
  - `api_key` (required): API credential string.
  - `language` (optional): ISO or language name hint to bypass auto-detect.
  - `chunk_length_s`, `stride_s`, `overlap_words` (optional): Advanced chunking controls.

#### Example

```bash
curl -N -X POST "https://voice.induslabs.io/v1/audio/transcribe" \
  -H "accept: text/event-stream" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@audio.mp3;type=audio/mpeg" \
  -F "api_key=YOUR_API_KEY" \
  -F "language=en"
```

### Responses

- `200 OK`: SSE stream emitting `partial`, `chunk_final`, and `final` events.
- `422 Unprocessable Entity`: Validation error payload matches the structure used by TTS endpoints.

<!--
## POST /v1/audio/transcribe/file - Synchronous Speech to Text

Processes the uploaded audio and returns the entire transcript plus metrics as JSON once processing completes.

### Request

- **URL**: `https://voice.induslabs.io/v1/audio/transcribe/file`
- **Headers**: `accept: application/json`, `Content-Type: multipart/form-data`
- **Form fields**: Same as `/v1/audio/transcribe`. Streaming is disabled; the response blocks until transcription finishes.

#### Example

```bash
curl -X POST "https://voice.induslabs.io/v1/audio/transcribe/file" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@audio.mp3;type=audio/mpeg" \
  -F "api_key=YOUR_API_KEY" \
  -F "language=en"
```

### Responses

- `200 OK`: Final transcript and metrics as JSON.
- `422 Unprocessable Entity`: Validation error payload matches the structure used by TTS endpoints.
-->

## POST /v1/audio/transcribe_file - Batch Speech to Text (Web only)

Launches background transcription for files up to **10 minutes (600 seconds)**. The endpoint returns immediately with a `request_id`; clients poll the status endpoint to retrieve the transcript. This flow is only exposed through the REST interface (no SDK helpers yet).

### Request

- **URL**: `https://voice.induslabs.io/v1/audio/transcribe_file`
- **Headers**: `accept: application/json`, `Content-Type: multipart/form-data`
- **Form fields**:
  - `file` (required): Audio file to upload (max 10 minutes).
  - `api_key` (required): API credential string.
  - `model` (optional): `default`, `indus-stt-v1`, `hi-en`, or `indus-stt-hi-en`. Defaults to `default`.
  - `language` (optional): Language name or ISO code.
  - `noise_cancellation` (optional, boolean): Apply server-side noise suppression before inference. Default: `false`. Note: Currently only supported in non-streaming mode.

#### Example

```bash
curl -X POST "https://voice.induslabs.io/v1/audio/transcribe_file" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@meeting.wav;type=audio/wav" \
  -F "api_key=YOUR_API_KEY" \
  -F "model=indus-stt-v1" \
  -F "language=en" \
  -F "noise_cancellation=false"
```

### Responses

- `202 Accepted`: Returns `request_id`, original duration, estimated processing time, and a relative `status_url`.
- `400 Bad Request`: The payload explains issues such as exceeding the 10-minute limit or invalid audio format.
- `401/402`: Authentication failure or insufficient credits.

```json
{
  "request_id": "13c8b15a-59f9-4cda-a3bb-3bf06f5e2c9b",
  "status": "processing",
  "message": "File uploaded successfully. Processing in background.",
  "duration": 126.42,
  "estimated_time": 18.96,
  "status_url": "/v1/audio/transcribe_status/13c8b15a-59f9-4cda-a3bb-3bf06f5e2c9b",
  "poll_interval": 5
}
```

## GET /v1/audio/transcribe_status/{request_id} - Check Batch Status

Poll this endpoint with the `request_id` returned by `/v1/audio/transcribe_file`. Continue polling every `poll_interval` seconds until the job reports `completed` or `failed`.

### Request

- **URL**: `https://voice.induslabs.io/v1/audio/transcribe_status/{request_id}`
- **Headers**: `accept: application/json`
- **Query parameters**:
  - `api_key` (required): Same key used for the upload request.

#### Example

```bash
curl -X GET "https://voice.induslabs.io/v1/audio/transcribe_status/13c8b15a-59f9-4cda-a3bb-3bf06f5e2c9b?api_key=YOUR_API_KEY" \
  -H "accept: application/json"
```

### Responses

- `200 OK`: Returns progress metrics. When `status` becomes `completed`, the payload also includes `text`, `segments`, optional `word_timestamps`, `processing_time`, and the `model` used.
- `404 Not Found`: Unknown or expired `request_id`.
- `500 Internal Server Error`: The response includes an `error` field describing what failed.

```json
{
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
}
```

## POST /v1/audio/transcribe/diarize - Speaker Diarization + Transcription

Uploads an audio file, performs speaker diarization plus per-speaker transcription, and returns immediately with a `job_id` to poll. Supports files up to **30 minutes**. Jobs run asynchronously and should be tracked via the status endpoint below.

### Request

- **URL**: `https://voice.induslabs.io/v1/audio/transcribe/diarize`
- **Headers**: `accept: application/json`, `Content-Type: multipart/form-data`
- **Form fields**:
  - `file` (required): Audio file to diarize (max 30 minutes). Any format supported by torchaudio is accepted; audio is converted to mono 16 kHz WAV internally.
  - `api_key` (required): API credential string.
  - `config_json` (optional): JSON string matching the `TranscriptionConfig`. Common options include:
    - `language` (default `"en"`)
    - `noise_cancellation` (default `false`)
    - `ws_model` (default `"indus-stt-hi-en"`)
    - `file_model` (default `"indus-stt-hi-en"`)
    - `gap_sec` (default `1.0`) and `pad_ms` (default `150.0`) to control padding around segments
    - `max_merge_sec` (default `30.0`) to cap merged same-speaker spans
    - `max_concurrency` (default `4`) to limit parallel chunk transcription
    - `chunk_len`, `chunk_right_context`, `fifo_len`, `spkcache_update_period`, `spkcache_len` for advanced Sortformer tuning

#### Example

```bash
curl -X POST "https://voice.induslabs.io/v1/audio/transcribe/diarize" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@meeting.wav;type=audio/wav" \
  -F "api_key=YOUR_API_KEY" \
  -F 'config_json={"language":"en","noise_cancellation":true,"max_concurrency":4}'
```

### Responses

- `200 OK`: Returns `job_id`, estimated timing, and `status_url` for polling.
- `400 Bad Request`: Invalid audio (empty/unsupported), malformed `config_json`, or audio longer than 30 minutes.
- `401/402`: Authentication failure or insufficient credits.
- `503 Service Unavailable`: Credit service unavailable.

```json
{
  "job_id": "7a5f2f0e4c8d4b2ab6d2c5d0fdc4b5e0",
  "status": "processing",
  "message": "File uploaded successfully. Processing in background.",
  "duration": 312.44,
  "estimated_time": 93.73,
  "status_url": "/v1/audio/transcribe/diarize/status/7a5f2f0e4c8d4b2ab6d2c5d0fdc4b5e0",
  "poll_interval": 5
}
```

## GET /v1/audio/transcribe/diarize/status/{job_id} - Check Diarization Status

Poll this endpoint using the `job_id` from `/v1/audio/transcribe/diarize`. Continue polling every `poll_interval` seconds until the job reports `completed` or `failed`.

### Request

- **URL**: `https://voice.induslabs.io/v1/audio/transcribe/diarize/status/{job_id}`
- **Headers**: `accept: application/json`
- **Query parameters**:
  - `api_key` (required): Same key used for the upload request.

#### Example

```bash
curl -X GET "https://voice.induslabs.io/v1/audio/transcribe/diarize/status/7a5f2f0e4c8d4b2ab6d2c5d0fdc4b5e0?api_key=YOUR_API_KEY" \
  -H "accept: application/json"
```

### Responses

- `200 OK`: Returns current status. When `status` is `completed`, the payload includes diarized segments with speaker labels.
- `404 Not Found`: Unknown or expired `job_id`.
- `401`: Invalid API key.
- `503 Service Unavailable`: Credit service unavailable.

```json
{
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
}
```

## Error Handling

All endpoints use HTTP status `422` to report validation problems. The `detail` array identifies the parameter that failed validation, the reason, and the error type. Log the response body when troubleshooting invalid requests.

## Usage Notes

- Reuse the same base payload across TTS endpoints to keep configuration consistent.
- When using streaming, ensure the client can parse chunked responses; the `/v1/audio/speech/file` endpoint is strictly non-streaming.
- Update `secret_key` and network configuration to match your deployment environment before deploying your applications.
- Monitor `duration_seconds` and `size_bytes` from the file endpoint to track storage and bandwidth costs.

