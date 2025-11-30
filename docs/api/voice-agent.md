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

## Notes

- Replace the `api_key` with your own API key; do not commit keys to source control.
- The `agent_id` identifies the configured voice agent to connect to.
- Responses will be in `application/json` and include any session/connection details required to join the LiveKit room or control the agent.

If you want, I can expand this page with response schemas, curl examples that include headers for authorization rather than a secret in the body, SDK snippets (Node/Python), and a short walkthrough for wiring STT → NLU → TTS flows.
