import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const Model = (props) => {

    useGLTF.preload('./models/animated_model_test_2.glb')
    const model = useGLTF('./models/animated_model_test_2.glb')
    const { input } = props
    const { actions } = useAnimations(model.animations, model.scene)
    const currentAction = useRef("")

    const isMoving = () => {
        return(
            props.gameState === "PLAY" &&
            (input.forward || input.backward || input.left || input.right) && 
            !(input.backward && input.forward) && 
            !(input.left && input.right)
        )
    }

    const isTalking = () => {
        return props.gameState === "NPC_CONVERSATION"
    }

    useEffect(() => {
        model.scene.scale.set(.4, .4, .4)
    }, [])

    useEffect(() => {

        let newAction = ""

        if (isMoving()) {
            newAction = "Run"
        } else {
            newAction = "Idle"
        }
        
        if (currentAction.current !== newAction) {
            actions[currentAction.current]?.fadeOut(0.2)
            actions[newAction]?.reset().fadeIn(0.2).play()
            currentAction.current = newAction
        }

    }, [input, props.gameState])

    return <primitive object={model.scene} />
}


//CHECK IF I HAVE TO PASS DEPENDENCIES TO MEMO AS TO
//SEE IF IT NEEDS RERENDER ON SOME STATE CHANGE!!!
export default React.memo(Model)
