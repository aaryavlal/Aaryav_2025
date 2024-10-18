// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
import NPC from './NPC.js';
//import Goomba from './EnemyGoomba.js';
//import Coin from './Coin.js';


class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_grass = path + "/images/rpg/grass.png";
    const image_data_grass = {
        name: 'grass',
        src: image_src_grass,
        pixels: {height: 512, width: 386}
    };

    // Player 1 sprite data (turtle)
    const MAIN_SCALE_FACTOR = 10;
    const sprite_src_main = path + "/images/rpg/main.png";
    const sprite_data_main = {
        name: 'main',
        src: sprite_src_main,
        SCALE_FACTOR: MAIN_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/MAIN_SCALE_FACTOR) }, 
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/fishies.png";
    const sprite_data_fish = {
        name: 'fish',
        src: sprite_src_fish,
        SCALE_FACTOR: 16,
        STEP_FACTOR: 400,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 1, start: 0, columns: 3 },  // 2nd row
        right: {row: 2, start: 0, columns: 3 }, // 3rd row
        up: {row: 3, start: 0, columns: 3 },    // 4th row
    };

    // NPC sprite data (frog)
    const sprite_src_knight = path + "/images/rpg/npc.png";
    const sprite_data_knight = {
        name: 'knight',
        src: sprite_src_knight,
        SCALE_FACTOR: 9,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 75, width: 129},
        INIT_POSITION: { x: (width / 2), y: (height / 2)}, 
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_grass },
      { class: PlayerOne, data: sprite_data_main },
      { class: PlayerTwo, data: sprite_data_fish },
      { class: NPC, data: sprite_data_knight }
    ];
  }

}

export default GameLevelWater;
