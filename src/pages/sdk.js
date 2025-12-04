import React, { useState } from 'react';
import DocsLayout from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import {getSidebarSections} from '@site/src/sidebarConfig';

const styles = {
  pageIntro: {
    scrollMarginTop: '120px',
    background: '#ffffff',
    border: '1px solid rgba(16, 22, 64, 0.08)',
    borderRadius: '22px',
    padding: 'clamp(2rem, 5vw, 3rem)',
    boxShadow: '0 28px 52px rgba(10, 14, 64, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  sectionCard: {
    scrollMarginTop: '120px',
    background: '#ffffff',
    border: '1px solid rgba(16, 22, 64, 0.08)',
    borderRadius: '24px',
    padding: 'clamp(2rem, 5vw, 3rem)',
    boxShadow: '0 30px 66px rgba(10, 14, 64, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    marginBottom: '2rem',
  },
  sectionTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.75rem',
    fontWeight: '600',
  },
  sectionDescription: {
    margin: '0 0 1.5rem 0',
    color: '#454a6e',
    lineHeight: '1.6',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.25rem',
    marginTop: '1.5rem',
  },
  featureCard: {
    background: 'rgba(84, 104, 255, 0.06)',
    border: '1px solid rgba(84, 104, 255, 0.12)',
    borderRadius: '16px',
    padding: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#2730a6',
  },
  featureDescription: {
    fontSize: '0.9rem',
    color: '#4b4f73',
    lineHeight: '1.5',
  },
  callout: {
    borderRadius: '16px',
    background: 'rgba(84, 104, 255, 0.12)',
    borderLeft: '4px solid #5468ff',
    padding: '1rem 1.3rem',
    color: '#2f3460',
    marginTop: '1rem',
  },
  codeExample: {
    marginTop: '1.5rem',
  },
  methodSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'rgba(84, 104, 255, 0.04)',
    borderRadius: '12px',
    border: '1px solid rgba(84, 104, 255, 0.08)',
  },
  methodTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#232849',
  },
  paramTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  tableHeader: {
    background: 'rgba(84, 104, 255, 0.08)',
    fontWeight: '600',
    padding: '0.6rem',
    textAlign: 'left',
    borderBottom: '2px solid rgba(16, 22, 64, 0.12)',
  },
  tableCell: {
    padding: '0.6rem',
    borderBottom: '1px solid rgba(16, 22, 64, 0.08)',
  },
  inlineCode: {
    background: 'rgba(84, 104, 255, 0.12)',
    padding: '0.2rem 0.4rem',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.9em',
  },
};

const quickIntegrationLanguages = [
  {
    id: 'installation',
    label: 'Installation',
    language: 'bash',
    code: `pip install induslabs`,
  },
  {
    id: 'basic',
    label: 'Basic Usage',
    language: 'python',
    code: `from induslabs import Client

# Initialize client
client = Client(api_key="your_api_key_here")

# Text-to-Speech
response = client.tts.speak(
    text="नमस्ते, यह एक टेस्ट है",
    voice="Indus-hi-maya",
    language="hi-IN"
)
response.save("output.wav")

# Speech-to-Text (Default Model)
result = client.stt.transcribe(
    file="audio.wav", 
    model="default"
)
print(result.text)`,
  },
  {
    id: 'async',
    label: 'Async Usage',
    language: 'python',
    code: `import asyncio
from induslabs import Client

async def main():
    async with Client(api_key="your_api_key") as client:
        # Async TTS
        response = await client.tts.speak_async(
            text="Async speech synthesis",
            voice="Indus-hi-maya"
        )
        
        # Async STT (Streaming with Hi-En Model)
        result = await client.stt.transcribe_async(
            "audio.wav",
            model="hi-en",
            streaming=True,
            language="hindi"
        )
        print(result.text)

asyncio.run(main())`,
  },
];

