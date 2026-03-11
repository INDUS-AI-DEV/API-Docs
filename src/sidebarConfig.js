const sections = [

  {
    title: 'Overview',
    items: [
      { label: 'Introduction', page: 'home', id: 'home-introduction' },
      { label: 'Text-to-Speech', page: 'tts', id: 'tts-introduction' },
      { label: 'Speech-to-Text', page: 'stt', id: 'stt-introduction' },
      { label: 'Large Language Models', page: 'llm', id: 'llm-introduction' },
      { label: 'Voice Agents', page: 'voice-agents', id: 'voice-agents-introduction' },
      { label: 'Developer Click2Call APIs', page: 'developer-click2call', id: 'developer-click2call-introduction' },
      { label: 'Developer Agent Management', page: 'developer-agent-management', id: 'developer-agent-management-introduction' },

      { label: 'SDK Documentation', page: 'sdk', id: 'sdk-introduction' },
      { label: 'Guide', page: 'understanding-indus', id: 'understanding-indus-overview' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { label: 'Agent Creation Guide', page: 'understanding-indus', id: 'understanding-indus-quick-start' },
      { label: 'LiveKit Plugin Guide', page: 'livekit-plugin', id: 'livekit-plugin-introduction' },
    ],
  },
  {
    title: 'TTS Services',
    items: [
      { label: 'Introduction', page: 'tts', id: 'tts-introduction' },
      { label: 'Shared Payload', page: 'tts', id: 'tts-shared-payload' },

      { label: 'audio/speech', page: 'tts', id: 'tts-post-v1-audio-speech', method: 'POST' },
      { label: 'audio/speech/file', page: 'tts', id: 'tts-post-v1-audio-speech-file', method: 'POST' },
      { label: 'audio/speech/preview', page: 'tts', id: 'tts-post-v1-audio-speech-preview', method: 'POST' },

      { label: 'voice/get-voices', page: 'tts', id: 'tts-get-v1-voice-get-voices', method: 'GET' },

      {
        label: 'audio/speech_ws',
        page: 'tts',
        id: 'tts-ws-v1-audio-speech',
        method: 'WS',
      },
    ],
  },
  {
    title: 'STT Services',
    items: [
      { label: 'Introduction', page: 'stt', id: 'stt-introduction' },
      { label: 'Swarmitra (Emotional Models)', page: 'stt', id: 'swarmitra-emotional-models' },
      { label: 'audio/transcribe', page: 'stt', id: 'stt-post-v1-audio-transcribe', method: 'POST' },
      { label: 'audio/transcribe_ws', page: 'stt', id: 'stt-ws-v1-audio-transcribe', method: 'WS' },
      // {label: 'audio/transcribe/file', page: 'stt', id: 'stt-post-v1-audio-transcribe-file', method: 'POST'},
      { label: 'audio/transcribe_file', page: 'stt', id: 'stt-post-v1-audio-transcribe-file-async', method: 'POST' },
      { label: 'audio/transcribe/diarize', page: 'stt', id: 'stt-post-v1-audio-transcribe-diarize', method: 'POST' },
      { label: 'audio/transcribe/diarize/status', page: 'stt', id: 'stt-get-v1-audio-transcribe-diarize-status', method: 'GET' },
      { label: 'audio/transcribe_status/{id}', page: 'stt', id: 'stt-get-v1-audio-transcribe-status', method: 'GET' },
      { label: 'audio/transcribe/config', page: 'stt', id: 'stt-get-v1-audio-transcribe-config', method: 'GET' },
    ],
  },
  {
    title: 'LLM Services',
    items: [
      { label: 'Introduction', page: 'llm', id: 'llm-introduction' },
      { label: 'Authentication', page: 'llm', id: 'llm-authentication' },
      { label: 'Usage Examples', page: 'llm', id: 'llm-usage-examples' },
      { label: 'chat/completions', page: 'llm', id: 'llm-post-v1-chat-completions', method: 'POST' },
      { label: 'Streaming Completions', page: 'llm', id: 'llm-post-v1-chat-completions-streaming', method: 'POST' },
      { label: 'chat/models', page: 'llm', id: 'llm-get-v1-chat-models', method: 'GET' },
      { label: 'Credit System', page: 'llm', id: 'llm-credit-system' },
    ],
  },
  // Voice Agent services
  {
    title: 'Voice Agent Services',
    items: [
      { label: 'Introduction', page: 'voice-agents', id: 'voice-agents-introduction' },
      { label: 'agents', page: 'voice-agents', id: 'va-post-api-agents', method: 'POST' },
      { label: 'livekit', page: 'voice-agents', id: 'va-post-api-livekit', method: 'POST' },
      { label: 'React + TypeScript Integration', page: 'voice-agents', id: 'voice-agents-react-typescript' },
    ],
  },
  {
    title: 'Developer Agent Management',
    items: [
      { label: 'Introduction', page: 'developer-agent-management', id: 'developer-agent-management-introduction' },
      { label: 'Authentication Model', page: 'developer-agent-management', id: 'developer-agent-management-auth-model' },
      { label: 'login', page: 'developer-agent-management', id: 'developer-agent-management-post-login', method: 'POST' },
      { label: 'Legacy agents', page: 'developer-agent-management', id: 'developer-agent-management-post-legacy-agents', method: 'POST' },
      { label: 'agents/create', page: 'developer-agent-management', id: 'developer-agent-management-post-agents-create', method: 'POST' },
      { label: 'agents/{agent_id}', page: 'developer-agent-management', id: 'developer-agent-management-get-agent', method: 'GET' },
      { label: 'agents/{agent_id}', page: 'developer-agent-management', id: 'developer-agent-management-put-agent', method: 'PUT' },
      { label: 'agents/{agent_id}', page: 'developer-agent-management', id: 'developer-agent-management-delete-agent', method: 'DELETE' },
      { label: 'configs', page: 'developer-agent-management', id: 'developer-agent-management-post-configs', method: 'POST' },
      { label: 'configs/current', page: 'developer-agent-management', id: 'developer-agent-management-get-configs-current', method: 'GET' },
      { label: 'configs/render', page: 'developer-agent-management', id: 'developer-agent-management-post-configs-render', method: 'POST' },
      { label: 'configs/validate', page: 'developer-agent-management', id: 'developer-agent-management-post-configs-validate', method: 'POST' },
      { label: 'call_outcomes', page: 'developer-agent-management', id: 'developer-agent-management-post-call-outcomes', method: 'POST' },
      { label: 'call_infields', page: 'developer-agent-management', id: 'developer-agent-management-post-call-infields', method: 'POST' },
      { label: 'config/{service_type}', page: 'developer-agent-management', id: 'developer-agent-management-put-service-config', method: 'PUT' },
      { label: 'Recommended Flow', page: 'developer-agent-management', id: 'developer-agent-management-recommended-flow' },
      { label: 'Common Models', page: 'developer-agent-management', id: 'developer-agent-management-common-models' },
    ],
  },
  {
    title: 'Click to Call Service',
    items: [
      { label: 'Introduction', page: 'developer-click2call', id: 'developer-click2call-introduction' },
      { label: 'login', page: 'developer-click2call', id: 'developer-click2call-post-login', method: 'POST' },
      { label: 'calls/click2call', page: 'developer-click2call', id: 'developer-click2call-post-click2call', method: 'POST' },
      { label: 'calls/{call_id}/transcript', page: 'developer-click2call', id: 'developer-click2call-get-transcript', method: 'GET' },
      { label: 'Recommended Usage Flow', page: 'developer-click2call', id: 'developer-click2call-usage-flow' },
      { label: 'End-to-End Curl Flow', page: 'developer-click2call', id: 'developer-click2call-end-to-end' },
      { label: 'Notes', page: 'developer-click2call', id: 'developer-click2call-notes' },
    ],
  },

  {
    title: 'SDK Documentation',
    items: [
      { label: 'Introduction', page: 'sdk', id: 'sdk-introduction' },
      { label: 'Installation', page: 'sdk', id: 'sdk-installation' },
      { label: 'Quick Start', page: 'sdk', id: 'sdk-quick-start' },
      { label: 'Features', page: 'sdk', id: 'sdk-features' },
      { label: 'Text-to-Speech: Basic Usage', page: 'sdk', id: 'tts-basic' },
      { label: 'Streaming Audio', page: 'sdk', id: 'tts-streaming' },
      { label: 'TTS File Objects', page: 'sdk', id: 'tts-file-objects' },
      { label: 'Audio Formats', page: 'sdk', id: 'tts-formats' },
      { label: 'Speech-to-Text: Basic Usage', page: 'sdk', id: 'stt-basic' },
      { label: 'STT Real-time Streaming', page: 'sdk', id: 'stt-streaming' },
      { label: 'STT File Objects', page: 'sdk', id: 'stt-file-objects' },
      { label: 'Noise Cancellation', page: 'sdk', id: 'stt-noise-cancellation' },
      { label: 'Async API', page: 'sdk', id: 'async-api' },
    ],
  },

];

function pageToPath(page) {
  if (page === 'home') {
    return '/';
  }
  return `/${page}`;
}

function buildLink(item, activePage) {
  const method = item.method ? item.method.toUpperCase() : undefined;
  if (item.page === activePage && item.id) {
    return {
      label: item.label,
      targetId: item.id,
      method,
    };
  }
  const basePath = pageToPath(item.page);
  const hash = item.id ? `#${item.id}` : '';
  return {
    label: item.label,
    to: `${basePath}${hash}`,
    method,
  };
}

export function getSidebarSections(activePage) {
  return sections.map(section => ({
    title: section.title,
    links: section.items.map(item => buildLink(item, activePage)),
  }));
}
