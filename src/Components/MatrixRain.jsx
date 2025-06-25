import React, { useEffect, useRef } from "react";
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
`;

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    
    console.log("Matrix Rain initialized:", window.innerWidth, "x", window.innerHeight, "DPR:", dpr);

    // Beautiful kanji and Japanese characters
    const characters = [
      "愛", "美", "心", "光", "夢", "希", "和", "雅", "華", "麗",
      "智", "勇", "誠", "真", "善", "純", "清", "静", "優", "雲",
      "月", "星", "花", "桜", "風", "水", "火", "土", "空", "海",
      "山", "川", "森", "竹", "松", "梅", "菊", "蓮", "鳥", "龍",
      "虎", "鳳", "麒", "麟", "玉", "金", "銀", "珠", "宝", "輝"
    ];
    
    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    // Elegant golden color palette with better visibility
    const goldColors = [
      "rgba(251, 182, 4, 0.8)",   // Main gold
      "rgba(249, 155, 4, 0.7)",   // Medium gold
      "rgba(245, 158, 11, 0.6)",  // Light gold
      "rgba(217, 119, 6, 0.5)",   // Dark gold
      "rgba(180, 83, 9, 0.4)",    // Deep gold
      "rgba(251, 182, 4, 0.3)",   // Faded
      "rgba(249, 155, 4, 0.2)",   // Very faded
    ];

    const drops = [];
    const dropColors = [];
    const dropSpeeds = [];
    const dropOpacity = [];
    
    // Initialize drops with random properties
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -window.innerHeight; // Start above screen
      dropColors[i] = goldColors[Math.floor(Math.random() * goldColors.length)];
      dropSpeeds[i] = 0.2 + Math.random() * 0.8; // Much slower speeds
      dropOpacity[i] = 0.1 + Math.random() * 0.3; // Lower opacity range
    }

    const draw = () => {
      // Create trailing effect with very subtle fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.008)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

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
        
        ctx.fillText(text, i * fontSize + fontSize/2, drops[i] * fontSize);
        
        // Reset shadow for next iteration
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Move drop down
        drops[i] += dropSpeeds[i];

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > window.innerHeight + 50) {
          drops[i] = Math.random() * -200 - 50; // Start well above screen
          // Randomly change properties on reset
          dropColors[i] = goldColors[Math.floor(Math.random() * goldColors.length)];
          dropSpeeds[i] = 0.2 + Math.random() * 0.8;
          dropOpacity[i] = 0.1 + Math.random() * 0.3;
        }
      }
    };

    // Start animation immediately
    draw();
    
    // Slow, subtle animation
    const interval = setInterval(draw, 120);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      
      // Recalculate columns on resize
      const newColumns = Math.floor(window.innerWidth / fontSize);
      if (newColumns !== columns) {
        // Reinitialize arrays for new column count
        drops.length = newColumns;
        dropColors.length = newColumns;
        dropSpeeds.length = newColumns;
        dropOpacity.length = newColumns;
        
                  for (let i = columns; i < newColumns; i++) {
            drops[i] = Math.random() * -window.innerHeight;
            dropColors[i] = goldColors[Math.floor(Math.random() * goldColors.length)];
            dropSpeeds[i] = 0.2 + Math.random() * 0.8;
            dropOpacity[i] = 0.1 + Math.random() * 0.3;
          }
      }
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
