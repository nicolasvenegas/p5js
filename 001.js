// precarga de CSV c/tablas de colores. 
// Cada fila son 5 colores H,S,B, H,S,B, H,S,B, H,S,B, H,S,B
function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  // lienzo del tamaño de la ventana
  createCanvas(windowWidth, windowHeight);
  // Modo de color HSB
  colorMode(HSB, 360, 100, 100, 255);
  // punto de anclaje primitiva rect
  rectMode(CENTER);
  // intervalo de reproducción de la funcion dibujar en milisegundos
  noLoop();
  setInterval(dibujar, 100000);

  strokeWeight(0);
}

function draw() {
  dibujar();
}



function dibujar() {
  background(75);

  // selector de semillas
  seed = floor(random(10000));
  randomSeed(seed);
  print(" semilla: " + seed );
  // guarda en la variable paleta una de las fillas del CSV
  paleta = floor(random(21));
  // variable para el marco exterior
  marco = 50;
  // numero de separaciones 
  separaciones = 120;
// la celda mide el alto de la pantalla menos el marco, 
// dividido en el numero de separaciones
  cell = (width - marco) / separaciones;
  // variable para guardar color de la elipse
  colElipse = 0;
  // loop para construir reticula X / Y
  // se repite cell desde el valor del marco, toda la pantalla hasta menos el marco
  for (x = marco; x < width - marco; x += cell) {
    for (y = marco; y < height - marco; y += cell) {
      // variable para guardar el color de la celda
      colBg = floor(random(5));
      // lo defino a traves de la funcion getColor
      getColor(colBg);
      // pinto
      fill(h, s, b, 255);
      // en la posicion X / Y del loop, le doy el tamaño de celda
      rect(x, y, cell);
      // si el color del BG es igual al color de la elipse
      // vuelvo a coger un nro aleatorio entre 0 y 4 (cino colores en cada paleta)
      while (colBg == colElipse) {
        colElipse = floor(random(5));
      }
      // redefino a través de la propiedad de getColor y pinto
      getColor(colElipse);
fill(h, s, b, 255);
      cellSize = random(cell * 0.25, cell * 0.8);
      
      circle(x, y, cellSize);
    }
  }
  
}


function getColor(colBg) {
  h = int(table.get(paleta, colBg * 3));
  s = int(table.get(paleta, colBg * 3 + 1));
  b = int(table.get(paleta, colBg * 3 + 2));
}