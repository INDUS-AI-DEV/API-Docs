import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import styles from './VoiceAgentCarousel.module.css';

// --- Icons & Visuals ---

const ReactLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="8" fill="#61DAFB" />
        <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="2" fill="none" />
        <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(120 50 50)" />
    </svg>
);

const TypeScriptLogo = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#3178C6" />
        <path d="M22 50H42V56H35V80H29V56H22V50Z" fill="white" />
        <path d="M45 72.5C45 69.5 47.5 67.5 52 67.5C55 67.5 57 68.5 57 68.5V66C57 64 55.5 63 53 63C50.5 63 48.5 64 47 66L44 62C46 59.5 49.5 58 54 58C60 58 63 61 63 66V80H57V78C56 79.5 53.5 80.5 51 80.5C47 80.5 45 78 45 72.5ZM52 75.5C54.5 75.5 57 74 57 72V71.5C57 71.5 55 70.5 52.5 70.5C50 70.5 49 71.5 49 73C49 74.5 50 75.5 52 75.5Z" fill="white" />
    </svg>
);

const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const FileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const VoiceWaveform = () => (
    <div className={styles.waveformContainer}>
        {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.waveBar} />
        ))}
    </div>
);

// --- Components ---

function CodeCard({ code, language = 'bash', fileName }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={styles.codeCard}>
            <div className={styles.codeHeader}>
                <div className={styles.codeBlockInfo}>
                    {fileName && (
                        <span className={styles.fileName}>
                            <FileIcon /> {fileName}
                        </span>
                    )}
                </div>
                <button
                    type="button"
                    className={styles.copyButton}
                    onClick={handleCopy}
                    aria-label="Copy code"
                >
                    {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
                </button>
            </div>
            <pre className={styles.codeContent}>
                <code>{code}</code>
            </pre>
        </div>
    );
}

