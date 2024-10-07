import GameEnv from './GameEnv.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 10; // 1/nth of the height of the canvas
const STEP_FACTOR = 1000; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 50; // Number of frames to wait before changing the animation frame

/**
 * Player class handles the player state, rendering, and key events.
 */
class Player {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the player. If null, a default red square is used.
     */
    constructor(data = null) {
        // Initialize the player's scale based on the game environment
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Set up the turtle sprite data with the new sprite sheet dimensions
        this.spriteData = {
            src: 'images/rpg/turtle.png',  // Path to the turtle.png sprite sheet
            pixels: { width: 256, height: 280 },  // Size of the entire sprite sheet
            orientation: { columns: 3, rows: 4 }, // 3x4 grid of frames
            up: { start: 0, row: 0, columns: 3 },     // Row 3, 3 frames for "up" animation
            down: { start: 0, row: 2, columns: 3 },  // Row 0, 3 frames for "down" animation
            left: { start: 0, row: 3, columns: 3 },  // Row 1, 3 frames for "left" animation
            right: { start: 0, row: 1, columns: 3 } // Row 2, 3 frames for "right" animation
        };

        // Use provided data or fallback to default
        if (data) {
            this.scaleFactor = data.SCALE_FACTOR || SCALE_FACTOR;
            this.stepFactor = data.STEP_FACTOR || STEP_FACTOR;
            this.animationRate = data.ANIMATION_RATE || ANIMATION_RATE;

            // Load the sprite sheet
            this.spriteSheet = new Image();
            this.spriteSheet.src = data.src;

            // Initialize animation properties
            this.frameIndex = 0; // index reference to current frame
            this.frameCounter = 0; // count each frame rate refresh
            this.direction = 'down'; // Initial direction
        } else {
            this.scaleFactor = SCALE_FACTOR;
            this.stepFactor = STEP_FACTOR;
            this.animationRate = ANIMATION_RATE;
            this.spriteSheet = new Image();
            this.spriteSheet.src = this.spriteData.src;  // Load turtle.png
            this.frameIndex = 0;
            this.frameCounter = 0;
            this.direction = 'down'; // Default to 'down' direction
        }

        // Set the initial size of the player
        this.size = GameEnv.innerHeight / this.scaleFactor;

        // Initialize the player's position and velocity
        this.position = { x: 0, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };

        // Set the initial width and height based on the frame size
        this.width = this.size;
        this.height = this.size;

        // Bind event listeners to allow object movement
        this.bindEventListeners();
    }

    /**
     * Draws the player on the canvas.
     * This method renders the player using the sprite sheet if provided, otherwise a red square.
     */
    draw() {
        if (this.spriteSheet) {
            // Calculate the frame size
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns; // 256 / 3 = ~85.33
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;   // 280 / 4 = 70

            // Get the directional animation data
            const directionData = this.spriteData[this.direction];

            // Calculate the x and y position on the sprite sheet for the current frame
            const frameX = (directionData.start + this.frameIndex) * frameWidth;
            const frameY = directionData.row * frameHeight;

            // Draw the current frame of the sprite sheet on the canvas
            GameEnv.ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, frameWidth, frameHeight,      // Source rectangle on the sprite sheet
                this.position.x, this.position.y, this.width, this.height // Destination rectangle on the canvas
            );

            // Increment the frame counter and update the frame index if it's time to animate
            this.frameCounter++;
            if (this.frameCounter % this.animationRate === 0) {
                this.frameIndex = (this.frameIndex + 1) % directionData.columns; // Cycle through the frames
            }
        } else {
            // Draw a red square as a fallback if the sprite sheet isn't loaded
            GameEnv.ctx.fillStyle = 'red';
            GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    /**
     * Updates the player's position and ensures it stays within the canvas boundaries.
     */
    update() {
        this.draw();  // First, draw the player

        // Update the position based on the velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the player stays within the canvas boundaries
        this.stayWithinCanvas();
    }

    /**
     * Ensures the player stays within the canvas boundaries.
     */
    stayWithinCanvas() {
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }
/**
     * Binds key event listeners to handle player movement.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handles key down events for movement based on WASD keys.
     * 
     * W = Up, A = Left, S = Down, D = Right
     * 
     * @param {Object} event - The keydown event object.
     */
    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = -this.yVelocity; // Move up
                this.direction = 'up';
                break;
            case 65: // 'A' key
                this.velocity.x = -this.xVelocity; // Move left
                this.direction = 'left';
                break;
            case 83: // 'S' key
                this.velocity.y = this.yVelocity; // Move down
                this.direction = 'down';
                break;
            case 68: // 'D' key
                this.velocity.x = this.xVelocity; // Move right
                this.direction = 'right';
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity when movement keys are released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
            case 83: // 'S' key
                this.velocity.y = 0; // Stop vertical movement
                break;
            case 65: // 'A' key
            case 68: // 'D' key
                this.velocity.x = 0; // Stop horizontal movement
                break;
        }
    }
}

export default Player;
