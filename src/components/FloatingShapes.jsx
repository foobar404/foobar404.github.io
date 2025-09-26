import React, { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FloatingShapes = () => {
  const groupRef = useRef()
  const scrollYRef = useRef(0)
  
  // Listen to scroll events with throttling
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollYRef.current = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Generate many small floating balls and cubes
  const shapes = useMemo(() => {
    const shapeArray = []
    const shapeTypes = ['sphere', 'cube']
    const materialTypes = ['glass', 'metal', 'neon', 'hologram', 'crystal']
    
    for (let i = 0; i < 200; i++) { // Doubled from 100 to 200 balls
      shapeArray.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)], // Random sphere or cube
        materialType: materialTypes[Math.floor(Math.random() * materialTypes.length)], // Random material
        position: [
          (Math.random() - 0.5) * 30, // Even wider spread for more balls
          (Math.random() - 0.5) * 20, // Higher spread
          (Math.random() - 0.5) * 30  // Deeper spread
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.1 + Math.random() * 0.2, // Much smaller balls (0.1 to 0.3)
        floatSpeed: 0.3 + Math.random() * 0.7, // Slower, smoother speeds
        direction: [
          (Math.random() - 0.5) * 1, // Reduced direction intensity
          (Math.random() - 0.5) * 1, // Reduced direction intensity
          (Math.random() - 0.5) * 1  // Reduced direction intensity
        ],
        scrollSensitivity: 0.3 + Math.random() * 0.5, // Reduced sensitivity
        color: [
          '#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', 
          '#a855f7', '#d946ef', '#f59e0b', '#10b981'
        ][Math.floor(Math.random() * 8)]
      })
    }
    return shapeArray
  }, [])

  // Animate balls floating in different directions with smooth movement
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.005 // Even slower group rotation
      
      groupRef.current.children.forEach((child, index) => {
        const shape = shapes[index]
        const time = state.clock.elapsedTime * shape.floatSpeed
        const scrollOffset = scrollYRef.current * 0.0005 * shape.scrollSensitivity // Use ref instead of state
        
        // Smooth continuous floating - reduced movement speed to fix jitter
        child.position.x += shape.direction[0] * delta * 0.2 // Reduced from 0.5
        child.position.y += shape.direction[1] * delta * 0.15 // Reduced from 0.3
        child.position.z += shape.direction[2] * delta * 0.2 // Reduced from 0.4
        
        // Add upward movement based on scroll - reduced to 1/4 speed
        child.position.y += scrollYRef.current * 0.0025 * delta // Reduced from 0.01 to 0.0025
        
        // Gentle sinusoidal movement for organic feel - reduced intensity
        child.position.x += Math.sin(time * 0.5) * delta * 0.1 // Reduced from 0.2
        child.position.y += Math.cos(time * 0.4) * delta * 0.1 // Reduced from 0.2
        child.position.z += Math.sin(time * 0.3) * delta * 0.1 // Reduced from 0.2
        
        // Wrap around boundaries to keep balls in view - wider boundaries
        if (child.position.x > 20) child.position.x = -20
        if (child.position.x < -20) child.position.x = 20
        if (child.position.y > 12) child.position.y = -12
        if (child.position.y < -12) child.position.y = 12
        if (child.position.z > 20) child.position.z = -20
        if (child.position.z < -20) child.position.z = 20
        
        // Much slower rotation to reduce jitter
        child.rotation.x += delta * 0.2 // Reduced from 0.5
        child.rotation.y += delta * 0.15 // Reduced from 0.3
        child.rotation.z += delta * 0.1 // Reduced from 0.4
        
        // Smoother scale reaction to scroll
        const scrollScale = 1 + Math.sin(scrollYRef.current * 0.002 + index) * 0.05 // Use ref instead of state
        child.scale.setScalar(shape.scale * scrollScale)
      })
    }
  })

  const ShapeComponent = ({ shape }) => {
    const meshRef = useRef()
    
    // Render smooth spheres and cubes
    const geometry = useMemo(() => {
      switch (shape.type) {
        case 'sphere':
          return <sphereGeometry args={[1, 16, 16]} /> // Smooth spheres
        case 'cube':
          return <boxGeometry args={[1.5, 1.5, 1.5]} /> // Cubes slightly larger than spheres
        default:
          return <sphereGeometry args={[1, 16, 16]} />
      }
    }, [shape.type])

    // Different material types for variety
    const material = useMemo(() => {
      switch (shape.materialType) {
        case 'glass':
          return (
            <meshPhysicalMaterial
              color={shape.color}
              metalness={0.0}
              roughness={0.0}
              transmission={0.9}
              transparent={true}
              opacity={0.6}
            />
          )
        case 'metal':
          return (
            <meshStandardMaterial
              color={shape.color}
              metalness={1.0}
              roughness={0.2}
            />
          )
        case 'neon':
          return (
            <meshBasicMaterial
              color={shape.color}
              transparent={true}
              opacity={0.8}
            />
          )
        case 'hologram':
          return (
            <meshPhongMaterial
              color={shape.color}
              transparent={true}
              opacity={0.4}
              shininess={100}
            />
          )
        case 'crystal':
          return (
            <meshPhysicalMaterial
              color={shape.color}
              metalness={0.1}
              roughness={0.0}
              transparent={true}
              opacity={0.7}
            />
          )
        default:
          return (
            <meshStandardMaterial
              color={shape.color}
              metalness={0.2}
              roughness={0.1}
              transparent={true}
              opacity={0.8}
            />
          )
      }
    }, [shape.materialType, shape.color])

    return (
      <mesh
        ref={meshRef}
        position={shape.position}
        rotation={shape.rotation}
        scale={shape.scale}
      >
        {geometry}
        {material}
      </mesh>
    )
  }

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <ShapeComponent key={shape.id} shape={shape} />
      ))}
    </group>
  )
}

export default FloatingShapes