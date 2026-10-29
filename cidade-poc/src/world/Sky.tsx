import { AmbientLight, DirectionalLight, HemisphereLight } from 'three'

export function Sky() {
  return (
    <>
      <AmbientLight color="#8fb0e0" intensity={0.6} />
      <DirectionalLight color="#aecbff" intensity={0.4} position={[-70, 140, 60]} castShadow>
        <target position={[0, 0, 0]} />
      </DirectionalLight>
      <HemisphereLight color="#27406b" groundColor="#05080f" intensity={0.4} />
    </>
  )
}