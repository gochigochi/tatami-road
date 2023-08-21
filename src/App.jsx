import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'
import { Physics } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Lights from './components/Lights/Lights'
import { Html } from '@react-three/drei'
// import Playground from './components/Playground/Playground'
import GameMap from './components/GameMap/GameMap'

function App() {

  const [debugMode, setDebugMode] = useState(false)

  return (
    <>
      {/* <button id="debug-btn" onClick={(() => setDebugMode(!debugMode))}>Debug</button> */}
      <Canvas id="three-canvas" shadows camera={{ position: [0, 6, 14], fov: 42 }}>

        {/* <gridHelper position-y={[-.3]} /> */}

        {/* <Html>
            <p>Some text inside canvas</p>
          </Html> */}

        {/* <Suspense fallback={null}>
            <Physics debug={debugMode}>
              <LevelExample />
            </Physics>
          </Suspense> */}

        <Suspense fallback={null}>
          <Physics debug={debugMode}>
            <OrbitControls makeDefault />
            <Lights />
            <GameMap />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