function InfoBox({ children, type = 'info' }) {
    const icons = {
        info: '',
        warning: '',
        tip: '',
        file: ''
    };
    return (
        <div className={`${styles.infoBox} ${styles[`infoBox${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}>
            <span className={styles.infoIcon}>{icons[type]}</span>
            <div>{children}</div>
        </div>
    );
}

// --- Slides ---

const OverviewSlide = ({ isActive }) => (
    <div className={styles.slide} aria-hidden={!isActive} {...(!isActive && { inert: true })}>
        <div className={styles.leftPane}>
            <h3 className={styles.slideTitle}>Voice Agents in<br />React + TypeScript</h3>
            <p className={styles.slideDescription}>
                Build real-time AI voice conversations using LiveKit and Indus Labs APIs.
            </p>
            <div className={styles.stepsOverview}>
                <div className={styles.stepPreview}>
                    <span className={styles.stepNum}>1</span> Get API Key
                </div>
                <div className={styles.stepPreview}>
                    <span className={styles.stepNum}>2</span> Install LiveKit
                </div>
                <div className={styles.stepPreview}>
                    <span className={styles.stepNum}>3</span> Fetch Agents
                </div>
                <div className={styles.stepPreview}>
                    <span className={styles.stepNum}>4</span> Connect & Talk
                </div>
            </div>
        </div>
        <div className={styles.rightPane}>
            <div className={styles.visualContainer}>
                <div className={styles.logoGroup}>
                    <div className={styles.logo}><ReactLogo /></div>
                    <span className={styles.plusSign}>+</span>
                    <div className={styles.logo}><TypeScriptLogo /></div>
                </div>
                <VoiceWaveform />
            </div>
        </div>
    </div>
);

const GetApiKeySlide = ({ isActive }) => (
    <div className={styles.slide} aria-hidden={!isActive} {...(!isActive && { inert: true })}>
        <div className={styles.leftPane}>
            <span className={styles.stepBadge}>Step 1</span>
            <h3 className={styles.slideTitle}>Get Your API Key</h3>

            <div className={styles.instructionsList}>
                <div className={styles.instruction}>
                    <span className={styles.instructionNum}>1</span>
                    <div className={styles.instructionContent}>
                        <strong>Sign Up</strong>
                        <p>Go to <a href="https://playground.induslabs.io/register">playground.induslabs.io</a></p>
                    </div>
                </div>
                <div className={styles.instruction}>
                    <span className={styles.instructionNum}>2</span>
                    <div className={styles.instructionContent}>
                        <strong>Copy Key</strong>
                        <p>Copy key from <strong>Settings → API Keys</strong></p>
                    </div>
                </div>
            </div>

            <InfoBox type="file">
                Create <code>.env.local</code> in your project root.
            </InfoBox>
        </div>
        <div className={styles.rightPane}>
            <div className={styles.imageContainer}>
                <img
                    src="/img/api-key-location.png"
                    alt="Indus Labs Dashboard API Key Section"
                    className={styles.slideImage}
                />
            </div>
        </div>
    </div>
);

const InstallLiveKitSlide = ({ isActive }) => (
    <div className={styles.slide} aria-hidden={!isActive} {...(!isActive && { inert: true })}>
        <div className={styles.leftPane}>
            <span className={styles.stepBadge}>Step 2</span>
            <h3 className={styles.slideTitle}>Install LiveKit</h3>
            <p className={styles.slideDescription}>
                Install the LiveKit client SDK to handle real-time audio streaming in your browser.
            </p>
            <InfoBox type="tip">
                LiveKit manages the WebSocket connection and WebRTC audio handling for you.
            </InfoBox>
        </div>
        <div className={styles.rightPane}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center', minHeight: 0 }}>
                <CodeCard
                    code={`npm install livekit-client`}
                    language="bash"
                    fileName="Terminal (npm)"
                />
                <CodeCard
                    code={`yarn add livekit-client`}
                    language="bash"
                    fileName="Terminal (yarn)"
                />
            </div>
        </div>
    </div>
);

const FetchAgentsSlide = ({ isActive }) => (
    <div className={styles.slide} aria-hidden={!isActive} {...(!isActive && { inert: true })}>
        <div className={styles.leftPane}>
            <span className={styles.stepBadge}>Step 3</span>
            <h3 className={styles.slideTitle}>Create Component</h3>
            <p className={styles.slideDescription}>
                Logic to fetch agents and connect to LiveKit.
            </p>
            <div className={styles.instructionsList}>
                <div className={styles.instruction}>
                    <span className={styles.instructionNum}>1</span>
                    <div className={styles.instructionContent}>
                        <strong>Fetch Agents</strong>
                        <p><code>POST /api/agents</code> to get list</p>
                    </div>
                </div>
                <div className={styles.instruction}>
                    <span className={styles.instructionNum}>2</span>
                    <div className={styles.instructionContent}>
                        <strong>Start Session</strong>
                        <p><code>POST /api/livekit</code> to get token</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.rightPane}>
            <CodeCard
                code={`// src/components/VoiceAgent.tsx
import { useEffect, useState } from "react";
import { Room, RoomEvent, LocalAudioTrack } from "livekit-client";

const API_KEY = process.env.NEXT_PUBLIC_INDUS_API_KEY;
const API_BASE = "https://developer.induslabs.io/api";

type Agent = { agent_id: string; name?: string };

export default function VoiceAgent() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [status, setStatus] = useState("idle");

  // 1. Fetch Agents
  useEffect(() => {
    fetch(\`\${API_BASE}/agents\`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        accept: "application/json" 
      },
      body: JSON.stringify({ api_key: API_KEY })
    })
      .then(res => res.json())
      .then(setAgents)
      .catch(console.error);
  }, []);

  // 2. Connect to LiveKit
  const connect = async (agentId: string) => {
    setStatus("connecting");
    // Step 1: Get LiveKit credentials from Indus Labs API
    const res = await fetch(\`\${API_BASE}/livekit\`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        accept: "application/json" 
      },
      body: JSON.stringify({ api_key: API_KEY, agent_id: agentId })
    });
    if (!res.ok) throw new Error("Failed to start LiveKit");
    const response = await res.json();
    const livekitInfo = response.data || response;
    
    // Step 2: Get ws_url from backend endpoint
    const tokenRes = await fetch("http://staging-api.induslabs.io/api/generate-livekit-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: livekitInfo.livekit_api_key,
        api_secret: livekitInfo.livekit_api_secret,
        room: agentId,
        participant: "user"
      })
    });
    if (!tokenRes.ok) throw new Error("Failed to generate LiveKit token");
    const tokenData = await tokenRes.json();
    // Response: { ws_url: "wss://livekit.induslabs.io?access_token=..." }
    // Parse ws_url to extract base URL and token
    const { ws_url } = tokenData;
    const urlObj = new URL(ws_url);
    const baseUrl = \`\${urlObj.protocol}//\${urlObj.host}\`;
    const token = urlObj.searchParams.get('access_token');
    
    const lkRoom = new Room();
    lkRoom.on(RoomEvent.Connected, async () => {
      setStatus("connected");
      // Enable microphone
      const { createLocalAudioTrack } = await import("livekit-client");
      const audioTrack = await createLocalAudioTrack();
      await lkRoom.localParticipant.publishAudioTrack(audioTrack);
    });
    lkRoom.on(RoomEvent.Disconnected, () => setStatus("disconnected"));
    // Connect with URL and token as separate parameters
    await lkRoom.connect(baseUrl, token);
    setRoom(lkRoom);
  };

  // Cleanup on unmount
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
}`}
                language="tsx"
                fileName="src/components/VoiceAgent.tsx"
            />
        </div>
    </div>
);

