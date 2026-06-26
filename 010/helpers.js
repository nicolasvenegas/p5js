const ojoObj = OBJ;

const constructorCapas = [
    {
        name: 'Meandro1',
        init: (intensidad) => new Meandro(0, 0, undefined, undefined, undefined, undefined, undefined, selectorFactorAngX(intensidad), selectorFactorAngY(intensidad), selectorSegmentos(intensidad)),
        weight: 0.37
    },
    {
        name: 'Circulos',
        init: (intensidad) => new Circulos(selectorVal(intensidad), selectorTam(intensidad) * 0.8, selectorLados(intensidad)),
        weight: 0.125
    },
    {
        name: 'Hexagono',
        init: (intensidad) => new Hexagono(selectorVal(intensidad), selectorTam(intensidad), selectorLados(intensidad)),
        weight: 0.17
    },
    {
        name: 'Esfera',
        init: (intensidad) => new Esfera(selectorVal(intensidad), selectorTam(intensidad)),
        weight: 0.22
    },
    {
        name: 'Lineas',
        init: (intensidad) => new Lineas(selectorVal(intensidad), selectorTam(intensidad), selectorLados(intensidad)),
        weight: 0.25
    },
    {
        name: 'LineaDiscontinua',
        init: (intensidad) => new LineaDiscontinua(selectorVal(intensidad), selectorTam(intensidad), selectorLados(intensidad)),
        weight: 0.35
    },
    {
        name: 'Ojo 1',
        init: () => new Ojo(ojoObj, ojoObj * 0.65, 0, ojoObj * 0.3),
        weight: 0.155
    },
    {
        name: 'Ojo 2',
        init: () => new Ojo(ojoObj, ojoObj * 0.65, 0, ojoObj * -0.3),
        weight: 0.155
    },
    {
        name: 'txtH1',
        init: (intensidad) => new txtH1(0, 0, intensidad, selectorTxtTam(intensidad)),
        weight: 3
    }
]


function selectorAzar() {
    const azarValor = noise(1);
    if (azarValor > 0.5) {
        return true;
    } else {
        return false;
    }
}

/* function selectorLados() {
    const opciones = [3, 4, 5, 6, 8, 12, 24, 48, 96];
    const i = floor(random(opciones.length));
    return opciones[i];
} */
function selectorLados(intensidad) {
    const opciones = [3, 4, 5, 6, 8, 12, 24, 48, 96];
    if (intensidad !== undefined) {
        // Usar intensidad para seleccionar un índice más alto
        const idx = floor(intensidad * 5.5 * (opciones.length - 1));
        return opciones[idx];
    }
    /*  const i = floor(random(opciones.length));
     return opciones[i];
      */
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

/* function selectorVal() {
    //  return random([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //return floor(random(1, 2));
    return 1.2;
} */

function selectorVal(intensidad) {
    if (intensidad !== undefined) {
        // Mapear intensidad (0-1) a grosor (0.5-3)
        return 0.5 + intensidad * 5;
    }
    return 1.2; // valor original
}

/* function selectorTam() {
     const opciones = [width / 4, width / 5, width / 6, width / 7, width / 8];
    const i = floor(random(opciones.length)); 
    return opciones[i]; 
    return floor(random(OBJ * 0.5, OBJ));

} */

function selectorTam(intensidad) {
    if (intensidad !== undefined) {
        // Mapear intensidad a tamaño entre OBJ*0.3 y OBJ*0.9
        return OBJ * (0.3 + intensidad * 7); // rango de 0.3 a 0.9
    }
    return floor(random(OBJ * 0.5, OBJ));
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

function selectorFactorAngX(intensidad) {
    if (intensidad !== undefined) {
        // Rango base: [-0.2, 0.3]. Se expande linealmente con la intensidad.
        let min = -0.2 - intensidad * -0.7; // Hasta -0.7
        let max = 0.3 + intensidad * 0.8;  // Hasta 0.8
        return random(min, max);
    }
    //return random(-0.2, 0.3);
}
function selectorFactorAngY(intensidad) {
    if (intensidad !== undefined) {
        // Rango base: [-0.2, 0.3]. Se expande con la intensidad.
        let min = -0.2 - intensidad * 0.6; // Hasta -0.8
        let max = 0.3 + intensidad * 0.6;  // Hasta 0.9
        return random(min, max);
    }
    //return random(-0.2, 0.3);
}


function selectorTxtTam() {
    const opciones = [12, 15, 17, 20];
    const i = floor(random(opciones.length));
    return opciones[i];
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
