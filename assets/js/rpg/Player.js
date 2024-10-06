import GameEnv from './GameEnv.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate

/**
 * Player is a dynamic class that manages the data and events for a player object.
 * 
 * The focus of this class is to handle the player's state, rendering, and key events.
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * The classic Java class pattern provides a structured way to define the properties and methods
 * associated with the player. This approach helps encapsulate the player's state and behavior,
 * making the code more modular and easier to maintain. By using this pattern, we can create
 * multiple instances of the Player class, each with its own state and behavior.
 * 
 * @class Player
 * @property {Object} position - The current position of the player.
 * @property {Object} velocity - The current velocity of the player.
 * @property {Object} scale - The scale of the player based on the game environment.
 * @property {number} size - The size of the player.
 * @property {number} width - The width of the player.
 * @property {number} height - The height of the player.
 * @property {number} xVelocity - The velocity of the player along the x-axis.
 * @property {number} yVelocity - The velocity of the player along the y-axis.
 * @property {Image} spriteSheet - The sprite sheet image for the player.
 * @property {number} frameIndex - The current frame index for animation.
 * @property {number} frameCount - The total number of frames for each direction.
 * @property {Object} spriteData - The data for the sprite sheet.
 * @property {number} frameCounter - Counter to control the animation rate.
 * @method resize - Resizes the player based on the game environment.
 * @method draw - Draws the player on the canvas.
 * @method update - Updates the player's position and ensures it stays within the canvas boundaries.
 * @method bindEventListeners - Binds key event listeners to handle player movement.
 * @method handleKeyDown - Handles key down events to change the player's velocity.
 * @method handleKeyUp - Handles key up events to stop the player's velocity.
 */
