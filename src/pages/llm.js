import React, {useState} from 'react';
import DocsLayout, {MethodBadge} from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import {getSidebarSections} from '@site/src/sidebarConfig';

import styles from './api.module.css';

const LLM_BASE_URL = 'https://voice.induslabs.io';

const llmQuickIntegration = {
  title: 'Quick Integration',
  description: 'Sample requests to get chat completions running in minutes.',
  defaultApi: 'llm-post-v1-chat-completions',
  apis: [
    {
      id: 'llm-post-v1-chat-completions',
      label: 'POST /v1/chat/completions',
      defaultLanguage: 'python-sdk',
      languages: [
        {
          id: 'python-sdk',
          label: 'Python (OpenAI SDK)',
          language: 'python',
          code: `from openai import OpenAI

client = OpenAI(
    base_url="${LLM_BASE_URL}/v1",
    api_key="YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[
        {"role": "user", "content": "Hello! How are you?"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)`,
        },
        {
          id: 'python-sdk-voice',
          label: 'Python (Voice Agent)',
          language: 'python',
          code: `from openai import OpenAI

client = OpenAI(
    base_url="${LLM_BASE_URL}/v1",
    api_key="YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="llama-4-maverick",
    messages=[
        {"role": "user", "content": "Hello! How are you?"}
    ],
    temperature=0.7,
    max_tokens=1000,
    extra_body={
        "finetune": True,
        "language": "en",
        "gender": "female",
        "accent": "american"
    }
)

print(response.choices[0].message.content)`,
        },
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${LLM_BASE_URL}/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-oss-120b",
    "messages": [
        {"role": "user", "content": "Hello! How are you?"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000,
    "extra_body": {
        "finetune": True,
        "language": "en",
        "gender": "male",
        "accent": "british"
    }
}

response = requests.post(url, headers=headers, json=data, timeout=60)
response.raise_for_status()
print(response.json())`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: '${LLM_BASE_URL}/v1',
  apiKey: 'YOUR_API_KEY',
});

const response = await client.chat.completions.create({
  model: 'gpt-oss-120b',
  messages: [
    {role: 'user', content: 'Hello! How are you?'}
  ],
  temperature: 0.7,
  max_tokens: 1000,
  extra_body: {
    finetune: true,
    language: 'en',
    gender: 'female',
    accent: 'american'
  }
});

console.log(response.choices[0].message.content);`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X POST \\
  "${LLM_BASE_URL}/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-oss-120b",
    "messages": [
      {"role": "user", "content": "Hello! How are you?"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000,
    "extra_body": {
      "finetune": true,
      "language": "en",
      "gender": "female",
      "accent": "american"
    }
  }'`,
        },
      ],
    },
    {
      id: 'llm-post-v1-chat-completions-streaming',
      label: 'POST /v1/chat/completions (Streaming)',
      defaultLanguage: 'python-sdk',
      languages: [
        {
          id: 'python-sdk',
          label: 'Python (OpenAI SDK)',
          language: 'python',
          code: `from openai import OpenAI

client = OpenAI(
    base_url="${LLM_BASE_URL}/v1",
    api_key="YOUR_API_KEY"
)

stream = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[
        {"role": "user", "content": "Tell me a story"}
    ],
    temperature=0.7,
    max_tokens=2000,
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,
        },
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests
import json

url = "${LLM_BASE_URL}/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-oss-120b",
    "messages": [
        {"role": "user", "content": "Tell me a story"}
    ],
    "temperature": 0.7,
    "max_tokens": 2000,
    "stream": True
}

with requests.post(url, headers=headers, json=data, stream=True, timeout=60) as response:
    response.raise_for_status()
    for line in response.iter_lines():
        if not line:
            continue
        if line.startswith(b"data: "):
            data_str = line[6:].decode("utf-8")
            if data_str == "[DONE]":
                break
            chunk = json.loads(data_str)
            if "choices" in chunk and chunk["choices"]:
                delta = chunk["choices"][0].get("delta", {})
                if "content" in delta:
                    print(delta["content"], end="", flush=True)`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: '${LLM_BASE_URL}/v1',
  apiKey: 'YOUR_API_KEY',
});

const stream = await client.chat.completions.create({
  model: 'gpt-oss-120b',
  messages: [{role: 'user', content: 'Tell me a story'}],
  temperature: 0.7,
  max_tokens: 2000,
  stream: true,
});

for await (const chunk of stream) {
  if (chunk.choices[0]?.delta?.content) {
    process.stdout.write(chunk.choices[0].delta.content);
  }
}`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -N -X POST \\
  "${LLM_BASE_URL}/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-oss-120b",
    "messages": [
      {"role": "user", "content": "Tell me a story"}
    ],
    "temperature": 0.7,
    "max_tokens": 2000,
    "stream": true
  }'`,
        },
      ],
    },
    {
      id: 'llm-get-v1-chat-models',
      label: 'GET /v1/chat/models',
      defaultLanguage: 'python-rest',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

url = "${LLM_BASE_URL}/v1/chat/models"
response = requests.get(url, timeout=30)
response.raise_for_status()

models = response.json()
for model in models["data"]:
    print(f"Model: {model['id']}, Owner: {model['owned_by']}")`,
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          language: 'javascript',
          code: `const response = await fetch('${LLM_BASE_URL}/v1/chat/models', {
  method: 'GET',
  headers: {'accept': 'application/json'}
});

if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);

const models = await response.json();
models.data.forEach(model => {
  console.log(\`Model: \${model.id}, Owner: \${model.owned_by}\`);
});`,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: `curl -X GET \\
  "${LLM_BASE_URL}/v1/chat/models" \\
  -H "accept: application/json"`,
        },
      ],
    },
  ],
};

