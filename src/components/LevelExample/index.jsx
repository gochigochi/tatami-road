import { Cylinder, OrbitControls, Plane } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"
import { CharacterController } from "../Character/CharacterCotroller"
// import NpcController from '../Npc/NpcController'
// import Npcs from "../Npcs/Npcs"
import Npc from "../Npc"
import NpcController from "../Npc/NpcController"

const LevelExample = () => {

    const temp = [
        {
            name: "Test 1",
            position: [-2, 0, 0],
            script: {
                text: "おはよう。。。",
                sound: "",
                animation: ""
            }
        },
        {
            name: "Test 2",
            position: [2, 2, 2],
            script: {
                text: "月曜日。",
                sound: "",
                animation: "/sounds/monday.mp3"
            }
        },
    ]

    const tempNpc = {
        name: "Test 1",
        path: "./models/npc.glb",
        position: [-2, 0, 0],
        script: {
            text: "おはよう。。。",
            sound: "",
            animation: ""
        }
    }

    return (
        <>
            <OrbitControls />
            <ambientLight intensity={1} />
            <directionalLight
                intensity={0.8}
                position={[5, 5, 5]}
                color={"#9e69da"}
            />

            {/* <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={5} rotate rotation={[Math.PI / 2, 0, 0]}>
                <CuboidCollider args={[5, 5, .2]} />
                <mesh>
                    <boxGeometry args={[5, 5, .2]} />
                    <meshStandardMaterial color="#d36060" />
                </mesh>
            </RigidBody> */}

            {/* <Plane args={[5, 5]} rotateZ={ - Math.PI * 0.5 }/> */}

            {/* <RigidBody onCollisionEnter={({ other }) => handleCollision(other, npc)}>
                <mesh position={[-2, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody> */}


            <NpcController data={tempNpc} />

            {/* DEPENDING THE LEVEL ADD OR REMOVE THE ROTATION OF THE SCENARIO */}
            <RigidBody type="fixed" friction={2} rotation={[0, Math.PI / 6, 0]} position={[0, -.2, 0]}>
                <mesh position-y={0}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <CharacterController />
        </>
    )
}

export default LevelExample