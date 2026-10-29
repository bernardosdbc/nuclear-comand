import { useCityStore } from '../store/useCityStore'

export function HUD() {
  const { districts, agents, cameraMode, setCameraMode, spawnCitizen, spawnDrone } = useCityStore()
  
  return (
    <div style={{
      position: 'fixed', left: 16, top: 16, zIndex: 100,
      background: 'rgba(9,16,29,0.9)', border: '1px solid rgba(126,168,220,0.3)',
      borderRadius: 8, padding: 12, backdropFilter: 'blur(12px)',
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#dce8f6'
    }}>
      <div style={{ fontWeight: 600, color: '#00d4aa', marginBottom: 8, letterSpacing: '0.1em' }}>
        MEU MUNDO
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
        {Object.entries(useCityStore.getState().districts).map(([id, d]) => (
          <span key={id} style={{
            padding: '2px 8px', borderRadius: 3, fontSize: 10,
            background: `rgba(${d.color >> 16},${(d.color>>8)&255},${d.color&255},0.2)`,
            border: `1px solid rgb(${d.color>>16},${(d.color>>8)&255},${d.color&255})`,
            color: `rgb(${d.color>>16},${(d.color>>8)&255},${d.color&255})`,
            cursor: 'pointer', textTransform: 'lowercase'
          }} onClick={() => console.log('Focus:', id)}>
            {d.name}
          </span>
        ))}
      </div>
      <div style={{ fontSize: 10, color: '#5d7390', marginBottom: 8 }}>
        Agentes: {agents.filter(a => a.type === 'citizen').length} cidadãos • {agents.filter(a => a.type === 'drone').length} drones
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => setCameraMode('orbit')} style={{ flex: 1, padding: '6px', background: cameraMode === 'orbit' ? '#00d4aa' : 'rgba(126,168,220,0.1)', border: '1px solid #00d4aa', color: cameraMode === 'orbit' ? '#04101d' : '#00d4aa', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>🌐 Órbita</button>
        <button onClick={() => setCameraMode('walk')} style={{ flex: 1, padding: '6px', background: cameraMode === 'walk' ? '#00d4aa' : 'rgba(126,168,220,0.1)', border: '1px solid #00d4aa', color: cameraMode === 'walk' ? '#04101d' : '#00d4aa', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>🚶 Andar</button>
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button onClick={() => spawnCitizen('nucleo-central')} style={{ padding: '6px', background: 'rgba(0,212,170,0.15)', border: '1px solid #00d4aa', color: '#00d4aa', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>🧍 Spawn Gestor</button>
        <button onClick={() => spawnDrone('servo-construcao', 'servo-revisao')} style={{ padding: '6px', background: 'rgba(255,170,68,0.15)', border: '1px solid #ffaa44', color: '#ffaa44', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>🚁 Drone Build→Review</button>
        <button onClick={() => { Object.keys(useCityStore.getState().districts).forEach(d => { useCityStore.getState().spawnCitizen(d); useCityStore.getState().spawnDrone(d, 'servo-construcao') }) }} style={{ padding: '6px', background: 'rgba(255,107,157,0.15)', border: '1px solid #ff6b9d', color: '#ff6b9d', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>🌪️ Chaos Mode</button>
      </div>
    </div>
  )
}