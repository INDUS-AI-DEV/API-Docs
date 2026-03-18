import React from 'react';
import DocsLayout, { MethodBadge } from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import { getSidebarSections } from '@site/src/sidebarConfig';

import styles from './api.module.css';

const PROD_BASE_URL = 'https://developer.induslabs.io';

const responseEnvelopeJson = `{
  "status_code": 200,
  "message": "human readable message",
  "error": null,
  "data": {}
}`;

const agentObjectJson = `{
  "id": "mongo-id",
  "agent_id": "AGT_12345678",
  "agent_name": "Support Agent",
  "agent_description": "Handles support conversations",
  "user_id": "user-id",
  "organization_id": "org-id",
  "team": [
    {
      "user_id": "user-id",
      "role": "member",
      "added_at": "2026-03-11T10:00:00Z"
    }
  ],
  "is_active": true,
  "agent_type": "INBOUND",
  "whatsapp_enabled": false,
  "is_auto": true,
  "team_size": 1,
  "created_at": "2026-03-11T10:00:00Z",
  "updated_at": "2026-03-11T10:00:00Z",
  "agent_cost": 5.0,
  "livekit_api_key": "optional",
  "livekit_api_secret": "optional",
  "livekit_host_url": "optional"
}`;

const agentConfigObjectJson = `{
  "_id": "mongo-id",
  "agent_id": "AGT_12345678",
  "system_prompt": "You are a helpful agent.",
  "starting_instructions": "Greet the user.",
  "agent_type": "generic_alpha",
  "guardrail_ids": ["personality_v1", "environment_v1"],
  "metadata_schema": [
    {
      "name": "customer_name",
      "type": "string",
      "required": true,
      "description": "Customer name",
      "default": null,
      "enum_values": null
    }
  ],
  "examples": [
    {
      "role": "user",
      "content": "Hello"
    }
  ],
  "guidelines": ["Be concise"],
  "call_outcomes": [],
  "call_infields": [],
  "notes": "Initial config",
  "tts_config": {
    "voice_id": "Indus-hi-maya"
  },
  "llm_config": {
    "provider": "groq",
    "model": "openai/gpt-oss-120b",
    "temperature": 0,
    "max_tokens": 0,
    "context_turns": 0
  },
  "stt_config": {
    "provider": "deepgram",
    "language": "hi"
  },
  "vad_config": {
    "min_silence_duration": 0.3,
    "min_speech_duration": 0.4,
    "activation_threshold": 0.45
  },
  "version": 1,
  "status": "published",
  "is_current": true,
  "created_at": "...",
  "updated_at": "...",
  "created_by": "user-id",
  "updated_by": "user-id"
}`;

const loginRequestJson = `{
  "email": "developer@example.com",
  "password": "your-password"
}`;

const loginSuccessJson = `{
  "status_code": 200,
  "message": "Login successful",
  "error": null,
  "data": {
    "access_token": "<jwt>",
    "refresh_token": "<jwt>",
    "token_type": "bearer"
  }
}`;

const legacyListRequestJson = `{
  "api_key": "your-api-key"
}`;

const legacyAgentsSuccessJson = `{
  "status_code": 200,
  "message": "Agents fetched",
  "error": null,
  "data": {
    "agents": [
      {
        "id": "...",
        "agent_id": "AGT_XXXX",
        "agent_name": "Sales Agent",
        "agent_description": "Handles sales calls",
        "user_id": "...",
        "organization_id": "...",
        "team": [],
        "is_active": true,
        "agent_type": "OUTBOUND",
        "whatsapp_enabled": false,
        "is_auto": true,
        "team_size": 0,
        "created_at": "...",
        "updated_at": "...",
        "agent_cost": 5.0,
        "livekit_api_key": "...",
        "livekit_host_url": "..."
      }
    ]
  }
}`;

