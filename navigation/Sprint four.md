---
layout: post
title: Sprint 4 review
permalink: /sprintFour/

# **Game Level/Name**  
**Level 9 (Skibidi)**  

---

## **What I Tried to Change**  
- Altered block placement to make the player mobile throughout the entirety of the level.

---

## **Code I Changed**  
```javascript
// Example block position adjustment
block.x = currentX + (xPercentage * screenWidth);
block.y = currentY + (yPercentage * screenHeight);
```
---
**The actual image**
![Image of code](https://github.com/user-attachments/assets/54b7ecd8-77f1-4626-819e-d5dbc085f994)

---

# **Code Explanation and Challenges**  

---

## **Explanation of Code**  
The block platform position is altered using the `x percentage` and `y percentage`.  

- **x percentage**: Determines how far an object moves horizontally relative to its current position or the screen width.  
- **y percentage**: Determines how far an object moves vertically relative to its current position or the screen height.  

---

## **Challenges**  
1. One of the challenges I faced while altering the block positions was adjusting the blocks.  
   - It took multiple attempts to position the blocks correctly so that the player could utilize them effectively.  

2. While exploring the code to make these changes, I analyzed the `gameSetter.js` file to understand how the code was structured.  
   - This helped me learn the flow of the file and identify where specific changes were required.  

---

## **Before**  
![Before Image](https://github.com/user-attachments/assets/9e8b76bd-c3db-4b57-b510-46cc4fc59f86)  

---

## **After**  
![After Image](https://github.com/user-attachments/assets/ca174d8a-35ba-4f7c-a672-30b1585d0cf9)  
