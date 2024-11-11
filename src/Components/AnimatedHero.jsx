import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const HeroContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: transparent;
`;

const AnimatedHero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let connections = [];
    let mousePosition = { x: 0, y: 0 };

    // Updated color palette with white shades
    const colors = [
      { h: 0, s: 0, l: 100 }, // Pure white
      { h: 0, s: 0, l: 90 }, // Light gray
      { h: 0, s: 0, l: 80 }, // Slightly darker gray
      { h: 0, s: 0, l: 95 }, // Almost white
    ];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 15000),
        120
      );
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: color,
          pulsePhase: Math.random() * Math.PI * 2,
          baseRadius: Math.random() * 2 + 1,
        });
      }
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add slight randomness to movement
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;

        // Limit velocity
        particle.vx = Math.max(Math.min(particle.vx, 0.8), -0.8);
        particle.vy = Math.max(Math.min(particle.vy, 0.8), -0.8);

        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        particle.pulsePhase = (particle.pulsePhase + 0.03) % (Math.PI * 2);
      });
    };

    const updateConnections = () => {
      connections = [];
      const connectionDistance = Math.min(canvas.width, canvas.height) * 0.2;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            connections.push({
              start: particles[i],
              end: particles[j],
              opacity: Math.pow(1 - distance / connectionDistance, 1.5),
              startColor: particles[i].color,
              endColor: particles[j].color,
              distance: distance,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections with enhanced visibility
      connections.forEach((connection) => {
        const startColor = connection.startColor;
        const endColor = connection.endColor;
        const opacity = connection.opacity * 0.3; // Slightly increased opacity for better visibility

        const gradient = ctx.createLinearGradient(
          connection.start.x,
          connection.start.y,
          connection.end.x,
          connection.end.y
        );

        gradient.addColorStop(0, `hsla(0, 0%, ${startColor.l}%, ${opacity})`);
        gradient.addColorStop(
          0.5,
          `hsla(0, 0%, ${(startColor.l + endColor.l) / 2}%, ${opacity * 1.2})`
        );
        gradient.addColorStop(1, `hsla(0, 0%, ${endColor.l}%, ${opacity})`);

        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(
          0.5,
          (1 - connection.distance / (canvas.width * 0.2)) * 2
        );
        ctx.stroke();
      });

      // Draw particles with enhanced glow
      particles.forEach((particle) => {
        const pulseFactor = 1 + Math.sin(particle.pulsePhase) * 0.3;
        const radius = particle.baseRadius * pulseFactor;

        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          radius * 3
        );
        gradient.addColorStop(0, `hsla(0, 0%, ${particle.color.l}%, 0.4)`);
        gradient.addColorStop(1, `hsla(0, 0%, ${particle.color.l}%, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw particle core with increased opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, ${particle.color.l}%, 0.8)`;
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      updateConnections();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height),
      };

      particles.forEach((particle) => {
        const dx = particle.x - mousePosition.x;
        const dy = particle.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = (120 - distance) / 120;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }
      });
    };

    setCanvasSize();
    animate();

    window.addEventListener("resize", setCanvasSize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <HeroContainer>
      <Canvas ref={canvasRef} />
    </HeroContainer>
  );
};

export default AnimatedHero;
