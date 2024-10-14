import Player from "./Player.js";
import GameEnv from "./GameEnv.js";

class NPC extends Player {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;
        this.spriteData = {
            name: "NPC", // Default name
            imagePath: "images/rpg/npc.png", // Path to the NPC image
        };
        this.loadSprite(); // Load the sprite on initialization
    }

    loadSprite() {
        // Assuming the Player class handles sprite loading
        this.sprite = new Image();
        this.sprite.src = this.spriteData.imagePath;
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     */
    update() {
        this.draw();
    }

    /**
     * Handles keydown events for proximity interaction.
     * 
     * @param {Object} event - The event object containing the key that was pressed.
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e':  // Player 1
            case 'u':  // Player 2
                this.checkProximityToNPC();
                break;
        }
    }

    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
                closeCustomAlert();
            }
        }
    }

    handleResponse(message) {
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }
        this.alertTimeout = setTimeout(() => {
            showCustomAlert(message);
        }, 0);
    }

    checkProximityToNPC() {
        const players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        const names = [];

        players.forEach(player => {
            const distance = Math.sqrt(
                Math.pow(player.position.x - this.position.x, 2) + 
                Math.pow(player.position.y - this.position.y, 2)
            );
            if (player !== this && distance <= 100) {
                names.push(player.spriteData.name);
            }
        });

        if (names.length > 0) {
            this.handleResponse(`Hello, ${names.join(', ')}`);
        }
    }
}

export default NPC;

function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'none';
}
