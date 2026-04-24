let ballX, ballY, dx, dy; // initalizes variables the position of the ball, and it movement (velocity)
let paddleX, paddleW = 80, paddleH = 10; // sets the size dimensions of the paddle
let bricks = []; // array that stores brick blocs
let rows = 4, cols = 5, brickW = 70, brickH = 20; //sets how many rows and how many columns and the brick dimenson
let brickHit = 0; //counts have many blocks has been hit

function setup() {
  createCanvas(400, 400); //creates the game space (width: 400 by height: 400 cordinate grid)
  resetGame(); // runs the resetGame method
  
  // create the grid of bricks
  for (let r = 0; r < rows; r++) { 
    for (let c = 0; c < cols; c++) {
      bricks.push( // adds the following brick objectsto the end of the array named bricks. 
        {  // {x: ..., y: ...} creates the brick object with x cords and y cords.
            x: c * (brickW + 5) + 15, // 15: left margin. (brickW+5): horizontal size of brick. c: column mutipler that shifts each successive brick 
            y: r * (brickH + 5) + 50, // 50: top margin. (brickH+5): vertical size of brick. r: row mutipler that makes sure brick is in the same row.
            active: true //set the brick as alive, not hit by the ball. 
        });
    }
  }
}

function resetGame() {
  ballX = width/2; //Sets initial x position of the ball.
  ballY = height/2; //Sets initial y position of the ball.
  dx = 3; //X velocity of the ball
  dy = -3; // Y velocity of the ball
}


function draw() { // main loop. Repeats constantly 
  background(20);
  
  // 1. Draw Paddle
  paddleX = constrain(mouseX - paddleW/2, 0, width - paddleW); // Constrains a x cord of paddle between a minimum and maximum value
  fill(0, 200, 255); //colors the below rectangle blue. rgb (0,255,255). Fill functions always colors the object below it.
  rect(paddleX, height - 30, paddleW, paddleH); //makes the paddle given the x cord, a fixed height, and fix dimensions
  
  // 2. Draw Ball
  fill(255); //colors the ball white.
  circle(ballX, ballY, 15); //draws the ball at a circle location with a raidus of 15.
  
  // 3. Ball Physics
  ballX += dx; // adds x component of the velocity to the ballX cordinate to move it.
  ballY += dy; // adds y component of the velocity to the ballY cordinate.
  
  // Wall Bouncing
  if (ballX <= 0 || ballX >= width) dx *= -1; //If it hits a border of our game space, reverse it's direction in the x axis. Ball bounce
  if (ballY <= 0) dy *= -1; //If it hits the bottom of our game space, reverse it's y direction. Ball bounce
  
  // Paddle Bouncing
  if (ballY >= height - 30 && ballX > paddleX && ballX < paddleX + paddleW) { //checks if ball is hits the paddle surface. 
    dy *= -1; //ball bounce
    ballY = height - 31; // Prevent sticking
  }
  
  // 4. Brick Logic
  for (let b of bricks) { //For each loop, get all brick objects from the bricks array.
    if (b.active) { //If the brick hasn't been hit by the ball
      fill(255, 100, 0); //Color the brick orange
      rect(b.x, b.y, brickW, brickH); //b.x: gets the x value calculated in {x: ...} and b.y: gets the y value calculated in {y: ...}
      
      // Collision Check: Is the ball inside the brick's rectangle?
      if (ballX > b.x && ballX < b.x + brickW && ballY > b.y && ballY < b.y + brickH) {
        b.active = false; // Brick disappears
        brickHit = brickHit+1; // Adds 1 to the total number of bricks that has been hit
        dy *= -1;         // Ball bounces
      }
    }
  }
  
  // 5. Game Over
  if (ballY > height) { // If ball hits bottom of our game space
    fill(255, 0, 0); // Sets the whole game to have a black background
    textAlign(CENTER); // Algins the text element below to center
    textSize(32); // Makes the text element below big.
    text("GAME OVER", width/2, height/2); // Writes the text in middle of game space (cord: 200,200)
    noLoop(); // Stop the game (stops draw())
  } else if (brickHit = rows*cols) { /// If all blocks has been hit
      fill(255, 0, 0); // Sets the whole game to have a black background
    textAlign(CENTER); // Algins the text element below to center
    textSize(32); // Makes the text element below big.
    text("YOU WIN", width/2, height/2); // Writes the text in middle of game space (cord: 200,200)
    noLoop(); // Stop the game (stops draw())
  }
}

/** Challanges for cool people
 * 1. Change the ball into a different shape (like a square) and make every row of bricks a different color. (Hint use b.y and if statements) -- Easy
 * 2. Every time the ball hits the paddle, make the ball's speed increase by 10%. (Hint: hm what does dx and dy do?) -- Medium
 * 3. Make it so if the ball hits the left side of the paddle, it bounces left, and if it hits the right side, it bounces right. (Hint: BallX, paddleX, paddleW)-- Hard + fun
 * 4. Create a special "Power-Up" brick. When it's destroyed, a second ball appears on the screen. (Hint: New ball creation, new Hard) -- Super ULTRA HARD!s
 */