export default function SdkPage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Official Python SDK for IndusLabs Voice API"
      sidebarSections={getSidebarSections('sdk')}
      integration={{
        title: 'Quick Integration',
        description: 'Get started with the Python SDK in seconds.',
        defaultLanguage: 'installation',
        languages: quickIntegrationLanguages,
      }}
    >
      <section id="sdk-introduction" style={styles.pageIntro}>
        <h1>IndusLabs Python SDK</h1>
        <p>
          Official Python SDK for IndusLabs Voice API - providing seamless Text-to-Speech (TTS) 
          and Speech-to-Text (STT) capabilities with both synchronous and asynchronous support.
        </p>
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
      </section>

      <section id="sdk-installation" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Installation</h2>
        <p style={styles.sectionDescription}>
          Install the SDK using pip. Requires Python 3.7 or higher.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="bash">pip install induslabs</CopyableCode>
        </div>
      </section>

      <section id="sdk-quick-start" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Quick Start</h2>
        <p style={styles.sectionDescription}>
          Initialize the client with your API key and start making requests immediately.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client

# Initialize with API key
client = Client(api_key="your_api_key_here")

# Or use environment variable
# export INDUSLABS_API_KEY="your_api_key_here"
client = Client()

# Text-to-Speech
response = client.tts.speak(
    text="Hello, this is a test",
    voice="Indus-hi-maya"
)
response.save("output.wav")

# Speech-to-Text
result = client.stt.transcribe(
    file="audio.wav", 
    model="default",
    streaming=False
)
print(result.text)
if result.metrics:
    print(f"RTF: {result.metrics.rtf:.3f}")`}</CopyableCode>
        </div>
      </section>

      <section id="sdk-features" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Features</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🔄 Sync & Async APIs</div>
            <div style={styles.featureDescription}>
              Use synchronous methods for simple scripts or async for better performance
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>⚡ Streaming Support</div>
            <div style={styles.featureDescription}>
              Start playing audio as soon as first bytes arrive
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🎵 Multiple Formats</div>
            <div style={styles.featureDescription}>
              Support for WAV, MP3, and PCM audio formats
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🚀 Concurrent Requests</div>
            <div style={styles.featureDescription}>
              Built-in support for parallel request processing
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>📝 Type Hints</div>
            <div style={styles.featureDescription}>
              Full type annotations for better IDE support
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🛡️ Error Handling</div>
            <div style={styles.featureDescription}>
              Comprehensive error messages and exceptions
            </div>
          </div>
        </div>
      </section>

      <section id="tts-basic" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Text-to-Speech: Basic Usage</h2>
        <p style={styles.sectionDescription}>
          Convert text to speech with simple method calls. The SDK handles all API communication and response parsing.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client

client = Client(api_key="your_api_key")

# Simple synthesis
response = client.tts.speak(
    text="Hello, this is a test",
    voice="Indus-hi-maya"
)

# Save to file
response.save("output.wav")

# Access metadata
print(f"Sample Rate: {response.sample_rate}Hz")
print(f"Channels: {response.channels}")
print(f"Format: {response.format}")
print(f"Request ID: {response.request_id}")`}</CopyableCode>
        </div>
      </section>

      <section id="tts-streaming" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Streaming Audio</h2>
        <p style={styles.sectionDescription}>
          Enable streaming to receive audio chunks as they're generated, reducing latency for real-time applications.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`
"""
Streaming Text-to-Speech Example

This example demonstrates how to stream audio from the IndusLabs TTS API
and play it in real-time while simultaneously saving to a file.

Requirements:
    pip install induslabs pyaudio

Note: PyAudio may require additional system dependencies:
    - Ubuntu/Debian: sudo apt-get install portaudio19-dev python3-pyaudio
    - macOS: brew install portaudio
    - Windows: PyAudio wheels available on PyPI
"""

import queue
import threading
import time
import pyaudio
from induslabs import Client


