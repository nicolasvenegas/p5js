function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  frameRate(60);
  noLoop();
  dibujar();
  setInterval(dibujar, 5000);
}

function dibujar() {
  seed = floor(random(10000));
  randomSeed(seed);

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
  background(75);
  for (x = frame; x < width - frame; x += grid) {
    for (y = frame; y < height - frame; y += grid) {
      col = floor(random(5));
      getColor(col);
      fill(h, s, b, 255);
      displace1 = frameCount + random(-50,50);
      displace2 = frameCount + random(-50,50);
      rDisplace = random(0.4, 1.17);
      rect(x, y, grid);
      while (col == newCol) {
        newCol = floor(random(5));
      }
      getColor(newCol);
      fill(h, s, b, 255);
      cellSize = random(grid*0.25,grid*0.8);
      circle(x, y, cellSize);
    }
  }
  print("paleta " + palette + " semilla " + seed + " columna " + col);
}

function getColor(col1) {
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
}