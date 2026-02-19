import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import DocsLayout from '@site/src/components/DocsLayout/DocsLayout';
import { getSidebarSections } from '@site/src/sidebarConfig';
import styles from './api.module.css';

function GuideImage({ src, alt, caption }) {
  return (
    <div className={styles.imagePlaceholder}>
      <img src={src} alt={alt} />
      {caption && <p className={styles.imagePlaceholderCaption}>{caption}</p>}
    </div>
  );
}

const quickStartSteps = [
  {
    id: 'overview',
    title: 'Overview',
    subtitle: 'Get Started with Indus.io',
    image: '/img/quickstart-dashboard.png',
    imageAlt: 'IndusLabs Studio dashboard with feature cards and usage snapshot',
    content: [
      'Indus.io (IndusLabs Studio) is a voice AI platform for building conversational voice agents.',
      'You define agents with a name, voice (TTS), and language model (LLM).',
      'The platform handles STT, LLM conversations, and TTS in one place.',
      'Access everything from the dashboard or integrate via API and SDK.',
    ],
    recommendation: 'If you’re new, follow the guide once end-to-end, then repeat it with one small change (prompt or voice) so you can clearly see cause → effect.',
    targetId: 'understanding-indus-overview',
  },
  {
    id: 'create-agent',
    title: 'Create Your First Agent',
    subtitle: 'Step 1: Create New Agent',
    image: '/img/quickstart-create-agent.png',
    imageAlt: 'Create New Agent modal with agent name, type selection, and template options',
    content: [
      'Click "Create New Agent" from the dashboard.',
      'Choose an agent name (e.g., "Customer support bot").',
      'Select agent type: "Single prompt agent" or "Conversational flow agent".',
      'Pick a template: Start from blank, or use Loan Recovery, Receptionist, Healthcare, Lead Qualification.',
    ],
    recommendation: 'Start with a blank template and a simple name that matches your use case (e.g. “Appointment Booking”) so testing feels concrete.',
    targetId: 'understanding-indus-first-agent',
  },
  {
    id: 'agent-tab',
    title: 'Configure Agent Tab',
    subtitle: 'Step 2: Define Behavior',
    image: '/img/quickstart-agent-tab.png',
    imageAlt: 'Agent tab with System prompt, First message, Call Infields, and Call Outcomes',
    content: [
      'Set the System prompt: main instruction for the AI (e.g., "You are a helpful AI voice assistant").',
      'Add First message (optional): opening line the agent speaks.',
      'Configure Call Infields and Call Outcomes (optional): structured data to collect.',
      'Use Save Draft to save, or Publish when ready to go live.',
    ],
    recommendation: 'Make your System prompt specific (role + goal + do/don’t rules). Keep it short so you can iterate quickly after each test call.',
    targetId: 'understanding-indus-first-agent',
  },
  {
    id: 'call-fields',
    title: 'Call Infields & Outcomes',
    subtitle: 'Step 3: Capture Structured Data',
    image: '/img/quickstart-call-fields.png',
    imageAlt: 'Call Infields and Call Outcomes configuration with field names, types, and descriptions',
    content: [
      'Call Infields: Define data the agent should collect (e.g., customer_name as Text Input).',
      'Call Outcomes: Define results to track (e.g., order_number with description for support/billing).',
      'Set Field Type (Text Input, Number, etc.) and toggle Visible to show/hide during calls.',
      'Click "Save Infield(s)" or "Save Outcome(s)" to apply, or Add Another to collect more fields.',
    ],
    recommendation: 'Start with 1–2 essential fields (name, reason for call). Add more only after you confirm the agent reliably captures the basics.',
    targetId: 'understanding-indus-first-agent',
  },
  {
    id: 'config',
    title: 'Configure Model & Voice',
    subtitle: 'Step 4: Set Intelligence & Speech',
    image: '/img/quickstart-config.png',
    imageAlt: 'Config tab showing Intelligence Engine, Speech To Text, and Text To Speech settings',
    content: [
      'Intelligence Engine: Choose LLM (e.g., openai/gpt-oss-120b or groq).',
      'Adjust Temperature (focused vs creative), Max Tokens, and Context Turns.',
      'Speech To Text: Select provider (Indus.ai) and language (e.g., Hindi).',
      'Text To Speech: Set voice model (e.g., Indus-hi-maya) for agent replies.',
    ],
    recommendation: 'Change one setting at a time (only voice, or only language, or only temperature) so you can tell exactly what improved or broke.',
    targetId: 'understanding-indus-first-agent',
  },
  {
    id: 'workflow',
    title: 'Advanced: Workflow & Tools',
    subtitle: 'Optional: Build Complex Flows',
    image: '/img/quickstart-workflow.png',
    imageAlt: 'Workflow canvas with Start node, Subagent node, and configuration panel',
    content: [
      'Workflow: Build visual flows (Start → Subagent) for multi-step conversations.',
      'In each node, set label, conversation goal, voice, eagerness, and LLM model.',
      'Tools: Enable workflow-level tools (Detect Language, Transfer To Agent, End Conversation, etc.).',
      'First Message & Infields: Set the agent’s opening phrase and define structured data fields (Infields/Outcomes) to capture key information during the call.',
    ],
    recommendation: 'Only add workflow/tools after your basic prompt works well in Test Call—otherwise it’s harder to debug what changed.',
    targetId: 'understanding-indus-first-agent',
  },
  {
    id: 'voice-sessions',
    title: 'Test Call & Voice Sessions',
    subtitle: 'See a full call flow from your browser',
    image: '/img/quickstart-test-call.png',
    imageAlt: 'Voice session flow showing real-time conversation',
    content: [
      'Use the Test Call tab to experience a full end-to-end voice session in the browser.',
      'Start a Web Call, speak to the agent, and listen to the real-time responses.',
      'Watch how STT, LLM, and TTS work together before you integrate any APIs.',
      'Re-run Test Call after each change to your agent so you can hear the effect immediately.',
    ],
    recommendation: 'Keep a simple “pass/fail” checklist (greeting, info gathering, closing). When it consistently passes, you’re ready for API integration.',
    targetId: 'understanding-indus-voice-sessions',
  },
];

