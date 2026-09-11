import React from 'react';
import DocsLayout, { MethodBadge } from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import { getSidebarSections } from '@site/src/sidebarConfig';

import styles from './api.module.css';

const PROD_BASE_URL = 'https://developer.induslabs.io';

const loginCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "your_password"
  }'`;

const click2callCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/calls/click2call" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "customer_number": "919999999999",
    "agent_number": "918888888888",
    "did": "919484956750",
    "callback_url": "https://example.com/webhooks/indus/click2call",
    "transcript": true,
    "transcript_language": "hi"
  }'`;

const recentCallsCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/calls/recent?limit=10&page=1&transcript_status=ready" \\
  -H "Authorization: Bearer <access_token>"`;

const transcriptCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/calls/call_ab12cd34ef56gh78/transcript" \\
  -H "Authorization: Bearer <access_token>"`;

const endToEndFlow = `BASE_URL="https://developer.induslabs.io"

LOGIN_RESP=$(curl -s -X POST "$BASE_URL/api/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"your_password"}')

ACCESS_TOKEN=$(echo "$LOGIN_RESP" | jq -r '.data.access_token')

CALL_RESP=$(curl -s -X POST "$BASE_URL/api/calls/click2call" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -d '{
    "customer_number":"919999999999",
    "agent_number":"918888888888",
    "did":"919484956750",
    "callback_url":"https://example.com/webhooks/indus/click2call",
    "transcript":true,
    "transcript_language":"hi"
  }')

CALL_ID=$(echo "$CALL_RESP" | jq -r '.data.call_id')

curl -s -X GET "$BASE_URL/api/calls/recent?limit=10&page=1" \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

curl -s -X GET "$BASE_URL/api/calls/$CALL_ID/transcript" \\
  -H "Authorization: Bearer $ACCESS_TOKEN"`;

const loginSuccessJson = `{
  "status_code": 200,
  "message": "Login successful",
  "error": null,
  "data": {
    "access_token": "<jwt_access_token>",
    "refresh_token": "<jwt_refresh_token>",
    "token_type": "bearer"
  }
}`;

const click2callSuccessJson = `{
  "status_code": 200,
  "message": "Click2Call request created",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "status": "queued",
    "did": "919484956750",
    "callback_url": "https://example.com/webhooks/indus/click2call",
    "transcript": true,
    "transcript_language": "hi",
    "warning": null
  }
}`;

const agentClick2callCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/calls/click2call" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
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
  }'`;

const agentClick2callPython = `import requests

url = "https://developer.induslabs.io/api/calls/click2call"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer <access_token>",
}
payload = {
    "customer_number": "919999999999",
    "agent_number": "AGT_E882B100",
    "callback_url": "https://example.com/webhooks/indus/click2call",
    "transcript": True,
    "agent_config": {
        "user_name": "Aarav Sharma",
        "customer_name": "Aarav Sharma",
        "crm_id": "CRM_123",
        "loan_amount": 250000,
        "due_date": "20 September 2026",
    },
}

# The API waits up to ~15 seconds for the customer to answer, so use a longer timeout.
resp = requests.post(url, json=payload, headers=headers, timeout=60)
print(resp.status_code, resp.json())`;

const defineInfieldCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/agents/AGT_E882B100/call_infields" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "field_name": "customer_name",
    "field_type": "TEXT",
    "is_visible": true
  }'`;

const agentPromptTemplateExample = `System prompt:
You are a collections assistant for Acme Finance. You are speaking with {customer_name}.
Their outstanding amount is Rs {loan_amount}, due on {due_date}. CRM reference: {crm_id}.

First message:
Namaste {customer_name} ji, main Acme Finance se baat kar rahi hoon. Kya aapke paas do minute hain?`;

const agentClick2callSuccessJson = `{
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
}`;

const agentClick2callNotConnectedJson = `{
  "status_code": 200,
  "message": "Click2Call request created",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "status": "failed",
    "did": null,
    "callback_url": "https://example.com/webhooks/indus/click2call",
    "transcript": true,
    "transcript_language": null,
    "warning": null
  }
}`;

const agentClick2callErrorJson = `{
  "detail": "Insufficient credits to initiate call.",
  "request_id": "<request_id>"
}`;

