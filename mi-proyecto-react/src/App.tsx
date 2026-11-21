import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { type Mesh } from 'three'
import './App.css'

function Cilindro() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta
    }
  })

  return (
    <mesh
      ref={ref}
      position={[-1.5, 0, -4]}
      scale={encima ? 1.3 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <cylinderGeometry args={[0.6, 0.6, 1.5, 32]} />
      <meshStandardMaterial color="tomato" />
    </mesh>
  )
}

function Esfera() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta
    }
  })

  return (
    <mesh
      ref={ref}
      position={[1.5, 0, -4]}
      scale={encima ? 1.3 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <Environment files="/360.jpg" background />
      <Cilindro />
      <Esfera />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.4}
      />
    </Canvas>
  )
}

export default App