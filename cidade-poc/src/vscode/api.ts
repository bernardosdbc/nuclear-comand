// Ponte para code-server / VS Code real
// Mock pronto — substitua pela implementação real quando quiser

const BASE_URL = 'http://localhost:8443'

export interface BuildingFile {
  id: string
  path: string
  name: string
  language: string
  content: string
  loc: number
  district: string
}

export async function fetchWorkspace(root: string = '/workspace'): Promise<BuildingFile[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/files?path=${encodeURIComponent(root)}`)
    if (!res.ok) throw new Error('code-server não disponível')
    const data = await res.json()
    return data.files?.map((f: any) => ({
      id: f.path,
      path: f.path,
      name: f.name,
      language: detectLanguage(f.name),
      content: f.content || '',
      loc: (f.content || '').split('\n').length,
      district: inferDistrict(f.path)
    })) || []
  } catch {
    return []
  }
}

export async function openFile(path: string): Promise<BuildingFile | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/files/content?path=${encodeURIComponent(path)}`)
    if (!res.ok) return null
    const data = await res.json()
    return { id: path, path, name: path.split('/').pop() || path, language: detectLanguage(path), content: data.content, loc: data.content.split('\n').length, district: inferDistrict(path) }
  } catch { return null }
}

export async function saveFile(path: string, content: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/files/content`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, content })
    })
    return res.ok
  } catch { return false }
}

export function connectWorkspaceEvents(onEvent: (event: any) => void): WebSocket | null {
  try {
    const ws = new WebSocket(`ws://localhost:8443/ws`)
    ws.onmessage = (e) => onEvent(JSON.parse(e.data))
    ws.onerror = () => console.warn('[WS] code-server indisponível')
    return ws
  } catch { return null }
}

function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const map: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    py: 'python', rs: 'rust', go: 'go', json: 'json', md: 'markdown',
    css: 'css', scss: 'scss', html: 'html', sh: 'bash', yml: 'yaml', yaml: 'yaml'
  }
  return ext ? map[ext] : 'text'
}

function inferDistrict(path: string): string {
  if (path.includes('agents/')) return 'servo-busca'
  if (path.includes('terminal')) return 'terminal-pty'
  if (path.includes('extension')) return 'extension-host'
  if (path.includes('opencode')) return 'opencode-core'
  if (path.includes('ide') || path.includes('monaco')) return 'monaco-ide'
  if (path.includes('test') || path.includes('spec')) return 'servo-revisao'
  return 'servo-construcao'
}

export const MOCK_BUILDINGS = [
  { id: 'src/main.ts', path: 'src/main.ts', name: 'main.ts', language: 'typescript', loc: 245, district: 'monaco-ide' },
  { id: 'src/App.tsx', path: 'src/App.tsx', name: 'App.tsx', language: 'typescript', loc: 180, district: 'monaco-ide' },
  { id: 'src/store.ts', path: 'src/store.ts', name: 'store.ts', language: 'typescript', loc: 120, district: 'monaco-ide' },
  { id: 'agents/gestor.md', path: 'agents/gestor.md', name: 'gestor.md', language: 'markdown', loc: 340, district: 'servo-busca' },
  { id: 'agents/servo-busca.md', path: 'agents/servo-busca.md', name: 'servo-busca.md', language: 'markdown', loc: 180, district: 'servo-busca' },
  { id: 'agents/servo-construcao.md', path: 'agents/servo-construcao.md', name: 'servo-construcao.md', language: 'markdown', loc: 210, district: 'servo-construcao' },
  { id: 'agents/servo-revisao.md', path: 'agents/servo-revisao.md', name: 'servo-revisao.md', language: 'markdown', loc: 190, district: 'servo-revisao' },
  { id: 'app/main.js', path: 'app/main.js', name: 'main.js', language: 'javascript', loc: 450, district: 'nucleo-central' },
  { id: 'app/terminal.js', path: 'app/terminal.js', name: 'terminal.js', language: 'javascript', loc: 320, district: 'terminal-pty' },
  { id: 'app/extension-host/index.js', path: 'app/extension-host/index.js', name: 'index.js', language: 'javascript', loc: 280, district: 'extension-host' },
]