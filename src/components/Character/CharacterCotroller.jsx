import { useRef } from 'react'
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import Character from "."
import { useKeyboardControls } from "@react-three/drei"
import { Controls } from "../../App"
import { useFrame } from "@react-three/fiber"
import { useInput } from '../../../hooks/useInputs'

import * as THREE from "three"

const MOVEMENT_SPEED = .1
const MAX_VEL = 2

export const CharacterController = () => {

    const input = useInput()
    const rigidBody = useRef()
    const character = useRef()
    const action = useRef()


    console.log(input)

    // const forwardPressed = useKeyboardControls(state => state[Controls.forward])
    // const backPressed = useKeyboardControls(state => state[Controls.back])
    // const leftPressed = useKeyboardControls(state => state[Controls.left])
    // const rightPressed = useKeyboardControls(state => state[Controls.right])
    // const interactPressed = useKeyboardControls(state => state[Controls.interact])

    // useFrame((state) => {
    //     const impulse = { x: 0, y: 0, z: 0 }

    //     const linvel = rigidBody.current.linvel()
    //     let changeRotation = false

    //     if (forwardPressed && linvel.z > -MAX_VEL) {
    //         impulse.z -= MOVEMENT_SPEED
    //         changeRotation = true
    //         action.current = "forward"
    //     }
    //     if (backPressed && linvel.z < MAX_VEL) {
    //         impulse.z += MOVEMENT_SPEED
    //         changeRotation = true
    //         action.current = "back"
    //     }
    //     if (leftPressed && linvel.x > -MAX_VEL) {
    //         impulse.x -= MOVEMENT_SPEED
    //         changeRotation = true
    //         action.current = "left"
    //     }
    //     if (rightPressed && linvel.x < MAX_VEL) {
    //         impulse.x += MOVEMENT_SPEED
    //         changeRotation = true
    //         action.current = "right"
    //     }
    //     if(interactPressed) {
    //         console.log('hfasdkjh')
    //         action.current = "interact"
    //     }

    //     rigidBody.current.applyImpulse(impulse, true)

    //     if (changeRotation) {
    //         const angle = Math.atan2(linvel.x, linvel.z)
    //         character.current.rotation.y = angle
    //     }

    //     // CAMERA FOLLOW
    //     // const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3)
    //     // state.camera.position.x = characterWorldPosition.x
    //     // state.camera.position.z = characterWorldPosition.z

    //     // const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)
    //     // state.camera.lookAt(targetLookAt)
    // })

    return (
        <group>
            <RigidBody ref={rigidBody} colliders={false} scale={[0.5, 0.5, 0.5]} enabledRotations={[false, false, false]}>
                <CapsuleCollider args={[0.6, 0.6]} position={[0, 1.2, 0]} />
                <group ref={character}>
                    <Character action={action.current} />
                </group>
            </RigidBody>
        </group>
    )
}