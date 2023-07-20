import { useRef } from 'react'
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import Npc from "."

const NpcController = ({ data }) => {

    const rigidBody = useRef()
    const npcRef = useRef()

    return (
        <RigidBody
            type="fixed"
            ref={rigidBody}
            colliders={false}
            scale={[0.5, 0.5, 0.5]}
            enabledRotations={[false, false, false]}
            position={data.position}
        >
            <CapsuleCollider args={[0.6, 0.6]} position={[0, 0, 0]} />
            <group ref={npcRef}>
                <Npc path={data.path} />
            </group>
        </RigidBody>
    )
}

export default NpcController