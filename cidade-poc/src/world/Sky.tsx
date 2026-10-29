import { AmbientLight, DirectionalLight, HemisphereLight } from 'three'

export function Sky() {
  return (
    <>
      <AmbientLight color="#8fb0e0" intensity={1.2} />
      <DirectionalLight color="#ffffff" intensity={1.5} position={[-100, 200, 100]} castShadow>
        <target position={[0, 0, 0]} />
      </DirectionalLight>
      <DirectionalLight color="#00d4aa" intensity={0.8} position={[100, 150, -50]} castShadow>
        <target position={[0, 0, 0]} />
      </DirectionalLight>
      <HemisphereLight color="#8fb0e0" groundColor="#1a2a3a" intensity={1.0} />
    </>
  )
}