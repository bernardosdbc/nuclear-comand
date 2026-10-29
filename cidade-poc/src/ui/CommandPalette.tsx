import { useState, useEffect } from 'react'
import { useCityStore } from '../store/useCityStore'

const COMMANDS = [
  { id: 'spawn-gestor', label: '🧍 Spawn Gestor no Núcleo', action: () => useCityStore.getState().spawnCitizen('nucleo-central') },
  { id: 'spawn-busca', label: '🔍 Spawn Buscador', action: () => useCityStore.getState().spawnCitizen('servo-busca') },
  { id: 'spawn-build', label: '🔨 Spawn Construtor', action: () => useCityStore.getState().spawnCitizen('servo-construcao') },
  { id: 'spawn-review', label: '👁️ Spawn Revisor', action: () => useCityStore.getState().spawnCitizen('servo-revisao') },
  { id: 'drone-build', label: '🚁 Drone Build → Review', action: () => useCityStore.getState().spawnDrone('servo-construcao', 'servo-revisao') },
  { id: 'drone-deploy', label: '🚀 Drone Deploy', action: () => useCityStore.getState().spawnDrone('servo-construcao', 'terminal-pty') },
  { id: 'chaos', label: '🌪️ Chaos Mode (todos distritos)', action: () => { Object.keys(useCityStore.getState().districts).forEach(d => { useCityStore.getState().spawnCitizen(d); useCityStore.getState().spawnDrone(d, 'servo-construcao') }) } },
  { id: 'focus-nucleo', label: '🎯 Focar Núcleo Central', action: () => console.log('Focus núcleo') },
  { id: 'clear-agents', label: '🧹 Limpar todos agentes', action: () => useCityStore.setState({ agents: [] }) },
]

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useCityStore()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  
  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
        setQuery('')
        setSelected(0)
      }
      if (commandPaletteOpen) {
        if (e.key === 'Escape') { setCommandPaletteOpen(false); setQuery('') }
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
        if (e.key === 'Enter' && filtered[selected]) { filtered[selected].action(); setCommandPaletteOpen(false); setQuery('') }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [commandPaletteOpen, query, selected, filtered])
  
  if (!commandPaletteOpen) return null
  
  return (
    <div style={{
      position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, width: 480,
      background: 'rgba(6,11,20,0.98)', border: '1px solid #00d4aa',
      borderRadius: 8, overflow: 'hidden',
      fontFamily: "'IBM Plex Mono', monospace", boxShadow: '0 0 40px rgba(0,212,170,0.2)'
    }}>
      <div style={{ padding: 12, borderBottom: '1px solid #00d4aa' }}>
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Digite um comando... (Ctrl+K para fechar)"
          style={{ width: '100%', background: '#060b14', border: '1px solid #00d4aa', borderRadius: 4, padding: '8px 12px', color: '#00d4aa', fontFamily: 'inherit', fontSize: 13, outline: 'none' }}
          autoFocus
        />
      </div>
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        {filtered.map((cmd, i) => (
          <button
            key={cmd.id}
            onClick={() => { cmd.action(); useCityStore.getState().setCommandPaletteOpen(false); setQuery('') }}
            style={{ width: '100%', padding: '10px 16px', textAlign: 'left', background: i === selected ? 'rgba(0,212,170,0.2)' : 'transparent', border: 'none', color: i === selected ? '#00d4aa' : '#dce8f6', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}
          >
            {cmd.label}
          </button>
        ))}
        {filtered.length === 0 && <div style={{ padding: 16, textAlign: 'center', color: '#5d7390' }}>Nenhum comando encontrado</div>}
      </div>
      <div style={{ padding: 8, borderTop: '1px solid rgba(126,168,220,0.2)', fontSize: 10, color: '#5d7390', textAlign: 'center' }}>
        Ctrl+K para fechar • Enter para executar
      </div>
    </div>
  )
}