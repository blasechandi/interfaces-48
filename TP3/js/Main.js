"use strict"

let canvas = document.querySelector('canvas');

canvas.width = 1370;
canvas.height = 600;

let ctx = canvas.getContext('2d');

let angel = document.getElementById("angel");
let diablo =  document.getElementById("diablo");



//Inicialización de variables
let width = canvas.width;
let height = canvas.height;
let turno = 1;
let isMouseDown = false;
let lastClickedFigure = null;
let caeLaFicha = false;
let juegoFinalizado = false;
let filas = 0;
let columnas = 0;
let tam_ficha = 0;
let num_ganador = 0;
let radio = 0;
let tablero = null;
let difPosicion = 0;
let timing = 0;
let fichaJ1 = "";
let fichaJ2 = "";
let mapa = "";
let posicionYFichasJ1 = 0;
let posicionYFichasJ2 = 0;
let fichasJ1 = [];
let fichasJ2 = [];
let fichas = [];



//Primer metodo para inicializar el juego, modularizado en varias funciones
function inicializar(){
    configurarJuego();
    configurarJugadores();
    crearFichas();
    crearTablero();
    drawFigure();
    setTimeout(function(){
        iniciarTimer();
    }, 800);
}



//Configurarmos las variables del juego
function configurarJuego() {
    let select = elegirModo();
    filas = select[0];
    columnas = select[1];
    num_ganador = select[2];
    tam_ficha = select[3];
    radio = select[4];
    difPosicion = select[5];
    timing = select[6];
    let margen_tablero = height - filas*tam_ficha;     // 120 margen
    posicionYFichasJ1 = (filas-1/2)*tam_ficha + margen_tablero;
    posicionYFichasJ2 = (filas-1/2)*tam_ficha + margen_tablero;
}

//Inicializacion de variables para el juego
function elegirModo(){
    let modo = 4; 
    let var_tablero = [];
    let filas, columnas, numero_ganador;
    //variables para 4 en linea
    if (modo == 4) {
        filas = 6;
        var_tablero.push(filas);
        columnas = 7;
        var_tablero.push(columnas);
        numero_ganador = 4;
        var_tablero.push(numero_ganador);
        tam_ficha = 80;
        var_tablero.push(tam_ficha);
        radio = 33;
        var_tablero.push(radio);
        difPosicion = (radio/4*3);
        var_tablero.push(difPosicion);
        timing = 90;
        var_tablero.push(timing);
    }
    return var_tablero;
}


function iniciarTimer() {
    let totalTime = timing; // Tiempo en segundos 
    const timerDisplay = document.getElementById("timer-display");

    const timerInterval = setInterval(() => {
        // Calcula minutos y segundos restantes
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        // Formatea el tiempo en mm:ss
        timerDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (totalTime <= 0) {
            clearInterval(timerInterval); // Detenemos el temporizador
            juegoFinalizado = true;
            mostrarMensajeTiempoFuera(); // Muestra mensaje de tiempo agotado 
        }

        totalTime--; // Decrementa el tiempo en 1 segundo
    }, 1000); // 1000 ms = 1 segundo
}


// funcion para detener el temporizador
function detenerTimer() {
    clearInterval(timerInterval);
}


// funcion para reiniciar el temporizador
function reiniciarTimer() {
    detenerTimer(); // Detenemos cualquier temporizador en marcha
    iniciarTimer(); // Reiniciamos el temporizador
}


// funcion para mostrar el mensaje de tiempo agotado
function mostrarMensajeTiempoFuera() {
    let mensajeTiempoFuera = document.getElementById("mensaje-tiempo-fuera");
    mensajeTiempoFuera.classList.remove("none"); // Asegúrate de que el mensaje esté visible
}


// Inicializacion de la ficha de cada jugador
function configurarJugadores(){
    fichaJ1 = 'images/angel.png';
    fichaJ2 = 'images/diablo.png';   
}


//Permite instanciar las fichas, antes de dibujarlas
function crearFichas(){
    let cant_fichas = filas * columnas / 2;
    let posInicial = width/2 + (columnas/2*tam_ficha) + tam_ficha*1.5;

    for(let i = 0; i<cant_fichas; i++){
        let ficha = new Ficha(canvas.width-posInicial, posicionYFichasJ1, "yellow", ctx, radio, 1, fichaJ1);
        posicionYFichasJ1 = posicionYFichasJ1 - difPosicion;
        fichas.push(ficha);
        fichasJ1.push(ficha);
    }

    for(let i = 0; i<cant_fichas; i++){
        let ficha = new Ficha(posInicial, posicionYFichasJ2, "brown", ctx, radio, 2, fichaJ2);
        posicionYFichasJ2 = posicionYFichasJ2 - difPosicion;
        fichas.push(ficha);
        fichasJ2.push(ficha);
    }

}

//Instanciar tablero
function crearTablero(){
    tablero = new Tablero(ctx, width, height, filas, columnas, "green", tam_ficha);
}

//Crea el resto de figuras
function drawFigure(){
    clearCanvas();
    tablero.setTableroDibujado(false);
    drawTablero();
    drawFichas();
}

//Dibuja el tablero
function drawTablero(){
        tablero.draw();
}

//Dibuja las fichas, guardadas en el arreglo
function drawFichas(){
    for(let i = 0; i<fichas.length; i++){
        fichas[i].draw();
    }
}

//Borra la totalidad del canvas
function clearCanvas(){
    ctx.fillStyle = '#0C1935';
    ctx.fillRect(0, 0, width, height);
}


//Se ejecuta cuando el mouse esté presionado
function onMouseDown(e){        //click para abajo
    isMouseDown = true;

    if (lastClickedFigure != null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX , e.layerY) //coordenadas x e y dentro del canvas 
    if (clickFig != null){
        lastClickedFigure = clickFig;
    }
    drawFigure();
}


