import { useState, useRef, useEffect } from 'react'
import { CapsuleCollider, CuboidCollider, RigidBody } from "@react-three/rapier"
import { useGameState } from '../../../store/gameState'
import Npc from './Npc'
import Notification from '../../Notification/Notification'
import Chat from '../Chat/Chat'

const NpcController = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    restitution = 1.7,
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
    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState}))

    console.log('///////////////////////////////////////')
    console.log('Interaction in controller', interacting)

    useEffect(() => {

        console.log(gameState)
        
        if (gameState === "NPC_CONVERSATION" && intersecting) {

            console.log('Interacting....')

            setInteracting(true)
            //Search if this npc is in store and get the current node
            //Else set it as new npc and set current node to 1

            //In conversation update locally here the textNode but keeping the initial one
            //Update the current node in the store once the conversation is satisfactory, else
            //it will return automatically to the initial node (i.e. if conversation fails, the
            //next time the player talks to the npc it will have the same chat secuence)
        } else {
            setInteracting(false)
        }

        console.log('effect ended')
    }, [gameState])

    // useEffect(() => { 

    //     console.log('this')

    //     if (!interacting) updateGameState("PLAY") 
    // }, [interacting])

    const handleIntersectionEnter = (payload) => {

        // const { manifold, target, other } = payload

        setIntersecting(true)
        //OTHER IS THIS OBJECT
        //TARGET IS THE PLAYER
        // console.log(other)
        // console.log(target)
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
            data={scripts}
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
            {
                interacting && gameState === "NPC_CONVERSATION" ?
                    <Chat
                        npcId={id}
                        scripts={scripts}
                        npcRef={npcRef}
                        setInteracting={setInteracting}
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