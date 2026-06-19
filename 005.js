let esferas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(600, 600)
  background(220);
  imageMode(CORNER);
  cnv = createGraphics(width, height);
  cnv.background(120);
  cnv.fill(0);
  cnv.ellipse(width / 2, height / 2, 50);
  //noLoop();
  frameRate(12);
  smooth();
}

function draw() {
  let diam = random(1, 5);
  let esferas = [
    [random(0, width), random(0, height), diam,   diam],
    [random(0, width), random(0, height), diam, diam],
    [random(0, width), random(0, height), diam, diam]
  ]
  //img = cnv.get(width / 2 - 50, height / 2 - 50, 100, 100);
  //image(img, width / 2 - 50, height / 2 - 50);
  //image(cnv,0,0);
  stroke(0);
  strokeWeight(0.5);
  noFill();
  for (i = 0; i < 100; i++) {
    ellipse(esferas[i][0], esferas[i][1], esferas[i][2], esferas[i][3]);
    esferas.push([random(0, width), random(0, height), diam, diam]);
  }
  print(esferas);
}