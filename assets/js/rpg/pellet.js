import GameEnv from '.GameEnv.js';


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const spriteImage = new Image();
spriteImage.src = 'images/rpg/turtle.png'; // Path to your sprite image

let sprite = {
    x: 100,
    y: 300,
    width: 50,  // Adjust this to match your sprite image's width
    height: 50, // Adjust this to match your sprite image's height
};

let pellets = [];
const pelletWidth = 10; // Diameter of the circle
const pelletHeight = 10; // Diameter of the circle

function drawSprite() {
    ctx.drawImage(spriteImage, sprite.x, sprite.y, sprite.width, sprite.height);
}

function drawPellets() {
    pellets.forEach(pellet => {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(pellet.x + pelletWidth / 2, pellet.y + pelletHeight / 2, pelletWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
}

function updatePellets() {
    pellets.forEach((pellet, index) => {
        pellet.x += 5; // Move the pellet to the right
        if (pellet.x > canvas.width) {
            pellets.splice(index, 1); // Remove pellet if it goes off screen
        }
    });
}

function shootPellet() {
    const pellet = {
        x: sprite.x + sprite.width,
        y: sprite.y + (sprite.height / 2) - (pelletHeight / 2), // Center the pellet vertically
    };
    pellets.push(pellet);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite();
    drawPellets();
    updatePellets();
    requestAnimationFrame(gameLoop);
}

// Load the sprite image and start the game loop once it's loaded
spriteImage.onload = () => {
    gameLoop();
};

// Event listener to shoot pellet on spacebar press
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        shootPellet();
    }
});