function QuickStartSlider() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  return (
    <div className={styles.quickStartGuide}>
      <h2 className={styles.quickStartTitle}>Quick Start Guide</h2>
      <p className={styles.quickStartSubtitle}>
        Follow these steps to go from sign-in to a working Voice Agent. Scroll through to see each step with visual guides.
      </p>
      <div className={styles.quickStartScrollContainer}>
        {quickStartSteps.map((step, index) => (
          <div key={step.id} className={styles.quickStartStep} id={`quickstart-step-${step.id}`}>
            <div className={styles.stepImageContainer}>
              <button
                type="button"
                className={styles.stepImageButton}
                onClick={() => setLightbox({ src: step.image, alt: step.imageAlt })}
                aria-label="Open screenshot in full size"
              >
                <img src={step.image} alt={step.imageAlt} className={styles.stepImage} />
              </button>
            </div>
            <div className={styles.stepContentContainer}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepSubtitle}>{step.subtitle}</p>
                </div>
              </div>
              <ul className={styles.stepContentList}>
                {step.content.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.stepContentItem}>{item}</li>
                ))}
              </ul>
              {step.recommendation && (
                <div className={styles.callout} style={{ marginTop: '0.75rem' }}>
                  <strong>Recommendation</strong>
                  <p style={{ margin: '0.5rem 0 0 0' }}>{step.recommendation}</p>
                </div>
              )}
              <button
                className={styles.stepJumpButton}
                onClick={() => {
                  const element = document.getElementById(step.targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Read full guide →
              </button>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className={styles.quickStartLightboxBackdrop}
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <div className={styles.quickStartLightbox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.quickStartLightboxClose}
              onClick={() => setLightbox(null)}
              aria-label="Close image"
              title="Close"
            >
              ×
            </button>
            <img className={styles.quickStartLightboxImg} src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function UnderstandingIndusPage() {
  return (
    <DocsLayout
      title="Understanding Indus.io"
      description="Beginner's guide: from sign-in to a working Voice Agent on Indus.io"
      sidebarSections={getSidebarSections('understanding-indus')}
    >
      <section id="understanding-indus-quick-start" className={styles.quickStartSection}>
        <QuickStartSlider />
      </section>

      <section id="understanding-indus-overview" className={styles.pageIntro}>
        <h1>Understanding Indus.io</h1>
        <p>
          This guide walks you through the Indus.io platform from the moment you log in to running your first voice agent. No prior technical experience is required—follow the sections in order for the smoothest path to a working Voice Agent.
        </p>
        <h3 style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>What is Indus.io?</h3>
        <p>
          Indus.io (IndusLabs Studio) is a voice AI platform that lets you build and run conversational voice agents. You define agents with a name, a voice (text-to-speech), and a brain (language model). Users then talk to these agents in real time: their speech is transcribed, the agent reasons and replies, and the reply is spoken back—all powered by Indus.io’s APIs and dashboard.
        </p>
        <p>
          The platform handles speech-to-text (STT), language model (LLM) conversations, and text-to-speech (TTS) in one place. You can manage everything from the dashboard or integrate programmatically via the API and SDK.
        </p>
        <h3 style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>What you’ll need</h3>
        <p>
          An Indus.io account and API key. Sign up or log in at the Indus.io dashboard (e.g. <code>playground.induslabs.io</code>). Once you’re in, you’ll see the home screen with quick access to TTS, STT, Conversational Agents, and usage. The rest of this guide assumes you’re logged in.
        </p>
        <GuideImage
          src="/img/understanding-indus-dashboard.png"
          alt="IndusLabs Studio dashboard: Welcome banner, feature cards (Test TTS, Run STT, Start a Call Agent, Payments & Usage), Usage Snapshot, and Ask Me section."
          caption="IndusLabs Studio home: feature cards, usage snapshot, and quick actions like “Create my first call agent.”"
        />
      </section>

      <section id="understanding-indus-first-agent" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Creating Your First Agent</h2>
          <p>
            Agents are the core of voice interactions on Indus.io. Each agent has a name, a voice (TTS), and a language model (LLM) that generates replies. You can start from a blank agent or use a template (e.g. Receptionist, Healthcare, Lead Qualification).
          </p>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 1: Open the Agents section</h3>
        <p>
          From the dashboard, use the left sidebar: under <strong>Products</strong>, open <strong>Conversational Agents</strong>. You can also use the “Create my first call agent” suggestion on the home page. This is where you create, edit, and list all your voice agents.
        </p>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Open an existing agent (if you have one) and just scan the tabs (Agent, Config, Workflow, Tools, Branches, Test Call) before you create anything. Knowing what you’ll configure later makes the next steps easier.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Note where <strong>Save Draft</strong> / <strong>Publish</strong> live, so you don’t lose changes while iterating.</li>
            <li style={{ marginBottom: '0.25rem' }}>Keep one browser tab open for <strong>Test Call</strong> so you can re-test quickly after edits.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 2: Create a new agent</h3>
        <p>
          Click <strong>Create New Agent</strong>. In the modal you’ll choose an <strong>agent name</strong> (required), the <strong>agent type</strong>, and a <strong>template</strong> to get started.
        </p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '0.375rem' }}><strong>Agent type:</strong> “Single prompt agent” for a straightforward conversation, or “Conversational flow agent” for an enforced flow.</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>Template:</strong> “Start from blank” to build from scratch, or pick a domain template (Loan Recovery, Receptionist, Healthcare, Lead Qualification) to pre-fill behavior.</li>
        </ul>
        <GuideImage
          src="/img/understanding-indus-create-agent.png"
          alt="Create New Agent modal: agent name, Single prompt agent / Conversational flow agent, and template cards (Start from blank, Loan Recovery, Receptionist, Healthcare, Lead Qualification)."
          caption="Create New Agent: name, type, and template selection."
        />
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Start with “Single prompt agent” and a blank template for your first build. It helps you learn the core loop before you add workflow complexity.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Pick a narrow use case (one intent) so the first tests are predictable.</li>
            <li style={{ marginBottom: '0.25rem' }}>Name the agent after the job (e.g. “Front Desk”) so it’s easy to find later when you have multiple agents.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 3: Configure the Agent tab</h3>
        <p>
          After creating the agent, you’ll land on the <strong>Agent</strong> tab. Here you define how the agent behaves and what it says first.
        </p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '0.375rem' }}><strong>System prompt:</strong> The main instruction for the AI (e.g. “You are a helpful AI voice assistant for this organization”). Use <code>{'{{'} variable {'}}'}</code> for dynamic content if supported.</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>First message (optional):</strong> The opening line the agent speaks (e.g. “Greet the user and ask how you can help today”).</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>Call Infields / Call Outcomes:</strong> Optional structured data you can collect or define for the call (e.g. 0/15 infields, 0/15 outcomes). Add or disable as needed.</li>
        </ul>
        <p>Use <strong>Save Draft</strong> to save, or <strong>Publish</strong> when the agent is ready to go live.</p>
        <GuideImage
          src="/img/understanding-indus-agent-tab.png"
          alt="Agent tab: System prompt, First message, Call Infields, and Call Outcomes with Save Draft and Publish."
          caption="Agent tab: system prompt, first message, and call infields/outcomes."
        />
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            For a <strong>Single prompt agent</strong>, aim for a System prompt that clearly covers:
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}><strong>Role & audience:</strong> who the agent is and who it is talking to (e.g. “polite receptionist helping new callers”).</li>
            <li style={{ marginBottom: '0.25rem' }}><strong>Primary goal:</strong> the one outcome you always want (e.g. “book an appointment and confirm date/time”).</li>
            <li style={{ marginBottom: '0.25rem' }}><strong>Style & boundaries:</strong> tone, language, and what it must not do (no medical advice, no payments, etc.).</li>
            <li style={{ marginBottom: '0.25rem' }}><strong>Call structure:</strong> 2–4 key steps the agent should follow (greet → gather info → confirm → close).</li>
            <li style={{ marginBottom: '0.25rem' }}><strong>Data to capture:</strong> any mandatory fields you expect in Call Infields / Outcomes.</li>
          </ul>
          <p style={{ margin: '0.25rem 0 0 0' }}>
            Keep this prompt concise (5–8 short sentences) and then iterate in small edits, using Test Call after each change so you can clearly hear the impact.
          </p>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 4: Set model, voice, and STT (Config tab)</h3>
        <p>
          Open the <strong>Config</strong> tab to tune the intelligence engine, speech-to-text, and text-to-speech.
        </p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '0.375rem' }}><strong>Intelligence Engine:</strong> Choose the LLM (e.g. <code>openai/gpt-oss-120b</code> or <code>groq</code>). Adjust <strong>Temperature</strong> (focused vs creative), <strong>Max Tokens</strong>, and <strong>Context Turns</strong> (conversation memory).</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>Speech To Text:</strong> Select provider (e.g. Indus.ai) and model (e.g. <code>nova-2</code>), and set <strong>Language</strong> (e.g. Hindi).</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>Text To Speech:</strong> Set the voice model (e.g. <code>Indus-hi-maya</code>) that the agent uses to speak replies.</li>
        </ul>
        <GuideImage
          src="/img/understanding-indus-config.png"
          alt="Config tab: Intelligence Engine (model, temperature, max tokens, context turns), Speech To Text (provider, language), Text To Speech (model)."
          caption="Config tab: model, voice, and detection parameters."
        />
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Make one change at a time here (only STT language, or only voice, or only temperature). That way you can attribute improvements or regressions to a single setting.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Match STT <strong>Language</strong> to what you’ll actually speak in Test Call (mixed languages need explicit handling in prompt/workflow).</li>
            <li style={{ marginBottom: '0.25rem' }}>If latency feels high, try lowering <strong>Max Tokens</strong> or tightening the prompt before switching models.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Workflow and Tools</h3>
        <p>
          For more control over conversation flow and capabilities, use the <strong>Workflow</strong> and <strong>Tools</strong> tabs, along with <strong>First Message</strong> settings.
        </p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '0.375rem' }}><strong>Workflow:</strong> Build a visual flow (e.g. Start → Subagent). In each node you can set a label, conversation goal, voice, eagerness, and LLM model. Use this for multi-step or branched conversations.</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>Tools:</strong> Enable workflow-level tools (e.g. Detect Language, Play DTMF, Voicemail Detection, Transfer To Agent, End Conversation, Skip Turn, Transfer To Phone Number) and apply them to nodes as needed.</li>
          <li style={{ marginBottom: '0.375rem' }}><strong>First Message & Infields:</strong> Set the opening line the agent speaks to start the conversation. Define <strong>Call Infields</strong> to capture user data (e.g., name, account number) and <strong>Call Outcomes</strong> to categorize the call result (e.g., appointment booked, issue resolved).
          </li>
        </ul>
        <GuideImage
          src="/img/understanding-indus-workflow-canvas.png"
          alt="Workflow canvas: Start node connected to New Subagent with configuration panel (label, conversation goal, voice, eagerness, LLM model)."
          caption="Workflow: Start and Subagent nodes with configuration panel."
        />
        <GuideImage
          src="/img/first-message-infields.png"
          alt="First Message, Call Infields, and Call Outcomes configuration."
          caption="First Message & Infields: Configure greeting and structured data capture."
        />
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Only add workflow complexity or custom tools after your basic prompt works well in a Test Call.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Keep Infields minimal initially so you can easily verify data capture.</li>
            <li style={{ marginBottom: '0.25rem' }}>Test your <strong>First Message</strong> phrasing out loud to ensure it sounds natural.</li>
            <li style={{ marginBottom: '0.25rem' }}>Use <strong>Call Outcomes</strong> to track specific successful resolutions (e.g. "Appointment Confirmed") rather than generic call completion.</li>
            <li style={{ marginBottom: '0.25rem' }}>Verify <strong>Tools</strong> configuration (like Transfer) with real numbers if possible.</li>
          </ul>
        </div>
      </section>

      <section id="understanding-indus-voice-sessions" className={styles.endpointSection}>
        <div className={styles.sectionHeading}>
          <h2>Test Call & Voice Sessions</h2>
          <p>
            The <strong>Test Call</strong> tab is the fastest way to understand how voice sessions work on Indus.io. You can start a call in your browser, speak to your agent, and hear replies in real time without writing any code.
          </p>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 1: Start a Test Call</h3>
        <p>
          Open your agent, make sure you have saved your latest changes, and go to the <strong>Test Call</strong> tab. Under <strong>Web Call</strong>, select a <strong>Voice</strong> (for example, <code>Indus-hi-maya</code>) and click <strong>Start Web Call</strong> to begin a browser-based session.
        </p>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Before starting, say out loud what you expect the agent to do (e.g. “Greet me and ask one question”). This makes it easier to notice when the behavior doesn’t match your intent.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Test in a quiet place first, then once in a normal/noisy environment to validate STT robustness.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 2: Talk to the agent</h3>
        <p>
          Once the call starts, speak normally into your microphone. Indus.io captures your audio, runs Speech-to-Text (STT) to transcribe it, sends the text to the agent’s language model (LLM), and then uses Text-to-Speech (TTS) to play the reply back in the voice you configured.
        </p>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Try a few different phrasings of the same question (simple, detailed, and edge-case scenarios). This helps you understand how robust your current prompt and configuration are.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>If the agent interrupts or talks too long, adjust your prompt constraints before changing model settings.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 3: Observe and refine behavior</h3>
        <p>
          After a short conversation, end the call and review what happened: Did the agent greet correctly? Did it follow your instructions from the <strong>Agent</strong> and <strong>Workflow</strong> tabs? Did it capture the right information in Call Infields or Outcomes (if configured)?
        </p>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            For every issue you notice (tone, missing questions, wrong language, etc.), write down a one-line fix (e.g. “Ask for the customer’s name before anything else”) and immediately update the System prompt, Workflow node, or Config settings.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Change only one thing per iteration so it’s obvious what caused the improvement.</li>
          </ul>
        </div>

        <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Step 4: Re-test and understand the full flow</h3>
        <p>
          Run another Test Call after you change prompts, workflow nodes, or voice/STT settings. Each call replays the full chain: user speech → STT → LLM reasoning → TTS voice. Repeating this loop is the quickest way to build intuition for how small changes affect the live experience.
        </p>
        <div className={styles.callout}>
          <strong>Recommendation</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Create a short checklist (e.g. greeting, information gathering, closing) and confirm each item during every Test Call. When the call consistently passes your checklist, you are ready to move on to API or telephony integration.
          </p>
          <ul style={{ margin: '0.5rem 0 0.25rem 1.25rem', padding: 0, color: 'var(--color-text-secondary)' }}>
            <li style={{ marginBottom: '0.25rem' }}>Once stable, do one end-to-end run using the exact script you expect real users to say.</li>
          </ul>
        </div>

        <p style={{ marginTop: '1rem' }}>
          After you are comfortable with Test Call, explore <Link to="/voice-agents">Voice Agents</Link> for API-level session control and <Link to="/tts">TTS</Link> / <Link to="/stt">STT</Link> docs to deepen your understanding of the underlying building blocks.
        </p>
      </section>
    </DocsLayout>
  );
}
