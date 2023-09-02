import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'
import { Physics } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Lights from './components/Lights/Lights'
import GameMap from './components/GameMap/GameMap'
import InteractionButton from './components/Interface/InteractionButton/InteractionButton'
import LifeMeter from './components/Interface/LifeMeter/LifeMeter'

function App() {

  const [debugMode, setDebugMode] = useState(false)

  return (
    <>
      <button id="debug-btn" onClick={(() => setDebugMode(!debugMode))}>Debug</button>
      <Canvas id="three-canvas" shadows camera={{ position: [0, 6, 14], fov: 42 }}>

        {/* <gridHelper position-y={[-.3]} /> */}

        <Suspense fallback={null}>
          <Physics debug={debugMode}>
            <OrbitControls makeDefault />
            <Lights />
            <GameMap />
          </Physics>
        </Suspense>
          <LifeMeter />
        {/* <InteractionButton /> */}
      </Canvas>
    </>
  )
}

export default App
