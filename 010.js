const EBIRD_API_KEY = '94e45nc6e5g6'; // Reemplazar con la clave obtenida
const EBIRD_URL = 'https://api.ebird.org/v2/data/obs/CL/recent';
const EBIRD_PARAMS = '?back=10&max=300'; // Últimos 30 días, máximo 300 observaciones

let table;
let OBJall = [];
let intensidades = [];
let datosEBird = [];
let datosCargados = true;

let COLS = 8;
let ROWS = 4;
let OBJ = 100;

let myFont;
let contadorSvg = 0;



function preload() {
    table = loadTable("colors.csv", "csv", "header");
    myFont = loadFont('fonts/ReemKufi-Bold.ttf');
}

function setup() {
    print("Bienvenido :)  Presiona 'r' para recargar datos de eBird y 's' para guardar un SVG.");
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
    cargarDatos(); // Ahora la carga está en una función
    
}

function draw() {
    
    if (!datosCargados) return;
    background(0, 0, 0, 255);
    reticulado();

}

function detectarOrientacion() {
    if (width >= height) {
        COLS = 6;
        ROWS = 3;
    } else {
        COLS = 3;
        ROWS = 5;
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

function cargarDatos() {
    console.log("Consultando API eBird para matriz de convolución... Esto puede tardar unos segundos.");
    const url = EBIRD_URL + EBIRD_PARAMS;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-eBirdApiToken': EBIRD_API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        datosEBird = data;
        console.log("Datos de eBird cargados:", datosEBird);
        inicializarIntensidades();
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
        txtH1.reiniciarPalabras();
        datosCargados = true;
        redraw();
    })
    .catch(error => {
        console.error("Error cargando eBird:", error);
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                intensidades[x][y] = random(1);
            }
        }
        datosCargados = true;
        redraw();
    });
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
    for (let iter = 0; iter < veces; iter++) {
        let copia = [];
        for (let x = 0; x < COLS; x++) {
            copia[x] = [];
            for (let y = 0; y < ROWS; y++) {
                copia[x][y] = intensidades[x][y];
            }
        }
        let kernel = [
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9]
        ];
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                let suma = 0;
                for (let kx = -1; kx <= 1; kx++) {
                    for (let ky = -1; ky <= 1; ky++) {
                        let vecinoX = x + kx;
                        let vecinoY = y + ky;
                        if (vecinoX >= 0 && vecinoX < COLS && vecinoY >= 0 && vecinoY < ROWS) {
                            suma += copia[vecinoX][vecinoY] * kernel[kx + 1][ky + 1];
                        }
                    }
                }
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

    OBJall.forEach(obj => obj.render());

  
}

function keyPressed() {
    if (key == 's') {
        contadorSvg++;
        let nombreSvg = 'exportaciones/' + 'out' + nf(contadorSvg, 3) + '.svg';
        save(nombreSvg);
    }
    if (key == 'r') {
        console.log("Tecla R presionada - recargando datos");
        cargarDatos();

    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    detectarOrientacion();
    redraw();
}