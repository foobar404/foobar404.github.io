import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMouseParallax } from '../utils/useInteractions'

const MouseCameraController = ({ children }) => {
  const groupRef = useRef()
  const mousePosition = useMouseParallax(1.2) // Increased intensity for more responsiveness
  const [scrollY, setScrollY] = useState(0)

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Much more responsive mouse movement
      const targetX = mousePosition.x * 1.5 // Increased from 0.5 to 1.5
      const targetY = mousePosition.y * 0.8 // Increased from 0.3 to 0.8
      
      // Reduced scroll influence for focus on mouse control
      const scrollInfluence = scrollY * 0.0002 // Reduced from 0.0005
      
      // Much faster, snappier interpolation
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y + scrollInfluence) * delta * 8 // Increased from 1.5 to 8
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x + scrollInfluence * 0.2) * delta * 8 // Increased from 1.5 to 8
      
      // Minimal continuous rotation so mouse control is primary
      groupRef.current.rotation.y += delta * (0.01 - scrollInfluence * 0.005) // Reduced base rotation
      
      // More responsive position shift
      groupRef.current.position.z = Math.sin(scrollInfluence) * 0.3 // Reduced from 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
}

export default MouseCameraController