import { useState, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights'
import CharacterController from './Character/CharacterController'
import NpcController from './Npc/NpcController'
import Map from './Map/Playground'

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

    return (
        <>
            <OrbitControls makeDefault />
            <Lights />
            {/* <gridHelper rotation-x={-Math.PI / 2} /> */}
            {/* <Wall position={[-2.65, 1.5, 0]} scale={[5, 3, .3]} rotation-y={-Math.PI / 2} /> */}
            {/* <TestPlatform /> */}

            {/* <Map /> */}

            {
                showChar ? // WAIT A MINNUTE FOR DEBUG
                    <>
                        {/* {
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
                        } */}
                        <CharacterController />
                    </> : null
            }
        </>
    )
}

export default Playground