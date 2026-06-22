// selector de geometria para el perimetro

function perimetral(x = 0, y = 0) {
    const truePerimetral = selectorPerimetral();
    // Obtener color 
    const colSelect = floor(random(5));
    gama = floor(random(21))
    const color = getColor(gama, colSelect);
    stroke(color.h, color.s, color.b);

    push();

    translate(x, y);
    if (truePerimetral === 0) {
        hexagono(0, 0);
    } else if (truePerimetral === 1) {
        circulos(0, 0);
    } else if (truePerimetral === 2) {
        esfera(0, 0);
    } else {
        cuadrado(0, 0);
    }
    pop();
}

// funciones de formas

function esfera(x, y) {
    //const colorEsfera = selectorCol();
    const valEsfera = selectorVal();
    const tamEsfera = selectorTam();
    noFill();
    strokeWeight(valEsfera * 2);
    //stroke(colorEsfera);
    push();
    ellipse(0, 0, tamEsfera * 2);
    pop();
}

function cuadrado(x, y, w, h) {
    //const colCuadrado = selectorCol();
    const valCuadrado = selectorVal();
    const wCuadrado = selectorTam();
    const hCuadrado = selectorTam();
    const angCuadrado = selectorAng();
    noFill();
    strokeWeight(valCuadrado);
    //stroke(colCuadrado);
    push();
    rotate(angCuadrado);
    rect(0, 0, wCuadrado, hCuadrado);
    pop();
}

function circulos() {
    let numCirculos = selectorTrozos();
    const angCirculos = 360 / numCirculos;
    const tamCirculos = selectorTam();
    const posCirculos = (OBJ / 2) - tamCirculos;
    const valCirculos = selectorVal();
    //const colCirculos = selectorCol();


    //stroke(colCirculos);
    strokeWeight(valCirculos);
    push();
    for (let i = 0; i < numCirculos; i++) {
        ellipse(posCirculos, 0, tamCirculos);
        rotate(angCirculos);
    }
    pop();
}

function hexagono(x, y, radio) {
    //const colorHexagono = selectorCol();
    const valorHexagono = selectorVal();
    const tamHexagono = selectorTam();
    const angHexagono = selectorAng();
    const ladosHexagono = floor(random(5, 13));
    noFill();
    strokeWeight(valorHexagono);
    //stroke(colorHexagono);
    push();
    rotate(angHexagono);
    beginShape();
    for (let i = 0; i < ladosHexagono; i++) {
        let angulo = 360 / ladosHexagono * i;
        vertex(x + tamHexagono * cos(angulo), y + tamHexagono * sin(angulo));
    }
    endShape(CLOSE);
    pop();
}

function lineasSeg(x = 0, y = 0) {
    const linDivisiones = 3;
    const linPasos = selectorTrozos();
    const linPaso = (OBJ / 2) / linPasos;
    let linInicio = floor(random(0, linPasos));
    let linFinal = floor(random(linInicio, linPasos + 1));
    // Obtener color 
    const colSelect = floor(random(5));
    gama = floor(random(21))
    const color = getColor(gama, colSelect);
    stroke(color.h, color.s, color.b);

    while (linFinal - linInicio < 2) {
        linInicio = floor(random(0, linPasos - 1));
        linFinal = floor(random(linInicio + 2, linPasos + 1));
    }

    let numFormas = selectorTrozos();
    //const colorLineas = selectorCol();
    const valorLineas = selectorVal();
    const angLineas = selectorAng();

    noFill();
    strokeWeight(valorLineas);
    push();
    translate(x, y);
    rotate(angLineas);
    const angle = 360 / numFormas;
    for (let i = 0; i < numFormas; i++) {
        line(linInicio * linPaso, 0, linFinal * linPaso, 0);
        rotate(angle);
    }
    pop();
}



// Selectores de valores

function selectorAzar() {
    const azarValor = noise(1);
    if (azarValor > 0.5) {
        return true;
    } else {
        return false;
    }
}

function selectorLados() {
    const opciones = [3, 4, 6, 8];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorFig() {
    const opciones = [4];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorTrozos() {
    const opciones = [3, 6, 9, 12, 15, 18, 21, 24];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorVal() {
    /*  const opciones = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const i = floor(random(opciones.length)); 
    return opciones[i]; */
    return floor(random(1, 3));
    //return 3;
}
function selectorTam() {
    /* const opciones = [width / 4, width / 5, width / 6, width / 7, width / 8];
    const i = floor(random(opciones.length)); 
    return opciones[i]; */
    return floor(random(width / 12, width / 3));

}
/* function selectorCol() {
    const azarColor = floor(random(0, PALETA.length));
    return PALETA[azarColor];
} */

function selectorAng() {
    const opciones = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
    const i = floor(random(360)); //(random(opciones.length));
    return opciones[i];
}

function selectorPerimetral() {
    const opciones = [0, 1, 2, 3];
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
        line(0, 0, 0, OBJ / 2);
        rotate(angle);
    }
    pop();
}


function getColor(gama, colSelect) {
    h = int(table.get(gama, colSelect * 3));
    s = int(table.get(gama, colSelect * 3 + 1));
    b = int(table.get(gama, colSelect * 3 + 2));

    return { h, s, b };
}
