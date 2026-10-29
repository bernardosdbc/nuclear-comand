export class Agent {
  id: string
  type: 'citizen' | 'drone'
  district: string
  position: [number, number, number]
  target: [number, number, number] | null
  state: 'idle' | 'walking' | 'working' | 'flying'
  color: number
  speed: number
  phase: number = Math.random() * Math.PI * 2

  constructor(data: {
    id: string
    type: 'citizen' | 'drone'
    district: string
    position: [number, number, number]
    target: [number, number, number] | null
    state: 'idle' | 'walking' | 'working' | 'flying'
    color: number
  }) {
    Object.assign(this, data)
    this.speed = this.type === 'drone' ? 0.15 : 0.04
  }

  update(delta: number) {
    this.phase += delta * 2
    
    if (this.target && this.state !== 'idle') {
      const [tx, ty, tz] = this.target
      const [x, y, z] = this.position
      const dx = tx - x, dy = ty - y, dz = tz - z
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
      
      if (dist < this.speed) {
        this.position = this.target
        this.target = null
        this.state = this.type === 'drone' ? 'idle' : 'working'
      } else {
        this.position[0] += (dx / dist) * this.speed
        this.position[1] += (dy / dist) * this.speed
        this.position[2] += (dz / dist) * this.speed
      }
    }
    
    if (this.type === 'drone') {
      this.position[1] = (this.target?.[1] ?? 8) + Math.sin(this.phase) * 0.3
    } else if (this.state === 'walking') {
      this.position[1] = Math.sin(this.phase * 4) * 0.15
    }
  }
}