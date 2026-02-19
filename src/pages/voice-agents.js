import React from 'react';
import DocsLayout, { MethodBadge } from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import { getSidebarSections } from '@site/src/sidebarConfig';
import VoiceAgentCarousel from '@site/src/components/VoiceAgentCarousel/VoiceAgentCarousel';


import styles from './api.module.css';

const API_BASE = 'https://staging-api.induslabs.io/api';

const agentsCurl = `curl -N -X POST \\
  "https://api.induslabs.io/api/developer/agents" \\
  -H "accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{"api_key":"YOUR_API_KEY"}'`;

const livekitCurl = `curl -N -X POST \\
  "https://api.induslabs.io/api/developer/livekit" \\
  -H "accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{"api_key":"YOUR_API_KEY","agent_id":"AGENT_ID"}'`;

const reactTsAgents = `type Agent = { agent_id: string; name?: string };

const resp = await fetch("https://api.induslabs.io/api/developer/agents", {
  method: "POST",
  headers: { "Content-Type": "application/json", accept: "application/json" },
  body: JSON.stringify({ api_key: process.env.NEXT_PUBLIC_INDUS_API_KEY }),
});
if (!resp.ok) throw new Error("Failed to load agents");
const agents: Agent[] = await resp.json();`;

const reactTsLivekit = `import { useEffect, useMemo, useState } from "react";
import { Room, RoomEvent, createLocalAudioTrack } from "livekit-client";

const API_BASE = "https://api.induslabs.io/api";
const API_KEY = "YOUR_API_KEY"; // Prefer an env var like process.env.NEXT_PUBLIC_INDUS_API_KEY

type Agent = { agent_id: string; name?: string };
type LivekitSession = { url: string; token: string };

async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(\`\${API_BASE}/developer/agents\`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ api_key: API_KEY })
  });
  if (!res.ok) throw new Error("Failed to load agents");
  const data = await res.json();
  // Handle response format: { data: { agents: [...] } }
  return data.data?.agents || data.agents || [];
}

async function startLivekit(agentId: string): Promise<LivekitSession> {
  // Step 1: Get LiveKit credentials from Indus Labs API
  const res = await fetch(\`\${API_BASE}/developer/livekit\`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ api_key: API_KEY, agent_id: agentId })
  });
  if (!res.ok) throw new Error("Failed to start LiveKit");
  const response = await res.json();
  const data = response.data || response;
  
  // Extract token and host URL
  const { token, livekit_host_url } = data;
  
  if (!token || !livekit_host_url) {
    throw new Error("Missing token or livekit_host_url in response");
  }
  
  return { url: livekit_host_url, token };
}

export function VoiceAgentLivekit() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchAgents().then(setAgents).catch(console.error);
  }, []);

  const connect = useMemo(
    () => async (agentId: string) => {
      try {
        setStatus("connecting");
        const { url, token } = await startLivekit(agentId);
        const lkRoom = new Room();
        
        lkRoom.on(RoomEvent.Connected, async () => {
          setStatus("connected");
          // Enable microphone to send audio to agent
          try {
            const audioTrack = await createLocalAudioTrack();
            await lkRoom.localParticipant.publishTrack(audioTrack);
          } catch (err) {
            console.error("Failed to enable microphone:", err);
          }
        });
        
        lkRoom.on(RoomEvent.Disconnected, () => {
          setStatus("disconnected");
        });
        
        // Subscribe to remote audio tracks (agent's voice)
        lkRoom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
          if (track.kind === "audio") {
            const audioElement = track.attach();
            audioElement.setAttribute('autoplay', 'true');
            audioElement.setAttribute('playsinline', 'true');
            document.body.appendChild(audioElement);
            audioElement.play().catch(err => {
              console.warn('Autoplay blocked:', err);
            });
          }
        });
        
        // Connect with correct protocol handling
        let connectUrl = url;
        if (connectUrl.startsWith('https://')) connectUrl = connectUrl.replace('https://', 'wss://');
        else if (connectUrl.startsWith('http://')) connectUrl = connectUrl.replace('http://', 'ws://');
        else if (!connectUrl.startsWith('ws')) connectUrl = 'wss://' + connectUrl;

        await lkRoom.connect(connectUrl, token);
        setRoom(lkRoom);
      } catch (err) {
        console.error("Connection failed:", err);
        setStatus("error");
      }
    },
    []
  );

  useEffect(() => {
    return () => room?.disconnect();
  }, [room]);

  if (!agents.length) return <p>Loading agents...</p>;

  return (
    <div>
      <p>Status: {status}</p>
      {agents.map((agent) => (
        <button key={agent.agent_id} onClick={() => connect(agent.agent_id)}>
          Join {agent.name || agent.agent_id}
        </button>
      ))}
    </div>
  );
}`;

