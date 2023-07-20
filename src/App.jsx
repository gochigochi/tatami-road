import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'
import { Physics } from '@react-three/rapier'
import { Html } from '@react-three/drei'
import LevelExample from './components/LevelExample'
import Playground from './components/Playground/Playground'

function App() {

  const [debugMode, setDebugMode] = useState(false)

  return (
    <>
      <button id="debug-btn" onClick={(() => setDebugMode(!debugMode))}>Debug</button>
        <Canvas id="three-canvas" shadows camera={{ position: [0, 6, 14], fov: 42}}>

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
              <Playground />
            </Physics>
          </Suspense>
        </Canvas>
    </>
  )
}

export default App
