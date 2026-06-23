const ojoObj = OBJ;

const constructorCapas = [
    {
        name: 'Meandro1',
        init: () => new Meandro(),
        weight: 0.3
    },
    {
        name: 'Circulos',
        init: () => new Circulos(selectorVal(), selectorTam() * 0.8, selectorLados()),
        weight: 0
    },
    {
        name: 'Hexagono',
        init: () => new Hexagono(selectorVal(), selectorTam(), selectorLados()),
        weight: 0.3
    },
    {
        name: 'Esfera',
        init: () => new Esfera(selectorVal(), selectorTam()),
        weight: 0
    },
    {
        name: 'Lineas',
        init: () => new Lineas(selectorVal(), selectorTam()),
        weight: 0.3
    },
    {
        name: 'LineaDiscontinua',
        init: () => new LineaDiscontinua(selectorVal(), selectorTam(), selectorLados()),
        weight: 0.3
    },
/*     {
        name: 'Ojo 1',
        init: () => new Ojo(ojoObj, ojoObj * 0.65, 0, ojoObj * 0.3),
        weight: 0.2
    },
    {
        name: 'Ojo 2',
        init: () => new Ojo(ojoObj, ojoObj * 0.65, 0, ojoObj * -0.3),
        weight: 0.2
    } */
]



function selectorAzar() {
    const azarValor = noise(1);
    if (azarValor > 0.5) {
        return true;
    } else {
        return false;
    }
}

function selectorLados() {
    const opciones = [3, 4, 5, 6, 8, 12,24,48,96];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorFig() {
    const opciones = [3, 4, 5, 6, 8, 12];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorTrozos() {
    const opciones = [2, 3, 6, 9];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorVal() {
    //  return random([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //return floor(random(1, 2));
    return 1.2;
}

function selectorTam() {
    /* const opciones = [width / 4, width / 5, width / 6, width / 7, width / 8];
    const i = floor(random(opciones.length)); 
    return opciones[i]; */
    return floor(random(OBJ * 0.25, OBJ));
    
}

function selectorTamLin() {
    const opciones = [2];
    const i = floor(random(opciones.length));
    return opciones[i];
    //return floor(random(2,2));

}

function selectorAng() {
    const opciones = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
    //const i = floor(random(360)); 
    const i = floor(random(opciones.length));
    return opciones[i];
    //return i;
}

function selectorPerimetral() {
    const opciones = [0, 1, 2, 3];
    const i = floor(random(opciones.length));
    return opciones[i];
}

function selectorFactorAngX() {
    /* const opciones = [0.1,0.7];
        const i = floor(random(opciones.length));
        return opciones[i]; */
    return random(-0.2, 0.1);
}

function selectorFactorAngY() {
    //const opciones = [0.1,0.7];
    //const i = floor(random(opciones.length));
    //return opciones[i];
    return random(-0.2, 0.1);
}

function selectorSegmentos() {
    return random(10, 400);
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