const reactTsLivekitQuick = `import { Room } from "livekit-client";

// Step 1: Get LiveKit credentials from Indus Labs API
const resp = await fetch("https://api.induslabs.io/api/developer/livekit", {
  method: "POST",
  headers: { "Content-Type": "application/json", accept: "application/json" },
  body: JSON.stringify({
    api_key: process.env.NEXT_PUBLIC_INDUS_API_KEY,
    agent_id: "AGENT_ID"
  }),
});
if (!resp.ok) throw new Error("Failed to start LiveKit");
const response = await resp.json();
const { token, livekit_host_url } = response.data || response;

// Step 2: Connect to LiveKit room
const room = new Room();

// IMPORTANT: Force WebSocket protocol (wss://) to prevent HTTP validation 404s
let host = livekit_host_url;
if (host.startsWith('https://')) host = host.replace('https://', 'wss://');
else if (host.startsWith('http://')) host = host.replace('http://', 'ws://');
else if (!host.startsWith('ws')) host = 'wss://' + host;

await room.connect(host, token);
// add RoomEvent listeners and enable microphone as needed`;

const voiceAgentsIntegration = {
  title: 'Quick Integration',
  description: 'Reference snippets for discovering agents and connecting to a LiveKit session.',
  defaultApi: 'get-agents',
  apis: [
    {
      id: 'get-agents',
      label: 'POST /api/agents',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

          url = "https://api.induslabs.io/api/developer/agents"
          payload = {"api_key": "YOUR_API_KEY"}

          resp = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=30)
          resp.raise_for_status()
          print(resp.json())`,
        },
        {
          id: 'javascript',
          label: 'JavaScript (fetch)',
          language: 'javascript',
          code: `const url = "https://api.induslabs.io/api/developer/agents";
const payload = { api_key: "YOUR_API_KEY" };

const resp = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
  body: JSON.stringify(payload),
});
if (!resp.ok) throw new Error(\`Request failed: \${resp.status}\`);
console.log(await resp.json());`,
        },
        {
          id: 'react-typescript',
          label: 'React + TypeScript',
          language: 'tsx',
          code: reactTsAgents,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: agentsCurl,
        },
      ],
    },
    {
      id: 'post-livekit',
      label: 'POST /api/livekit',
      defaultLanguage: 'curl',
      languages: [
        {
          id: 'python-rest',
          label: 'Python (REST API)',
          language: 'python',
          code: `import requests

      url = "https://api.induslabs.io/api/developer/livekit"
      payload = {"api_key": "YOUR_API_KEY", "agent_id": "AGT_E882B100"}

      resp = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=30)
      resp.raise_for_status()
      print(resp.json())`,
        },
        {
          id: 'javascript',
          label: 'JavaScript (fetch)',
          language: 'javascript',
          code: `const url = "https://api.induslabs.io/api/developer/livekit";
const payload = { api_key: "YOUR_API_KEY", agent_id: "AGT_E882B100" };

const resp = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
  body: JSON.stringify(payload),
});
if (!resp.ok) throw new Error(\`Request failed: \${resp.status}\`);
console.log(await resp.json());`,
        },
        {
          id: 'react-typescript',
          label: 'React + TypeScript',
          language: 'tsx',
          code: reactTsLivekitQuick,
        },
        {
          id: 'curl',
          label: 'cURL',
          language: 'bash',
          code: livekitCurl,
        },
      ],
    },
  ],
};