class StreamingTTSPlayer:
    """Handles real-time streaming playback of TTS audio with buffering"""
    
    def __init__(self, sample_rate=24000, channels=1, chunk_size=4096):
        self.sample_rate = sample_rate
        self.channels = channels
        self.chunk_size = chunk_size
        self.audio_queue = queue.Queue()
        self.streaming_complete = False
        self.playing = False
        
        self.p = pyaudio.PyAudio()
        self.stream = None
    
    def _stream_audio(self, response, save_path=None):
        """Receives audio chunks from API and queues them for playback"""
        file_handle = open(save_path, "wb") if save_path else None
        
        try:
            for chunk in response.iter_bytes(chunk_size=self.chunk_size):
                self.audio_queue.put(chunk)
                if file_handle:
                    file_handle.write(chunk)
        finally:
            self.streaming_complete = True
            if file_handle:
                file_handle.close()
    
    def _play_audio(self):
        """Plays audio chunks from the queue"""
        while self.playing:
            try:
                chunk = self.audio_queue.get(timeout=0.05)
                if chunk is None:
                    break
                self.stream.write(chunk)
            except queue.Empty:
                if self.streaming_complete:
                    break
    
    def play(self, response, save_path=None, prebuffer_seconds=1.0):
        """
        Stream and play TTS audio in real-time
        
        Args:
            response: Streaming response from client.tts.speak()
            save_path: Optional path to save audio file
            prebuffer_seconds: Seconds of audio to buffer before playback starts
        """
        # Open audio output stream
        self.stream = self.p.open(
            format=pyaudio.paInt16,
            channels=self.channels,
            rate=self.sample_rate,
            output=True,
            frames_per_buffer=self.chunk_size
        )
        
        self.playing = True
        self.streaming_complete = False
        
        # Start streaming thread
        stream_thread = threading.Thread(
            target=self._stream_audio,
            args=(response, save_path),
            daemon=True
        )
        stream_thread.start()
        
        # Wait for initial buffer
        chunks_needed = int((self.sample_rate * self.channels * 2 / self.chunk_size) * prebuffer_seconds)
        print(f"Buffering {prebuffer_seconds}s of audio...")
        
        while self.audio_queue.qsize() < chunks_needed:
            if self.streaming_complete:
                break
            time.sleep(0.1)
        
        print("Playing audio...\n")
        
        # Start playback thread
        play_thread = threading.Thread(target=self._play_audio, daemon=True)
        play_thread.start()
        
        # Wait for completion
        stream_thread.join()
        play_thread.join()
        
        # Cleanup
        self.stream.stop_stream()
        self.stream.close()
    
    def close(self):
        """Release audio resources"""
        self.p.terminate()


def main():
    # Initialize the client
    client = Client()  # Uses INDUSLABS_API_KEY environment variable
    
    # Text to convert to speech
    text = """
    Artificial intelligence is transforming the way we live and work. 
    From self-driving cars to personalized healthcare, AI is revolutionizing 
    various industries. Machine learning algorithms are becoming more advanced, 
    enabling systems to recognize patterns and make predictions with incredible accuracy.
    """
    
    print("=" * 60)
    print("IndusLabs Streaming TTS Example")
    print("=" * 60)
    
    # Create streaming response
    response = client.tts.speak(
        text=text,
        voice="Indus-hi-maya",
        stream=True  # Enable streaming
    )
    
    # Create player and play audio
    player = StreamingTTSPlayer()
    
    try:
        # Play audio in real-time and save to file
        player.play(response, save_path="output.wav", prebuffer_seconds=1.0)
        print("Playback complete!")
        print("Audio saved to: output.wav")
    finally:
        player.close()


if __name__ == "__main__":
    main()`}</CopyableCode>
        </div>
      </section>

      <section id="tts-file-objects" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Working with File Objects</h2>
        <p style={styles.sectionDescription}>
          Process audio in memory without saving to disk. Useful for temporary processing or immediate playback.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`response = client.tts.speak(
    text="In-memory audio",
    voice="Indus-hi-maya"
)

# Get as file-like object (BytesIO)
audio_file = response.to_file_object()

# Get raw bytes
audio_bytes = response.get_audio_data()

# Pass to other libraries
import wave
with wave.open(audio_file, 'rb') as wf:
    frames = wf.readframes(wf.getnframes())`}</CopyableCode>
        </div>
      </section>

      <section id="tts-formats" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Audio Formats</h2>
        <p style={styles.sectionDescription}>
          Choose between WAV, MP3, or PCM formats based on your needs.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`# WAV format (default, best quality)
