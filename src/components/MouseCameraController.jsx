import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const MouseCameraController = ({ children }) => {
  const groupRef = useRef()
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollYRef = useRef(0)
  const targetRotation = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0 })

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll tracking
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

  useFrame((state, delta) => {
    if (groupRef.current && camera) {
      const mouse = mouseRef.current
      const scrollInfluence = scrollYRef.current * 0.0002
      
      // Calculate target rotations based on mouse position
      targetRotation.current.x = mouse.y * 0.3 // Vertical mouse movement
      targetRotation.current.y = mouse.x * 0.5 // Horizontal mouse movement
      
      // Smooth interpolation for camera panning
      const lerpSpeed = delta * 3
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * lerpSpeed
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * lerpSpeed
      
      // Apply rotation to the group (which contains all 3D objects)
      groupRef.current.rotation.x = currentRotation.current.x + scrollInfluence * 0.1
      groupRef.current.rotation.y = currentRotation.current.y + scrollInfluence
      
      // Add gentle continuous rotation
      groupRef.current.rotation.y += delta * 0.008
      
      // Optional: Subtle camera position shift for additional parallax
      camera.position.x = mouse.x * 0.2
      camera.position.y = mouse.y * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
}

export default MouseCameraController