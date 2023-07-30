import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Playground(props) {
    useGLTF.preload('./maps/test.glb')
    const { nodes, materials } = useGLTF('./maps/test.glb')
    return (
        <RigidBody
            rotation-y={-Math.PI / 6}
            receiveShadow
            type="fixed"
            position-y={-.25}
            includeInvisible
        >

            <group {...props} dispose={null}>
                <mesh geometry={nodes.Cube.geometry} material={materials.Material} position={[0, 1, 0]} />
                <mesh geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} position={[3.63, 1.321, -3.585]} />
                <mesh geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} position={[2.776, 4.005, 0]} />
                <mesh geometry={nodes.Cube003.geometry} material={nodes.Cube003.material} position={[-0.199, 4.884, -3.584]} />
            </group>
        </RigidBody>
    )
}

