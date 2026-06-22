class Capa {
    constructor(valorLinea, tam, lados) { // <-- Añadir lados como parámetro
        this.valorLinea = valorLinea;
        this.lados = lados; // <-- Asignar lados
        this.tam = selectorTam()*0.5;
        this.pos = (OBJ / 2) - (tam / 2);
        this.pasos = selectorTrozos(); // <-- Ejecutar función
        this.paso = (OBJ / 2) / this.pasos;
        this.ang = 360 / this.lados; // <-- Ahora this.lados existe
        // color
        this.colSelect = floor(random(5));
        this.gama = floor(random(21));
        this.colorObj = getColor(this.gama, this.colSelect);
        this.colorLinea = color(this.colorObj.h, this.colorObj.s, this.colorObj.b);
    }
}

class Circulos extends Capa {
    constructor(valorLinea, tam) {
        const lados = selectorFig();
        super(valorLinea, tam, lados); // 
    }
    render() {
        strokeWeight(this.valorLinea);
        stroke(this.colorLinea);
        push();
        translate(width / 2, height / 2);
        for (let i = 0; i < this.lados; i++) {
            
            ellipse(this.pos, 0, this.tam);
            rotate(this.ang);
        }
        pop();
    }
}

class Hexagono extends Capa {
    constructor(valorLinea, tam) {
        const lados = selectorLados();
        super(valorLinea, tam, lados);
    }
    render() {
        noFill();
        strokeWeight(this.valorLinea);
        stroke(this.colorLinea);
        push();
        translate(width / 2, height / 2);
        rotate(this.ang);
        beginShape();
        for (let i = 0; i < this.lados; i++) {
            let angulo = 360 / this.lados * i;
            vertex((this.tam * 0.75) * cos(angulo), (this.tam * 0.75) * sin(angulo));
        }
        endShape(CLOSE);
        pop();
    }
}


class Esfera extends Capa {
    constructor(valorLinea, tam, lados) {
        super(valorLinea, tam, lados);
    }
    render() {
        noFill();
        strokeWeight(this.valorLinea);
        //stroke(colorEsfera);
        push();
        translate(width / 2, height / 2);
        ellipse(0, 0, this.tam);
        pop();
    }
}