const UseComponentSlide = ({ isActive }) => (
    <div className={styles.slide} aria-hidden={!isActive} {...(!isActive && { inert: true })}>
        <div className={styles.leftPane}>
            <span className={styles.stepBadge}>Step 4</span>
            <h3 className={styles.slideTitle}>Use Logic</h3>
            <p className={styles.slideDescription}>
                Import and render the voice agent in your main page.
            </p>
            <InfoBox type="tip">
                Ensure you allow microphone permissions when the browser prompts you.
            </InfoBox>
            <Link to="#voice-agents-react-typescript" className={styles.ctaButton}>
                View Full Documentation →
            </Link>
        </div>
        <div className={styles.rightPane}>
            <CodeCard
                code={`// src/app/page.tsx
import VoiceAgent from "@/components/VoiceAgent";

export default function Home() {
  return (
    <main>
      <h1>My AI Voice App</h1>
      <VoiceAgent />
    </main>
  );
}`}
                language="tsx"
                fileName="src/app/page.tsx"
            />
        </div>
    </div>
);

const slides = [
    OverviewSlide,
    GetApiKeySlide,
    InstallLiveKitSlide,
    FetchAgentsSlide,
    UseComponentSlide,
];

// --- Main Carousel ---

export default function VoiceAgentCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const trackRef = useRef(null);

    const goNext = useCallback(() => {
        if (currentSlide < slides.length - 1) setCurrentSlide(p => p + 1);
    }, [currentSlide]);

    const goPrev = useCallback(() => {
        if (currentSlide > 0) setCurrentSlide(p => p - 1);
    }, [currentSlide]);

    const goToSlide = (index) => setCurrentSlide(index);

    // Keyboard & Swipe logic can stay similar, just ensure it targets this region
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Simple check to avoid capturing typing
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goNext, goPrev]);

    return (
        <div
            className={styles.carouselWrapper}
            role="region"
            aria-label="Voice Agent Quick Start"
        >
            <div className={styles.carouselHeader}>
                <h2 className={styles.carouselTitle}> Quick Start</h2>
                <div className={styles.slideCounter}>
                    {currentSlide + 1} / {slides.length}
                </div>
            </div>

            <div className={styles.carouselContainer}>
                <div
                    className={styles.carouselTrack}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((SlideComponent, index) => (
                        <SlideComponent key={index} isActive={index === currentSlide} />
                    ))}
                </div>

                {/* Floating Navigation Overlay */}
                <div className={styles.navOverlay}>
                    <div className={styles.dots}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={index === currentSlide}
                            />
                        ))}
                    </div>
                    <div className={styles.navControls}>
                        <button
                            className={styles.navButton}
                            onClick={goPrev}
                            disabled={currentSlide === 0}
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            className={styles.navButton}
                            onClick={goNext}
                            disabled={currentSlide === slides.length - 1}
                            aria-label="Next Slide"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
