import { useState, useRef, useEffect } from 'react'
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier"
import { useGameState } from '../../store/gameState'
import Npc from './Npc'
import Notification from '../Notification/Notification'

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
    const [interacting, setInteracting] = useState(false)
    const rigidBody = useRef()
    const npcRef = useRef()
    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))

    useEffect(() => {

        if (gameState === "NPC_CONVERSATION" && intersecting) {
            // console.log(`animate NPC ID: ${id}`)
            setInteracting(true)
        }

        //SHOW NAME TAG IF NOT TALKING TO NPC
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
            data={{ npcId: id, npcScripts: scripts, npcRef: npcRef}}
            colliders={false}
        >
            <CapsuleCollider args={[.3, .3]} />
            <CuboidCollider
                args={[.5, .5, .5]}
                sensor
                onIntersectionEnter={handleIntersectionEnter}
                onIntersectionExit={handleIntersectionExit}
            />
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
        </RigidBody>
    )
}

export default NpcController