//Se ejecuta cuando el mouse se mueve
function onMouseMove(e){            //mantengo el click para abajo y puedo mover la figura
    if (isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX , e.layerY);
        drawFigure();
    }
}

function onMouseUp(e) {
    isMouseDown = false;
    
    // aca verifico si hay una ficha seleccionada
    if (!lastClickedFigure) {
        return;
    }

    // verificamos q la ficha se encuentre en el area de tiro (arriba de la primer fila), sino la vuelvo donde estaba
    if (!seEncuentraEnArea(lastClickedFigure)) {
        lastClickedFigure.setOrigenPosition();
        drawFigure();
        return;
    }
    // Si no entro en ningun if, significa que esta en una pos que se puede tirar la ficha
    // obtengo la columna y la pos del movimiento 
    let posColumn = tablero.getColumn(lastClickedFigure);
    let movimiento = tablero.getHeight(posColumn);
    let posRow = tablero.fillSpace(lastClickedFigure, posColumn);

    // Si hay espacio en la columna
    if (posRow >= 0) {
        // Colocar la figura en el tablero
        lastClickedFigure.setResaltado(false);
        lastClickedFigure.setDisable(true);
        lastClickedFigure.setPosX(tablero.getColumnPos(posColumn));
        lastClickedFigure.setPosY(tablero.getPosY());
        lastClickedFigure.setIsDropped(true);
        
        drawFigure();
        
        caeLaFicha = true;
        dropFigure(lastClickedFigure, lastClickedFigure.getPosY() + movimiento, posRow, posColumn);
    } else {
        // si la columna esta completa, devuelvo la figura a donde estaba
        lastClickedFigure.setOrigenPosition();
        drawFigure();
    }
}


function seEncuentraEnArea(figure) {
    let tableroIzq = (width - tam_ficha * columnas) / 2;
    let tableroDer = tableroIzq + tam_ficha * columnas;
    let tableroAltura = (height - tam_ficha * filas) / 2;

    let fichaX = figure.getPosX();
    let fichaY = figure.getPosY();

    return (fichaX > tableroIzq && fichaX < tableroDer && fichaY < tableroAltura);
}

//Aca hacemos la animacion de caida de ficha, y a la vez marcamos el conjunto de fichas ganador
function dropFigure(figure, height, posRow, posColumn) {
    function animate() {
        if (figure.getPosY() < height) {
            figure.setPosY(figure.getPosY() + 2); // el valor 2, mientras mas alto o bajo sea el numero, mas rapido o lento va a caer la ficha
            drawFigure();
            requestAnimationFrame(animate);  // esto ayuda con animaciones más fluidas y eficientes al sincronizarlas con los hz del monitor
        } else {
            caeLaFicha = false;
            cambiarTurno();
            if (tablero.esGanador(posRow, posColumn, figure.getJugador(), num_ganador)) {
                tablero.getConjuntoGanador().forEach(f => f.setResaltado(true));
                drawFigure();
                terminaJuego(figure.getJugador());
            }
        }
    }

    animate(); //  funcion que se llama recursivamente en requestAnimationFrame hasta que la ficha alcanza la posición final (height)
}


function findClickedFigure(x, y){
    if(!caeLaFicha && !juegoFinalizado){
        let aux = [];
        if(turno == 1){
            aux = fichasJ1;
        }else{
            aux = fichasJ2;
        }
        for(let i = aux.length-1; i >= 0; i--){
            const element = aux[i];
            if(element.isPointInside(x, y)){
                return element;
            }
        }
    }
}

//Pop-up de ganador
function terminaJuego(jugador){
    if (jugador == 1) {
        let mensajeGanador = document.getElementById("mensaje-ganadorAngel");
        mensajeGanador.classList.remove("none");
    } else {
        let mensajeGanador = document.getElementById("mensaje-ganadorDemonio");
        mensajeGanador.classList.remove("none");
    }
    juegoFinalizado=true;
    detenerTimer();
}



//Permite cambiar el turno del jugador
function cambiarTurno(){
    if(turno == 1){
        turno = 2;
    }else{
        turno = 1;
    }
}


function restart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    detenerTimer();
    reiniciarVariables();
    clearMensajes();
    clearCanvas();
    inicializar();
}

function detenerTimer() {
    clearInterval(timing);
}

//Reinicio variables, para el restart
function reiniciarVariables(){
    // No "reiniciamos" el turno a 1, ya que de esta manera al reiniciar el juego, empieza el jugador contrario al ultimo que tiro la ficha en el juego pasado
    isMouseDown = false;
    lastClickedFigure = null;
    caeLaFicha = false;
    juegoFinalizado = false;
    filas = 0;
    columnas = 0;
    tam_ficha = 0;
    num_ganador = 0;
    radio = 0;
    tablero = null;
    difPosicion = 0;
    timing = 0;
    fichaJ1 = "";
    fichaJ2 = "";
    posicionYFichasJ1 = 0;
    posicionYFichasJ2 = 0;
    fichasJ1 = [];
    fichasJ2 = [];
    fichas = [];
}

//Limpia los mensajes de tiempo
function clearMensajes(){
    let mensajeTiempoFuera = document.getElementById("mensaje-tiempo-fuera");
    mensajeTiempoFuera.classList.add("none");

    let mensajeGanadorAngel = document.getElementById("mensaje-ganadorAngel");
    mensajeGanadorAngel.classList.add("none");

    let mensajeGanadorDemonio = document.getElementById("mensaje-ganadorDemonio");
    mensajeGanadorDemonio.classList.add("none");

}


canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

document.getElementById('restart').addEventListener('click', () => {
    restart();
    reiniciarTimer();
});

inicializar();