const agentConfigKeys = [
  { name: 'user_name', type: 'string', defaultValue: 'customer_number', description: 'Name of the person being called. Also available to the agent as {user_name}.' },
  { name: 'voice_id', type: 'string', defaultValue: 'agent config', description: "TTS voice for this call only. When omitted, the voice from the agent's current config is used." },
  { name: 'language', type: 'string', defaultValue: 'agent config', description: 'Language code for this call only, e.g. hi or en.' },
  { name: 'target_agent_id', type: 'string', defaultValue: 'optional', description: 'Optional target AGT_ id used for agent routing.' },
  { name: 'sip_trunk_id', type: 'string', defaultValue: 'ignored', description: "Ignored. The outbound number and trunk always come from the agent's number assignment." },
  { name: '<any other key>', type: 'string | number | boolean', defaultValue: 'optional', description: 'Custom call infield. Forwarded to the voice agent and substituted into matching {key} placeholders in the system prompt and first message.' },
];

const recentCallsSuccessJson = `{
  "status_code": 200,
  "message": "Recent call logs fetched",
  "error": null,
  "data": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "has_more": false,
    "filters": {
      "status": null,
      "call_type": null,
      "transcript_status": "ready",
      "customer_number": null,
      "agent_number": null,
      "did": null,
      "date_from": null,
      "date_to": null
    },
    "calls": [
      {
        "call_id": "call_ab12cd34ef56gh78",
        "status": "Answered",
        "customer_number": "919999999999",
        "agent_number": "918888888888",
        "did": "919484956750",
        "duration": "52",
        "answer_duration": "48",
        "call_type": "C2C",
        "transcript_enabled": true,
        "transcript_status": "ready",
        "recording": "https://signed-recording-url",
        "recording_url": "https://signed-recording-url",
        "transcript": {
          "summary": "Call summary text",
          "call_outcome": "Interested",
          "history": []
        },
        "created_at": "2026-04-14T06:50:00Z",
        "updated_at": "2026-04-14T06:52:00Z"
      }
    ]
  }
}`;

const transcriptPendingJson = `{
  "status_code": 200,
  "message": "Transcript not available yet",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "pending",
    "customer_number": "xxxxx9999999",
    "agent_number": "xxxxx8888888",
    "duration": null,
    "recording": "pending",
    "transcript": null
  }
}`;

const transcriptReadyJson = `{
  "status_code": 200,
  "message": "Transcript found",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "ready",
    "customer_number": "xxxxx9999999",
    "agent_number": "xxxxx8888888",
    "duration": "52",
    "recording": "https://signed-recording-url",
    "transcript": {
      "transcript_id": "67c7....",
      "summary": "Call summary text",
      "call_outcome": "Interested",
      "history": [],
      "createdAt": "2026-03-05T10:00:00Z",
      "updatedAt": "2026-03-05T10:01:00Z"
    }
  }
}`;

const transcriptFailedJson = `{
  "status_code": 200,
  "message": "Transcript processing failed",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "failed",
    "customer_number": "xxxxx9999999",
    "agent_number": "xxxxx8888888",
    "duration": "52",
    "recording": "https://signed-recording-url",
    "transcript": null,
    "error": "Client error '401 Unauthorized' for url 'https://voice.induslabs.io/v1/audio/transcribe/diarize'"
  }
}`;

const callCompletedCallbackJson = `{
  "status_code": 200,
  "message": "Call completed",
  "error": null,
  "event": "call.completed",
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "processing",
    "customer_number": "xxxxx9999999",
    "agent_number": "xxxxx8888888",
    "duration": "52",
    "recording": "https://signed-recording-url",
    "transcript": null
  }
}`;

const transcriptReadyCallbackJson = `{
  "status_code": 200,
  "message": "Transcript ready",
  "error": null,
  "event": "transcript.ready",
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "ready",
    "customer_number": "xxxxx9999999",
    "agent_number": "xxxxx8888888",
    "duration": "52",
    "recording": "https://signed-recording-url",
    "transcript": {
      "transcript_id": "67c7....",
      "summary": "Call summary text",
      "call_outcome": "Interested",
      "history": [],
      "createdAt": "2026-03-05T10:00:00Z",
      "updatedAt": "2026-03-05T10:01:00Z"
    }
  }
}`;