wav_response = client.tts.speak(
    text="WAV format audio",
    voice="Indus-hi-maya",
    output_format="wav"
)

# MP3 format (smaller file size)
mp3_response = client.tts.speak(
    text="MP3 format audio",
    voice="Indus-hi-maya",
    output_format="mp3"
)

# PCM format (raw audio data)
pcm_response = client.tts.speak(
    text="PCM format audio",
    voice="Indus-hi-maya",
    output_format="pcm"
)`}</CopyableCode>
        </div>
        <div style={styles.callout}>
          <strong>Format Details</strong>
          <ul>
            <li><strong>WAV:</strong> 24kHz sample rate, 16-bit, mono - Best for quality</li>
            <li><strong>MP3:</strong> Compressed format - Best for smaller file sizes</li>
            <li><strong>PCM:</strong> Raw audio data - Best for direct processing</li>
          </ul>
        </div>
      </section>

      <section id="stt-basic" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Speech-to-Text: Basic Usage</h2>
        <p style={styles.sectionDescription}>
          Transcribe audio files using the unified <code>transcribe</code> method. By default, this uses the <code>default</code> model in non-streaming mode.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client

client = Client(api_key="your_api_key")

# Transcribe audio file (Default model, Non-streaming)
result = client.stt.transcribe(
    file="audio.wav",
    model="default",
    streaming=False
)

# Access transcription
print(f"Transcription: {result.text}")

# Access detailed metrics
print(f"Request ID: {result.request_id}")

if result.metrics:
    print(f"Audio Duration: {result.metrics.buffer_duration:.2f}s")
    print(f"Processing Time: {result.metrics.transcription_time:.2f}s")
    print(f"Real-time Factor (RTF): {result.metrics.rtf:.3f}")`}</CopyableCode>
        </div>
      </section>

      <section id="stt-streaming" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Real-time Streaming</h2>
        <p style={styles.sectionDescription}>
          To enable streaming, you must set <code>streaming=True</code> and use the <code>hi-en</code> model. You can then provide an <code>on_segment</code> callback to receive partial results.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client, STTSegment

client = Client()

# 1. Define a callback to handle segments
def on_segment(segment: STTSegment):
    print(f"📝 Segment: '{segment.text}' [{segment.start:.2f}s]")

# 2. Transcribe with streaming enabled
print("Transcribing with real-time streaming...")

result = client.stt.transcribe(
    file="audio.wav",
    model="hi-en",        # Required for streaming
    streaming=True,       # Enable streaming
    language="hindi",
    on_segment=on_segment # Callback for real-time results
)

# 3. Access final results
print(f"\n✅ Complete transcription: {result.text}")`}</CopyableCode>
        </div>
        <div style={styles.callout}>
          <strong>Note:</strong> The <code>default</code> model does not support streaming. Attempting to use <code>streaming=True</code> with <code>model="default"</code> will raise a ValueError.
        </div>
      </section>

      <section id="stt-file-objects" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>STT with File Objects</h2>
        <p style={styles.sectionDescription}>
          Transcribe audio directly from open file handles or in-memory buffers.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`from io import BytesIO

# Example 1: Using an open file handle
with open("audio.wav", "rb") as f:
    result = client.stt.transcribe(
        file=f,
        model="default"
    )
    print(result.text)

# Example 2: Using BytesIO (in-memory)
# assuming 'audio_bytes' contains your audio data
audio_buffer = BytesIO(audio_bytes)
result = client.stt.transcribe(
    file=audio_buffer,
    model="default"
)`}</CopyableCode>
        </div>
      </section>

      <section id="async-api" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Async API</h2>
        <p style={styles.sectionDescription}>
          Use <code>transcribe_async</code> for non-blocking operations. You can run basic transcriptions or streaming sessions asynchronously.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`import asyncio
from induslabs import Client, STTSegment

