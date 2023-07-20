import { useEffect, useState, useRef } from "react"
import * as THREE from 'three'
import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useInput } from "../../../hooks/useInput"
import { useGameProgress } from "../../../store/gameProgress"
import { useGameState } from "../../../store/gameState"
import "./styles.css"

const Chat = ({ npcId, scripts, npcRef, setInteracting }) => {

    const updateGameState = useGameState(state => state.updateGameState)
    const { checkpoint, npcsScriptsIndex, createNpcInStore } = useGameProgress(state => ({ checkpoint: state.checkpoint, npcsScriptsIndex: state.npcsScriptsIndex, createNpcInStore: state.createNpcInStore }))
    const input = useInput()
    const[allowInput, setAllowInput] = useState(false)
    const [npcScript, setNpcScript] = useState({ scripts: [], currentScript: {} })
    const npcWorldPosition = useRef()
    const npcMsjPosition = useRef()

    // console.log(npcId, npcsCurrentNodes, scripts, checkpoint)

    // console.log(scripts)

    useEffect(() => {

        // console.log('Find or create current NPC in store to track current script...')


        //GET NPC`s CURRENT POSITION TO SET MESSAGE X POSITION IN REFERENCE TO THE CHARACTER
        //Y POSITION IS HARDCODED? Z IS 0
        // npcWorldPosition.current = npcRef.current.getWorldPosition(new THREE.Vector3)
        // npcMsjPosition.current = [
        //     npcWorldPosition.current.x,
        //     npcWorldPosition.current.y + 1,
        //     npcWorldPosition.current.z,
        // ]

        //GET CURRENT SCRIPT
        const npcScriptIndex = npcsScriptsIndex.find(npc => npc.id == npcId)
        const currentScripts = scripts.find(script => script.checkpoint === checkpoint)
        let currentScript

        if (!npcScriptIndex) {
            // console.log('NPC doesnt exist on store so create it')
            createNpcInStore(npcId)
            currentScript = currentScripts.texts.find(script => script.node === 0)
        } else {
            // console.log('NPC exist on store so just find his current script')
            currentScript = currentScripts.texts.find(script => script.node === npcScriptIndex.index)
        }

        setNpcScript({
            scripts: currentScripts,
            currentScript
        })

        // AVOID QUICK INTERACTIONS
        setTimeout(() => setAllowInput(true), 650)

    }, [])

    // console.log(npcScript)

    useEffect(() => {

        // console.log('Use Effect for the input Interact')

        if (input.interact && npcScript.currentScript.nextNode !== null) {
            // console.log('NPC has something to say after this')
            const nextScript = npcScript.scripts.texts.find(text => text.node === npcScript.currentScript.nextNode)
            // console.log(nextScript)
            setNpcScript({ ...npcScript, currentScript: nextScript })

            // AVOID QUICK INTERACTIONS
            setTimeout(() => setAllowInput(true), 650)
        }

        if (input.interact && npcScript.currentScript.nextNode === null) {
            console.log('Conversation FINISHED')
            updateGameState("TRANSITION")
            setTimeout(() => updateGameState("PLAY"), 200)
        }

        if(allowInput) setAllowInput(false)

    }, [input.interact])

    return (
        <>
            {
                npcScript.currentScript ?
                    <Html as="div" position={[0, 1, 0]}>
                        <p className="bubble">{npcScript.currentScript.text}</p>
                        {
                            allowInput ? <div>asda</div>
                        }
                    </Html> :
                    null
            }
        </>
    )
}

export default Chat