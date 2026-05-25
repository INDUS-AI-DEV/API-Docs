---
title: C2C Calls
description: Click2Call (C2C) API status reference and callback payload examples.
sidebar_position: 3
---

# C2C Calls

This page documents the Click2Call (C2C) call statuses returned by the API and received in the provider callback flow.

## Callback Endpoint

Provider callbacks are sent to:

```text
/api/calls/call-log
```

This callback stores the call result and updates the public C2C APIs.

## C2C Call Statuses

The main C2C statuses currently used are:

- `queued`: The call request was accepted and is waiting to be processed.
- `Answered`: The customer answered the call.
- `NoAnswered`: The call was attempted but was not answered.
- `failed`: The call failed technically or could not be completed.

## Status Meaning

### `queued`

Use this when the C2C request has been created but a final provider result has not been received yet.

Example:

```json
{
  "call_id": "call_queued_123",
  "status": "queued"
}
```

### `Answered`

Use this when the provider reports a successful answered call.

Typical behavior:

- `duration` contains the total call duration.
- `answer_duration` contains the connected talk time.
- `recording` may be available.

Example:

```json
{
  "call_id": "call_answered_123",
  "status": "Answered",
  "duration": "120",
  "answer_duration": "110",
  "recording": "https://example.com/recording.wav"
}
```

### `NoAnswered`

Use this when the provider reports that the call was not answered.

Typical behavior:

- `answer_duration` is usually `0` or blank.
- `duration` may still contain a provider-side duration value.
- `recording` is usually not available.

Example:

```json
{
  "call_id": "call_noanswered_123",
  "status": "NoAnswered",
  "duration": "32",
  "answer_duration": "0",
  "recording": ""
}
```

### `failed`

Use this when the C2C call fails for a technical or provider-side reason.

Example:

```json
{
  "call_id": "call_failed_123",
  "status": "failed",
  "recording": ""
}
```

## Example Callback Payload

```json
{
  "recording": "https://example.com/recording.wav",
  "customer_number": "919876543210",
  "agent_number": "918888888888",
  "did": "919484956750",
  "call_date": "2026-04-06 18:20:00",
  "duration": "120",
  "answer_duration": "110",
  "status": "Answered",
  "call_type": "C2C",
  "customer_crm_id": "call_1234567890abcdef"
}
```

## Notes

- `Answered` and `NoAnswered` are provider-style values and should be preserved as-is.
- `queued` is the initial state before a final call result arrives.
- `failed` is used for technical failure cases.
