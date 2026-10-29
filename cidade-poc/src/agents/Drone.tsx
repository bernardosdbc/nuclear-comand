import { useFrame } from '@react-three/fiber'
import { Mesh, BoxGeometry, SphereGeometry, ConeGeometry, MeshStandardMaterial, Group } from 'three'
import { useCityStore } from '../store/useCityStore'

interface Props { agent: any }

export function Drone({ agent }: Props) {
  const districts = useCityStore.getState().districts
  
  useFrame((_, delta) => {
    agent.update(delta)
    
    if (agent.state === 'flying' && agent.target) {
      const [x, y, z] = agent.position
      const [tx, ty, tz] = agent.target
      const dist = Math.sqrt((tx-x)**2 + (ty-y)**2 + (tz-z)**2)
      if (dist < 2) {
        agent.state = 'idle'
        agent.target = null
      }
    }
  })

  const spin = performance.now() * 0.005
  const bob = Math.sin(performance.now() * 0.005) * 0.4
  
  return (
    <Group position={agent.position}>
      <Group rotationY={spin} position={[0, bob, 0]}>
        <Mesh>
          <BoxGeometry args={[0.8, 0.4, 0.8]} />
          <MeshStandardMaterial color={agent.color} emissive={agent.color} emissiveIntensity={0.5} roughness={0.3} metalness={0.7} />
        </Mesh>
        {[-1, 1].map(x => [-1, 1].map(z => (
          <Group key={`${x}-${z}`} position={[x * 1.2, 0.3, z * 1.2]}>
            <Mesh>
              <ConeGeometry args={[0.4, 0.1, 8]} />
              <MeshStandardMaterial color={0x00ffff} emissive={0x00ffff} emissiveIntensity={0.8} transparent opacity={0.6} />
            </Mesh>
          </Group>
        )))}
        <Mesh position={[0, -0.4, 0]}>
          <SphereGeometry args={[0.3, 8, 8]} />
          <MeshStandardMaterial color={0x00ffff} emissive={0x00ffff} emissiveIntensity={1} transparent opacity={0.3} />
        </Mesh>
      </Group>
      <Group position={[0, -1.5, 0]} scale={0.5}>
        <Mesh>
          <BoxGeometry args={[2, 0.1, 2]} />
          <MeshStandardMaterial color={agent.color} transparent opacity={0.15} depthWrite={false} />
        </Mesh>
      </Group>
    </Group>
  )
}