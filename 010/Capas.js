class Capa {
    constructor(valorLinea, tam, lados, posX, posY) {
        this.posX = posX !== undefined ? posX : 0;
        this.posY = posY !== undefined ? posY : 0;
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
        translate(this.posX, this.posY);
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
        translate(this.posX, this.posY);
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
        translate(this.posX, this.posY);
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
        translate(this.posX, this.posY);
        rotate(this.ang);
        for (let i = 0; i < this.numFormas; i++) {
            line(this.linInicio * this.linPaso, 0, this.linFinal * this.linPaso, 0);
            rotate(360 / this.numFormas);
        }
        pop();
    }
}

class Meandro {
    constructor(posX, posY, len, ang, paleta, colMeandro, margen, angFactorX, angFactorY, segmentos) {
        this.x = posX !== undefined ? posX : 0;
        this.y = posY !== undefined ? posY : 0;
        this.ang = ang || random(PI * 2);
        this.angFactorX = angFactorX > 0 ? angFactorX : selectorFactorAngX();
        this.angFactorY = angFactorY > 0 ? angFactorY : selectorFactorAngY();
        this.segmentos = selectorSegmentos();
        this.len = len || width * 0.009;
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

        for (let i = 0; i < this.segmentos; i++) {
            let newX = cos(ang) * this.len + x;
            let newY = sin(ang) * this.len + y;

            // Limitar dentro de la pantalla
            newX = constrain(newX, -OBJ / 2 + this.margen, OBJ / 2 - this.margen);
            newY = constrain(newY, -OBJ / 2 + this.margen, OBJ / 2 - this.margen)

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
        stroke(h, 100, 127, 255);
        strokeWeight(selectorVal());
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
        translate(this.posX, this.posY);
        for (let i = 0; i < this.lados; i++) {
            for (let x = this.paso; x < OBJ * 0.5; x += this.paso) {
                // Rectángulos más visibles
                let alto = selectorVal();
                rect(x, 0, this.anchoRect, alto);
            }
            rotate(this.angRotate);
        }
        pop();
    }
}


class Ojo {
    constructor(ancho, alto, posX, posY, paleta, colOjo, colPupila) {
        this.ancho = ancho;
        this.alto = alto;
        this.posX = posX !== undefined ? posX : 0;
        this.posY = posY !== undefined ? posY : 0;
        this.paleta = paleta !== undefined ? paleta : floor(random(21));
        // Asignar color del ojo
        this.colOjo = colOjo !== undefined ? colOjo : floor(random(5));

        // Asignar color de pupila (diferente al del ojo)
        if (colPupila !== undefined) {
            this.colPupila = colPupila;
        } else {
            do {
                this.colPupila = floor(random(5));
            } while (this.colPupila === this.colOjo);
        }

        this.colorOjo = getColor(this.paleta, this.colOjo);
        this.colorPupila = getColor(this.paleta, this.colPupila);
    }
    render() {

        getColor(this.paleta, this.colOjo);
        fill(this.colorOjo.h, this.colorOjo.s, this.colorOjo.b, 255);
        noStroke();
        push();
        translate(this.posX, this.posY);
        beginShape(); // estudiar vertex
        vertex(this.ancho / 2, 0);
        bezierVertex(this.ancho / 4, -this.alto / 2, -this.ancho / 4, -this.alto / 2, -this.ancho / 2, 0);
        bezierVertex(-this.ancho / 4, this.alto / 2, this.ancho / 4, this.alto / 2, this.ancho / 2, 0);
        endShape(CLOSE);
        getColor(this.paleta, this.colPupila);
        fill(this.colorPupila.h, this.colorPupila.s, this.colorPupila.b, 255);
        noStroke();
        ellipse(0, 0, this.alto * 0.65);
        if (this.colorPupila.b > 50 && this.colorPupila.s < 50) {
            fill(0, 0, 0, 255);
        } else {
            fill(0, 0, 255, 255);
        }
        ellipse(0, 0, this.alto * 0.25);
        pop();
        noFill();
    }
}

class txtH1 {
    constructor(posX, posY, txt = selectorTxt1(), tSize, paletaTxt, colTxt) {
        // Calcular tamaño para que ocupe todo el ancho
        this.posX = posX !== undefined ? posX : 0;
        this.posY = posY !== undefined ? posY : 0;
        this.txt = txt;
        this.tSize = tSize;  // 28% del ancho para que quepa bien
        this.paletaTxt = paletaTxt !== undefined ? paletaTxt : floor(random(21));
        this.colTxt = colTxt !== undefined ? colTxt : floor(random(5));
    }
    render() {
        push();
        noStroke();
        translate(this.posX, this.posY);
        textAlign(CENTER, CENTER);
        textSize(selectorTxtTam());
        text(this.txt, random(-OBJ / 2 + OBJ / 20, OBJ / 2 - OBJ / 20), random(-OBJ / 2 + OBJ / 20, OBJ / 2 - OBJ / 20), this.tSize);
        pop();
    }
}

