import React from "react";
import Link from "@docusaurus/Link";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import DocsLayout from "@site/src/components/DocsLayout/DocsLayout";
import CopyableCode from "@site/src/components/CopyableCode/CopyableCode";
import { getSidebarSections } from "@site/src/sidebarConfig";
import styles from "./api.module.css";

const agentSessionCode = `import asyncio
import os
from dotenv import load_dotenv

from livekit import agents
from livekit.agents import AgentSession, Agent
from livekit.plugins import openai, silero
from livekit.plugins.induslabs import TTS, STT

load_dotenv()

class VoiceAssistant(Agent):
    def __init__(self):
        super().__init__(
            instructions="You are a helpful voice assistant."
        )

async def entrypoint(ctx: agents.JobContext):
    # Initialize the AgentSession with IndusLabs TTS and STT
    session = AgentSession(
        stt=STT(),
        tts=TTS(voice="Indus-hi-Urvashi"),
        llm=openai.LLM(model="gpt-4o-mini"),
        vad=silero.VAD.load(),
    )
    
    await session.start(room=ctx.room, agent=VoiceAssistant())
    
    # Optionally trigger a proactive message from the agent
    await session.generate_reply(
        instructions="Greet the user warmly in Hindi."
    )

if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))`;

const ttsBasicCode = `import asyncio
from livekit.plugins.induslabs import TTS

async def synthesize_text():
    # Uses default voice "Indus-hi-Urvashi"
    tts = TTS()
    
    # Generate audio for the entire sentence
    chunk_stream = tts.synthesize("Namaste, aap kaise hain?")
    
    async for audio_bytes in chunk_stream:
        # Expected to receive the entire audio buffer here
        print(f"Synthesized audio chunk of size {len(audio_bytes.data)} bytes")

asyncio.run(synthesize_text())`;

const ttsStreamCode = `import asyncio
from livekit.plugins.induslabs import TTS

async def play_audio():
    tts = TTS(voice="Indus-hi-Urvashi")
    
    # Create an audio stream
    stream = tts.stream()
    
    # Push text sequentially
    stream.push("Namaste, ")
    stream.push("aap kaise hain?")
    stream.flush()

    # Consume the audio PCM frames
    async for event in stream:
        audio_frame = event.frame
        # Pipe this audio_frame into the LiveKit Room audio track
        print(f"Received audio frame: {len(audio_frame.data)} samples")

asyncio.run(play_audio())`;

const sttBasicCode = `from livekit.plugins.induslabs import STT

# Employs automatic language detection
stt = STT()

# Explicitly defining the language
stt = STT(language="hi")`;

const sttStreamCode = `import asyncio
from livekit.plugins.induslabs import STT
from livekit.agents.stt import SpeechEventType

async def transcribe_audio():
    # Initialize the STT model
    stt = STT(language="en")
    
    # Create an STT stream
    stream = stt.stream()

    # In a LiveKit agent, audio frames from the user are pushed into the stream automatically.
    # Below shows how the stream is consumed asynchronously:
    
    async for event in stream:
        if event.type == SpeechEventType.FINAL_TRANSCRIPT:
            transcript = event.alternatives[0].text
            print("Final Transcript:", transcript)
        elif event.type == SpeechEventType.INTERIM_TRANSCRIPT:
            transcript = event.alternatives[0].text
            print("Interim Transcript:", transcript)

asyncio.run(transcribe_audio())`;

