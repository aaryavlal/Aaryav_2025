---
layout: base
title: Student Home 
description: Home Page
image: /images/mario_animation.png
hide: true
---



<!-- Liquid:  statements -->

<!-- Include submenu from _includes to top of pages -->
{% include nav/home.html %}
<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Has is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %}

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<p id="mario" class="sprite"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, 
        define how HTML elements look 
--->
<style>

  /*CSS style rules for the id and class of the sprite...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /*background position of sprite element
  */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>

<!--- Embedded executable code--->
<script>
  ////////// convert YML hash to javascript key:value objects /////////

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0) {
          mario.startWalking();
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startPuffing();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      // move right
      if (currentSpeed === 0) { // if at rest, go to walking
        mario.startWalking();
      } else if (currentSpeed === 3) { // if walking, go to running
        mario.startRunning();
      }
    } else {
      // move left
      mario.startPuffing();
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     mario.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    mario.startResting();
  });

</script>


### Game Progress

> Here is my progress through game coding, click to see these online

<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 30px;">
    <a href="https://aaryavlal.github.io/Aaryav_2025/snake/" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #6A00F4, #A557FF); color: white; padding: 20px 40px; border-radius: 50px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Snake Game
        </div>
    </a>
    <a href="{{}}/rpg/dot0" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #FF004C, #FF7373); color: white; padding: 20px 40px; border-radius: 50px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Zombie v0.0
        </div>
    </a>
    <a href="https://aaryavlal.github.io/Aaryav_2025/rpg/" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #FF8300, #FFB366); color: white; padding: 20px 40px; border-radius: 50px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Zombie v0.1
        </div>
    </a>
    <a href="https://aaryavlal.github.io/Aaryav_2025/rpg0x/" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #00D084, #7EFFC1); color: white; padding: 20px 40px; border-radius: 50px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Zombie v0.2
        </div>
    </a>
</div>

<style>
    a div:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.5);
    }
</style>

<br>

### Juypter Notebooks

> Here is my preparation for sprint 2, click to review all notebooks

<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 30px;">
    <a href="https://github.com/aaryavlal/Aaryav_2025/blob/main/_notebooks/Foundation/fundamentals/variables.ipynb" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #000000, #434343); color: white; padding: 20px 40px; border-radius: 40px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Variables I/O
        </div>
    </a>
    <a href="https://github.com/aaryavlal/Aaryav_2025/blob/main/_notebooks/Foundation/fundamentals/dataOperations.ipynb" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #FF0040, #FF7373); color: white; padding: 20px 40px; border-radius: 40px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Data Types
        </div>
    </a>
    <a href="https://github.com/aaryavlal/Aaryav_2025/issues/8" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #000000, #434343); color: white; padding: 20px 40px; border-radius: 40px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Sprint 2 Hacks
        </div>
    </a>
</div>

<style>
    a div:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.5);
    }
</style>

<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 30px;">
    <a href="https://github.com/aaryavlal/Aaryav_2025/blob/main/_notebooks/Foundation/fundamentals/2024-09-30-for_sprites.ipynb" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #6A00F4, #A557FF); color: white; padding: 20px 40px; border-radius: 50px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            Sprite Hacks 
        </div>
    </a>

</style>

<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 30px;">
    <a href="https://github.com/aaryavlal/Aaryav_2025/blob/main/_notebooks/Foundation/fundamentals/2023-09-21-game_animations-json-object.ipynb" style="text-decoration: none;">
        <div style="background: linear-gradient(135deg, #5A9BD5, #83C6FF); color: white; padding: 20px 40px; border-radius: 50px; font-weight: bold; box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); transition: transform 0.4s, box-shadow 0.4s;">
            JSON object Hacks 
        </div>
    </a>
</div>

