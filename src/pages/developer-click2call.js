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

# Discover the C2C DIDs assigned to you
curl -s -X GET "$BASE_URL/api/mobile-numbers" \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Confirm there is free concurrency before dialing
curl -s -X GET "$BASE_URL/api/mobile-numbers/channel-allocation/utilization?did=919484956750" \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

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
  -H "Authorization: Bearer $ACCESS_TOKEN"

# If the transcript failed, reprocess the stored recording
curl -s -X POST "$BASE_URL/api/calls/$CALL_ID/transcript/retry" \\
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
        "hangup_cause": "ANSWER",
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
    "hangup_cause": "ANSWER",
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

/* ---------------------------------------------------------------
   Token refresh
   --------------------------------------------------------------- */

const refreshTokenCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/refresh_token?refresh_token=<refresh_token>" \\
  -H "Accept: application/json"`;

const refreshTokenSuccessJson = `{
  "status_code": 200,
  "message": "Token refreshed successfully",
  "error": null,
  "data": {
    "access_token": "<new_jwt_access_token>",
    "refresh_token": "<same_refresh_token>",
    "token_type": "bearer"
  }
}`;

/* ---------------------------------------------------------------
   DID inventory and channel allocation
   --------------------------------------------------------------- */

const mobileNumbersCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/mobile-numbers" \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Accept: application/json"`;

const mobileNumbersSuccessJson = `{
  "status_code": 200,
  "message": "Mobile numbers fetched successfully",
  "error": null,
  "data": {
    "user_id": "USR_2079589C",
    "number_type": "c2c",
    "count": 2,
    "pool_total_channels": 50,
    "pool_active_channels": 7,
    "numbers": [
      {
        "phone_number_id": "PN_1234567890",
        "mobile_number": "919484956750",
        "did_status": "active",
        "max_channels": 20,
        "allocated_channels": 5,
        "active_channels": 3
      },
      {
        "phone_number_id": "PN_1234567891",
        "mobile_number": "919484956751",
        "did_status": "expired",
        "max_channels": 20,
        "allocated_channels": 0,
        "active_channels": 0
      }
    ]
  }
}`;

const channelAllocationGetCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/mobile-numbers/channel-allocation" \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Accept: application/json"`;

const channelAllocationSuccessJson = `{
  "status_code": 200,
  "message": "Channel allocation fetched successfully",
  "error": null,
  "data": {
    "user_id": "USR_2079589C",
    "pool_total_channels": 50,
    "pool_active_channels": 7,
    "pool_available_channels": 43,
    "count": 2,
    "numbers": [
      {
        "phone_number_id": "PN_1234567890",
        "mobile_number": "919484956750",
        "did_status": "active",
        "max_channels": 20,
        "allocated_channels": 5,
        "active_channels": 3,
        "available_channels": 2
      },
      {
        "phone_number_id": "PN_1234567891",
        "mobile_number": "919484956751",
        "did_status": "active",
        "max_channels": 20,
        "allocated_channels": 10,
        "active_channels": 4,
        "available_channels": 6
      }
    ]
  }
}`;

const channelAllocationPutCurl = `curl -X PUT \\
  "https://developer.induslabs.io/api/mobile-numbers/channel-allocation" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "allocations": [
      { "did": "919484956750", "allocated_channels": 5 },
      { "did": "919484956751", "allocated_channels": 10 },
      { "phone_number_id": "PN_1234567892", "allocated_channels": 0 }
    ]
  }'`;

const channelAllocationPatchCurl = `curl -X PATCH \\
  "https://developer.induslabs.io/api/mobile-numbers/channel-allocation" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "allocations": [
      { "did": "919484956750", "allocated_channels": 8 }
    ]
  }'`;

const channelAllocationErrorJson = `{
  "status_code": 422,
  "message": null,
  "error": "Total allocated channels (60) exceed the shared pool (50).",
  "data": null
}`;

const channelUtilizationCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/mobile-numbers/channel-allocation/utilization" \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Accept: application/json"

# Single DID
curl -X GET \\
  "https://developer.induslabs.io/api/mobile-numbers/channel-allocation/utilization?did=919484956750" \\
  -H "Authorization: Bearer <access_token>" \\
  -H "Accept: application/json"`;

const channelUtilizationSuccessJson = `{
  "status_code": 200,
  "message": "Channel utilization fetched successfully",
  "error": null,
  "data": {
    "user_id": "USR_2079589C",
    "pool_total_channels": 50,
    "pool_active_channels": 7,
    "pool_available_channels": 43,
    "numbers": [
      {
        "phone_number_id": "PN_1234567890",
        "did": null,
        "allocated_channels": 5,
        "active_channels": 3,
        "available_channels": 2
      }
    ]
  }
}`;

/* ---------------------------------------------------------------
   Transcript retry
   --------------------------------------------------------------- */

const transcriptRetryCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/calls/call_ab12cd34ef56gh78/transcript/retry" \\
  -H "Authorization: Bearer <access_token>"`;

