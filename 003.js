
// carga de data colores
function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  strokeWeight(0.5);
  noLoop();
  //setInterval(dibujar, 5000);
  //frameRate(120);
}

function draw(){
  dibujar();
}

function dibujar() {
  // selector de semillas
  seed = floor(random(10000));
  randomSeed(seed);

  // selecciona una paleta, total de filas en colors.csv menos 1
  palette = floor(random(20));
  // borde del lienzo
  frame = 100;
  // defino variables para el numero de filas y columnas 
  numAcrossX = 80;
  numAcrossY = 45;
  // defino variables que definen la division reticular XY
  gridX = (width - frame) / numAcrossX;
  gridY = (height - frame) / numAcrossY;


  // selecciona y define color BG aleatorio, variables para cada variable HSB y aplica sobre BG
  let bgCol = floor(random(5));
  getColor(bgCol);
  let bgH = h;
  let bgS = s;
  let bgB = b;
  background(bgH, bgS, bgB);

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
      // variable para almacenar el color de la posicion en el array de colorIndex
      let colorForma = coloresDisponibles[colorIndex];


      // Cada módulo tiene su propia rotación
      let anguloRotacion = random(-180, 180);
      let tamanioX = gridX * random(0.25, 0.8);
      let tamanioY = gridY * random(0.25, 0.8);

      push();
      // mover al centro del módulo
      translate(x + gridX / 2, y + gridY / 2);
      // rotar individualmente
      rotate(anguloRotacion);
      // propiedades de colorForma para componer el color
      fill(colorForma.h, colorForma.s, colorForma.b, 255);

      // variable para almacenar un numero aleatorio
      selectShape = random(3);

      if (selectShape < 1) {
        //rect(0, 0, tamanioX, tamanioY);
        stroke(0,50);
        strokeWeight(3);
        point(0,0);
      } else if (selectShape < 2) {
        ellipse(0, 0, tamanioX, tamanioY);
      } else {
        let tamañoTri = tamanioY;
        triangle(-tamañoTri / 2, -tamañoTri / 2, -tamañoTri / 2, tamañoTri / 2, tamañoTri / 2, 0);
      }

      pop();
    }
  }
  print("paleta " + palette + " semilla " + seed );
}

function getColor(col1) {
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
}