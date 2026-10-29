import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei'
import { useCityStore } from './store/useCityStore'
import { City } from './world/City'
import { SidePanel } from './ui/SidePanel'
import { HUD } from './ui/HUD'
import { CommandPalette } from './ui/CommandPalette'

function CameraControls() {
  const { cameraMode, setCameraMode } = useCityStore()
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 80, 140]} fov={50} />
      {cameraMode === 'orbit' && <OrbitControls enablePan={true} enableZoom={true} />}
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 80, 140], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => { gl.setClearColor(0x060b14, 1); }}
      >
        <CameraControls />
        <City />
      </Canvas>

      <SidePanel />
      <HUD />
      <CommandPalette />
    </div>
  )
}