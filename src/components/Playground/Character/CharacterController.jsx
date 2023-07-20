import { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber"
import { RigidBody, CapsuleCollider, CuboidCollider } from "@react-three/rapier"
import { useInput } from "../../../hooks/useInput"
import { useGameState } from "../../../store/gameState"
import { handleCharacterMovement } from './handleCharacterMovement'
import { handleCamera } from './handleCamera'
import Character from "./Character"


const CharacterController = () => {

    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))
    const input = useInput()
    const rigidBody = useRef()
    const character = useRef()
    let rotation = useRef(0)
    let intersectingNpc = useRef(false)
    const intersectingObject = useRef(false)
    const intersectingPort = useRef(false)

    // console.log(gameState)

    useFrame((state, delta) => {

        handleCamera(state, character)

        if (gameState === "PLAY") {
            handleCharacterMovement(input, rigidBody, rotation, character)
        }

        if (intersectingNpc.current && input.interact && gameState !== "NPC_CONVERSATION" && gameState !== "TRANSITION") {
            updateGameState("NPC_CONVERSATION")
        }

        // if(gameState === "NPC_CONVERSATION" && input.interact) {
        //     updateGameState("PLAY")
        // }

    })

    const handleIntersectionEnter = (payload) => {

        const { manifold, target, other } = payload

        //CHECK IF IS INTERSECTING WITH NPC, OBJECT OR PORT TO ANOTHER LEVEL, ETC
        //IF NPC THEN...
        intersectingNpc.current = true

        // setIntersecting(true)
        //OTHER IS THIS OBJECT
        //TARGET IS THE PLAYER
        // console.log(other)
        // console.log(target)
    }

    const handleIntersectionExit = (payload) => {
        intersectingNpc.current = false
        // setIntersecting(false)
    }

    return (
        <RigidBody
            ref={rigidBody}
            enabledRotations={[false, false, false]}
            position={[-2, 2, 2]}
            colliders={false}
        >
            <CapsuleCollider args={[.3, .3]} position={[0, 0, 0]} />
            <CuboidCollider
                args={[.5, .5, .5]}
                position={[0, 0, 0]}  //THIS IS THE DEFAULT
                sensor
                onIntersectionEnter={handleIntersectionEnter}
                onIntersectionExit={handleIntersectionExit}
            />
            <group ref={character} position={[0, -.6, 0]}>
                <Character input={input} gameState={gameState} />
            </group>
        </RigidBody>
    )
}

export default CharacterController