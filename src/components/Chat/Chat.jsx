import React, { useEffect, useState, useRef } from "react"
import { Html } from "@react-three/drei"
import { AnimatePresence } from "framer-motion"
import { useInput } from "../../hooks/useInput"
import { useGameProgress } from "../../store/gameProgress"
import { useGameState } from "../../store/gameState"
import { useInterfaceState } from "../../store/interfaceState"
import "./styles.css"
import { useFrame } from "@react-three/fiber"
import { bubbleMotions, draggablesMotions, draggableMotion } from "./Motions"
import { Bubble, DraggabalesBox, Draggable } from "./Elements"
import * as THREE from "three"

const Chat = ({ npcData, setNpcData }) => {

    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))
    const { gameCheckpoint, updateGameCheckpoint } = useGameProgress(state => ({ gameCheckpoint: state.gameCheckpoint, updateGameCheckpoint: state.updateGameCheckpoint }))
    const updateInteractionButton = useInterfaceState(state => state.updateInteractionButton)
    const updateLifeMeter = useInterfaceState(state => state.updateLifeMeter)
    const [scripts, setScripts] = useState()
    const [hideBubbles, setHideBubbles] = useState(false)
    const { interactionInput } = useInput()
    const interacted = useRef(false)
    const [playerInputBox, setPlayerInputBox] = useState(false)
    const playerInput = useRef("")
    const playerInputRef = useRef()
    const [playerDragBox, setPlayerDragBox] = useState(false)
    const [draggables, setDraggables] = useState([])
    const dragged = useRef()
    const draggedOver = useRef()
    // const [npcMsgPosition, setNpcMsgPosition] = useState(new THREE.Vector3(npcData.position.x, npcData.position.y, npcData.position.z))

    console.log(npcData)
    // console.log(npcMsgPosition)

    // SET SCRIPTS AND FIRST MESSAGE
    useEffect(() => {

        //GET SCRIPTS ACCORDING TO CHECKPOINT
        const currentScripts = npcData.content.npcScripts.findLast(scripts => scripts.checkpoint <= gameCheckpoint)
        const currentScript = currentScripts.checkpointScripts.find(scripts => scripts.node === 0)
        setScripts({
            currentScripts: currentScripts,
            currentScript: currentScript,
        })

    }, [])

    useFrame(() => {

        // WHEN CHAT INTERACTION
        if (interactionInput.current.interact && gameState === "NPC_CONVERSATION") {

            if (!interacted.current) {

                interacted.current = true


                if (
                    scripts.currentScript?.nextNode &&
                    !scripts.currentScript?.requiresInput &&
                    !scripts.currentScript?.requiresDrag &&
                    !scripts.currentScript?.isEnd
                ) {
                    //SET NEXT SCRIPT (A)
                    const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                    // REMOVE SCRIPTS AND SET THEM AGAIN AS TO CLOSE OPEN SPEECH BUBBLE
                    setScripts()
                    setTimeout(() => setScripts({ ...scripts, currentScript: nextScript }), 500)
                    // setScripts({ ...scripts, currentScript: nextScript })
                }


                if (scripts.currentScript?.requiresInput && !playerInputBox) {
                    setPlayerInputBox(true)
                }

                if (scripts.currentScript?.requiresDrag && !playerDragBox) {
                    setPlayerDragBox(true)
                    setDraggables(scripts.currentScript?.draggables)
                }

                //EVALUATE WRITTEN ANSWER. IS HANDLING PLAYER INPUT
                if (playerInputBox) {
                    // console.log(playerInput.current)

                    if (playerInput.current === scripts.currentScript.correctAnsw) {
                        //SET NEXT SCRIPT (A)
                        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                        // REMOVE SCRIPTS AND SET THEM AGAIN AS TO CLOSE OPEN SPEECH BUBBLE
                        setScripts()
                        setTimeout(() => setScripts({ ...scripts, currentScript: nextScript }), 500)
                        // setScripts({ ...scripts, currentScript: nextScript })
                    } else {
                        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === "error")
                        setScripts({ ...scripts, currentScript: nextScript })
                    }

                    setPlayerInputBox(false)
                }

                if (playerDragBox) {

                    const answ = draggables.join("")

                    if (answ === scripts.currentScript?.correctAnsw) {
                        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                        setScripts({ ...scripts, currentScript: nextScript })
                        updateLifeMeter(5, "inc")
                    } else {
                        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === "error")
                        setScripts({ ...scripts, currentScript: nextScript })
                        updateLifeMeter(5, "dec")
                    }

                    setPlayerDragBox(false)
                }


                //FINISH CONVERSATION AFTER ERROR OR NATURAL ENDING
                if (scripts.currentScript.node === "error" || scripts.currentScript?.isEnd) {
                    setHideBubbles(true)
                    setTimeout(() => {
                        updateGameState("PLAY")
                        setNpcData()
                        interactionInput.current.interact = false
                    }, 300)

                    console.log('this')
                    if (scripts.currentScript?.nextCheckpoint) {
                        // UPDATE LOCAL CHEKPOINT ON STORE IF HAS ANY
                        updateGameCheckpoint(scripts.currentScript.nextCheckpoint)
                    }
                }
            }
        }

        // WHEN INTERACTION RELEASED
        if (!interactionInput.current.interact) interacted.current = false

    })

    const handleTextInput = (e) => playerInput.current = e.target.value

    const handleDragStart = (draggable) => dragged.current = draggable

    const handleDragEnter = (draggable) => draggedOver.current = draggable

    const handleDragEnd = () => {

        const draggedIndex = draggables.indexOf(dragged.current)
        const draggedOverIndex = draggables.indexOf(draggedOver.current)
        const draggablesCopy = [...draggables]

        draggablesCopy[draggedOverIndex] = draggablesCopy.splice(draggedIndex, 1, draggablesCopy[draggedOverIndex])[0]
        setDraggables(draggablesCopy)
    }

    // if (hideBubbles) return <></>

    // console.log(scripts)

    return (
        <>
            <Html as="div" wrapperClass="bubbles-container" position={[0, 1, 0]}>
                <AnimatePresence>
                    {
                        scripts && !hideBubbles ?
                            <Bubble
                                variants={bubbleMotions}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                class="bubble"
                                dangerouslySetInnerHTML={{ __html: scripts.currentScript.text }}
                            /> :
                            null
                    }
                </AnimatePresence>
            </Html>
            <Html as="div" wrapperClass="bubbles-container" position={[0, 0, 0]}>
                {
                    playerInputBox ?
                        <input
                            class="player-input"
                            onChange={handleTextInput}
                            ref={playerInputRef}
                            type="text"
                            autoFocus
                        /> : null
                }
                <AnimatePresence>
                    {
                        playerDragBox && draggables.length !== 0 ?
                            <DraggabalesBox
                                variants={draggablesMotions}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {
                                    draggables.map(draggable => {
                                        return (
                                            <Draggable
                                                variants={draggableMotion}
                                                key={draggable}
                                                class="draggable"
                                                draggable="true"
                                                droppable="true"
                                                onDragStart={() => handleDragStart(draggable)}
                                                onDragEnter={() => handleDragEnter(draggable)}
                                                onDragEnd={handleDragEnd}
                                            >
                                                {draggable}
                                            </Draggable>
                                        )
                                    })
                                }
                            </DraggabalesBox> : null
                    }
                </AnimatePresence>
            </Html>
        </>
    )
}

// export default Chat
export default React.memo(Chat)
