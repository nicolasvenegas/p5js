let h, s, b;
let gama = 0;
let table;
const OBJ = 300;
const TROZOS = 6;

function preload() {
    table = loadTable("colors.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);

    //createCanvas(600, 600, SVG);
    colorMode(HSB, 360, 100, 100, 255);
    //noLoop();
    frameRate(3);
    angleMode(DEGREES);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noFill();
    smooth(1);
}

function draw() {
    background(0, 0, 0);
    const C1 = new Circulos(selectorVal(), selectorTam());
    const H1 = new Hexagono(selectorVal(), selectorTam());
    const E1 = new Esfera(selectorVal(), selectorTam());
    C1.render();
    H1.render();
    E1.render();
}