const transcriptRetrySuccessJson = `{
  "status_code": 200,
  "message": "Transcript retry queued",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "transcript_status": "pending",
    "status": "Answered",
    "recording": "https://signed-recording-url"
  }
}`;

/* ---------------------------------------------------------------
   Inbound DID callback configuration
   --------------------------------------------------------------- */

const inboundCallbackPostCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/calls/inbound-callback-url" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "phone_number": "919484956750",
    "callback_url": "https://example.com/webhooks/indus/inbound",
    "transcript": true
  }'`;

const inboundCallbackPostSuccessJson = `{
  "status_code": 200,
  "message": "Inbound callback configuration updated",
  "error": null,
  "data": {
    "phone_number_id": "PN_1234567890",
    "phone_number": "919484956750",
    "assigned_user_id": "USR_2079589C",
    "callback_url": "https://example.com/webhooks/indus/inbound",
    "transcript": true
  }
}`;

const inboundCallbackClearCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/calls/inbound-callback-url" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "phone_number_id": "PN_1234567890",
    "callback_url": null,
    "transcript": false
  }'`;

const inboundCallbackGetCurl = `curl -X GET \\
  "https://developer.induslabs.io/api/calls/inbound-callback-url?configured_only=true" \\
  -H "Authorization: Bearer <access_token>"`;

const inboundCallbackGetSuccessJson = `{
  "status_code": 200,
  "message": "Inbound callback configurations fetched",
  "error": null,
  "data": {
    "user_id": "USR_2079589C",
    "configured_only": true,
    "count": 1,
    "callbacks": [
      {
        "phone_number_id": "PN_1234567890",
        "phone_number": "919484956750",
        "assigned_user_id": "USR_2079589C",
        "assigned_org_id": null,
        "assigned_agent_id": null,
        "assigned_workflow_id": null,
        "callback_url": "https://example.com/webhooks/indus/inbound",
        "transcript": true,
        "status": "active",
        "provider_name": "greeter",
        "metadata_type": "c2c"
      }
    ]
  }
}`;

/* ---------------------------------------------------------------
   Provider call-log ingest
   --------------------------------------------------------------- */

const callLogIngestCurl = `curl -X POST \\
  "https://developer.induslabs.io/api/calls/call-log" \\
  -H "Content-Type: application/json" \\
  -H "X-Greeter-Username: <provider_username>" \\
  -H "X-Greeter-Password: <provider_password>" \\
  -d '{
    "recording": "https://example.com/recording.wav",
    "customer_number": "919876543210",
    "agent_number": "918888888888",
    "did": "919484956750",
    "call_date": "2026-04-06 18:20:00",
    "duration": "120",
    "answer_duration": "110",
    "status": "Answered",
    "call_type": "outbound",
    "customer_crm_id": "call_ab12cd34ef56gh78",
    "hangup_cause": "ANSWER"
  }'`;

const callLogIngestSuccessJson = `{
  "status_code": 200,
  "message": "Call log stored",
  "error": null,
  "data": {
    "call_id": "call_ab12cd34ef56gh78",
    "status": "Answered",
    "recording": "https://example.com/recording.wav"
  }
}`;

const callLogIngestUnauthorizedJson = `{
  "status_code": 401,
  "message": null,
  "error": "Missing auth. Use X-Greeter-Username/X-Greeter-Password, Authorization Basic/Bearer, or X-API-Key",
  "data": null
}`;

