// Set up the game canvas
var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

// Set up the player ship
var player = {
  x: width / 2,
  y: height - 50,
  speed: 5,
  size: 30
};

// Set up the enemy ships
var enemies = [];
var enemyCount = 20;
var enemySpacing = 50;
var enemySize = 30;
for (var i = 0; i < enemyCount; i++) {
  var enemy = {
    x: enemySpacing + (i % 10) * enemySpacing * 2,
    y: enemySpacing + Math.floor(i / 10) * enemySpacing * 2,
    size: enemySize,
    speed: 2,
    direction: 1,
    fireRate: 60,
    fireCooldown: 0
  };
  enemies.push(enemy);
}

// Set up the player projectiles
var projectiles = [];
var projectileSize = 5;

// Set up the enemy projectiles
var enemyProjectiles = [];
var enemyProjectileSize = 5;

// Set up the game loop
function update() {
  // Move the player ship
  if (keys[37] && player.x > 0) { player.x -= player.speed; }
  if (keys[39] && player.x < width) { player.x += player.speed; }

  // Move the enemy ships
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    enemy.x += enemy.speed * enemy.direction;
    if (enemy.x < enemySpacing || enemy.x > width - enemySpacing) {
      enemy.direction *= -1;
      enemy.y += enemySpacing;
    }

    // Check if the enemy can fire
    if (enemy.fireCooldown > 0) {
      enemy.fireCooldown--;
    } else {
      enemyProjectiles.push({
        x: enemy.x,
        y: enemy.y + enemy.size / 2,
        size: enemyProjectileSize,
        speed: 5
      });
      enemy.fireCooldown = enemy.fireRate;
    }
  }

  // Move the player projectiles
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].y -= projectiles[i].speed;
    if (projectiles[i].y < 0) {
      projectiles.splice(i, 1);
      i--;
    }
  }

  // Move the enemy projectiles
  for (var i = 0; i < enemyProjectiles.length; i++) {
    enemyProjectiles[i].y += enemyProjectiles[i].speed;
    if (enemyProjectiles[i].y > height) {
      enemyProjectiles.splice(i, 1);
      i--;
    }
  }

  // Check for collisions between player projectiles and enemies
  for (var i = 0; i < projectiles.length;
