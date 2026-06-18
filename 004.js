// Piedras lisas para taguitas - Con vértices suavizados

let intervalo;
let table;

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(125);
  colorMode(HSB, 360, 100, 100, 255);
  
  dibujo();
  intervalo = setInterval(dibujo, 30000);
}

// Piedras súper suaves - 8 vértices por lado

function dibujo() {
  palette = floor(random(21));
  
  blendMode(BLEND);
  background(0);
  //blendMode(MULTIPLY);
  
  let margen = 100;
  let areaWidth = width - margen;
  let areaHeight = height - margen;
  
  let filas = 10;
  let columnas = 12;
  
  let espaciadoY = areaHeight / filas;
  let espaciadoX = areaWidth / columnas;
  
  strokeWeight(0.1);
  
  push();
  translate(width/2, height/2);
  
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let yOffset = (i - filas/2) * espaciadoY + espaciadoY/2;
      let xOffset = (j - columnas/2) * espaciadoX + espaciadoX/2;
      
      let ancho = espaciadoX * random(0.2, 0.5);
      let alto = espaciadoY * random(0.2, 0.5);
      
      let x1 = -ancho * random(0.9, 1);
      let y1 = random(-alto , alto )* random(0.9, 1);
      let x4 = ancho * random(0.5, 1.0);
      let y4 = random(-alto, alto)* random(0.9, 1);
      
      // 8 VÉRTICES SUPERIORES (distribución uniforme)
      let puntosSuperior = [];
      let puntosInferior = [];
      
      // Generar 8 puntos en forma de curva suave
      for (let k = 0; k < 20; k++) {
        let t = (k + 0.5) / 100; // 0 a 1
        let x = (t - 0.5) * 2 * ancho;
        let y = Math.sin(t * PI) * alto;
        
        // Añadir pequeña variación para naturalidad
        let variacionX = random(0.75, 0.9);
        let variacionY = random(0.75, 0.9);
        
        puntosSuperior.push({
          x: x * variacionX,
          y: y * variacionY
        });
        
        puntosInferior.push({
          x: x * variacionX,
          y: y * variacionY
        });
      }
      
      col = floor(random(5));
      getColor(col);
      fill(h, s, b);
      //stroke(h, s, b);
      push();
      translate(xOffset, yOffset);
      
      // LÍNEA SUPERIOR con 8 puntos
      beginShape();
      vertex(x1, y1);
      for (let p of puntosSuperior) {
        vertex(p.x, -p.y);
      }
      vertex(x4, y4);
      endShape();

      col1 = floor(random(5));
      getColor(col1);
      
      // LÍNEA INFERIOR con 8 puntos
      beginShape();
      vertex(x1, y1);
      for (let p of puntosInferior) {
        vertex(p.x, p.y);
      }
      vertex(x4, y4);
      endShape();

      line()
      
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