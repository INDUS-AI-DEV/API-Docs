import React from 'react';
import DocsLayout, { MethodBadge } from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import { getSidebarSections } from '@site/src/sidebarConfig';

import styles from './api.module.css';

const PROD_BASE_URL = 'https://developer.induslabs.io';

const loginCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/developer/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "your_password"
  }'`;

const click2callCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/developer/calls/click2call" \\
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
  "https://developer.induslabs.io/api/developer/calls/recent?limit=10&page=1&transcript_status=ready" \\
  -H "Authorization: Bearer <access_token>"`;

const transcriptCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/developer/calls/call_ab12cd34ef56gh78/transcript" \\
  -H "Authorization: Bearer <access_token>"`;

const endToEndFlow = `BASE_URL="https://developer.induslabs.io"

LOGIN_RESP=$(curl -s -X POST "$BASE_URL/api/developer/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"your_password"}')

ACCESS_TOKEN=$(echo "$LOGIN_RESP" | jq -r '.data.access_token')

CALL_RESP=$(curl -s -X POST "$BASE_URL/api/developer/calls/click2call" \\
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

curl -s -X GET "$BASE_URL/api/developer/calls/recent?limit=10&page=1" \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

curl -s -X GET "$BASE_URL/api/developer/calls/$CALL_ID/transcript" \\
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
    "transcript_language": "hi"
  }
}`;

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
        "status": "completed",
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
      label: 'POST /api/developer/login',
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
      label: 'POST /api/developer/calls/click2call',
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
      id: 'developer-click2call-get-transcript',
      label: 'GET /api/developer/calls/{call_id}/transcript',
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
      label: 'GET /api/developer/calls/recent',
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
    path: '/api/developer/login',
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
    path: '/api/developer/calls/click2call',
    title: 'Create Click2Call Request',
    description: 'Create a click2call job for authenticated user. Call is queued and processed asynchronously.',
    notes: [
      'Requires bearer access token.',
      'For provider Click2Call, did is required. The backend sends the call to the provider in the background.',
      'If callback_url is provided, the backend posts call and transcript lifecycle events to that URL after provider updates arrive.',
      'If callback_url is not provided, use the recent logs and transcript endpoints to poll status.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'customer_number', type: 'string', defaultValue: 'required', description: 'Customer phone number, e.g. 919999999999.' },
      { name: 'agent_number', type: 'string', defaultValue: 'required', description: 'Agent phone number, e.g. 918888888888.' },
      { name: 'did', type: 'string', defaultValue: 'required for provider flow', description: 'Caller DID/provider number used to place the Click2Call request.' },
      { name: 'callback_url', type: 'url', defaultValue: 'optional', description: 'Public webhook URL that receives backend POST callbacks for this call.' },
      { name: 'transcript', type: 'boolean', defaultValue: 'false', description: 'Set true to process recording transcript after the provider call-log callback arrives.' },
      { name: 'transcript_language', type: 'string', defaultValue: 'null', description: 'Optional transcript language. If omitted, the default hi-en transcription flow is used.' },
      { name: 'agent_config', type: 'object', defaultValue: '{}', description: 'Optional config for AGT_ voice-agent calls. Ignored for normal provider phone-number flow.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Click2Call request created and queued.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'did is missing for provider flow, callback_url is invalid, or request validation failed.' },
      { name: '400 Bad Request', type: 'application/json', description: 'Inactive user or validation issues.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: click2callCurl },
      { label: 'Success Response (200)', language: 'json', code: click2callSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-get-recent',
    method: 'GET',
    path: '/api/developer/calls/recent',
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
      { name: 'status', type: 'query string', defaultValue: 'optional', description: 'Exact call status filter, e.g. queued, completed, failed, Answered.' },
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
    path: '/api/developer/calls/{call_id}/transcript',
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
          This page documents the developer-domain flow to authenticate, create async click2call jobs,
          receive callback events, list recent call logs, and fetch transcript status using internal call IDs.
        </p>
        <div className={styles.callout}>
          <strong>Base URL</strong>
          <ul>
            <li>Production: <code>{PROD_BASE_URL}</code></li>
          </ul>
          <p>Developer APIs route prefix: <code>/api/developer</code>.</p>
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

      <section id="developer-click2call-callback-flow" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>How Click2Call Callbacks Work</h3>
        <p>
          <code>callback_url</code> is your webhook endpoint. When you pass it in the create request,
          the backend sends POST requests to that URL as the call moves through completion and transcript states.
        </p>
        <div className={styles.callout}>
          <strong>Callback sequence</strong>
          <ol>
            <li>Your server calls <code>POST /api/developer/calls/click2call</code> with <code>callback_url</code>.</li>
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
            <li>The callback <code>data</code> object uses the same compact shape as <code>GET /api/developer/calls/{'{call_id}'}/transcript</code>.</li>
            <li>Return a 2xx response from your webhook to mark the event as delivered.</li>
            <li>If no <code>callback_url</code> is supplied, no webhook is sent. Use <code>GET /api/developer/calls/recent</code> or transcript polling.</li>
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
          <li>Create click2call request with <code>did</code>, optional <code>callback_url</code>, and <code>transcript: true</code> when transcript is needed.</li>
          <li>Store <code>call_id</code> from the create response.</li>
          <li>Use callbacks as the primary async notification path when <code>callback_url</code> is configured.</li>
          <li>Use <code>GET /api/developer/calls/recent</code> to list and filter many calls efficiently.</li>
          <li>Use <code>GET /api/developer/calls/{'{call_id}'}/transcript</code> when you need a single call transcript payload.</li>
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
          <li>The recent logs API is better than per-call polling when you manage multiple concurrent calls.</li>
          <li>Keep tokens secure; do not expose them in frontend logs.</li>
        </ul>
      </section>
    </DocsLayout>
  );
}
