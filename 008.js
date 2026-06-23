let h, s, b;
let gama = 0;
let table;
let OBJ = 100;
let contadorSvg = 0;

const COLS = 7;
const ROWS = 4;

let OBJall = [];


function preload() {
    table = loadTable("colors.csv", "csv", "header");
}


function setup() {

    createCanvas(windowWidth, windowHeight, SVG);

    //createCanvas(600, 600, SVG);
    colorMode(HSB, 360, 100, 100, 255);
    noLoop();
    frameRate(1);
    angleMode(DEGREES);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noFill();
    smooth(1);
    setInterval(draw, 5000);

}

function draw() {
    background(0, 0, 0, 255);
    reticulado();
}

function reticulado() {
    // OBJ ocupa todo el espacio disponible
    OBJ = Math.min(width / COLS, height / ROWS);
    const MODULO = OBJ;
    
    // Centrar exactamente
    const totalWidth = COLS * MODULO;
    const totalHeight = ROWS * MODULO;
    const offsetX = (width - totalWidth) / 2;
    const offsetY = (height - totalHeight) / 2;
    
    OBJall = [];
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            // SIN OBJ/2 - la celda comienza en offsetX + x * MODULO
            const posX = offsetX + x * MODULO ;
            const posY = offsetY + y * MODULO;
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
}