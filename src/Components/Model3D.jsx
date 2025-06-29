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
  const neckBoneRef = useRef(null);
  const torsoBoneRef = useRef(null);
  const [xPosition, setXPosition] = useState(0.15);
  const isMobile = useIsMobile();
  const headPositionRef = useRef({ x: 0, y: 0 });

  // Don't process any effects if on mobile
  if (isMobile) {
    return null;
  }

  // Screen size detection
  React.useEffect(() => {
    const updatePosition = () => {
      // Check if screen is laptop/1080p size (typically less than 1920px width)
      if (window.innerWidth <= 1920) {
        setXPosition(0.15 * 0.75); // Move 25% more left for smaller screens
      } else {
        setXPosition(0.15); // Original position for larger screens
      }
    };

    // Initial check
    updatePosition();

    // Add resize listener
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

    const handleMouseMove = (event) => {
    if (modelRef.current) {
      // Calculate reference point at 55% right and 20% from top of screen
      const referenceX = window.innerWidth * 0.5075;
      const referenceY = window.innerHeight * 0;

      // Calculate normalized position relative to the reference point
      const normalizedX = (event.clientX - referenceX) / window.innerWidth;
      const normalizedY = (event.clientY - referenceY) / window.innerHeight;

      mouseRef.current = {
        x: normalizedX,
        y: normalizedY
      };
    }
    };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Find and store reference to the head, neck and torso bones
  React.useEffect(() => {
    scene.traverse((object) => {
      if (object.isBone) {
        const name = object.name.toLowerCase();
        
        // Head bone
        if (name === 'head_06') {
        headBoneRef.current = object;
        }
        // Neck bone
        else if (name === 'neck_05') {
          neckBoneRef.current = object;
        }
        // Torso/upper back bone
        else if (name === 'upper_back_04') {
          torsoBoneRef.current = object;
        }
      }
    });
  }, [scene]);

  // Initialize with default animation
  React.useEffect(() => {
    if (actions[DEFAULT_ANIMATION]) {
      actions[DEFAULT_ANIMATION].reset().play();
      actions[DEFAULT_ANIMATION].setLoop(THREE.LoopPingPong);
      actions[DEFAULT_ANIMATION].setEffectiveTimeScale(1);

      // Set up animation mixing to exclude head and neck bones only for animations that don't allow cursor following
      const allowedCursorAnimations = [DEFAULT_ANIMATION, 'Shrug', 'Grin'];
      
      Object.entries(actions).forEach(([animationName, action]) => {
        if (action && !allowedCursorAnimations.includes(animationName)) {
          action.getMixer().addEventListener('before', () => {
            // Preserve head and neck rotations during animations that don't allow cursor following
            if (headBoneRef.current) {
              const currentHeadRotation = {
                x: headBoneRef.current.rotation.x,
                y: headBoneRef.current.rotation.y,
                z: headBoneRef.current.rotation.z
              };
              
              // Let the animation play
              requestAnimationFrame(() => {
                if (headBoneRef.current) {
                  headBoneRef.current.rotation.x = currentHeadRotation.x;
                  headBoneRef.current.rotation.y = currentHeadRotation.y;
                  headBoneRef.current.rotation.z = currentHeadRotation.z;
                }
              });
            }
            
            if (neckBoneRef.current) {
              const currentNeckRotation = {
                x: neckBoneRef.current.rotation.x,
                y: neckBoneRef.current.rotation.y,
                z: neckBoneRef.current.rotation.z
              };
              
              requestAnimationFrame(() => {
                if (neckBoneRef.current) {
                  neckBoneRef.current.rotation.x = currentNeckRotation.x;
                  neckBoneRef.current.rotation.y = currentNeckRotation.y;
                  neckBoneRef.current.rotation.z = currentNeckRotation.z;
                }
              });
            }
          });
        }
      });
    } else {
      // Try to find and play any available animation
      const availableAnimations = Object.keys(actions);
      if (availableAnimations.length > 0) {
        const fallbackAnimation = availableAnimations[0];
        actions[fallbackAnimation].reset().play();
        actions[fallbackAnimation].setLoop(THREE.LoopPingPong);
        actions[fallbackAnimation].setEffectiveTimeScale(1);
      }
    }
  }, [actions, DEFAULT_ANIMATION]);

  // Handle animation transitions
  React.useEffect(() => {
    if (prevAnimationRef.current !== currentAnimation) {
      const previousAction = actions[prevAnimationRef.current];
      const targetAnimation = actions[currentAnimation] ? currentAnimation : DEFAULT_ANIMATION;
      const newAction = actions[targetAnimation];

      if (newAction) {
        if (previousAction && previousAction !== newAction) {
          if (previousAction.loop === THREE.LoopPingPong && previousAction.isRunning()) {
            const normalizedTime = (previousAction.time % previousAction.getClip().duration) / previousAction.getClip().duration;
            if (normalizedTime > 0.1 && normalizedTime < 0.9) {
              previousAction.fadeOut(1.2);
            } else {
              previousAction.fadeOut(0.5);
            }
          } else {
            previousAction.fadeOut(0.5);
          }
        }

        newAction.reset().fadeIn(0.8).play();
        newAction.setLoop(THREE.LoopPingPong);
        newAction.setEffectiveTimeScale(1);
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
        
        // Only modify colors if the material supports it, avoid cloning to prevent corruption
        if (child.material.color) {
          switch(name) {
            case 'Object_143': // Metal Lining (Dark Chrome)
              child.material.color.setHex(0x4d4d4d); // Darker gray
              if (child.material.emissive) child.material.emissive.setHex(0x000000);
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.95;
              break;
              
            case 'Object_144': // Hat (Top)
              child.material.color.setHex(0x2d2d2d); // Very dark gray
              break;
              
            case 'Object_145': // Jacket (Outside)
              child.material.color.setHex(0x1a1a1a); // Near-black gray
              break;
              
            case 'Object_146': // Belt
              child.material.color.setHex(0x333333); // Dark gray
              break;
              
            case 'Object_147': // Face/Head Metal (Dark Chrome)
              child.material.color.setHex(0x666666); // Medium gray
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.95;
              break;
              
            case 'Object_148': // Jacket (Inside)
              child.material.color.setHex(0x808080); // Light gray
              if (child.material.roughness !== undefined) child.material.roughness = 0.5;
              if (child.material.metalness !== undefined) child.material.metalness = 0.2;
              break;
              
            case 'Object_149': // Jacket Lining (Top) - Keep gold
              child.material.color.setHex(0xf59e0b); // Gold highlights
              if (child.material.emissive) {
                child.material.emissive.setHex(0xf59e0b);
                child.material.emissiveIntensity = 0.8;
              }
              break;
              
            case 'Object_150': // Scarf Inside
              child.material.color.setHex(0x404040); // Dark gray
              break;
              
            case 'Object_151': // Sides, Belt Buckle, Hands (Dark Chrome)
              child.material.color.setHex(0x595959); // Medium-dark gray
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.95;
              break;
              
            case 'Object_152': // Hat (Inside)
              child.material.color.setHex(0x262626); // Very dark gray
              break;
              
            case 'Object_153': // Eyes - Keep bright blue
              child.material.color.setHex(0x39FF14); // Bright cyan-blue
              if (child.material.emissive) {
                child.material.emissive.setHex(0xFFFFFF);
                child.material.emissiveIntensity = 5.0;
              }
              if (child.material.roughness !== undefined) child.material.roughness = 1;
              if (child.material.metalness !== undefined) child.material.metalness = 1;
              break;
              
            case 'Object_154': // Shoes
              child.material.color.setHex(0x1f1f1f); // Very dark gray
              if (child.material.roughness !== undefined) child.material.roughness = 0.2;
              if (child.material.metalness !== undefined) child.material.metalness = 0.1;
              break;
              
            case 'Object_155': // Scarf (Top) - Keep gold
              child.material.color.setHex(0xfbb604); // Primary gold
              if (child.material.emissive) {
                child.material.emissive.setHex(0xfbb604);
                child.material.emissiveIntensity = 0.7;
              }
              break;
              
            case 'Object_156': // Scarf (Bottom) - Keep amber
              child.material.color.setHex(0xb45309); // Amber-700
              if (child.material.emissive) {
                child.material.emissive.setHex(0xb45309);
                child.material.emissiveIntensity = 0.4;
              }
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
    if (modelRef.current && headBoneRef.current) {
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Only update head rotation if in allowed cursor-following animations
      const allowedCursorAnimations = [DEFAULT_ANIMATION, 'Idle', 'Shrug', 'Grin'];
      if (allowedCursorAnimations.includes(currentAnimation)) {
        const rotationAmount = Math.PI / 3; // Base rotation amount (60 degrees)
        const horizontalAmount = rotationAmount; // Reduced from 2x to 1x for 50% reduction

        // Calculate target rotations with reduced horizontal sensitivity
        const headRotationY = mouseX * horizontalAmount - Math.PI / 12;  // Keep left bias but halved range
        const headRotationX = mouseY * rotationAmount;  // Vertical stays the same

        // Neck follows with equal reduced range
        const neckAmount = rotationAmount * 0.5;
        const neckHorizontalAmount = neckAmount; // Reduced from 2x to 1x
        const neckRotationY = mouseX * neckHorizontalAmount;
        const neckRotationX = mouseY * neckAmount;

        // Torso follows with equal minimal range
        const torsoAmount = rotationAmount * 0.25;
        const torsoHorizontalAmount = torsoAmount; // Reduced from 2x to 1x
        const torsoRotationY = mouseX * torsoHorizontalAmount;
        const torsoRotationX = mouseY * torsoAmount;

        // Apply head rotation
        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.y,
          headRotationY,
          0.15
        );
        headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.x,
          headRotationX,
          0.15
        );

        // Apply neck rotation
        if (neckBoneRef.current) {
          neckBoneRef.current.rotation.y = THREE.MathUtils.lerp(
            neckBoneRef.current.rotation.y,
            neckRotationY,
            0.12
          );
          neckBoneRef.current.rotation.x = THREE.MathUtils.lerp(
            neckBoneRef.current.rotation.x,
            neckRotationX,
            0.12
          );
        }

        // Apply torso rotation
        if (torsoBoneRef.current) {
          torsoBoneRef.current.rotation.y = THREE.MathUtils.lerp(
            torsoBoneRef.current.rotation.y,
            torsoRotationY,
            0.08
          );
          torsoBoneRef.current.rotation.x = THREE.MathUtils.lerp(
            torsoBoneRef.current.rotation.x,
            torsoRotationX,
            0.08
          );
        }

        // Clamp all rotations with reduced horizontal limits
        headBoneRef.current.rotation.x = THREE.MathUtils.clamp(
          headBoneRef.current.rotation.x,
          -rotationAmount,     // -60 degrees
          rotationAmount * 0.5  // 30 degrees (reduced upward rotation)
        );
        headBoneRef.current.rotation.y = THREE.MathUtils.clamp(
          headBoneRef.current.rotation.y,
          -horizontalAmount,     // -60 degrees (reduced from -120)
          horizontalAmount       // 60 degrees (reduced from 120)
        );

        if (neckBoneRef.current) {
          neckBoneRef.current.rotation.x = THREE.MathUtils.clamp(
            neckBoneRef.current.rotation.x,
            -neckAmount,       // -30 degrees
            neckAmount * 0.5   // 15 degrees (reduced upward rotation)
          );
          neckBoneRef.current.rotation.y = THREE.MathUtils.clamp(
            neckBoneRef.current.rotation.y,
            -neckHorizontalAmount,       // -30 degrees (reduced from -60)
            neckHorizontalAmount         // 30 degrees (reduced from 60)
          );
        }

        if (torsoBoneRef.current) {
          torsoBoneRef.current.rotation.x = THREE.MathUtils.clamp(
            torsoBoneRef.current.rotation.x,
            -torsoAmount,      // -15 degrees
            torsoAmount * 0.5  // 7.5 degrees (reduced upward rotation)
          );
          torsoBoneRef.current.rotation.y = THREE.MathUtils.clamp(
            torsoBoneRef.current.rotation.y,
            -torsoHorizontalAmount,      // -15 degrees (reduced from -30)
            torsoHorizontalAmount        // 15 degrees (reduced from 30)
          );
        }
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2.2}
      position={[xPosition, -0.65, 0]}
      rotation={[0, 0, 0]}
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
        background: 'transparent',
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
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.5}
            castShadow
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.3}
            castShadow
          />
          {/* Focused lighting on model for glow effect */}
          <spotLight
            position={[0, 4, 4]}
            angle={Math.PI / 4}
            penumbra={0.5}
            intensity={3.0}
            color="#fbb604"
            castShadow
          />
          <spotLight
            position={[3, 2, 3]}
            angle={Math.PI / 6}
            penumbra={0.3}
            intensity={2.5}
            color="#3b82f6"
          />
          {/* Rim lighting for model edges */}
          <directionalLight
            position={[-2, 0, -4]}
            intensity={1.5}
            color="#fbb604"
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