class Player {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} sprite - The sprite data for the player. If null, a default red square is used.
     */
    constructor(sprite = null) {
        // Initialize the player's scale based on the game environment
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Sprite information, using turtle.png
        this.spriteData = {
            src: 'images/rpg/turtle.png', // Path to turtle.png
            data: {
                SCALE_FACTOR: 2,        // Scale factor for the sprite
                STEP_FACTOR: 5,         // Step factor for movement
                ANIMATION_RATE: 100,    // Animation rate (time between frames)
                COLUMNS: 3,             // Number of columns in the sprite sheet
                ROWS: 4,                // Number of rows in the sprite sheet
            }
        };

        // Set default sprite if none is provided
        if (sprite) {
            this.spriteData = sprite; // Use the provided sprite data if available
        }

        // Load the sprite sheet
        this.spriteSheet = new Image();
        this.spriteSheet.src = this.spriteData.src; // Load the turtle.png

        // Initialize animation properties
        this.frameIndex = 0; // Index reference to current frame
        this.frameCounter = 0; // Count each frame rate refresh
        this.direction = 'down'; // Initial direction

        // Set frame dimensions based on sprite sheet data
        this.frameWidth = 72 / this.spriteData.data.COLUMNS; // Width of each frame
        this.frameHeight = 128 / this.spriteData.data.ROWS; // Height of each frame

        // Initialize the direction data for animation
        this.directionData = {
            down: { start: 0, row: 0 },   // Down animation frames
            left: { start: 0, row: 1 },   // Left animation frames
            right: { start: 0, row: 2 },  // Right animation frames
            up: { start: 0, row: 3 }      // Up animation frames
        };

        // Set initial position of the player
        this.position = { x: 0, y: 0 }; // Default position
    }

    /**
     * Method to update the player's animation frame based on the direction.
     */
    update() {
        // Increment frame counter to handle animation timing
        this.frameCounter++;

        // Check if it's time to update the frame
        if (this.frameCounter >= this.spriteData.data.ANIMATION_RATE) {
            this.frameCounter = 0; // Reset frame counter
            this.frameIndex++; // Move to the next frame

            // Loop the animation
            if (this.frameIndex >= this.spriteData.data.COLUMNS) {
                this.frameIndex = 0; // Reset to the first frame
            }
        }
    }

    /**
     * Method to draw the player sprite on the canvas.
     */
    draw(ctx) {
        if (this.spriteSheet) {
            // Calculate the X and Y position of the current frame in the sprite sheet
            const frameX = (this.directionData[this.direction].start + this.frameIndex) * this.frameWidth; // X coordinate of the frame
            const frameY = this.directionData[this.direction].row * this.frameHeight; // Y coordinate of the frame

            // Draw the current frame of the sprite sheet on the canvas
            ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, this.frameWidth, this.frameHeight, // Source rectangle (the frame to crop)
                this.position.x, this.position.y, this.frameWidth * this.spriteData.data.SCALE_FACTOR, this.frameHeight * this.spriteData.data.SCALE_FACTOR // Destination rectangle (where to draw on the canvas)
            );
        }
    }
}


        // Initialize the player's position and velocity
        this.position = { x: 0, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };

        // Set the initial size and velocity of the player
        this.resize();

        // Bind event listeners to allow object movement
        this.bindEventListeners();
    }

    /**
     * Resizes the player based on the game environment.
     * 
     * This method adjusts the player's size and velocity based on the scale of the game environment.
     * It also adjusts the player's position proportionally based on the previous and current scale.
     */
    resize() {
        // Calculate the new scale resulting from the window resize
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Adjust the player's position proportionally
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;

        // Update the player's scale to the new scale
        this.scale = newScale;

        // Recalculate the player's size based on the new scale
        this.size = this.scale.height / this.scaleFactor; 

        // Recalculate the player's velocity steps based on the new scale
        this.xVelocity = this.scale.width / this.stepFactor;
        this.yVelocity = this.scale.height / this.stepFactor;

        // Set the player's width and height to the new size (object is a square)
        this.width = this.size;
        this.height = this.size;
    }

    /**
     * Draws the player on the canvas.
     * 
     * This method renders the player using the sprite sheet if provided, otherwise a red square.
     */
   draw() {
    if (this.spriteSheet) {
        // Each frame size: 24x32 pixels (72/3 columns, 128/4 rows)
        const frameWidth = 24;  // Frame width
        const frameHeight = 32;  // Frame height

        // Get the direction data (e.g., front, left, right, back)
        const directionData = this.spriteData[this.direction];

        // Calculate the X and Y position of the current frame in the sprite sheet
        let frameX = (directionData.start + this.frameIndex) * frameWidth;  // X coordinate of the frame
        let frameY = directionData.row * frameHeight;  // Y coordinate of the frame (which row)

        // Draw the current frame of the sprite sheet on the canvas
        GameEnv.ctx.drawImage(
            this.spriteSheet,
            frameX, frameY, frameWidth, frameHeight, // Source rectangle (the frame to crop from the sprite sheet)
            this.position.x, this.position.y, this.width, this.height // Destination rectangle (where to draw on the canvas)
        );

            // Update the frame index for animation at a slower rate
            this.frameCounter++;
            if (this.frameCounter % this.animationRate === 0) {
                this.frameIndex = (this.frameIndex + 1) % directionData.columns;
            }
        } else {
            // Draw default red square
            GameEnv.ctx.fillStyle = 'red';
            GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    /**
     * Updates the player's position and ensures it stays within the canvas boundaries.
     * 
     * This method updates the player's position based on its velocity and ensures that the player
     * stays within the boundaries of the canvas.
     */
    update() {
        // Update begins by drawing the player object
        this.draw();

        // Update or change position according to velocity events
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the player stays within the canvas boundaries
        // Bottom of the canvas
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        // Top of the canvas
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        // Right of the canvas
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        // Left of the canvas
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }

    /**
     * Binds key event listeners to handle player movement.
     * 
     * This method binds keydown and keyup event listeners to handle player movement.
     * The .bind(this) method ensures that 'this' refers to the player object.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handles key down events to change the player's velocity.
     * 
     * This method updates the player's velocity based on the key pressed.
     * 
     * @param {Object} event - The keydown event object.
     */
    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y -= this.yVelocity;
                this.direction = 'up';
                break;
            case 65: // 'A' key
                this.velocity.x -= this.xVelocity;
                this.direction = 'left';
                break;
            case 83: // 'S' key
                this.velocity.y += this.yVelocity;
                this.direction = 'down';
                break;
            case 68: // 'D' key
                this.velocity.x += this.xVelocity;
                this.direction = 'right';
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                break;
            case 65: // 'A' key
                this.velocity.x = 0;
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                break;
            case 68: // 'D' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Player;
