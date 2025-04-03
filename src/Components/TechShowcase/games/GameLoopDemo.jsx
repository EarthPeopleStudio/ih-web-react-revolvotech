import React, { useEffect, useRef, useState, useCallback } from 'react';

const GameLoopDemo = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [rightPaddleY, setRightPaddleY] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
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
      
      // Add particles array for collision effects
      gameState.particles = [];
      
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
          
          // Draw background gradient
          const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          bgGradient.addColorStop(0, '#0f0f23');
          bgGradient.addColorStop(1, '#1a1a33');
          ctx.fillStyle = bgGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw game elements
          drawNet();
          drawPaddle(0, gameState.leftPaddleY);
          drawPaddle(canvas.width - paddleWidth, rightPaddleYRef.current);
          drawBall();
          drawScore();
          
          // Update and draw particles
          updateParticles();
          
          // Update game state
          updatePaddles();
          updateBall();
          
          // Add control instructions
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
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
        // Add glow effect to net
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
      }
      
      // Draw paddle
      function drawPaddle(x, y) {
        // Create gradient for paddles
        const paddleGradient = ctx.createLinearGradient(
          x, y, 
          x + paddleWidth, y + paddleHeight
        );
        
        if (x < canvas.width / 2) {
          // Left paddle (AI) - blue gradient
          paddleGradient.addColorStop(0, '#4158D0');
          paddleGradient.addColorStop(0.5, '#5B87FC');
          paddleGradient.addColorStop(1, '#4158D0');
          ctx.shadowColor = '#4158D0';
        } else {
          // Right paddle (player) - pink gradient
          paddleGradient.addColorStop(0, '#ff5470');
          paddleGradient.addColorStop(0.5, '#ff8a5b');
          paddleGradient.addColorStop(1, '#ff5470');
          ctx.shadowColor = '#ff5470';
        }
        
        // Add glow effect
        ctx.shadowBlur = 10;
        
        // Draw rounded rectangle for paddle
        ctx.fillStyle = paddleGradient;
        
        const radius = 5;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + paddleWidth - radius, y);
        ctx.quadraticCurveTo(x + paddleWidth, y, x + paddleWidth, y + radius);
        ctx.lineTo(x + paddleWidth, y + paddleHeight - radius);
        ctx.quadraticCurveTo(x + paddleWidth, y + paddleHeight, x + paddleWidth - radius, y + paddleHeight);
        ctx.lineTo(x + radius, y + paddleHeight);
        ctx.quadraticCurveTo(x, y + paddleHeight, x, y + paddleHeight - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        // Add shine effect
        const shinGradient = ctx.createLinearGradient(
          x, y, 
          x + paddleWidth, y + 15
        );
        shinGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        shinGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = shinGradient;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + paddleWidth - radius, y);
        ctx.quadraticCurveTo(x + paddleWidth, y, x + paddleWidth, y + radius);
        ctx.lineTo(x + paddleWidth, y + 15);
        ctx.lineTo(x, y + 15);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }
      
      // Draw ball
      function drawBall() {
        // Create radial gradient for ball
        const ballGradient = ctx.createRadialGradient(
          gameState.ballX - 2, 
          gameState.ballY - 2, 
          1,
          gameState.ballX, 
          gameState.ballY, 
          ballRadius * 1.2
        );
        ballGradient.addColorStop(0, '#ffffff');
        ballGradient.addColorStop(0.3, '#f5f5f5');
        ballGradient.addColorStop(1, '#ebebeb');
        
        // Add glow effect with speed-based color
        const speed = Math.sqrt(
          Math.pow(gameState.ballSpeedX, 2) + 
          Math.pow(gameState.ballSpeedY, 2)
        );
        const normalizedSpeed = Math.min(1, speed / 5);
        
        let glowColor;
        if (gameState.ballX < canvas.width / 2) {
          // Blue side (left)
          glowColor = `rgba(65, 88, 208, ${0.6 + normalizedSpeed * 0.4})`;
        } else {
          // Pink side (right)
          glowColor = `rgba(255, 84, 112, ${0.6 + normalizedSpeed * 0.4})`;
        }
        
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8 + normalizedSpeed * 10;
        
        // Draw ball
        ctx.fillStyle = ballGradient;
        ctx.beginPath();
        ctx.arc(gameState.ballX, gameState.ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add shine effect
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(
          gameState.ballX - ballRadius/2, 
          gameState.ballY - ballRadius/2, 
          ballRadius/2, 
          0, Math.PI * 2
        );
        ctx.fill();
      }
      
      // Draw score
      function drawScore() {
        // Draw score divider line at the top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 40, canvas.width, 1);
        
        // Left score with blue glow
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#4158D0';
        ctx.shadowBlur = 10;
        ctx.fillText(leftScoreRef.current.toString(), canvas.width / 4, 35);
        
        // Right score with pink glow
        ctx.shadowColor = '#ff5470';
        ctx.fillText(rightScoreRef.current.toString(), (canvas.width * 3) / 4, 35);
        ctx.shadowBlur = 0;
        
        // Add AI and Player labels
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        
        // AI Label with blue glow
        ctx.shadowColor = '#4158D0';
        ctx.shadowBlur = 5;
        ctx.fillText('AI', canvas.width / 4, 60);
        
        // Player Label with pink glow
        ctx.shadowColor = '#ff5470';
        ctx.shadowBlur = 5;
        ctx.fillText('Player', (canvas.width * 3) / 4, 60);
        ctx.shadowBlur = 0;
      }
      
      // Create particles
      function createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
          gameState.particles.push({
            x: x,
            y: y,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 5,
            speedY: (Math.random() - 0.5) * 5,
            color: color,
            life: 1.0  // 100% life to start
          });
        }
      }
      
      // Update and draw particles
      function updateParticles() {
        for (let i = 0; i < gameState.particles.length; i++) {
          const p = gameState.particles[i];
          
          // Update position
          p.x += p.speedX;
          p.y += p.speedY;
          
          // Reduce life
          p.life -= 0.02;
          
          // Draw particle
          if (p.life > 0) {
            ctx.globalAlpha = p.life;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 5;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        }
        
        // Remove dead particles
        gameState.particles = gameState.particles.filter(p => p.life > 0);
      }
      
      // Update left paddle AI
      function updatePaddles() {
        const leftPaddleCenter = gameState.leftPaddleY + paddleHeight / 2;
        
        // Simple AI for left paddle
        if (gameState.ballX < canvas.width / 2) {
          if (gameState.ballY > leftPaddleCenter + 20) {
            gameState.leftPaddleY += 5;
          } else if (gameState.ballY < leftPaddleCenter - 20) {
            gameState.leftPaddleY -= 5;
          }
        } else {
          // Move towards center when ball is on the other side
          if (leftPaddleCenter < canvas.height / 2 - 20) {
            gameState.leftPaddleY += 2;
          } else if (leftPaddleCenter > canvas.height / 2 + 20) {
            gameState.leftPaddleY -= 2;
          }
        }
        
        // Keep paddles in bounds
        gameState.leftPaddleY = Math.max(0, Math.min(gameState.leftPaddleY, canvas.height - paddleHeight));
      }
      
      // Update ball position and handle collisions
      function updateBall() {
        // Check collision with top and bottom walls
        if (gameState.ballY - ballRadius < 0 || gameState.ballY + ballRadius > canvas.height) {
          // Create particles on wall collision
          const wallColor = gameState.ballY < canvas.height / 2 ? '#4158D0' : '#ff5470';
          createParticles(
            gameState.ballX, 
            gameState.ballY < canvas.height / 2 ? ballRadius : canvas.height - ballRadius,
            wallColor,
            10
          );
          
          gameState.ballSpeedY = -gameState.ballSpeedY;
          
          // Add slight randomization to prevent loops
          gameState.ballSpeedY += (Math.random() * 0.4) - 0.2;
        }
        
        // Check collision with left paddle
        if (gameState.ballX - ballRadius < paddleWidth && 
            gameState.ballY > gameState.leftPaddleY && 
            gameState.ballY < gameState.leftPaddleY + paddleHeight) {
          
          // Create particles on paddle collision
          createParticles(paddleWidth + ballRadius, gameState.ballY, '#4158D0', 15);
          
          gameState.ballSpeedX = -gameState.ballSpeedX;
          
          // Adjust angle based on where the ball hits the paddle
          const relativeIntersect = (gameState.leftPaddleY + paddleHeight / 2) - gameState.ballY;
          gameState.ballSpeedY = -relativeIntersect * 0.1;
          
          // Increase speed slightly
          gameState.ballSpeedX *= 1.05;
          if (gameState.ballSpeedX > 10) gameState.ballSpeedX = 10;
        }
        
        // Check collision with right paddle
        if (gameState.ballX + ballRadius > canvas.width - paddleWidth && 
            gameState.ballY > rightPaddleYRef.current && 
            gameState.ballY < rightPaddleYRef.current + paddleHeight) {
          
          // Create particles on paddle collision
          createParticles(canvas.width - paddleWidth - ballRadius, gameState.ballY, '#ff5470', 15);
          
          gameState.ballSpeedX = -gameState.ballSpeedX;
          
          // Adjust angle based on where the ball hits the paddle
          const relativeIntersect = (rightPaddleYRef.current + paddleHeight / 2) - gameState.ballY;
          gameState.ballSpeedY = -relativeIntersect * 0.1;
          
          // Increase speed slightly
          gameState.ballSpeedX *= 1.05;
          if (gameState.ballSpeedX < -10) gameState.ballSpeedX = -10;
        }
        
        // Check if ball goes out of bounds (scoring)
        if (gameState.ballX < 0) {
          // Right scores - create particles on score
          createParticles(0, gameState.ballY, '#ff5470', 30);
          
          rightScoreRef.current++;
          setRightScore(rightScoreRef.current);
          resetBall();
        } else if (gameState.ballX > canvas.width) {
          // Left scores - create particles on score
          createParticles(canvas.width, gameState.ballY, '#4158D0', 30);
          
          leftScoreRef.current++;
          setLeftScore(leftScoreRef.current);
          resetBall();
        }
        
        // Update ball position
        gameState.ballX += gameState.ballSpeedX;
        gameState.ballY += gameState.ballSpeedY;
      }
      
      // Reset ball after scoring
      function resetBall() {
        gameState.ballX = canvas.width / 2;
        gameState.ballY = canvas.height / 2;
        
        // Randomize direction
        gameState.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 2;
        gameState.ballSpeedY = (Math.random() * 2 - 1) * 1.5;
      }
      
      // Make sure we start the game loop
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
      }
      
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing game:', error);
    }
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
          {isRunning ? 'Restart' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default GameLoopDemo; 