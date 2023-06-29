import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'
import { Physics } from '@react-three/rapier'
// import { Html, KeyboardControls } from '@react-three/drei'
import Example from './components/Example'
import LevelExample from './components/LevelExample'

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  action: "action",
}
67
function App() {

  const [debugMode, setDebugMode] = useState(false)

  // const map = useMemo(
  //   () => [
  //     {name: Controls.forward, keys: ["ArrowUp"]},
  //     {name: Controls.back, keys: ["ArrowDown"]},
  //     {name: Controls.left, keys: ["ArrowLeft"]},
  //     {name: Controls.right, keys: ["ArrowRight"]},
  //     {name: Controls.interact, keys: ["Space"]}
  //   ]
  // )

  return (
    <>
      <button id="debug-btn" onClick={(() => setDebugMode(!debugMode))}>Debug</button>
      {/* <KeyboardControls map={map}> */}
        <Canvas id="three-canvas" shadows camera={{ position: [0, 6, 14], fov: 42}}>

          {/* <gridHelper position-y={[-.3]} /> */}

          {/* <Html>
            <p>Some text inside canvas</p>
          </Html> */}

          {/* <Suspense fallback={null}>
            <Example />
          </Suspense> */}

          <Suspense fallback={null}>
            <Physics debug={debugMode}>
              <LevelExample />
            </Physics>
          </Suspense>
        </Canvas>
      {/* </KeyboardControls> */}
    </>
  )
}

export default App
