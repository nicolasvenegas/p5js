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
    noLoop();
    //frameRate(3);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background(255)
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; i++) {
            perimetral();
            hexagono(0, 0, 60, 0);
            lineas();
        }
    }

}

function perimetral() {
    const colorPerimetral = selectorCol();
    const valorPerimetral = selectorVal();
    const tamPerimetral = selectorTam();

    noFill();
    strokeWeight(valorPerimetral);
    stroke(colorPerimetral);
    push();
    translate(width / 2, height / 2);
    ellipse(0, 0, tamPerimetral * 2);
    pop();
}

function hexagono(x, y, radio) {
    const colorHexagono = selectorCol();
    const valorHexagono = selectorVal();
    const tamHexagono = selectorTam();
    const angHexagono = selectorAng();

    noFill();
    strokeWeight(valorHexagono);
    strokeWeight(valorHexagono);
    stroke(colorHexagono);
    push();
    translate(width / 2, height / 2);
    rotate(angHexagono);
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angulo = 360 / 6 * i;
        vertex(x + tamHexagono * cos(angulo), y + tamHexagono * sin(angulo));
    }
    endShape(CLOSE);
    pop();
}

function lineas() {
    let numFormas = selectorTrozos();
    const colorLineas = selectorCol();
    const valorLineas = selectorVal();
    const tamLineas = selectorTam() * 1.2;
    const angLineas = selectorAng();

    noFill();
    strokeWeight(valorLineas);
    stroke(colorLineas);
    push();
    translate(width / 2, height / 2);
    rotate(angLineas);
    stroke(colorLineas);
    const angle = 360 / numFormas;
    for (let i = 0; i < numFormas; i++) {
        line(0, 0, 0, tamLineas);
        rotate(angle);
    }
    pop();
}





function selectorTrozos() {
    const opciones = [6, 9, 12, 18, 24];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorVal() {
    /*  const opciones = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     const i = floor(random(opciones.length)); 
     return opciones[i]; */
    return floor(random(4, 4));

}

function selectorTam() {
    /* const opciones = [width / 4, width / 5, width / 6, width / 7, width / 8];
    const i = floor(random(opciones.length)); 
    return opciones[i]; */
    return floor(random(width / 8, width / 4));

}
function selectorCol() {
    const azarColor = floor(random(0, PALETA.length));
    return PALETA[azarColor];
}

function selectorAng() {
    return floor(random(360));
}
