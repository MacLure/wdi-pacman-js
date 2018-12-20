// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;
let remainingDots = 240;
let ghostsEaten = 0;
let level = 1;
let fruit = getFruit();
let fruitPresent = false
function fruitAppears() { 
    if (Math.random() > 0.9) {
      fruitPresent = true
    }
  };

function resetLevel() {
  powerPellets = 4;
  remainingDots = 240;
  resetGhosts();
  level ++;
  fruitPresent = false
}

function getFruit(l) {
  if (l >=  13) {
    return ("key");
  } else if (l >= 11) {
    return ("bell");
  } else if (l >= 9) {
    return ("galaxian spaceship");
  } else if (l >= 7) {
    return ("pineapple");
  } else if (l >= 5) {
    return ("apple");
  } else if (l >= 3) {
    return ("orange");
  } else if (l === 2) {
    return ("strawberry");
  } else if (l === 1) {
    return ("cherry");
  }
}

// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

let ghosts = [inky, blinky, pinky, clyde];



// let highScores = "highscores.txt";
// let file = new File([""], highScores);
// let str = "My string of text";

// file.open("w"); // open file with write access
// file.writeln("First line of text");
// file.writeln("Second line of text " + str);
// file.write(str);
// file.close();




// Draw the screen functionality
function drawScreen() {
  if ((remainingDots === 0) && (powerPellets === 0)) {
    resetLevel()
  };
  fruitAppears()
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}     Level: ${level}`);
  console.log(`\Remaining Dots: ${remainingDots}`);
  console.log(`Power Pellets: ${powerPellets}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (remainingDots > 0 ) {console.log('(d) Eat Dot');} else {}
  if (remainingDots >= 10 ) {console.log('(f) Eat 10 Dots');} else {}
  if (remainingDots >= 100 ) {console.log('(g) Eat 100 Dots');} else {}
  if (remainingDots > 0 ) {console.log('(h) Eat All Remaining Dots');} else {}
  console.log(`(1) Eat Inky ${inky.edible ? '(edible)' : '(inedible)'}`);
  console.log(`(2) Eat Blinky ${blinky.edible ? '(edible)' : '(inedible)'}`);
  console.log(`(3) Eat Pinky ${pinky.edible ? '(edible)' : '(inedible)'}`);
  console.log(`(4) Eat Clyde ${clyde.edible ? '(edible)' : '(inedible)'}`);
  console.log('(p) Eat Power Pellet');
  console.log('(q) Quit');
  if (fruitPresent) {console.log(`(z) Eat ${getFruit(level)}`);}
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  remainingDots --;
}

function eatGhost(ghost) {
  if(ghost.edible === false) {
    lives --;
    console.log (`\n${ghost.name} easts Pacman.  The ghost's colour is ${ghost.colour} if you were wondering.`);
  } else {
    console.log (`\nYou ate ${ghost.name}!  Their character was very ${ghost.character}.`);
    ghostsEaten ++;
    if (ghostsEaten === 1) {
      score += 200;
    } else if (ghostsEaten === 2) {
      score += 400;
    } else if (ghostsEaten === 3) {
      score += 800;
    } else if (ghostsEaten > 3) {
      score += 1600;
      ghostsEaten = 0;
    }   
    ghost.edible = false;
  }
  if (lives < 0) {
    console.log("Game Over")
    process.exit();
  }
}

function resetGhosts() {
  for (i in ghosts) {
    ghosts[i].edible = false
  }
  ghostsEaten = 0;
 }

function resetGhostsAnddrawScreen() {
  resetGhosts();
  drawScreen();
}

function eatPowerPellet() {
  score+= 50;
  for (i in ghosts) {
    ghosts[i].edible = true;
  }
  powerPellets --;
  setTimeout(resetGhostsAnddrawScreen,10000);
}

function eatTenDots() {
  console.log('\nChomp!');
  score += 100;
  remainingDots -= 10;
}

function eatOneHundredDots() {
  console.log('\nChomp!');
  score += 1000;
  remainingDots -= 100;

}

function eatAllDots() {
  while (remainingDots > 0) {
    score += 10;
    remainingDots --;
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      if (remainingDots > 0) {
        eatDot();
      } else {
        console.log('\nNo more dots left!');
      }
      break;
    case 'f':
      if (remainingDots >= 10) {
        eatTenDots();
      } else {
        console.log('\nFewer than 10 dots left!');
      }
      break;
    case 'g':
      if (remainingDots >= 100) {
        eatOneHundredDots();
      } else {
        console.log('\nFewer than 100 dots left!');
      }
      break;
    case 'h':
      if (remainingDots > 0) {
        eatAllDots();
      } else {
        console.log('\nNo more dots left!');
      }
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;        
      case 'p':
        if ((powerPellets > 0) && (ghostsEaten === 0)) {
          eatPowerPellet();
        } else if (powerPellets <= 0) {
          console.log('\nNo Power Pellets left!');
        } else if (ghostsEaten !== 0) {
          console.log('\nYou must eat all of the ghosts before eating a nother power pellet!');

        }
      break; 
      case 'z':
      if (level >=13 ) {
      score += 5000;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level >=11 ) {
        score += 3000;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level >=9 ) {
        score += 2000;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level >=7 ) {
        score += 1000;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level >=5 ) {
        score += 700;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level >=3 ) {
        score += 500;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level === 2) {
        score += 300;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      } else if (level === 1) {
        score += 100;
        console.log(`\nYou ate the ${getFruit(level)}!`);
      }
    break; 
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
