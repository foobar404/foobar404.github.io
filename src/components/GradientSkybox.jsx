import React, { useMemo } from 'react'
import * as THREE from 'three'

const GradientSkybox = () => {
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048  // Higher resolution
    canvas.height = 2048
    
    const ctx = canvas.getContext('2d')
    
    // Create complex neon gradient
    const gradient = ctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1024)
    gradient.addColorStop(0, '#1a0033') // Dark purple center
    gradient.addColorStop(0.3, '#4c0080') // Deep purple
    gradient.addColorStop(0.6, '#8b5cf6') // Bright purple
    gradient.addColorStop(0.8, '#ec4899') // Hot pink
    gradient.addColorStop(1, '#3b82f6') // Electric blue
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2048, 2048)
    
    // Add some noise/texture
    const imageData = ctx.getImageData(0, 0, 2048, 2048)
    const data = imageData.data
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20
      data[i] = Math.max(0, Math.min(255, data[i] + noise))     // Red
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)) // Green
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)) // Blue
    }
    
    ctx.putImageData(imageData, 0, 0)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2) // Scale down and repeat
    return texture
  }, [])

  return (
    <primitive 
      object={new THREE.Mesh(
        new THREE.SphereGeometry(100, 32, 32),
        new THREE.MeshBasicMaterial({ 
          map: gradientTexture, 
          side: THREE.BackSide 
        })
      )}
    />
  )
}

export default GradientSkybox