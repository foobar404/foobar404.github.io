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
    const materialTypes = ['matte', 'wireframe'] // 80% matte, 20% wireframe
    const primaryColors = [
      '#ff0000', // Red
      '#00ff00', // Green
      '#0000ff', // Blue
      '#ffff00', // Yellow
      '#ff00ff', // Magenta
      '#00ffff', // Cyan
      '#ff8000', // Orange
      '#8000ff', // Purple
      '#80ff00', // Lime
      '#ff0080', // Pink
      '#0080ff', // Light Blue
      '#ff8080'  // Light Red
    ]
    
    // Reduce shapes on mobile for better performance
    const isMobile = window.innerWidth <= 768
    const shapeCount = isMobile ? 100 : 200
    
    for (let i = 0; i < shapeCount; i++) {
      const isWireframe = Math.random() < 0.2 // 20% chance of wireframe
      shapeArray.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)], // Random sphere or cube
        materialType: isWireframe ? 'wireframe' : 'matte',
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
        color: primaryColors[Math.floor(Math.random() * primaryColors.length)]
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

    // Choose material based on type
    const material = useMemo(() => {
      if (shape.materialType === 'wireframe') {
        return (
          <meshBasicMaterial
            color={shape.color}
            wireframe={true}
            transparent={true}
            opacity={0.8}
          />
        )
      } else {
        return (
          <meshPhysicalMaterial
            color={shape.color}
            metalness={0.0}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transparent={true}
            opacity={0.9}
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