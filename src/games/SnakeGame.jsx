import React, { useEffect, useRef, useState } from 'react';

const SnakeGame = () => {
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
      for (let i = 0; i < gameState.snake.length; i++) {
        const segment = gameState.snake[i];
        
        if (i === 0) {
          // Head
          ctx.fillStyle = '#50fa7b';
        } else {
          // Body
          ctx.fillStyle = i % 2 === 0 ? '#3ae374' : '#32ff7e';
        }
        
        ctx.fillRect(
          segment.x * cellSize + 1, 
          segment.y * cellSize + 1, 
          cellSize - 2, 
          cellSize - 2
        );
        
        // Draw eyes on head
        if (i === 0) {
          ctx.fillStyle = 'black';
          
          // Different eye positions based on direction
          switch(gameState.direction) {
            case 'right':
              ctx.fillRect(segment.x * cellSize + cellSize - 5, segment.y * cellSize + 3, 2, 2);
              ctx.fillRect(segment.x * cellSize + cellSize - 5, segment.y * cellSize + cellSize - 5, 2, 2);
              break;
            case 'left':
              ctx.fillRect(segment.x * cellSize + 3, segment.y * cellSize + 3, 2, 2);
              ctx.fillRect(segment.x * cellSize + 3, segment.y * cellSize + cellSize - 5, 2, 2);
              break;
            case 'up':
              ctx.fillRect(segment.x * cellSize + 3, segment.y * cellSize + 3, 2, 2);
              ctx.fillRect(segment.x * cellSize + cellSize - 5, segment.y * cellSize + 3, 2, 2);
              break;
            case 'down':
              ctx.fillRect(segment.x * cellSize + 3, segment.y * cellSize + cellSize - 5, 2, 2);
              ctx.fillRect(segment.x * cellSize + cellSize - 5, segment.y * cellSize + cellSize - 5, 2, 2);
              break;
          }
        }
      }
    }
    
    // Draw the food
    function drawFood() {
      ctx.fillStyle = '#ff5470';
      ctx.beginPath();
      ctx.arc(
        gameState.food.x * cellSize + cellSize / 2,
        gameState.food.y * cellSize + cellSize / 2,
        cellSize / 2 - 2,
        0,
        Math.PI * 2
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
      
      // Draw game elements
      drawSnake();
      drawFood();
      
      // Draw grid (optional)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
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
      {!isRunning ? (
        <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto', marginBottom: '10px' }}>
          <img 
            src="https://images.pexels.com/photos/2062316/pexels-photo-2062316.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
            alt="Snake Game Preview" 
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
              color: '#50fa7b', 
              margin: 0, 
              fontSize: '2rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)' 
            }}>
              SNAKE
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

export default SnakeGame; 