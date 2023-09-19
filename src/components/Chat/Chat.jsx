import React, { useEffect, useState, useRef } from "react"
import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { AnimatePresence } from "framer-motion"
import { useGameProgress } from "../../store/gameProgress"
import { useGameState } from "../../store/gameState"
import { useChatState } from "../../store/chatState"
import { useInput } from "../../hooks/useInput"
import { bubbleMotions } from "./Motions"
import { Bubble } from "./Elements"
import "./styles.css"

const Chat = ({ npcScripts }) => {

    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))
    const { gameCheckpoint, updateGameCheckpoint } = useGameProgress(state => ({
        gameCheckpoint: state.gameCheckpoint,
        updateGameCheckpoint: state.updateGameCheckpoint
    }))
    const {
        playerInputBox,
        updatePlayerInputBox,
        playerInputValue,
        playerDragBox,
        updatePlayerDragBox,
        playerDraggables,
        updatePlayerDraggables,
    } = useChatState(state => ({
        playerInputBox: state.playerInputBox,
        playerInputValue: state.playerInputValue,
        updatePlayerInputBox: state.updatePlayerInputBox,
        playerDragBox: state.playerDragBox,
        playerDraggables: state.playerDraggables,
        updatePlayerDragBox: state.updatePlayerDragBox,
        updatePlayerDraggables: state.updatePlayerDraggables,
    }))
    const [scripts, setScripts] = useState()
    const [hideBubbles, setHideBubbles] = useState(false)
    const { interactionInput } = useInput()
    const interacted = useRef(false)

    const setNextScript = (nextNode) => {
        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === nextNode)
        setScripts()// REMOVE SCRIPTS AND SET THEM AGAIN AS TO CLOSE OPEN SPEECH BUBBLE
        setTimeout(() => setScripts({ ...scripts, currentScript: nextScript }), 200)
    }

    // SET SCRIPTS AND FIRST MESSAGE
    useEffect(() => {

        //GET SCRIPTS ACCORDING TO CHECKPOINT
        const currentScripts = npcScripts.findLast(scripts => scripts.checkpoint <= gameCheckpoint)
        const currentScript = currentScripts.checkpointScripts.find(scripts => scripts.node === 0)
        setScripts({
            currentScripts: currentScripts,
            currentScript: currentScript,
        })

    }, [])

    useFrame(() => {

        if (interactionInput.current.interact && gameState === "NPC_CONVERSATION") {

            if (!interacted.current) {

                interacted.current = true

                if (
                    scripts.currentScript?.nextNode &&
                    !scripts.currentScript?.requiresInput &&
                    !scripts.currentScript?.requiresDrag &&
                    !scripts.currentScript?.isEnd
                ) {
                    setNextScript(scripts.currentScript.nextNode)
                }

                if (scripts.currentScript?.requiresInput && !playerInputBox) {
                    updatePlayerInputBox(true)
                }

                if (scripts.currentScript?.requiresDrag && !playerDragBox) {
                    updatePlayerDragBox(true)
                    updatePlayerDraggables(scripts.currentScript?.draggables)
                }

                // EVALUATE WRITTEN ANSWER IN INPUT VALUE
                if (playerInputBox) {

                    if (playerInputValue === scripts.currentScript.correctAnsw) {
                        setNextScript(scripts.currentScript.nextNode)
                    } else {
                        setNextScript("error")
                    }

                    updatePlayerInputBox(false)
                }

                // EVALUATE DRAGGABLES ANSWER IN DRAGGABLES
                if (playerDragBox) {

                    const answ = playerDraggables.join("")

                    if (answ === scripts.currentScript?.correctAnsw) {
                        setNextScript(scripts.currentScript.nextNode)
                        // updateLifeMeter(5, "inc")
                    } else {
                        setNextScript("error")
                        // updateLifeMeter(5, "dec")
                    }

                    updatePlayerDragBox(false)
                    updatePlayerDraggables([])
                }

                //FINISH CONVERSATION AFTER ERROR OR NATURAL ENDING
                if (scripts.currentScript.node === "error" || scripts.currentScript?.isEnd) {
                    setHideBubbles(true)
                    setTimeout(() => {
                        updateGameState("PLAY")
                        // setNpcData()
                        interactionInput.current.interact = false
                    }, 300)

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
                                dangerouslySetInnerHTML={{ __html: scripts.currentScript.text }}
                            /> :
                            null
                    }
                </AnimatePresence>
            </Html>
            {/* ADD KIND OF A TOAST EMOJI FOR ERRORS OR ASSERTIONS */}
        </>
    )
}

export default React.memo(Chat)