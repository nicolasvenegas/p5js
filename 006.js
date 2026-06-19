// carga de data colores
function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  angleMode(DEGREES);
  noLoop();
  setInterval(dibujar, 100000);
  //frameRate(11);
}

function draw() {
  dibujar();
}

function dibujar() {
  // selector de semillas
  seed = floor(random(10000));
  randomSeed(seed);
  noiseSeed(seed);

  // selecciona una paleta, total de filas en colors.csv menos 1
  palette = floor(random(20));
  // borde del lienzo
  frame = 0;
  // defino variables para el numero de filas y columnas 
  numAcrossX = 170;
  numAcrossY = 100;
  // defino variables que definen la division reticular XY
  gridX = (width - frame) / numAcrossX;
  gridY = (height - frame) / numAcrossY;


  // selecciona y define color BG aleatorio, variables para cada variable HSB y aplica sobre BG
  let bgCol = floor(random(5));
  getColor(bgCol);
  let bgH = h;
  let bgS = s;
  let bgB = b;
  //background(bgH, bgS, bgB);
  background(0);



  // creacion array para almacenar colores restantes de la paleta
  let coloresDisponibles = [];
  // recorre los 5 colores de la paleta, si es diferente a bgCol obtiene sus propiedades via getColor, añade el elemento via push al final de la lista, y crea un objeto con tres propiedades: h,s,b
  for (let i = 0; i < 5; i++) {
    if (i !== bgCol) {
      getColor(i);
      coloresDisponibles.push({ h: h, s: s, b: b });
    }
  }

  // construccion de la reticula de elementos
  for (let x = frame; x < width - frame; x += gridX) {
    for (let y = frame; y < height - frame; y += gridY) {

      // variable para guardar un valor aleatorio emtre cero y los colores disponible (ya se excluyo el bgCol de la lista)
      let colorIndex = floor(random(coloresDisponibles.length));
      // vse guardan reordenados
      let colorForma = coloresDisponibles[colorIndex];

      let rez1 = 0.001;  // Valor fijo
      let rez2 = 0.0005;  // Valor fijo


      let n1 = noise(x * rez1, y * rez1) + 0.3;
      let n2 = noise(x * rez2 + 100, y * rez2 + 100);
      let nCombinado = (n1 + n2) / 2;

      nColor = floor(map(nCombinado, 0.47, 0.55, 0, 1));
      nSize = floor(map(n1, 0, 0.19, 0, 1));
      nSizeRect = floor(map(n2, 0, 0.03, 0, 1));
      nsAng = floor(map(n1, 0, 1, 0, 360));

    
      getColor(nColor);


      // Cada módulo tiene su propia rotación y tamaño
      let anguloRotacion = nsAng * 12;
      let tamanioX = random(gridX * nSize * 0.2, gridX * nSize * 0.25);
      let tamanioY = random(gridX * nSize * 0.2, gridX * nSize * 0.25);
      let tamanioRect = random(gridX * nSizeRect * 0.025, gridX * nSizeRect * 0.045);


      push();
      // mover al centro del módulo actual
      translate(x + gridX / 2, y + gridY / 2);
      // rotar individualmente
      rotate(anguloRotacion);
      // propiedades de coloresDisponibles en variable colorForma

      //fill(colorForma.h, colorForma.s, colorForma.b, 255);
      fill(h, s, b, 255);
      //stroke(h,s,b,255);
      // variable para almacenar un numero aleatorio
      selectShape = random(3);
      noStroke();
      let tamañoTri = tamanioY;
      if (selectShape < 1) {
        //rect(0, 0, tamanioX, tamanioY);
        //rect(0, 0, tamanioRect);
        triangle(-tamañoTri / 2, -tamañoTri / 2, -tamañoTri / 2, tamañoTri / 2, tamañoTri / 2, 0);
        strokeWeight(3);
        //point(0, 0);
      } else if (selectShape < 2) {
        //rect(0, 0, tamanioRect);
        triangle(-tamañoTri / 2, -tamañoTri / 2, -tamañoTri / 2, tamañoTri / 2, tamañoTri / 2, 0);
      } else {
        triangle(-tamañoTri / 2, -tamañoTri / 2, -tamañoTri / 2, tamañoTri / 2, tamañoTri / 2, 0);
        //rect(0, 0, tamanioRect);
      }

      pop();
    }
  }
  print("paleta " + palette + " semilla " + seed);
}

function getColor(col1) {
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
}