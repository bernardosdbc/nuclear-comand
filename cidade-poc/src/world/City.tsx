import { useCityStore } from '../store/useCityStore'
import { District } from './District'
import { Ground } from './Ground'
import { Sky } from './Sky'
import { Fog } from '@react-three/drei'

export function City() {
  const districts = useCityStore((s) => s.districts)
  
  return (
    <>
      <Sky />
      <Fog attach="fog" args={['#060b14', 0.0015]} />
      <Ground />
      {Object.entries(districts).map(([id, d]) => (
        <District key={id} id={id} config={d} />
      ))}
    </>
  )
}