import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const VRHeadset = ({ position = [0, 0, 0] }) => {
  const headsetRef = useRef()
  
  useFrame((state, delta) => {
    if (headsetRef.current) {
      headsetRef.current.rotation.y += delta * 0.1
      headsetRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={headsetRef} position={position}>
      {/* Main headset body - simple rounded shape */}
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.8, 1.2, 4, 8]} />
        <meshPhysicalMaterial
          color="#f0f0f0"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Face plate with gradient */}
      <mesh position={[0, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.7, 0.75, 0.15, 32]} />
        <meshPhysicalMaterial
          color="#fed7aa"
          metalness={0.8}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Head strap - simplified */}
      <mesh position={[0, 0.1, -0.6]} castShadow>
        <torusGeometry args={[0.9, 0.05, 8, 24]} />
        <meshPhysicalMaterial
          color="#fef2e8"
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>
      
      {/* Simple lens indicators */}
      <mesh position={[-0.25, 0.1, 0.6]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#ea580c"
          emissive="#ea580c"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.25, 0.1, 0.6]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial
          color="#ea580c"
          emissive="#ea580c"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default VRHeadset