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


// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function Model(props) {
//   const group = useRef()
//   const { nodes, materials } = useGLTF('./models/untitled.glb')
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group position={[-0.215, -32.964, -0.228]} scale={0.315}>
//         <mesh geometry={nodes.Mesh.geometry} material={materials.Material} />
//         <mesh geometry={nodes.Mesh_1.geometry} material={materials['Material.001']} />
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('./models/untitled.glb')

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  // const { nodes, materials, animations } = useGLTF('./models/basicchar_idle.glb')
  const model = useGLTF('./models/basicchar_idle.glb')
  const { actions } = useAnimations(model.animations, group)
  
  console.log(props.action)

  useEffect(() => {
    actions.Idle.play()
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Roundcube001" position={[0, 2.197, 0]} />
        <group name="Armature" position={[0, 0.631, 0]}>
          <primitive object={model.nodes.Hips} />
          <skinnedMesh name="Roundcube" geometry={model.nodes.Roundcube.geometry} material={model.nodes.Roundcube.material} skeleton={model.nodes.Roundcube.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/basicchar_idle.glb')
