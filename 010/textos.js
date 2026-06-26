function tituloH1() {
    push();
    
    // Calcular tamaño para que ocupe todo el ancho
    let texto = "LOS OJOS";
    let tamaño = width * 0.18;  // 28% del ancho para que quepa bien
    let offsetY = sin(tiempoAnimacion * 0.7) * 15;
    let rotacion = sin(tiempoAnimacion * 0.3) * 0.02;
    
    // Efecto glow
    drawingContext.shadowColor = `rgba(255, 255, 255, ${alpha/500})`;
    drawingContext.shadowBlur = 80;
    
    // Texto principal
    
    fill(255,100,70);
    
    noStroke();
    textSize(tamaño);
    textAlign(CENTER, CENTER);
    textFont('Helvetica');
    textStyle(BOLD);
    
    translate(width/2, height/2 + offsetY);
    rotate(rotacion);
    text(texto, 0, 0);
    
    // Resetear sombra
    drawingContext.shadowBlur = 0;
    pop();
}