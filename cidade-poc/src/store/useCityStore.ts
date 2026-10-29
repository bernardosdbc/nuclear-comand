import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DistrictId =
  | 'nucleo-central'
  | 'servo-busca'
  | 'servo-construcao'
  | 'servo-revisao'
  | 'terminal-pty'
  | 'extension-host'
  | 'opencode-core'
  | 'monaco-ide'

export interface Building {
  id: string
  district: DistrictId
  name: string
  language: string
  loc: number
  x: number
  z: number
  height: number
  color: number
}

export interface Agent {
  id: string
  type: 'citizen' | 'drone'
  district: DistrictId
  position: [number, number, number]
  target: [number, number, number] | null
  state: 'idle' | 'walking' | 'working' | 'flying'
  color: number
}

interface CityState {
  districts: Record<DistrictId, { name: string; color: number; x: number; z: number; buildings: Building[] }>
  selectedBuilding: Building | null
  setSelectedBuilding: (b: Building | null) => void
  agents: Agent[]
  spawnCitizen: (district: DistrictId) => void
  spawnDrone: (from: DistrictId, to: DistrictId) => void
  cameraMode: 'orbit' | 'walk'
  setCameraMode: (m: 'orbit' | 'walk') => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (v: boolean) => void
}

const DISTRICT_CONFIG: Record<string, { name: string; color: number; x: number; z: number }> = {
  'nucleo-central':     { name: 'NÚCLEO-CENTRAL',     color: 0x00d4aa, x: -90,  z: -30 },
  'servo-busca':        { name: 'SERVO-BUSCA',        color: 0x6a8cff, x: -30,  z: -30 },
  'servo-construcao':   { name: 'SERVO-CONSTRUÇÃO',   color: 0xffaa44, x:  30,  z: -30 },
  'servo-revisao':      { name: 'SERVO-REVISÃO',      color: 0xff6b9d, x: -90,  z:  30 },
  'terminal-pty':       { name: 'TERMINAL-PTY',       color: 0x3a4a5a, x: -30,  z:  30 },
  'extension-host':     { name: 'EXTENSION-HOST',     color: 0x4a5a6a, x:  30,  z:  30 },
  'opencode-core':      { name: 'OPENCODE-CORE',      color: 0x5a6a7a, x:  90,  z: -30 },
  'monaco-ide':         { name: 'MONACO-IDE',         color: 0x1a2a3a, x:  90,  z:  30 },
}

function generateBuildings(districtId: string) {
  const config = DISTRICT_CONFIG[districtId]
  const count = 8 + Math.floor(Math.random() * 6)
  return Array.from({ length: count }, (_, i) => {
    const languages = ['typescript', 'javascript', 'python', 'rust', 'go', 'json', 'markdown', 'css']
    const lang = languages[Math.floor(Math.random() * languages.length)]
    const loc = 50 + Math.floor(Math.random() * 500)
    const angle = (i / count) * Math.PI * 2
    const radius = 12 + Math.random() * 8
    return {
      id: `${districtId}-b${i}`,
      district: districtId,
      name: `${districtId.split('-')[0]}-${i}.${lang}`,
      language: lang,
      loc,
      x: config.x + Math.cos(angle) * radius,
      z: config.z + Math.sin(angle) * radius,
      height: Math.max(2, loc * 0.04),
      color: DISTRICT_CONFIG[districtId].color,
    }
  })
}

export const useCityStore = create(
  persist(
    (set, get) => ({
      districts: Object.fromEntries(
        Object.keys(DISTRICT_CONFIG).map((k) => [
          k,
          { ...DISTRICT_CONFIG[k], buildings: generateBuildings(k) }
        ])
      ) as Record<string, { name: string; color: number; x: number; z: number; buildings: any[] }>,

      selectedBuilding: null,
      setSelectedBuilding: (b) => set({ selectedBuilding: b }),

      agents: [],
      spawnCitizen: (district: string) => set((state) => ({
        agents: [...state.agents, {
          id: `citizen-${Date.now()}`,
          type: 'citizen',
          district,
          position: [DISTRICT_CONFIG[district].x, 0, DISTRICT_CONFIG[district].z],
          target: null,
          state: 'idle',
          color: DISTRICT_CONFIG[district].color,
        }]
      })),
      spawnDrone: (from: string, to: string) => set((state) => ({
        agents: [...state.agents, {
          id: `drone-${Date.now()}`,
          type: 'drone',
          district: from,
          position: [DISTRICT_CONFIG[from].x, 8, DISTRICT_CONFIG[from].z],
          target: [DISTRICT_CONFIG[to].x, 8, DISTRICT_CONFIG[to].z],
          state: 'flying',
          color: 0xffaa44,
        }]
      })),

      cameraMode: 'orbit' as const,
      setCameraMode: (m: 'orbit' | 'walk') => set({ cameraMode: m }),

      commandPaletteOpen: false,
      setCommandPaletteOpen: (v: boolean) => set({ commandPaletteOpen: v }),
    }),
    { name: 'cidade-poc-store' }
  )
)