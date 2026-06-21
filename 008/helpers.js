function esfera(x, y) {
    const colorEsfera = selectorCol();
    const valorEsfera = selectorVal();
    const tamEsfera = selectorTam();
    noFill();
    strokeWeight(valorEsfera * 2);
    stroke(colorEsfera);
    push();
    ellipse(0, 0, tamEsfera * 2);
    pop();
}

function cuadrado(x, y, w, h) {
    const colorCuadrado = selectorCol();
    const valorCuadrado = selectorVal();
    const wCuadrado = selectorTam();
    const hCuadrado = selectorTam();
    noFill();
    strokeWeight(valorCuadrado * 3);
    stroke(colorCuadrado);
    push();
    rect(0, 0, wCuadrado, hCuadrado);
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
    rotate(angHexagono);
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angulo = 360 / 6 * i;
        vertex(x + tamHexagono * cos(angulo), y + tamHexagono * sin(angulo));
    }
    endShape(CLOSE);
    pop();
}






function selectorAzar() {
    const azarValor = noise(1);
    if (azarValor > 0.5) {
        return true;
    } else {
        return false;
    }
}
function selectorTrozos() {
    const opciones = [3,6, 9, 12, 15,18,21, 24];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorVal() {
    /*  const opciones = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     const i = floor(random(opciones.length)); 
     return opciones[i]; */
    return floor(random(2,12));

}
function selectorTam() {
    /* const opciones = [width / 4, width / 5, width / 6, width / 7, width / 8];
    const i = floor(random(opciones.length)); 
    return opciones[i]; */
    return floor(random(width / 10, width / 4));

}
function selectorCol() {
    const azarColor = floor(random(0, PALETA.length));
    return PALETA[azarColor];
}

function selectorAng() {
    const opciones = [0, 45, 90];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorPerimetral() {
    const opciones = [0, 1, 2];
    const i = floor(random(opciones.length));
    return opciones[i];
}




function guias() {
    let numFormas = 48;
    const valorLineas = 1;
    const angLineas = selectorAng();

    noFill();
    strokeWeight(valorLineas);
    stroke("#DDDDDD");
    push();
    translate(width / 2, height / 2);
    rotate(angLineas);
    const angle = 360 / numFormas;
    for (let i = 0; i < numFormas; i++) {
        line(0, 0, 0, OBJ/2);
        rotate(angle);
    }
    pop();
}
