import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FuturisticVRHeadset = ({ position = [0, 0, 0] }) => {
  const headsetRef = useRef()
  const glowRef = useRef()
  
  useFrame((state, delta) => {
    if (headsetRef.current) {
      headsetRef.current.rotation.y += delta * 0.2
      headsetRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position}>
      {/* Main VR Headset - Glossy, futuristic design */}
      <group ref={headsetRef}>
        {/* Main body - rounded, glossy */}
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[1, 1.8, 4, 16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={0.1}
            thickness={0.5}
            envMapIntensity={2}
            reflectivity={1}
          />
        </mesh>
        
        {/* Front visor - highly reflective */}
        <mesh position={[0, 0, 0.9]} castShadow>
          <cylinderGeometry args={[0.85, 0.9, 0.2, 32]} />
          <meshPhysicalMaterial
            color="#000020"
            metalness={1}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            envMapIntensity={3}
          />
        </mesh>
        
        {/* Neon accent ring */}
        <mesh position={[0, 0, 0.95]} castShadow>
          <torusGeometry args={[0.9, 0.02, 8, 32]} />
          <meshPhysicalMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={0.8}
            metalness={0}
            roughness={0.1}
          />
        </mesh>
        
        {/* Side panels with gradient effect */}
        <mesh position={[-0.6, 0, 0.3]} castShadow>
          <boxGeometry args={[0.3, 0.8, 0.8]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.6, 0, 0.3]} castShadow>
          <boxGeometry args={[0.3, 0.8, 0.8]} />
          <meshPhysicalMaterial
            color="#3b82f6"
            metalness={0.8}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Head strap - minimal, sleek */}
        <mesh position={[0, 0.1, -0.8]} castShadow>
          <torusGeometry args={[1.1, 0.08, 6, 20]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </group>
      
      {/* Glowing aura effect */}
      <mesh ref={glowRef} position={position} scale={1.5}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default FuturisticVRHeadset