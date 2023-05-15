// Define canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define car object
const car = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 50,
  height: 100,
  speed: 5,
};

// Define obstacles array
const obstacles = [];

// Define update function
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw car
  ctx.fillStyle = 'red';
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 5;

    // Remove obstacles that are off-screen
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
    }
  }

  // Generate new obstacles
  if (Math.random() < 0.05) {
    const obstacle = {
      x: Math.random() * (canvas.width - 50),
      y: 0,
      width: 50,
      height: 50, // Fix: set obstacle height to 50 instead of 25
    };
    obstacles.push(obstacle);
  }

  // Draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillStyle = 'green';
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
  }

  // Check for collisions between car and obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (car.x < obstacles[i].x + obstacles[i].width &&
        car.x + car.width > obstacles[i].x &&
        car.y < obstacles[i].y + obstacles[i].height &&
        car.y + car.height > obstacles[i].y) {
      // Collision detected - reset game
      alert('Game over!');
      car.x = canvas.width / 2 - 25;
      car.y = canvas.height - 100;
      obstacles.length = 0;
    }
  }

  // Request next frame
  requestAnimationFrame(update);
}
