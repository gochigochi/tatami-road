import { useEffect, useState, useRef } from "react"
import { Html } from "@react-three/drei"
import { useInput } from "../../hooks/useInput"
import { useGameProgress } from "../../store/gameProgress"
import { useGameState } from "../../store/gameState"
import "./styles.css"

const Chat = ({ npcData, setNpcData }) => {

    const updateGameState = useGameState(state => state.updateGameState)
    const { globalCheckpoint, npcsLocalCheckpointIndex, createNpcInStore } = useGameProgress(state => ({ globalCheckpoint: state.globalCheckpoint, npcsLocalCheckpointIndex: state.npcsLocalCheckpointIndex, createNpcInStore: state.createNpcInStore }))
    const [scripts, setScripts] = useState()
    const { input } = useInput()
    const [playerInputBox, setPlayerInputBox] = useState(false)
    const playerInput = useRef("")
    const playerInputRef = useRef()
    const isInputInteract = useRef(false)

    // SET FIRST MESSAGE
    useEffect(() => {

        // Get this NPCs data from the store
        const npcLocalCheckpointIndex = npcsLocalCheckpointIndex.find(npc => npc.id === npcData.content.npcId)
        let currentScripts
        let currentScript

        // Check if the npc is already in the store, else create it with local checkpoint to 0
        if (!npcLocalCheckpointIndex) {

            // console.log('NPC doesn-t exist in store. Create it')
            createNpcInStore(npcData.content.npcId)

            // Get scripts according to globalCheckpoint
            currentScripts = npcData.content.npcScripts.find(scripts => scripts.checkpoint === globalCheckpoint)

            // From all the scripts (array of objects), find current first script using local checkpointIndex
            currentScript = currentScripts.checkpointScripts.find(scripts => scripts.node === 0)


        } else {

            // Grab scripts according to globalCheckpoint
            currentScripts = npcData.content.npcScripts.find(scripts => scripts.checkpoint === globalCheckpoint)
            
            currentScript = currentScripts.checkpointScripts.find(scripts => scripts.node === 0)

        }

        setScripts({
            currentScripts: currentScripts,
            currentScript: currentScript,
        })


    }, [])


    // HANDLES THE DIALOGUE FLOW
    useEffect(() => {

        // Always check if it is true to prevent fireing on keyup
        // CHECK IF INTERACTION COMES FROM INPUT OR OTHER EXCERSICE.
        // IF INPUT OR OTHER EXCERCISE HANDLE THE NEXT INPUT CALCULATION IN THE HANDLERS.
        // THE ACTIONS AS TO END CONVERSATION OR OPEN THE INPUT BOX, ETC IS HANDLED IN THE USEFFECT FOR THE SCRIPTS CHANGES
        if (input.interact && !playerInputBox && !isInputInteract.current) {


            if (scripts.currentScript?.nextNode && !scripts.currentScript?.requiresInput) {
                const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                setScripts({ ...scripts, currentScript: nextScript })
            }

            if (!scripts.currentScript?.nextNode) {
                const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                setScripts({ ...scripts, currentScript: nextScript })
            }

        }
            
        if (isInputInteract.current) isInputInteract.current = false

    }, [input.interact])

    // HANDLES DIALOGUE FLOW WHEN:
    // THERE IS AN INPUT OR OTHER EXERCISE
    // WHEN CONVERSATION HAS TO FINISH
    useEffect(() => {

        if (scripts?.currentScript.requiresInput) {
            setPlayerInputBox(true)
        }

        if (scripts?.currentScript.node === -2) {
            updateGameState("PLAY")
            setNpcData(undefined)
        }

    }, [scripts?.currentScript])

    const handleSubmit = (e) => {
        e.preventDefault()
        isInputInteract.current = true

        // IF ANSWER IS CORRECT
        if (playerInput.current === scripts.currentScript.correctAnsw) {

            if (scripts.currentScript.nextNode) {
                const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                setScripts({ ...scripts, currentScript: nextScript })
            }

        } else {

            //ELSE SET ERROR MESSAGE
            const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === -1)
            setScripts({ ...scripts, currentScript: nextScript })

        }

        setPlayerInputBox(false)
    }

    const handleTextInput = (e) => playerInput.current = e.target.value

    return (
        <Html as="div" position={[0, 1, 0]}>
            {
                scripts ?
                    <p className="bubble">{scripts.currentScript.text}</p> :
                    null
            }
            {
                playerInputBox ?
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={handleTextInput}
                            ref={playerInputRef}
                            type="text"
                            autoFocus
                        />
                        <button type="submit" />
                    </form>
                    :
                    null
            }
        </Html>
    )
}

export default Chat