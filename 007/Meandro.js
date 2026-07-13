class Meandro {
  constructor(posX, posY, len, ang, paleta, colMeandro, margen) {
    this.x = posX || width / 2;
    this.y = posY || height / 2;
    this.ang = ang || random(PI * 2);
    this.len = len || width * 0.9;
    this.paleta = paleta !== undefined ? paleta : floor(random(21));
    this.colMeandro = colMeandro !== undefined ? colMeandro : floor(random(5));
    this.margen = margen || 0;
    this.puntos = [];
    this.generarPuntos();
  }

  generarPuntos() {
    this.puntos = [];
    let x = this.x;
    let y = this.y;
    let ang = this.ang;

    for (let i = 0; i < 1000; i++) {
      let newX = cos(ang) * this.len + x;
      let newY = sin(ang) * this.len + y;

      // Limitar dentro de la pantalla
      newX = constrain(newX, this.margen, width - this.margen);
      newY = constrain(newY, this.margen, height - this.margen);

      this.puntos.push({ x: newX, y: newY });

      x = newX;
      y = newY;
      ang += random(-PI * 0.11, PI * 0.18);
    }

    // Guardar último estado para continuar
    this.x = x;
    this.y = y;
    this.ang = ang;
  }

  dibujar() {
    
    // Obtener color
    getColor(this.paleta, this.colMeandro);

    strokeWeight(3);
    noFill();

    beginShape();
    for (let i = 0; i < this.puntos.length; i++) {
      stroke(h, s, b, 55);
      curveVertex(this.puntos[i].x, this.puntos[i].y);
    }
    endShape();

    beginShape();
    for (let j = 0; j < this.puntos.length; j += 300) {
      blendMode(DIFFERENCE);
      rectMode(CENTER);
noStroke();
      
      fill(h, s, b, 255);
      ellipse(this.puntos[j].x, this.puntos[j].y, 15);
      let pX = this.puntos.x;
      let pY = this.puntos.y;
      noStroke();
      fill(0, 0, 50, 255);
      textSize(12);
      text(`x ${floor(this.puntos[j].x)} y ${floor(this.puntos[j].y)}`, this.puntos[j].x + 15, this.puntos[j].y + 5);
      noFill();
    }
    stroke(h, s, b, 255);
    endShape();
  }

  // Método para regenerar con nuevos parámetros
  regenerar(nuevaPaleta, nuevoColor) {
    if (nuevaPaleta !== undefined) this.paleta = nuevaPaleta;
    if (nuevoColor !== undefined) this.colMeandro = nuevoColor;
    this.generarPuntos();
  }
}