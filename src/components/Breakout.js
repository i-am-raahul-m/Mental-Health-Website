import React, { useRef, useEffect, useState } from "react";

const Breakout = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const handleRestart = () => {
    setGameOver(false);
    setWin(false);
    setRestartKey((prev) => prev + 1);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let gameWon = false;

    // Game Constants
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;

    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;

    // Brick settings
    const brickRowCount = 5;
    const brickColumnCount = 6;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    let score = 0;

    function drawBricks() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5722";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Score: " + score, 8, 20);
    }

    function collisionDetection() {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
              score++;
              // Check if all bricks are broken
              if (score === brickRowCount * brickColumnCount) {
                gameWon = true;
                setWin(true);
                return;
              }
            }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      collisionDetection();

      // If the game is won, stop updating the ball's position.
      if (gameWon) {
        return;
      }

      // Wall collision detection
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        // Paddle collision check
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          // Lose condition: ball missed the paddle.
          setGameOver(true);
          return;
        }
      }

      // Update ball position
      x += dx;
      y += dy;

      // Update paddle position based on key presses
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      // Increase the ball speed linearly by applying a constant acceleration.
      const currentSpeed = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const acceleration = 0.005; // Adjust this value for desired acceleration
      const newSpeed = currentSpeed + acceleration;
      dx = newSpeed * Math.cos(angle);
      dy = newSpeed * Math.sin(angle);

      if (!gameOver && !gameWon) {
        requestAnimationFrame(draw);
      }
    }

    function keyDownHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
      }
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    // Game loop
    draw();

    // Cleanup event listeners on unmount or restart
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [restartKey]);

  return (
    <div className="breakout-game">
      <h2>Atari Breakout</h2>
      <canvas ref={canvasRef} width="570" height="600"></canvas>
      {gameOver && <p> Game Over! You lost.</p>}
      {win && <p>🎉 You Win! 🎉</p>}
      {(gameOver || win) && (
        <button onClick={handleRestart} style={{ marginTop: "20px" }}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default Breakout;
