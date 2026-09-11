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

## Voice-Agent Calls (`AGT_` agent number)

`POST /api/calls/click2call` can also connect the customer to an Indus voice agent instead of a human agent. Pass the voice agent ID (for example `AGT_E882B100`) as `agent_number`. The platform dials `customer_number` and the voice agent takes the call.

Use `agent_config` to pass **call infields**: per-call values such as the customer's name, an amount, or a CRM ID.

```json
{
  "customer_number": "919999999999",
  "agent_number": "AGT_E882B100",
  "callback_url": "https://example.com/webhooks/indus/click2call",
  "transcript": true,
  "agent_config": {
    "user_name": "Aarav Sharma",
    "customer_name": "Aarav Sharma",
    "crm_id": "CRM_123",
    "loan_amount": 250000,
    "due_date": "20 September 2026"
  }
}
```

### How it differs from provider C2C

- Voice-agent mode is used when `agent_number` starts with `AGT_` (uppercase). Any other value uses the provider flow.
- `did` is not required and is ignored. The call is placed from the phone number assigned to the agent for outbound calls. If no number is assigned, the platform default is used.
- The agent must belong to your account, or you must be a member of the agent's team.
- The request waits up to about 15 seconds for the customer to answer. The response `status` is `success` if the customer answered, or `failed` if not. It is never `queued`.
- Calls use the agent owner's credits and the purchased channels of the agent's outbound number. Click2Call DID channel allocation does not apply.
- The stored call has `call_type` = `agent_telephony`.
- `transcript_language` is ignored. With `transcript: true`, the transcript is the voice agent's own conversation log.

### Call infields in `agent_config`

1. In the agent's system prompt or first message, write placeholders with single curly braces, for example `{customer_name}`.
2. On each request, send the values as **flat keys** in `agent_config`. Key names must match the placeholders exactly (case-sensitive).

- Do **not** nest the values under `call_infields`. Unlike `POST /api/livekit`, this endpoint does not unwrap a nested object.
- If a placeholder has no matching key, the agent says it as-is (for example it speaks the text `{customer_name}`).
- Values are inserted as text, so format dates and amounts the way the agent should say them.
- Do not put secrets in `agent_config`.

Example agent prompt using the infields above:

```text
System prompt:
You are a collections assistant for Acme Finance. You are speaking with {customer_name}.
Their outstanding amount is Rs {loan_amount}, due on {due_date}. CRM reference: {crm_id}.

First message:
Namaste {customer_name} ji, main Acme Finance se baat kar rahi hoon. Kya aapke paas do minute hain?
```

### Control keys in `agent_config`

| Key | Behavior |
| --- | --- |
| `user_name` | Name of the person being called. Defaults to `customer_number`. Also available as `{user_name}`. |
| `voice_id` | TTS voice for this call only. Defaults to the voice in the agent's current config. |
| `language` | Language code for this call only, for example `hi` or `en`. |
| `target_agent_id` | Optional target `AGT_` ID for agent routing. |
| `sip_trunk_id` | Ignored. The outbound number and trunk always come from the agent's number assignment. |
| any other key | Custom call infield, forwarded to the voice agent. |

The platform sets these keys itself. Do not use them as infield names: `agent_id`, `call_id`, `phone_number`, `from_number`, `phone_number_id`, `sip_call_to`, `room_id`, `voice_room_id`, `metadata`, `scheduled_time`, `timezone`.

### Voice-agent response and errors

```json
{
  "status_code": 200,
  "message": "Click2Call request created",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "status": "success",
    "did": null,
    "callback_url": "https://example.com/webhooks/indus/click2call",
    "transcript": true,
    "transcript_language": null,
    "warning": null
  }
}
```

| HTTP status | When |
| --- | --- |
| `402` | Insufficient credits, or no channels purchased for the agent's outbound number. |
| `403` | The agent is not owned by you or your team. |
| `404` | The agent was not found. |
| `429` | Channel limit reached for the agent's outbound number. |

These errors return `{ "detail": "...", "request_id": "..." }`.

### Voice-agent callbacks

- If the call does not connect, the platform sends `call.failed` with the error `Voice-agent call could not be connected`.
- With `transcript: false`, it sends `call.completed` and then `transcript.disabled` after the call ends.
- With `transcript: true`, it sends `call.completed` and then `transcript.ready` once the transcript and recording are linked. If they are not available within 30 minutes of the call ending, it sends `transcript.failed` instead.

## Notes

- `Answered` and `NoAnswered` are provider-style values and should be preserved as-is.
- `queued` is the initial state before a final call result arrives.
- `failed` is used for technical failure cases.
