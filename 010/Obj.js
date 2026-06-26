class MiObj {
  constructor(posX, posY, intensidad) {
    this.x = posX;
    this.y = posY;
    this.intensidad = intensidad;
    this.capas = [];
    if (typeof constructorCapas !== 'undefined') {
      constructorCapas.forEach(lcon => {
        let picker = random(1);
        let pesoAjustado = lcon.weight * (0.5 + this.intensidad * 0.5);
        if (picker < pesoAjustado) {
          this.capas.push(lcon.init(this.intensidad));
        }
      });
    }
  }

  render() {
    push();
    translate(this.x, this.y);
    this.capas.forEach(capa => {
      capa.render();
    });
    pop();
  }
}