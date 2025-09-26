import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SceneLighting = () => {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const spotRef = useRef()
  const pointRef = useRef()

  useFrame((state, delta) => {
    // Animate point light for dynamic lighting
    if (pointRef.current) {
      pointRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 5
      pointRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 5
      pointRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
    
    // Subtle directional light movement
    if (directionalRef.current) {
      directionalRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2
    }
  })

  return (
    <>
      {/* Ambient light with neon tint */}
      <ambientLight ref={ambientRef} intensity={0.2} color="#4c0080" />
      
      {/* Main directional light - bright and clean */}
      <directionalLight
        ref={directionalRef}
        position={[10, 15, 8]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      
      {/* Neon accent lights */}
      <spotLight
        ref={spotRef}
        position={[-8, 12, 5]}
        intensity={3}
        angle={0.4}
        penumbra={0.8}
        color="#ec4899"
        castShadow
      />
      
      {/* Animated point light */}
      <pointLight
        ref={pointRef}
        position={[0, 8, 8]}
        intensity={2}
        color="#8b5cf6"
        distance={25}
        decay={2}
      />
      
      {/* Blue rim light */}
      <pointLight
        position={[8, 3, -10]}
        intensity={1.5}
        color="#3b82f6"
        distance={20}
      />
      
      {/* Purple fill light */}
      <pointLight
        position={[-10, -3, 3]}
        intensity={1}
        color="#a855f7"
        distance={18}
      />
      
      {/* High-intensity key light for glossy reflections */}
      <spotLight
        position={[0, 12, 8]}
        intensity={5}
        angle={0.3}
        penumbra={0.5}
        color="#ffffff"
      />
    </>
  )
}

export default SceneLighting