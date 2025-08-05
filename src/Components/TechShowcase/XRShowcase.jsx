import React, { useState, useRef, useEffect, Suspense } from "react";
import styled, { keyframes, css } from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { AiOutlineEye, AiOutlineFullscreen, AiOutlineCode } from "react-icons/ai";

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled components matching other showcase styles
const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

const CodeShowcaseItem = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(10px);
  max-height: 600px;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(251, 182, 4, 0.3);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const CodeShowcaseHeader = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, rgba(25, 25, 30, 0.98), rgba(35, 35, 40, 0.98));
  position: relative;
  z-index: 1;
`;

const CodeShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fbb604;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  
  svg {
    margin-right: 10px;
    color: #fbb604;
  }
`;

const CodeShowcaseDescription = styled.p`
  padding: 16px 28px;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.8), rgba(35, 35, 40, 0.8));
  position: relative;
  z-index: 1;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
`;

const CodeDemoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0;
  position: relative;
  z-index: 1;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CodeSnippetContainer = styled.div`
  position: relative;
  border-radius: 0;
  overflow: hidden;
  background: rgba(25, 25, 25, 0.8);
  border: none;
  border-right: 1px solid rgba(251, 182, 4, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 968px) {
    border-right: none;
    border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  }
`;

const CodeHeader = styled.div`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.08), rgba(251, 182, 4, 0.05));
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
`;

const CodeFileName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #fbb604;
`;

const CodeLanguage = styled.span`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(251, 182, 4, 0.15));
  padding: 4px 12px;
  border-radius: 6px;
  color: #fbb604;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(251, 182, 4, 0.3);
`;

const PreBlock = styled.pre`
  background: transparent;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #ffffff;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  flex: 1;
  max-height: 400px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 182, 4, 0.5);
  }
`;

const DemoContainer = styled.div`
  padding: 20px 65px 20px 15px;
  background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(40, 40, 45, 0.9));
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  border: 1px solid rgba(251, 182, 4, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  max-height: 600px;
  
  /* Ensure all child elements scale properly and center */
  > * {
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  /* Handle scrolling if content is too large */
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 182, 4, 0.5);
  }
`;

const DemoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  
  /* Ensure demo content doesn't overflow and centers properly */
  > * {
    max-width: 100%;
    max-height: 100%;
    transform-origin: center;
    margin: 0 auto;
  }
  
  /* Scale down large demos to fit properly */
  @media (max-width: 768px) {
    transform: scale(0.9);
  }
  
  @media (max-width: 480px) {
    transform: scale(0.8);
  }
`;

const XRViewport = styled.div`
  height: 600px;
  width: 150%;
  margin-left: 25px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(25, 25, 30, 0.95));
  border: 1px solid rgba(251, 182, 4, 0.1);
  
  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    border-radius: 8px;
  }
  
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999;
    border-radius: 0;
    margin-left: 0;
    
    canvas {
      border-radius: 0;
    }
  }
`;

const FullscreenButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(25, 25, 30, 0.9);
  border: 1px solid rgba(251, 182, 4, 0.3);
  border-radius: 8px;
  color: #fbb604;
  padding: 8px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(251, 182, 4, 0.1);
    border-color: rgba(251, 182, 4, 0.5);
  }
`;

// Fallback Loading Component
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  background: linear-gradient(145deg, rgba(15, 15, 20, 0.95), rgba(25, 25, 30, 0.95));
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LoadingContent = styled.div`
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(251, 182, 4, 0.3);
  border-top: 3px solid #fbb604;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
  margin: 0 auto 15px;
`;

const XRLoading = () => (
  <LoadingContainer>
    <LoadingContent>
      <Spinner />
      <p>Loading XR Experience...</p>
    </LoadingContent>
  </LoadingContainer>
);

// Panorama Sphere Component
const PanoramaSphere = ({ textureUrl, onLoad }) => {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    
    loader.load(
      textureUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
        if (onLoad) onLoad();
      },
      undefined,
      (error) => {
        console.warn('Failed to load texture:', error);
        // Create a fallback gradient texture
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 512, 256);
        gradient.addColorStop(0, '#1a1a1e');
        gradient.addColorStop(0.5, '#2a2a30');
        gradient.addColorStop(1, '#1a1a1e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 256);
        
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setTexture(fallbackTexture);
        if (onLoad) onLoad();
      }
    );
  }, [textureUrl, onLoad]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle auto-rotation
      meshRef.current.rotation.y += 0.001;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

// Custom Rainbow code component with no syntax highlighting
const RainbowCode = ({ code, language }) => {
  // Prevent copy functionality
  const handleCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const nonCopyableStyles = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    pointerEvents: 'auto',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    fontFamily: "'Fira Code', monospace",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  };

  return (
    <PreBlock>
      <code 
        className={`language-${language}`} 
        style={nonCopyableStyles}
        onCopy={handleCopy}
        onCut={handleCopy}
        onContextMenu={handleContextMenu}
        data-nocopy="true"
      >
        {code}
      </code>
    </PreBlock>
  );
};

const XRShowcase = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewportRef = useRef(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (viewportRef.current.requestFullscreen) {
        viewportRef.current.requestFullscreen();
      } else if (viewportRef.current.webkitRequestFullscreen) {
        viewportRef.current.webkitRequestFullscreen();
      } else if (viewportRef.current.msRequestFullscreen) {
        viewportRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const codeSnippet = `// 360° Panorama with React Three Fiber
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const PanoramaSphere = ({ textureUrl }) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl)
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

// Usage
<Canvas>
  <PerspectiveCamera makeDefault position={[0, 0, 0]} />
  <PanoramaSphere textureUrl="/path/to/panorama.jpg" />
  <OrbitControls 
    enableRotate={true}
    minPolarAngle={Math.PI / 3}
    maxPolarAngle={Math.PI - Math.PI / 3}
  />
</Canvas>`;

  return (
    <CodeShowcaseGrid>
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            360° Panorama Viewer
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        
        <CodeShowcaseDescription>
          Immerse yourself in stunning mountain lakes surrounded by majestic peaks and pristine wilderness. 
          Use your mouse to look around and explore this peaceful 360° virtual escape into nature. 
          Built with React Three Fiber and WebGL.
        </CodeShowcaseDescription>
        
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>
                <AiOutlineCode style={{ marginRight: '8px' }} />
                PanoramaViewer.jsx
              </CodeFileName>
              <CodeLanguage>JSX</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="jsx" 
              code={codeSnippet}
            />
          </CodeSnippetContainer>
          
          <DemoContainer>
            <DemoWrapper>
              <XRViewport ref={viewportRef} className={isFullscreen ? 'fullscreen' : ''}>
                <FullscreenButton onClick={toggleFullscreen}>
                  <AiOutlineFullscreen />
                </FullscreenButton>
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={75} />
                  <Suspense fallback={null}>
                    <PanoramaSphere 
                      textureUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2048&h=1024&fit=crop&crop=center"
                      onLoad={() => setIsLoaded(true)}
                    />
                  </Suspense>
                  <OrbitControls 
                    enableZoom={true}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={false}
                    minDistance={0.1}
                    maxDistance={10}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI - Math.PI / 3}
                    target={[-4, 2, 0]}
                  />
                </Canvas>
                {!isLoaded && <XRLoading />}
              </XRViewport>
            </DemoWrapper>
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default XRShowcase;