
let h, s, b;
let gama = 0;
let table;
let OBJ = 100;
let contadorSvg = 0;

let COLS = 8;
let ROWS = 3;
let OBJall = [];

let tiempoAnimacion = 0;

function preload() {
    table = loadTable("colors.csv", "csv", "header");
}

function setup() {
    // canvas dentro del DIV id 'contenedor'
    let canvas = createCanvas(windowWidth, windowHeight, SVG);
    canvas.parent('contenedor');
    
    colorMode(HSB, 360, 100, 100, 255);
    noLoop();
    frameRate(1);
    angleMode(DEGREES);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noFill();
    smooth(1);
    setInterval(draw, 10000);
    detectarOrientacion();
}

function draw() {

    background(0, 0, 0, 255);

    reticulado();


    /*     fill(255);
        textSize(40);
        textAlign(CENTER, CENTER)
        text('texto',width/2,height/2);
        noFill(); */
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
            // CENTRAR CADA OBJETO EN SU CELDA
            const posX = offsetX + x * MODULO + OBJ / 2;
            const posY = offsetY + y * MODULO + OBJ / 2;
            OBJall.push(new Obj(posX, posY));
        }
    }

    OBJall.forEach(obj => {
        obj.render();
    });
}


function keyPressed() {
    if (key == 's') {
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