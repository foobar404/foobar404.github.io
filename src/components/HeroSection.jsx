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
    <>
      <MouseCameraController>
        <GradientSkybox />
        <SceneLighting />
        
        {/* Futuristic Platform - Hidden for now */}
        {/* <Platform /> */}
        
        {/* Minimal floating shapes */}
        <FloatingShapes />
      </MouseCameraController>
    </>
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
          <div className="navbar__links">
            <a href="mailto:austinthemichaud@gmail.com" className="navbar__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span className="navbar__text">Email</span>
              <span className="navbar__text--full">austinthemichaud@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/austin-michaud-9b25aa141/" target="_blank" rel="noopener noreferrer" className="navbar__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="navbar__text">LinkedIn</span>
              <span className="navbar__text--full">LinkedIn</span>
            </a>
            <a href="https://github.com/foobar404" target="_blank" rel="noopener noreferrer" className="navbar__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="navbar__text">GitHub</span>
              <span className="navbar__text--full">GitHub</span>
            </a>
          </div>
          <a href="/assets/resume.pdf" download="Austin_Michaud_Resume.pdf" className="navbar__resume-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span className="navbar__text">Resume</span>
            <span className="navbar__text--full">Download Resume</span>
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
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false
          }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0)
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
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

          
          {/* Floating Tech Bubbles */}
          <div className="tech-bubbles">
            <div className="tech-bubble">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" alt="Blender" />
              <span className="tooltip">Blender - 3D modeling and animation for XR assets</span>
            </div>
            <div className="tech-bubble">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" alt="Godot" />
              <span className="tooltip">Godot Engine - Open-source game engine for XR development</span>
            </div>
            <div className="tech-bubble">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="50" fill="#DC2626"/>
                <text x="50" y="70" textAnchor="middle" fontSize="45" fill="white" fontWeight="bold">XR</text>
              </svg>
              <span className="tooltip">WebXR - Web-based extended reality experiences</span>
            </div>
            <div className="tech-bubble">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <path d="M50 10L80 80H20L50 10Z" fill="#EF2D5E"/>
                <path d="M35 65L50 35L65 65H35Z" fill="#FFF"/>
              </svg>
              <span className="tooltip">A-Frame - Web framework for building VR experiences</span>
            </div>
            <div className="tech-bubble">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" alt="Three.js" />
              <span className="tooltip">Three.js - JavaScript 3D library for interactive graphics</span>
            </div>
            <div className="tech-bubble">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <circle cx="30" cy="30" r="15" fill="#4A90E2" opacity="0.8"/>
                <rect x="55" y="15" width="30" height="30" rx="5" fill="#7B68EE" opacity="0.8"/>
                <polygon points="20,85 35,60 50,85" fill="#FF6B9D" opacity="0.8"/>
                <path d="M65 85L85 65L85 85Z" fill="#50E3C2" opacity="0.8"/>
              </svg>
              <span className="tooltip">ShapesXR - Professional XR creation platform</span>
            </div>
            <div className="tech-bubble">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="gravityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4081"/>
                    <stop offset="50%" stopColor="#9C27B0"/>
                    <stop offset="100%" stopColor="#3F51B5"/>
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#gravityGrad)" opacity="0.9"/>
                <path d="M30 30Q50 15 70 30Q70 50 70 70Q50 85 30 70Q30 50 30 30Z" fill="#FFF" opacity="0.9"/>
                <circle cx="50" cy="40" r="8" fill="url(#gravityGrad)"/>
                <path d="M40 55L50 65L60 55" stroke="url(#gravityGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
              <span className="tooltip">Gravity Sketch - VR design and modeling tool for 3D creation</span>
            </div>
          </div>

          <div className="flex justify-center items-center mt-14">
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