async def main():
    async with Client(api_key="your_api_key") as client:
        
        # --- Example 1: Basic Async Transcription ---
        result = await client.stt.transcribe_async(
            "audio.wav", 
            model="default",
            streaming=False
        )
        print(f"Result (Default): {result.text}")

        # --- Example 2: Async Streaming with Hi-En Model ---
        segments = []
        
        def on_segment(segment: STTSegment):
            segments.append(segment)
            print(f"Streamed: {segment.text}")

        # Pass the callback and required streaming parameters
        result = await client.stt.transcribe_async(
            "audio.wav",
            model="hi-en",      # Required for streaming
            streaming=True,     # Enable streaming
            language="hindi",
            on_segment=on_segment
        )
        
        print(f"Final Text (Hi-En): {result.text}")

asyncio.run(main())`}</CopyableCode>
        </div>
      </section>

      <section id="concurrent-requests" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Concurrent Requests</h2>
        <p style={styles.sectionDescription}>
          Process multiple requests in parallel for better throughput. You can mix different models and modes (streaming/non-streaming) in concurrent tasks.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`import asyncio
from induslabs import Client

async def main():
    async with Client() as client:
        audio_file = "audio.wav"
        
        # Create multiple tasks with different configurations
        tasks = []
        
        # Task 1: Default model (non-streaming)
        tasks.append(client.stt.transcribe_async(
            audio_file, model="default", streaming=False
        ))
        
        # Task 2: Hi-En model (non-streaming)
        tasks.append(client.stt.transcribe_async(
            audio_file, model="hi-en", streaming=False, language="hindi"
        ))
        
        # Task 3: Hi-En model (streaming)
        tasks.append(client.stt.transcribe_async(
            audio_file, model="hi-en", streaming=True, language="hindi"
        ))
        
        # Run concurrently
        results = await asyncio.gather(*tasks)
        
        for i, result in enumerate(results, 1):
            print(f"Result {i}: {result.text[:30]}...")
            if result.metrics:
                print(f"  RTF: {result.metrics.rtf:.3f}")

asyncio.run(main())`}</CopyableCode>
        </div>
      </section>

      <section id="response-objects" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Response Objects</h2>
        <p style={styles.sectionDescription}>
          Understanding the data structures returned by the SDK.
        </p>
        
        <h3>TTSResponse</h3>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`response = client.tts.speak(text="Hello", voice="Indus-hi-maya")

# Properties
response.content          # bytes: Raw audio data
response.request_id       # str: Unique request identifier
response.sample_rate      # int: Audio sample rate
response.format           # str: Audio format