const createAgentRequestJson = `{
  "agent_in": {
    "agent_name": "Outbound Sales Agent",
    "agent_description": "Handles outbound calls for product demos",
    "team": [],
    "agent_type": "OUTBOUND",
    "is_auto": true
  },
  "agent_config": {
    "system_prompt": "You are a helpful sales voice agent.",
    "starting_instructions": "Greet the user and ask qualifying questions.",
    "agent_type": "generic_alpha",
    "guardrail_ids": [
      "personality_v1",
      "environment_v1",
      "tone_v1",
      "goal_v1",
      "Guardrails_v1",
      "ethical_v1",
      "data_formatting_v1",
      "disconnect_guardrail_v1"
    ],
    "metadata_schema": [],
    "examples": [],
    "guidelines": [],
    "llm_config": {
      "provider": "groq",
      "model": "openai/gpt-oss-120b",
      "temperature": 0,
      "max_tokens": 0,
      "context_turns": 0
    },
    "notes": "Initial production config",
    "tts_config": {
      "voice_id": "Indus-hi-maya"
    },
    "stt_config": {
      "provider": "deepgram",
      "language": "hi"
    },
    "vad_config": {
      "min_silence_duration": 0.3,
      "min_speech_duration": 0.4,
      "activation_threshold": 0.45
    }
  },
  "call_outcome": {
    "outcome_name": "lead_status",
    "outcome_description": "Lead qualification result",
    "outcome_type": "FIXED",
    "outcome_enum": ["qualified", "not_qualified", "follow_up"],
    "is_visible": true
  },
  "call_infield": {
    "field_name": "customer_budget",
    "field_type": "NUMBER",
    "field_enum": null,
    "is_visible": true
  }
}`;

const renderRequestJson = `{
  "customer_name": "Rahul",
  "city": "Mumbai"
}`;

const renderResponseJson = `{
  "rendered_system_prompt": "...",
  "rendered_starting_instructions": "...",
  "errors": []
}`;

const validateResponseJson = `{
  "valid": true,
  "errors": []
}`;

const recommendedFlowCurl = `BASE_URL="https://developer.induslabs.io"

LOGIN_RESP=$(curl -s -X POST "$BASE_URL/api/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"developer@example.com","password":"your-password"}')

ACCESS_TOKEN=$(echo "$LOGIN_RESP" | jq -r '.data.access_token')

curl -s -X POST "$BASE_URL/api/agents/create" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -d @create-agent.json

curl -s "$BASE_URL/api/agents/AGT_12345678" \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

curl -s -X POST "$BASE_URL/api/agents/AGT_12345678/configs/render" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -d '{"customer_name":"Rahul","city":"Mumbai"}'`;

const loginCurl = `curl -X POST \\
  "${PROD_BASE_URL}/api/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "developer@example.com",
    "password": "your-password"
  }'`;

const createAgentCurl = `curl -X POST \\
  "${PROD_BASE_URL}/api/agents/create" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d @create-agent.json`;

const getAgentCurl = `curl -X GET \\
  "${PROD_BASE_URL}/api/agents/AGT_12345678" \\
  -H "Authorization: Bearer <access_token>"`;

const renderCurl = `curl -X POST \\
  "${PROD_BASE_URL}/api/agents/AGT_12345678/configs/render" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <access_token>" \\
  -d '{
    "customer_name": "Rahul",
    "city": "Mumbai"
  }'`;

const quickIntegration = {
  title: 'Quick Integration',
  description: 'Login, use a bearer token, create your own agent, inspect it, then render prompts with metadata.',
  defaultApi: 'developer-agent-management-post-login',
  apis: [
    {
      id: 'developer-agent-management-post-login',
      label: 'POST /api/login',
      defaultLanguage: 'curl',
      languages: [{ id: 'curl', label: 'cURL', language: 'bash', code: loginCurl }],
    },
    {
      id: 'developer-agent-management-post-agents-create',
      label: 'POST /api/agents/create',
      defaultLanguage: 'curl',
      languages: [{ id: 'curl', label: 'cURL', language: 'bash', code: createAgentCurl }],
    },
    {
      id: 'developer-agent-management-get-agent',
      label: 'GET /api/agents/{agent_id}',
      defaultLanguage: 'curl',
      languages: [{ id: 'curl', label: 'cURL', language: 'bash', code: getAgentCurl }],
    },
    {
      id: 'developer-agent-management-post-configs-render',
      label: 'POST /api/agents/{agent_id}/configs/render',
      defaultLanguage: 'curl',
      languages: [{ id: 'curl', label: 'cURL', language: 'bash', code: renderCurl }],
    },
  ],
};

const authBadgeClass = {
  bearer: styles.tagBearer,
  apiKey: styles.tagApiKey,
  legacy: styles.tagLegacy,
  public: styles.tagNeutral,
  raw: styles.tagResponseRaw,
  envelope: styles.tagResponseEnvelope,
};

