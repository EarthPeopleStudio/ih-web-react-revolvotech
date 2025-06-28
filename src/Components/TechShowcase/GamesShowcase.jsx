import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { AiOutlineCode } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight, FaCircle } from 'react-icons/fa';
import PacManGame from "./games/PacManGame";
import SnakeGame from "./games/SnakeGame";
import GameLoopDemo from "./games/GameLoopDemo";

const circuitPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 182, 4, 0); }
  50% { box-shadow: 0 0 0 4px rgba(251, 182, 4, 0.1); }
`;

const digitalFlicker = keyframes`
  0%, 100% { opacity: 1; }
  2% { opacity: 0.8; }
  4% { opacity: 1; }
  6% { opacity: 0.9; }
  8% { opacity: 1; }
`;

// Styled components
const CodeShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 60px;
`;

const CodeShowcaseItem = styled.div`
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.95), rgba(35, 35, 40, 0.95));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(251, 182, 4, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(10px);
  max-height: 600px;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251, 182, 4, 0.015) 1px, transparent 1px),
      radial-gradient(circle at 25% 25%, rgba(251, 182, 4, 0.02) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(251, 182, 4, 0.015) 1px, transparent 1px);
    background-size: 40px 40px, 40px 40px, 20px 20px, 30px 30px;
    opacity: 0.4;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 8px;
    height: 8px;
    background: rgba(251, 182, 4, 0.5);
    border-radius: 50%;
    animation: ${circuitPulse} 4s ease-in-out infinite;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(251, 182, 4, 0.3);
    
    &::after {
      animation: ${circuitPulse} 2s ease-in-out infinite;
    }
  }
`;

const CodeShowcaseHeader = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, rgba(25, 25, 30, 0.98), rgba(35, 35, 40, 0.98));
  position: relative;
  z-index: 1;
`;

const CodeShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #fbb604;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  
  svg {
    margin-right: 10px;
    color: #fbb604;
  }
`;

const CodeShowcaseDescription = styled.p`
  padding: 16px 28px;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  border-bottom: 1px solid rgba(251, 182, 4, 0.1);
  margin: 0;
  background: linear-gradient(145deg, rgba(25, 25, 30, 0.8), rgba(35, 35, 40, 0.8));
  position: relative;
  z-index: 1;
`;

const CodeDemoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0;
  position: relative;
  z-index: 1;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CodeSnippetContainer = styled.div`
  position: relative;
  border-radius: 0;
  overflow: hidden;
  background: rgba(25, 25, 25, 0.8);
  border: none;
  border-right: 1px solid rgba(251, 182, 4, 0.2);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 968px) {
    border-right: none;
    border-bottom: 1px solid rgba(251, 182, 4, 0.2);
  }
`;

const CodeHeader = styled.div`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.08), rgba(251, 182, 4, 0.05));
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #e0e0e0;
  border-bottom: 1px solid rgba(251, 182, 4, 0.2);
`;

const CodeFileName = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #fbb604;
`;

const CodeLanguage = styled.span`
  background: linear-gradient(135deg, rgba(251, 182, 4, 0.2), rgba(251, 182, 4, 0.15));
  padding: 4px 12px;
  border-radius: 6px;
  color: #fbb604;
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(251, 182, 4, 0.3);
`;

const DemoContainer = styled.div`
  padding: 20px;
  background: linear-gradient(145deg, rgba(30, 30, 35, 0.9), rgba(40, 40, 45, 0.9));
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 1px solid rgba(251, 182, 4, 0.1);
`;

const PreBlock = styled.pre`
  background: transparent;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #ffffff;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  flex: 1;
  max-height: 400px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(251, 182, 4, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 182, 4, 0.5);
  }
`;

// Custom Rainbow code component with no syntax highlighting
const RainbowCode = ({ code, language }) => {
  // Prevent copy functionality
  const handleCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const nonCopyableStyles = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitTouchCallout: 'none',
    pointerEvents: 'auto',
    color: '#ffffff',
    width: '100%',
    height: '100%',
    fontFamily: "'Fira Code', monospace",
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale'
  };

  return (
    <PreBlock>
      <code 
        className={`language-${language}`} 
        style={nonCopyableStyles}
        onCopy={handleCopy}
        onCut={handleCopy}
        onContextMenu={handleContextMenu}
        data-nocopy="true"
      >
        {code}
      </code>
    </PreBlock>
  );
};

// Games showcase implementation
const GamesShowcase = () => {
  return (
    <CodeShowcaseGrid>
      {/* Pac-Man Game Example */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Pac-Man Game
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Classic Pac-Man style game with ghosts, pellets and maze navigation
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>pacman-game.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="javascript" 
              code={`const canvas = document
  .getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const cellSize = 20;
