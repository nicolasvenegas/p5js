let meandros = [];
let numMeandros = 3;

// precarga de CSV c/tablas de colores. 
// Cada fila son 5 colores H,S,B, H,S,B, H,S,B, H,S,B, H,S,B
function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  noStroke();
  frameRate(30);

  let din = 0.007;

  // instancias de Meandros: posX, posY, len, ang, paleta, colMeandro, margen
  let m1 = new Meandro(random(width), random(height), width * din, din);
  meandros.push(m1);

    let m2 = new Meandro(random(width), random(height), width * din, din);
  meandros.push(m2);

let m3 = new Meandro(random(width), random(height), width * din, din);
  meandros.push(m3);

  let m4 = new Meandro(random(width), random(height), width * din, din);
  meandros.push(m4);

  let m5 = new Meandro(random(width), random(height), width * din, din);
  meandros.push(m5);



  // Regenerar meandros cada 10 segundos
  //setInterval(regenerarMeandros, 10000);

  noLoop();
  regenerarMeandros();
}

function draw() {
  background(0);

  // Dibujar todos los meandros
  for (let i = 0; i < meandros.length; i++) {
    meandros[i].dibujar();
  }
}

function regenerarMeandros() {
  // Regenerar cada meandro con nueva paleta y color
  for (let i = 0; i < meandros.length; i++) {
    let nuevaPaleta = floor(random(21));
    let nuevoColor = floor(random(5));
    meandros[i].regenerar(nuevaPaleta, nuevoColor);
  }
  redraw(); // Forzar redibujo
}

function getColor(paleta, colMeandro) {
  h = int(table.get(paleta, colMeandro * 3));
  s = int(table.get(paleta, colMeandro * 3 + 1));
  b = int(table.get(paleta, colMeandro * 3 + 2));
}