const developerQuickIntegration = {
  title: 'Quick Integration',
  description: 'Reference snippets for login, DID capacity, click2call creation, inbound webhooks, and transcript polling.',
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
    {
      id: 'developer-click2call-get-mobile-numbers',
      label: 'GET /api/mobile-numbers',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: mobileNumbersCurl,
        },
      ],
    },
    {
      id: 'developer-click2call-put-channel-allocation',
      label: 'PUT /api/mobile-numbers/channel-allocation',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: channelAllocationPutCurl,
        },
      ],
    },
    {
      id: 'developer-click2call-get-channel-utilization',
      label: 'GET /api/mobile-numbers/channel-allocation/utilization',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: channelUtilizationCurl,
        },
      ],
    },
    {
      id: 'developer-click2call-post-inbound-callback-url',
      label: 'POST /api/calls/inbound-callback-url',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: inboundCallbackPostCurl,
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
  {
    id: 'developer-click2call-post-refresh-token',
    method: 'POST',
    path: '/api/refresh_token',
    title: 'Refresh Access Token',
    description: 'Exchange a valid refresh token for a new access token without asking the user to log in again.',
    notes: [
      'refresh_token is sent as a query parameter, not in the request body.',
      'The refresh token itself is not rotated. The same refresh token is returned and stays valid until it expires.',
      'The refresh token must carry the session it was issued with. Tokens issued outside a login session are rejected.',
    ],
    inputs: [
      { name: 'refresh_token', type: 'query string', defaultValue: 'required', description: 'Refresh token returned by POST /api/login.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'New access token issued.' },
      { name: '400 Bad Request', type: 'application/json', description: 'Refresh token could not be decoded or carries no session.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Refresh token is expired, revoked, or invalid.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'refresh_token query parameter is missing.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: refreshTokenCurl },
      { label: 'Success Response (200)', language: 'json', code: refreshTokenSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-get-mobile-numbers',
    method: 'GET',
    path: '/api/mobile-numbers',
    title: 'List Assigned C2C DIDs',
    description: 'List the C2C DIDs assigned to the authenticated user, with a lightweight channel snapshot for each number.',
    notes: [
      'Requires bearer access token.',
      'Only numbers assigned to you whose metadata type is c2c are returned. Voice-agent numbers are not listed here.',
      'Use this endpoint to discover the did values you can pass to POST /api/calls/click2call.',
      'active_channels is counted from live call records, so it reflects real concurrency rather than a stored counter.',
      'Stale channel reservations are swept before the response is built, so the counts are current at read time.',
      'Up to 500 numbers are returned. There is no pagination on this endpoint.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Assigned C2C numbers with pool totals and per-DID channel counts.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: mobileNumbersCurl },
      { label: 'Success Response (200)', language: 'json', code: mobileNumbersSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-get-channel-allocation',
    method: 'GET',
    path: '/api/mobile-numbers/channel-allocation',
    title: 'Get DID Channel Allocation',
    description: 'Fetch the shared channel pool summary and the full per-DID allocation and utilization state.',
    notes: [
      'Requires bearer access token.',
      'pool_total_channels is your total concurrent capacity. It comes from your C2C batch totals, falling back to the sum of purchased channels across assigned C2C numbers.',
      'available_channels is allocated_channels minus active_channels for that DID, floored at zero.',
      'pool_active_channels is always your account-wide live channel count.',
      'If you have never saved an explicit allocation map, the backend seeds one from purchased channel values. Save an explicit map with PUT to normalize the configuration.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Pool summary plus per-DID allocated, active, and available channel counts.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: channelAllocationGetCurl },
      { label: 'Success Response (200)', language: 'json', code: channelAllocationSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-put-channel-allocation',
    method: 'PUT',
    path: '/api/mobile-numbers/channel-allocation',
    title: 'Replace DID Channel Allocation',
    description: 'Replace the entire DID channel allocation map for the authenticated user. Any assigned DID left out of the request is treated as zero allocation.',
    notes: [
      'Requires bearer access token.',
      'This is a full replacement. Omitted DIDs drop to zero allocated channels, so always send your complete map. Use PATCH to change only some DIDs.',
      'Identify each DID by either did or phone_number_id. Sending both on one item is rejected; sending neither is rejected.',
      'No DID may appear twice in one request.',
      'Each allocated_channels must be between 0 and that DID max_channels, and may not drop below the DID current active_channels.',
      'The sum of all allocated_channels must not exceed pool_total_channels.',
      'The response body is the same shape as GET /api/mobile-numbers/channel-allocation.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'allocations', type: 'array', defaultValue: 'required', description: 'Complete list of allocation items. Must contain at least one item.' },
      { name: 'allocations[].did', type: 'string', defaultValue: 'either this or phone_number_id', description: 'Assigned C2C DID number, e.g. 919484956750.' },
      { name: 'allocations[].phone_number_id', type: 'string', defaultValue: 'either this or did', description: 'Assigned C2C DID phone_number_id, e.g. PN_1234567890.' },
      { name: 'allocations[].allocated_channels', type: 'integer', defaultValue: 'required', description: 'Maximum concurrent channels for this DID. Must be 0 or greater.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Allocation replaced. Returns the updated full allocation state.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '404 Not Found', type: 'application/json', description: 'A DID in the request is not assigned to the current user.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'Empty allocations, duplicate DID target, allocation above max_channels, allocation below live active channels, or total above the shared pool.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: channelAllocationPutCurl },
      { label: 'Success Response (200)', language: 'json', code: channelAllocationSuccessJson },
      { label: 'Validation Error (422)', language: 'json', code: channelAllocationErrorJson },
    ],
  },
  {
    id: 'developer-click2call-patch-channel-allocation',
    method: 'PATCH',
    path: '/api/mobile-numbers/channel-allocation',
    title: 'Update Some DID Channel Allocations',
    description: 'Update only the DIDs listed in the request. Every DID not named keeps its current allocation.',
    notes: [
      'Requires bearer access token.',
      'Use this instead of PUT when you only need to retune a few DIDs and do not want to resend the whole map.',
      'The same identification, max_channels, active-channel, and shared-pool rules as the PUT endpoint apply.',
      'The response body is the same shape as GET /api/mobile-numbers/channel-allocation.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'allocations', type: 'array', defaultValue: 'required', description: 'Partial list of allocation items. Must contain at least one item. Unlisted DIDs are left unchanged.' },
      { name: 'allocations[].did', type: 'string', defaultValue: 'either this or phone_number_id', description: 'Assigned C2C DID number, e.g. 919484956750.' },
      { name: 'allocations[].phone_number_id', type: 'string', defaultValue: 'either this or did', description: 'Assigned C2C DID phone_number_id, e.g. PN_1234567890.' },
      { name: 'allocations[].allocated_channels', type: 'integer', defaultValue: 'required', description: 'New maximum concurrent channels for this DID. Must be 0 or greater.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Allocation updated. Returns the updated full allocation state.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '404 Not Found', type: 'application/json', description: 'A DID in the request is not assigned to the current user.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'Empty allocations, duplicate DID target, allocation above max_channels, allocation below live active channels, or total above the shared pool.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: channelAllocationPatchCurl },
      { label: 'Success Response (200)', language: 'json', code: channelAllocationSuccessJson },
      { label: 'Validation Error (422)', language: 'json', code: channelAllocationErrorJson },
    ],
  },
  {
    id: 'developer-click2call-get-channel-utilization',
    method: 'GET',
    path: '/api/mobile-numbers/channel-allocation/utilization',
    title: 'Get Live Channel Utilization',
    description: 'Lightweight live utilization counters for dashboards and pre-call capacity checks. Returns the same numbers as the allocation endpoint without the DID metadata.',
    notes: [
      'Requires bearer access token.',
      'Poll this before a burst of calls to confirm you have free channels, rather than relying on the warning in the click2call response.',
      'Pass did to narrow the numbers array to one DID. The pool counters stay account-wide either way.',
      'The did field in each numbers item is currently always null. Use phone_number_id to identify the DID, or read the number from GET /api/mobile-numbers/channel-allocation.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'did', type: 'query string', defaultValue: 'optional', description: 'Restrict the numbers array to a single assigned C2C DID, e.g. 919484956750.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Pool and per-DID utilization counters.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '404 Not Found', type: 'application/json', description: 'The did filter does not match any DID assigned to you.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: channelUtilizationCurl },
      { label: 'Success Response (200)', language: 'json', code: channelUtilizationSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-post-transcript-retry',
    method: 'POST',
    path: '/api/calls/{call_id}/transcript/retry',
    title: 'Retry Click2Call Transcript',
    description: 'Re-run transcript processing for a provider Click2Call whose transcript failed or stalled. The stored recording is reprocessed; the call is not dialed again.',
    notes: [
      'Requires bearer access token.',
      'Only provider Click2Call transcripts can be retried. Voice-agent (AGT_) calls are rejected with 409.',
      'The call must have been created with transcript: true, and a stored recording must be available.',
      'Retrying resets transcript_status to pending and clears any previously sent transcript.ready, transcript.failed, and transcript.disabled callback events, so those events can be delivered again.',
      'Processing runs in the background. Poll GET /api/calls/{call_id}/transcript or wait for the callback.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'call_id', type: 'path', defaultValue: 'required', description: 'Call ID returned by the click2call endpoint.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Retry queued. transcript_status is set back to pending.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '403 Forbidden', type: 'application/json', description: 'The call belongs to another user.' },
      { name: '404 Not Found', type: 'application/json', description: 'call_id not found.' },
      { name: '409 Conflict', type: 'application/json', description: 'Transcript is disabled for the call, already ready, already processing, a voice-agent call, or no stored recording is available.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: transcriptRetryCurl },
      { label: 'Success Response (200)', language: 'json', code: transcriptRetrySuccessJson },
    ],
  },
  {
    id: 'developer-click2call-post-inbound-callback-url',
    method: 'POST',
    path: '/api/calls/inbound-callback-url',
    title: 'Configure Inbound DID Callback',
    description: 'Set the webhook URL and transcript behavior for calls that arrive on one of your C2C DIDs. Outbound Click2Call uses the per-call callback_url; inbound calls use this per-DID setting.',
    notes: [
      'Requires bearer access token.',
      'Identify the DID with either phone_number_id or phone_number. Sending both is rejected; sending neither is rejected.',
      'Send callback_url: null to clear the webhook for that DID.',
      'transcript is a per-DID setting: it decides whether inbound recordings on that number are transcribed. It is sent on every request and defaults to false when omitted.',
      'When an inbound callback URL is configured, the terminal call event is held until the recording is stored in S3, so the callback carries a usable recording link.',
      'The DID must already be assigned to a user before a callback URL can be set.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'phone_number_id', type: 'string', defaultValue: 'either this or phone_number', description: 'DID phone_number_id to configure, e.g. PN_1234567890.' },
      { name: 'phone_number', type: 'string', defaultValue: 'either this or phone_number_id', description: 'DID number to configure, e.g. 919484956750.' },
      { name: 'callback_url', type: 'url', defaultValue: 'null', description: 'Public webhook URL for inbound call lifecycle events. Send null to clear it.' },
      { name: 'transcript', type: 'boolean', defaultValue: 'false', description: 'Set true to transcribe inbound recordings on this DID.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Inbound callback configuration updated.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
      { name: '403 Forbidden', type: 'application/json', description: 'The DID is assigned to another user.' },
      { name: '404 Not Found', type: 'application/json', description: 'Phone number not found.' },
      { name: '409 Conflict', type: 'application/json', description: 'The phone number is not assigned to any user yet.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'Neither or both of phone_number_id and phone_number were sent, or callback_url is not a valid URL.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: inboundCallbackPostCurl },
      { label: 'Success Response (200)', language: 'json', code: inboundCallbackPostSuccessJson },
      { label: 'cURL: Clear the callback URL', language: 'bash', code: inboundCallbackClearCurl },
    ],
  },
  {
    id: 'developer-click2call-get-inbound-callback-url',
    method: 'GET',
    path: '/api/calls/inbound-callback-url',
    title: 'List Inbound DID Callback Settings',
    description: 'List the inbound webhook and transcript settings for every C2C DID assigned to you.',
    notes: [
      'Requires bearer access token.',
      'Use configured_only=true to see just the DIDs that already have a webhook, which is the quickest way to audit inbound coverage.',
      'callback_url is null for DIDs with no webhook configured.',
      'Up to 500 numbers are returned. There is no pagination on this endpoint.',
    ],
    inputs: [
      { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>' },
      { name: 'configured_only', type: 'query boolean', defaultValue: 'false', description: 'Set true to return only DIDs that have an inbound callback URL configured.' },
      { name: 'user_id', type: 'query string', defaultValue: 'optional', description: 'Superusers only. Inspect another user DID callback configuration. Ignored for regular users.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Inbound callback configuration for each assigned C2C DID.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'Missing or invalid token.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: inboundCallbackGetCurl },
      { label: 'Success Response (200)', language: 'json', code: inboundCallbackGetSuccessJson },
    ],
  },
  {
    id: 'developer-click2call-post-call-log',
    method: 'POST',
    path: '/api/calls/call-log',
    title: 'Ingest Provider Call Log',
    description: 'Receives the final call result from the telephony provider and closes out the Click2Call record: it stores status, durations, hangup cause, and recording, then starts recording storage and transcript processing.',
    notes: [
      'Most integrations never call this endpoint. It is the provider-facing ingest hook; consume the outcome through your callback_url or the recent-logs API instead.',
      'It is documented here because it is the step that turns a queued call into a terminal status, and because partners running their own telephony can post results into it.',
      'Unlike the other endpoints on this page, this route is served at the platform API root and is not behind the developer route prefix.',
      'Accepts application/json, application/x-www-form-urlencoded, and multipart/form-data.',
      'Field names are case and spacing tolerant. "Customer Number", "customer_number", "Agent Number", "agen_number", "DID", "Virtual Number", and "Hangup Cause" are all accepted.',
      'customer_crm_id carries the Indus call_id and is how the provider result is matched back to the original Click2Call request.',
      'Ingest is idempotent. A repeated post for a call already processed updates the stored record but does not re-run the recording pipeline or resend a delivered callback event.',
      'A terminal status releases the DID channel reservation held by that call.',
    ],
    inputs: [
      { name: 'X-Greeter-Username / X-Greeter-Password', type: 'header', defaultValue: 'one auth mode required', description: 'Provider credential headers.' },
      { name: 'Authorization', type: 'header', defaultValue: 'one auth mode required', description: 'Basic <provider_credentials> for the provider, or Bearer <access_token> for a user posting their own call result.' },
      { name: 'X-API-Key', type: 'header', defaultValue: 'one auth mode required', description: 'Developer API key.' },
      { name: 'auth_user / auth_pass', type: 'query string', defaultValue: 'one auth mode required', description: 'Provider credentials as query parameters, for providers that cannot set headers.' },
      { name: 'customer_number', type: 'string', defaultValue: 'required', description: 'Customer number on the call.' },
      { name: 'status', type: 'string', defaultValue: 'required', description: 'Provider call status, e.g. Answered, NoAnswered, failed.' },
      { name: 'recording', type: 'string', defaultValue: '""', description: 'Provider recording URL or identifier.' },
      { name: 'agent_number', type: 'string', defaultValue: 'null', description: 'Agent number on the call.' },
      { name: 'did', type: 'string', defaultValue: 'null', description: 'Caller DID used for the call.' },
      { name: 'call_date', type: 'string', defaultValue: 'null', description: 'Provider call date/time string, e.g. 2026-04-06 18:20:00.' },
      { name: 'duration', type: 'string', defaultValue: 'null', description: 'Total call duration in seconds.' },
      { name: 'answer_duration', type: 'string', defaultValue: 'null', description: 'Connected talk time in seconds.' },
      { name: 'call_type', type: 'string', defaultValue: 'null', description: 'Call direction/type, e.g. outbound or inbound.' },
      { name: 'customer_crm_id', type: 'string', defaultValue: 'null', description: 'The Indus call_id this result belongs to.' },
      { name: 'hangup_cause', type: 'string', defaultValue: 'null', description: 'Provider hangup cause, e.g. ANSWER, BUSY, CANCEL, NOANSWER.' },
    ],
    outputs: [
      { name: '200 OK', type: 'application/json', description: 'Call log stored. Returns the resolved call_id, stored status, and recording.' },
      { name: '401 Unauthorized', type: 'application/json', description: 'No auth mode supplied, or the supplied credentials are invalid.' },
      { name: '403 Forbidden', type: 'application/json', description: 'Bearer auth was used for a call belonging to another user.' },
      { name: '422 Unprocessable Entity', type: 'application/json', description: 'customer_number or status is missing, or the payload failed validation.' },
      { name: '400 Bad Request', type: 'application/json', description: 'The body could not be parsed in any supported content type.' },
    ],
    examples: [
      { label: 'cURL', language: 'bash', code: callLogIngestCurl },
      { label: 'Success Response (200)', language: 'json', code: callLogIngestSuccessJson },
      { label: 'Missing Auth (401)', language: 'json', code: callLogIngestUnauthorizedJson },
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
      description="Authentication, DID capacity, Click2Call creation, callbacks, and transcript APIs"
      sidebarSections={getSidebarSections('developer-click2call')}
      integration={developerQuickIntegration}
    >
      <section id="developer-click2call-introduction" className={styles.pageIntro}>
        <h1>Click to Call (C2C) Service APIs</h1>
        <p>
          This page documents the complete Click2Call surface: authenticate and refresh tokens, inspect your
          assigned C2C DIDs, distribute concurrent channels across them, create async click2call jobs, receive
          callback events, configure inbound webhooks, list recent call logs, and fetch or retry transcripts.
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
        <div className={styles.tableCard}>
          <h4>API Inventory</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Endpoint"><code>POST /api/login</code></td>
                  <td data-label="Purpose">Authenticate and obtain access and refresh tokens.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>POST /api/refresh_token</code></td>
                  <td data-label="Purpose">Issue a new access token from a refresh token.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>POST /api/calls/click2call</code></td>
                  <td data-label="Purpose">Create a Click2Call request, provider or voice agent.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>GET /api/calls/recent</code></td>
                  <td data-label="Purpose">List and filter recent Click2Call records.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>GET /api/calls/{'{call_id}'}/transcript</code></td>
                  <td data-label="Purpose">Fetch one call result, recording, and transcript.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>POST /api/calls/{'{call_id}'}/transcript/retry</code></td>
                  <td data-label="Purpose">Reprocess a failed or stalled transcript.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>GET /api/mobile-numbers</code></td>
                  <td data-label="Purpose">List assigned C2C DIDs with a channel snapshot.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>GET /api/mobile-numbers/channel-allocation</code></td>
                  <td data-label="Purpose">Read the shared pool and per-DID allocation state.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>PUT /api/mobile-numbers/channel-allocation</code></td>
                  <td data-label="Purpose">Replace the full DID allocation map.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>PATCH /api/mobile-numbers/channel-allocation</code></td>
                  <td data-label="Purpose">Update selected DID allocations only.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>GET /api/mobile-numbers/channel-allocation/utilization</code></td>
                  <td data-label="Purpose">Live utilization counters for pre-call checks.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>POST /api/calls/inbound-callback-url</code></td>
                  <td data-label="Purpose">Set the inbound webhook and transcript flag for a DID.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>GET /api/calls/inbound-callback-url</code></td>
                  <td data-label="Purpose">List inbound webhook settings across your DIDs.</td>
                </tr>
                <tr>
                  <td data-label="Endpoint"><code>POST /api/calls/call-log</code></td>
                  <td data-label="Purpose">Provider-facing ingest for final call results.</td>
                </tr>
              </tbody>
            </table>
          </div>
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

      <section id="developer-click2call-capacity-model" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>DID Channel Capacity Model</h3>
        <p>
          Provider Click2Call concurrency is governed by a shared channel pool that you distribute across your
          assigned C2C DIDs. Each accepted call reserves one channel on its DID and releases it when the call
          reaches a terminal status. Voice-agent (<code>AGT_</code>) calls are outside this model: they consume
          the purchased channels of the agent outbound number instead.
        </p>
        <div className={styles.tableCard}>
          <h4>Terms</h4>
          <div className={styles.tableScroll}>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Field"><code>pool_total_channels</code></td>
                  <td data-label="Meaning">Total concurrent capacity for your account. Derived from your C2C batch totals, falling back to the sum of purchased channels across assigned C2C numbers.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>pool_active_channels</code></td>
                  <td data-label="Meaning">Channels currently reserved by live Click2Call requests, counted account-wide from live call records.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>pool_available_channels</code></td>
                  <td data-label="Meaning"><code>pool_total_channels</code> minus <code>pool_active_channels</code>.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>max_channels</code></td>
                  <td data-label="Meaning">Hard ceiling for one DID, set when the number was provisioned. An allocation may never exceed it.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>allocated_channels</code></td>
                  <td data-label="Meaning">Concurrent channels you have assigned to one DID. The sum across DIDs may not exceed <code>pool_total_channels</code>.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>active_channels</code></td>
                  <td data-label="Meaning">Live reservations currently held on that DID.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>available_channels</code></td>
                  <td data-label="Meaning"><code>allocated_channels</code> minus <code>active_channels</code>, floored at zero.</td>
                </tr>
                <tr>
                  <td data-label="Field"><code>did_status</code></td>
                  <td data-label="Meaning"><code>active</code> or <code>expired</code>. A retired DID keeps its record and history rather than being deleted.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.callout}>
          <strong>Over-limit behavior</strong>
          <ul>
            <li>Exceeding a DID allocation or the shared pool does not reject the call. The request is accepted and <code>data.warning</code> explains which limit was crossed.</li>
            <li>Possible warnings: <code>Allocated channel limit exceeded for this DID; call accepted</code>, <code>No channels allocated for this DID; call accepted</code>, and <code>Client channel pool exhausted; call accepted</code>. Multiple warnings are joined with <code>|</code>.</li>
            <li>Treat a non-null <code>warning</code> as a signal to slow down or rebalance allocations, not as a failure.</li>
            <li>Check <code>GET /api/mobile-numbers/channel-allocation/utilization</code> before a burst if you need to stay strictly inside your limits.</li>
            <li>A channel reserved by a call the provider never reports on is freed automatically after 5 minutes, and the call moves to <code>temporaryfailed</code>.</li>
          </ul>
        </div>
      </section>

      <section id="developer-click2call-statuses" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>C2C Call Statuses</h3>
        <p>
          The main Click2Call status values currently used in the API are <code>queued</code>, <code>Answered</code>, <code>NoAnswered</code>, <code>failed</code>, and <code>temporaryfailed</code>.
          Compare status values case-insensitively: the provider sends mixed casing such as <code>Answered</code> and <code>NoAnswered</code>.
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
                  <td data-label="Status"><code>temporaryfailed</code></td>
                  <td data-label="Meaning">The provider never reported on the call within 5 minutes, so it was timed out. A late provider callback can still replace this with the real outcome.</td>
                </tr>
                <tr>
                  <td data-label="Status"><code>afthrs</code></td>
                  <td data-label="Meaning">The provider rejected the call as outside permitted calling hours. Treated as a not-answered terminal result.</td>
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
            <li>A call that reaches any terminal status releases the DID channel it reserved. Terminal statuses are <code>Answered</code>, <code>NoAnswered</code>, <code>afthrs</code>, <code>failed</code>, <code>temporaryfailed</code>, and <code>completed</code>.</li>
            <li><code>temporaryfailed</code> is provisional. If the provider reports late, the record is reprocessed and the corrected outcome is delivered to your <code>callback_url</code>.</li>
            <li>Answered calls also carry <code>hangup_cause</code> from the provider, for example <code>ANSWER</code>, <code>BUSY</code>, <code>CANCEL</code>, or <code>NOANSWER</code>.</li>
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
            <li>Each event is delivered once per call. Retrying a transcript with <code>POST /api/calls/{'{call_id}'}/transcript/retry</code> re-arms the transcript events so they can be delivered again.</li>
            <li>Inbound calls use the per-DID webhook set with <code>POST /api/calls/inbound-callback-url</code> instead of a per-call <code>callback_url</code>.</li>
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
                  <td data-label="Event"><code>call.answered</code></td>
                  <td data-label="Meaning">The provider reported status <code>Answered</code>. The call connected.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>call.not_answered</code></td>
                  <td data-label="Meaning">The provider reported <code>NoAnswered</code> or <code>afthrs</code>. The customer did not take the call.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>call.temporaryfailed</code></td>
                  <td data-label="Meaning">The call was timed out after 5 minutes without a provider report. A later report can still supersede this with the real outcome.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>call.completed</code></td>
                  <td data-label="Meaning">The call reached a terminal state that maps to none of the specific events above, and call-log data was stored.</td>
                </tr>
                <tr>
                  <td data-label="Event"><code>call.failed</code></td>
                  <td data-label="Meaning">The call failed to connect, the provider rejected the request, or the provider reported a failed terminal state.</td>
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
          <li>Login to get <code>access_token</code>, and refresh it with <code>POST /api/refresh_token</code> rather than logging in again on every run.</li>
          <li>Call <code>GET /api/mobile-numbers</code> once to discover the C2C DIDs assigned to you and their channel ceilings.</li>
          <li>Set your concurrency plan with <code>PUT /api/mobile-numbers/channel-allocation</code>, then retune individual DIDs later with <code>PATCH</code>.</li>
          <li>Create a click2call request: with <code>did</code> for provider calls, or with an <code>AGT_</code> <code>agent_number</code> and <code>agent_config</code> infields for voice-agent calls. Add an optional <code>callback_url</code>, and <code>transcript: true</code> when a transcript is needed.</li>
          <li>Store <code>call_id</code> from the create response, and check <code>data.warning</code> for capacity pressure.</li>
          <li>Use callbacks as the primary async notification path when <code>callback_url</code> is configured.</li>
          <li>Use <code>GET /api/calls/recent</code> to list and filter many calls efficiently.</li>
          <li>Use <code>GET /api/calls/{'{call_id}'}/transcript</code> when you need a single call transcript payload, and <code>POST /api/calls/{'{call_id}'}/transcript/retry</code> if one failed.</li>
          <li>For inbound traffic, register a webhook per DID with <code>POST /api/calls/inbound-callback-url</code>.</li>
          <li>While running a campaign, poll <code>GET /api/mobile-numbers/channel-allocation/utilization</code> to pace dialing against free channels.</li>
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
          <li>Channel allocation applies only to provider Click2Call. Voice-agent (<code>AGT_</code>) calls draw on the purchased channels of the agent outbound number.</li>
          <li>Requests over your DID or pool limit are accepted with a <code>warning</code> rather than rejected. Read <code>data.warning</code> on every create response.</li>
          <li><code>PUT</code> on channel allocation is a full replacement: any assigned DID you omit drops to zero. Use <code>PATCH</code> for partial updates.</li>
          <li>Outbound calls use the per-call <code>callback_url</code>; inbound calls use the per-DID webhook from <code>POST /api/calls/inbound-callback-url</code>.</li>
          <li><code>temporaryfailed</code> is provisional and can still be corrected by a late provider report.</li>
          <li>Keep tokens secure; do not expose them in frontend logs.</li>
        </ul>
      </section>
    </DocsLayout>
  );
}
