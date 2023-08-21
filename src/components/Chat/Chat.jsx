import React, { useEffect, useState, useRef } from "react"
import { Html } from "@react-three/drei"
import { useInput } from "../../hooks/useInput"
import { useGameProgress } from "../../store/gameProgress"
import { useGameState } from "../../store/gameState"
import "./styles.css"
import { useFrame } from "@react-three/fiber"

const Chat = ({ npcData, setNpcData }) => {

    const { gameState, updateGameState } = useGameState(state => ({ gameState: state.gameState, updateGameState: state.updateGameState }))
    const { gameCheckpoint, updateGameCheckpoint } = useGameProgress(state => ({ gameCheckpoint: state.gameCheckpoint, updateGameCheckpoint: state.updateGameCheckpoint}))
    const [scripts, setScripts] = useState()
    const [hideBubbles, setHideBubbles] = useState(false)
    const { interactionInput } = useInput()
    const [playerInputBox, setPlayerInputBox] = useState(false)
    const playerInput = useRef("")
    const playerInputRef = useRef()
    const interacted = useRef(false)

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
                    !scripts.currentScript?.isEnd
                ) {
                    //SET NEXT SCRIPT (A)
                    const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                    setScripts({ ...scripts, currentScript: nextScript })
                }


                if (scripts.currentScript?.requiresInput && !playerInputBox) {
                    setPlayerInputBox(true)
                }

                //EVALUATE WRITTEN ANSWER. CONDITIONS MEANS IS HANDLING PLAYER INPUT
                if (playerInputBox) {
                    console.log(playerInput.current)

                    if (playerInput.current === scripts.currentScript.correctAnsw) {
                        //SET NEXT SCRIPT (A)
                        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                        setScripts({ ...scripts, currentScript: nextScript })
                    } else {

                        console.log("error")
                        const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === "error")
                        setScripts({ ...scripts, currentScript: nextScript })
                    }

                    setPlayerInputBox(false)
                }

                //FINISH CONVERSATION AFTER ERROR OR NATURAL ENDING
                if (scripts.currentScript.node === "error" || scripts.currentScript?.isEnd) {
                    setHideBubbles(true)
                    setTimeout(() => {
                        updateGameState("PLAY")
                        interactionInput.current.interact = false
                    }, 500)

                    if (scripts.currentScript?.nextCheckpoint) {
                        // UPDATE LOCAL CHEKPOINT ON STORE IF HAS ANY
                        updateGameCheckpoint(scripts.currentScript.nextCheckpoint)
                    }

                    setNpcData()

                }
            }
        }

        // WHEN INTERACTION RELEASED
        if (!interactionInput.current.interact) interacted.current = false

    })

    const handleTextInput = (e) => playerInput.current = e.target.value

    if (hideBubbles) return <></>

    return (
        <Html as="div" position={[0, 1, 0]}>
            {
                scripts ?
                    <p className="bubble">{scripts.currentScript.text}</p> :
                    null
            }
            {
                playerInputBox ?
                    <input
                        onChange={handleTextInput}
                        ref={playerInputRef}
                        type="text"
                        autoFocus
                    />
                    :
                    null
            }
        </Html>
    )
}

// export default Chat
export default React.memo(Chat)
