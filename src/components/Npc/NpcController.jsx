import { useState, useRef, useEffect } from 'react'
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier"
import { useGameState } from '../../store/gameState'
import Npc from './Npc'
import Notification from '../Notification/Notification'
import Chat from '../Chat/Chat'
import { useInput } from '../../hooks/useInput'
import { AnimatePresence } from 'framer-motion'

const NpcController = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    type = "kinematicPosition",
    model = "",
    name = "ある　ひと",
    scripts = [],
    id,
}) => {

    const [intersecting, setIntersecting] = useState(false)
    const [interacting, setInteracting] = useState(false) // VER SI MEJOR USErEF
    const rigidBody = useRef()
    const npcRef = useRef()
    const { interactionInput } = useInput()
    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))

    useFrame(() => {

        if (
            interactionInput.current.interact &&
            intersecting &&
            gameState !== "NPC_CONVERSATION"
        ) {
            updateGameState("NPC_CONVERSATION")
        }

        //PREVENT PLAYER HOLDS THE INTERACTION BUTTON IMMEDIATELLY
        if (interactionInput.current.interact) setTimeout(() => interactionInput.current.interact = false, 100)

    })

    useEffect(() => {

        if (gameState === "NPC_CONVERSATION" && intersecting) {
            setInteracting(true)
        }

        //SHOW NAME TAG IF NOT TALKING TO NPC AFTER CONVERSATION
        if (gameState === "PLAY") setInteracting(false)

    }, [gameState])

    const handleIntersectionEnter = (payload) => {


        setIntersecting(true)
    }

    const handleIntersectionExit = (payload) => {
        setIntersecting(false)
    }

    return (
        <RigidBody
            ref={rigidBody}
            enabledRotations={[false, false, false]}
            position={position}
            rotation={rotation}
            // type={type}
            data={{ npcId: id, npcScripts: scripts, npcRef: npcRef }}
            colliders={false}
        >
            <CapsuleCollider args={[.3, .3]} />
            <CuboidCollider
                args={[.5, .5, .5]}
                sensor
                onIntersectionEnter={handleIntersectionEnter}
                onIntersectionExit={handleIntersectionExit}
            />
            {/* NAME TAG APPEAR ON INTERSECTING */}
            {
                intersecting && !interacting ?
                    <Notification
                        name={name}
                    /> :
                    null
            }
            <group ref={npcRef} position={[0, -.6, 0]}>
                <Npc model={model} interacting={interacting} />
            </group>
            {/* CONVERSATION INTERACTION */}
            <AnimatePresence mode="wait">
                {
                    gameState === "NPC_CONVERSATION" && interacting ? <Chat npcScripts={scripts} /> : null
                }
            </AnimatePresence>
        </RigidBody>
    )
}

export default NpcController