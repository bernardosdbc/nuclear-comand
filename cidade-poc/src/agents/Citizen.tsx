import { useFrame } from '@react-three/fiber'
import { Mesh, SphereGeometry, BoxGeometry, MeshStandardMaterial, Group } from 'three'
import { useCityStore } from '../store/useCityStore'
import { Agent } from './Agent'

interface Props { agent: Agent }

export function Citizen({ agent }: Props) {
  const districts = useCityStore.getState().districts
  
  useFrame((_, delta) => {
    agent.update(delta)
    
    if (agent.state === 'idle' && Math.random() < 0.003) {
      const config = useCityStore.getState().districts[agent.district]?.config
      if (config) {
        agent.target = [
          config.x + (Math.random() - 0.5) * 20,
          0,
          config.z + (Math.random() - 0.5) * 20
        ]
        agent.state = 'walking'
      }
    }
    
    if (agent.target && !agent.target[0] && !agent.target[2]) {
      agent.state = 'working'
    }
  })

  const bob = Math.sin(performance.now() * 0.003) * 0.1
  
  return (
    <Group position={agent.position}>
      <Group position={[0, 1.2 + bob, 0]}>
        <Mesh>
          <BoxGeometry args={[0.6, 1.2, 0.6]} />
          <MeshStandardMaterial color={agent.color} emissive={agent.color} emissiveIntensity={0.3} roughness={0.5} metalness={0.2} />
        </Mesh>
        <Mesh position={[0, 1.1, 0]}>
          <SphereGeometry args={[0.35, 12, 12]} />
          <MeshStandardMaterial color={0x2a2a2a} roughness={0.8} />
        </Mesh>
        <Mesh position={[0, 0.2, 0.6]} scale={[0.5, 0.8, 0.4]}>
          <BoxGeometry args={[1, 1, 1]} />
          <MeshStandardMaterial color={0x3a4a5a} roughness={0.8} />
        </Mesh>
      </Group>
      <Mesh position={[0, 0.05, 0]} scale={[0.6, 0.02, 0.6]}>
        <Group rotation={[-Math.PI / 2, 0, 0]}>
          <BoxGeometry args={[1, 1, 1]} />
        </Group>
        <MeshStandardMaterial color="#000000" transparent opacity={0.2} depthWrite={false} />
      </Mesh>
    </Group>
  )
}