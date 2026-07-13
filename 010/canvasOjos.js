// Sketch secundario: contador y miniaturas agrupadas por tipo
let sketchFiguras = function (p) {
    let margenX = 10;
    let margenY = 10;
    let tamIcono = 20;
    let separacion = 4;
    let espacioTitulo = 20; // espacio para el título de cada grupo

    // Colores por tipo (HSB)
    const coloresTipo = {
        'Meandro': [200, 80, 80],
        'Circulos': [50, 80, 80],
        'Hexagono': [120, 80, 80],
        'Esfera': [180, 80, 80],
        'Lineas': [300, 80, 80],
        'LineaDiscontinua': [30, 80, 80],
        'Ojo': [0, 80, 80],
        'txtH1': [60, 80, 80]
    };

    const METADATA_TIPO = {
        'Meandro': {
            label: 'Meandros',
            familia: 'flujo',
            color: [195, 80, 80],
            desc: 'Flujo orgánico'
        },
        'Circulos': {
            label: 'Círculos',
            familia: 'estructura',
            color: [45, 80, 80],
            desc: 'Repetición concéntrica'
        },
        'Hexagono': {
            label: 'Hexágonos',
            familia: 'estructura',
            color: [55, 80, 80],
            desc: 'Estructura geométrica'
        },
        'Esfera': {
            label: 'Esferas',
            familia: 'estructura',
            color: [65, 80, 80],
            desc: 'Totalidades'
        },
        'Lineas': {
            label: 'Líneas',
            familia: 'flujo',
            color: [200, 80, 80],
            desc: 'Dirección y extensión'
        },
        'LineaDiscontinua': {
            label: 'Líneas discontinuas',
            familia: 'flujo',
            color: [215, 80, 80],
            desc: 'Fragmentación'
        },
        'Ojo': {
            label: 'Ojos',
            familia: 'observador',
            color: [330, 80, 80],
            desc: 'Mirada y atención'
        },
        'txtH1': {
            label: 'Textos',
            familia: 'observador',
            color: [300, 80, 80],
            desc: 'Capa semántica'
        }
    };

    p.setup = function () {
        let canvas = p.createCanvas(p.windowWidth, 200, p.P2D);
        canvas.parent('contenedorOjos');
        p.colorMode(p.HSB, 360, 100, 100, 255);
        p.textFont('Arial');
        p.textSize(12);
        p.rectMode(p.CENTER);
        p.textAlign(p.CENTER, p.CENTER);
        p.noStroke();
    };

    p.draw = function () {
        p.background(0);

        // 1. Obtener todas las capas desde el sketch principal
        let allObjs = window.OBJall || [];
        let capas = [];
        for (let obj of allObjs) {
            capas = capas.concat(obj.capas);
        }

        // 2. Agrupar por tipo
        let grupos = {};
        for (let capa of capas) {
            let tipo = capa.constructor.name;
            if (!grupos[tipo]) grupos[tipo] = [];
            grupos[tipo].push(capa);
        }
        let tipos = Object.keys(grupos).sort();

        // 3. Dibujar contador general
        p.fill(255);
        p.textSize(14);
        p.textAlign(p.LEFT, p.TOP);
        p.text("Total de figuras: " + capas.length, margenX, margenY);
        let yPos = margenY + 25;

        // 4. Para cada tipo, dibujar su título y miniaturas
        for (let tipo of tipos) {
            let lista = grupos[tipo];
            let colorTipo = coloresTipo[tipo] || [0, 0, 100];
            let h = colorTipo[0];
            let s = colorTipo[1];
            let b = colorTipo[2];

            // Título del grupo: "Tipo (cantidad)"
            p.fill(255);
            p.textAlign(p.LEFT, p.TOP);
            p.textSize(12);
            let meta = METADATA_TIPO[tipo];
            let titulo = meta.label + " (" + lista.length + ")";
            p.text(titulo, margenX, yPos);

            // Dibujar miniaturas en fila
            let xIcono = margenX + p.textWidth(titulo) + 10;
            let yIcono = yPos - 2;
            let iconosPorFila = p.floor((p.width - xIcono - margenX) / (tamIcono + separacion));
            if (iconosPorFila < 1) iconosPorFila = 1;

            for (let i = 0; i < lista.length; i++) {
                let capa = lista[i];
                let col = i % iconosPorFila;
                let row = p.floor(i / iconosPorFila);
                let x = xIcono + col * (tamIcono + separacion);
                let y = yIcono + row * (tamIcono + separacion);

                p.push();
                p.translate(x + tamIcono / 2, y + tamIcono / 2);

                // Dibujar forma simplificada según tipo (usando el color del grupo)
                p.noStroke();
                let h = meta.color[0];
                let s = meta.color[1];
                let b = meta.color[2];
                p.fill(h,s,b);
                if (tipo === 'Circulos' || tipo === 'Esfera') {
                    p.ellipse(0, 0, tamIcono * 0.8, tamIcono * 0.8);
                } else if (tipo === 'Hexagono') {
                    p.beginShape();
                    for (let i = 0; i < 6; i++) {
                        let ang = p.TWO_PI * i / 6 - p.HALF_PI;
                        p.vertex(tamIcono * 0.4 * p.cos(ang), tamIcono * 0.4 * p.sin(ang));
                    }
                    p.endShape(p.CLOSE);
                } else if (tipo === 'Lineas') {
                    p.stroke(h,s,b );
                    p.strokeWeight(2);
                    p.line(-tamIcono * 0.4, 0, tamIcono * 0.4, 0);
                    p.noStroke();
                } else if (tipo === 'LineaDiscontinua') {
                    p.stroke(h,s,b);
                    p.strokeWeight(2);
                    let paso = 3;
                    for (let d = -tamIcono * 0.4; d < tamIcono * 0.4; d += paso * 2) {
                        p.line(d, -2, d + paso, -2);
                    }
                    p.noStroke();
                } else if (tipo === 'Meandro') {
                    p.stroke(h,s,b );
                    p.strokeWeight(1);
                    p.noFill();
                    p.beginShape();
                    for (let t = 0; t < p.TWO_PI; t += 0.1) {
                        let rx = tamIcono * 0.3 * p.cos(t) + tamIcono * 0.1 * p.cos(3 * t);
                        let ry = tamIcono * 0.3 * p.sin(t) + tamIcono * 0.1 * p.sin(3 * t);
                        p.vertex(rx, ry);
                    }
                    p.endShape();
                    p.noStroke();
                } else if (tipo === 'Ojo') {
                    // Dibujar ojo simplificado
                    let w = tamIcono * 0.8;
                    let hOjo = tamIcono * 0.5;
                    p.fill(h,s,b);
                    p.beginShape();
                    p.vertex(w / 2, 0);
                    p.bezierVertex(w / 4, -hOjo / 2, -w / 4, -hOjo / 2, -w / 2, 0);
                    p.bezierVertex(-w / 4, hOjo / 2, w / 4, hOjo / 2, w / 2, 0);
                    p.endShape(p.CLOSE);
                    p.fill(0);
                    p.ellipse(0, 0, hOjo * 0.3);
                } else if (tipo === 'txtH1') {
                    p.fill(h,s,b);
                    p.rect(0, 0, tamIcono * 0.8, tamIcono * 0.6);
                    p.fill(0);
                    p.textSize(7);
                    p.text(METADATA_TIPO[tipo].label, 0, 0);
                } else {
                    // Genérico: rectángulo
                    p.rect(0, 0, tamIcono * 0.8, tamIcono * 0.8);
                }
                p.pop();
            }

            // Avanzar yPos para el siguiente tipo (más una línea extra)
            let filasUsadas = p.ceil(lista.length / iconosPorFila);
            yPos += 10 + filasUsadas * (tamIcono + separacion);
        }

        // 5. Ajustar altura del canvas según el contenido
        let nuevoAlto = yPos + 20;
        if (nuevoAlto > p.height) {
            p.resizeCanvas(p.width, nuevoAlto);
        }
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.height);
    };
};

// Iniciar el sketch secundario en modo instancia
new p5(sketchFiguras);