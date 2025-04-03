import React, { useEffect, useRef, useState } from 'react';

const PacManGame = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
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
      
      // Draw score - use ref for immediate updates
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 20);
      
      // Draw instructions
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Use WASD keys to control', canvas.width / 2, canvas.height - 10);
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };
    
    // Draw maze and dots
    const drawMaze = () => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = gameState.grid[row][col];
          
          if (cell === 'wall') {
            ctx.fillStyle = '#1a1a6c';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          } else if (cell === 'dot') {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(
              col * cellSize + cellSize / 2,
              row * cellSize + cellSize / 2,
              2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    };
    
    // Draw PacMan
    const drawPacMan = () => {
      const pacman = gameState.pacman;
      
      ctx.fillStyle = '#FFFF00';
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
    };
    
    // Draw ghosts
    const drawGhosts = () => {
      gameState.ghosts.forEach(ghost => {
        ctx.fillStyle = ghost.color;
        
        const ghostX = ghost.x * cellSize + cellSize / 2;
        const ghostY = ghost.y * cellSize + cellSize / 2;
        const radius = cellSize / 2 - 2;
        
        // Ghost body (semicircle and rectangle)
        ctx.beginPath();
        ctx.arc(ghostX, ghostY - 2, radius, Math.PI, 0, false);
        ctx.lineTo(ghostX + radius, ghostY + radius);
        
        // Create wavy bottom
        const steps = 5;
        const stepSize = (radius * 2) / steps;
        for (let i = 0; i < steps; i++) {
          const x = ghostX + radius - (i * stepSize);
          const y = ghostY + radius + (i % 2 === 0 ? 3 : 0);
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(ghostX - radius, ghostY + radius);
        ctx.closePath();
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ghostX - 4, ghostY - 4, 3, 0, Math.PI * 2);
        ctx.arc(ghostX + 4, ghostY - 4, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupils
        ctx.fillStyle = '#000000';
        
        // Adjust pupil position based on direction
        let pupilOffsetX = 0;
        let pupilOffsetY = 0;
        
        switch(ghost.direction) {
          case 'left': pupilOffsetX = -1; break;
          case 'right': pupilOffsetX = 1; break;
          case 'up': pupilOffsetY = -1; break;
          case 'down': pupilOffsetY = 1; break;
        }
        
        ctx.beginPath();
        ctx.arc(ghostX - 4 + pupilOffsetX, ghostY - 4 + pupilOffsetY, 1.5, 0, Math.PI * 2);
        ctx.arc(ghostX + 4 + pupilOffsetX, ghostY - 4 + pupilOffsetY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
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
      {!isRunning ? (
        <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto', marginBottom: '10px' }}>
          <img 
            src="https://images.unsplash.com/photo-1579309401389-a2476dddf3d4?q=80&w=300&h=300&auto=format&fit=crop"
            alt="Pac-Man Game Preview" 
            style={{ 
              width: '300px', 
              height: '300px', 
              objectFit: 'cover',
              borderRadius: '8px',
              filter: 'brightness(0.8)'
            }} 
          />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '8px'
          }}>
            <h2 style={{ 
              color: 'yellow', 
              margin: 0, 
              fontSize: '2rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)' 
            }}>
              PAC-MAN
            </h2>
            <p style={{ 
              color: 'white', 
              margin: '10px 0', 
              fontSize: '0.9rem' 
            }}>
              Use WASD keys to control
            </p>
          </div>
        </div>
      ) : (
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
      )}
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