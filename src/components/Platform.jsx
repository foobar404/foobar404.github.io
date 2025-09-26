import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Platform = () => {
  const ringRef = useRef()
  
  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5 // Faster rotation
    }
  })

  return (
    <group>
      {/* Main platform */}
      <mesh 
        position={[0, -2.5, 0]} 
        rotation-x={0} // Changed from -Math.PI / 2 to 0 for 90 degree rotation
      >
        <cylinderGeometry args={[5, 5, 0.1, 64]} />
        <meshPhysicalMaterial
          color="#1a0033"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.3}
          thickness={0.1}
          transparent
          opacity={0.8}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Neon ring around platform */}
      <mesh 
        ref={ringRef}
        position={[0, -2.4, 0]} 
        rotation-x={Math.PI / 2} // 90 degrees rotation around X-axis
      >
        <ringGeometry args={[4.8, 5.2, 64]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner glow ring */}
      <mesh 
        position={[0, -2.3, 0]} 
        rotation-x={Math.PI / 2} // 90 degrees rotation around X-axis
      >
        <ringGeometry args={[2, 3, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default Platform