export default function VoiceAgentsPage() {
  const endpoints = [
    {
      id: 'va-post-api-agents',
      method: 'POST',
      path: '/api/developer/agents',
      title: 'List Available Agents',
      description: 'Returns a list of configured voice agents available in the developer environment.',
      notes: ['Discover configured agents for your organization or developer environment.'],
      inputs: [
        { name: 'api_key', type: 'string', defaultValue: 'required', description: 'API key used for authentication.' },
      ],
      outputs: [
        { name: '200 OK', type: 'application/json', defaultValue: '-', description: 'List of agents and metadata.' },
        { name: '401 Unauthorized', type: 'application/json', defaultValue: '-', description: 'Missing or invalid credentials.' },
      ],
      examples: [
        { label: 'cURL', language: 'bash', code: agentsCurl },
        { label: 'Python', language: 'python', code: `import requests\n\nurl = "https://api.induslabs.io/api/developer/agents"\npayload = {"api_key": "YOUR_API_KEY"}\n\nresp = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=30)\nresp.raise_for_status()\nprint(resp.json())` },
        { label: 'React + TypeScript', language: 'tsx', code: reactTsAgents },
      ],
    },
    {
      id: 'va-post-api-livekit',
      method: 'POST',
      path: '/api/developer/livekit',
      title: 'Start / Connect LiveKit Session',
      description: 'Request LiveKit session details for a given agent so clients can join the voice session.',
      notes: ['Returns a direct access token and host URL for LiveKit connection.'],
      inputs: [
        { name: 'api_key', type: 'string', defaultValue: 'required', description: 'API key used for authentication.' },
        { name: 'agent_id', type: 'string', defaultValue: 'required', description: 'ID of the agent to connect to.' },
      ],
      outputs: [
        { name: '200 OK', type: 'application/json', defaultValue: '-', description: 'LiveKit connection details and metadata.' },
        { name: '401 Unauthorized', type: 'application/json', defaultValue: '-', description: 'Missing or invalid credentials.' },
      ],
      examples: [
        { label: 'cURL', language: 'bash', code: livekitCurl },
        { label: 'Python', language: 'python', code: `import requests\n\nurl = "https://api.induslabs.io/api/developer/livekit"\npayload = {"api_key": "YOUR_API_KEY", "agent_id": "AGT_E882B100"}\n\nresp = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=30)\nresp.raise_for_status()\nprint(resp.json())` },
        { label: 'React + TypeScript', language: 'tsx', code: reactTsLivekitQuick },
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
    const copyValue = `https://developer.induslabs.io${endpoint.path}`;
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



  return (
    <DocsLayout
      title="Voice Agents"
      description="Voice agents: agent discovery and LiveKit connection endpoints"
      sidebarSections={getSidebarSections('voice-agents')}
      integration={voiceAgentsIntegration}
    >
      <section id="voice-agents-introduction" className={styles.pageIntro}>
        <h1>Voice Agents</h1>
        <p>
          Build interactive voice experiences by combining Speech-to-Text, NLU, and Text-to-Speech. The endpoints below
          let you discover configured agents and obtain LiveKit session details to connect to an agent.
        </p>

        <div className={styles.apiKeyNotice} style={{
          background: 'rgba(84, 104, 255, 0.08)',
          border: '1px solid rgba(84, 104, 255, 0.2)',
          borderRadius: '16px',
          padding: '1.2rem 1.5rem',
          marginTop: '1rem',
        }}>
          <p style={{ margin: 0 }}>
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
      </section>

      <section style={{
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        position: 'relative'
      }}>
        <VoiceAgentCarousel />
      </section>



      {endpoints.map(endpoint => (
        <EndpointSection key={endpoint.id} endpoint={endpoint} />
      ))}
      <section id="voice-agents-react-typescript" className={styles.endpointSection}>
        <div className={styles.endpointHeader}>
          <code className={styles.endpointPath}>React + TypeScript</code>
        </div>
        <h3 className={styles.anchorTitle}>Integrate with LiveKit</h3>
        <p>
          Example of fetching agents, requesting a LiveKit session for one agent, and connecting to the room from a React app.
        </p>
        <div className={styles.callout}>
          <strong>Install LiveKit client</strong>
          <ul>
            <li><code>npm install livekit-client</code></li>
          </ul>
        </div>
        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>React + TypeScript component</h4>
            <CopyableCode language="tsx">{reactTsLivekit}</CopyableCode>
          </div>
        </div>
        <p style={{ marginTop: '0.5rem' }}>
          The <code>/api/livekit</code> response includes the <code>token</code> and <code>livekit_host_url</code> needed to connect. Supply your API key via environment variables in production.
        </p>
      </section>
    </DocsLayout >
  );
}
