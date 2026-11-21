import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { type Mesh } from 'three'
import './App.css'

function Cilindro() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)

  useFrame((state, delta) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.position.y = Math.sin(t * 2) * 0.4
      ref.current.rotation.x += delta
      ref.current.rotation.z += delta * 0.5
    }
  })

  return (
    <mesh
      ref={ref}
      position={[-1.2, 0, 0]}
      scale={encima ? 1.2 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <cylinderGeometry args={[0.35, 0.35, 0.9, 32]} />
      <meshStandardMaterial color="tomato" />
    </mesh>
  )
}

function Esfera() {
  const ref = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime
      ref.current.position.x = 1.2 + Math.cos(t * 1.5) * 0.4
      ref.current.position.y = Math.sin(t * 1.5) * 0.4
    }
  })

  return (
    <mesh
      ref={ref}
      position={[1.2, 0, 0]}
      scale={encima ? 1.2 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 9] }}>
      <Environment files="/360.jpg" background />
      <Cilindro />
      <Esfera />
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}

export default App