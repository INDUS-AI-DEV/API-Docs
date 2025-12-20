import React, { useState } from 'react';
import DocsLayout from '@site/src/components/DocsLayout/DocsLayout';
import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import { getSidebarSections } from '@site/src/sidebarConfig';
import styles from './sdk.module.css';

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

# Speech-to-Text (Indus-STT-V1 Model)
result = client.stt.transcribe(
    file="audio.wav", 
    model="indus-stt-v1",
    noise_cancellation=True  # Enable noise suppression
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
        
        # Async STT (Streaming with Indus-STT-Hi-En Model)
        result = await client.stt.transcribe_async(
            "audio.wav",
            model="indus-stt-hi-en",
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
      <section id="sdk-introduction" className={styles.pageIntro}>
        <h1>IndusLabs Python SDK</h1>
        <p>
          Official Python SDK for IndusLabs Voice API - providing seamless Text-to-Speech (TTS)
          and Speech-to-Text (STT) capabilities with both synchronous and asynchronous support.
        </p>
        <div className={styles.callout}>
          <strong>Need an API Key?</strong> If you don't have an API key yet, you can create one here:{' '}
          <a
            href="https://playground.induslabs.io/register"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.apiKeyLink}
          >
            https://playground.induslabs.io/register
          </a>
        </div>
      </section>

      <section id="sdk-installation" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Installation</h2>
        <p className={styles.sectionDescription}>
          Install the SDK using pip. Requires Python 3.7 or higher.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="bash">pip install induslabs</CopyableCode>
        </div>
      </section>

      <section id="sdk-quick-start" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Quick Start</h2>
        <p className={styles.sectionDescription}>
          Initialize the client with your API key and start making requests immediately.
        </p>
        <div className={styles.codeExample}>
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
    model="indus-stt-v1",
    streaming=False,
    noise_cancellation=True  # Enable noise suppression
)
print(result.text)
if result.metrics:
    print(f"RTF: {result.metrics.rtf:.3f}")`}</CopyableCode>
        </div>
      </section>

      <section id="sdk-features" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Sync & Async APIs</div>
            <div className={styles.featureDescription}>
              Use synchronous methods for simple scripts or async for better performance
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Streaming Support</div>
            <div className={styles.featureDescription}>
              Start playing audio as soon as first bytes arrive
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Multiple Formats</div>
            <div className={styles.featureDescription}>
              Support for WAV, MP3, and PCM audio formats
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Concurrent Requests</div>
            <div className={styles.featureDescription}>
              Built-in support for parallel request processing
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Type Hints</div>
            <div className={styles.featureDescription}>
              Full type annotations for better IDE support
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Error Handling</div>
            <div className={styles.featureDescription}>
              Comprehensive error messages and exceptions
            </div>
          </div>
        </div>
      </section>

      <section id="tts-basic" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Text-to-Speech: Basic Usage</h2>
        <p className={styles.sectionDescription}>
          Convert text to speech with simple method calls. The SDK handles all API communication and response parsing.
        </p>
        <div className={styles.codeExample}>
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

      <section id="tts-streaming" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Streaming Audio</h2>
        <p className={styles.sectionDescription}>
          Enable streaming to receive audio chunks as they're generated, reducing latency for real-time applications.
        </p>
        <div className={styles.codeExample}>
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

      <section id="tts-file-objects" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Working with File Objects</h2>
        <p className={styles.sectionDescription}>
          Process audio in memory without saving to disk. Useful for temporary processing or immediate playback.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`import wave
from induslabs import Client

# Initialize Client
client = Client(api_key="your_api_key")

response = client.tts.speak(
    text="In-memory audio",
    voice="Indus-hi-maya"
)

# Get as file-like object (BytesIO)
audio_file = response.to_file_object()

# Get raw bytes
audio_bytes = response.get_audio_data()

