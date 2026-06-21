const OBJ = 500;
const TROZOS = 6;
let PALETA = [];

function setup() {
    createCanvas(530, 530, SVG);
    background(200);
    colorMode(HSB, 360, 100, 100, 255);
    PALETA = [
        color(200, 80, 50),
        color(45, 80, 60),
        color(320, 70, 55),
        color(120, 70, 45),
        color(30, 80, 55),
        color(0, 85, 60),
        color(60, 80, 65),
        color(180, 75, 55),
        color(240, 80, 60),
        color(280, 75, 55),
        color(340, 85, 60),
        color(150, 80, 50),
        color(50, 85, 65),
        color(10, 80, 55),
        color(200, 80, 55),
        color(20, 85, 60),
        color(330, 80, 55),
        color(100, 75, 50),
        color(260, 80, 55),
        color(70, 90, 70),
        color(190, 85, 60),
        color(300, 80, 60),
        color(40, 85, 60),
        color(160, 80, 55),
        color(220, 85, 65),
        color(350, 80, 55),
        color(130, 75, 50),
        color(250, 80, 60),
        color(80, 85, 65),
        color(170, 80, 55),
        color(290, 75, 55),
        color(55, 90, 70),
        color(195, 80, 60),
        color(310, 85, 60),
        color(25, 80, 55),
        color(145, 75, 50),
        color(230, 85, 65),
        color(355, 80, 55),
        color(110, 80, 50),
        color(270, 80, 60),
    ];
    //noLoop();
    frameRate(3);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background(255)
    //guias();
    lineasSeg(width/2,height/2);
    perimetral(width/2,height/2);
}



function perimetral(x = 0, y = 0) {
    const truePerimetral = selectorPerimetral();
    push();
    translate(x,y);
    if (truePerimetral === 0) {
        hexagono(0, 0);
    } else if (truePerimetral === 1) {
        esfera(0, 0);
    } else {
        cuadrado(0, 0);
    }
    pop();
}


function lineasSeg(x = 0, y = 0) {
    const linDivisiones = 3;
    const linPasos = selectorTrozos();
    const linPaso = (OBJ / 3) / linPasos;
    let linInicio = floor(random(0, linPasos));
    let linFinal = floor(random(linInicio, linPasos + 1));

    while (linFinal - linInicio < 2) {
        linInicio = floor(random(0, linPasos - 1));
        linFinal = floor(random(linInicio + 2, linPasos + 1));
    }

    let numFormas = selectorTrozos();
    const colorLineas = selectorCol();
    const valorLineas = selectorVal();
    const tamLineas = selectorTam() * 1.2;
    const angLineas = selectorAng();

    noFill();
    strokeWeight(valorLineas);
    stroke(colorLineas);
    push();
    translate(x,y);
    rotate(angLineas);
    stroke(colorLineas);
    const angle = 360 / numFormas;
    for (let i = 0; i < numFormas; i++) {
        line(linInicio * linPaso, 0, linFinal * linPaso, 0);
        rotate(angle);
    }
    pop();
    print(linPasos)
}



