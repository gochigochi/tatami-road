import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Character(props) {

    const { input } = props
    const group = useRef()
    const currentAction = useRef("")
    // const { nodes, materials, animations } = useGLTF("/models/scene-test-scaled-animated.glb")
    const { nodes, materials, animations } = useGLTF("/models/char.glb")
    // const { actions } = useAnimations(animations, group)

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

    // useEffect(() => {

    //     let newAction = ""

    //     if (isMoving()) {

    //         // newAction = "Run"
    //         actions.Walk.play()

    //     } else {

    //         // newAction = "Idle"
    //         actions.Idle.play()

    //     }
        
    //     // if (currentAction.current !== newAction) {
    //     //     actions[currentAction.current]?.fadeOut(0.2)
    //     //     actions[newAction]?.reset().fadeIn(0.2).play()
    //     //     currentAction.current = newAction
    //     // }

    // }, [input, props.gameState])

    return (

        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Roundcube001.geometry}
                material={materials.char}
                position={[0, 1.003, 0]}
            />
        </group>

        // <group ref={group} {...props} dispose={null}>
        //     <group name="Scene">
        //         <group name="Armature">
        //             <skinnedMesh
        //                 castShadow
        //                 receiveShadow
        //                 name="Body"
        //                 geometry={nodes.Body.geometry}
        //                 material={materials.Skin}
        //                 skeleton={nodes.Body.skeleton}
        //             />
        //             <skinnedMesh
        //                 castShadow
        //                 receiveShadow
        //                 name="Hair"
        //                 geometry={nodes.Hair.geometry}
        //                 material={materials.Eyes}
        //                 skeleton={nodes.Hair.skeleton}
        //             />
        //             <skinnedMesh
        //                 castShadow
        //                 receiveShadow
        //                 name="LeftEye"
        //                 geometry={nodes.LeftEye.geometry}
        //                 material={materials.Eyes}
        //                 skeleton={nodes.LeftEye.skeleton}
        //             />
        //             <skinnedMesh
        //                 castShadow
        //                 receiveShadow
        //                 name="Pants"
        //                 geometry={nodes.Pants.geometry}
        //                 material={materials.Pants}
        //                 skeleton={nodes.Pants.skeleton}
        //             />
        //             <skinnedMesh
        //                 castShadow
        //                 receiveShadow
        //                 name="RightEye"
        //                 geometry={nodes.RightEye.geometry}
        //                 material={materials.Eyes}
        //                 skeleton={nodes.RightEye.skeleton}
        //             />
        //             <skinnedMesh
        //                 castShadow
        //                 receiveShadow
        //                 name="Shirt"
        //                 geometry={nodes.Shirt.geometry}
        //                 material={materials.Shirt}
        //                 skeleton={nodes.Shirt.skeleton}
        //             />
        //             <primitive object={nodes.LowBody} />
        //         </group>
        //     </group>
        // </group>
    );
}

useGLTF.preload("/models/char.glb");


// import React, { useRef, useEffect } from 'react'
// import { useGLTF, useAnimations } from '@react-three/drei'

// const Model = (props) => {

//     useGLTF.preload('./models/animated_model_test_2.glb')
//     const model = useGLTF('./models/animated_model_test_2.glb')
//     const { input } = props
//     const { actions } = useAnimations(model.animations, model.scene)
//     const currentAction = useRef("")

    // const isMoving = () => {
    //     return(
    //         props.gameState === "PLAY" &&
    //         (input.forward || input.backward || input.left || input.right) && 
    //         !(input.backward && input.forward) && 
    //         !(input.left && input.right)
    //     )
    // }

    // const isTalking = () => {
    //     return props.gameState === "NPC_CONVERSATION"
    // }

//     useEffect(() => {
//         model.scene.scale.set(.4, .4, .4)
//     }, [])

    // useEffect(() => {

    //     let newAction = ""

    //     if (isMoving()) {
    //         newAction = "Run"
    //     } else {
    //         newAction = "Idle"
    //     }
        
    //     if (currentAction.current !== newAction) {
    //         actions[currentAction.current]?.fadeOut(0.2)
    //         actions[newAction]?.reset().fadeIn(0.2).play()
    //         currentAction.current = newAction
    //     }

    // }, [input, props.gameState])

//     return <primitive object={model.scene} />
// }


// //CHECK IF I HAVE TO PASS DEPENDENCIES TO MEMO AS TO
// //SEE IF IT NEEDS RERENDER ON SOME STATE CHANGE!!!
// export default React.memo(Model)
