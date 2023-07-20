import React, { useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useSkinnedMeshClone } from '../../../hooks/useSkinnedMeshClone'

export default function Cloned(props) {

    const group = useRef()
    const { nodes, materials, animations, scene } = useSkinnedMeshClone(props.path)
    const { actions } = useAnimations(animations, group)

    // console.log(scene)

    return (
        <group ref={group} {...props} dispose={null} position={props.data.position}>
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

// SEND PATH TOO SOMEHOW
useGLTF.preload('./models/basicchar_idle.glb')