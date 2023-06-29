import { Cylinder, OrbitControls, Plane } from "@react-three/drei"
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier"
import { CharacterController } from "../Character/CharacterCotroller"

const LevelExample = () => {
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

            <RigidBody>
                <mesh position={[-2, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed">
                <mesh position-y={-1.25}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <CharacterController />
        </>
    )
}

export default LevelExample