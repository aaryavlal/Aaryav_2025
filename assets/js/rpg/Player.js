import GameEnv from './GameEnv.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 10; // Number of frames to wait before changing the animation frame

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

        // Set up the turtle sprite data
        this.spriteData = {
            src: 'images/rpg/turtle.png', // Path to turtle.png
            pixels: { width: 72, height: 128 }, // Total width and height of the sprite sheet
            orientation: { columns: 3, rows: 4 }, // 3 columns, 4 rows (24x32 frames)
            directions: {
                down: { start: 0, row: 0, columns: 3 },   // Down-facing animation frames
                left: { start: 0, row: 1, columns: 3 },   // Left-facing animation frames
                right: { start: 0, row: 2, columns: 3 },  // Right-facing animation frames
                up: { start: 0, row: 3, columns: 3 },     // Up-facing animation frames
            },
            SCALE_FACTOR: 2,  // Scale factor for enlarging the sprite
            STEP_FACTOR: STEP_FACTOR,  // Default step factor
            ANIMATION_RATE: ANIMATION_RATE  // Animation speed
        };

        // Override sprite data if provided
        if (data) {
            this.spriteData = { ...this.spriteData, ...data };
        }

        // Load the sprite sheet
        this.spriteSheet = new Image();
        this.spriteSheet.src = this.spriteData.src;

        // Initialize animation properties
        this.frameIndex = 0; // Index reference to the current frame
        this.frameCounter = 0; // Counter to track animation frame rate
        this.direction = 'down'; // Initial direction

        // Set initial size and scale factors
        this.scaleFactor = this.spriteData.SCALE_FACTOR || SCALE_FACTOR;
        this.stepFactor = this.spriteData.STEP_FACTOR || STEP_FACTOR;
        this.animationRate = this.spriteData.ANIMATION_RATE || ANIMATION_RATE;

        // Set the initial size of the player
        this.size = GameEnv.innerHeight / this.scaleFactor;

        // Initialize the player's position and velocity
        this.position = { x: 0, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };

        // Set the player's width and height to match the frame size
        this.frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns; // 72 / 3 = 24
        this.frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;  // 128 / 4 = 32

        this.resize();

        // Bind event listeners for player movement
        this.bindEventListeners();
    }

    /**
     * Resizes the player based on the game environment.
     */
    resize() {
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Adjust the player's position proportionally
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;

        // Update the scale
        this.scale = newScale;

        // Recalculate the size and velocity
        this.size = this.scale.height / this.scaleFactor;
        this.xVelocity = this.scale.width / this.stepFactor;
        this.yVelocity = this.scale.height / this.stepFactor;

        // Set the player's width and height based on the frame size and scale factor
        this.width = this.frameWidth * this.scaleFactor;
        this.height = this.frameHeight * this.scaleFactor;
    }

    /**
     * Draws the player on the canvas.
     */
    draw() {
        if (this.spriteSheet) {
            // Calculate the current frame coordinates in the sprite sheet
            const directionData = this.spriteData.directions[this.direction];
            const frameX = (directionData.start + this.frameIndex) * this.frameWidth;
            const frameY = directionData.row * this.frameHeight;

            // Draw the current frame of the sprite on the canvas
            GameEnv.ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, this.frameWidth, this.frameHeight, // Source (sprite sheet)
                this.position.x, this.position.y, this.width, this.height // Destination (canvas)
            );

            // Increment frameCounter and update animation frame if needed
            this.frameCounter++;
            if (this.frameCounter >= this.animationRate) {
                this.frameCounter = 0;
                this.frameIndex = (this.frameIndex + 1) % directionData.columns; // Loop through frames
            }
        } else {
            // Default to drawing a red square if no sprite is loaded
            GameEnv.ctx.fillStyle = 'red';
            GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    /**
     * Updates the player's position and ensures it stays within canvas boundaries.
     */
    update() {
        this.draw();

        // Update position based on velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure player stays within canvas boundaries
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

    handleKeyDown({ keyCode }) {
        // Movement logic here (e.g., arrow keys to move and set direction)
        throw new Error('Method "handleKeyDown()" must be implemented');
    }

    handleKeyUp({ keyCode }) {
        // Stop movement logic here
        throw new Error('Method "handleKeyUp()" must be implemented');
    }
}

export default Player;
