let h, s, b;
let gama = 0;
let table;
const OBJ = 300;
const TROZOS = 6;
const capas = [];

function preload() {
    table = loadTable("colors.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);
    background(0);
    //createCanvas(600, 600, SVG);
    colorMode(HSB, 360, 100, 100, 255);
    noLoop();
    //frameRate(3);
    angleMode(DEGREES);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noFill();
    smooth(1);
    setInterval(draw,50000);
}

function draw() {
    background(0,0,0,255);
    capas.length = 0; 
    
    const C1 = new Circulos(selectorVal(), selectorTam());
    const H1 = new Hexagono(selectorVal(), selectorTam());
    const E1 = new Esfera(selectorVal(), selectorTam());
    const L1 = new Lineas(selectorVal(), selectorTam());
    C1.render();
    H1.render();
    E1.render();
    L1.render();
/*     let selector = random(1);
    if(selector > 0.3){
        capas.push(new Circulos(selectorVal(), selectorTam()));
    }
    selector = random(1);
    if(selector > 0.3){
        capas.push(new Hexagono(selectorVal(), selectorTam()));
    }
    selector = random(1);
    if(selector > 0.3){
        capas.push(new Esfera(selectorVal(), selectorTam()));
    }
    selector = random(1);
    if(selector > 0.3){
        capas.push(new Lineas(selectorVal(), selectorTam()));
    }
    if(selector > 0.3){
        capas.push(new Ojo(100,50,0,0));
    }
    capas.forEach(capasPrint => {
        capasPrint.render();
    }) */
}





