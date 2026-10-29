export const PALETTE = {
  bg: '#060b14',
  surface: '#0a0f1a',
  elevated: '#1a2a3a',
  
  teal: '#00d4aa',
  iceBlue: '#6a8cff',
  amber: '#ffaa44',
  rose: '#ff6b9d',
  slate: '#3a4a5a',
  stone: '#4a5a6a',
  mist: '#5a6a7a',
  void: '#1a2a3a',
  
  success: '#00d4aa',
  warning: '#ffaa44',
  error: '#ff6b9d',
  info: '#6a8cff',
  
  text: '#dce8f6',
  textMuted: '#8aa0bb',
  textDim: '#5d7390',
  
  border: 'rgba(126,168,220,0.2)',
  borderStrong: 'rgba(126,168,220,0.4)',
}

export const DISTRICT_COLORS = {
  'nucleo-central': PALETTE.teal,
  'servo-busca': PALETTE.iceBlue,
  'servo-construcao': PALETTE.amber,
  'servo-revisao': PALETTE.rose,
  'terminal-pty': PALETTE.slate,
  'extension-host': PALETTE.stone,
  'opencode-core': PALETTE.mist,
  'monaco-ide': PALETTE.void,
} as const