const transcriptFailedCallbackJson = `{
  "status_code": 500,
  "message": "Transcript processing failed",
  "error": "Client error '401 Unauthorized' for url 'https://voice.induslabs.io/v1/audio/transcribe/diarize'",
  "event": "transcript.failed",
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "failed",
    "customer_number": "xxxxx9999999",
    "agent_number": "xxxxx8888888",
    "duration": "52",
    "recording": "https://signed-recording-url",
    "transcript": null,
    "error": "Client error '401 Unauthorized' for url 'https://voice.induslabs.io/v1/audio/transcribe/diarize'"
  }
}`;

const developerQuickIntegration = {
  title: 'Quick Integration',
  description: 'Reference snippets for login, click2call creation, and transcript polling.',
  defaultApi: 'developer-click2call-post-login',
  apis: [
    {
      id: 'developer-click2call-post-login',
      label: 'POST /api/login',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: loginCurl,
        },
      ],
    },
    {
      id: 'developer-click2call-post-click2call',
      label: 'POST /api/calls/click2call',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: click2callCurl,
        },
      ],
    },
    {
      id: 'developer-click2call-voice-agent-calls',
      label: 'POST /api/calls/click2call (AGT_)',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: agentClick2callCurl,
        },
        {
          id: 'python',
          label: 'Python',
          language: 'python',
          code: agentClick2callPython,
        },
      ],
    },
    {
      id: 'developer-click2call-get-transcript',
      label: 'GET /api/calls/{call_id}/transcript',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: transcriptCurl,
        },
      ],
    },
    {
      id: 'developer-click2call-get-recent',
      label: 'GET /api/calls/recent',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: recentCallsCurl,
        },
      ],
    },
  ],
};

