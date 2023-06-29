import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

const Example = () => {
  return (
    <>
      <ambientLight args={["#ffffff", 1]} />
      
      {/* <PerspectiveCamera makeDefault position={[0, 1, 5 ]} /> */}
      
      <pointLight position={[20, 30, 10]} />
      <OrbitControls />

      <mesh rotation={[10, 15, 6]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2ad7f1" />
      </mesh>

      {/* <mesh>
        <planeGeometry args={[5, 5]} rotation={[]} />
        <meshStandardMaterial color="#e67878" />
      </mesh> */}

    </>
  )
}

export default Example