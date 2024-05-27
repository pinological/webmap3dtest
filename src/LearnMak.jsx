import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Leva, useControls } from "leva"
import { useRef } from "react"

const Cube = ({position , size, color}) => {
  //animation
  const boxRef = useRef()
  useFrame((state, delta) => {
    boxRef.current.rotation.x += delta;
    boxRef.current.rotation.y += delta;
  })

    return (
        <mesh ref={boxRef} position={position}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}

function LearnMak() {
  

  const testData = useControls("Cube",{
    cubePosition: {value: [0, 0, 0], step: 0.01},
    cubeSize: {value: [1, 1, 1], step: 0.01},
    cubeColor: {value: "#ff0000"}
  })

  const lightData = useControls("Light",{
    lightPosition: {value: [10, 10, 10], step: 1}
  })

  return (
    <Canvas className="mainCanvas">
        <OrbitControls/>
        <directionalLight position={lightData.lightPosition} intensity={1}/>
        <ambientLight intensity={0.5}/>

        <Cube position={testData.cubePosition} size={testData.cubeSize} color={testData.cubeColor}/>

        
    </Canvas>
  )
}

export default LearnMak