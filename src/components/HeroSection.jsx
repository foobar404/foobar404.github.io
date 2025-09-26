import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import FloatingShapes from './FloatingShapes'
import SceneLighting from './SceneLighting'
import GradientSkybox from './GradientSkybox'
import Platform from './Platform'
import MouseCameraController from './MouseCameraController'
import { useCursorInteraction, useMouseParallax } from '../utils/useInteractions'

const Scene = () => {
  useCursorInteraction()
  
  return (
    <MouseCameraController>
      <GradientSkybox />
      <SceneLighting />
      
      {/* Futuristic Platform */}
      <Platform />
      
      {/* Minimal floating shapes */}
      <FloatingShapes />
    </MouseCameraController>
  )
}

const LoadingFallback = () => (
  <div className="hero__loading">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-400">Loading XR Experience...</p>
  </div>
)

const HeroSection = () => {
  const mouseParallax = useMouseParallax(0.5)
  
  const handleScrollToNext = () => {
    const nextSection = document.getElementById('section-3')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar__content">
          <a href="mailto:austinthemichaud@gmail.com" className="navbar__link">
            austinthemichaud@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/austin-michaud-9b25aa141/" target="_blank" rel="noopener noreferrer" className="navbar__link">
            LinkedIn
          </a>
          <a href="https://github.com/foobar404" target="_blank" rel="noopener noreferrer" className="navbar__link">
            GitHub
          </a>
        </div>
      </nav>

      {/* Fixed 3D Background Canvas */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 50,
          }}
          gl={{ 
            antialias: false,
            alpha: true,
            powerPreference: "default"
          }}
          dpr={1}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Section 1 - Hero */}
      <section id="section-1" className="hero-section">
        <div 
          className="hero__content"
          style={{
            transform: `translate(${mouseParallax.x * 10}px, ${mouseParallax.y * 10}px)`
          }}
        >
          <div className="hero__role">
            <span style={{color: '#ff0000'}} className="text-bold">V</span>
            <span style={{color: '#ff0000'}}>R</span>
            <span style={{color: '#0000ff'}}>/</span>
            <span style={{color: '#ffff00'}}>A</span>
            <span style={{color: '#ffff00'}}>R</span>
            <span> </span>
            <span style={{color: '#00ff00'}}>E</span>
            <span style={{color: '#00ff00'}}>n</span>
            <span style={{color: '#00ff00'}}>g</span>
            <span style={{color: '#00ff00'}}>i</span>
            <span style={{color: '#00ff00'}}>n</span>
            <span style={{color: '#00ff00'}}>e</span>
            <span style={{color: '#00ff00'}}>e</span>
            <span style={{color: '#00ff00'}}>r</span>
          </div>
          <h1 className="hero__title">
            Austin Michaud
          </h1>
          <div className="flex justify-center items-center mt-8">
            <button 
              className="btn btn--secondary"
              onClick={handleScrollToNext}
            >
              Scroll
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 - Projects */}
      <section id="section-3" className="fullscreen-section section--projects">
        <div className="section-content">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <a href="https://github.com/foobar404/vr-books" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-image">
                <img src="/assets/screenshot-1.png" alt="VR Books" />
              </div>
              <div className="project-content">
                <h3>VR Books</h3>
                <p>Interactive virtual reality reading experience with immersive storytelling.</p>
                <span className="project-link">GitHub →</span>
              </div>
            </a>
            
            <a href="https://github.com/foobar404/vr-engine" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-image">
                <img src="/assets/screenshot-2.png" alt="VR Engine" />
              </div>
              <div className="project-content">
                <h3>VR Engine</h3>
                <p>Custom-built virtual reality engine for creating immersive 3D experiences.</p>
                <span className="project-link">GitHub →</span>
              </div>
            </a>
            
            <a href="https://github.com/foobar404/godot-xr-template" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-image">
                <img src="/assets/screenshot-3.png" alt="Godot XR Template" />
              </div>
              <div className="project-content">
                <h3>Godot XR Template</h3>
                <p>Ready-to-use template for building XR applications in the Godot engine.</p>
                <span className="project-link">GitHub →</span>
              </div>
            </a>
            
            <a href="https://www.blenderkit.com/?query=order:-created+author_id:696907" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-image">
                <img src="/assets/screenshot-4.png" alt="BlenderKit Assets" />
              </div>
              <div className="project-content">
                <h3>BlenderKit Assets</h3>
                <p>Collection of 3D models and materials published on BlenderKit marketplace.</p>
                <span className="project-link">BlenderKit →</span>
              </div>
            </a>
            
            <a href="https://foobar404.itch.io/zombie-attack" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-image">
                <img src="/assets/screenshot-5.jpeg" alt="Zombie Attack" />
              </div>
              <div className="project-content">
                <h3>Zombie Attack</h3>
                <p>Action-packed VR survival game with immersive combat mechanics.</p>
                <span className="project-link">Itch.io →</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection