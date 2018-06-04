# Game Project

## How to download
1. Go to my [Github](https://github.com/SJKenyon/sparta-global-game-project) and copy the repository.
2. Open your computers terminal and navigate to the directory you would like the game file in.
3. Write this when you are in the correct directory and press enter.
```
  git clone *paste my repo link here*
```
4. The file should be locally downloaded on to your computer system. Either open the game using the terminal by writing
```
  open index.html
```
or use your file system to open the game directly.

---

## Instructions
To start the game press any key, the pink block will start to move and the game has begun. Using the directional arrow keys you must move the pink block to collide with the red fruit block. This will increase the score and the length of the snake making it harder as the game progresses. There is also a red poison block in the game which will decrease your lives if you collide with it. Going into a wall or the snake itself will end the game and a modal will appear with the option to try again. This reloads the current screen so you can start from the beginning. The aim of the game is to become as long as possible before dying.

---

## Making the game
The game is made purely using javascript instead of adding jquery. I chose to add all of my elements in the .js file instead of initialising them in the .html because I was using a table with a lot of rows and columns so it is more efficient in the time I had to product the MVP.

Manipulation of the DOM was a major part of my project since the objects are defined by class (e.g.snake, fruit, wall, blank).I created the classes for each part of the game first since they all have to be on the screen to start the game. Small styling details were added after the functional part of the project was completed.

Since I targeted making a game that already existed, I tried to keep most of the elements similar to the original. Using a game loop and a short interval made the gameplay is lightly less smooth than it could have been, giving it a sort of jumping motion, however this was a large feature in the old game so decided to keep it in my project.

```javascript
      function run(){
        init();
        int = setInterval(gameLoop, interval);
        //Runs game loop and updates every interval
      }
```

Also, adding length to the snake was initially an add-on feature however that would remove the element of going into yourself and so moved that requirement into this sprint.

Using the arrow keys instead of 'WASD' was difficult since they do not come in the ASCII code already so I had to research which key code and event listener I needed to use for them to register. Adding comments to my javascript code helped massively when I was sorting out my direction.

```javascript
      window.addEventListener("keypress", function key(event){
        var key = event.keyCode;
        if(key == 38 && direction != -1){ //up
          direction = 0;
        }else if(key == 40 && direction != 0){ //down
          direction = -1;
        }else if(key == 37 && direction != 2){ //left
          direction = 1;
        }else if(key == 39 && direction != 1){ //right
          direction = 2;
        }else if(!running){
          running = true;
        }
      });
```

Going forward, id like to add different levels of difficulty such as different sized grids or an even shorter interval making it harder to react quick enough. One option could be to use prompts to ask the user what size they would like the grid however there would need to be restrictions otherwise it could be infinite. The second option would be to use preset level difficulties using buttons.
