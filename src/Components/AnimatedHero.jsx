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
  margin-right: 0;
  width: 100%;
  height: 100%;
  margin-top: -5%;

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
  height: 900px;
  position: relative;
  max-width: 100%;
  max-height: 90vh;
  aspect-ratio: 1;

  @media (max-width: 1440px) {
    width: 800px;
    height: 800px;
  }

  @media (max-width: 1200px) {
    width: 700px;
    height: 700px;
  }

  @media (max-width: 992px) {
    width: 500px;
    height: 500px;
  }

  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 280px;
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 12px;
`;

// Add this helper function for character glitch
const getRandomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  return chars[Math.floor(Math.random() * chars.length)];
};

// Add this new text transition handler
class TextTransition {
  constructor(text) {
    this.originalText = text;
    this.currentDisplay = text.split("");
    this.targetText = text;
    this.isTransitioning = false;
    this.glitchIndex = 0;
    this.stabilizedIndex = 0;
  }

  startTransitionTo(newText) {
    this.targetText = newText;
    this.isTransitioning = true;
    this.glitchIndex = 0;
    this.stabilizedIndex = 0;
  }

  update() {
    if (!this.isTransitioning) return this.currentDisplay.join("");

    // Update glitch effect
    if (this.glitchIndex < this.targetText.length) {
      this.currentDisplay[this.glitchIndex] = getRandomChar();

      // Stabilize characters after some glitching
      if (Math.random() > 0.7) {
        this.currentDisplay[this.stabilizedIndex] =
          this.targetText[this.stabilizedIndex];
        this.stabilizedIndex++;
      }

      if (Math.random() > 0.9) {
        this.glitchIndex++;
      }
    }

    // Check if transition is complete
    if (this.stabilizedIndex >= this.targetText.length) {
      this.isTransitioning = false;
      this.currentDisplay = this.targetText.split("");
    }

    return this.currentDisplay.join("");
  }

  isComplete() {
    return !this.isTransitioning;
  }
}

const AnimatedHero = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const isReversingRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let transitionProgress = 0;
    let time = 0;
    let rotationOffset = { x: 0, y: 0 };

    const services = [
      "Web Development",
      "Mobile App Development",
      "Game Development",
      "UI/UX Design",
      "3D Animation",
      "Sound Design",
      "AR/VR/MR Development",
      "CRM/CMS/ERP Development",
      "Cloud Development",
    ];

    // Initialize text transition
    const textTransition = new TextTransition(services[0]);

    // Tesseract vertices in 4D
    const vertices4D = [
      [-1, -1, -1, 1],
      [1, -1, -1, 1],
      [1, 1, -1, 1],
      [-1, 1, -1, 1],
      [-1, -1, 1, 1],
      [1, -1, 1, 1],
      [1, 1, 1, 1],
      [-1, 1, 1, 1],
      [-1, -1, -1, -1],
      [1, -1, -1, -1],
      [1, 1, -1, -1],
      [-1, 1, -1, -1],
      [-1, -1, 1, -1],
      [1, -1, 1, -1],
      [1, 1, 1, -1],
      [-1, 1, 1, -1],
    ];

    // Enhanced edges with depth information
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Front face outer cube
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4], // Back face outer cube
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7], // Connections outer cube
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 8], // Front face inner cube
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 12], // Back face inner cube
      [8, 12],
      [9, 13],
      [10, 14],
      [11, 15], // Connections inner cube
      [0, 8],
      [1, 9],
      [2, 10],
      [3, 11], // Connections between cubes
      [4, 12],
      [5, 13],
      [6, 14],
      [7, 15],
    ];

    const rotatePoint4D = (point, time, mouseInfluence = { x: 0, y: 0 }) => {
      const rotateXY = (x, y, angle) => {
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        return [x * c - y * s, x * s + y * c];
      };

      let [x, y, z, w] = point;

      // Base rotation
      [x, y] = rotateXY(x, y, time * 0.3 + mouseInfluence.x);
      [x, z] = rotateXY(x, z, time * 0.2 + mouseInfluence.y);
      [y, z] = rotateXY(y, z, time * 0.1);
      [w, z] = rotateXY(w, z, time * 0.15);

      return [x, y, z, w];
    };

    const project4Dto3D = (point4D, w4) => {
      const w = 1 / (w4 - point4D[3] + 4); // Adjusted for better perspective
      return [point4D[0] * w, point4D[1] * w, point4D[2] * w];
    };

    const project3Dto2D = (point3D) => {
      const scale = 240; // Increased scale
      const z = 2 - point3D[2];
      return [point3D[0] * scale * z, point3D[1] * scale * z, z];
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current = { x, y, isHovering: true };
      rotationOffset = {
        x: x * Math.PI * 0.1,
        y: y * Math.PI * 0.1,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      rotationOffset = { x: 0, y: 0 };
    };

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawVertexParticles = (point, alpha) => {
      const particleCount = 5;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + time;
        const radius = 5 + Math.sin(time * 2 + i) * 2;
        const px = point.x + Math.cos(angle) * radius;
        const py = point.y + Math.sin(angle) * radius;

        const particleGradient = ctx.createRadialGradient(
          px,
          py,
          0,
          px,
          py,
          radius
        );
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.5})`);
        particleGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      }
    };

    const drawEdge = (start, end, depth) => {
      const alpha = Math.min(1, Math.max(0.4, 1 - depth * 0.3));
      const pulseIntensity = Math.sin(time * 2 + depth * 5) * 0.2 + 0.8;

      // Enhanced gradient with brighter colors
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      const baseColor = `rgba(255, 255, 255, ${alpha * pulseIntensity * 1.2})`;
      const glowColor = `rgba(255, 255, 255, ${alpha * 0.6 * pulseIntensity})`;

      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(0.5, baseColor);
      gradient.addColorStop(1, glowColor);

      // Main line with increased width
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(2.5, (1 - depth) * 6);
      ctx.stroke();

      // Enhanced glow effect
      ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Additional energy line
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4 * pulseIntensity})`;
      ctx.lineWidth = Math.max(4, (1 - depth) * 10);
      ctx.stroke();
    };

    const drawVertex = (point, alpha) => {
      const radius = Math.max(3, (1 - point.z) * 5);
      const pulseScale = 1 + Math.sin(time * 3) * 0.2;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        point.x,
        point.y,
        0,
        point.x,
        point.y,
        radius * 4
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.5})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 4 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.2})`;
      ctx.fill();
    };

    const createGlitchText = (text, nextText, x, y, progress) => {
      const chars = text.split("");
      const nextChars = nextText.split("");
      const transitionPoint = Math.floor(progress * chars.length);

      // Calculate the width of a single character (using 'M' as reference)
      const charWidth = ctx.measureText("W").width;
      // Add some padding between characters
      const spacing = charWidth * 1.2;

      // Calculate total width including spacing
      const totalWidth = chars.length * spacing;
      // Center align starting position
      const startX = x - totalWidth / 2 + spacing / 2;

      ctx.save();
      ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
      ctx.shadowBlur = 15;

      // Ensure both texts are the same length for smooth transition
      const maxLength = Math.max(text.length, nextText.length);
      while (nextChars.length < maxLength) nextChars.push(" ");

      chars.forEach((char, i) => {
        // Calculate position based on fixed spacing
        const currentX = startX + i * spacing;

        if (i < transitionPoint) {
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.fillText(nextChars[i], currentX, y);
        } else if (i === transitionPoint) {
          const glitchChar = getRandomChar();
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillText(glitchChar, currentX, y);
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillText(char, currentX, y);
        }
      });

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fontSize = Math.min(canvas.width * 0.06, 32);

      // Project and sort vertices by depth
      const projectedPoints = vertices4D.map((vertex) => {
        const rotated = rotatePoint4D(vertex, time, rotationOffset);
        const projected3D = project4Dto3D(rotated, 2);
        const [x, y, z] = project3Dto2D(projected3D);
        return { x: centerX + x, y: centerY + y, z };
      });

      // Sort edges by depth for proper rendering
      const sortedEdges = edges
        .map((edge, i) => ({
          index: i,
          depth: (projectedPoints[edge[0]].z + projectedPoints[edge[1]].z) / 2,
        }))
        .sort((a, b) => a.depth - b.depth);

      // Draw edges with enhanced effects
      sortedEdges.forEach(({ index }) => {
        const [i, j] = edges[index];
        const start = projectedPoints[i];
        const end = projectedPoints[j];
        const depth = (start.z + end.z) / 2;
        const alpha = Math.min(1, Math.max(0.3, 1 - depth * 0.3));
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );

        const baseColor = `rgba(255, 255, 255, ${alpha})`;
        const glowColor = `rgba(255, 255, 255, ${alpha * 0.5})`;

        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(0.5, baseColor);
        gradient.addColorStop(1, glowColor);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1.5, (1 - depth) * 4); // Increased line width
        ctx.stroke();

        // Sharper glow effect
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw vertices with enhanced effects
      projectedPoints.forEach((point) => {
        const alpha = Math.min(1, Math.max(0.3, 1 - point.z * 0.4));
        const radius = Math.max(2, (1 - point.z) * 4);

        // Enhanced glow for vertices
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // Text rendering with centered position
      ctx.save();
      ctx.font = `bold ${fontSize}px "Montserrat", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
      ctx.shadowBlur = 10;

      // Calculate next index based on direction
      const nextIndex = isReversingRef.current
        ? currentIndexRef.current - 1
        : currentIndexRef.current + 1;

      // Center text in tesseract
      createGlitchText(
        services[currentIndexRef.current],
        services[
          nextIndex < 0
            ? 0
            : nextIndex >= services.length
            ? services.length - 1
            : nextIndex
        ],
        centerX,
        centerY,
        transitionProgress
      );

      ctx.restore();

      // Update transition with direction handling
      if (transitionProgress < 1) {
        transitionProgress += 0.003;
      } else {
        setTimeout(() => {
          transitionProgress = 0;

          // Update current index based on direction
          if (isReversingRef.current) {
            currentIndexRef.current--;
            if (currentIndexRef.current <= 0) {
              currentIndexRef.current = 0;
              isReversingRef.current = false;
            }
          } else {
            currentIndexRef.current++;
            if (currentIndexRef.current >= services.length - 1) {
              isReversingRef.current = true;
            }
          }
        }, 1500);
      }
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    animate();

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", setCanvasSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <HeroContainer>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
    </HeroContainer>
  );
};

export default AnimatedHero;
