let categories = [];
let bubbles = [];
let currentLevel;
let activeBubbleIndex;
let font;
let breadCrumbs;
let settings;

// we need to preload font and the TXT file containing the mental map
// make sure the structure of the TXT file is correct (check example.txt)
function preload() {
  font = loadFont('./assets/Arvo/Arvo-Regular.ttf');
  categories = loadStrings('./assets/futsal.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  // set the color mode of the program to be HSB
  // ranges -> H(0-360) S(0-100) B(0-100) alpha(0-100)
  colorMode(HSB, 360, 100, 100, 100);

  // sets the font that will be used
  textFont(font);
  
  // initialise settings file
  settings = new Settings();

  // remove all the white spaces from the TXT loaded file
  removeWhiteSpaces();

  // initialise
  init();
}

function draw() {
  background(settings.backgroundColor);
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }
  
  breadCrumbs.display();
}

// ---------------------------------------------------------- REMOVE WHITE SPACES
function removeWhiteSpaces() {
  for (let i = 0; i < categories.length; i++) categories[i] = categories[i].trim();
}

// ---------------------------------------------------------- INIT
function init() {
  bubbles = new Array(categories.length);
  initialiseBubblesArray();

  currentLevel = "0";
  activeBubbleIndex = 0;

  breadCrumbs = new BreadCrumbs();
  breadCrumbs.addToPath(bubbles[activeBubbleIndex].text);

  positionBubbles();
}

// ---------------------------------------------------------- INITIALISE BUBBLES ARRAY
function initialiseBubblesArray() {
  let x = 0;
  let y = 0;
  let levelAndText;
  for (let i = 0; i < bubbles.length; i++) {
    levelAndText = categories[i].split("-");
    bubbles[i] = new Bubble(levelAndText[1], levelAndText[0], x, y);
  }

  // mark the ones that have childs
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].hasChilds = countChilds(bubbles[i].level);
  }
}

// ---------------------------------------------------------- COUNT CHILDS
function countChilds(level) {
  let count = 0;

  // get the number of category levels from the max length of the level property of the object
  let maxLength = bubbles[0].level.length; // set an initial value
  // iterate and look for something bigger
  for (let i = 1; i < bubbles.length; i++) {
    if (bubbles[i].level.length > maxLength) maxLength = bubbles[i].level.length;
  }

  for (let i = 0; i < bubbles.length; i++) {
    for (let k = 1; k < maxLength; k++) {
      if (level.length == k) {
        if (bubbles[i].level.length == k + 1 && bubbles[i].level.substring(0, k) == level) ++count;
      }
    }
  }

  // return the number of childs the bubble has
  return count;
}

// ---------------------------------------------------------- POSITION BUBBLES
function positionBubbles() {
  // set new active on the center
  bubbles[activeBubbleIndex].setXY(windowWidth / 2, windowHeight / 2);
  // make it visible
  bubbles[activeBubbleIndex].visible = true;

  // check how many childs there is
  let numberOfChilds = countChilds(currentLevel);

  if (numberOfChilds > 0) {
    // iterate and position around
    let x = 0;
    let y = 0;
    let distance = 0;
    let ang = 0;

    let stepAng = TWO_PI / float(numberOfChilds);

    for (let i = 0; i < bubbles.length; i++) {
      if (bubbles[i].level.length == currentLevel.length + 1) {
        // calculate distance
        distance = bubbles[activeBubbleIndex].bgSize / 2 + bubbles[i].bgSize / 2;
        x = (windowWidth / 2) + distance * cos(ang);
        y = (windowHeight / 2) + distance * sin(ang);
        bubbles[i].setXY(x, y);

        bubbles[i].visible = true;

        ang += stepAng;
      } else {
        if (i != activeBubbleIndex) {
          bubbles[i].visible = false;
        }
      }
    }
  }
}

// ---------------------------------------------------------- MOUSE RELEASED
function mouseReleased() {
  
  // BREADCRUMBS
  let index = breadCrumbs.checkClick();
  if (index != -1) {
    console.log("breadCrumbs path item " + index + " " + breadCrumbs.path[index].text + " clicked" + "\n");
    breadCrumbs.updatePath(index);

    // set new currentLevel and activeBubbleIndex
    for (let i = 0; i < bubbles.length; i++) {
      if (breadCrumbs.path[index].text.includes(bubbles[i].text)) {
        currentLevel = bubbles[i].level;
        activeBubbleIndex = i;
      }
    }
  }

  // BUBBLES
  // check if the click was on a bubble
  // make that bubble active and update current level (if there are childs)
  // re-position bubbles
  let numberOfChilds;
  for (let i = 0; i < bubbles.length; i++) {
    if (dist(mouseX, mouseY, bubbles[i].posX, bubbles[i].posY) < bubbles[i].bgSize / 2
      && bubbles[i].visible
      && bubbles[i].posX != windowWidth / 2) {
      // check if there are childs, if yes make it active
      numberOfChilds = countChilds(bubbles[i].level);
      if (numberOfChilds > 0) {
        currentLevel = bubbles[i].level;
        activeBubbleIndex = i;
        breadCrumbs.addToPath(bubbles[activeBubbleIndex].text);
      }
    }
  }
  
  positionBubbles();
}

// ---------------------------------------------------------- RESIZE
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // re-position the bubbles
  positionBubbles();
  // re-position breadcrumbs
  breadCrumbs.updatePosition();
}
