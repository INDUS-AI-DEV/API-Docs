const sections = [
  {
    title: 'Overview',
    items: [
      {label: 'Introduction', page: 'home', id: 'home-introduction'},
      {label: 'Text-to-Speech', page: 'tts', id: 'tts-introduction'},
      {label: 'Speech-to-Text', page: 'stt', id: 'stt-introduction'},
      {label: 'Voice Agents', page: 'voice-agents', id: 'voice-agents-introduction'},
      {label: 'SDK Documentation', page: 'sdk', id: 'sdk-introduction'},
    ],
  },
  {
    title: 'TTS Services',
    items: [
      {label: 'Introduction', page: 'tts', id: 'tts-introduction'},
      {label: 'Shared Payload', page: 'tts', id: 'tts-shared-payload'},
      {label: 'POST /v1/audio/speech', page: 'tts', id: 'tts-post-v1-audio-speech', method: 'POST'},
      {label: 'POST /v1/audio/speech/file', page: 'tts', id: 'tts-post-v1-audio-speech-file', method: 'POST'},
      {label: 'POST /v1/audio/speech/preview', page: 'tts', id: 'tts-post-v1-audio-speech-preview', method: 'POST'},
      {label: 'GET /api/voice/get-voices', page: 'tts', id: 'tts-get-v1-voice-get-voices', method: 'GET'},
    ],
  },
  {
    title: 'STT Services',
    items: [
      {label: 'Introduction', page: 'stt', id: 'stt-introduction'},
      {label: 'POST /v1/audio/transcribe', page: 'stt', id: 'stt-post-v1-audio-transcribe', method: 'POST'},
      {label: 'POST /v1/audio/transcribe/file', page: 'stt', id: 'stt-post-v1-audio-transcribe-file', method: 'POST'},
      {label: 'GET /v1/audio/transcribe/config', page: 'stt', id: 'stt-get-v1-audio-transcribe-config', method: 'GET'},
    ],
  },
  // Voice Agent services
  {
    title: 'Voice Agent Services',
    items: [
      {label: 'Introduction', page: 'voice-agents', id: 'voice-agents-introduction'},
      {label: 'POST /api/agents', page: 'voice-agents', id: 'va-post-api-agents', method: 'POST'},
      {label: 'POST /api/livekit', page: 'voice-agents', id: 'va-post-api-livekit', method: 'POST'},
    ],
  },

  {
    title: 'SDK Documentation',
    items: [
      {label: 'Introduction', page: 'sdk', id: 'sdk-introduction'},
      {label: 'Installation', page: 'sdk', id: 'sdk-installation'},
      {label: 'Quick Start', page: 'sdk', id: 'sdk-quick-start'},
      {label: 'Features', page: 'sdk', id: 'sdk-features'},
      {label: 'Text-to-Speech: Basic Usage', page: 'sdk', id: 'tts-basic'},
      {label: 'Streaming Audio', page: 'sdk', id: 'tts-streaming'},
      {label: 'TTS File Objects', page: 'sdk', id: 'tts-file-objects'},
      {label: 'Audio Formats', page: 'sdk', id: 'tts-formats'},
      {label: 'Speech-to-Text: Basic Usage', page: 'sdk', id: 'stt-basic'},
      {label: 'STT File Objects', page: 'sdk', id: 'stt-file-objects'},
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

