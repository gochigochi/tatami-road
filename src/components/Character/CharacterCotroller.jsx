import { useRef } from 'react'
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import Character from "."
import { useFrame } from "@react-three/fiber"
import { useInput } from '../../hooks/useInput'

import * as THREE from "three"

const MOVEMENT_SPEED = .2
const MAX_VEL = 2

export const CharacterController = () => {

    const input = useInput()
    const rigidBody = useRef()
    const character = useRef()

    const collided = useRef()


    if (input.interact) {
        console.log('interaction')

        
        // IF INTERATCION IS EFFECTIVE, CHANGE ANIMATION, MOVE CAMERA TO FOCUS CONVERSATION
        // SET ALL INPUT TO FALSE AND DISABLE MOVEMENT KEYS (EXECUTE ALL THE MOVEMENT ONLY
        // IF IT IS OUT OF CONVERSATION, OUT OF EXERCISE OR OUT OF MENU)
        // action.current = "interact"
    }

    //MOVEMENT
    useFrame((state) => {

        const impulse = { x: 0, y: 0, z: 0 }

        const linvel = rigidBody.current?.linvel()
        let changeRotation = false

        if (input.forward && linvel.z > -MAX_VEL) {

            if (input.right && linvel.x < MAX_VEL) {
                impulse.z -= MOVEMENT_SPEED
                impulse.x += MOVEMENT_SPEED

            } else if (input.left && linvel.x > -MAX_VEL) {
                impulse.z -= MOVEMENT_SPEED
                impulse.x -= MOVEMENT_SPEED
            } else {
                impulse.z -= MOVEMENT_SPEED
            }

            changeRotation = true
        }
        if (input.backward && linvel.z < MAX_VEL) {

            if (input.right && linvel.x < MAX_VEL) {
                impulse.z += MOVEMENT_SPEED
                impulse.x += MOVEMENT_SPEED

            } else if (input.left && linvel.x > -MAX_VEL) {
                impulse.z += MOVEMENT_SPEED
                impulse.x -= MOVEMENT_SPEED
            } else {
                impulse.z += MOVEMENT_SPEED
            }

            changeRotation = true
        }
        if (input.left && !input.forward && !input.backward && linvel.x > -MAX_VEL) {
            impulse.x -= MOVEMENT_SPEED
            changeRotation = true
        }
        if (input.right && !input.forward && !input.backward && linvel.x < MAX_VEL) {
            impulse.x += MOVEMENT_SPEED
            changeRotation = true
        }

        rigidBody.current?.applyImpulse(impulse, true)

        if (changeRotation) {
            const angle = Math.atan2(linvel.x, linvel.z)
            // console.log(angle)
            character.current.rotation.y = angle
        }


        // CAMERA FOLLOW
        const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3)

        state.camera.position.x = characterWorldPosition.x
        state.camera.position.z = characterWorldPosition.z + 14

        const targetLookAt = new THREE.Vector3(characterWorldPosition.x, 0, characterWorldPosition.z)
        state.camera.lookAt(targetLookAt)
    })


    return (
        <group>
            <RigidBody 
                ref={rigidBody} 
                colliders={false} 
                scale={[0.5, 0.5, 0.5]} 
                enabledRotations={[false, false, false]}
                position={[0, 0, 0]}
            >
                <CapsuleCollider args={[0.6, 0.6]} position={[0, 14, 0]} />
                <group ref={character}>
                    <Character input={input} />
                </group>
            </RigidBody>
        </group>
    )
}