const cols = Math.floor(
  canvas.width / cellSize
);
const rows = Math.floor(
  canvas.height / cellSize
);

// Game state
let score = 0;
let gameOver = false;
let isRunning = true;

// Pacman properties
let pacman = {
  x: 5,
  y: 5,
  direction: 'right',
  nextDirection: 'right',
  mouth: 0.2,
  mouthDirection: 1
};

// Ghost properties
let ghosts = [
  { 
    x: 15, 
    y: 15, 
            color: '#FFEB3B', 
    direction: 'left' 
  },  // Red ghost
  { 
    x: 14, 
    y: 15, 
            color: '#00d4ff', 
    direction: 'up' 
  },    // Pink ghost
  { 
    x: 16, 
    y: 15, 
    color: '#00FFFF', 
    direction: 'right' 
  }, // Cyan ghost
  { 
    x: 15, 
    y: 14, 
            color: '#fbb604', 
    direction: 'down' 
  }   // Orange ghost
];

// Maze layout
let grid = [];
initializeMaze();

function initializeMaze() {
  // Create maze with walls and dots
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      // Border walls
      if (x === 0 || x === cols - 1 || 
          y === 0 || y === rows - 1) {
        grid[y][x] = 'wall';
      } else if ((x % 2 === 0 && 
                  y % 2 === 0) && 
                 (Math.random() < 0.3)) {
        // Some inner walls
        grid[y][x] = 'wall';
      } else {
        // Dots (food)
        grid[y][x] = 'dot';
      }
    }
  }
  
  // Clear area around pacman
  const clearRadius = 2;
  for (let y = Math.max(
         0, pacman.y - clearRadius
       ); 
       y <= Math.min(
         rows - 1, 
         pacman.y + clearRadius
       ); y++) {
    for (let x = Math.max(
           0, pacman.x - clearRadius
         ); 
         x <= Math.min(
           cols - 1, 
           pacman.x + clearRadius
         ); x++) {
      if (grid[y][x] !== 'wall') {
        grid[y][x] = 'empty';
      }
    }
  }
}`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <PacManGame />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>

      {/* Snake Game Example */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Snake Game
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Classic Snake game where you collect food to grow while avoiding walls and yourself
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>snake-game.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="javascript" 
              code={`const canvas = document
  .getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const cellSize = 15;
const cols = Math.floor(
  canvas.width / cellSize
);
const rows = Math.floor(
  canvas.height / cellSize
);

// Game state
let score = 0;
let gameOver = false;

// Snake state
let snake = [
  {
    x: Math.floor(cols / 2), 
    y: Math.floor(rows / 2)
  },
  {
    x: Math.floor(cols / 2) - 1, 
    y: Math.floor(rows / 2)
  },
  {
    x: Math.floor(cols / 2) - 2, 
    y: Math.floor(rows / 2)
  }
];
let direction = 'right';
let nextDirection = 'right';

// Food position
let food = { x: 0, y: 0 };
placeFood();

// Handle keyboard input
document.addEventListener('keydown', 
  (e) => {
    switch(e.key.toLowerCase()) {
      case 'w':
        if (direction !== 'down') {
          nextDirection = 'up';
        }
        break;
      case 's':
        if (direction !== 'up') {
          nextDirection = 'down';
        }
        break;
      case 'a':
        if (direction !== 'right') {
          nextDirection = 'left';
        }
        break;
      case 'd':
        if (direction !== 'left') {
          nextDirection = 'right';
        }
        break;
    }
  }
);

// Place food at a random position
function placeFood() {
  let foodPosition;
  let isOnSnake;
  
  do {
    isOnSnake = false;
    foodPosition = {
      x: Math.floor(
        Math.random() * cols
      ),
      y: Math.floor(
        Math.random() * rows
      )
    };
    
    // Check if food is on the snake
    for (let segment of snake) {
      if (segment.x === foodPosition.x && 
          segment.y === foodPosition.y) {
        isOnSnake = true;
        break;
      }
    }
  } while (isOnSnake);
  
  food = foodPosition;
}

