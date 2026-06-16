function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(60);
  noLoop();
  dibujar();
  setInterval(dibujar, 5000);
}

function dibujar() {
  seed = floor(random(10000));
  randomSeed(seed);
  noStroke();
  strokeWeight(1);
  stockColor = 9;
  palette = floor(random(21));
  frame = 100;
  numAcross = 80;
  grid = (width - frame) / numAcross;
  //noStroke();
  count = 0;
  // while (count < 1000) {
  //   getColor(floor(random(5)));
  //   fill(h, s, b, 255);
  //   rect(random(width), random(height), 30);
  //   count++;
  // }
  newCol = 0;
  background(3);
  for (x = frame; x < width - frame; x += grid) {
    for (y = frame; y < height - frame; y += grid) {
      col = floor(random(5));
      getColor(col);
      fill(h, s, b, 255);
      selectShape = random(3);
      if (selectShape < 1) {
        push();
        translate(0,0);
        rotate(random(360));
        rect(x, y, grid * random(0.25, 0.8));
        pop();
      } else if (selectShape < 2.75) {
        ellipse(x, y, grid * 0.25);
      } else {
        triangle(x - grid / 2, y - grid / 2, x - grid / 2, y + grid / 2, x + grid / 2, y);
      }
    }
  }
  print("paleta " + palette + " semilla " + seed + " columna " + col);
}

function getColor(col1) {
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
}