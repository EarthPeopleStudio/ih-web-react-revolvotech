import React, { useEffect, useRef, useState } from 'react';

const PacManGame = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  // Use a ref to track score for immediate access in the game loop
  const scoreRef = useRef(0);
  
  // Keep the ref in sync with state
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  
  // Store game state in refs to avoid re-renders
  const gameStateRef = useRef({
    pacman: {
      x: 5, 
      y: 5,
      direction: 'right',
      nextDirection: 'right',
      mouth: 0.2,
      mouthDirection: 1
    },
    ghosts: [],
    grid: [],
    lastUpdateTime: 0,
    updateInterval: 350, // Increased from 250ms to 350ms to slow down game
  });
  
  const handleStartRestart = () => {
    // Always cancel any existing animation frame first
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    
    // Reset game state
    setScore(0);
    scoreRef.current = 0;
    setGameOver(false);
    
    // Whether starting or restarting, we want to run the game
    setIsRunning(true);
    
    // Small delay to ensure DOM and React state are updated
    setTimeout(() => {
      initGame();
    }, 0);
  };
  
  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };
  
  useEffect(() => {
    if (isRunning && !gameOver) {
      initGame();
    } else if (!isRunning && animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [isRunning, gameOver]);
  
  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    
    const gameState = gameStateRef.current;
    gameState.lastUpdateTime = 0;
    
    // Position PacMan in center
    gameState.pacman = {
      x: Math.floor(cols / 2),
      y: Math.floor(rows / 2),
      direction: 'right',
      nextDirection: 'right',
      mouth: 0.2,
      mouthDirection: 1
    };
    
    // Create ghost array - position in the 4 corners
    const ghostColors = ['#FF0000', '#00FFDE', '#FFB8DE', '#FFB847'];
    gameState.ghosts = [
      // Top-left corner
      {
        x: 1,
        y: 1,
        direction: 'right',
        color: ghostColors[0],
        speed: 0.5
      },
      // Top-right corner
      {
        x: cols - 2,
        y: 1,
        direction: 'left',
        color: ghostColors[1],
        speed: 0.65
      },
      // Bottom-left corner
      {
        x: 1,
        y: rows - 2,
        direction: 'up',
        color: ghostColors[2],
        speed: 0.8
      },
      // Bottom-right corner
      {
        x: cols - 2,
        y: rows - 2,
        direction: 'down',
        color: ghostColors[3],
        speed: 0.95
      }
    ];
    
    // Create grid with walls and dots
    gameState.grid = [];
    for (let row = 0; row < rows; row++) {
      gameState.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        // Simple maze generation logic
        if (row === 0 || col === 0 || row === rows - 1 || col === cols - 1 ||
            (row === 3 && col > 2 && col < 8) ||
            (row === 3 && col > 12 && col < 18)) {
          gameState.grid[row][col] = 'wall';
        } else {
          gameState.grid[row][col] = 'dot';
        }
      }
    }
    
    // Handle keyboard input for pacman
    const handleKeyDown = (e) => {
      if (gameOver || !isRunning) return;
      
      switch(e.key) {
        case 'w':
        case 'W':
          gameState.pacman.nextDirection = 'up';
          break;
        case 's':
        case 'S':
          gameState.pacman.nextDirection = 'down';
          break;
        case 'a':
        case 'A':
          gameState.pacman.nextDirection = 'left';
          break;
        case 'd':
        case 'D':
          gameState.pacman.nextDirection = 'right';
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Helper functions
    const canMove = (x, y, direction) => {
      let nextX = x;
      let nextY = y;
      
      switch(direction) {
        case 'up': nextY--; break;
        case 'down': nextY++; break;
        case 'left': nextX--; break;
        case 'right': nextX++; break;
      }
      
      // Check if next position is valid
      if (nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows) {
        return false;
      }
      
      return gameState.grid[nextY][nextX] !== 'wall';
    };
    
    const moveCharacter = (character) => {
      switch(character.direction) {
        case 'up': character.y--; break;
        case 'down': character.y++; break;
        case 'left': character.x--; break;
        case 'right': character.x++; break;
      }
    };
    
    // Game loop
    const gameLoop = (timestamp) => {
      // If game is over or not running, don't continue the loop
      if (gameOver || !isRunning) {
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw maze and dots
      drawMaze();
      
      // Update at fixed interval
      if (!gameState.lastUpdateTime || timestamp - gameState.lastUpdateTime >= gameState.updateInterval) {
        gameState.lastUpdateTime = timestamp;
        
        // Update PacMan
        updatePacMan();
        
        // Update ghosts
        updateGhosts();
        
        // Check collisions
        checkCollisions();
        
        // Check win condition
        checkWinCondition();
      }
      
      // Draw PacMan
      drawPacMan();
      
      // Draw ghosts
      drawGhosts();
      
      // Draw score with glow effect
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 5;
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 25);
      ctx.shadowBlur = 0;
      
      // Draw instructions
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Use WASD keys to control', canvas.width / 2, canvas.height - 10);
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };
    
    // Draw maze and dots
    const drawMaze = () => {
      // Add a background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000033');
      gradient.addColorStop(1, '#000022');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = gameState.grid[row][col];
          
          if (cell === 'wall') {
            // Create vibrant maze walls with inner glow
            const wallGradient = ctx.createRadialGradient(
              col * cellSize + cellSize/2, 
              row * cellSize + cellSize/2, 
              0,
              col * cellSize + cellSize/2, 
              row * cellSize + cellSize/2, 
              cellSize
            );
            wallGradient.addColorStop(0, '#3939ff');
            wallGradient.addColorStop(1, '#1a1a6c');
            
            ctx.fillStyle = wallGradient;
            ctx.shadowColor = '#4040ff';
            ctx.shadowBlur = 5;
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.shadowBlur = 0;
          } else if (cell === 'dot') {
            // Make dots glow
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.arc(
              col * cellSize + cellSize / 2,
              row * cellSize + cellSize / 2,
              2.5,
              0,
              Math.PI * 2
            );
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
    };
    
    // Draw PacMan
    const drawPacMan = () => {
      const pacman = gameState.pacman;
      
      // Yellow with a hint of orange/gold gradient
      const pacGradient = ctx.createRadialGradient(
        pacman.x * cellSize + cellSize/2,
        pacman.y * cellSize + cellSize/2,
        0,
        pacman.x * cellSize + cellSize/2,
        pacman.y * cellSize + cellSize/2,
        cellSize/2
      );
      pacGradient.addColorStop(0, '#ffff00');
      pacGradient.addColorStop(1, '#ffcc00');
      
      ctx.fillStyle = pacGradient;
      ctx.shadowColor = '#ffff00';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      
      const pacX = pacman.x * cellSize + cellSize / 2;
      const pacY = pacman.y * cellSize + cellSize / 2;
      
      // Calculate mouth angle based on direction
      let startAngle, endAngle;
      switch(pacman.direction) {
        case 'right':
          startAngle = pacman.mouth;
          endAngle = 2 * Math.PI - pacman.mouth;
          break;
        case 'left':
          startAngle = Math.PI + pacman.mouth;
          endAngle = Math.PI - pacman.mouth;
          break;
        case 'up':
          startAngle = Math.PI * 1.5 + pacman.mouth;
          endAngle = Math.PI * 1.5 - pacman.mouth;
          break;
        case 'down':
          startAngle = Math.PI * 0.5 + pacman.mouth;
          endAngle = Math.PI * 0.5 - pacman.mouth;
          break;
      }
      
      ctx.arc(pacX, pacY, cellSize / 2 - 2, startAngle, endAngle);
      ctx.lineTo(pacX, pacY);
      ctx.fill();
      ctx.shadowBlur = 0;
    };
    
    // Draw ghosts
    const drawGhosts = () => {
      gameState.ghosts.forEach(ghost => {
        const ghostX = ghost.x * cellSize + cellSize / 2;
        const ghostY = ghost.y * cellSize + cellSize / 2;
        const radius = cellSize / 2 - 2;
        
        // Create a gradient for each ghost
        const ghostGradient = ctx.createRadialGradient(
          ghostX, ghostY - radius/3, 1,
          ghostX, ghostY - radius/3, radius * 1.5
        );
        ghostGradient.addColorStop(0, '#ffffff');
        ghostGradient.addColorStop(0.2, ghost.color);
        ghostGradient.addColorStop(1, shadeColor(ghost.color, -20));
        
        // Add glow effect
        ctx.shadowColor = ghost.color;
        ctx.shadowBlur = 8;
        
        // Draw ghost body (semi-circle + rectangle)
        ctx.fillStyle = ghostGradient;
        ctx.beginPath();
        ctx.arc(ghostX, ghostY - radius/3, radius, Math.PI, 0, false);
        
        // Draw the bottom part with waves
        const waveHeight = radius * 0.2;
        const segments = 5;
        const segmentWidth = (radius * 2) / segments;
        
        for (let i = 0; i < segments; i++) {
          const startX = ghostX - radius + (i * segmentWidth);
          const endX = startX + segmentWidth;
          const midY = ghostY + radius * 0.65 - (i % 2 === 0 ? waveHeight : 0);
          
          if (i === 0) {
            ctx.lineTo(startX, ghostY - radius/3);
            ctx.lineTo(startX, ghostY + radius * 0.65);
          }
          
          ctx.quadraticCurveTo(
            (startX + endX) / 2, 
            midY, 
            endX, 
            ghostY + radius * 0.65
          );
        }
        
        ctx.lineTo(ghostX + radius, ghostY - radius/3);
        ctx.fill();
        
        // Draw eyes
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ghostX - radius/2.5, ghostY - radius/2.5, radius/3, 0, Math.PI * 2);
        ctx.arc(ghostX + radius/2.5, ghostY - radius/2.5, radius/3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw pupils - follow direction
        let pupilOffsetX = 0;
        let pupilOffsetY = 0;
        
        switch(ghost.direction) {
          case 'left': pupilOffsetX = -radius/8; break;
          case 'right': pupilOffsetX = radius/8; break;
          case 'up': pupilOffsetY = -radius/8; break;
          case 'down': pupilOffsetY = radius/8; break;
        }
        
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(ghostX - radius/2.5 + pupilOffsetX, ghostY - radius/2.5 + pupilOffsetY, radius/6, 0, Math.PI * 2);
        ctx.arc(ghostX + radius/2.5 + pupilOffsetX, ghostY - radius/2.5 + pupilOffsetY, radius/6, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    // Helper function to darken/lighten colors
    function shadeColor(color, percent) {
      let R = parseInt(color.substring(1, 3), 16);
      let G = parseInt(color.substring(3, 5), 16);
      let B = parseInt(color.substring(5, 7), 16);

      R = Math.max(0, Math.min(255, R + percent));
      G = Math.max(0, Math.min(255, G + percent));
      B = Math.max(0, Math.min(255, B + percent));

      return `#${(R.toString(16).padStart(2, '0'))}${(G.toString(16).padStart(2, '0'))}${(B.toString(16).padStart(2, '0'))}`;
    }
    
    // Update PacMan position and handle collisions
    const updatePacMan = () => {
      const pacman = gameState.pacman;
      
      // PacMan mouth animation
      pacman.mouth += 0.05 * pacman.mouthDirection;
      if (pacman.mouth >= 0.5 || pacman.mouth <= 0.05) {
        pacman.mouthDirection *= -1;
      }
      
      // Direction change and movement logic
      if (canMove(pacman.x, pacman.y, pacman.nextDirection)) {
        pacman.direction = pacman.nextDirection;
      }
      
      // Move PacMan if possible
      if (canMove(pacman.x, pacman.y, pacman.direction)) {
        moveCharacter(pacman);
        
        // Eat dot if present
        if (gameState.grid[pacman.y][pacman.x] === 'dot') {
          gameState.grid[pacman.y][pacman.x] = 'empty';
          // Update both the ref and the state
          scoreRef.current += 10;
          setScore(scoreRef.current);
        }
      }
    };
    
    // Update ghost positions
    const updateGhosts = () => {
      gameState.ghosts.forEach(ghost => {
        // Decide to change direction randomly or if necessary
        if (Math.random() < 0.05 || !canMove(ghost.x, ghost.y, ghost.direction)) {
          const possibleDirections = [];
          ['up', 'down', 'left', 'right'].forEach(dir => {
            if (canMove(ghost.x, ghost.y, dir)) {
              possibleDirections.push(dir);
            }
          });
          
          if (possibleDirections.length > 0) {
            ghost.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
          }
        }
        
        // Move ghost
        if (canMove(ghost.x, ghost.y, ghost.direction)) {
          moveCharacter(ghost);
        }
      });
    };
    
    // Check collisions between PacMan and ghosts
    const checkCollisions = () => {
      const pacman = gameState.pacman;
      
      gameState.ghosts.forEach(ghost => {
        if (ghost.x === pacman.x && ghost.y === pacman.y) {
          setGameOver(true);
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
      });
    };
    
    // Check win condition
    const checkWinCondition = () => {
      let dotsRemaining = false;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (gameState.grid[row][col] === 'dot') {
            dotsRemaining = true;
            break;
          }
        }
        if (dotsRemaining) break;
      }
      
      if (!dotsRemaining) {
        setGameOver(true);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }
    };
    
    // Make sure we start the game loop
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  };
  
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        style={{ 
          background: '#000',
          borderRadius: '8px',
          marginBottom: '10px'
        }}
      />
      <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
        <button 
          onClick={handleStartRestart}
          style={{
            padding: '8px 16px',
            background: '#ff5470',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isRunning || gameOver ? 'Restart' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default PacManGame; 