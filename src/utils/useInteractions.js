import { useEffect, useState, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const useCursorInteraction = () => {
  const { camera, gl, scene } = useThree()
  const mouseRef = useRef(new THREE.Vector2())
  const [intersectedObject, setIntersectedObject] = useState(null)
  const raycasterRef = useRef(new THREE.Raycaster())

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse coordinates to normalized device coordinates
      mouseRef.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
    }

    const handleClick = (event) => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(scene.children, true)
      
      if (intersects.length > 0) {
        const object = intersects[0].object
        
        // Add ripple effect
        if (object.material) {
          object.material.emissiveIntensity = 0.5
          setTimeout(() => {
            if (object.material) {
              object.material.emissiveIntensity = 0.1
            }
          }, 200)
        }
        
        // Add scale animation
        const originalScale = object.scale.clone()
        object.scale.multiplyScalar(1.1)
        setTimeout(() => {
          object.scale.copy(originalScale)
        }, 300)
      }
    }

    gl.domElement.addEventListener('mousemove', handleMouseMove, { passive: true })
    gl.domElement.addEventListener('click', handleClick)
    
    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove)
      gl.domElement.removeEventListener('click', handleClick)
    }
  }, [camera, gl, scene])

  return { mouse: mouseRef.current, intersectedObject }
}

export const useMouseParallax = (intensity = 0.1) => {
  const mousePositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let ticking = false
    
    const handleMouseMove = (event) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = (event.clientX / window.innerWidth - 0.5) * intensity
          const y = (event.clientY / window.innerHeight - 0.5) * intensity
          mousePositionRef.current = { x, y }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return mousePositionRef.current
}