let slideX = 0;
let rotateAngle = 0;

// carga de data colores
function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  angleMode(DEGREES);
  smooth();
  noLoop();
  setInterval(matrizBase, 3000);
  slider = createSlider(0, 100, 50);
}

function draw() {
  matrizBase();
}

class Matriz {
  constructor(numAcrossX, numAcrossY, frame, offsetX, offsetY, rez1, rez2, seed) {
    this.numAcrossX = numAcrossX;
    this.numAcrossY = numAcrossY;
    this.frame = frame;
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 0;
    this.rez1 = rez1 || 0.001;
    this.rez2 = rez2 || 0.004;
    this.gridX = (width - frame) / numAcrossX;
    this.gridY = (height - frame) / numAcrossY;
    this.seed = seed || floor(random(1000000));
    this.palette = floor(random(20));
    this.coloresDisponibles = [];
    this.puntos = [];
  }

  setColores() {
    randomSeed(this.seed);
    noiseSeed(this.seed);

    let bgCol = floor(random(5));
    getColor(this.palette, bgCol);
    
    for (let i = 0; i < 5; i++) {
      if (i !== bgCol) {
        getColor(this.palette, i);
        this.coloresDisponibles.push({ h: h, s: s, b: b });
      }
    }
  }

  generarPuntos() {
    for (let x = this.frame; x < width - this.frame; x += this.gridX) {
      for (let y = this.frame; y < height - this.frame; y += this.gridY) {
        this.puntos.push({
          x: x + this.gridX / 2 + this.offsetX,
          y: y + this.gridY / 2 + this.offsetY,
          colorIndex: floor(random(this.coloresDisponibles.length)),
          n1: noise(x * this.rez1, y * this.rez1) + 0.3,
          n2: noise(x * this.rez2 + 100, y * this.rez2 + 100),
          selectShape: random(3)
        });
      }
    }
  }

  dibujar() {
    for (let p of this.puntos) {
      let nCombinado = (p.n1 + p.n2) / 2;
      let nColor = floor(map(nCombinado, 0.33, 0.52, 0, 1));
      let nSizeEllipse = floor(map(p.n2, 0.005, 0.21, 0, 1));
      let nsAng = floor(map(p.n1, 0, 1, 0, 360));

      getColor(this.palette, nColor);

      let anguloRotacion = nsAng * 12;
      let tamanioEllipse = random(this.gridX * nSizeEllipse * 0.23, this.gridX * nSizeEllipse * 0.23);

      push();
      translate(p.x, p.y);
      rotate(anguloRotacion);
      fill(h, s, b, 155);
     //blendMode(MULTIPLY);
      noStroke();
      rect(0, 0, tamanioEllipse);
      pop();
    }
  }

  run() {
    this.setColores();
    this.generarPuntos();
    this.dibujar();
    print("paleta " + this.palette + " semilla " + this.seed);
  }
}

function matrizBase() {
  background(0);

  let numMatrices = 2;
  let separacionX = random(-width/20,height/20);
  let separacionY = random(-height/20,height/20);
  
  for (let i = 0; i < numMatrices; i++) {
    for (let j = 0; j < numMatrices; j++) {
    let offsetX = i * random(-separacionX,separacionX);
    let offsetY = i * random(-separacionY,separacionY);
    
    let seed = floor(random(1000000));

    
    let matriz = new Matriz(127, 195, 0, offsetX+i, offsetY+j, 0.47, 0.83, seed);
    matriz.run();
    }
  }
}

function getColor(palette, col1) {
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
}