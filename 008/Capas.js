class Capa {
    constructor(valorLinea, tam, lados) {
        this.valorLinea = valorLinea > 0 ? valorLinea : selectorVal();
        this.lados = lados > 0 ? lados : selectorLados();
        this.tam = tam > 0 ? tam : selectorTam();
        this.pos = (OBJ / 2) - (this.tam / 2);
        this.pasos = selectorTrozos();
        this.paso = (OBJ / 2) / this.pasos;
        this.angRotate = selectorAng();
        this.ang = 360 / this.lados;
        // color
        this.colSelect = floor(random(5));
        this.gama = floor(random(21));
        this.colorObj = getColor(this.gama, this.colSelect);
        this.colorLinea = color(this.colorObj.h, this.colorObj.s, this.colorObj.b);
    }
}

class Circulos extends Capa {
    constructor(valorLinea, tam, lados) {
        super(valorLinea, tam, lados);
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
    constructor(valorLinea, ang, lados) {
        super(valorLinea, ang, lados);
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
            let angulo = this.ang * i;
            vertex((this.tam / 2) * cos(angulo), (this.tam / 2) * sin(angulo));
            rotate(this.angRotate);
        }
        endShape(CLOSE);
        pop();
    }
}

class Esfera extends Capa {
    constructor(valorLinea, tam) {
        super(valorLinea, tam);
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



class Lineas extends Capa {
    constructor(valorLinea, ang, lados) {
        super(valorLinea, ang, lados);

        // Asignar a this para que existan en render()
        this.linDivisiones = selectorTrozos();
        this.linPasos = selectorTrozos();
        this.linPaso = (OBJ / 2) / this.linPasos;
        this.linInicio = floor(random(0, this.linPasos));
        this.linFinal = floor(random(this.linInicio, this.linPasos + 1));
        this.numFormas = selectorTrozos();

        // Asegurar distancia mínima
        while (this.linFinal - this.linInicio < 2) {
            this.linInicio = floor(random(0, this.linPasos - 1));
            this.linFinal = floor(random(this.linInicio + 2, this.linPasos + 1));
        }
    }
    render() {
        noFill();
        strokeWeight(this.valorLinea);
        stroke(this.colorLinea);
        push();
        translate(width / 2, height / 2);
        rotate(this.ang);
        for (let i = 0; i < this.numFormas; i++) {
            line(this.linInicio * this.linPaso, 0, this.linFinal * this.linPaso, 0);
            rotate(360 / this.numFormas);
        }
        pop();
    }
}

class Meandro {
    constructor(posX, posY, len, ang, paleta, colMeandro, margen, angFactorX, angFactorY) {
        this.x = posX || width / 2;
        this.y = posY || height / 2;
        this.ang = ang || random(PI * 2);
        this.angFactorX = angFactorX || 0.11;
        this.angFactorY = angFactorY || 0.24;
        this.len = len || width * 0.01;
        this.paleta = paleta !== undefined ? paleta : floor(random(21));
        this.colMeandro = colMeandro !== undefined ? colMeandro : floor(random(5));
        this.margen = margen || 1;
        this.puntos = [];
        this.generarPuntos();
    }

    generarPuntos() {
        this.puntos = [];
        let x = this.x;
        let y = this.y;
        let ang = this.ang;

        for (let i = 0; i < 5000; i++) {
            let newX = cos(ang) * this.len + x;
            let newY = sin(ang) * this.len + y;

            // Limitar dentro de la pantalla
            newX = constrain(newX, this.margen, width - this.margen);
            newY = constrain(newY, this.margen, height - this.margen);

            this.puntos.push({ x: newX, y: newY });

            x = newX;
            y = newY;
            ang += random(-360 * this.angFactorX, 360 * this.angFactorY);
        }

        // Guardar último estado para continuar
        this.x = x;
        this.y = y;
        this.ang = ang;
    }

    render() {
        // Obtener color
        getColor(this.paleta, this.colMeandro);
        stroke(h, 100, 27, 255);
        strokeWeight(selectorVal()/2);
        noFill();

        beginShape();
        for (let i = 0; i < this.puntos.length; i++) {
            curveVertex(this.puntos[i].x, this.puntos[i].y);
        }
        endShape();
    }

    // Método para regenerar con nuevos parámetros
    regenerar(nuevaPaleta, nuevoColor) {
        if (nuevaPaleta !== undefined) this.paleta = nuevaPaleta;
        if (nuevoColor !== undefined) this.colMeandro = nuevoColor;
        this.generarPuntos();
    }
}

class LineaDiscontinua extends Capa {
    constructor(valorLinea, tam, lados) {
        super(valorLinea, tam, lados);
        this.anchoRect = selectorTrozos();
    }
    render() {
        fill(this.colorLinea);
        noStroke();
        push();
        translate(width / 2, height / 2);
        for (let i = 0; i < this.lados; i++) {
            for (let x = this.paso; x < OBJ * 0.5; x += this.paso) {
                // Rectángulos más visibles
                let alto = selectorVal();
                rect(x, 0, this.anchoRect, alto);
            }
            rotate(this.ang);
        }
        pop();
    }
}


class Ojo {
    constructor(ancho, alto, posX, posY) {
        this.ancho = ancho;
        this.alto = alto;
        this.posX = posX;
        this.posY = posY;
        this.colPupila = 0;
    }
    render() {
        fill("#ffffff");
        noStroke();
        push();
        translate(width / 2 + this.posX, height / 2 + this.posY);
        beginShape(); // estudiar
        vertex(this.ancho / 2, 0);
        bezierVertex(this.ancho / 4, -this.alto / 2, -this.ancho / 4, -this.alto / 2, -this.ancho / 2, 0);
        bezierVertex(-this.ancho / 4, this.alto / 2, this.ancho / 4, this.alto / 2, this.ancho / 2, 0);
        endShape(CLOSE);
        fill(this.colPupila);
        noStroke();
        ellipse(0, 0, 35);
        pop();
        noFill();
    }
}

