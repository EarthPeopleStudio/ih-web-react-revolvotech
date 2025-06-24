import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useAnimation } from './AnimationContext';

function Model({ url }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { currentAnimation, DEFAULT_ANIMATION } = useAnimation();
  const prevAnimationRef = useRef(currentAnimation);
  const headBoneRef = useRef(null);
  const [xPosition, setXPosition] = useState(0.28125);

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
      actions[DEFAULT_ANIMATION].setLoop(THREE.LoopRepeat);
      actions[DEFAULT_ANIMATION].setEffectiveTimeScale(1);
    } else {
      console.warn(`Default animation "${DEFAULT_ANIMATION}" not found, checking for available animations...`);
      // Try to find and play any available animation
      const availableAnimations = Object.keys(actions);
      if (availableAnimations.length > 0) {
        const fallbackAnimation = availableAnimations[0];
        console.warn(`Using "${fallbackAnimation}" as fallback animation`);
        actions[fallbackAnimation].reset().play();
        actions[fallbackAnimation].setLoop(THREE.LoopRepeat);
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

      // Stop the previous animation
      if (actions[prevAnimationRef.current]) {
        actions[prevAnimationRef.current].fadeOut(0.5);
      }

      // Start the new animation or fall back to default
      const targetAnimation = actions[currentAnimation] ? currentAnimation : DEFAULT_ANIMATION;
      
      if (actions[targetAnimation]) {
        actions[targetAnimation].reset().fadeIn(0.5).play();
        actions[targetAnimation].setLoop(THREE.LoopRepeat);
        actions[targetAnimation].setEffectiveTimeScale(1);

        // Restore head rotation after a frame
        if (currentRotation && headBoneRef.current) {
          requestAnimationFrame(() => {
            headBoneRef.current.rotation.x = currentRotation.x;
            headBoneRef.current.rotation.y = currentRotation.y;
          });
        }
      } else {
        console.error(`Neither requested animation "${currentAnimation}" nor default animation "${DEFAULT_ANIMATION}" found`);
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
            case 'Object_143': // Metal Lining
              child.material.color.setHex(0x4A5568); // Lighter steel blue-gray
              if (child.material.emissive) {
                child.material.emissive.setHex(0x2D3748);
                child.material.emissiveIntensity = 0.3;
              }
              if (child.material.roughness !== undefined) child.material.roughness = 0.2;
              if (child.material.metalness !== undefined) child.material.metalness = 0.8;
              break;
              
            case 'Object_144': // Hat (Top)
              child.material.color.setHex(0x2B6CB0); // Rich blue instead of dark gray
              break;
              
            case 'Object_145': // Jacket (Outside)
              child.material.color.setHex(0x553C9A); // Rich purple instead of very dark purple
              break;
              
            case 'Object_146': // Belt
              child.material.color.setHex(0x1A202C); // Darker but not pure black
              break;
              
            case 'Object_147': // Face/Head Metal
              child.material.color.setHex(0x718096); // Lighter, more appealing gray
              if (child.material.roughness !== undefined) child.material.roughness = 0.3;
              if (child.material.metalness !== undefined) child.material.metalness = 0.8;
              break;
              
            case 'Object_148': // Jacket (Inside)
              child.material.color.setHex(0xC53030); // Brighter, more vibrant red
              if (child.material.roughness !== undefined) child.material.roughness = 0.3;
              if (child.material.metalness !== undefined) child.material.metalness = 0.2;
              break;
              
            case 'Object_149': // Jacket Lining (Top)
              child.material.color.setHex(0x805AD5); // Brighter purple/violet
              break;
              
            case 'Object_150': // Scarf Inside
              child.material.color.setHex(0x744210); // Warmer brown tone
              break;
              
            case 'Object_151': // Sides, Belt Buckle, Hands
              child.material.color.setHex(0x4A5568); // Consistent steel blue-gray
              if (child.material.roughness !== undefined) child.material.roughness = 0.3;
              if (child.material.metalness !== undefined) child.material.metalness = 0.8;
              break;
              
            case 'Object_152': // Hat (Inside)
              child.material.color.setHex(0x38A169); // Vibrant green instead of muted green
              break;
              
            case 'Object_153': // Eyes
              child.material.color.setHex(0x00E5C8); // Brighter cyan/turquoise
              if (child.material.emissive) {
                child.material.emissive.setHex(0x00E5C8);
                child.material.emissiveIntensity = 1.2;
              }
              if (child.material.roughness !== undefined) child.material.roughness = 0.1;
              if (child.material.metalness !== undefined) child.material.metalness = 0.9;
              break;
              
            case 'Object_154': // Shoes
              child.material.color.setHex(0x822727); // Brighter burgundy/maroon
              if (child.material.roughness !== undefined) child.material.roughness = 0.4;
              if (child.material.metalness !== undefined) child.material.metalness = 0.1;
              break;
              
            case 'Object_155': // Scarf (Top)
              child.material.color.setHex(0xDD6B20); // Vibrant orange
              break;
              
            case 'Object_156': // Scarf (Bottom)
              child.material.color.setHex(0xC05621); // Deeper orange for contrast
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
      const rotationMultiplier = mouseRef.current.x > 0 ? 0.25 : 0.5; // 25% on right side, 50% on left side
      const targetRotationY = mouseRef.current.x * Math.PI * 0.6 * rotationMultiplier; // Doubled horizontal sensitivity
      
      // Reduce look up sensitivity by 50% while keeping look down sensitivity
      const verticalSensitivity = mouseRef.current.y < 0 ? 0.1125 : 0.225; // 50% reduced for look up, normal for look down
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
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%',
        background: '#000000',
        position: 'relative'
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
          <ambientLight intensity={0.8} /> {/* Reduced ambient light intensity */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.8}
            castShadow
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