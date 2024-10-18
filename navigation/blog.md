---
layout: blogs 
title: Blogs
search_exclude: true
permalink: /blogs/
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Description</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        h1, h2, h3 {
            text-align: center;
            color: #2c3e50;
        }
        h1 {
            margin-bottom: 30px;
        }
        .section {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
            padding: 20px;
        }
        .section h2 {
            margin-bottom: 20px;
            color: #16a085;
        }
        ul {
            list-style: none;
            padding-left: 0;
        }
        ul li {
            margin-bottom: 10px;
        }
        ul li::before {
            content: "•";
            color: #e74c3c;
            font-weight: bold;
            display: inline-block;
            width: 1em;
        }
        .highlight {
            background-color: #f1c40f;
            padding: 3px 6px;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h1>Game Overview</h1>

    <div class="section">
        <h2>Main Character Mechanics</h2>
        <ul>
            <li>The sprite holds a sword or weapon.</li>
            <li>The main sprite shoots a beam at a certain <span class="highlight">x or y velocity</span> depending on which way it is facing.</li>
            <li>The beam disappears when it hits an enemy.</li>
            <li>When an enemy is hit:
                <ul>
                    <li>The enemy respawns at a random (x, y) coordinate.</li>
                    <li>The number of enemies is increased by <span class="highlight">two</span>.</li>
                </ul>
            </li>
            <li>Each time the sprite's attack contacts an enemy's hitbox, an <span class="highlight">elimination counter</span> at the top-right adds one.</li>
            <li>If the sprite touches an enemy, it loses one of <span class="highlight">three lives</span>.</li>
            <li>The character dies when all lives are lost, and a <span class="highlight">Game Over</span> screen appears with the elimination count.</li>
            <li>There is a <span class="highlight">3-second cooldown</span> between beam shots.</li>
            <li>Movement is controlled using <span class="highlight">W, A, S, D</span> keys, similar to a snake game.</li>
            <li>The beam is shot using the <span class="highlight">spacebar</span>.</li>
            <li>The sprite moves at a velocity of <span class="highlight">4</span>.</li>
            <li>The beam moves at a velocity of <span class="highlight">6</span>.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Obstacle (Enemies)</h2>
        <ul>
            <li>Each time an enemy respawns, it gets a random <span class="highlight">x and y velocity</span>.</li>
            <li>Enemies can be super fast or super slow, depending on the velocity.</li>
            <li>If an enemy hits the edge of the screen, it bounces off and continues moving.</li>
            <li>If an enemy dies:
                <ul>
                    <li>It respawns at a random position.</li>
                    <li>Two more enemies are spawned at random positions.</li>
                </ul>
            </li>
            <li>The game starts with <span class="highlight">10 enemies</span>.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Game UI</h2>
        <ul>
            <li>The game uses a <span class="highlight">bird's-eye view</span> perspective.</li>
            <li>The background resembles grass from above.</li>
        </ul>
    </div>

</body>
</html>
