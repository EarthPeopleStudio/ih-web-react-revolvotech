import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  width: 100%;
  height: 100%;

  @media (max-width: 1440px) {
    padding-left: 2%;
    padding-right: 2%;
  }

  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 20px;
  }
`;

const CanvasContainer = styled.div`
  width: 900px;
  height: 700px;
  position: relative;
  max-width: 100%;
  max-height: 100%;

  @media (max-width: 1440px) {
    width: 800px;
    height: 600px;
  }

  @media (max-width: 1200px) {
    width: 700px;
    height: 500px;
  }

  @media (max-width: 992px) {
    width: 500px;
    height: 400px;
  }

  @media (max-width: 768px) {
    width: 350px;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 240px;
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 12px;
`;

const AnimatedHero = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, radius: 100 });
  const currentTextIndexRef = useRef(0);
  const textTransitionRef = useRef(1); // 1 = stable, 0-1 = transitioning
  const lastTextChangeRef = useRef(0);
  const fpsLimiterRef = useRef({ lastDrawTime: 0 });
  const frameCountRef = useRef(0);
  
  // Define services to cycle through
  const services = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Game Development",
    "3D Animation",
    "Cloud Solutions"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let lastTimestamp = 0;
    
    // Cap device pixel ratio for better performance
    const optimizedDpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Constants
    const ACCENT_COLOR = "#ff3366"; // Pink-red accent
    const TEXT_DURATION = 8000; // Increased: How long to display each text (8 seconds)
    const TEXT_TRANSITION_DURATION = 1500; // Transition time between texts
    const MAX_CONNECTIONS = 2500; // Limit total connection lines drawn
    const CONNECTION_DISTANCE = 30; // Distance for particle connections
    const TARGET_FPS = 50; // Target frame rate
    
    // Set canvas size with optimized DPI support
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * optimizedDpr;
      canvas.height = rect.height * optimizedDpr;
      ctx.scale(optimizedDpr, optimizedDpr);
      
      // Reinitialize particles on resize
      if (particlesRef.current.length === 0) {
        initParticles();
      } else {
        // Adjust particles to new dimensions
        particlesRef.current.forEach(p => {
          p.x = p.x * canvas.width / p.canvasWidth;
          p.y = p.y * canvas.height / p.canvasHeight;
          p.canvasWidth = canvas.width;
          p.canvasHeight = canvas.height;
        });
      }
    };
    
    // Create text points with intentionally sparse sampling
    const createTextPoints = (text) => {
      // Calculate font size - intentionally larger to create more spacing
      const baseSize = Math.min(canvas.width / 6, 70);
      // Much less adjustment for text length (opposite of previous change)
      const adjustedSize = Math.min(baseSize, canvas.width / (text.length * 0.9));
      const fontSize = adjustedSize;
      
      // Increased letter spacing for more separation
      ctx.font = `bold ${fontSize}px "Montserrat", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      const metrics = ctx.measureText(text);
      const width = metrics.width;
      
      // Don't worry as much about fitting text
      // Approximate the height
      const height = fontSize * 1.4;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.4;
      
      // Sample points from the text - intentionally sparse for pixelated look
      const points = [];
      
      // Use much larger grid size (2x sparse compared to original)
      const sampleFactor = 0.09; // Doubled from previous 0.045
      const gridSize = Math.max(4, Math.floor(fontSize * sampleFactor));
      
      // Create a temporary canvas with minimal padding
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
      
      // Use smaller dimensions to create tighter fit
      tempCanvas.width = width + 20;
      tempCanvas.height = height + 20;
      
      // Draw text with default settings
      tempCtx.font = ctx.font;
      tempCtx.textAlign = "center";
      tempCtx.textBaseline = "middle";
      tempCtx.fillStyle = "#ffffff";
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
      
      // Get image data for sampling
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Sample with large gaps - creating a pixelated/sparse effect
      for (let y = 0; y < tempCanvas.height; y += gridSize) {
        for (let x = 0; x < tempCanvas.width; x += gridSize) {
          const idx = (y * tempCanvas.width + x) * 4 + 3;
          const alpha = imageData.data[idx];
          
          // Only add points with significant opacity
          if (alpha > 100) { // Increased threshold for more sparse points
            const canvasX = centerX - tempCanvas.width/2 + x;
            const canvasY = centerY - tempCanvas.height/2 + y;
            
            if (canvasX >= 0 && canvasX <= canvas.width && 
                canvasY >= 0 && canvasY <= canvas.height) {
              // Add some randomness to point positions for more scattered look
              const jitter = gridSize * 0.3;
              points.push({
                x: canvasX + (Math.random() - 0.5) * jitter,
                y: canvasY + (Math.random() - 0.5) * jitter,
                isAccent: Math.random() < 0.06
              });
            }
          }
        }
      }
      
      // No fallback for sparse sampling - intentionally keeping it pixelated
      
      return points;
    };
    
    // Initialize particles with all particles used for text
    const initParticles = () => {
      // Clear existing particles
      particlesRef.current = [];
      
      // Create particles for the first text
      const initialPoints = createTextPoints(services[0]);
      
      // Create enough particles to form text - increasing density
      const minParticleCount = Math.max(initialPoints.length * 2, 800); // Ensure enough particles
      
      for (let i = 0; i < minParticleCount; i++) {
        // All particles will be text particles
        let x, y, targetX, targetY, isAccent;
        
        if (i < initialPoints.length) {
          // Use a text position directly
          const point = initialPoints[i];
          targetX = point.x;
          targetY = point.y;
          isAccent = point.isAccent;
        } else {
          // For extra particles, reuse text positions cyclically
          const pointIndex = i % initialPoints.length;
          const point = initialPoints[pointIndex];
          targetX = point.x;
          targetY = point.y;
          isAccent = point.isAccent;
          
          // Add slight offset for particles sharing the same target
          const offset = 2;
          targetX += (Math.random() - 0.5) * offset;
          targetY += (Math.random() - 0.5) * offset;
        }
        
        // Start from a random position on the canvas
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        
        particlesRef.current.push({
          x,
          y,
          size: 1.2 + Math.random() * 0.8, // All particles have text particle size
          speed: 0.02 + Math.random() * 0.04,
          targetX,
          targetY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          isText: true, // Mark all as text particles
          isAccent,
          canvasWidth: canvas.width,
          canvasHeight: canvas.height,
          // For flow animation - reduced since all will be text
          flowOffsetX: Math.random() * 1000,
          flowOffsetY: Math.random() * 1000,
          // For extra effects
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulseOffset: Math.random() * Math.PI * 2,
          // For connection optimization
          connectionGroup: Math.floor(Math.random() * 4)
        });
      }
    };
    
    // Update particles for text transition - all are text particles
    const updateParticlesForText = (newTextIndex) => {
      // Get target text points
      const targetPoints = createTextPoints(services[newTextIndex]);
      
      // Update targets for all particles
      particlesRef.current.forEach((p, i) => {
        // During transition, all particles will move to text positions
        if (i < targetPoints.length) {
          // Use exact position from target points
          const point = targetPoints[i];
          p.targetX = point.x;
          p.targetY = point.y;
          p.isAccent = point.isAccent;
        } else {
          // For excess particles, reuse text positions with offset
          const pointIndex = i % targetPoints.length;
          const point = targetPoints[pointIndex];
          p.targetX = point.x + (Math.random() - 0.5) * 3;
          p.targetY = point.y + (Math.random() - 0.5) * 3;
          p.isAccent = point.isAccent;
        }
      });
    };
    
    // Animation loop - with FPS limiting
    const animate = (timestamp) => {
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - (lastTimestamp || timestamp);
      lastTimestamp = timestamp;
      
      // FPS limiting for balanced performance
      const frameInterval = 1000 / TARGET_FPS;
      
      if (timestamp - fpsLimiterRef.current.lastDrawTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      fpsLimiterRef.current.lastDrawTime = timestamp;
      frameCountRef.current++;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Handle text transitions with a clearer formed state
      const timeSinceLastChange = timestamp - lastTextChangeRef.current;
      
      if (timeSinceLastChange > TEXT_DURATION && textTransitionRef.current === 1) {
        // Start transition to next text
        textTransitionRef.current = 0;
        const nextTextIndex = (currentTextIndexRef.current + 1) % services.length;
        
        // Update particle targets for new text
        updateParticlesForText(nextTextIndex);
        
        // After transition completes, update current text
        setTimeout(() => {
          currentTextIndexRef.current = nextTextIndex;
          textTransitionRef.current = 1;
          lastTextChangeRef.current = performance.now();
        }, TEXT_TRANSITION_DURATION);
      }
      
      // Update transition progress with easing for smoother motion
      if (textTransitionRef.current < 1) {
        // Use easeInOutCubic for more natural motion
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const linearProgress = Math.min(1, deltaTime / TEXT_TRANSITION_DURATION + textTransitionRef.current);
        textTransitionRef.current = easeInOutCubic(linearProgress);
      }
      
      // Mouse interaction
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseRadius = mouseRef.current.radius;
      
      // Update particles - all are now text particles
      particlesRef.current.forEach(p => {
        // Text particle - move toward target
        if (p.targetX !== null && p.targetY !== null) {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0.1) {
            // Ease toward target - faster speed for text formation
            const speed = distance > 10 ? p.speed * 1.5 : p.speed;
            p.x += dx * speed * deltaTime * 0.05;
            p.y += dy * speed * deltaTime * 0.05;
          } else {
            // At target - very minimal movement to keep text stable
            p.x += (Math.random() - 0.5) * 0.1;
            p.y += (Math.random() - 0.5) * 0.1;
          }
        }
        
        // Mouse repulsion
        if (mouseX !== null && mouseY !== null) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < mouseRadius * mouseRadius) {
            const distance = Math.sqrt(distSq);
            const force = (1 - distance / mouseRadius) * 0.2 * deltaTime * 0.05;
            p.x += dx * force;
            p.y += dy * force;
          }
        }
      });
      
      // Draw connections between nearby particles - optimized
      ctx.lineWidth = 0.3;
      
      // Limit connections to improve performance
      const connectionDistance = CONNECTION_DISTANCE;
      const maxConnections = MAX_CONNECTIONS;
      let connectionCount = 0;
      
      // Group-based connection optimization
      const groupSize = 4; // Number of connection groups
      const currentGroup = frameCountRef.current % groupSize;
      
      for (let i = 0; i < particlesRef.current.length && connectionCount < maxConnections; i++) {
        const p1 = particlesRef.current[i];
        
        // Only process connections for particles in current group
        if (p1.connectionGroup !== currentGroup && !p1.isText) continue;
        
        for (let j = i + 1; j < particlesRef.current.length && connectionCount < maxConnections; j++) {
          const p2 = particlesRef.current[j];
          
          // Skip connections between particles in different groups (unless text particles)
          if (!p1.isText && !p2.isText && p1.connectionGroup !== p2.connectionGroup) continue;
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          // Quick distance check using squared distance
          const distSq = dx * dx + dy * dy;
          
          if (distSq < connectionDistance * connectionDistance) {
            connectionCount++;
            
            // Calculate alpha based on distance
            const distance = Math.sqrt(distSq);
            const alpha = (1 - distance / connectionDistance) * 0.2;
            
            // Determine color based on particle types
            let strokeColor;
            if (p1.isAccent && p2.isAccent) {
              strokeColor = `rgba(255, 51, 102, ${alpha * 1.2})`;
            } else if (p1.isAccent || p2.isAccent) {
              strokeColor = `rgba(255, 102, 153, ${alpha * 0.9})`;
            } else {
              strokeColor = `rgba(255, 255, 255, ${alpha})`;
            }
            
            ctx.strokeStyle = strokeColor;
        ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
          }
        }
      }
      
      // Draw particles - batch by color for better performance
      const whiteParticles = [];
      const accentParticles = [];
      
      particlesRef.current.forEach(p => {
        // Reduce pulse amount for text particles for better readability
        const pulseFactor = p.isText ? 
          (1 + 0.1 * Math.sin(timestamp * p.pulseSpeed + p.pulseOffset)) : 
          (1 + 0.2 * Math.sin(timestamp * p.pulseSpeed + p.pulseOffset));
        const size = p.size * pulseFactor;
        
        if (p.isAccent) {
          accentParticles.push({
            x: p.x,
            y: p.y,
            size: size,
            isText: p.isText,
            glowRadius: size * 3
          });
        } else {
          whiteParticles.push({
            x: p.x,
            y: p.y,
            size: size
          });
        }
      });
      
      // Draw glow for accent particles
      accentParticles.forEach(p => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowRadius);
        gradient.addColorStop(0, p.isText ? ACCENT_COLOR : `rgba(255, 51, 102, 0.8)`);
        gradient.addColorStop(1, "rgba(255, 51, 102, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw white particles
      ctx.fillStyle = "#ffffff";
      whiteParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw accent particles
      ctx.fillStyle = ACCENT_COLOR;
      accentParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Handle mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseRef.current.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    
    // Set up canvas
    setCanvasSize();
    initParticles();
    
    // Begin animation
    animationRef.current = requestAnimationFrame(animate);
    lastTextChangeRef.current = performance.now();
    
    // Set up event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", setCanvasSize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [services]);

  return (
    <HeroContainer>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
    </HeroContainer>
  );
};

export default AnimatedHero;