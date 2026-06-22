function selectorAzar() {
    const azarValor = noise(1);
    if (azarValor > 0.5) {
        return true;
    } else {
        return false;
    }
}

function selectorLados() {
    const opciones = [2, 4, 6, 8,12];
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
    //return floor(random(1, 3));
    return 2;
}
function selectorTam() {
    /* const opciones = [width / 4, width / 5, width / 6, width / 7, width / 8];
    const i = floor(random(opciones.length)); 
    return opciones[i]; */
    return floor(random(height*0.25,height*0.4));

}
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
