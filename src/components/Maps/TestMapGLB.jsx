import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { RigidBody } from '@react-three/rapier'

export default function TestMapGLB(props) {

  // const { nodes, materials } = useGLTF("models/map-test.glb")
  const { nodes, materials } = useGLTF("models/floor.glb")

  return (
    // <RigidBody
    //         rotation-y={-Math.PI / 6}
    //         receiveShadow
    //         type="fixed"
    //         position-y={-.25}
    //         includeInvisible
    //     ></RigidBody>
    <RigidBody type="fixed" includeInvisible>
      <directionalLight
        castShadow
        position={[0, 9, 4]}
        intensity={1}
        shadow-normalBias={0.09}
      />
      <ambientLight intensity={1} />


      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Florr}
        />
      </group>








      {/* <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.floor}
          position={[0, -0.04, 0]}
          scale={[1, 0.039, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.wall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.basket}
          position={[0, 0, -0.633]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.jidouhanbaiki}
          position={[0, 0, -0.633]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.trunk}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials.leaves}
        />
      </group> */}
    </RigidBody>
  )
}

useGLTF.preload("models/floor.glb")
