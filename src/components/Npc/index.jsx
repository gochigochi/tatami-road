import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Npc(props) {

  const group = useRef()
  useGLTF.preload(props.path)
  const { nodes, materials, animations } = useGLTF(props.path)
  const { actions } = useAnimations(animations, group)

  // useEffect(() => {

  //   actions?.Idle.play()

  // }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Roundcube001" position={[0, 2.197, 0]} />
        <group name="Armature" position={[0, 0.631, 0]}>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Roundcube" geometry={nodes.Roundcube.geometry} material={nodes.Roundcube.material} skeleton={nodes.Roundcube.skeleton} />
        </group>
      </group>
    </group>
  )
}
