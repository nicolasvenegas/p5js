class Obj{
    constructor(posX, posY){
        this.x = posX;
        this.y = posY;
        this.capas = [];
            constructorCapas.forEach(lcon => {
                let picker = random(1);
                if (picker < lcon.weight) {
                    this.capas.push(lcon.init())
                }
            })
        
    }
    render(){
        push();
        translate(this.x, this.y);
        this.capas.forEach(capa => {
            capa.render();
            print(capa)
        })
        pop();
    }
}