# Pass to other libraries (e.g., standard wave module)
with wave.open(audio_file, 'rb') as wf:
    frames = wf.readframes(wf.getnframes())
    print(f"Read {len(frames)} frames from memory")`}</CopyableCode>
        </div>
      </section>

      <section id="tts-formats" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Audio Formats</h2>
        <p className={styles.sectionDescription}>
          Choose between WAV, MP3, or PCM formats based on your needs.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client

client = Client(api_key="your_api_key")

# WAV format (default, best quality)
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
        <div className={styles.callout}>
          <strong>Format Details</strong>
          <ul>
            <li><strong>WAV:</strong> 24kHz sample rate, 16-bit, mono - Best for quality</li>
            <li><strong>MP3:</strong> Compressed format - Best for smaller file sizes</li>
            <li><strong>PCM:</strong> Raw audio data - Best for direct processing</li>
          </ul>
        </div>
      </section>

      <section id="stt-basic" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Speech-to-Text: Basic Usage</h2>
        <p className={styles.sectionDescription}>
          Transcribe audio files using the unified <code>transcribe</code> method. By default, this uses the <code>indus-stt-v1</code> model in non-streaming mode.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client

client = Client(api_key="your_api_key")

# Transcribe audio file (Indus-STT-V1 model, Non-streaming)
result = client.stt.transcribe(
    file="audio.wav",
    model="indus-stt-v1",
    streaming=False,
    noise_cancellation=True  # Enable noise suppression for better quality
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

      <section id="stt-streaming" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Real-time Streaming</h2>
        <p className={styles.sectionDescription}>
          To enable streaming, you must set <code>streaming=True</code> and use the <code>indus-stt-hi-en</code> model. You can then provide an <code>on_segment</code> callback to receive partial results.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client, STTSegment

client = Client()

# 1. Define a callback to handle segments
def on_segment(segment: STTSegment):
    print(f"Segment: '{segment.text}'")

# 2. Transcribe with streaming enabled
print("Transcribing with real-time streaming...")

result = client.stt.transcribe(
    file="audio.wav",
    model="indus-stt-hi-en",        # Required for streaming
    streaming=True,       # Enable streaming
    language="hindi",
    on_segment=on_segment # Callback for real-time results
)

# 3. Access final results
print(f"\nComplete transcription: {result.text}")`}</CopyableCode>
        </div>
        <div className={styles.callout}>
          <strong>Important Notes:</strong>
          <ul>
            <li>The <code>indus-stt-v1</code> model does not support streaming. Attempting to use <code>streaming=True</code> with <code>model="indus-stt-v1"</code> will raise a ValueError.</li>
            <li>Noise cancellation is currently only supported in non-streaming mode. Using <code>noise_cancellation=True</code> with <code>streaming=True</code> will issue a warning and noise cancellation will not be applied.</li>
          </ul>
        </div>
      </section>

      <section id="stt-file-objects" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>STT with File Objects</h2>
        <p className={styles.sectionDescription}>
          Transcribe audio directly from open file handles or in-memory buffers.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from io import BytesIO
from induslabs import Client

client = Client(api_key="your_api_key")

# Example 1: Using an open file handle
with open("audio.wav", "rb") as f:
    result = client.stt.transcribe(
        file=f,
        model="indus-stt-v1",
        noise_cancellation=True
    )
    print(f"File handle transcription: {result.text}")

# Example 2: Using BytesIO (in-memory)
# Simulating loading bytes from somewhere (e.g. database or network)
with open("audio.wav", "rb") as f:
    audio_bytes = f.read()

