import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.05;
`;

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01";
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const colors = [
      "#4A5FE6", // Blue
      "#6366F1", // Purple
      "#EF5777", // Pink
      "#63F666", // Green
      "#66E0F1", // Cyan
      "#F1E666", // Yellow
    ];

    const drops = [];
    const dropColors = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
      dropColors[i] = colors[Math.floor(Math.random() * colors.length)];
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillStyle = dropColors[i];
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
          // Change color when drop resets
          dropColors[i] = colors[Math.floor(Math.random() * colors.length)];
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default MatrixRain;
