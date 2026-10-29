import { Mesh, PlaneGeometry, MeshStandardMaterial, GridHelper } from 'three'

export function Ground() {
  return (
    <>
      <GridHelper size={400} divisions={40} color1="#00d4aa" color2="#004433" />
      <Mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        scale={[500, 500, 1]}
      >
        <PlaneGeometry args={[100, 100, 10, 10]} />
        <MeshStandardMaterial color="#060b14" roughness={1} metalness={0} />
      </Mesh>
    </>
  )
}