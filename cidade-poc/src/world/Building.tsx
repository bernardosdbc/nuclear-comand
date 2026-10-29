import { Mesh, BoxGeometry, MeshStandardMaterial, Group } from 'three'
import { useCityStore } from '../store/useCityStore'

interface Props { building: any }

export function Building({ building }: { building: any }) {
  const { setSelectedBuilding, selectedBuilding } = useCityStore()
  const isSelected = selectedBuilding?.id === building.id
  
  const langColors: Record<string, number> = {
    typescript: 0x3178c6, javascript: 0xf7df1e, python: 0x3776ab,
    rust: 0xdea584, go: 0x00add8, json: 0xf5e04c, markdown: 0x083fa1, css: 0x1572b6
  }
  
  const color = langColors[building.language] || building.color
  const height = Math.max(2, building.loc * 0.04)
  
  return (
    <Group
      position={[building.x, height / 2, building.z]}
      onClick={(e) => { e.stopPropagation(); setSelectedBuilding(building) }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      <Mesh
        castShadow receiveShadow
        geometry={new BoxGeometry(2, height, 2)}
        material={new MeshStandardMaterial({
          color: isSelected ? 0xffff00 : color,
          emissive: color,
          emissiveIntensity: isSelected ? 0.5 : 0.2,
          roughness: 0.6,
          metalness: 0.2,
        })}
      />
      <Mesh
        position={[0, height / 2 + 0.1, 0]}
        geometry={new BoxGeometry(2.1, 0.2, 2.1)}
        material={new MeshStandardMaterial({
          color: 0x00ffff,
          emissive: 0x00ffff,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.6
        })}
      />
    </Group>
  )
}