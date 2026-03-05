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
    "agent_number": "918888888888"
  }'`;

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
  -d '{"customer_number":"919999999999","agent_number":"918888888888"}')

CALL_ID=$(echo "$CALL_RESP" | jq -r '.data.call_id')

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
    "status": "queued"
  }
}`;

const transcriptPendingJson = `{
  "status_code": 200,
  "message": "Transcript not available yet",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "pending",
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
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'customer_number', type: 'string', defaultValue: 'required', description: 'Customer phone number, e.g. 919999999999.' },
      { name: 'agent_number', type: 'string', defaultValue: 'required', description: 'Agent phone number, e.g. 918888888888.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Click2Call request created and queued.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '400 Bad Request', type: 'application/json', description: 'Inactive user or validation issues.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: click2callCurl },
      { label: 'Success Response (200)', language: 'json', code: click2callSuccessJson },
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
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'call_id', type: 'path', defaultValue: 'required', description: 'Call ID returned by click2call endpoint.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Transcript pending or transcript ready payload.' },
      { name: '403 Forbidden', type: 'application/json', description: 'User is not authorized for this call.' },
      { name: '404 Not Found', type: 'application/json', description: 'call_id not found.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: transcriptCurl },
      { label: 'Success: Transcript Not Ready (200)', language: 'json', code: transcriptPendingJson },
      { label: 'Success: Transcript Ready (200)', language: 'json', code: transcriptReadyJson },
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
        <h1>Developer Domain APIs: Login, Click2Call, Transcript Fetch</h1>
        <p>
          This page documents the developer-domain flow to authenticate, create async click2call jobs,
          and poll transcript status using internal call IDs.
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

      <section id="developer-click2call-usage-flow" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>Recommended Usage Flow</h3>
        <ol>
          <li>Login to get <code>access_token</code>.</li>
          <li>Create click2call request and store <code>call_id</code>.</li>
          <li>Poll transcript endpoint every 5-10 seconds until <code>transcript_status = ready</code>.</li>
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
          <li>Keep tokens secure; do not expose them in frontend logs.</li>
        </ul>
      </section>
    </DocsLayout>
  );
}
