import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'

const VRHeadset = ({ position = [0, 0, 0] }) => {
  const headsetRef = useRef()
  const lensesRef = useRef()
  
  useFrame((state, delta) => {
    if (headsetRef.current) {
      headsetRef.current.rotation.y += delta * 0.1
      headsetRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
    if (lensesRef.current) {
      lensesRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={headsetRef} position={position}>
      {/* Main headset body */}
      <mesh castShadow receiveShadow>
        <RoundedBox args={[2.5, 1.2, 1.8]} radius={0.2} smoothness={4}>
          <meshPhysicalMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.1}
            thickness={0.5}
          />
        </RoundedBox>
      </mesh>
      
      {/* Front panel with glossy finish */}
      <mesh position={[0, 0, 0.9]} castShadow>
        <RoundedBox args={[2.3, 1, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color="#000011"
            metalness={1}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
          />
        </RoundedBox>
      </mesh>
      
      {/* Lenses */}
      <group ref={lensesRef}>
        <mesh position={[-0.4, 0.1, 0.85]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
          <MeshTransmissionMaterial
            color="#0ea5e9"
            transmission={0.95}
            thickness={0.2}
            roughness={0}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
          />
        </mesh>
        <mesh position={[0.4, 0.1, 0.85]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
          <MeshTransmissionMaterial
            color="#8b5cf6"
            transmission={0.95}
            thickness={0.2}
            roughness={0}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
          />
        </mesh>
      </group>
      
      {/* Head strap */}
      <mesh position={[0, 0.2, -0.9]} castShadow>
        <torusGeometry args={[1.2, 0.08, 8, 24]} />
        <meshPhysicalMaterial
          color="#333366"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Side vents */}
      <mesh position={[-1.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          metalness={0.8}
          roughness={0.2}
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[1.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          metalness={0.8}
          roughness={0.2}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* LED indicators */}
      <mesh position={[0, -0.4, 0.9]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshPhysicalMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          metalness={0}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default VRHeadset