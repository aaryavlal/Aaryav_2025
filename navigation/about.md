---
layout: post
title: About
permalink: /about/
---

Aaryav Lal

<style>
    /* Style looks pretty compact, trace grid-container and grid-item in the code */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }
</style>

<!-- This grid_container class is for the CSS styling, the id is for JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var living_in_the_world = [
        {"flag": "8/88/Flag_of_India_%282-1%29.svg", "greeting": "Namaste", "description": "India - Ethnicity"},
        {"flag": "0/01/Flag_of_California.svg", "greeting": "Hi", "description": "Born here"},
        {"flag": "a/a4/Flag_of_the_United_States.svg", "greeting": "Hello", "description": "My nationality"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of living_in_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>


### Journey through Life

Here is what I did through my early life 

- Born in Ocean Side, San Diego
- Moved to Irvine at 4
- Went to T.K. and kindergaden in Irvine
- Moved to Bay Area at 7
- Lived in Bay Area from 1'st to 6'th grade
- Moved to San Diego and graduataing from Del Norte 2028
- 


### Culture & Family

- My parents are both North Indian and moved here in the early 2000's
- My grandparents are in India so I go to visit them once a year
- I think India is awesome place to be



  <a href="https://aaryavlal.github.io/Aaryav_2025/games/" 
   style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-align: center; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">
   Go to Games Page
</a>

<script src="https://utteranc.es/client.js"
        repo="aaryavlal/Aaryav_2025"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>



