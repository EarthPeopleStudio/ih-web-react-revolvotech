import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.25;
  pointer-events: none;
  contain: strict; /* Optimize rendering */
`;

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalRef = useRef(null);

  // Debounced resize handler for better performance
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    let currentWidth = window.innerWidth;
    let currentHeight = window.innerHeight;

    const setupCanvas = () => {
      canvas.width = currentWidth * dpr;
      canvas.height = currentHeight * dpr;
      canvas.style.width = currentWidth + "px";
      canvas.style.height = currentHeight + "px";
      ctx.scale(dpr, dpr);
    };

    setupCanvas();
    console.log(
      "Matrix Rain initialized:",
      currentWidth,
      "x",
      currentHeight,
      "DPR:",
      dpr
    );

    // Beautiful kanji and Japanese characters
    const characters = [
      "愛",
      "美",
      "心",
      "光",
      "夢",
      "希",
      "和",
      "雅",
      "華",
      "麗",
      "智",
      "勇",
      "誠",
      "真",
      "善",
      "純",
      "清",
      "静",
      "優",
      "雲",
      "月",
      "星",
      "花",
      "桜",
      "風",
      "水",
      "火",
      "土",
      "空",
      "海",
      "山",
      "川",
      "森",
      "竹",
      "松",
      "梅",
      "菊",
      "蓮",
      "鳥",
      "龍",
      "虎",
      "鳳",
      "麒",
      "麟",
      "玉",
      "金",
      "銀",
      "珠",
      "宝",
      "輝",
    ];

    const fontSize = 14;
    let columns = Math.floor(currentWidth / fontSize);

    // Elegant golden color palette with better visibility
    const goldColors = [
      "rgba(251, 182, 4, 0.8)", // Main gold
      "rgba(249, 155, 4, 0.7)", // Medium gold
      "rgba(245, 158, 11, 0.6)", // Light gold
      "rgba(217, 119, 6, 0.5)", // Dark gold
      "rgba(180, 83, 9, 0.4)", // Deep gold
      "rgba(251, 182, 4, 0.3)", // Faded
      "rgba(249, 155, 4, 0.2)", // Very faded
    ];

    let drops = [];
    let dropColors = [];
    let dropSpeeds = [];
    let dropOpacity = [];

    // Initialize drops function
    const initializeDrops = () => {
      drops = [];
      dropColors = [];
      dropSpeeds = [];
      dropOpacity = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -currentHeight; // Start above screen
        dropColors[i] =
          goldColors[Math.floor(Math.random() * goldColors.length)];
        dropSpeeds[i] = 0.2 + Math.random() * 0.8; // Much slower speeds
        dropOpacity[i] = 0.1 + Math.random() * 0.3; // Lower opacity range
      }
    };

    initializeDrops();

    const draw = () => {
      // Create trailing effect with very subtle fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.008)";
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      for (let i = 0; i < drops.length; i++) {
        // Skip some columns for elegant spacing
        if (Math.random() > 0.75) continue;

        const text = characters[Math.floor(Math.random() * characters.length)];

        // Create subtle gradient effect for each character
        const gradient = ctx.createLinearGradient(
          i * fontSize,
          drops[i] * fontSize - fontSize,
          i * fontSize,
          drops[i] * fontSize + fontSize
        );

        // Beautiful gradient stops
        gradient.addColorStop(0, "rgba(251, 182, 4, 0.1)");
        gradient.addColorStop(0.5, dropColors[i]);
        gradient.addColorStop(1, "rgba(251, 182, 4, 0.05)");

        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px "Noto Sans JP", "Hiragino Sans", "Yu Gothic", monospace`;
        ctx.textAlign = "center";

        // Improve text rendering
        ctx.textBaseline = "middle";

        // Very subtle glow
        ctx.shadowColor = "rgba(251, 182, 4, 0.1)";
        ctx.shadowBlur = 0.5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillText(text, i * fontSize + fontSize / 2, drops[i] * fontSize);

        // Reset shadow for next iteration
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Move drop down
        drops[i] += dropSpeeds[i];

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > currentHeight + 50) {
          drops[i] = Math.random() * -200 - 50; // Start well above screen
          // Randomly change properties on reset
          dropColors[i] =
            goldColors[Math.floor(Math.random() * goldColors.length)];
          dropSpeeds[i] = 0.2 + Math.random() * 0.8;
          dropOpacity[i] = 0.1 + Math.random() * 0.3;
        }
      }
    };

    // Start animation immediately
    draw();

    // Use requestAnimationFrame for better performance instead of setInterval
    const animate = () => {
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start with a small delay for better initial load performance
    const startDelay = setTimeout(() => {
      animate();
    }, 100);

    // Optimized resize handler with debouncing
    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Only update if dimensions actually changed
      if (newWidth !== currentWidth || newHeight !== currentHeight) {
        currentWidth = newWidth;
        currentHeight = newHeight;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = currentWidth * dpr;
        canvas.height = currentHeight * dpr;
        canvas.style.width = currentWidth + "px";
        canvas.style.height = currentHeight + "px";
        ctx.scale(dpr, dpr);

        // Recalculate columns on resize
        const newColumns = Math.floor(currentWidth / fontSize);
        if (newColumns !== columns) {
          columns = newColumns;
          initializeDrops(); // Reinitialize drops for new column count
        }
      }
    }, 150); // 150ms debounce

    // Add passive event listener for better performance
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup function
    return () => {
      clearTimeout(startDelay);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [debounce]);

  return <Canvas ref={canvasRef} />;
};

export default MatrixRain;
