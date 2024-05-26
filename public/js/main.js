let ducks = [];
let score = 0;
let gameTime = 60;
let crosshair;
let duckImg;
let gameOver = false;

function preload() {
  duckImg = loadImage('img/pato-especial.png');
}

function setup() {
  createCanvas(800, 600);
  crosshair = createVector(width / 2, height / 2);
  setInterval(() => {
    if (gameTime > 0 && !gameOver) gameTime--;
  }, 1000);
  spawnDucks();
}

function draw() {
  background(135, 206, 235);
  moveCrosshair();
  drawCrosshair();

  if (!gameOver) {
    for (let duck of ducks) {
      duck.move();
      duck.display();
      if (dist(crosshair.x, crosshair.y, duck.x, duck.y) < duck.size / 2) {
        if (mouseIsPressed) {
          duck.shoot();
          score += duck.score;
        }
      }
    }
  }

  fill(0);
  textSize(24);
  text('Puntaje: ' + score, 10, 30);
  text('Tiempo: ' + gameTime, 10, 60);

  if (gameTime <= 0) {
    gameOver = true;
    textSize(48);
    text('Juego Terminado', width / 2 - 100, height / 2);
    noLoop();
  }

  if (score >= 300) {
    gameOver = true;
    textSize(48);
    text('Ganaste', width / 2 - 100, height / 2);
    noLoop();
  }
}

function mousePressed() {
  if (!gameOver) {
    for (let duck of ducks) {
      if (dist(crosshair.x, crosshair.y, duck.x, duck.y) < duck.size / 2) {
        duck.shoot();
        score += duck.score;
      }
    }
  }
}

function moveCrosshair() {
  crosshair.x = mouseX;
  crosshair.y = mouseY;

  crosshair.x = constrain(crosshair.x, 0, width);
  crosshair.y = constrain(crosshair.y, 0, height);
}

function drawCrosshair() {
  stroke(0);
  strokeWeight(2);
  line(crosshair.x - 10, crosshair.y, crosshair.x + 10, crosshair.y);
  line(crosshair.x, crosshair.y - 10, crosshair.x, crosshair.y + 10);
}

function spawnDucks() {
  for (let i = 0; i < 5; i++) {
    ducks.push(new Duck(random(width), random(height), random(1, 3), false));
  }
  ducks.push(new Duck(random(width), random(height), random(3, 5), true));
}

class Duck {
  constructor(x, y, speed, special) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.special = special;
    this.score = special ? 10 : 5;
    this.size = special ? 80 : 60;
  }

  move() {
    this.x += this.speed;
    if (this.x > width) this.x = 0;
  }

  display() {
    if (this.special) {
      tint(255, 0, 0);
    } else {
      noTint();
    }
    image(duckImg, this.x, this.y, this.size, this.size);
  }

  shoot() {
    this.x = random(width);
    this.y = random(height);
  }
}