audio_buffer = BytesIO(audio_bytes)
result = client.stt.transcribe(
    file=audio_buffer,
    model="indus-stt-v1",
    noise_cancellation=True
)
print(f"BytesIO transcription: {result.text}")`}</CopyableCode>
        </div>
      </section>

      <section id="stt-noise-cancellation" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Noise Cancellation</h2>
        <p className={styles.sectionDescription}>
          Enable server-side noise suppression to improve transcription quality for audio with background noise.
          This feature is available for non-streaming transcriptions with both <code>indus-stt-v1</code> and <code>indus-stt-hi-en</code> models.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client

client = Client(api_key="your_api_key")

# Example 1: Noise cancellation with Indus-STT-V1
result = client.stt.transcribe(
    file="noisy_audio.wav",
    model="indus-stt-v1",
    streaming=False,
    noise_cancellation=True  # Enable noise suppression
)
print(f"Transcription: {result.text}")
if result.metrics:
    print(f"RTF: {result.metrics.rtf:.3f}")

# Example 2: Noise cancellation with Indus-STT-Hi-En
result = client.stt.transcribe(
    file="noisy_audio.wav",
    model="indus-stt-hi-en",
    streaming=False,
    language="hindi",
    noise_cancellation=True
)
print(f"Transcription: {result.text}")`}</CopyableCode>
        </div>

        <div className={styles.callout}>
          <strong>Important Compatibility Notes:</strong>
          <ul>
            <li><strong>Non-Streaming Only:</strong> Noise cancellation is currently only supported in non-streaming mode (<code>streaming=False</code>).</li>
            <li><strong>Warning Behavior:</strong> If you set both <code>streaming=True</code> and <code>noise_cancellation=True</code>, the SDK will issue a UserWarning and noise cancellation will not be applied.</li>
            <li><strong>Model Support:</strong> Works with both <code>indus-stt-v1</code> and <code>indus-stt-hi-en</code> models.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: '600' }}>Example with Warning</h3>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`import warnings
from induslabs import Client

client = Client()

# This will trigger a warning
with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter("always")
    
    result = client.stt.transcribe(
        file="audio.wav",
        model="indus-stt-hi-en",
        streaming=True,              # Streaming enabled
        noise_cancellation=True,     # Noise cancellation requested
        language="hindi"
    )
    
    if caught:
        for warn in caught:
            print(f"Warning: {warn.message}")
            # Output: "Noise cancellation is only supported in non-streaming mode right now."

print(f"Result: {result.text}")`}</CopyableCode>
        </div>
      </section>

      <section id="async-api" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Async API</h2>
        <p className={styles.sectionDescription}>
          Use <code>transcribe_async</code> for non-blocking operations. You can run basic transcriptions or streaming sessions asynchronously.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`import asyncio
from induslabs import Client, STTSegment

async def main():
    async with Client(api_key="your_api_key") as client:
        
        # --- Example 1: Basic Async Transcription ---
        result = await client.stt.transcribe_async(
            "audio.wav", 
            model="indus-stt-v1",
            streaming=False,
            noise_cancellation=True
        )
        print(f"Result (Indus-STT-V1): {result.text}")

        # --- Example 2: Async Streaming with Indus-STT-Hi-En Model ---
        segments = []
        
        def on_segment(segment: STTSegment):
            segments.append(segment)
            print(f"Streamed: {segment.text}")

        # Pass the callback and required streaming parameters
        result = await client.stt.transcribe_async(
            "audio.wav",
            model="indus-stt-hi-en",      # Required for streaming
            streaming=True,     # Enable streaming
            language="hindi",
            on_segment=on_segment
        )
        
        print(f"Final Text (Indus-STT-Hi-En): {result.text}")

asyncio.run(main())`}</CopyableCode>
        </div>
      </section>

      <section id="concurrent-requests" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Concurrent Requests</h2>
        <p className={styles.sectionDescription}>
          Process multiple requests in parallel for better throughput. You can mix different models and modes (streaming/non-streaming) in concurrent tasks.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`import asyncio
from induslabs import Client

async def main():
    async with Client() as client:
        audio_file = "audio.wav"
        
        # Create multiple tasks with different configurations
        tasks = []
        
        # Task 1: Indus-STT-V1 model (non-streaming with noise cancellation)
        tasks.append(client.stt.transcribe_async(
            audio_file, model="indus-stt-v1", streaming=False, noise_cancellation=True
        ))
        
        # Task 2: Indus-STT-Hi-En model (non-streaming with noise cancellation)
        tasks.append(client.stt.transcribe_async(
            audio_file, model="indus-stt-hi-en", streaming=False, language="hindi", noise_cancellation=True
        ))
        
        # Task 3: Indus-STT-Hi-En model (streaming)
        tasks.append(client.stt.transcribe_async(
            audio_file, model="indus-stt-hi-en", streaming=True, language="hindi"
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

      <section id="response-objects" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Response Objects</h2>
        <p className={styles.sectionDescription}>
          Understanding the data structures returned by the SDK.
        </p>

        <h3>TTSResponse</h3>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client
client = Client()

# Get a response object
response = client.tts.speak(text="Hello", voice="Indus-hi-maya")

# Access Properties
print(f"Data Size: {len(response.content)} bytes")  # bytes: Raw audio data
print(f"Request ID: {response.request_id}")         # str: Unique request identifier
print(f"Sample Rate: {response.sample_rate}")       # int: Audio sample rate
print(f"Format: {response.format}")                 # str: Audio format

# Methods
response.save("output.wav")          # Save to file
raw_data = response.get_audio_data() # Get raw bytes`}</CopyableCode>
        </div>

        <h3>STTResponse</h3>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import Client
client = Client()

result = client.stt.transcribe("audio.wav")

# Properties
print(f"Text: {result.text}")                 # str: Final transcribed text
print(f"Segments: {len(result.segments)}")    # List[STTSegment]: All segments
print(f"Request ID: {result.request_id}")     # str: Unique request identifier

if result.has_error:
    print(f"Error: {result.error}")           # str: Error message if any

# Metrics (result.metrics)
if result.metrics:
    m = result.metrics
    print(f"Buffer Duration: {m.buffer_duration}s")
    print(f"Process Time: {m.transcription_time}s")
    print(f"Total Time: {m.total_time}s")
    print(f"RTF: {m.rtf}")                    # Real-time Factor