// Draw the snake
function drawSnake() {
  for (let i = 0; i < snake.length; 
       i++) {
    const segment = snake[i];
    
    if (i === 0) {
      // Head
      ctx.fillStyle = '#50fa7b';
    } else {
      // Body
      ctx.fillStyle = i % 2 === 0 
        ? '#3ae374' 
        : '#32ff7e';
    }
    
    ctx.fillRect(
      segment.x * cellSize,
      segment.y * cellSize,
      cellSize - 1,
      cellSize - 1
    );
  }
}`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <SnakeGame />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>

      {/* Pong Game Example */}
      <CodeShowcaseItem>
        <CodeShowcaseHeader>
          <CodeShowcaseTitle>
            Player vs AI Pong Game
          </CodeShowcaseTitle>
        </CodeShowcaseHeader>
        <CodeShowcaseDescription>
          Interactive Pong game where you control the right paddle with W/S keys and face off against an AI opponent
        </CodeShowcaseDescription>
        <CodeDemoContainer>
          <CodeSnippetContainer>
            <CodeHeader>
              <CodeFileName>pong-game.js</CodeFileName>
              <CodeLanguage>JavaScript</CodeLanguage>
            </CodeHeader>
            <RainbowCode 
              language="javascript" 
              code={`const canvas = document
  .getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const paddleHeight = 60;
const paddleWidth = 10;
const ballRadius = 8;

// Game state
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 2;
let leftPaddleY = canvas.height / 2 - 
  paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - 
  paddleHeight / 2;
let leftScore = 0;
let rightScore = 0;
let isRunning = true;

// Handle keyboard input for player
document.addEventListener('keydown', 
  (e) => {
    if (e.key === 'ArrowUp') {
      rightPaddleY = Math.max(
        0, rightPaddleY - 15
      );
    } else if (e.key === 'ArrowDown') {
      rightPaddleY = Math.min(
        canvas.height - paddleHeight, 
        rightPaddleY + 15
      );
    }
  }
);

// Reset ball to center after scoring
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  // Randomize direction
  ballSpeedX = (Math.random() > 0.5 
    ? 1 
    : -1) * 3;
  ballSpeedY = (Math.random() * 2 - 1) * 2;
}

// Draw a paddle at specified position
function drawPaddle(x, y) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(
    x, y, 
    paddleWidth, paddleHeight
  );
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(
    ballX, ballY, 
    ballRadius, 
    0, Math.PI * 2
  );
        ctx.fillStyle = '#FFEB3B';
  ctx.fill();
  ctx.closePath();
}

// Draw the score
function drawScore() {
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(
    leftScore, 
    canvas.width / 4, 
    30
  );
  ctx.fillText(
    rightScore, 
    canvas.width * 3 / 4, 
    30
  );
}

// Update paddle positions
function updatePaddles() {
  // Left paddle AI
  const leftPaddleCenter = 
    leftPaddleY + paddleHeight / 2;
  if (ballX < canvas.width / 2) {
    if (ballY > leftPaddleCenter + 10) {
      leftPaddleY += 3;
    } else if (ballY < 
               leftPaddleCenter - 10) {
      leftPaddleY -= 3;
    }
  }
  
  // Keep paddles in bounds
  leftPaddleY = Math.max(
    0, 
    Math.min(
      leftPaddleY, 
      canvas.height - paddleHeight
    )
  );
}

// Update ball position and collisions
function updateBall() {
  // Wall collisions (top and bottom)
  if (ballY - ballRadius < 0 || 
      ballY + ballRadius > 
        canvas.height) {
    ballSpeedY = -ballSpeedY;
    // Add slight randomization
    ballSpeedY += 
      (Math.random() * 0.4) - 0.2;
  }
  
  // Paddle collisions
  if (ballX - ballRadius < paddleWidth && 
      ballY > leftPaddleY && 
      ballY < leftPaddleY + paddleHeight) {
    // Left paddle hit
    ballSpeedX = -ballSpeedX;
    // Add angle based on hit position
    const relativeIntersect = 
      (leftPaddleY + paddleHeight / 2) - 
      ballY;
    ballSpeedY = -relativeIntersect * 0.1;
  } else if (
      ballX + ballRadius > 
        canvas.width - paddleWidth && 
      ballY > rightPaddleY && 
      ballY < rightPaddleY + paddleHeight
  ) {
    // Right paddle hit
    ballSpeedX = -ballSpeedX;
    // Add angle based on hit position
    const relativeIntersect = 
      (rightPaddleY + paddleHeight / 2) - 
      ballY;
    ballSpeedY = -relativeIntersect * 0.1;
  }
  
  // Score detection
  if (ballX < 0) {
    // Right scores
    rightScore++;
    resetBall();
  } else if (ballX > canvas.width) {
    // Left scores
    leftScore++;
    resetBall();
  }
  
  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}`} 
            />
          </CodeSnippetContainer>
          <DemoContainer>
            <GameLoopDemo />
          </DemoContainer>
        </CodeDemoContainer>
      </CodeShowcaseItem>
    </CodeShowcaseGrid>
  );
};

export default GamesShowcase; 