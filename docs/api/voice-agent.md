---
title: Voice Agent
description: Build interactive voice agents that combine ASR, NLU, and TTS. Need an API Key? If you don't have an API key yet, you can create one here: https://playground.induslabs.io/register
---

# Voice Agent

This page describes the Voice Agent endpoints and example usage for building interactive voice experiences.

**Need an API Key?** If you don't have an API key yet, you can create one here: https://playground.induslabs.io/register

![Where to get your API key](/img/api-key-location.png)

_*Screenshot: where to find your API key. Create one at [playground.induslabs.io/register](https://playground.induslabs.io/register)._* 

## Overview

- Purpose: Create conversational voice agents for IVR, assistants, and voice apps.
- Components: Speech-to-Text (ASR), Natural Language Understanding (NLU) / dialog manager, and Text-to-Speech (TTS).

## Endpoints

Below are two endpoints you can call to interact with the voice agent functionality.

1) Get available agents

This endpoint expects a JSON object (dictionary) in the request body with the `api_key` field.

```bash
curl --location 'https://developer.induslabs.io/api/agents' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{"api_key": "4RzC13dC8ZUasNUwn1yJGi7bI1bwT1_U-t8oCfnSbBc"}'
```

2) Start / connect to a LiveKit session for a specific agent

This endpoint accepts a JSON body containing `api_key` and `agent_id`.

```bash
curl --location 'https://developer.induslabs.io/api/livekit' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{"api_key": "4RzC13dC8ZUasNUwn1yJGi7bI1bwT1_U-t8oCfnSbBc", "agent_id": "AGT_E882B100"}'
```

## React + TypeScript: Connect to LiveKit

Quick example of how to fetch your agents, request a LiveKit token for one of them, and join the room from a React app.

1) Install the LiveKit client

```bash
npm install livekit-client
```

2) Use a React component to fetch agents, request a session, and connect

```tsx
import { useEffect, useMemo, useState } from "react";
import { Room, RoomEvent } from "livekit-client";

const API_BASE = "https://developer.induslabs.io/api";
const API_KEY = "YOUR_API_KEY"; // or use an env var such as process.env.NEXT_PUBLIC_INDUS_API_KEY

type Agent = { agent_id: string; name?: string };
type LivekitSession = { url: string; token: string };

async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(`${API_BASE}/agents`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ api_key: API_KEY })
  });
  if (!res.ok) throw new Error("Failed to load agents");
  return res.json();
}

async function startLivekit(agentId: string): Promise<LivekitSession> {
  const res = await fetch(`${API_BASE}/livekit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ api_key: API_KEY, agent_id: agentId })
  });
  if (!res.ok) throw new Error("Failed to start LiveKit");
  return res.json(); // expected to include { url, token }
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
      setStatus("connecting");
      const { url, token } = await startLivekit(agentId);
      const lkRoom = new Room();
      lkRoom.on(RoomEvent.Connected, () => setStatus("connected"));
      lkRoom.on(RoomEvent.Disconnected, () => setStatus("disconnected"));
      await lkRoom.connect(url, token);
      setRoom(lkRoom);
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
}
```

The `/api/livekit` response should return the LiveKit server `url` and `token`. Provide your API key securely (e.g., environment variables) and add error handling/reconnect logic as needed for production apps.

## Notes

- Replace the `api_key` with your own API key; do not commit keys to source control.
- The `agent_id` identifies the configured voice agent to connect to.
- Responses will be in `application/json` and include any session/connection details required to join the LiveKit room or control the agent.

If you want, I can expand this page with response schemas, curl examples that include headers for authorization rather than a secret in the body, SDK snippets (Node/Python), and a short walkthrough for wiring STT → NLU → TTS flows.
