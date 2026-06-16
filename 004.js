// Dos vertexes reflejados aleatorios en cuadrícula centrada - Orientación vertical (gema)

let intervalo;

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB, 360, 100, 100, 255);
  
  dibujo();
  intervalo = setInterval(dibujo, 2000);
}

function dibujo() {
  background(360,0,50);
  palette = floor(random(21));
  
  let filas = 12;
  let columnas = 20;
  let espaciadoY = height / filas;
  let espaciadoX = width / columnas;
  
  
  strokeWeight(0.5);
  
  push();
  translate(width/2, height/2);
  
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let yOffset = (i - filas/2) * espaciadoY + espaciadoY/2;
      let xOffset = (j - columnas/2) * espaciadoX + espaciadoX/2;
      
      // Coordenadas RELATIVAS al tamaño de la celda
      let x1 = -espaciadoX * 0.45;  // Izquierda de la celda
      let y1 = 0;
      let x4 = espaciadoX * 0.45;   // Derecha de la celda
      let y4 = 0;
      
      // Puntos aleatorios dentro de la celda
      let x2 = random(-espaciadoX * 0.3, -espaciadoX * 0.05);
      let y2 = random(espaciadoY * 0.1, espaciadoY * 0.45);
      let x3 = random(espaciadoX * 0.1, espaciadoX * 0.3);
      let y3 = random(espaciadoY * 0.05, espaciadoY * 0.45);
      
      noStroke();
      col = floor(random(5));
      getColor(col);
      fill(h, s, b, 255);
      
      push();
      translate(xOffset, yOffset);
      
      // Línea superior
      beginShape();
      vertex(x1, y1);
      vertex(x2, y2);
      vertex(x3, y3);
      vertex(x4, y4);
      endShape();
      
      // Línea inferior (reflejada en Y)
      beginShape();
      vertex(x1, y1);
      vertex(x2, -y2);
      vertex(x3, -y3);
      vertex(x4, y4);
      endShape();
      
      pop();
    }
  }
  
  pop();
}


function getColor(col1) {
  h = int(table.get(palette, col1 * 3));
  s = int(table.get(palette, col1 * 3 + 1));
  b = int(table.get(palette, col1 * 3 + 2));
}