export default function LiveKitPluginIntegration() {
  return (
    <DocsLayout
      title="LiveKit Plugin Integration"
      description="Integrate IndusLabs Text-to-Speech (TTS) and Speech-to-Text (STT) into your LiveKit Agents."
      sidebarSections={getSidebarSections("livekit-plugin")}
    >
      <section id="livekit-plugin-introduction" className={styles.pageIntro}>
        <h1>LiveKit Plugin Guide</h1>
        <p>
          This guide walks you through integrating the official LiveKit plugin
          for IndusLabs into your production voice agents. The plugin allows you
          to seamlessly connect our Text-to-Speech (TTS) and Speech-to-Text
          (STT) capabilities directly into your LiveKit agent pipelines.
        </p>
        <div className={styles.callout}>
          <strong>Installation</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            Install the plugin from PyPI using pip or uv:
          </p>
          <CopyableCode language="bash">{`pip install livekit-plugins-induslabs
# Or using uv:
uv add "livekit-agents[induslabs]"`}</CopyableCode>
        </div>
      </section>

      <section id="livekit-create-agent" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Creating a LiveKit Voice Agent</h2>
          <p>
            Using the <code>AgentSession</code> paradigm, you can plug in
            IndusLabs STT and TTS directly alongside your chosen LLM and Voice
            Activity Detection (VAD). Follow these steps to build your custom
            agent.
          </p>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 1: Setup Environment Variables
        </h3>
        <p>
          Before initializing the agent, supply your LiveKit server credentials
          and your IndusLabs API Key. This ensures secure authentication to our
          private model routers.
        </p>

        <div className={styles.callout} style={{ marginBottom: "1rem" }}>
          <strong>Need an API Key?</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            If you don't have an API key yet, you can create one here:{" "}
            <Link to="https://playground.induslabs.io/register">
              https://playground.induslabs.io/register
            </Link>
          </p>
        </div>

        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>Environment Initialization (Bash)</h4>
            <CopyableCode language="bash">
              {`export INDUSLABS_API_KEY="<your-induslabs-api-key>"

export LIVEKIT_URL="<your-livekit-url>"
export LIVEKIT_API_KEY="<your-livekit-api-key>"
export LIVEKIT_API_SECRET="<your-livekit-secret>"`}
            </CopyableCode>
          </div>
        </div>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            Never hardcode API keys directly in your repository. Always rely on
            a configured `.env` file or structured secret management injection
            for production scaling.
          </p>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 2: Initialize the AgentSession
        </h3>
        <p>
          Create a Python script that boots your <code>AgentSession</code>{" "}
          securely using the <code>livekit.plugins.induslabs</code> instances
          inside the context layer.
        </p>
        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>Agent Implementation (Python)</h4>
            <CopyableCode language="python">{agentSessionCode}</CopyableCode>
          </div>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 3: Run the Agent
        </h3>
        <p>
          You can execute your LiveKit agent locally in development mode by
          appending the <code>dev</code> argument to your python command.
        </p>
        <CopyableCode language="bash">python agent.py dev</CopyableCode>

        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            When deploying in production, ensure you host your LiveKit server
            and the Python application in the same geographic region (or as
            close as possible) to the <code>api.induslabs.io</code> endpoint.
            This minimizes audio routing latency and enables faster, more
            natural dialogue.
          </p>
        </div>
      </section>

      <section id="tts-usage" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Text-to-Speech (TTS) Implementation</h2>
          <p>
            The <code>TTS</code> class provided by{" "}
            <code>livekit.plugins.induslabs</code> supports both full audio
            chunk synthesis and real-time streaming audio generation.
          </p>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 1: Streaming Audio (Recommended)
        </h3>
        <p>
          For the lowest latency, use the <code>stream()</code> method to
          incrementally push text strings to the synthesizer and receive audio
          chunks instantaneously.
        </p>
        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>Streaming TTS Example (Python)</h4>
            <CopyableCode language="python">{ttsStreamCode}</CopyableCode>
          </div>
        </div>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            For interactive conversational agents, always prefer the{" "}
            <code>stream()</code> method over synthesized chunks. Streaming
            reduces the time-to-first-byte (TTFB), which is critical for natural
            voice replies without awkward pauses.
          </p>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 2: Standalone or Chunked Audio Synthesis
        </h3>
        <p>
          If generating longer audio segments offline, or if you want to use the
          TTS plugin <strong>completely standalone</strong> without a LiveKit{" "}
          <code>AgentSession</code>, you can synthesize the complete buffer at
          once. You can also generate audio via our REST API.
        </p>

        <Tabs
          defaultValue="python"
          values={[
            { label: "Python (Plugin)", value: "python" },
            { label: "cURL (REST API)", value: "curl" },
          ]}
        >
          <TabItem value="python">
            <div className={styles.responseExamples}>
              <div className={styles.responseExampleCard}>
                <h4>Chunked TTS Example (Python)</h4>
                <CopyableCode language="python">{ttsBasicCode}</CopyableCode>
              </div>
            </div>
          </TabItem>
          <TabItem value="curl">
            <div className={styles.responseExamples}>
              <div className={styles.responseExampleCard}>
                <h4>Standalone TTS Generation (cURL)</h4>
                <CopyableCode language="bash">{`curl -X POST "https://voice.induslabs.io/v1/audio/speech" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Namaste, IndusLabs plugin is ready.",
    "voice": "Indus-hi-Urvashi",
    "model": "indus-tts-v1",
    "api_key": "'$INDUSLABS_API_KEY'",
    "sample_rate": 24000
  }' \\
  -o test_audio.mp3`}</CopyableCode>
              </div>
            </div>
          </TabItem>
        </Tabs>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 3: Configuring the Voice
        </h3>
        <div className={styles.tableWrapper}>
          <table className={styles.parameterTable}>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>voice</code>
                </td>
                <td>
                  <code>str</code>
                </td>
                <td>
                  <code>"Indus-hi-Urvashi"</code>
                </td>
                <td>
                  <strong>(IndusLabs API)</strong> The identifier of the voice
                  to synthesize with.
                </td>
              </tr>
              <tr>
                <td>
                  <code>sample_rate</code>
                </td>
                <td>
                  <code>int</code>
                </td>
                <td>
                  <code>24000</code>
                </td>
                <td>
                  <strong>(IndusLabs API)</strong> Sample rate of the output PCM
                  audio in Hz.
                </td>
              </tr>
              <tr>
                <td>
                  <code>speed</code>
                </td>
                <td>
                  <code>float</code>
                </td>
                <td>
                  <code>1.0</code>
                </td>
                <td>
                  <strong>(IndusLabs API)</strong> Playback speed multiplier
                  (e.g. 1.5 for faster).
                </td>
              </tr>
              <tr>
                <td>
                  <code>pitch_shift</code>
                </td>
                <td>
                  <code>float</code>
                </td>
                <td>
                  <code>0.0</code>
                </td>
                <td>
                  <strong>(IndusLabs API)</strong> Pitch shift in semitones.
                </td>
              </tr>
              <tr>
                <td>
                  <code>loudness_db</code>
                </td>
                <td>
                  <code>float</code>
                </td>
                <td>
                  <code>0.0</code>
                </td>
                <td>
                  <strong>(IndusLabs API)</strong> Gain adjustment in decibels.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="stt-usage" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Speech-to-Text (STT) Implementation</h2>
          <p>
            The <code>STT</code> class captures audio streams natively from the
            LiveKit room, chunks them using Voice Activity Detection (VAD), and
            sends them to the IndusLabs endpoints asynchronously.
          </p>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 1: Reading Transcripts
        </h3>
        <p>
          As audio frames enter the pipeline from the AgentSession, they are
          grouped and processed. You can loop over the generated{" "}
          <code>SpeechStream</code> to evaluate interim or final transcript
          events. This can also be used in standalone applications fetching
          transcripts natively.
        </p>

        <Tabs
          defaultValue="python"
          values={[
            { label: "Python (Plugin)", value: "python" },
            { label: "cURL (REST API)", value: "curl" },
          ]}
        >
          <TabItem value="python">
            <div className={styles.responseExamples}>
              <div className={styles.responseExampleCard}>
                <h4>Streaming STT Example (Python)</h4>
                <CopyableCode language="python">{sttStreamCode}</CopyableCode>
              </div>
            </div>
          </TabItem>
          <TabItem value="curl">
            <div className={styles.responseExamples}>
              <div className={styles.responseExampleCard}>
                <h4>Standalone STT Upload (cURL)</h4>
                <CopyableCode language="bash">{`curl -N -X POST "https://voice.induslabs.io/v1/audio/transcribe" \\
  -H "accept: text/event-stream" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@audio.mp3" \\
  -F "api_key=$INDUSLABS_API_KEY" \\
  -F "language=en"`}</CopyableCode>
              </div>
            </div>
          </TabItem>
        </Tabs>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 2: Configuring Languages
        </h3>
        <p>
          You can optionally pass a <code>language</code> explicit parameter to
          bypass auto-detection and tighten model constraints.
        </p>
        <div className={styles.responseExamples}>
          <div className={styles.responseExampleCard}>
            <h4>STT Language Setting (Python)</h4>
            <CopyableCode language="python">{sttBasicCode}</CopyableCode>
          </div>
        </div>

        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            Although STT supports auto-detection via `STT()`, explicitly passing
            a locale like <code>language="hi"</code> or{" "}
            <code>language="en"</code> yields faster detection times and
            consistently higher accuracy bounds for mono-lingual users.
          </p>
        </div>

        <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          Step 3: Configuring the STT
        </h3>
        <div className={styles.tableWrapper}>
          <table className={styles.parameterTable}>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>sample_rate</code>
                </td>
                <td>
                  <code>int</code>
                </td>
                <td>
                  <code>16000</code>
                </td>
                <td>
                  <strong>(Plugin)</strong> Expected sample rate of inbound
                  frames from LiveKit.
                </td>
              </tr>
              <tr>
                <td>
                  <code>language</code>
                </td>
                <td>
                  <code>str</code>
                </td>
                <td>
                  <code>None</code>
                </td>
                <td>
                  <strong>(IndusLabs API)</strong> Language code (e.g.,{" "}
                  <code>"hi"</code>). Auto-detects if omitted.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "1rem" }}>
          After finalizing the SDK integration, explore the{" "}
          <Link to="/sdk">SDK Docs</Link> for complex audio formats or review
          the native REST APIs via the <Link to="/tts">TTS APIs</Link> and{" "}
          <Link to="/stt">STT APIs</Link>.
        </p>
      </section>
    </DocsLayout>
  );
}
