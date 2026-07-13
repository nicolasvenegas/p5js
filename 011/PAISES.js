// PAISES_LATAM.js
const PAISES_LATAM = [
    { nombre: "México", codigo: "MX", lngMin: -118, lngMax: -86, latMin: 14, latMax: 33 },
    { nombre: "Guatemala", codigo: "GT", lngMin: -92, lngMax: -88, latMin: 13, latMax: 18 },
    { nombre: "Belice", codigo: "BZ", lngMin: -89, lngMax: -88, latMin: 15, latMax: 19 },
    { nombre: "Honduras", codigo: "HN", lngMin: -89, lngMax: -83, latMin: 12, latMax: 17 },
    { nombre: "El Salvador", codigo: "SV", lngMin: -90, lngMax: -87, latMin: 13, latMax: 15 },
    { nombre: "Nicaragua", codigo: "NI", lngMin: -88, lngMax: -83, latMin: 10, latMax: 15 },
    { nombre: "Costa Rica", codigo: "CR", lngMin: -87, lngMax: -82, latMin: 8, latMax: 11 },
    { nombre: "Panamá", codigo: "PA", lngMin: -83, lngMax: -77, latMin: 7, latMax: 10 },
    { nombre: "Colombia", codigo: "CO", lngMin: -79, lngMax: -66, latMin: -4, latMax: 13 },
    { nombre: "Venezuela", codigo: "VE", lngMin: -74, lngMax: -59, latMin: 0, latMax: 13 },
    { nombre: "Ecuador", codigo: "EC", lngMin: -82, lngMax: -75, latMin: -5, latMax: 2 },
    { nombre: "Perú", codigo: "PE", lngMin: -82, lngMax: -68, latMin: -18, latMax: 0 },
    { nombre: "Bolivia", codigo: "BO", lngMin: -70, lngMax: -57, latMin: -23, latMax: -9 },
    { nombre: "Brasil", codigo: "BR", lngMin: -75, lngMax: -35, latMin: -35, latMax: 5 },
    { nombre: "Paraguay", codigo: "PY", lngMin: -63, lngMax: -54, latMin: -28, latMax: -19 },
    { nombre: "Uruguay", codigo: "UY", lngMin: -58, lngMax: -53, latMin: -35, latMax: -30 },
    { nombre: "Argentina", codigo: "AR", lngMin: -75, lngMax: -55, latMin: -55, latMax: -22 },
    { nombre: "Chile", codigo: "CL", lngMin: -75, lngMax: -65, latMin: -55, latMax: -18 },
    { nombre: "Guyana", codigo: "GY", lngMin: -61, lngMax: -56, latMin: 1, latMax: 9 },
    { nombre: "Surinam", codigo: "SR", lngMin: -58, lngMax: -54, latMin: 1, latMax: 6 },
    { nombre: "Guayana Francesa", codigo: "GF", lngMin: -54, lngMax: -51, latMin: 2, latMax: 6 },
    { nombre: "Cuba", codigo: "CU", lngMin: -85, lngMax: -74, latMin: 19, latMax: 24 },
    { nombre: "República Dominicana", codigo: "DO", lngMin: -72, lngMax: -68, latMin: 17, latMax: 20 },
    { nombre: "Puerto Rico", codigo: "PR", lngMin: -67, lngMax: -65, latMin: 17, latMax: 19 },
    { nombre: "Jamaica", codigo: "JM", lngMin: -78, lngMax: -76, latMin: 17, latMax: 19 },
    { nombre: "Trinidad y Tobago", codigo: "TT", lngMin: -62, lngMax: -60, latMin: 10, latMax: 12 }
];

let paisActual = PAISES_LATAM[0];

function seleccionarPaisAleatorio() {
    paisActual = random(PAISES_LATAM);
    console.log("📍 País seleccionado:", paisActual.nombre);
    return paisActual;
}