# Methods
data_dict = result.to_dict()                  # Get as dictionary`}</CopyableCode>
        </div>

        <h3>STTSegment</h3>
        <div className={styles.codeExample}>
          <CopyableCode language="python">{`from induslabs import STTSegment

def on_segment(segment: STTSegment):
    # This object is passed to your callback during streaming
    print(f"Text: {segment.text}")    # str: Text content of segment
    print(f"Start: {segment.start}s") # float: Start time in seconds
    print(f"End: {segment.end}s")     # float: End time in seconds`}</CopyableCode>
        </div>
      </section>

      <section id="environment-variables" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Environment Variables</h2>
        <p className={styles.sectionDescription}>
          Configure the SDK using environment variables for better security.
        </p>
        <div className={styles.codeExample}>
          <CopyableCode language="bash">{`# Set API key
export INDUSLABS_API_KEY="your_api_key_here"

# Now initialize without passing api_key
python -c "from induslabs import Client; client = Client()"

# Or in your .env file
INDUSLABS_API_KEY=your_api_key_here`}</CopyableCode>
        </div>
        <div className={styles.codeExample}>
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

      <section id="best-practices" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Best Practices</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Security</div>
            <div className={styles.featureDescription}>
              Never hardcode API keys. Use environment variables or secure key management systems.
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Performance</div>
            <div className={styles.featureDescription}>
              Use async API and concurrent requests for high-throughput applications.
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Memory</div>
            <div className={styles.featureDescription}>
              Use streaming for large audio files to reduce memory consumption.
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Retry Logic</div>
            <div className={styles.featureDescription}>
              Implement exponential backoff for transient network errors.
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Monitoring</div>
            <div className={styles.featureDescription}>
              Log request_id for debugging and track credits_used for cost management.
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Cleanup</div>
            <div className={styles.featureDescription}>
              Always close async sessions using context managers or explicit close() calls.
            </div>
          </div>
        </div>
      </section>

      <section id="troubleshooting" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Troubleshooting</h2>

        <div className={styles.methodSection}>
          <h3 className={styles.methodTitle}>Common Issues</h3>

          <div className={styles.troubleItem}>
            <h4 className={styles.troubleTitle}>Authentication Errors</h4>
            <div className={styles.codeExample}>
              <CopyableCode language="python">{`# Error: API key must be provided
# Solution: Set API key via parameter or environment variable
from induslabs import Client

# Method 1: Export ENV var
# export INDUSLABS_API_KEY="your_api_key"

# Method 2: Pass directly
client = Client(api_key="your_api_key")`}</CopyableCode>
            </div>
          </div>

          <div className={styles.troubleItem}>
            <h4 className={styles.troubleTitle}>Import Errors</h4>
            <div className={styles.codeExample}>
              <CopyableCode language="bash">{`# Error: No module named 'induslabs'
# Solution: Install the package
pip install induslabs

# Or upgrade to latest version
pip install --upgrade induslabs`}</CopyableCode>
            </div>
          </div>

          <div className={styles.troubleItem}>
            <h4 className={styles.troubleTitle}>Async Session Warnings</h4>
            <div className={styles.codeExample}>
              <CopyableCode language="python">{`# Warning: Unclosed client session
from induslabs import Client

# Solution 1: Use context manager (Recommended)
async with Client(api_key="key") as client:
    # Your code here
    pass  # Auto cleanup

# Solution 2: Explicit close
client = Client(api_key="key")
try:
    # Your code here
    pass
finally:
    await client.close()`}</CopyableCode>
            </div>
          </div>

          <div className={styles.troubleItem}>
            <h4 className={styles.troubleTitle}>File Format Errors</h4>
            <div className={styles.codeExample}>
              <CopyableCode language="python">{`# Error: ValueError: output_format must be 'wav', 'mp3', or 'pcm'
from induslabs import Client
client = Client()

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

      <section id="changelog" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Version History</h2>
        <div className={styles.callout}>
          <strong>v0.0.2 (Current)</strong>
          <ul>
            <li>Added comprehensive error handling</li>
            <li>Improved async session management</li>
            <li>Enhanced type hints and documentation</li>
            <li>Added voice management capabilities</li>
          </ul>
        </div>
      </section>

      <section id="support" className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Support & Resources</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>API Reference</div>
            <div className={styles.featureDescription}>
              View detailed REST API documentation for TTS and STT endpoints
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Community</div>
            <div className={styles.featureDescription}>
              Join our community for discussions, examples, and support
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Issues</div>
            <div className={styles.featureDescription}>
              Report bugs or request features on our issue tracker
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureTitle}>Contact</div>
            <div className={styles.featureDescription}>
              Reach out to our support team for enterprise inquiries
            </div>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}