// 011.js
let observaciones = [];
let datosCargados = false;
let contadorTotal = 0;
let tooltip = null;
const MARGEN = 100; // margen en píxeles para evitar que los puntos toquen el borde

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  noLoop();
  cargarDatosDesdeEBird();
  print("Presiona 'r' para recargar datos con un país aleatorio.");
}

function draw() {
  background(0, 0, 0);

  if (!datosCargados) return;

  // Info general
  fill(255);
  noStroke();
  textSize(24);
  textAlign(LEFT, TOP);
  text(paisActual.nombre, 10, 10);
  textSize(18);
  text("Observaciones: " + contadorTotal, 10, 40);
  textSize(14);
  text("eBird API", 10, 65);

  

  // Bounding box (con margen)
  noFill();
  stroke(255, 100);
  strokeWeight(1);
  let xMin = map(paisActual.lngMin, paisActual.lngMin, paisActual.lngMax, MARGEN, width - MARGEN);
  let xMax = map(paisActual.lngMax, paisActual.lngMin, paisActual.lngMax, MARGEN, width - MARGEN);
  let yMin = map(paisActual.latMin, paisActual.latMin, paisActual.latMax, height - MARGEN, MARGEN);
  let yMax = map(paisActual.latMax, paisActual.latMin, paisActual.latMax, height - MARGEN, MARGEN);
  //rect(xMin, yMin, xMax - xMin, yMax - yMin);

  // Dibujar puntos (con margen)
  noStroke();
  for (let i = 0; i < observaciones.length; i++) {
    let obs = observaciones[i];
    let x = map(obs.lng, paisActual.lngMin, paisActual.lngMax, MARGEN, width - MARGEN);
    let y = map(obs.lat, paisActual.latMin, paisActual.latMax, height - MARGEN, MARGEN);
    let radio = 4 + sqrt(obs.howMany || 1) * 2;
    let hue = (hashString(obs.comName || '') % 360);
    fill(hue, 80, 90, 180);
    ellipse(x, y, radio * 2, radio * 2);
  }

  // Dibujar ciudades
  fill(255, 0, 0);
  noStroke();
  for (let ciudad of CIUDADES_LATAM) {
    if (ciudad.pais === paisActual.nombre) {
      let x = map(ciudad.lng, paisActual.lngMin, paisActual.lngMax, MARGEN, width - MARGEN);
      let y = map(ciudad.lat, paisActual.latMin, paisActual.latMax, height - MARGEN, MARGEN);
      ellipse(x, y, 6, 6); // punto rojo
      // Opcional: etiqueta
      fill(255);
      textSize(14);
      textAlign(LEFT, BOTTOM);
      text(ciudad.nombre, x + 8, y - 4);
    }
  }

  // --- TOOLTIP (con margen) ---
  if (tooltip) {
    let x = map(tooltip.lng, paisActual.lngMin, paisActual.lngMax, MARGEN, width - MARGEN);
    let y = map(tooltip.lat, paisActual.latMin, paisActual.latMax, height - MARGEN, MARGEN);

    // Resaltar punto
    noFill();
    stroke(255, 200);
    strokeWeight(2);
    let radio = 4 + sqrt(tooltip.howMany || 1) * 2;
    ellipse(x, y, radio * 2 + 10, radio * 2 + 10);

    // Fondo del tooltip
    fill(0, 0, 0, 200);
    noStroke();
    let texto = tooltip.comName + " (" + (tooltip.howMany || 1) + " ind.)";
    if (tooltip.obsDt) {
      texto += " " + tooltip.obsDt;
    }
    let anchoTexto = textWidth(texto) + 20;
    let altoTexto = 30;
    let tx = x - anchoTexto / 2;
    let ty = y - radio - 20 - altoTexto;

    // Asegurar que no se salga del margen
    if (tx < MARGEN) tx = MARGEN;
    if (tx + anchoTexto > width - MARGEN) tx = width - MARGEN - anchoTexto;
    if (ty < MARGEN) ty = y + radio + 10;
    rect(tx, ty, anchoTexto, altoTexto);

    // Texto del tooltip
    fill(255);
    textSize(12);
    textAlign(LEFT, TOP);
    text(texto, tx + 10, ty + 8);
  }

}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

async function cargarDatosDesdeEBird() {
    seleccionarPaisAleatorio();

    // --- OBTENER BOUNDS REALES DESDE eBIRD ---
    try {
        const boundsUrl = `https://api.ebird.org/v2/ref/region/info/${paisActual.codigo}`;
        const boundsResponse = await fetch(boundsUrl, {
            headers: { 'X-eBirdApiToken': EBIRD_API_KEY }
        });
        if (boundsResponse.ok) {
            const boundsData = await boundsResponse.json();
            if (boundsData.bounds) {
                paisActual.lngMin = boundsData.bounds.minX;
                paisActual.lngMax = boundsData.bounds.maxX;
                paisActual.latMin = boundsData.bounds.minY;
                paisActual.latMax = boundsData.bounds.maxY;
                console.log(`✅ Bounds reales de ${paisActual.nombre}:`, paisActual.lngMin, paisActual.lngMax, paisActual.latMin, paisActual.latMax);
            }
        } else {
            console.warn(`⚠️ No se pudieron obtener bounds para ${paisActual.nombre}, usando valores por defecto.`);
        }
    } catch (error) {
        console.warn('⚠️ Error obteniendo bounds de eBird, usando valores por defecto:', error);
    }

    // --- CARGAR OBSERVACIONES ---
    observaciones = [];
    contadorTotal = 0;

    const url = `https://api.ebird.org/v2/data/obs/${paisActual.codigo}/recent` + EBIRD_PARAMS;

    try {
        const response = await fetch(url, {
            headers: { 'X-eBirdApiToken': EBIRD_API_KEY }
        });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();

        for (let obs of data) {
            if (obs.lng >= paisActual.lngMin && obs.lng <= paisActual.lngMax &&
                obs.lat >= paisActual.latMin && obs.lat <= paisActual.latMax) {
                observaciones.push(obs);
                contadorTotal++;
            }
        }
        console.log('Observaciones en ' + paisActual.nombre + ': ' + contadorTotal);
    } catch (error) {
        console.error('Error cargando observaciones de eBird:', error);
    }

    datosCargados = true;
    redraw();
}

function keyPressed() {
  if (key === 'r') {
    cargarDatosDesdeEBird();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function mouseMoved() {
  if (!datosCargados || observaciones.length === 0) {
    tooltip = null;
    redraw();
    return;
  }

  let mejorDistancia = Infinity;
  let mejorObs = null;

  // Usar el mismo mapeo con margen para calcular distancias
  for (let obs of observaciones) {
    let x = map(obs.lng, paisActual.lngMin, paisActual.lngMax, MARGEN, width - MARGEN);
    let y = map(obs.lat, paisActual.latMin, paisActual.latMax, height - MARGEN, MARGEN);
    let d = dist(mouseX, mouseY, x, y);
    if (d < mejorDistancia) {
      mejorDistancia = d;
      mejorObs = obs;
    }
  }

  if (mejorDistancia < 30) {
    tooltip = mejorObs;
  } else {
    tooltip = null;
  }
  redraw();
}