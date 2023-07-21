import { useEffect, useState, useRef } from "react"
import * as THREE from 'three'
import { Html } from "@react-three/drei"
import { useInput } from "../../../hooks/useInput"
import { useGameProgress } from "../../../store/gameProgress"
import { useGameState } from "../../../store/gameState"
import "./styles.css"

const Chat = ({ npcData, setNpcData }) => {

    const [scripts, setScripts] = useState()
    const { input } = useInput()
    const updateGameState = useGameState(state => state.updateGameState)
    const { globalCheckpoint, npcsLocalCheckpointIndex, createNpcInStore } = useGameProgress(state => ({ globalCheckpoint: state.globalCheckpoint, npcsLocalCheckpointIndex: state.npcsLocalCheckpointIndex, createNpcInStore: state.createNpcInStore }))

    useEffect(() => {
                
        // console.log(npcData)

        // Get this NPCs data from the store
        const npcLocalCheckpointIndex = npcsLocalCheckpointIndex.find(npc => npc.id === npcData.content.npcId)
        let currentScripts
        let currentScript

        // Check if the npc is already in the store, else create it with local checkpoint to 0
        if(!npcLocalCheckpointIndex) {

            console.log('NPC doesn-t exist in store. Create it')
            createNpcInStore(npcData.content.npcId)
            
            // Get current script according to global checkpoint and local checkpointIndex
            // ((If NPC data has no checkpoint matching globalcheckpoint, search for biggest
            // checkpoint and set that one??))

            // Get scripts according to globalCheckpoint
            currentScripts = npcData.content.npcScripts.find(scripts => scripts.checkpoint === globalCheckpoint )
            // console.log(currentScripts)

            // From all the scripts (array of objects), find current first script using local checkpointIndex
            currentScript = currentScripts.checkpointScripts.find(scripts => scripts.node === 0)


        } else {

            // Grab scripts according to globalCheckpoint
            currentScripts = npcData.content.npcScripts.find(scripts => scripts.checkpoint === globalCheckpoint )

            currentScript = currentScripts.checkpointScripts.find(scripts => scripts.node === 0)


        }

        setScripts({
            currentScripts: currentScripts,
            currentScript: currentScript,
        })


    }, [])

    useEffect(() => {

        // Always check if it is true to prevent fireing on keyup
        if (input.interact) {

            if(scripts.currentScript.nextNode) {
                const nextScript = scripts.currentScripts.checkpointScripts.find(script => script.node === scripts.currentScript.nextNode)
                setScripts({...scripts, currentScript: nextScript})
            }

            // console.log(scripts)

            if(!scripts.currentScript.nextNode) {
                updateGameState("PLAY")
                setNpcData(undefined)
            }

        }

    }, [input.interact])

    return (
        <>
            {
                scripts ?
                <Html as="div" position={[0, 1, 0]}>
                    <p className="bubble">{scripts.currentScript.text}</p>
                </Html> :
                null
            }
        </>
    )
}

export default Chat

// const Chat = ({ npcId, scripts, npcRef, setInteracting }) => {

//     const updateGameState = useGameState(state => state.updateGameState)
//     const { checkpoint, npcsScriptsIndex, createNpcInStore } = useGameProgress(state => ({ checkpoint: state.checkpoint, npcsScriptsIndex: state.npcsScriptsIndex, createNpcInStore: state.createNpcInStore }))
//     const [allowInput, setAllowInput] = useState(false)
//     const [npcScript, setNpcScript] = useState({ scripts: [], currentScript: {} })




//     // useEffect(() => {

//     //     //GET CURRENT SCRIPT
//     //     const npcScriptIndex = npcsScriptsIndex.find(npc => npc.id == npcId)
//     //     const currentScripts = scripts.find(script => script.checkpoint === checkpoint)
//     //     let currentScript

//     //     if (!npcScriptIndex) {
//     //         // console.log('NPC doesnt exist on store so create it')
//     //         createNpcInStore(npcId)
//     //         currentScript = currentScripts.texts.find(script => script.node === 0)
//     //     } else {
//     //         // console.log('NPC exist on store so just find his current script')
//     //         currentScript = currentScripts.texts.find(script => script.node === npcScriptIndex.index)
//     //     }

//     //     setNpcScript({
//     //         scripts: currentScripts,
//     //         currentScript
//     //     })

//     //     // AVOID QUICK INTERACTIONS
//     //     setTimeout(() => setAllowInput(true), 650)

//     // }, [])

 



//     // useEffect(() => {

//     //     // console.log('Use Effect for the input Interact')

//     //     if (input.interact && npcScript.currentScript.nextNode !== null) {
//     //         // console.log('NPC has something to say after this')
//     //         const nextScript = npcScript.scripts.texts.find(text => text.node === npcScript.currentScript.nextNode)
//     //         // console.log(nextScript)
//     //         setNpcScript({ ...npcScript, currentScript: nextScript })

//     //         // AVOID QUICK INTERACTIONS
//     //         setTimeout(() => setAllowInput(true), 650)
//     //     }

//     //     if (input.interact && npcScript.currentScript.nextNode === null) {
//     //         console.log('Conversation FINISHED')
//     //         updateGameState("TRANSITION")
//     //         setTimeout(() => updateGameState("PLAY"), 200)
//     //     }

//     // }, [input.interact])

//     return (
//         <>


//             {/* {
//                 npcScript.currentScript ?
//                     <Html as="div" position={[0, 1, 0]}>
//                         <p className="bubble">{npcScript.currentScript.text}</p>
//                     </Html> :
//                     null
//             } */}
//         </>
//     )
// }

// export default Chat