const endpoints = [
  {
    id: 'developer-click2call-post-login',
    method: 'POST',
    path: '/api/login',
    title: 'Developer Login',
    description: 'Authenticate a verified active user and return access + refresh tokens.',
    notes: [
      'Public endpoint for email/password authentication.',
      'Returns bearer access and refresh tokens on success.',
    ],
    inputs: [
      { name: 'email', type: 'string', defaultValue: 'required', description: 'User email address.' },
      { name: 'password', type: 'string', defaultValue: 'required', description: 'User password.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Login successful with access and refresh tokens.' },
      { name: '400 Bad Request', type: 'application/json', description: 'Incorrect credentials, inactive user, or unverified user.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: loginCurl },
      { label: 'Success Response (200)', language: 'json', code: loginSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-post-click2call',
    method: 'POST',
    path: '/api/calls/click2call',
    title: 'Create Click2Call Request',
    description: 'Create a click2call job for the authenticated user. Provider calls are queued and processed asynchronously. Voice-agent (AGT_) calls are dialed immediately and handled by an Indus voice agent.',
    notes: [
      'Requires bearer access token.',
      'For provider Click2Call, did is required. The backend sends the call to the provider in the background.',
      'For voice-agent calls, pass a voice agent ID such as AGT_E882B100 as agent_number and put call infields in agent_config. did is not needed. See Voice-Agent Calls (AGT_) below.',
      'If callback_url is provided, the backend posts call and transcript lifecycle events to that URL as the call progresses.',
      'If callback_url is not provided, use the recent logs and transcript endpoints to poll status.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'customer_number', type: 'string', defaultValue: 'required', description: 'Customer phone number with country code, digits only, e.g. 919999999999.' },
      { name: 'agent_number', type: 'string', defaultValue: 'required', description: 'Human agent phone number (e.g. 918888888888) for provider Click2Call, or a voice agent ID (e.g. AGT_E882B100) to have an Indus voice agent take the call.' },
      { name: 'did', type: 'string', defaultValue: 'required for provider flow', description: 'Caller DID/provider number used to place the Click2Call request. Ignored for AGT_ voice-agent calls.' },
      { name: 'callback_url', type: 'url', defaultValue: 'optional', description: 'Public webhook URL that receives backend POST callbacks for this call.' },
      { name: 'transcript', type: 'boolean', defaultValue: 'false', description: 'Set true to process the call transcript. Provider flow: runs after the provider call-log callback arrives. AGT_ flow: uses the voice agent conversation transcript.' },
      { name: 'transcript_language', type: 'string', defaultValue: 'null', description: 'Optional transcript language. If omitted, the default hi-en transcription flow is used. Ignored for AGT_ voice-agent calls.' },
      { name: 'agent_config', type: 'object', defaultValue: '{}', description: 'AGT_ voice-agent calls only. Flat call infields (e.g. customer_name, crm_id) plus optional user_name, voice_id, and language. Ignored in the provider flow. See Voice-Agent Calls (AGT_).' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Click2Call request created. The provider flow returns status queued; the AGT_ flow returns success or failed.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '402 Payment Required', type: 'application/json', description: 'AGT_ flow: insufficient credits, or no channels purchased for the agent outbound number.' },
      { name: '403 Forbidden', type: 'application/json', description: 'Provider flow: DID is not assigned to you. AGT_ flow: the agent is not owned by you or your team.' },
      { name: '404 Not Found', type: 'application/json', description: 'Provider flow: DID not found. AGT_ flow: agent not found.' },
      { name: '409 Conflict', type: 'application/json', description: 'Provider flow: unable to reserve a DID channel at this time.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'did is missing for provider flow, callback_url is invalid, or request validation failed.' },
      { name: '429 Too Many Requests', type: 'application/json', description: 'AGT_ flow: channel limit reached for the agent outbound number.' },
      { name: '400 Bad Request', type: 'application/json', description: 'Inactive user or validation issues.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: click2callCurl },
      { label: 'Success Response (200)', language: 'json', code: click2callSuccessJson },
      { label: 'cURL: Voice-Agent Call (AGT_)', language: 'bash', code: agentClick2callCurl },
      { label: 'Success Response: Voice-Agent Call (200)', language: 'json', code: agentClick2callSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-get-recent',
    method: 'GET',
    path: '/api/calls/recent',
    title: 'Get Recent Click2Call Logs',
    description: 'Fetch paginated Click2Call records for the authenticated user with filters for call status, transcript status, phone numbers, DID, and date range.',
    notes: [
      'Requires bearer access token.',
      'Use this endpoint to monitor many calls without polling every call_id individually.',
      'When transcript_status is ready, each call can include transcript data. Otherwise transcript is null.',
      'recording and recording_url are signed recording URLs when available. Before provider callback or upload, they can be pending.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'status', type: 'query string', defaultValue: 'optional', description: 'Exact call status filter, e.g. queued, Answered, NoAnswered, or failed.' },
      { name: 'call_type', type: 'query string', defaultValue: 'optional', description: 'Exact call type filter, e.g. C2C, outbound, agent_telephony.' },
      { name: 'transcript_status', type: 'query string', defaultValue: 'optional', description: 'Filter by pending, processing, ready, disabled, or failed.' },
      { name: 'customer_number', type: 'query string', defaultValue: 'optional', description: 'Case-insensitive partial match on customer number.' },
      { name: 'agent_number', type: 'query string', defaultValue: 'optional', description: 'Case-insensitive partial match on agent number or AGT_ id.' },
      { name: 'did', type: 'query string', defaultValue: 'optional', description: 'Case-insensitive partial match on DID.' },
      { name: 'date_from', type: 'ISO datetime', defaultValue: 'optional', description: 'Return records created at or after this date. Z timezone is accepted.' },
      { name: 'date_to', type: 'ISO datetime', defaultValue: 'optional', description: 'Return records created at or before this date. Z timezone is accepted.' },
      { name: 'limit', type: 'integer', defaultValue: '20', description: 'Page size. Must be between 1 and 200.' },
      { name: 'page', type: 'integer', defaultValue: '1', description: 'Page number. Must be 1 or higher.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Paginated recent Click2Call records.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'Invalid pagination or date filter.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: recentCallsCurl },
      { label: 'Success Response (200)', language: 'json', code: recentCallsSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-get-transcript',
    method: 'GET',
    path: '/api/calls/{call_id}/transcript',
    title: 'Get Click2Call Transcript by Call ID',
    description: 'Fetch transcript metadata/content for a previously created click2call request.',
    notes: [
      'Requires bearer access token.',
      'Polling may return transcript: null with transcript_status: pending while processing.',
      'If processing fails, the API still returns 200 with transcript_status: failed and the failure reason in data.error.',
      'Phone numbers are masked in this endpoint response.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'call_id', type: 'path', defaultValue: 'required', description: 'Call ID returned by click2call endpoint.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Transcript pending, ready, disabled, or failed payload.' },
      { name: '403 Forbidden', type: 'application/json', description: 'User is not authorized for this call.' },
      { name: '404 Not Found', type: 'application/json', description: 'call_id not found.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: transcriptCurl },
      { label: 'Success: Transcript Not Ready (200)', language: 'json', code: transcriptPendingJson },
      { label: 'Success: Transcript Ready (200)', language: 'json', code: transcriptReadyJson },
      { label: 'Success: Transcript Failed (200)', language: 'json', code: transcriptFailedJson },
    ],
  },
];

function TableCard({ title, rows, headerLabels = ['Name', 'Type', 'Default', 'Description'] }) {
  if (!rows || rows.length === 0) return null;
  return (
    <div className={styles.tableCard}>
      <h4>{title}</h4>
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>{headerLabels.map(label => <th key={label}>{label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(row => {
              const normalizedDefault = typeof row.defaultValue === 'string' ? row.defaultValue.toLowerCase() : row.defaultValue;
              const isRequired = normalizedDefault === 'required';
              return (
                <tr key={row.name}>
                  <td data-label="Name"><code>{row.name}</code>{isRequired && <span className={styles.requiredBadgeMobile}>*</span>}</td>
                  <td data-label="Type">{row.type}</td>
                  <td data-label="Default">{isRequired ? 'required' : row.defaultValue}</td>
                  <td data-label="Description">{row.description}</td>
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
  if (!rows) return null;
  const headerLabels = ['Status', 'Type', 'Description'];
  return (
    <div className={styles.tableCard}>
      <h4>Outputs</h4>
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>{headerLabels.map(label => <th key={label}>{label}</th>)}</tr>
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

function EndpointSection({ endpoint }) {
  const [copied, setCopied] = React.useState(false);
  const copyValue = `${PROD_BASE_URL}${endpoint.path}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setCopied(false);
    }
  };

  return (
    <section id={endpoint.id} className={styles.endpointSection}>
      <div className={styles.endpointHeader}>
        <MethodBadge method={endpoint.method} />
        <code className={styles.endpointPath}>{endpoint.path}</code>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>{copied ? 'Copied!' : 'Copy API'}</button>
      </div>
      <h3 className={styles.anchorTitle}>{endpoint.title}</h3>
      <p>{endpoint.description}</p>
      {endpoint.notes?.length > 0 && (
        <div className={styles.callout}><strong>Functionality</strong><ul>{endpoint.notes.map(n => <li key={n}>{n}</li>)}</ul></div>
      )}
      <div className={styles.ioGrid}>
        <TableCard title="Inputs" rows={endpoint.inputs} />
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

export default function DeveloperClick2CallPage() {
  return (
    <DocsLayout
      title="Developer Domain APIs"
      description="Login, Click2Call creation, and transcript retrieval APIs"
      sidebarSections={getSidebarSections('developer-click2call')}
      integration={developerQuickIntegration}
    >
      <section id="developer-click2call-introduction" className={styles.pageIntro}>
        <h1>Developer Domain APIs: Login, Click2Call, Recent Logs, Transcript Fetch</h1>
        <p>
          This page documents the Click2Call API flow to authenticate, create async click2call jobs,
          receive callback events, list recent call logs, and fetch transcript status using internal call IDs.
          The same Click2Call endpoint can also place calls handled by an Indus voice agent: pass an{' '}
          <code>AGT_</code> agent ID as <code>agent_number</code> (see <a href="#developer-click2call-voice-agent-calls">Voice-Agent Calls</a>).
        </p>
        <div className={styles.callout}>
          <strong>Base URL</strong>
          <ul>
            <li>Production: <code>{PROD_BASE_URL}</code></li>
          </ul>
          <p>Click2Call API route prefix: <code>/api</code>.</p>
        </div>
        <div className={styles.callout}>
          <strong>Common Response Envelope</strong>
          <CopyableCode language="json">{`{
  "status_code": 200,
  "message": "string or null",
  "error": "string/object or null",
  "data": {}
}`}</CopyableCode>
          <p>Auth/dependency failures may return FastAPI default errors like:</p>
          <CopyableCode language="json">{`{ "detail": "Could not validate credentials" }`}</CopyableCode>
        </div>
      </section>

      {endpoints.map(endpoint => (
        <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}

      <section id="developer-click2call-voice-agent-calls" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>Voice-Agent Calls (AGT_)</h3>
        <p>
          <code>POST /api/calls/click2call</code> can connect the customer to an Indus voice agent instead of a human agent.
          Pass the voice agent ID (for example <code>AGT_E882B100</code>) as <code>agent_number</code>. The platform dials{' '}
          <code>customer_number</code> and the voice agent takes the call. Use <code>agent_config</code> to pass call infields:
          per-call values such as the customer name, an amount, or a CRM ID.
        </p>
        <div className={styles.callout}>
          <strong>How it differs from provider Click2Call</strong>
          <ul>
            <li>Voice-agent mode is used when <code>agent_number</code> starts with <code>AGT_</code> (uppercase). Any other value uses the provider flow.</li>
            <li><code>did</code> is not required and is ignored. The call is placed from the phone number assigned to the agent for outbound calls, or the platform default when none is assigned.</li>
            <li>The agent must belong to your account, or you must be a member of the agent&apos;s team.</li>
            <li>The request waits up to about 15 seconds for the customer to answer. <code>data.status</code> is <code>success</code> if the customer answered, or <code>failed</code> if not. It is never <code>queued</code>.</li>
            <li>Calls use the agent owner&apos;s credits and the purchased channels of the agent&apos;s outbound number. Click2Call DID channel allocation does not apply.</li>
            <li>The stored call has <code>call_type: agent_telephony</code>. Its status changes from <code>success</code> to <code>completed</code> when the call ends. Filter these calls with <code>GET /api/calls/recent?call_type=agent_telephony</code>.</li>
            <li><code>transcript_language</code> is ignored. With <code>transcript: true</code>, the transcript is the voice agent&apos;s own conversation log.</li>
          </ul>
        </div>
        <div className={styles.callout}>
          <strong>Passing call infields in agent_config</strong>
          <ol>
            <li>
              Define each infield on the agent: in the dashboard (Agent tab, Call Infields), or with{' '}
              <code>POST /api/agents/{'{agent_id}'}/call_infields</code> (see{' '}
              <a href="/developer-agent-management#developer-agent-management-call-infields">Call Infields</a>). The{' '}
              <code>field_name</code> you define, e.g. <code>customer_name</code>, is the key you send on each call.
              Defining fields is recommended so every integration uses the same names; substitution itself works for any key you send.
            </li>
            <li>
              Use the field in the agent&apos;s system prompt or first message as a placeholder with single curly braces, e.g.{' '}
              <code>{'{customer_name}'}</code>. Make sure that prompt is in the agent&apos;s current (published) config.
            </li>
            <li>On each click2call request, send the values as flat keys in <code>agent_config</code>. Key names must match the placeholders exactly (case-sensitive).</li>
            <li>When the call connects, the agent replaces each placeholder with the value you sent for that call.</li>
          </ol>
          <ul>
            <li>Do not nest the values under <code>call_infields</code>. Unlike <code>POST /api/livekit</code>, this endpoint does not unwrap a nested object.</li>
            <li>If a placeholder has no matching key, the agent says it as-is (it speaks the text <code>{'{customer_name}'}</code>).</li>
            <li>Values are inserted as text, so format dates and amounts the way the agent should say them.</li>
            <li>Do not put secrets in <code>agent_config</code>.</li>
          </ul>
        </div>
        <TableCard title="agent_config Keys" rows={agentConfigKeys} headerLabels={['Key', 'Type', 'Default', 'Description']} />
        <div className={styles.callout}>
          <strong>Reserved keys</strong>
          <p>
            The platform sets these keys itself. Do not use them as infield names:{' '}
            <code>agent_id</code>, <code>call_id</code>, <code>phone_number</code>, <code>from_number</code>, <code>phone_number_id</code>,{' '}
            <code>sip_call_to</code>, <code>room_id</code>, <code>voice_room_id</code>, <code>metadata</code>, <code>scheduled_time</code>, <code>timezone</code>.
          </p>
        </div>
        <div className={styles.callout}>
          <strong>Voice-agent callbacks</strong>
          <ul>
            <li>If the call does not connect: <code>call.failed</code> with error <code>Voice-agent call could not be connected</code>.</li>
            <li>With <code>transcript: false</code>: <code>call.completed</code>, then <code>transcript.disabled</code>, after the call ends.</li>
            <li>With <code>transcript: true</code>: <code>call.completed</code>, then <code>transcript.ready</code> once the transcript and recording are linked. If they are not available within 30 minutes of the call ending, <code>transcript.failed</code> is sent instead.</li>
            <li>The end of the call is checked about every 10 seconds, so events can arrive up to about 10 seconds after hang-up.</li>
          </ul>
        </div>
        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>Step 1: Define an Infield on the Agent</h4>
            <CopyableCode language="bash">{defineInfieldCurl}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Step 2: Agent Prompt Using Infields</h4>
            <CopyableCode language="text">{agentPromptTemplateExample}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Step 3: Place the Call (cURL)</h4>
            <CopyableCode language="bash">{agentClick2callCurl}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Step 3: Place the Call (Python)</h4>
            <CopyableCode language="python">{agentClick2callPython}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Success: Customer Answered (200)</h4>
            <CopyableCode language="json">{agentClick2callSuccessJson}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Call Not Connected (200)</h4>
            <CopyableCode language="json">{agentClick2callNotConnectedJson}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Error: Insufficient Credits (402)</h4>
            <CopyableCode language="json">{agentClick2callErrorJson}</CopyableCode>
          </div>
        </div>
      </section>

      <section id="developer-click2call-statuses" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>C2C Call Statuses</h3>
        <p>
          The main Click2Call status values currently used in the API are <code>queued</code>, <code>Answered</code>, <code>NoAnswered</code>, and <code>failed</code>.
        </p>
        <div className={styles.tableCard}>
          <h4>Status Reference</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Status"><code>queued</code></td>
                  <td data-label="Meaning">The Click2Call request was accepted and is waiting for final provider processing.</td>
                </tr>
                <tr>
                  <td data-label="Status"><code>answered</code></td>
                  <td data-label="Meaning">The provider reported that the call was answered.</td>
                </tr>
                <tr>
                  <td data-label="Status"><code>noAnswered</code></td>
                  <td data-label="Meaning">The provider reported that the call was not answered.</td>
                </tr>
                <tr>
                  <td data-label="Status"><code>failed</code></td>
                  <td data-label="Meaning">The call failed technically or could not be completed.</td>
                </tr>
                <tr>
                  <td data-label="Status"><code>success</code></td>
                  <td data-label="Meaning">Voice-agent (AGT_) calls only: the customer answered and the voice agent is on the call.</td>
                </tr>
                <tr>
                  <td data-label="Status"><code>completed</code></td>
                  <td data-label="Meaning">Voice-agent (AGT_) calls only: the call has ended.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.callout}>
          <strong>Notes</strong>
          <ul>
            <li><code>Answered</code> and <code>NoAnswered</code> are provider-style status values and should be treated as final call results.</li>
            <li><code>queued</code> is the initial state before a final provider callback is received.</li>
            <li><code>call.completed</code> is a callback event name, not the same thing as a stored call <code>status</code> value.</li>
          </ul>
        </div>
      </section>

      <section id="developer-click2call-callback-flow" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>How Click2Call Callbacks Work</h3>
        <p>
          <code>callback_url</code> is your webhook endpoint. When you pass it in the create request,
          the backend sends POST requests to that URL as the call moves through completion and transcript states.
        </p>
        <div className={styles.callout}>
          <strong>Callback sequence</strong>
          <ol>
            <li>Your server calls <code>POST /api/calls/click2call</code> with <code>callback_url</code>.</li>
            <li>The API returns <code>call_id</code> immediately. Store it.</li>
            <li>The backend sends the outbound call request to the provider.</li>
            <li>The provider later calls the backend with call status and recording details.</li>
            <li>The backend stores the recording and starts transcript processing when <code>transcript</code> is true.</li>
            <li>The backend POSTs lifecycle events to your <code>callback_url</code>.</li>
          </ol>
        </div>
        <div className={styles.callout}>
          <strong>Important behavior</strong>
          <ul>
            <li>Your <code>callback_url</code> must be publicly reachable from the backend. Do not use <code>localhost</code> for production calls.</li>
            <li>The callback is sent in the background. Your create request does not wait for the call, recording, or transcript.</li>
            <li>The callback <code>data</code> object uses the same compact shape as <code>GET /api/calls/{'{call_id}'}/transcript</code>.</li>
            <li>Return a 2xx response from your webhook to mark the event as delivered.</li>
            <li>If no <code>callback_url</code> is supplied, no webhook is sent. Use <code>GET /api/calls/recent</code> or transcript polling.</li>
          </ul>
        </div>
        <div className={styles.tableCard}>
          <h4>Callback Events</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Event"><code>call.completed</code></td>
                  <td data-label="Meaning">The call has reached a completed terminal state and call-log data was stored.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>call.failed</code></td>
                  <td data-label="Meaning">The call failed to connect or the provider reported a failed terminal state.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>transcript.ready</code></td>
                  <td data-label="Meaning">Recording transcript processing completed successfully.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>transcript.failed</code></td>
                  <td data-label="Meaning">Transcript processing failed. The failure reason is sent in top-level <code>error</code> and <code>data.error</code>.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>transcript.disabled</code></td>
                  <td data-label="Meaning"><code>transcript</code> was false, so transcript processing was skipped.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>Callback Payload: Call Completed</h4>
            <CopyableCode language="json">{callCompletedCallbackJson}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Callback Payload: Transcript Ready</h4>
            <CopyableCode language="json">{transcriptReadyCallbackJson}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Callback Payload: Transcript Failed</h4>
            <CopyableCode language="json">{transcriptFailedCallbackJson}</CopyableCode>
          </div>
        </div>
      </section>

      <section id="developer-click2call-usage-flow" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>Recommended Usage Flow</h3>
        <ol>
          <li>Login to get <code>access_token</code>.</li>
          <li>Create a click2call request: with <code>did</code> for provider calls, or with an <code>AGT_</code> <code>agent_number</code> and <code>agent_config</code> infields for voice-agent calls. Add an optional <code>callback_url</code>, and <code>transcript: true</code> when a transcript is needed.</li>
          <li>Store <code>call_id</code> from the create response.</li>
          <li>Use callbacks as the primary async notification path when <code>callback_url</code> is configured.</li>
          <li>Use <code>GET /api/calls/recent</code> to list and filter many calls efficiently.</li>
          <li>Use <code>GET /api/calls/{'{call_id}'}/transcript</code> when you need a single call transcript payload.</li>
        </ol>
      </section>

      <section id="developer-click2call-end-to-end" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>End-to-End Curl Flow (Quick Copy)</h3>
        <CopyableCode language="bash">{endToEndFlow}</CopyableCode>
      </section>

      <section id="developer-click2call-notes" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>Notes</h3>
        <ul>
          <li>Transcript endpoint may return 200 with <code>transcript: null</code> while processing; this is expected.</li>
          <li>Transcript failures return 200 with <code>transcript_status: failed</code> and the detailed reason in <code>data.error</code>.</li>
          <li>Provider phone-number Click2Call requires <code>did</code>.</li>
          <li>Voice-agent (<code>AGT_</code>) calls ignore <code>did</code> and read call infields from flat keys in <code>agent_config</code>.</li>
          <li>The recent logs API is better than per-call polling when you manage multiple concurrent calls.</li>
          <li>Keep tokens secure; do not expose them in frontend logs.</li>
        </ul>
      </section>
    </DocsLayout>
  );
}
