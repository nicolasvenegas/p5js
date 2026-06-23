let h, s, b;
let gama = 0;
let table;
const OBJ = 300;
const TROZOS = 6;
let contadorSvg = 0;

const capas = [];


function preload() {
    table = loadTable("colors.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight, SVG);
    background(0);
    //createCanvas(600, 600, SVG);
    colorMode(HSB, 360, 100, 100, 255);
    noLoop();
    frameRate(12);
    angleMode(DEGREES);
    rectMode(CENTER);
    ellipseMode(CENTER);
    noFill();
    smooth(1);
    setInterval(draw, 10000);
}

function draw() {
    background(0, 0, 0, 255);

    const capas = []; 
    constructorCapas.forEach(lcon => {
        let picker = random(1);
        if(picker < lcon.weight){
            capas.push(lcon.init())
        }
    })
    capas.forEach(capa => {
        capa.render();
        print(capa)
    })
       
    
}





function keyPressed(){
    
    if(key == 's'){
        contadorSvg++;
        let nombreSvg = 'exportaciones/' + 'out' + nf(contadorSvg, 3) + '.svg';
        save(nombreSvg);
    }
}