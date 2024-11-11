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
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
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
    let hue = 0;

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
        Math.floor((canvas.width * canvas.height) / 12000),
        150
      );
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1.5,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          baseColor: Math.random() * 360,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const updateParticles = () => {
      hue = (hue + 0.1) % 360;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        particle.pulsePhase = (particle.pulsePhase + 0.05) % (Math.PI * 2);
      });
    };

    const updateConnections = () => {
      connections = [];
      const connectionDistance = Math.min(canvas.width, canvas.height) * 0.25;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            connections.push({
              start: particles[i],
              end: particles[j],
              opacity: Math.pow(1 - distance / connectionDistance, 2),
              hue: (particles[i].baseColor + particles[j].baseColor) / 2,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach((connection) => {
        const gradient = ctx.createLinearGradient(
          connection.start.x,
          connection.start.y,
          connection.end.x,
          connection.end.y
        );

        const hueShift = (connection.hue + hue) % 360;
        const opacity = connection.opacity * 0.5;

        gradient.addColorStop(0, `hsla(${hueShift}, 80%, 75%, ${opacity})`);
        gradient.addColorStop(
          0.5,
          `hsla(${(hueShift + 15) % 360}, 85%, 80%, ${opacity * 1.2})`
        );
        gradient.addColorStop(
          1,
          `hsla(${(hueShift + 30) % 360}, 80%, 75%, ${opacity})`
        );

        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      particles.forEach((particle) => {
        const particleHue = (particle.baseColor + hue) % 360;
        const pulseFactor = 1 + Math.sin(particle.pulsePhase) * 0.3;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * 2 * pulseFactor,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsla(${particleHue}, 80%, 75%, 0.1)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * pulseFactor,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsla(${particleHue}, 85%, 80%, 0.9)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${particleHue}, 90%, 85%, 0.8)`;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
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
          particle.vx += (dx / distance) * force * 0.7;
          particle.vy += (dy / distance) * force * 0.7;
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
