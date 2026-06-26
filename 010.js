let table;
let OBJall = [];
let intensidades = [];
let datosEBird = [];
let datosCargados = false;

let COLS = 8;
let ROWS = 4;
let OBJ = 100;

let myFont;



function preload() {
  table = loadTable("colors.csv", "csv", "header");
  // No cargamos eBird aquí, lo hacemos en setup con callback
  
myFont = loadFont('fonts/ReemKufi-Bold.ttf');
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, SVG);
  canvas.parent('contenedor');
  colorMode(HSB, 360, 100, 100, 255);
  textFont(myFont);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);
  noFill();
  smooth(1);
  detectarOrientacion();
  inicializarIntensidades();

  loadJSON("ebird_sim.json", 
    function(data) {
      datosEBird = data;
      console.log("Datos cargados:", datosEBird);
      if (Array.isArray(datosEBird) && datosEBird.length > 0) {
        procesarObservaciones();
        aplicarConvolucion(2); 
      } else {
        console.warn("Datos vacíos. Usando intensidades aleatorias.");
        for (let x = 0; x < COLS; x++) {
          for (let y = 0; y < ROWS; y++) {
            intensidades[x][y] = random(1);
          }
        }
      }
      datosCargados = true;
      redraw();
    },
    function(error) {
      console.error("Error cargando JSON:", error);
      for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
          intensidades[x][y] = random(1);
        }
      }
      datosCargados = true;
      redraw();
    }
  );
}

function draw() {
  if (!datosCargados) return;
  background(0, 0, 0, 255);
  reticulado();
  
}

function detectarOrientacion() {
  if (width >= height) {
    COLS = 8;
    ROWS = 4;
  } else {
    COLS = 4;
    ROWS = 8;
  }
}

function inicializarIntensidades() {
  intensidades = [];
  for (let x = 0; x < COLS; x++) {
    intensidades[x] = [];
    for (let y = 0; y < ROWS; y++) {
      intensidades[x][y] = 0;
    }
  }
}

function procesarObservaciones() {
  if (!Array.isArray(datosEBird) || datosEBird.length === 0) {
    console.warn("datosEBird no es un array o está vacío");
    return;
  }
  for (let obs of datosEBird) {
    let col = floor(map(obs.lng, -75, -65, 0, COLS));
    let row = floor(map(obs.lat, -55, -18, 0, ROWS));
    col = constrain(col, 0, COLS - 1);
    row = constrain(row, 0, ROWS - 1);
    intensidades[col][row] += obs.howMany || 1;
  }
  let max = 0;
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (intensidades[x][y] > max) max = intensidades[x][y];
    }
  }
  if (max > 0) {
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        intensidades[x][y] /= max;
      }
    }
  }
}

function aplicarConvolucion(veces) {
  // Repetimos el proceso 'veces' para que la onda se expanda más
  for (let iter = 0; iter < veces; iter++) {
    // 1. Crear una copia de la matriz actual
    let copia = [];
    for (let x = 0; x < COLS; x++) {
      copia[x] = [];
      for (let y = 0; y < ROWS; y++) {
        copia[x][y] = intensidades[x][y];
      }
    }

    // 2. Definir el kernel (ej. suavizado simple 3x3)
    // Dividimos por 9 para que el total sume 1
    let kernel = [
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9],
      [1/9, 1/9, 1/9]
    ];

    // 3. Recorrer TODAS las celdas
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        let suma = 0;
        // 4. Recorrer el kernel (3x3)
        for (let kx = -1; kx <= 1; kx++) {
          for (let ky = -1; ky <= 1; ky++) {
            // Calcular coordenada vecina
            let vecinoX = x + kx;
            let vecinoY = y + ky;
            
            // Verificar que no nos salgamos de la matriz (bordes)
            if (vecinoX >= 0 && vecinoX < COLS && vecinoY >= 0 && vecinoY < ROWS) {
              // Multiplicar valor del vecino por el peso del kernel
              // Nota: kernel[kx+1][ky+1] corrige el índice (-1 a 1 a 0 a 2)
              suma += copia[vecinoX][vecinoY] * kernel[kx+1][ky+1];
            } else {
              // Si está fuera, ignorar o asumir 0 (para bordes)
              // También podríamos reflejar el valor, pero para simplificar, sumamos 0
              suma += 0;
            }
          }
        }
        // 5. Asignar el nuevo valor a la matriz original (intensidades)
        intensidades[x][y] = suma;
      }
    }
  }
}

function reticulado() {
  detectarOrientacion();
  OBJ = Math.min(width / COLS, height / ROWS);
  const MODULO = OBJ;
  const totalWidth = COLS * MODULO;
  const totalHeight = ROWS * MODULO;
  const offsetX = (width - totalWidth) / 2;
  const offsetY = (height - totalHeight) / 2;

  OBJall = [];
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const posX = offsetX + x * MODULO + OBJ / 2;
      const posY = offsetY + y * MODULO + OBJ / 2;
      let intensidad = 0;
      if (intensidades[x] && intensidades[x][y] !== undefined) {
        intensidad = intensidades[x][y];
      }
      OBJall.push(new MiObj(posX, posY, intensidad));
    }
  }

  OBJall.forEach(obj => {
    obj.render();
  });
}



function keyPressed() {
  if (key == 's') {
    if (typeof contadorSvg === 'undefined') contadorSvg = 0;
    contadorSvg++;
    let nombreSvg = 'exportaciones/' + 'out' + nf(contadorSvg, 3) + '.svg';
    save(nombreSvg);
  }
  if (key == 'r') {
    detectarOrientacion();
    redraw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  detectarOrientacion();
  redraw();
}