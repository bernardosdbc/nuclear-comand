import { useCityStore } from '../store/useCityStore'

export function SidePanel() {
  const { selectedBuilding, setSelectedBuilding, spawnCitizen, spawnDrone } = useCityStore()
  
  if (!selectedBuilding) return null
  
  const langColors: Record<string, string> = {
    typescript: '#3178c6', javascript: '#f7df1e', python: '#3776ab',
    rust: '#dea584', go: '#00add8', json: '#f5e04c', markdown: '#083fa1', css: '#1572b6'
  }
  
  const color = langColors[selectedBuilding.language] || '#888'
  
  return (
    <div style={{
      position: 'fixed', right: 16, top: 16, bottom: 16,
      width: 320, zIndex: 100,
      background: 'rgba(9, 16, 29, 0.95)', border: '1px solid rgba(126,168,220,0.3)',
      borderRadius: 8, padding: 16, overflow: 'auto',
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: '#dce8f6',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5d7390' }}>
          PRÉDIO SELECIONADO
        </h3>
        <button onClick={() => useCityStore.getState().setSelectedBuilding(null)}
          style={{ background: 'none', border: 'none', color: '#5d7390', cursor: 'pointer', fontSize: 18 }}>✕</button>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#dce8f6', marginBottom: 4 }}>
          {selectedBuilding.name}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#5d7390' }}>
          <span style={{ background: color, color: '#04101d', padding: '1px 6px', borderRadius: 2, fontWeight: 600 }}>
            {selectedBuilding.language.toUpperCase()}
          </span>
          <span>LOC: {selectedBuilding.loc}</span>
          <span>District: {selectedBuilding.district}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => console.log('🔧 Abrir no VS Code:', selectedBuilding.id)}
          style={{ padding: '10px 12px', background: '#00d4aa', color: '#04101d', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
          🔧 Abrir no VS Code
        </button>
        <button onClick={() => console.log('📝 Editar:', selectedBuilding.id)}
          style={{ padding: '10px 12px', background: 'rgba(126,168,220,0.2)', color: '#00d4aa', border: '1px solid #00d4aa', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
          📝 Editar arquivo
        </button>
        <button onClick={() => console.log('🗑️ Deletar:', selectedBuilding.id)}
          style={{ padding: '10px 12px', background: 'rgba(255,107,157,0.2)', color: '#ff6b9d', border: '1px solid #ff6b9d', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
          🗑️ Deletar
        </button>
        <button onClick={() => console.log('📋 Copiar path:', selectedBuilding.id)}
          style={{ padding: '10px 12px', background: 'rgba(106,140,255,0.2)', color: '#6a8cff', border: '1px solid #6a8cff', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>
          📋 Copiar path
        </button>
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid rgba(126,168,220,0.2)', margin: '16px 0' }} />
      
      <div style={{ fontSize: 11, color: '#5d7390', marginBottom: 8 }}>AÇÕES RÁPIDAS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => useCityStore.getState().spawnCitizen(selectedBuilding.district)}
          style={{ padding: '8px', background: 'rgba(106,140,255,0.15)', color: '#6a8cff', border: '1px solid #6a8cff', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>
          🧍 Spawn Agente aqui
        </button>
        <button onClick={() => useCityStore.getState().spawnDrone(selectedBuilding.district, 'servo-construcao')}
          style={{ padding: '8px', background: 'rgba(255,170,68,0.15)', color: '#ffaa44', border: '1px solid #ffaa44', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>
          🚁 Drone → Construção
        </button>
        <button onClick={() => useCityStore.getState().spawnDrone(selectedBuilding.district, 'servo-revisao')}
          style={{ padding: '8px', background: 'rgba(255,107,157,0.15)', color: '#ff6b9d', border: '1px solid #ff6b9d', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}>
          🚁 Drone → Revisão
        </button>
      </div>
    </div>
  )
}