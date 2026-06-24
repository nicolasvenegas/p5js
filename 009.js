let estaciones = [];
let margen = 30;

// Límites geográficos de Chile (Norte a Sur)
const LAT_NORTE = -30;
const LAT_SUR = -42;

// Función para obtener color según concentración y contaminante
function getColorPorValor(valor, contaminante) {
  // Umbrales MP 2.5 (µg/m³)
  if (contaminante.includes('2,5') || contaminante.includes('2.5')) {
    if (valor <= 50) return [0, 200, 100];
    if (valor <= 80) return [255, 200, 0];
    if (valor <= 110) return [255, 150, 0];
    if (valor <= 180) return [255, 100, 0];
    if (valor <= 250) return [255, 50, 0];
    return [200, 0, 0];
  }
  
  // Umbrales MP 10 (µg/m³N)
  if (contaminante.includes('MP 10') || contaminante.includes('MP-10')) {
    if (valor <= 100) return [0, 200, 100];
    if (valor <= 150) return [255, 200, 0];
    if (valor <= 200) return [255, 150, 0];
    if (valor <= 350) return [255, 100, 0];
    if (valor <= 500) return [255, 50, 0];
    return [200, 0, 0];
  }
  
  // Umbrales SO₂ (µg/m³N)
  if (contaminante.includes('azufre') || contaminante.includes('SO₂')) {
    if (valor <= 200) return [0, 200, 100];
    if (valor <= 500) return [255, 200, 0];
    if (valor <= 800) return [255, 150, 0];
    if (valor <= 1200) return [255, 100, 0];
    if (valor <= 2000) return [255, 50, 0];
    return [200, 0, 0];
  }
  
  // Umbrales genéricos
  if (valor <= 50) return [0, 200, 100];
  if (valor <= 80) return [255, 200, 0];
  if (valor <= 110) return [255, 150, 0];
  if (valor <= 180) return [255, 100, 0];
  if (valor <= 250) return [255, 50, 0];
  return [200, 0, 0];
}

// Límites para el eje X (concentración)
let minConcentracion = 0;
let maxConcentracion = 110;
let maxOriginal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadJSON('https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/', gotData);
}

function gotData(data) {
  if (Array.isArray(data)) {
    estaciones = data;
    console.log('🌿 Estaciones cargadas:', estaciones.length);
    
    let maxVal = 0;
    let valores = [];
    for (let estacion of estaciones) {
      if (estacion.realtime && Array.isArray(estacion.realtime)) {
        for (let contaminante of estacion.realtime) {
          if (contaminante.tableRow && contaminante.tableRow.value !== undefined) {
            let val = float(contaminante.tableRow.value);
            if (val > 0) {
              valores.push(val);
              if (val > maxVal) maxVal = val;
            }
          }
        }
      }
    }
    
    maxOriginal = maxVal;
    console.log('📊 Rango de concentración: 0 -', maxOriginal);
    
    let sorted = valores.sort((a,b) => a-b);
    if (sorted.length > 0) {
      if (maxVal > 110) {
        let puntosSobre110 = valores.filter(v => v > 110).length;
        if (puntosSobre110 < 3) {
          let valoresBajos = valores.filter(v => v <= 110);
          if (valoresBajos.length > 0) {
            let maxBajo = Math.max(...valoresBajos);
            maxConcentracion = Math.ceil(maxBajo / 10) * 10 + 5;
          } else {
            maxConcentracion = 110;
          }
        } else {
          maxConcentracion = Math.ceil(maxVal / 10) * 10 + 5;
        }
      } else {
        maxConcentracion = Math.ceil(maxVal / 10) * 10 + 5;
      }
    }
    
    if (maxConcentracion < 50) maxConcentracion = 50;
    console.log('📊 Rango final del eje X: 0 -', maxConcentracion);
    
    if (estaciones.length > 0) {
      console.log('📊 Ejemplo de estación:', estaciones[0]);
    }
  } else {
    console.error('❌ Datos no reconocidos:', data);
  }
}

