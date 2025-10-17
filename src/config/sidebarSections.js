const ROUTES = {
  home: '/',
  tts: '/tts',
  stt: '/stt',
  sdk: '/sdk',
};

const baseSections = [
  {
    title: 'Overview',
    links: [
      {label: 'API Introduction', page: 'home', targetId: 'home-introduction'},
      {label: 'Text-to-Speech', page: 'tts'},
      {label: 'Speech-to-Text', page: 'stt'},
      {label: 'SDK Documentation', page: 'sdk'},
    ],
  },
  {
    title: 'TTS Services',
    links: [
      {label: 'Introduction', page: 'tts', targetId: 'tts-introduction'},
      {label: 'Shared Payload', page: 'tts', targetId: 'tts-shared-payload'},
      {label: 'POST /v1/audio/speech', page: 'tts', targetId: 'tts-post-v1-audio-speech', method: 'POST'},
      {
        label: 'POST /v1/audio/speech/file',
        page: 'tts',
        targetId: 'tts-post-v1-audio-speech-file',
        method: 'POST',
      },
      {
        label: 'POST /v1/audio/speech/preview',
        page: 'tts',
        targetId: 'tts-post-v1-audio-speech-preview',
        method: 'POST',
      },
      {label: 'GET /v1/voice/get-voices', page: 'tts', targetId: 'tts-get-v1-voice-get-voices', method: 'GET'},
    ],
  },
  {
    title: 'STT Services',
    links: [
      {label: 'Introduction', page: 'stt', targetId: 'stt-introduction'},
      {
        label: 'POST /v1/audio/transcribe',
        page: 'stt',
        targetId: 'stt-post-v1-audio-transcribe',
        method: 'POST',
      },
      {
        label: 'POST /v1/audio/transcribe/file',
        page: 'stt',
        targetId: 'stt-post-v1-audio-transcribe-file',
        method: 'POST',
      },
      {
        label: 'GET /v1/audio/transcribe/config',
        page: 'stt',
        targetId: 'stt-get-v1-audio-transcribe-config',
        method: 'GET',
      },
    ],
  },
  {
    title: 'SDK Documentation',
    links: [
      {label: 'Introduction', page: 'sdk', targetId: 'sdk-introduction'},
      {label: 'Installation', page: 'sdk', targetId: 'sdk-installation'},
      {label: 'Quick Start', page: 'sdk', targetId: 'sdk-quick-start'},
      {label: 'Features', page: 'sdk', targetId: 'sdk-features'},
      {label: 'Text-to-Speech: Basic Usage', page: 'sdk', targetId: 'tts-basic'},
      {label: 'Streaming Audio', page: 'sdk', targetId: 'tts-streaming'},
      {label: 'File Objects (TTS)', page: 'sdk', targetId: 'tts-file-objects'},
      {label: 'Audio Formats', page: 'sdk', targetId: 'tts-formats'},
      {label: 'Speech-to-Text: Basic Usage', page: 'sdk', targetId: 'stt-basic'},
      {label: 'File Objects (STT)', page: 'sdk', targetId: 'stt-file-objects'},
    ],
  },
];

function buildLink(link, currentPage) {
  const {label, page, targetId, method, to} = link;
  if (!page && to) {
    return {label, to, method};
  }

  const basePath = page ? ROUTES[page] : null;

  if (page === currentPage && targetId) {
    return {label, targetId, method};
  }

  if (targetId && basePath) {
    return {label, to: basePath, method};
  }

  if (basePath) {
    return {label, to: basePath, method};
  }

  return {label, to: '#', method};
}

export function getSidebarSections(currentPage) {
  return baseSections.map(section => ({
    title: section.title,
    links: section.links.map(link => buildLink(link, currentPage)),
  }));
}
