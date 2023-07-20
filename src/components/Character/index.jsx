// import { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function Character(props) {
//   const group = useRef()
//   const { nodes, materials } = useGLTF('./models/model.gltf')
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <mesh geometry={nodes.character_duck.geometry} material={nodes.character_duck.material} rotation={[Math.PI / 2, 0, 0,]} >
//         <mesh geometry={nodes.character_duckArmLeft.geometry} material={nodes.character_duckArmLeft.material} position={[0.2, 0, -0.63,]} />
//         <mesh geometry={nodes.character_duckArmRight.geometry} material={nodes.character_duckArmRight.material} position={[-0.2, 0, -0.63,]} />
//         <group position={[0, 0, -0.7,]} >
//           <mesh geometry={nodes.Cube1338.geometry} material={nodes.Cube1338.material} />
//           <mesh geometry={nodes.Cube1338_1.geometry} material={materials['Yellow.043']} />
//           <mesh geometry={nodes.Cube1338_2.geometry} material={materials['Black.027']} />
//         </group>
//       </mesh>
//     </group>
//   )F
// }F

// useGLTF.preload('./models/model.gltf')

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {

  const group = useRef()
  useGLTF.preload('./models/basicchar_idle.glb')
  const { nodes, materials, animations } = useGLTF('./models/basicchar_idle.glb')
  const { input } = props
  const { actions } = useAnimations(animations, group)
  const currentAction = useRef("")

  useEffect(() => {

    let newAction = ""

    if (input.forward || input.backward || input.left || input.right) {
      newAction = "Run_Animation"
    } else {
      newAction = "Idle"
    }

    // actions?.Idle.play()
    if (currentAction.current !== newAction) {
      actions[currentAction.current]?.fadeOut(0.2)
      actions[newAction].reset().fadeIn(0.2).play()
      currentAction.current = newAction
    }

  }, [input])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Roundcube001" position={[0, 2.197, 0]} />
        <group name="Armature" position={[0, 0.631, 0]}>
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="Roundcube"
            geometry={nodes.Roundcube.geometry}
            material={nodes.Roundcube.material}
            skeleton={nodes.Roundcube.skeleton}
            castShadow
          />
        </group>
      </group>
    </group>
  )
}
