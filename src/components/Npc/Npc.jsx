import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Npc = (props) => {

  // console.log('model')

  useGLTF.preload(`${props.model}`)
  const model = useGLTF(`${props.model}`)
  const { actions } = useAnimations(model.animations, model.scene)

  useEffect(() => {
    model.scene.scale.set(.3, .3, .3)
  }, [])

  useEffect(() => {

    actions["Idle"].play()

  }, [props.interacting])

  return <primitive object={model.scene} />
}

// const customComparator = (prevProps, nextProps ) => {
//   return nextProps.interacting === prevProps.interacing
//   //or nextProps.props.interacting?
// }

// PERO REVISAR COMO PASAR DEPENDENCIAS E.J. CUANDO CAMBIA props.interacting, QUE ES CUANDO SI DEBERIA RERENDERIZAR
// export default React.memo(Npc, customComparator)
export default React.memo(Npc)