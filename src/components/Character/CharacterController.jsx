import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { RigidBody, CapsuleCollider, CuboidCollider } from "@react-three/rapier"
import { useGameState } from '../../store/gameState'
import { useChatState } from '../../store/chatState'
import { useInput } from '../../hooks/useInput'
import { handleCharacterMovement } from './handleCharacterMovement'
import { handleCamera } from './handleCamera'
import Character from "./Character"
import { AnimatePresence } from "framer-motion"
import { DraggablesBox, Draggable, InputField, InputFieldContainer } from '../Chat/Elements'
import { bubbleMotions, draggablesMotions, draggableMotion } from '../Chat/Motions'
import "./styles.css"

const CharacterController = () => {

    // TODO ADD SELECT WORDS FOR EXCERCISE ///////////////////////////////
    // TODO ADD COMPLETE THE SENTENCE  ///////////////////////////////

    const { gameState } = useGameState(state => ({ gameState: state.gameState }))
    const { input } = useInput()
    const {
        playerInputBox,
        updatePlayerInputValue,
        playerDragBox,
        playerDraggables,
        updatePlayerDraggables,
    } = useChatState(state => ({
        playerInputBox: state.playerInputBox,
        updatePlayerInputValue: state.updatePlayerInputValue,
        playerDragBox: state.playerDragBox,
        playerDraggables: state.playerDraggables,
        updatePlayerDraggables: state.updatePlayerDraggables,
    }))
    const rigidBody = useRef()
    const character = useRef()
    const rotation = useRef(0)
    const dragged = useRef()
    const draggedOver = useRef()

    useFrame((state, delta) => {

        handleCamera(state, character)

        if (gameState === "PLAY") {
            handleCharacterMovement(input, rigidBody, rotation, character)
        }

    })

    const handleTextInput = (e) => {
        console.log(e.target.value)
        // TODO SET A BOUNDARY ///////////////////////////////
        updatePlayerInputValue(e.target.value)

    }

    const handleDragStart = (draggable) => dragged.current = draggable

    const handleDragEnter = (draggable) => draggedOver.current = draggable

    const handleDragEnd = () => {

        const draggedIndex = playerDraggables.indexOf(dragged.current)
        const draggedOverIndex = playerDraggables.indexOf(draggedOver.current)
        const draggablesCopy = [...playerDraggables]

        draggablesCopy[draggedOverIndex] = draggablesCopy.splice(draggedIndex, 1, draggablesCopy[draggedOverIndex])[0]
        updatePlayerDraggables(draggablesCopy)
    }

    return (
        <RigidBody
            ref={rigidBody}
            enabledRotations={[false, false, false]}
            colliders={false}
            // type="fixed"
        >
            <CapsuleCollider args={[.5, .5]} position={[0, 1, 0]} />
            {/* <CapsuleCollider args={[.3, .3]} position={[0, 0, 0]} />
            <CuboidCollider
                args={[.5, .5, .5]}
                position={[0, 0, 0]}  //THIS IS THE DEFAULT
                sensor
            /> */}
            <group ref={character} >
                <Character input={input} gameState={gameState} />
            </group>
        </RigidBody>

        // <RigidBody
        //     ref={rigidBody}
        //     enabledRotations={[false, false, false]}
        //     position={[0, 2, 0]}
        //     colliders={false}
        // >
        //     <CapsuleCollider args={[.3, .3]} position={[0, 0, 0]} />
        //     <CuboidCollider
        //         args={[.5, .5, .5]}
        //         position={[0, 0, 0]}  //THIS IS THE DEFAULT
        //         sensor
        //     />
        //     {/* <group ref={character} position={[0, -.6, 0]}>
        //         <Character input={input} gameState={gameState} />
        //     </group> */}
        //     <group ref={character}>
        //         <Character input={input} gameState={gameState} />
        //     </group>
        //     <AnimatePresence>
        //         {
        //             playerInputBox ?
        //                 <Html as="div" wrapperClass="bubbles-container" position={[0, 1, 0]}>
        //                     <InputFieldContainer
        //                         variants={bubbleMotions}
        //                         initial="initial"
        //                         animate="animate"
        //                         exit="exit"
        //                     >
        //                         <InputField
        //                             name="player-input"
        //                             onChange={handleTextInput}
        //                             type="text"
        //                             autoFocus
        //                         />
        //                     </InputFieldContainer>
        //                 </Html> : null
        //         }
        //         {
        //             playerDragBox && playerDraggables.length !== 0 ?
        //                 <Html as="div" wrapperClass="bubbles-container" position={[0, 1, 0]}>
        //                     <DraggablesBox
        //                         variants={draggablesMotions}
        //                         initial="initial"
        //                         animate="animate"
        //                         exit="exit"
        //                     >
        //                         {
        //                             playerDraggables.map(draggable => {
        //                                 return (
        //                                     <Draggable
        //                                         variants={draggableMotion}
        //                                         key={draggable}
        //                                         class="draggable"
        //                                         draggable="true"
        //                                         droppable="true"
        //                                         onDragStart={() => handleDragStart(draggable)}
        //                                         onDragEnter={() => handleDragEnter(draggable)}
        //                                         onDragEnd={handleDragEnd}
        //                                     >
        //                                         {draggable}
        //                                     </Draggable>
        //                                 )
        //                             })
        //                         }
        //                     </DraggablesBox>
        //                 </Html> : null
        //         }
        //     </AnimatePresence>
        // </RigidBody>
    )
}

export default CharacterController