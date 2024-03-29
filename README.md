# Tic Tac Toe

## Live Preview

[Tic Tac Toe](https://dak79.github.io/odin-tic-tac-toe/)

## Description

This project is part of The [Odin Project - Full Stack JavaScript Path](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).
The main goals of this web app is to organize code with factory function and modules (IIFE). So the main attention is about code design. As side goals:
_ develop an easy and minimal UI;
_ implement an AI with minimax algorithm.

## Technologies

- HTML
- CSS
- JavaScript
- Git

## Assignment

- Set up your project with HTML, CSS and JavaScript files and get the Git repo all set up.

- You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

- Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

- Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage.

- Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

- Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places.

- Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

- Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

- Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
  - Start by just getting the computer to make a random legal move.
  - Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm.
  - If you get this running definitely come show it off in the chat-room. It’s quite an accomplishment!
