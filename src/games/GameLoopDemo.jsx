import React, { useEffect, useRef, useState, useCallback } from 'react';

const GameLoopDemo = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [rightPaddleY, setRightPaddleY] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Use refs to track scores for immediate access in the game loop
  const leftScoreRef = useRef(0);
  const rightScoreRef = useRef(0);
  
  // Add a ref for the right paddle position
  const rightPaddleYRef = useRef(0);
  
  // Keep the refs in sync with state
  useEffect(() => {
    leftScoreRef.current = leftScore;
  }, [leftScore]);
  
  useEffect(() => {
    rightScoreRef.current = rightScore;
  }, [rightScore]);
  
  useEffect(() => {
    rightPaddleYRef.current = rightPaddleY;
  }, [rightPaddleY]);
  
  // Use a ref to track key states
  const keysRef = useRef({});
  
  // Game state in refs to avoid re-renders
  const gameStateRef = useRef({
    ballX: 0,
    ballY: 0,
    ballSpeedX: 0,
    ballSpeedY: 0,
    leftPaddleY: 0,
    lastUpdateTime: 0
  });
  
  // Define handleKeyDown outside of initGame to avoid creating new functions
  const handleKeyDown = useCallback((e) => {
    keysRef.current[e.key.toLowerCase()] = true;
  }, []);
  
  const handleKeyUp = useCallback((e) => {
    keysRef.current[e.key.toLowerCase()] = false;
  }, []);
  
  // Clean up event listeners when component unmounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [handleKeyDown, handleKeyUp]);
  
  const handleStartRestart = () => {
    // Always cancel any existing animation frame first
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    
    // Reset game state
    setLeftScore(0);
    setRightScore(0);
    leftScoreRef.current = 0;
    rightScoreRef.current = 0;
    
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
    if (isRunning) {
      initGame();
    } else if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, [isRunning]);
  
  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }
      
      // Game settings
      const paddleHeight = 60;
      const paddleWidth = 10;
      const ballRadius = 8;
      
      // Reset game state
      const gameState = gameStateRef.current;
      gameState.ballX = canvas.width / 2;
      gameState.ballY = canvas.height / 2;
      gameState.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 2;
      gameState.ballSpeedY = (Math.random() * 2 - 1) * 1.5;
      gameState.leftPaddleY = canvas.height / 2 - paddleHeight / 2;
      
      // Reset right paddle position in both ref and state
      rightPaddleYRef.current = canvas.height / 2 - paddleHeight / 2;
      setRightPaddleY(rightPaddleYRef.current);
      
      // Game loop
      const gameLoop = (timestamp) => {
        // If game is not running, don't continue the loop
        if (!isRunning) {
          return;
        }
        
        try {
          // Process key presses for paddle movement
          if (keysRef.current['w'] || keysRef.current['W']) {
            rightPaddleYRef.current = Math.max(0, rightPaddleYRef.current - 5);
          }
          if (keysRef.current['s'] || keysRef.current['S']) {
            rightPaddleYRef.current = Math.min(canvas.height - paddleHeight, rightPaddleYRef.current + 5);
          }
          
          // Sync paddle position to state periodically (every few frames)
          // This avoids excessive state updates but keeps UI in sync
          if (timestamp % 100 < 16) { // Approximately every 6 frames at 60fps
            setRightPaddleY(rightPaddleYRef.current);
          }
          
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw game elements
          drawNet();
          drawPaddle(0, gameState.leftPaddleY);
          drawPaddle(canvas.width - paddleWidth, rightPaddleYRef.current);
          drawBall();
          drawScore();
          
          // Update game state
          updatePaddles();
          updateBall();
          
          // Add control instructions
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Use W/S keys to control the right paddle', canvas.width / 2, canvas.height - 10);
          
          // Continue animation
          animationFrameId.current = requestAnimationFrame(gameLoop);
        } catch (error) {
          console.error('Error in game loop:', error);
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      };
      
      // Draw center net
      function drawNet() {
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Draw paddle
      function drawPaddle(x, y) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
      }
      
      // Draw ball
      function drawBall() {
        ctx.beginPath();
        ctx.arc(gameState.ballX, gameState.ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff5470';
        ctx.fill();
        ctx.closePath();
      }
      
      // Draw score
      function drawScore() {
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        
        // Draw scores - use refs for immediate updates
        ctx.fillText(leftScoreRef.current, canvas.width / 4, 30);
        ctx.fillText(rightScoreRef.current, canvas.width * 3 / 4, 30);
        
        // Draw AI and Player labels
        ctx.font = '16px Arial';
        ctx.fillText('AI', canvas.width / 4, 60);
        ctx.fillText('Player', canvas.width * 3 / 4, 60);
      }
      
      // Update paddle positions
      function updatePaddles() {
        // Left paddle AI
        const leftPaddleCenter = gameState.leftPaddleY + paddleHeight / 2;
        if (gameState.ballX < canvas.width / 2) {
          if (gameState.ballY > leftPaddleCenter + 10) {
            gameState.leftPaddleY += 3;
          } else if (gameState.ballY < leftPaddleCenter - 10) {
            gameState.leftPaddleY -= 3;
          }
        }
        
        // Keep paddles in bounds
        gameState.leftPaddleY = Math.max(0, Math.min(gameState.leftPaddleY, canvas.height - paddleHeight));
      }
      
      // Update ball position and handle collisions
      function updateBall() {
        // Move ball
        gameState.ballX += gameState.ballSpeedX;
        gameState.ballY += gameState.ballSpeedY;
        
        // Left and right collisions (scoring)
        if (gameState.ballX < ballRadius) {
          // Right player scores
          rightScoreRef.current += 1;
          setRightScore(rightScoreRef.current);
          resetBall();
        } else if (gameState.ballX > canvas.width - ballRadius) {
          // Left player scores
          leftScoreRef.current += 1;
          setLeftScore(leftScoreRef.current);
          resetBall();
        }
        
        // Top and bottom collisions
        if (gameState.ballY < ballRadius || gameState.ballY > canvas.height - ballRadius) {
          gameState.ballSpeedY *= -1;
        }
        
        // Paddle collisions
        if (gameState.ballX < paddleWidth + ballRadius && 
            gameState.ballY > gameState.leftPaddleY && 
            gameState.ballY < gameState.leftPaddleY + paddleHeight) {
          // Left paddle collision
          gameState.ballSpeedX = Math.abs(gameState.ballSpeedX) * 1.05; // Increase speed slightly
          gameState.ballSpeedY += (gameState.ballY - (gameState.leftPaddleY + paddleHeight / 2)) * 0.1;
        } else if (gameState.ballX > canvas.width - paddleWidth - ballRadius && 
                  gameState.ballY > rightPaddleYRef.current && 
                  gameState.ballY < rightPaddleYRef.current + paddleHeight) {
          // Right paddle collision - use ref instead of state
          gameState.ballSpeedX = -Math.abs(gameState.ballSpeedX) * 1.05; // Increase speed slightly
          gameState.ballSpeedY += (gameState.ballY - (rightPaddleYRef.current + paddleHeight / 2)) * 0.1;
        }
      }
      
      // Reset ball to center
      function resetBall() {
        gameState.ballX = canvas.width / 2;
        gameState.ballY = canvas.height / 2;
        gameState.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 2;
        gameState.ballSpeedY = (Math.random() * 2 - 1) * 1.5;
      }
      
      // Make sure we start the game loop
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  };
  
  return (
    <div style={{width: '100%', textAlign: 'center'}}>
      {!isRunning ? (
        <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto', marginBottom: '10px' }}>
          <img 
            src="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
            alt="Pong Game Preview" 
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
              color: 'white', 
              margin: 0, 
              fontSize: '2rem', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)' 
            }}>
              PONG
            </h2>
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              margin: '10px 0'
            }}>
              <div style={{ color: '#ffffff', fontSize: '1rem' }}>AI</div>
              <div style={{ color: '#ffffff', fontSize: '1rem' }}>Player</div>
            </div>
            <p style={{ 
              color: 'white', 
              margin: '10px 0', 
              fontSize: '0.9rem' 
            }}>
              Use W/S keys to control
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
          {isRunning ? 'Restart' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default GameLoopDemo; 