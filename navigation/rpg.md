---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';


    // Background data
    const image_src = "{{site.baseurl}}/images/rpg/grass.png";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Sprite data
    const sprite_src = "{{site.baseurl}}/images/rpg/main.png";
    const sprite_data = {
        SCALE_FACTOR: 10, 
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        up: { start: 0, row: 0, columns: 3 },     // Row 3, 3 frames for "up" animation
        down: { start: 0, row: 2, columns: 3 },  // Row 0, 3 frames for "down" animation
        left: { start: 0, row: 3, columns: 3 },  // Row 1, 3 frames for "left" animation
        right: { start: 0, row: 1, columns: 3 } // Row 2, 3 frames for "right" animation

    };  // ALL OF THIS CODE IS COMPLEX JSON OBJECTS AS IT HAS DIRECTION SPECIFIC ANIMATIONS

     // NPC sprite data (frog)
    const sprite_src_npc = path + "/images/rpg/npc.png";
    const sprite_data_npc = {
        name: 'npc',
        src: sprite_src_npc,
        SCALE_FACTOR: 16,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 75, width: 129},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: { rows: 1, columns: 1 },
        down: { row: 0, start: 0, columns: 1 },
    };
    const sprite = {src: sprite_src, data: sprite_data}; //JSON object

    // Assets for game
    //const assets = {}
    //const assets = {image: image}
    //const assets = {sprite: sprite}
    const assets = {image: image, sprite: sprite} //JSOn object

    // Start game engine
    GameControl.start(assets);