const authBadgeLabel = {
  bearer: 'Bearer Token',
  apiKey: 'API Key',
  legacy: 'Legacy',
  public: 'Public',
  raw: 'Raw Model Response',
  envelope: 'Response Envelope',
};

const groups = [
  {
    id: 'developer-agent-management-authentication',
    title: 'Developer Authentication',
    description: 'Developer users should authenticate once with email and password, then send the returned access token as a bearer token on developer-facing APIs scoped to their own data.',
    endpoints: [
      {
        id: 'developer-agent-management-post-login',
        method: 'POST',
        path: '/api/login',
        title: 'Developer Login',
        description: 'Authenticates a developer user using email and password and returns access and refresh tokens for bearer-token-based developer APIs.',
        badges: ['public', 'bearer', 'envelope'],
        notes: [
          'No bearer token is required for this login request.',
          'Credentials are verified before session creation.',
          'Inactive users and unverified users are rejected.',
          'All new Developer Agent Management endpoints should use this bearer token flow.',
        ],
        inputs: [
          { name: 'email', type: 'string', defaultValue: 'required', description: 'Developer account email.' },
          { name: 'password', type: 'string', defaultValue: 'required', description: 'Developer account password.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns access_token, refresh_token, and token_type.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Incorrect email/password, inactive user, or unverified user.' },
        ],
        examples: [
          { label: 'Request Body', language: 'json', code: loginRequestJson },
          { label: 'cURL', language: 'bash', code: loginCurl },
          { label: 'Success Response', language: 'json', code: loginSuccessJson },
        ],
      },
    ],
  },
  {
    id: 'developer-agent-management-legacy-listing',
    title: 'Legacy Developer Agent Listing',
    description: 'This older API-key-based endpoint remains available for backward compatibility, but new integrations should move to bearer-token developer endpoints.',
    endpoints: [
      {
        id: 'developer-agent-management-post-legacy-agents',
        method: 'POST',
        path: '/api/agents',
        title: 'List Developer Agents (Legacy API Key Endpoint)',
        description: 'Returns all agents belonging to the user associated with the provided API key.',
        badges: ['apiKey', 'legacy', 'envelope'],
        warning: 'Legacy API-key endpoint. New integrations should use bearer-token-based developer APIs.',
        notes: [
          'The request body must include api_key.',
          'The backend resolves the user from the secret/API key and fetches all agents for that user.',
          'This endpoint is not bearer-token based.',
        ],
        inputs: [
          { name: 'api_key', type: 'string', defaultValue: 'required', description: 'Developer API key provided in the JSON body.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns agents inside the standard response envelope.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Missing api_key or invalid API key.' },
          { name: '500 Internal Server Error', type: 'application/json', description: 'Unexpected server error.' },
        ],
        examples: [
          { label: 'Request Body', language: 'json', code: legacyListRequestJson },
          { label: 'Success Response', language: 'json', code: legacyAgentsSuccessJson },
        ],
      },
    ],
  },
  {
    id: 'developer-agent-management-agents',
    title: 'Agents',
    description: 'These endpoints expose self-service agent CRUD under the developer namespace. They are documented only for the authenticated developer to manage their own agent resources.',
    endpoints: [
      {
        id: 'developer-agent-management-post-agents-create',
        method: 'POST',
        path: '/api/agents/create',
        title: 'Create Agent',
        description: 'Creates a new agent and its initial config, with optional first call outcome and call infield definitions.',
        badges: ['bearer', 'raw'],
        warning: 'Creation uses `/create` because POST `/api/agents` is already reserved by a legacy endpoint.',
        notes: [
          'Creates the agent first, then creates a draft config and may publish it.',
          'LiveKit credentials are assigned from system settings.',
          'Initial call outcomes and call infields are optional.',
          'Agent cost is calculated from user credit settings.',
          'This is the recommended creation endpoint for bearer-token-based integrations.',
        ],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token> from /api/login.' },
          { name: 'agent_in', type: 'object', defaultValue: 'required', description: 'Agent definition including name, description, team, agent_type, and is_auto.' },
          { name: 'agent_config', type: 'object', defaultValue: 'required', description: 'Initial prompt and service configuration payload.' },
          { name: 'call_outcome', type: 'object', defaultValue: 'optional', description: 'Optional first outcome definition created alongside the agent.' },
          { name: 'call_infield', type: 'object', defaultValue: 'optional', description: 'Optional first input field definition created alongside the agent.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the created agent object as a raw model response.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Duplicate agent name.' },
          { name: '403 Forbidden', type: 'application/json', description: 'Unauthorized developer user.' },
          { name: '500 Internal Server Error', type: 'application/json', description: 'Failure while creating config, outcome, or infield.' },
        ],
        examples: [
          { label: 'Request Body', language: 'json', code: createAgentRequestJson },
          { label: 'cURL', language: 'bash', code: createAgentCurl },
          { label: 'Created Agent', language: 'json', code: agentObjectJson },
        ],
      },
      {
        id: 'developer-agent-management-get-agent',
        method: 'GET',
        path: '/api/agents/{agent_id}',
        title: 'Get Agent',
        description: 'Fetches a single agent by its public `agent_id` such as `AGT_12345678`.',
        badges: ['bearer', 'raw'],
        notes: [
          'A logged-in developer can access only their own agent data in the developer domain.',
          'Returns full agent details.',
        ],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Public agent identifier.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns a single agent object.' },
          { name: '403 Forbidden', type: 'application/json', description: 'Not authorized for this agent.' },
          { name: '404 Not Found', type: 'application/json', description: 'Agent not found.' },
        ],
      },
      {
        id: 'developer-agent-management-put-agent',
        method: 'PUT',
        path: '/api/agents/{agent_id}',
        title: 'Update Agent',
        description: 'Partially updates an existing agent owned by the authenticated developer.',
        badges: ['bearer', 'raw'],
        notes: [
          'Partial updates are supported.',
          'Typical editable fields include agent_name, agent_description, is_active, whatsapp_enabled, is_auto, agent_cost, and optional LiveKit overrides.',
          'Developer docs do not describe this as an organization-wide or admin-wide update API.',
        ],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Public agent identifier.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Any editable subset of the agent payload.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the updated agent object.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Failed to update.' },
          { name: '403 Forbidden', type: 'application/json', description: 'Not authorized.' },
          { name: '404 Not Found', type: 'application/json', description: 'Agent not found.' },
        ],
      },
      {
        id: 'developer-agent-management-delete-agent',
        method: 'DELETE',
        path: '/api/agents/{agent_id}',
        title: 'Delete Agent',
        description: 'Deletes an agent owned by the authenticated developer.',
        badges: ['bearer', 'raw'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Public agent identifier.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns `{ "message": "Agent deleted successfully" }`.' },
          { name: '403 Forbidden', type: 'application/json', description: 'Not authorized.' },
          { name: '404 Not Found', type: 'application/json', description: 'Agent not found.' },
        ],
      },
    ],
  },
  {
    id: 'developer-agent-management-configs',
    title: 'Agent Configs',
    description: 'Config endpoints handle versioned prompts and service settings for the authenticated developer’s own agents. Draft and published versions are distinct, and publish operations can clone current outcomes and infields into the new current version.',
    endpoints: [
      {
        id: 'developer-agent-management-post-configs',
        method: 'POST',
        path: '/api/agents/{agent_id}/configs',
        title: 'Create Config Version',
        description: 'Creates a new config version for an agent as a draft, or publishes it immediately when `publish=true`.',
        badges: ['bearer', 'raw'],
        notes: [
          'This endpoint operates only on the authenticated developer’s own agent.',
          'If a current config exists, the backend clones it and overlays the provided values.',
          'Publishing also clones current call outcomes and call infields.',
        ],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'publish', type: 'query boolean', defaultValue: 'false', description: 'Publish immediately when true.' },
          { name: 'body', type: 'AgentConfigCreate', defaultValue: 'required', description: 'Same shape as the config create payload used during agent creation.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the created config version object.' },
        ],
      },
      {
        id: 'developer-agent-management-get-configs',
        method: 'GET',
        path: '/api/agents/{agent_id}/configs',
        title: 'List Config Versions',
        description: 'Lists config versions for an agent, optionally filtered by status.',
        badges: ['bearer', 'raw'],
        notes: ['Returns config history only for the authenticated developer’s own agent.'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'status_filter', type: 'query string', defaultValue: 'optional', description: '`draft`, `published`, or `archived`.' },
          { name: 'skip', type: 'query integer', defaultValue: '0', description: 'Pagination offset.' },
          { name: 'limit', type: 'query integer', defaultValue: '100', description: 'Page size.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns an array of config version objects.' },
        ],
      },
      {
        id: 'developer-agent-management-get-configs-current',
        method: 'GET',
        path: '/api/agents/{agent_id}/configs/current',
        title: 'Get Current Config',
        description: 'Returns the currently active published config for the agent.',
        badges: ['bearer', 'raw'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the current published config object.' },
          { name: '404 Not Found', type: 'application/json', description: 'No current config found.' },
        ],
      },
      {
        id: 'developer-agent-management-get-config-by-version',
        method: 'GET',
        path: '/api/agents/{agent_id}/configs/{version}',
        title: 'Get Config Version',
        description: 'Returns a specific config version for an agent.',
        badges: ['bearer', 'raw'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'version', type: 'path integer', defaultValue: 'required', description: 'Config version number.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the requested config version.' },
          { name: '404 Not Found', type: 'application/json', description: 'Version not found.' },
        ],
      },
      {
        id: 'developer-agent-management-put-config-by-version',
        method: 'PUT',
        path: '/api/agents/{agent_id}/configs/{version}',
        title: 'Update Draft Config',
        description: 'Updates an existing draft config version. Published configs must be copied into a new draft instead of being edited in place.',
        badges: ['bearer', 'raw'],
        notes: ['Only draft versions can be updated.'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'version', type: 'path integer', defaultValue: 'required', description: 'Draft version number.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Partial config fields such as system_prompt, starting_instructions, metadata_schema, examples, guidelines, and notes.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the updated draft config.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Version is not draft or update failed.' },
        ],
      },
      {
        id: 'developer-agent-management-delete-config-by-version',
        method: 'DELETE',
        path: '/api/agents/{agent_id}/configs/{version}',
        title: 'Delete Draft Config',
        description: 'Deletes a draft config version.',
        badges: ['bearer', 'raw'],
        notes: ['Only draft versions can be deleted.'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'version', type: 'path integer', defaultValue: 'required', description: 'Draft version number.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Draft config deleted.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Version is not draft.' },
        ],
      },
      {
        id: 'developer-agent-management-post-config-publish',
        method: 'POST',
        path: '/api/agents/{agent_id}/configs/{version}/publish',
        title: 'Publish Config Version',
        description: 'Publishes a chosen config version and makes it current.',
        badges: ['bearer', 'raw'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'version', type: 'path integer', defaultValue: 'required', description: 'Version to publish.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the published config or publish result.' },
        ],
      },
      {
        id: 'developer-agent-management-post-config-rollback',
        method: 'POST',
        path: '/api/agents/{agent_id}/configs/{version}/rollback',
        title: 'Rollback to Config Version',
        description: 'Rolls back the current agent config to a previous version.',
        badges: ['bearer', 'raw'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'version', type: 'path integer', defaultValue: 'required', description: 'Previously published version to restore.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Rollback completed.' },
        ],
      },
      {
        id: 'developer-agent-management-post-configs-enhance',
        method: 'POST',
        path: '/api/agents/{agent_id}/configs/enhance',
        title: 'Enhance Prompt Configuration',
        description: 'Uses prompt enhancement logic to improve the provided prompts and metadata instructions.',
        badges: ['bearer', 'raw'],
        notes: ['The request body follows the config create shape but enhancement primarily uses system_prompt, starting_instructions, and metadata_schema.'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'body', type: 'AgentConfigCreate', defaultValue: 'required', description: 'Prompt payload to enhance.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns enhanced prompt text and suggestions.' },
        ],
      },
      {
        id: 'developer-agent-management-post-configs-render',
        method: 'POST',
        path: '/api/agents/{agent_id}/configs/render',
        title: 'Render Prompt Templates',
        description: 'Renders prompt templates using metadata values against either a selected version or the current config.',
        badges: ['bearer', 'raw'],
        notes: [
          'If `version` is provided, that version is used; otherwise the current config is used.',
          'Optional backend parameters include version, system_prompt, and starting_instructions.',
        ],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Raw metadata key/value object used for interpolation.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns rendered prompt text and validation errors.' },
        ],
        examples: [
          { label: 'Request Body', language: 'json', code: renderRequestJson },
          { label: 'cURL', language: 'bash', code: renderCurl },
          { label: 'Success Response', language: 'json', code: renderResponseJson },
        ],
      },
      {
        id: 'developer-agent-management-post-configs-validate',
        method: 'POST',
        path: '/api/agents/{agent_id}/configs/validate',
        title: 'Validate Metadata',
        description: 'Validates metadata values against the agent config metadata schema.',
        badges: ['bearer', 'raw'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Metadata values to validate.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns `{ valid, errors }`.' },
        ],
        examples: [
          { label: 'Request Body', language: 'json', code: renderRequestJson },
          { label: 'Validation Response', language: 'json', code: validateResponseJson },
        ],
      },
    ],
  },
  {
    id: 'developer-agent-management-call-outcomes',
    title: 'Call Outcomes',
    description: 'Call outcomes define structured data collected after conversations for the authenticated developer’s own agents.',
    endpoints: [
      {
        id: 'developer-agent-management-post-call-outcomes',
        method: 'POST',
        path: '/api/agents/{agent_id}/call_outcomes',
        title: 'Create Call Outcome',
        description: 'Creates a call outcome definition for the agent.',
        badges: ['bearer', 'envelope'],
        notes: ['Supported outcome_type values: TEXT, DATE, BOOLEAN, FIXED, NUMBER.'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'outcome_name', type: 'string', defaultValue: 'required', description: 'Unique outcome name.' },
          { name: 'outcome_description', type: 'string', defaultValue: 'required', description: 'Human-readable description.' },
          { name: 'outcome_type', type: 'string', defaultValue: 'required', description: 'TEXT, DATE, BOOLEAN, FIXED, or NUMBER.' },
          { name: 'outcome_enum', type: 'array', defaultValue: 'optional', description: 'Enum choices when outcome_type is FIXED.' },
          { name: 'is_visible', type: 'boolean', defaultValue: 'required', description: 'Controls UI visibility.' },
        ],
        outputs: [
          { name: '201 Created', type: 'application/json', description: 'Returns the created outcome wrapped in the standard response envelope.' },
        ],
      },
      {
        id: 'developer-agent-management-get-call-outcomes',
        method: 'GET',
        path: '/api/agents/{agent_id}/call_outcomes',
        title: 'List Call Outcomes',
        description: 'Lists all call outcome definitions for the agent.',
        badges: ['bearer', 'envelope'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns outcomes in the standard response envelope.' },
        ],
      },
      {
        id: 'developer-agent-management-patch-call-outcome',
        method: 'PATCH',
        path: '/api/agents/{agent_id}/call_outcomes/{outcome_name}',
        title: 'Update Call Outcome',
        description: 'Updates a call outcome definition by outcome name.',
        badges: ['bearer', 'envelope'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'outcome_name', type: 'path string', defaultValue: 'required', description: 'Outcome to update.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Partial outcome definition updates.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Updated outcome in response envelope.' },
        ],
      },
      {
        id: 'developer-agent-management-delete-call-outcome',
        method: 'DELETE',
        path: '/api/agents/{agent_id}/call_outcomes/{outcome_name}',
        title: 'Delete Call Outcome',
        description: 'Deletes a call outcome definition by name.',
        badges: ['bearer', 'envelope'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'outcome_name', type: 'path string', defaultValue: 'required', description: 'Outcome to delete.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Delete result in response envelope.' },
        ],
      },
    ],
  },
  {
    id: 'developer-agent-management-call-infields',
    title: 'Call Infields',
    description: 'Call infields define structured input fields attached to the authenticated developer’s own agents.',
    endpoints: [
      {
        id: 'developer-agent-management-post-call-infields',
        method: 'POST',
        path: '/api/agents/{agent_id}/call_infields',
        title: 'Create Call Infield',
        description: 'Creates an input field definition for the agent.',
        badges: ['bearer', 'envelope'],
        notes: ['Supported field_type values: TEXT, DATE, BOOLEAN, FIXED, NUMBER.'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'field_name', type: 'string', defaultValue: 'required', description: 'Unique field name.' },
          { name: 'field_type', type: 'string', defaultValue: 'required', description: 'TEXT, DATE, BOOLEAN, FIXED, or NUMBER.' },
          { name: 'field_enum', type: 'array', defaultValue: 'optional', description: 'Enum choices when field_type is FIXED.' },
          { name: 'is_visible', type: 'boolean', defaultValue: 'required', description: 'Controls UI visibility.' },
        ],
        outputs: [
          { name: '201 Created', type: 'application/json', description: 'Created field wrapped in the standard response envelope.' },
        ],
      },
      {
        id: 'developer-agent-management-get-call-infields',
        method: 'GET',
        path: '/api/agents/{agent_id}/call_infields',
        title: 'List Call Infields',
        description: 'Lists configured call input fields for the agent.',
        badges: ['bearer', 'envelope'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns call input fields in the response envelope.' },
        ],
      },
      {
        id: 'developer-agent-management-patch-call-infield',
        method: 'PATCH',
        path: '/api/agents/{agent_id}/call_infields/{field_name}',
        title: 'Update Call Infield',
        description: 'Updates a call input field definition by field name.',
        badges: ['bearer', 'envelope'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'field_name', type: 'path string', defaultValue: 'required', description: 'Field to update.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Partial field definition updates.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Updated field in response envelope.' },
        ],
      },
      {
        id: 'developer-agent-management-delete-call-infield',
        method: 'DELETE',
        path: '/api/agents/{agent_id}/call_infields/{field_name}',
        title: 'Delete Call Infield',
        description: 'Deletes a call input field definition by name.',
        badges: ['bearer', 'envelope'],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Bearer <access_token>.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'field_name', type: 'path string', defaultValue: 'required', description: 'Field to delete.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Delete result in response envelope.' },
        ],
      },
    ],
  },
  {
    id: 'developer-agent-management-service-config',
    title: 'Service Config',
    description: 'This endpoint updates one service-specific section of the current config for the authenticated developer’s own agent without replacing the entire config document.',
    endpoints: [
      {
        id: 'developer-agent-management-put-service-config',
        method: 'PUT',
        path: '/api/agents/{agent_id}/config/{service_type}',
      title: 'Update Service Config Section',
      description: 'Updates exactly one of `tts_config`, `stt_config`, `vad_config`, or `llm_config` on the current config.',
        badges: ['bearer', 'raw'],
        notes: [
          'Owner-only endpoint.',
          'The backend loads the current config, validates the payload against the selected service type, updates only that section, and persists the result.',
        ],
        inputs: [
          { name: 'Authorization', type: 'header', defaultValue: 'required', description: 'Owner bearer token.' },
          { name: 'agent_id', type: 'path string', defaultValue: 'required', description: 'Agent identifier.' },
          { name: 'service_type', type: 'path string', defaultValue: 'required', description: 'One of tts_config, stt_config, vad_config, llm_config.' },
          { name: 'body', type: 'object', defaultValue: 'required', description: 'Payload shape depends on the chosen service_type.' },
        ],
        outputs: [
          { name: '200 OK', type: 'application/json', description: 'Returns the updated config or current config representation.' },
          { name: '400 Bad Request', type: 'application/json', description: 'Invalid payload or failed update.' },
          { name: '403 Forbidden', type: 'application/json', description: 'Not authorized.' },
          { name: '404 Not Found', type: 'application/json', description: 'No current config found.' },
        ],
      },
    ],
  },
];

