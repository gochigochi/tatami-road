import { useState, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights'
import CharacterController from './Character/CharacterController'
import NpcController from './Npc/NpcController'
import Map from './Map/Map'

const Wall = ({ ...props }) => {
    return (
        <RigidBody
            {...props}
            type="kinematicPosition"
            includeInvisible
            restitution={2}
        >
            <mesh visible={false}>
                <boxGeometry />
            </mesh>
        </RigidBody>
    )
}

const TestPlatform = () => {
    return (
        < RigidBody
            receiveShadow
            rotation-x={- Math.PI / 2}
            type="fixed"
            position-y={-.25}
            scale={[5, 5, .5]}
            includeInvisible
        >
            <mesh visible={false}>
                <boxGeometry />
            </mesh>
        </RigidBody >
    )
}

const Playground = () => {

    const [showChar, setShowChar] = useState(false)

    useEffect(() => {
        setTimeout(() => setShowChar(true), 1000)
    }, [])

    const levelNpcs = [
        {
            id: 1,
            name: "やまだ",
            position: [-1, 2, 4],
            rotation: [0, -Math.PI / 4, 0],
            model: "./models/npc.glb",
            type: "kinematicPosition",
            localCheckpointIndex: 0,
            scripts: [
                {
                    checkpoint: 0, //MANEJAR ESTOS DE MANERA GLOBAL
                    checkpointScripts: [
                        {
                            node: 0,
                            text: "おはよう。。。",
                            question: false,
                            answ: null,
                            nextNode: 1,
                        },
                        {
                            node: 1,
                            text: "おげんきですか。",
                            question: false,
                            answ: null,
                            nextNode: 2,
                        },
                        {
                            node: 2,
                            text: "いいてんきですね・",
                            question: false,
                            answ: null,
                            nextNode: null,
                            isCorrect: 1, //SET CHECKPOINT TO NEXT NODE***
                            isIncorrect: 0, // or just do nothing
                        }, 
                        //*** FOR EXAMPLE, IF THIS LAST IS AN EXERCISE, IF SUCCEDED THEN UPDATE LOCALCHECKPOINTINDEX TO 1
                        //SO NEXT TIME IT STARTS FROM NEXT SCRIPT. BUT DO AS WELL A GLOBAL INDEX.
                    ],
                },
                {

                    checkpoint: 1,
                    checkpointScripts: [
                        {
                            node: 0,
                            text: "はい、そうです。",
                            question: false,
                            answ: null,
                            nextNode: 1,
                        },
                        {
                            node: 1,
                            text: "わかりました。",
                            question: false,
                            answ: null,
                            nextNode: 2,
                        },
                        {
                            node: 2,
                            text: "ひざしぶり。",
                            question: false,
                            answ: null,
                            nextNode: null,
                        },
                    ],
                }
            ]
        },
        {
            id: 2,
            name: "たなか",
            position: [-4, 2, 1],
            rotation: [0, Math.PI / 4, 0],
            model: "./models/npc-b.glb",
            type: "kinematicPosition",
            scripts: [
                {
                    checkpoint: 0,
                    checkpointScripts: [
                        {
                            node: 0,
                            text: "ううん。。。",
                            question: false,
                            answ: null,
                            nextNode: null,
                        },
                    ],
                }
            ]
        }
    ]

    return (
        <>
            <OrbitControls makeDefault />
            <Lights />
            {/* <gridHelper rotation-x={-Math.PI / 2} /> */}
            {/* <Wall position={[-2.65, 1.5, 0]} scale={[5, 3, .3]} rotation-y={-Math.PI / 2} /> */}
            {/* <TestPlatform /> */}

            <Map />

            {
                showChar ? // WAIT A MINNUTE FOR DEBUG
                    <>
                        {
                            levelNpcs.map(npc => {
                                return (
                                    <NpcController
                                        key={npc.model}
                                        position={npc.position}
                                        rotation={npc?.rotation}
                                        model={npc.model}
                                        name={npc.name}
                                        id={npc.id}
                                        scripts={npc.scripts}
                                    />
                                )
                            })
                        }
                        <CharacterController />
                    </> : null
            }
        </>
    )
}

export default Playground