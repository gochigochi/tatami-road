import { useRef, useState, useEffect } from 'react'
import { useFrame } from "@react-three/fiber"
import { RigidBody, CapsuleCollider, CuboidCollider } from "@react-three/rapier"
import { useInput } from "../../../hooks/useInput"
import { useGameState } from "../../../store/gameState"
import { handleCharacterMovement } from './handleCharacterMovement'
import { handleCamera } from './handleCamera'
import Character from "./Character"
import Chat from "../Chat/Chat"


const CharacterController = () => {

    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))
    const { input, setInput } = useInput()
    const rigidBody = useRef()
    const character = useRef()
    const rotation = useRef(0)
    const intersectingNpc = useRef(false)
    const [npcData, setNpcData] = useState()
    const [interactingWidthNpc, setInteractingWithNpc] = useState({})
    const [npcScript, setNpcScript] = useState()
    const intersectingObject = useRef(false)
    const intersectingPort = useRef(false)
    
    useFrame((state, delta) => {

        handleCamera(state, character)

        if (gameState === "PLAY") {
            handleCharacterMovement(input, rigidBody, rotation, character)
        }

    })

    console.log(npcData)

    useEffect(() => {

        if (
            input.interact &&
            intersectingNpc.current.intersecting &&
            gameState !== "NPC_CONVERSATION"
        ) {
            // SET ALL THE DATA FROM THE NPC INTERSECTING WITH
            // AND SET THE INTERACTION TO TRUE AS TO RENDER CHAT
            // setInteractingWithNpc({
            //     bool: true,
            //     ...intersectingNpc.current
            // })

            updateGameState("NPC_CONVERSATION")
            setNpcData({
                position: intersectingNpc.current.npcPosition,
                content: intersectingNpc.current.data,
            })
        }

    }, [input.interact])

    // console.log('char controller')

    const handleIntersectionEnter = (payload) => {

        const { manifold, target, other } = payload

        //CHECK IF IS INTERSECTING WITH NPC, OBJECT OR PORT TO ANOTHER LEVEL, ETC
        //IF NPC THEN...
        intersectingNpc.current = {
            intersecting: true,
            data: other.rigidBodyObject.data,
            npcPosition: other.rigidBodyObject.position,
            //CHECK QUATERNION OR ROTATION TO ANIMATE ROTATION TWRDS PLAYER
        }
        //IF OBJECT THEN...
        //IF PORTAL THEN...
    }

    const handleIntersectionExit = (payload) => {
        //CHECK OBJECT STRUCTURE IF NEED TO RESET ALL
        intersectingNpc.current = { intersecting: false }
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
            {
                gameState === "NPC_CONVERSATION" && npcData ?
                    <Chat npcData={npcData} setNpcData={setNpcData} /> : null
            }
        </RigidBody>
    )
}

export default CharacterController