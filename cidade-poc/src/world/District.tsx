import { Group, Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
import { Text as DreiText } from '@react-three/drei'
import { useCityStore } from '../store/useCityStore'
import { Building } from './Building'

interface Props { id: string; config: any }

export function District({ id, config }: { id: string; config: any }) {
  const { buildings } = useCityStore.getState().districts[id]
  
  return (
    <Group position={[config.x, 0, config.z]}>
      <Mesh
        receiveShadow
        position={[0, 0.01, 0]}
        scale={[config.buildings.length * 2.5, 0.1, config.buildings.length * 2.5]}
      >
        <BoxGeometry args={[1, 0.1, 1]} />
        <MeshStandardMaterial color={config.color} transparent opacity={0.15} />
      </Mesh>
      
      <DreiText
        position={[0, 1.5, -(config.buildings.length * 1.2)]}
        fontSize={1.2}
        color="#dce8f6"
        anchorX="center"
        font="IBM Plex Mono"
        letterSpacing={0.1}
      >
        {config.name}
      </DreiText>
      
      {buildings.map((b) => (
        <Building key={b.id} building={b} />
      ))}
    </Group>
  )
}