# Methods
response.save("output.wav")          # Save to file
response.get_audio_data()            # Get raw bytes`}</CopyableCode>
        </div>

        <h3>STTResponse</h3>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`result = client.stt.transcribe("audio.wav")

# Properties
result.text                          # str: Final transcribed text
result.segments                      # List[STTSegment]: All segments
result.request_id                    # str: Unique request identifier
result.has_error                     # bool: If an error occurred
result.error                         # str: Error message if any

# Metrics (result.metrics)
result.metrics.buffer_duration       # float: Duration of audio processed
result.metrics.transcription_time    # float: Time spent processing
result.metrics.total_time            # float: Total round-trip time
result.metrics.rtf                   # float: Real-time Factor (<1 is faster than real-time)

# Methods
result.to_dict()                     # Get as dictionary`}</CopyableCode>
        </div>

        <h3>STTSegment</h3>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`def on_segment(segment: STTSegment):
    print(segment.text)     # str: Text content of segment
    print(segment.start)    # float: Start time in seconds
    print(segment.end)      # float: End time in seconds`}</CopyableCode>
        </div>
      </section>

      <section id="environment-variables" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Environment Variables</h2>
        <p style={styles.sectionDescription}>
          Configure the SDK using environment variables for better security.
        </p>
        <div style={styles.codeExample}>
          <CopyableCode language="bash">{`# Set API key
export INDUSLABS_API_KEY="your_api_key_here"

# Now initialize without passing api_key
python -c "from induslabs import Client; client = Client()"

# Or in your .env file
INDUSLABS_API_KEY=your_api_key_here`}</CopyableCode>
        </div>
        <div style={styles.codeExample}>
          <CopyableCode language="python">{`import os
from induslabs import Client

# Load from environment
client = Client()

# Or load from .env file using python-dotenv
from dotenv import load_dotenv
load_dotenv()

client = Client()  # Automatically uses INDUSLABS_API_KEY`}</CopyableCode>
        </div>
      </section>

      <section id="best-practices" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Best Practices</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🔐 Security</div>
            <div style={styles.featureDescription}>
              Never hardcode API keys. Use environment variables or secure key management systems.
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>⚡ Performance</div>
            <div style={styles.featureDescription}>
              Use async API and concurrent requests for high-throughput applications.
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>💾 Memory</div>
            <div style={styles.featureDescription}>
              Use streaming for large audio files to reduce memory consumption.
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🔄 Retry Logic</div>
            <div style={styles.featureDescription}>
              Implement exponential backoff for transient network errors.
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>📊 Monitoring</div>
            <div style={styles.featureDescription}>
              Log request_id for debugging and track credits_used for cost management.
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🧹 Cleanup</div>
            <div style={styles.featureDescription}>
              Always close async sessions using context managers or explicit close() calls.
            </div>
          </div>
        </div>
      </section>

      <section id="troubleshooting" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Troubleshooting</h2>
        
        <div style={styles.methodSection}>
          <h3 style={styles.methodTitle}>Common Issues</h3>
          
          <div style={{marginTop: '1rem'}}>
            <h4 style={{color: '#2730a6', marginBottom: '0.5rem'}}>Authentication Errors</h4>
            <div style={styles.codeExample}>
              <CopyableCode language="python">{`# Error: API key must be provided
# Solution: Set API key via parameter or environment variable
export INDUSLABS_API_KEY="your_api_key"

# Or
client = Client(api_key="your_api_key")`}</CopyableCode>
            </div>
          </div>

          <div style={{marginTop: '1.5rem'}}>
            <h4 style={{color: '#2730a6', marginBottom: '0.5rem'}}>Import Errors</h4>
            <div style={styles.codeExample}>
              <CopyableCode language="bash">{`# Error: No module named 'induslabs'
# Solution: Install the package
pip install induslabs

# Or upgrade to latest version
pip install --upgrade induslabs`}</CopyableCode>
            </div>
          </div>

          <div style={{marginTop: '1.5rem'}}>
            <h4 style={{color: '#2730a6', marginBottom: '0.5rem'}}>Async Session Warnings</h4>
            <div style={styles.codeExample}>
              <CopyableCode language="python">{`# Warning: Unclosed client session
# Solution: Use context manager or explicit close
async with Client(api_key="key") as client:
    # Your code here
    pass  # Auto cleanup

# Or
client = Client(api_key="key")
try:
    # Your code here
    pass
finally:
    await client.close()`}</CopyableCode>
            </div>
          </div>

          <div style={{marginTop: '1.5rem'}}>
            <h4 style={{color: '#2730a6', marginBottom: '0.5rem'}}>File Format Errors</h4>
            <div style={styles.codeExample}>
              <CopyableCode language="python">{`# Error: ValueError: output_format must be 'wav', 'mp3', or 'pcm'
# Solution: Use valid format
response = client.tts.speak(
    text="Test",
    voice="Indus-hi-maya",
    output_format="wav"  # Must be: wav, mp3, or pcm
)`}</CopyableCode>
            </div>
          </div>
        </div>
      </section>

      <section id="changelog" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Version History</h2>
        <div style={styles.callout}>
          <strong>v0.0.2 (Current)</strong>
          <ul>
            <li>Added comprehensive error handling</li>
            <li>Improved async session management</li>
            <li>Enhanced type hints and documentation</li>
            <li>Added voice management capabilities</li>
          </ul>
        </div>
      </section>

      <section id="support" style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>Support & Resources</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>📚 API Reference</div>
            <div style={styles.featureDescription}>
              View detailed REST API documentation for TTS and STT endpoints
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>💬 Community</div>
            <div style={styles.featureDescription}>
              Join our community for discussions, examples, and support
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>🐛 Issues</div>
            <div style={styles.featureDescription}>
              Report bugs or request features on our issue tracker
            </div>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureTitle}>📧 Contact</div>
            <div style={styles.featureDescription}>
              Reach out to our support team for enterprise inquiries
            </div>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}