function draw() {
  background(30);
  
  if (estaciones.length === 0) {
    textSize(24);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Cargando estaciones...', width/2, height/2);
    return;
  }
  
  // --- DIBUJAR EJES ---
  dibujarEjes();
  
  // --- PROCESAR Y DIBUJAR DATOS ---
  let datosGrafico = [];
  
  for (let estacion of estaciones) {
    let lat = float(estacion.latitud || estacion.lat || 0);
    let nombre = estacion.nombre || estacion.estacion || 'Sin nombre';
    
    if (lat === 0) continue;
    
    let concentracion = 0;
    let ica = 0;
    let contaminante = '';
    
    if (estacion.realtime && Array.isArray(estacion.realtime) && estacion.realtime.length > 0) {
      let primerContaminante = estacion.realtime[0];
      
      if (primerContaminante.tableRow) {
        if (primerContaminante.tableRow.value !== undefined) {
          concentracion = float(primerContaminante.tableRow.value);
        }
        if (primerContaminante.tableRow.icap !== undefined) {
          ica = float(primerContaminante.tableRow.icap);
        }
        if (primerContaminante.tableRow.parameter) {
          contaminante = primerContaminante.tableRow.parameter;
        }
      }
    }
    
    let color = getColorPorValor(concentracion, contaminante);
    
    datosGrafico.push({
      lat: lat,
      nombre: nombre,
      concentracion: concentracion,
      ica: ica,
      color: color,
      contaminante: contaminante
    });
  }
  
  // Ordenar por latitud (de norte a sur)
  datosGrafico.sort((a, b) => a.lat - b.lat);
  
  // --- DIBUJAR CADA ESTACIÓN ---
  for (let item of datosGrafico) {
    // EJE X: Concentración
    let x;
    if (item.concentracion > maxConcentracion) {
      x = width - margen;
    } else {
      x = map(item.concentracion, minConcentracion, maxConcentracion, margen, width - margen);
    }
    
    // EJE Y: Latitud
    let y = map(item.lat, LAT_NORTE, LAT_SUR, margen, height - margen);
    
    // Tamaño según ICA
    let tamanio = 3; //item.ica > 0 ? map(item.ica, 0, 300, 2, 10) : 12;
    tamanio = constrain(tamanio, 6, 30);
    
    // --- DIBUJAR CÍRCULO ---
    let color = item.color;
    noStroke();
    fill(color[0], color[1], color[2], 220);
    ellipse(x, y, tamanio, tamanio);
    
    // Borde blanco
    stroke(255, 80);
    strokeWeight(0.5);
    noFill();
    ellipse(x, y, tamanio, tamanio);
    noStroke();
    
    // Si el valor excede el rango, dibujar flecha
    if (item.concentracion > maxConcentracion) {
      push();
      fill(255, 200, 0);
      noStroke();
      triangle(x - 5, y - 5, x - 5, y + 5, x + 3, y);
      textSize(7);
      textAlign(LEFT, CENTER);
      text('>' + item.concentracion.toFixed(0), x + 8, y);
      pop();
    }
    
    // --- ETIQUETA DEL LUGAR (SOLO EL NOMBRE) ---
    push();
    fill(255, 220);
    textSize(8);
    textAlign(LEFT, CENTER);
    
    /* if (x < width - 100) {
      text(item.nombre, x + tamanio/2 + 4, y);
    } else {
      textAlign(RIGHT, CENTER);
      text(item.nombre, x - tamanio/2 - 4, y);
    } */
    pop();
  }
}

function dibujarEjes() {
  // EJE X: Concentración
  stroke(100);
  strokeWeight(1);
  line(margen, height - margen, width - margen, height - margen);
  
  // EJE Y: Latitud
  line(margen, margen, margen, height - margen);
  
  // Etiquetas de concentración (eje X)
  push();
  fill(150);
  textSize(10);
  textAlign(CENTER, TOP);
  
  let steps = 5;
  for (let i = 0; i <= steps; i++) {
    let val = minConcentracion + (maxConcentracion - minConcentracion) * (i / steps);
    let x = margen + (i / steps) * (width - 2 * margen);
    
    stroke(100);
    line(x, height - margen, x, height - margen + 8);
    noStroke();
    fill(150);
    text(val.toFixed(0), x, height - margen + 12);
    
    stroke(100, 40);
    strokeWeight(0.5);
    line(x, margen, x, height - margen);
  }
  pop();
  
  // Etiquetas de latitud (eje Y)
  push();
  fill(150);
  textSize(10);
  textAlign(RIGHT, CENTER);
  
  let latitudes = [-20, -25, -30, -35, -40, -45, -50, -55];
  for (let lat of latitudes) {
    let y = map(lat, LAT_NORTE, LAT_SUR, margen, height - margen);
    stroke(100);
    line(margen - 8, y, margen, y);
    noStroke();
    fill(150);
    text(lat + '°', margen - 12, y);
    
    stroke(100, 40);
    strokeWeight(0.5);
    line(margen, y, width - margen, y);
  }
  pop();
  
  // Títulos de ejes (SOLO ESTOS TEXTO PERMANECEN)
  push();
  fill(200);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Concentración del Contaminante (µg/m³)', width/2, height - 25);
  
  push();
  translate(20, height/2);
  rotate(-PI/2);
  textAlign(CENTER, BOTTOM);
  text('Latitud (Norte → Sur)', 0, 0);
  pop();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}