const supportedModelsList = [
  {name: 'GPT OSS 120B', id: 'gpt-oss-120b', owner: 'OpenAI', description: 'High-performance 120B parameter model'},
  {name: 'Llama 4 Maverick', id: 'llama-4-maverick', owner: 'Meta', description: '17B parameter instruct model with 128k context'},
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

const llmInputs = [
  {name: 'messages', type: 'array', defaultValue: 'required', description: 'Array of message objects with role and content.'},
  {name: 'model', type: 'string', defaultValue: 'required', description: 'Model ID (e.g., "gpt-oss-120b", "llama-4-maverick").'},
  {name: 'temperature', type: 'number', defaultValue: '1.0', description: 'Sampling temperature (0–2). Higher values = more random.'},
  {name: 'max_tokens', type: 'integer', defaultValue: 'null', description: 'Maximum tokens to generate in completion.'},
  {name: 'top_p', type: 'number', defaultValue: '1.0', description: 'Nucleus sampling parameter (0–1).'},
  {name: 'stream', type: 'boolean', defaultValue: 'false', description: 'Whether to stream responses via SSE.'},
  {name: 'stop', type: 'array', defaultValue: 'null', description: 'Stop sequences to end generation early.'},
  {name: 'extra_body', type: 'object', defaultValue: 'null', description: 'Additional parameters for voice agent optimization (see below).'},
];

const extraBodyInputs = [
  {name: 'finetune', type: 'boolean', defaultValue: 'false', description: 'Enable fine-tuned model optimized for voice agent use cases.'},
  {name: 'language', type: 'string', defaultValue: 'null', description: 'Target language code (e.g., "en", "hi", "es", "fr").'},
  {name: 'gender', type: 'string', defaultValue: 'null', description: 'Voice gender preference: "male" or "female".'},
  {name: 'accent', type: 'string', defaultValue: 'null', description: 'Accent/dialect (e.g., "american", "british", "indian", "mexican").'},
];

const nonStreamingOutputs = [
  {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns complete chat completion with usage metrics.'},
  {name: '401 Unauthorized', type: 'application/json', defaultValue: '-', description: 'Invalid or missing API key.'},
  {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
  {name: '503 Service Unavailable', type: 'application/json', defaultValue: '-', description: 'LLM service temporarily unavailable.'},
];

const streamingOutputs = [
  {name: '200 OK', type: 'text/event-stream', defaultValue: '-', description: 'Returns chat completion chunks via SSE.'},
  {name: '401 Unauthorized', type: 'application/json', defaultValue: '-', description: 'Invalid or missing API key.'},
  {name: '422 Validation Error', type: 'application/json', defaultValue: '-', description: 'Validation failure. Inspect detail array.'},
];

const modelsOutputs = [
  {name: '200 OK', type: 'application/json', defaultValue: '-', description: 'Returns list of available models.'},
];

const responseExamples = [
  {
    label: '200 OK (Non-streaming)',
    language: 'json',
    code: `{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-oss-120b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I'm doing well, thank you for asking. How can I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 20,
    "total_tokens": 32
  }
}`,
  },
  {
    label: '200 OK (Streaming)',
    language: 'json',
    code: `data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-oss-120b","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-oss-120b","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-oss-120b","choices":[{"index":0,"delta":{"content":"!"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"gpt-oss-120b","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]`,
  },
  {
    label: '200 OK (Models List)',
    language: 'json',
    code: `{
  "object": "list",
  "data": [
    {
      "id": "gpt-oss-120b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "openai"
    },
    {
      "id": "llama-4-maverick",
      "object": "model",
      "created": 1677610602,
      "owned_by": "meta"
    }
  ]
}`,
  },
  {label: '401 Unauthorized', language: 'json', code: '{"detail": "Invalid API key"}'},
  {label: '422 Validation Error', language: 'json', code: validationError},
];

const endpoints = [
  {
    id: 'llm-post-v1-chat-completions',
    method: 'POST',
    path: '/v1/chat/completions',
    title: 'Chat Completions',
    description: 'Generate chat completions using large language models. Supports both streaming and non-streaming responses, with optional voice agent optimization.',
    notes: [
      'OpenAI SDK compatible - use the official OpenAI SDK with a custom base URL.',
      'Supports multi-turn conversations by including message history.',
      'Streaming mode returns Server-Sent Events (SSE) for real-time responses.',
      'Non-streaming mode returns complete response with usage metrics.',
      'Use extra_body.finetune=true to enable our fine-tuned model, which performs significantly better for voice agent use cases.',
    ],
    inputs: llmInputs,
    outputs: nonStreamingOutputs,
    examples: [responseExamples[0], responseExamples[3], responseExamples[4]],
  },
  {
    id: 'llm-post-v1-chat-completions-streaming',
    method: 'POST',
    path: '/v1/chat/completions (Streaming)',
    title: 'Chat Completions (Streaming)',
    description: 'Stream chat completions in real-time using Server-Sent Events. Set stream: true in the request body.',
    notes: [
      'Returns chunks as they are generated for low-latency responses.',
      'Each chunk contains a delta with incremental content.',
      'Stream ends with a [DONE] message.',
      'Usage metrics are included in the final chunk.',
    ],
    inputs: llmInputs,
    outputs: streamingOutputs,
    examples: [responseExamples[1], responseExamples[3], responseExamples[4]],
  },
  {
    id: 'llm-get-v1-chat-models',
    method: 'GET',
    path: '/v1/chat/models',
    title: 'List Available Models',
    description: 'Retrieve a list of available chat models with their metadata.',
    notes: [
      'Returns OpenAI-compatible model list format.',
      'Use the model IDs in your completion requests.',
      'No authentication required for this endpoint.',
    ],
    inputs: [],
    outputs: modelsOutputs,
    examples: [responseExamples[2]],
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

function EndpointSection({endpoint}) {
  const [copied, setCopied] = useState(false);
  const copyValue = `${LLM_BASE_URL}${endpoint.path.replace(' (Streaming)', '')}`;

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
          <strong>Functionality</strong>
          <ul>
            {endpoint.notes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.ioGrid}>
        <TableCard title="Request Parameters" rows={endpoint.inputs} headerLabels={['Name', 'Type', 'Default', 'Description']} />
        <OutputCard rows={endpoint.outputs} />
      </div>
      {endpoint.id === 'llm-post-v1-chat-completions' && (
        <div style={{marginTop: '1.5rem'}}>
          <TableCard title="extra_body Parameters (Optional)" rows={extraBodyInputs} headerLabels={['Name', 'Type', 'Default', 'Description']} />
        </div>
      )}
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

export default function LlmPage() {
  return (
    <DocsLayout
      title="LLM API Documentation"
      description="Large Language Model chat completion service"
      sidebarSections={getSidebarSections('llm')}
      integration={llmQuickIntegration}
    >
      <section id="llm-introduction" className={styles.pageIntro}>
        <h1>Large Language Model Service</h1>
        <p>
          Generate intelligent chat completions using state-of-the-art language models. Our API is fully compatible with the OpenAI SDK, making integration seamless. Use <code>/v1/chat/completions</code> for both streaming and non-streaming responses.
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

        <div className={styles.callout} style={{marginTop: '1.5rem', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)'}}>
          <strong>OpenAI SDK Compatibility</strong>
          <p style={{marginTop: '0.5rem', marginBottom: 0}}>
            Our LLM service is fully compatible with the OpenAI Python and JavaScript SDKs. Simply set the <code>base_url</code> parameter to <code>https://voice.induslabs.io/v1</code> and use your API key.
          </p>
        </div>

        <div className={styles.callout} style={{marginTop: '1.5rem', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)'}}>
          <strong>Voice Agent Optimization</strong>
          <p style={{marginTop: '0.5rem', marginBottom: 0}}>
            Enable <code>finetune: true</code> in the <code>extra_body</code> parameter to use our fine-tuned model specifically optimized for voice agent use cases. This model delivers superior performance in conversational AI applications with more natural, context-aware responses tailored for voice interactions.
          </p>
        </div>

        <details className={styles.languageDropdown} style={{marginTop: '1.5rem'}}>
          <summary>Available Models</summary>
          <ul>
            {supportedModelsList.map(model => (
              <li key={model.id}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontWeight: 600}}>{model.name}</span>
                    <code>{model.id}</code>
                  </div>
                  <span style={{fontSize: '0.9rem', opacity: 0.8}}>{model.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section id="llm-authentication" className={styles.pageIntro} style={{marginTop: '2rem'}}>
        <h2>Authentication</h2>
        <p>
          All requests require authentication via the <code>Authorization</code> header with a Bearer token:
        </p>
        <CopyableCode language="bash">
          Authorization: Bearer YOUR_API_KEY
        </CopyableCode>
        <p style={{marginTop: '1rem'}}>
          Your API key can be found in your dashboard at{' '}
          <a href="https://playground.induslabs.io/register" target="_blank" rel="noopener noreferrer">
            playground.induslabs.io
          </a>
        </p>
      </section>

      <section id="llm-usage-examples" className={styles.pageIntro} style={{marginTop: '2rem'}}>
        <h2>Complete Usage Examples</h2>
        
        <h3 style={{marginTop: '1.5rem'}}>Simple Chat Completion</h3>
        <CopyableCode language="python">{`from openai import OpenAI

# Initialize the client
client = OpenAI(
    base_url="https://voice.induslabs.io/v1",
    api_key="YOUR_API_KEY"
)

# Simple completion
response = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[
        {"role": "user", "content": "Hello! How are you?"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)`}</CopyableCode>

        <h3 style={{marginTop: '1.5rem'}}>Voice Agent with Fine-tuned Model</h3>
        <CopyableCode language="python">{`from openai import OpenAI

# Initialize the client
client = OpenAI(
    base_url="https://voice.induslabs.io/v1",
    api_key="YOUR_API_KEY"
)

# Voice agent optimized completion
response = client.chat.completions.create(
    model="llama-4-maverick",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hi, introduce yourself?"}
    ],
    temperature=0.7,
    max_tokens=1000,
    extra_body={
        "finetune": True,  # Enable voice-optimized model
        "language": "en",
        "gender": "female",
        "accent": "american"
    }
)

print(response.choices[0].message.content)`}</CopyableCode>

        <h3 style={{marginTop: '1.5rem'}}>Multilingual Voice Agent (Hindi)</h3>
        <CopyableCode language="python">{`from openai import OpenAI

client = OpenAI(
    base_url="https://voice.induslabs.io/v1",
    api_key="YOUR_API_KEY"
)

# Hindi language with Indian accent
response = client.chat.completions.create(
    model="llama-4-maverick",
    messages=[
        {"role": "user", "content": "नमस्ते, आप कैसे हैं?"}
    ],
    temperature=0.7,
    max_tokens=1000,
    extra_body={
        "finetune": True,
        "language": "hi",
        "gender": "female",
        "accent": "indian"
    }
)

print(response.choices[0].message.content)`}</CopyableCode>

        <h3 style={{marginTop: '1.5rem'}}>Spanish Voice Agent</h3>
        <CopyableCode language="python">{`from openai import OpenAI

client = OpenAI(
    base_url="https://voice.induslabs.io/v1",
    api_key="YOUR_API_KEY"
)

# Spanish with Mexican accent
response = client.chat.completions.create(
    model="llama-4-maverick",
    messages=[
        {"role": "user", "content": "¿Puedes presentarte?"}
    ],
    temperature=0.7,
    max_tokens=1000,
    extra_body={
        "finetune": True,
        "language": "es",
        "gender": "female",
        "accent": "mexican"
    }
)

print(response.choices[0].message.content)`}</CopyableCode>

        <h3 style={{marginTop: '1.5rem'}}>Gender-Specific Voice Response</h3>
        <CopyableCode language="python">{`from openai import OpenAI

client = OpenAI(
    base_url="https://voice.induslabs.io/v1",
    api_key="YOUR_API_KEY"
)

# Male voice with British accent
response = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[
        {"role": "user", "content": "Tell me something interesting!"}
    ],
    temperature=0.7,
    max_tokens=1000,
    extra_body={
        "finetune": True,
        "language": "en",
        "gender": "male",
        "accent": "british"
    }
)

print(response.choices[0].message.content)`}</CopyableCode>

        <h3 style={{marginTop: '1.5rem'}}>Voice Agent with Stop Sequences</h3>
        <CopyableCode language="python">{`from openai import OpenAI

client = OpenAI(
    base_url="https://voice.induslabs.io/v1",
    api_key="YOUR_API_KEY"
)

# With stop sequences and max tokens
response = client.chat.completions.create(
    model="gpt-oss-120b",
    messages=[
        {"role": "user", "content": "Write a short motivational quote!"}
    ],
    temperature=0.7,
    max_tokens=150,
    stop=["!", "\n"],
    extra_body={
        "finetune": True,
        "language": "en"
    }
)

print(response.choices[0].message.content)`}</CopyableCode>
      </section>

      {endpoints.map(endpoint => (
        <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}
    </DocsLayout>
  );
}