function TableCard({ title, rows, headerLabels = ['Name', 'Type', 'Default', 'Description'] }) {
  if (!rows?.length) return null;
  return (
    <div className={styles.tableCard}>
      <h4>{title}</h4>
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>{headerLabels.map(label => <th key={label}>{label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.name}>
                <td data-label="Name"><code>{row.name}</code></td>
                <td data-label="Type">{row.type}</td>
                <td data-label="Default">{row.defaultValue}</td>
                <td data-label="Description">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OutputCard({ rows }) {
  if (!rows?.length) return null;
  return (
    <div className={styles.tableCard}>
      <h4>Outputs</h4>
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.name}>
                <td data-label="Status"><code>{row.name}</code></td>
                <td data-label="Type">{row.type}</td>
                <td data-label="Description">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ kind }) {
  return <span className={`${styles.tag} ${authBadgeClass[kind]}`}>{authBadgeLabel[kind]}</span>;
}

function EndpointSection({ endpoint }) {
  const [copied, setCopied] = React.useState(false);
  const copyValue = `${PROD_BASE_URL}${endpoint.path}`;

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
      <div className={styles.tagRow}>
        {endpoint.badges.map(badge => <Badge key={badge} kind={badge} />)}
      </div>
      {endpoint.warning && (
        <div className={styles.warningCallout}>
          <strong>Warning</strong>
          <p>{endpoint.warning}</p>
        </div>
      )}
      {endpoint.notes?.length > 0 && (
        <div className={styles.callout}>
          <strong>Behavior</strong>
          <ul>
            {endpoint.notes.map(note => <li key={note}>{note}</li>)}
          </ul>
        </div>
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

function GroupSection({ group }) {
  return (
    <section id={group.id} className={styles.sectionBlock}>
      <div className={styles.sectionHeading}>
        <h2>{group.title}</h2>
        <p>{group.description}</p>
      </div>
      {group.endpoints.map(endpoint => (
        <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}
    </section>
  );
}

export default function DeveloperAgentManagementPage() {
  return (
    <DocsLayout
      title="Developer Agent Management APIs"
      description="Developer authentication, own-agent management, configs, metadata, and service settings"
      sidebarSections={getSidebarSections('developer-agent-management')}
      integration={quickIntegration}
    >
      <section id="developer-agent-management-introduction" className={styles.pageIntro}>
        <h1>Developer Agent Management</h1>
        <p>
          IndusAI Developer APIs let external systems authenticate and manage the authenticated developer&apos;s own
          agent resources, including agent creation, configuration, prompt tooling, call outcomes, call input
          fields, and runtime service settings. Use the developer login endpoint to obtain a bearer token for
          the recommended integration flow. Some older endpoints continue to support API-key-based access and are
          marked as legacy.
        </p>
        <div className={styles.callout}>
          <strong>Namespace split</strong>
          <ul>
            <li>Standard platform APIs: <code>/api/agents/...</code></li>
            <li>Developer-facing APIs in this section: <code>/api/...</code></li>
            <li>External developer docs are intentionally limited to self-service agent lifecycle and configuration APIs.</li>
          </ul>
        </div>
        <div className={styles.callout} id="developer-agent-management-auth-model">
          <strong>Onboarding flow</strong>
          <ul>
            <li>Login with <code>POST /api/login</code>.</li>
            <li>Use <code>Authorization: Bearer &lt;token&gt;</code>.</li>
            <li>Create and manage only your own agents.</li>
            <li>Use legacy API-key endpoints only where explicitly marked.</li>
          </ul>
        </div>
        <div className={styles.warningCallout}>
          <strong>Public developer scope</strong>
          <p>
            These docs do not include internal, admin, observability, or team-management endpoints. All
            documented Developer Agent Management APIs are scoped to the authenticated user only.
          </p>
        </div>
        <div className={styles.modelGrid}>
          <div className={styles.responseExampleCard}>
            <h4>Standard Response Envelope</h4>
            <CopyableCode language="json">{responseEnvelopeJson}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Bearer Login Response</h4>
            <CopyableCode language="json">{loginSuccessJson}</CopyableCode>
          </div>
        </div>
      </section>

      {groups.map(group => (
        <GroupSection key={group.id} group={group} />
      ))}

      <section id="developer-agent-management-recommended-flow" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>Recommended Integration Flow</h3>
        <ol className={styles.stackList}>
          <li>Authenticate the developer with <code>POST /api/login</code>.</li>
          <li>Store the returned <code>access_token</code> securely and send it as a bearer token.</li>
          <li>Create an agent with <code>POST /api/agents/create</code>.</li>
          <li>Inspect, update, or delete only the authenticated developer&apos;s own agents.</li>
          <li>Create or publish configs, then use render and validate endpoints to test metadata-driven prompts.</li>
          <li>Manage outcomes, infields, and service config sections as your integration matures.</li>
          <li>Use the legacy API-key endpoint only when explicitly required for older integrations.</li>
        </ol>
        <CopyableCode language="bash">{recommendedFlowCurl}</CopyableCode>
      </section>

      <section id="developer-agent-management-common-models" className={styles.endpointSection}>
        <h3 className={styles.anchorTitle}>Common Models</h3>
        <p>These models appear repeatedly across the developer agent management surface.</p>
        <div className={styles.modelGrid}>
          <div className={styles.responseExampleCard}>
            <h4>Agent Object</h4>
            <CopyableCode language="json">{agentObjectJson}</CopyableCode>
          </div>
          <div className={styles.responseExampleCard}>
            <h4>Agent Config Object</h4>
            <CopyableCode language="json">{agentConfigObjectJson}</CopyableCode>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
