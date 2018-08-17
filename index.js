const width = 320
const height = 240
let ant
const numberOfMoves = 50

const white = [255, 255, 255, 255]
const black = [0, 0, 0, 255]

function setup() {

  createCanvas(width, height)
  pixelDensity(1)
  frameRate(120)
  scale(2.0)

  background(color(255, 255, 255))

  let centerPixel = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2)
  }

  ant = new Ant(centerPixel.x, centerPixel.y)
}

function draw() {
  loadPixels()

  for (let i = 0; i < numberOfMoves; i++) ant.move()

  updatePixels()
}

class Ant {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.currentColor = get(this.x, this.y)
    this.currentHeading = 0
  }

  move() {
    let nextHeading

    if (isWhite(this.currentColor)) {
      set(this.x, this.y, black)

      this.x += rightHeadings[this.currentHeading].x
      this.y += rightHeadings[this.currentHeading].y

      nextHeading = (this.currentHeading + 1) % rightHeadings.length
    } else {
      set(this.x, this.y, white)


      this.x -= rightHeadings[this.currentHeading].x
      this.y -= rightHeadings[this.currentHeading].y

      nextHeading = (this.currentHeading - 1)
      nextHeading = nextHeading < 0 ? rightHeadings.length - 1 : nextHeading
    }
    this.currentColor = get(this.x, this.y)
    this.currentHeading = nextHeading
  }
}

const isBlack = color => areEqual(color, black)
const isWhite = color => areEqual(color, white)

const areEqual = (t, o) => t.every((e, i) => o[i] == e)

const rightHeadings = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]