import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useAnimation } from './AnimationContext';

// Add a hook to detect mobile devices and screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function Model({ url }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { currentAnimation, DEFAULT_ANIMATION } = useAnimation();
  const prevAnimationRef = useRef(currentAnimation);
  const headBoneRef = useRef(null);
  const [xPosition, setXPosition] = useState(0.28125);
  const isMobile = useIsMobile();

  // Don't process any effects if on mobile
  if (isMobile) {
    return null;
  }

  // Screen size detection
  React.useEffect(() => {
    const updatePosition = () => {
      // Check if screen is laptop/1080p size (typically less than 1920px width)
      if (window.innerWidth <= 1920) {
        setXPosition(0.28125 * 0.75); // Move 25% more left for smaller screens
      } else {
        setXPosition(0.28125); // Original position for larger screens
      }
    };

    // Initial check
    updatePosition();

    // Add resize listener
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Find and store reference to the head bone
  React.useEffect(() => {
    scene.traverse((object) => {
      if (object.isBone && object.name.toLowerCase().includes('head')) {
        headBoneRef.current = object;
      }
    });
  }, [scene]);

  // Initialize with default animation
  React.useEffect(() => {
    if (actions[DEFAULT_ANIMATION]) {
      actions[DEFAULT_ANIMATION].reset().play();
      actions[DEFAULT_ANIMATION].setLoop(THREE.LoopPingPong);
      actions[DEFAULT_ANIMATION].setEffectiveTimeScale(1);
    } else {
      console.warn(`Default animation "${DEFAULT_ANIMATION}" not found, checking for available animations...`);
      // Try to find and play any available animation
      const availableAnimations = Object.keys(actions);
      if (availableAnimations.length > 0) {
        const fallbackAnimation = availableAnimations[0];
        console.warn(`Using "${fallbackAnimation}" as fallback animation`);
        actions[fallbackAnimation].reset().play();
        actions[fallbackAnimation].setLoop(THREE.LoopPingPong);
        actions[fallbackAnimation].setEffectiveTimeScale(1);
      }
    }
  }, [actions, DEFAULT_ANIMATION]);

  // Handle animation transitions
  React.useEffect(() => {
    if (prevAnimationRef.current !== currentAnimation) {
      // Store current head rotation
      const currentRotation = headBoneRef.current ? {
        x: headBoneRef.current.rotation.x,
        y: headBoneRef.current.rotation.y
      } : null;

      const previousAction = actions[prevAnimationRef.current];
      const targetAnimation = actions[currentAnimation] ? currentAnimation : DEFAULT_ANIMATION;
      const newAction = actions[targetAnimation];

      if (newAction) {
        // If we have a previous action, handle the transition more smoothly
        if (previousAction && previousAction !== newAction) {
          // For ping-pong animations, let them complete their cycle before transitioning
          if (previousAction.loop === THREE.LoopPingPong && previousAction.isRunning()) {
            // Check if we're in the middle of a ping-pong cycle
            const normalizedTime = (previousAction.time % previousAction.getClip().duration) / previousAction.getClip().duration;
            
            // If we're not near the start/end of the cycle, wait for a smoother transition point
            if (normalizedTime > 0.1 && normalizedTime < 0.9) {
              // Gradually fade out over a longer period
              previousAction.fadeOut(1.2);
            } else {
              // Quick fade if we're at a good transition point
              previousAction.fadeOut(0.5);
            }
          } else {
            // Standard fade out for non-ping-pong animations
            previousAction.fadeOut(0.5);
          }
        }

        // Start the new animation with appropriate settings
        newAction.reset().fadeIn(0.8).play();
        newAction.setLoop(THREE.LoopPingPong);
        newAction.setEffectiveTimeScale(1);

        // Restore head rotation after the animation has started
        if (currentRotation && headBoneRef.current) {
          // Delay the restoration to allow the new animation to settle
          setTimeout(() => {
            if (headBoneRef.current) {
              headBoneRef.current.rotation.x = currentRotation.x;
              headBoneRef.current.rotation.y = currentRotation.y;
            }
          }, 100);
        }
      } else {
        console.error(`Animation "${targetAnimation}" not found`);
      }

      prevAnimationRef.current = currentAnimation;
    }
  }, [currentAnimation, actions, DEFAULT_ANIMATION]);

  // Set up materials with exact colors - safe approach to avoid material corruption
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = child.name;
        
        // Log mesh names to help with debugging
        console.log('Mesh name:', child.name, 'Original material:', child.material);

        // Only modify colors if the material supports it, avoid cloning to prevent corruption
        if (child.material.color) {
          switch(name) {
            case 'Object_143': // Metal Lining (Dark Chrome)
              child.material.color.setHex(0x4A5568);
              if (child.material.emissive) child.material.emissive.setHex(0x000000);
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.95;
              break;
              
            case 'Object_144': // Hat (Top)
              child.material.color.setHex(0x1e293b); // Deep, dark blue
              break;
              
            case 'Object_145': // Jacket (Outside)
              child.material.color.setHex(0x0f172a); // Near-black, dark blue-gray
              break;
              
            case 'Object_146': // Belt
              child.material.color.setHex(0x1A202C); // Keep dark
              break;
              
            case 'Object_147': // Face/Head Metal (Dark Chrome)
              child.material.color.setHex(0x6b7280);
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.95;
              break;
              
            case 'Object_148': // Jacket (Inside)
              child.material.color.setHex(0x0ea5e9); // Electric Blue instead of hot pink
              if (child.material.roughness !== undefined) child.material.roughness = 0.5;
              if (child.material.metalness !== undefined) child.material.metalness = 0.2;
              break;
              
            case 'Object_149': // Jacket Lining (Top) - Neon Pink
              child.material.color.setHex(0xf59e0b); // Gold highlights for premium feel
              if (child.material.emissive) {
                child.material.emissive.setHex(0xf59e0b);
                child.material.emissiveIntensity = 0.5;
              }
              break;
              
            case 'Object_150': // Scarf Inside
              child.material.color.setHex(0x333333); // Dark neutral
              break;
              
            case 'Object_151': // Sides, Belt Buckle, Hands (Dark Chrome)
              child.material.color.setHex(0x6b7280); // Warmer gunmetal
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.95;
              break;
              
            case 'Object_152': // Hat (Inside)
              child.material.color.setHex(0x1A202C); // Dark neutral
              break;
              
            case 'Object_153': // Eyes - Intense Neon Cyan
              child.material.color.setHex(0x3b82f6); // Bright electric blue
              if (child.material.emissive) {
                child.material.emissive.setHex(0x3b82f6);
                child.material.emissiveIntensity = 3.0; // Increased intensity
              }
              if (child.material.roughness !== undefined) child.material.roughness = 0;
              if (child.material.metalness !== undefined) child.material.metalness = 1;
              break;
              
            case 'Object_154': // Shoes
              child.material.color.setHex(0x1A202C); // Keep dark
              if (child.material.roughness !== undefined) child.material.roughness = 0.2;
              if (child.material.metalness !== undefined) child.material.metalness = 0.1;
              break;
              
            case 'Object_155': // Scarf (Top) - Neon Pink
              child.material.color.setHex(0xd97706); // Amber-600
              break;
              
            case 'Object_156': // Scarf (Bottom) - Deeper Neon Pink
              child.material.color.setHex(0xb45309); // Amber-700
              break;
              
            default:
              // Keep original colors for any unmatched objects
              break;
          }
          
          // Force material update
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      // Adjust rotation sensitivity based on cursor position
      const rotationMultiplier = mouseRef.current.x > 0 ? 0.25 : 0.65; // 25% on right side, 65% on left side
      const targetRotationY = mouseRef.current.x * Math.PI * 0.6 * rotationMultiplier; // Horizontal sensitivity
      
      // Reduced look up by 50% (from 0.45 to 0.225) while keeping look down the same
      const verticalSensitivity = mouseRef.current.y < 0 ? 0.225 : 0.075; // Reduced look up by 50%, keeping look down the same
      const targetRotationX = -mouseRef.current.y * Math.PI * verticalSensitivity;
      
      modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.1;
      modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2.0625}
      position={[xPosition, -0.5, 0]}
      rotation={[0.1, -0.785, 0]} // Added -0.785 radians (about 45 degrees) for initial left rotation
    />
  );
}

function LoadingScreen() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '1.2rem',
      textAlign: 'center'
    }}>
      Loading 3D Model...
    </div>
  );
}

const Model3D = ({ modelUrl }) => {
  const isMobile = useIsMobile();

  // If on mobile, return null or a placeholder
  if (isMobile) {
    return null;
  }

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%',
        background: '#000000',
        position: 'relative',
        display: isMobile ? 'none' : 'block' // Add display none as backup
      }}
    >
      <Canvas
        shadows
        camera={{ 
          position: [0, 0, 4],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ background: '#000000' }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} /> {/* Lower ambient light for more contrast */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.0} /* Reduced for more contrast */
            castShadow
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.5} /* Reduced for more contrast */
            castShadow
          />
          {/* Cyberpunk-themed rim light */}
          <directionalLight
            position={[0, 3, -5]}
            intensity={2.0} // Stronger intensity
            color="#FF00FF"  // Magenta color
          />
          <Model url={modelUrl} />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
      <Suspense fallback={<LoadingScreen />} />
    </div>
  );
};

export default Model3D; 