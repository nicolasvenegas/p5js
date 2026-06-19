class Matriz {
  constructor(numAcrossX, numAcrossY, frame, offsetX, offsetY, rez1, rez2, seed) {
    this.numAcrossX = numAcrossX;
    this.numAcrossY = numAcrossY;
    this.frame = frame;
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 0;
    this.rez1 = rez1 || 0.001;
    this.rez2 = rez2 || 0.004;
    this.gridX = (width - frame) / numAcrossX;
    this.gridY = (height - frame) / numAcrossY;
    this.seed =  floor(random(1000000));
    this.palette = floor(random(20));
    this.coloresDisponibles = [];
    this.puntos = [];
    this.seed = seed !== undefined ? seed : floor(random(1000000));
  }

  // Configurar colores
  setColores() {
    randomSeed(this.seed);
    noiseSeed(this.seed);

    let bgCol = floor(random(5));
    getColor(this.palette, bgCol);

    for (let i = 0; i < 5; i++) {
      if (i !== bgCol) {
        getColor(this.palette, i);
        this.coloresDisponibles.push({ h: h, s: s, b: b });
      }
    }
  }

  // Generar puntos
  generarPuntos() {
    for (let x = this.frame; x < width - this.frame; x += this.gridX) {
      for (let y = this.frame; y < height - this.frame; y += this.gridY) {
        this.puntos.push({
          x: x + this.gridX / 2 + this.offsetX,
          y: y + this.gridY / 2 + this.offsetY,
          colorIndex: floor(random(this.coloresDisponibles.length)),
          n1: noise(x * this.rez1, y * this.rez1) + 0.3,
          n2: noise(x * this.rez2 * 0.1, y * this.rez2 *0.16),
          selectShape: random(3)
        });
      }
    }
  }

  // Dibujar puntos
  dibujar() {
    for (let p of this.puntos) {
      let nCombinado = (p.n1 + p.n2) / 2;
      let nColor = floor(map(nCombinado, 0.43, 0.52, 0, 1));
      let nSizeEllipse = floor(map(nCombinado, 0.05, 0.2, 0, 1));
      let nsAng = floor(map(p.n1, 0, 1, 0, 360));

      getColor(this.palette, nColor);

      let anguloRotacion = nsAng * 12;
      let tamanioEllipse = random(this.gridX * nSizeEllipse * 0.117, this.gridY * nSizeEllipse * 0.12);

      push();
      translate(p.x, p.y);
      rotate(anguloRotacion);
      blendMode(ADD);
      fill(h, s, b, 255);
      noStroke();
      ellipse(0, 0, tamanioEllipse);
      pop();
    }
  }

  // Método principal
  run() {
    this.setColores();
    this.generarPuntos();
    this.dibujar();
    print("paleta " + this.palette + " semilla " + this.seed);
  }
}