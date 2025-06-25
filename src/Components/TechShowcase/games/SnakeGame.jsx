import React, { useEffect, useRef, useState } from 'react';

const SnakeGame = () => {
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
  
  // Game state refs to avoid re-renders
  const gameStateRef = useRef({
    snake: [],
    food: { x: 0, y: 0 },
    direction: 'right',
    nextDirection: 'right',
    lastMoveTime: 0,
    moveDelay: 400, // Increased from 300ms to 400ms to slow down game
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
    const cellSize = 15;
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    
    const gameState = gameStateRef.current;
    gameState.lastMoveTime = 0;
    
    // Initialize snake in the middle of the canvas
    gameState.snake = [
      {x: Math.floor(cols / 2), y: Math.floor(rows / 2)},
      {x: Math.floor(cols / 2) - 1, y: Math.floor(rows / 2)},
      {x: Math.floor(cols / 2) - 2, y: Math.floor(rows / 2)}
    ];
    
    // Place food at random position
    placeFood();
    
    // Reset direction
    gameState.direction = 'right';
    gameState.nextDirection = 'right';
    
    // Handle keyboard input for snake direction
    const handleKeyDown = (e) => {
      if (gameOver || !isRunning) return;
      
      switch(e.key) {
        case 'w':
        case 'W':
          if (gameState.direction !== 'down') {
            gameState.nextDirection = 'up';
          }
          break;
        case 's':
        case 'S':
          if (gameState.direction !== 'up') {
            gameState.nextDirection = 'down';
          }
          break;
        case 'a':
        case 'A':
          if (gameState.direction !== 'right') {
            gameState.nextDirection = 'left';
          }
          break;
        case 'd':
        case 'D':
          if (gameState.direction !== 'left') {
            gameState.nextDirection = 'right';
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Place food at a position not occupied by the snake
    function placeFood() {
      let foodPosition;
      let isOnSnake;
      
      do {
        isOnSnake = false;
        foodPosition = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows)
        };
        
        // Check if food is on the snake
        for (let segment of gameState.snake) {
          if (segment.x === foodPosition.x && segment.y === foodPosition.y) {
            isOnSnake = true;
            break;
          }
        }
      } while (isOnSnake);
      
      gameState.food = foodPosition;
    }
    
    // Draw the snake
    function drawSnake() {
      // Create a vibrant green gradient for the snake
      const headGradient = ctx.createRadialGradient(
        gameState.snake[0].x * cellSize + cellSize/2,
        gameState.snake[0].y * cellSize + cellSize/2,
        0,
        gameState.snake[0].x * cellSize + cellSize/2,
        gameState.snake[0].y * cellSize + cellSize/2,
        cellSize * 1.5
      );
      headGradient.addColorStop(0, '#70ff94');
      headGradient.addColorStop(1, '#50fa7b');
      
      // Body gradients
      const bodyGradient1 = ctx.createRadialGradient(
        0, 0, 0, 0, 0, cellSize
      );
      bodyGradient1.addColorStop(0, '#4aff80');
      bodyGradient1.addColorStop(1, '#3ae374');
      
      const bodyGradient2 = ctx.createRadialGradient(
        0, 0, 0, 0, 0, cellSize
      );
      bodyGradient2.addColorStop(0, '#3aff73');
      bodyGradient2.addColorStop(1, '#32ff7e');
      
      // Draw each segment
      for (let i = 0; i < gameState.snake.length; i++) {
        const segment = gameState.snake[i];
        
        // Setup gradient positions for body segments
        if (i > 0) {
          const gradient = i % 2 === 0 ? bodyGradient1 : bodyGradient2;
          const centerX = segment.x * cellSize + cellSize/2;
          const centerY = segment.y * cellSize + cellSize/2;
          gradient.x0 = centerX;
          gradient.y0 = centerY;
          gradient.x1 = centerX;
          gradient.y1 = centerY;
        }
        
        // Draw segment with appropriate style
        if (i === 0) {
          // Head
          ctx.shadowColor = '#32ff7e';
          ctx.shadowBlur = 8;
          ctx.fillStyle = headGradient;
          
          // Draw slightly larger rounded rectangle for head
          const padding = 1;
          roundRect(
            ctx,
            segment.x * cellSize + padding, 
            segment.y * cellSize + padding, 
            cellSize - padding*2, 
            cellSize - padding*2,
            4 // border radius
          );
          
          // Draw eyes based on direction
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#000000';
          
          const eyeSize = 2;
          const eyeOffset = 3;
          const eyeY = segment.y * cellSize + cellSize/2;
          const eyeX = segment.x * cellSize + cellSize/2;
          
          if (gameState.direction === 'right') {
            ctx.beginPath();
            ctx.arc(eyeX + eyeOffset, eyeY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.arc(eyeX + eyeOffset, eyeY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
          } else if (gameState.direction === 'left') {
            ctx.beginPath();
            ctx.arc(eyeX - eyeOffset, eyeY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.arc(eyeX - eyeOffset, eyeY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
          } else if (gameState.direction === 'up') {
            ctx.beginPath();
            ctx.arc(eyeX - eyeOffset, eyeY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.arc(eyeX + eyeOffset, eyeY - eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
          } else if (gameState.direction === 'down') {
            ctx.beginPath();
            ctx.arc(eyeX - eyeOffset, eyeY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.arc(eyeX + eyeOffset, eyeY + eyeOffset, eyeSize, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Body
          ctx.shadowColor = '#32ff7e';
          ctx.shadowBlur = i < 3 ? 6 : 4; // First few segments glow more
          ctx.fillStyle = i % 2 === 0 ? bodyGradient1 : bodyGradient2;
          
          // Use rounded rectangles with decreasing radius for body
          const radius = Math.max(1, 3 - Math.floor(i / 3));
          roundRect(
            ctx,
            segment.x * cellSize + 1, 
            segment.y * cellSize + 1, 
            cellSize - 2, 
            cellSize - 2,
            radius
          );
          ctx.shadowBlur = 0;
        }
      }
    }
    
    // Helper for drawing rounded rectangles
    function roundRect(ctx, x, y, width, height, radius) {
      if (typeof radius === 'undefined') {
        radius = 5;
      }
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    }
    
    // Draw the food
    function drawFood() {
      const food = gameState.food;
      const centerX = food.x * cellSize + cellSize / 2;
      const centerY = food.y * cellSize + cellSize / 2;
      const radius = cellSize / 2 - 2;
      
      // Pulsating effect for food
      const pulseAmount = Math.sin(Date.now() / 200) * 0.15 + 0.85;
      const adjustedRadius = radius * pulseAmount;
      
      // Apple-like gradient
      const foodGradient = ctx.createRadialGradient(
        centerX - 1, centerY - 1, 1,
        centerX, centerY, adjustedRadius * 2
      );
      foodGradient.addColorStop(0, '#ff5050');
      foodGradient.addColorStop(0.7, '#ff0000');
      foodGradient.addColorStop(1, '#cc0000');
      
      // Draw apple body
      ctx.shadowColor = '#ff3333';
      ctx.shadowBlur = 10;
      ctx.fillStyle = foodGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, adjustedRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw stem
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#006600';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - adjustedRadius);
      ctx.quadraticCurveTo(
        centerX + 3, 
        centerY - adjustedRadius - 3,
        centerX + 2, 
        centerY - adjustedRadius - 1
      );
      ctx.lineTo(centerX, centerY - adjustedRadius + 1);
      ctx.fill();
      
      // Draw shine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(
        centerX - adjustedRadius/3, 
        centerY - adjustedRadius/3, 
        adjustedRadius/3, 
        0, Math.PI * 2
      );
      ctx.fill();
    }
    
    // Update game state
    function update(timestamp) {
      // Only update at specific intervals for snake movement
      if (!gameState.lastMoveTime || timestamp - gameState.lastMoveTime >= gameState.moveDelay) {
        gameState.lastMoveTime = timestamp;
        
        // Update direction
        gameState.direction = gameState.nextDirection;
        
        // Calculate new head position
        const head = {x: gameState.snake[0].x, y: gameState.snake[0].y};
        
        switch(gameState.direction) {
          case 'up': head.y--; break;
          case 'down': head.y++; break;
          case 'left': head.x--; break;
          case 'right': head.x++; break;
        }
        
        // Check if game over (wall collision)
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
          setGameOver(true);
          return;
        }
        
        // Check if game over (self collision)
        for (let i = 0; i < gameState.snake.length; i++) {
          if (gameState.snake[i].x === head.x && gameState.snake[i].y === head.y) {
            setGameOver(true);
            return;
          }
        }
        
        // Add new head to the snake
        gameState.snake.unshift(head);
        
        // Check if food eaten
        const ateFood = head.x === gameState.food.x && head.y === gameState.food.y;
        
        if (ateFood) {
          // Increase score - update both ref and state
          scoreRef.current += 10;
          setScore(scoreRef.current);
          
          // Place new food
          placeFood();
        } else {
          // Remove tail if food not eaten
          gameState.snake.pop();
        }
      }
    }
    
    // Game loop
    const gameLoop = (timestamp) => {
      // If game is over or not running, don't continue the loop
      if (gameOver || !isRunning) {
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#1a1a2e');
      bgGradient.addColorStop(1, '#101018');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, 0);
        ctx.lineTo(x * cellSize, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellSize);
        ctx.lineTo(canvas.width, y * cellSize);
        ctx.stroke();
      }
      
      // Draw game elements
      drawSnake();
      drawFood();
      
      // Draw score with glow effect
      ctx.shadowColor = '#50fa7b';
      ctx.shadowBlur = 5;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 25);
      ctx.shadowBlur = 0;
      
      // Draw instructions
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Use WASD keys to control', canvas.width / 2, canvas.height - 10);
      
      // Update game state
      update(timestamp);
      
      // Continue animation
      animationFrameId.current = requestAnimationFrame(gameLoop);
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
            background: 'linear-gradient(135deg, #FFEB3B, #fbb604)',
            color: '#000',
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

export default SnakeGame; 