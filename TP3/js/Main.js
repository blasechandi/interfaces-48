"use strict"

let canvas = document.querySelector('canvas');

canvas.width = 1370;
canvas.height = 600;

let ctx = canvas.getContext('2d');

let angel = document.getElementById("angel");
let diablo =  document.getElementById("diablo");
let timer = document.querySelector(".timer-container");
let turnoJugador = document.querySelector(".container-turnos");


//Para la imagen de los hints
const imgIndicador = new Image();
imgIndicador.src = "images/arrowDown.png";


//Para la imagen del inicio
const imgInicio = new Image();
imgInicio.src = "images/tableraso.jpg";

imgInicio.onload = function() {
    drawInicio();
}

//Inicialización de variables
let imgFondo = new Image();
let width = canvas.width;
let height = canvas.height;
let turno = 1;
let firstTimeCharging = true;
let isMouseDown = false;
let lastClickedFigure = null;
let caeLaFicha = false;
let juegoFinalizado = false;
let filas = 0;
let columnas = 0;
let tam_ficha = 0;
let num_ganador = 0;
let interval;
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
let msjcontainer = document.querySelector(".mje-container");


//Imagenes que aparecen en la parte de TURNO DE : 
let turnoImgFicha = document.getElementById('turnoImgFicha');

//Este contador va a ser para los casos de empate
let contador = 0;

//Dibuja la imagen de inicio del canvas
function drawInicio(){
    ctx.drawImage(imgInicio, 0, 0, canvas.width, canvas.height);
}

let btn_play = document.querySelector(".btn-play-game");

//Se ejecuta cuando se presiona el primer play de la pantalla, para visualizar el menu configurable del juego
btn_play.addEventListener('click', showMenu);


//Muestra el menu de configuración de juego
function showMenu(){
    btn_play.classList.toggle("none");
    let menu = document.querySelector(".game-menu");
    menu.classList.toggle("none");
}


let play = document.getElementById('play-game');
//Al presionar el boton 'Jugar' inicializa el juego
play.addEventListener('click', function(e){
    let menu = document.querySelector(".game-menu");
    menu.classList.toggle("none");
    canvas.classList.toggle("pointer-events");
    let btns = document.querySelector(".game-playing");
    btns.classList.toggle("none");
    timer.classList.toggle("none");
    turnoJugador.classList.toggle("none");
    inicializar();
});




//Primer metodo para inicializar el juego, modularizado en varias funciones
function inicializar(){
    configurarJuego();
    configurarJugadores();
    configurarMapa();
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
    let margen_tablero = height - filas*tam_ficha;
    posicionYFichasJ1 = (filas-1/2)*tam_ficha + margen_tablero;
    posicionYFichasJ2 = (filas-1/2)*tam_ficha + margen_tablero;

    if(num_ganador==5 || num_ganador==6){
        posicionYFichasJ1 = posicionYFichasJ1;
        posicionYFichasJ2 = posicionYFichasJ2;
    }
}


//Inicializacion de variables para el juego
function elegirModo(){
    let modo = document.getElementById("game-mode").value; 
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
    }else if (modo == 5) { //Variables para 5 en linea
        filas = 7;
        var_tablero.push(filas);
        columnas = 8;
        var_tablero.push(columnas);
        numero_ganador = 5;
        var_tablero.push(numero_ganador);
        tam_ficha = 68;
        var_tablero.push(tam_ficha);
        radio = 28;
        var_tablero.push(radio);
        difPosicion = (radio/4*2.5);
        var_tablero.push(difPosicion);
        timing = 120;
        var_tablero.push(timing);
        
    } else if (modo == 6) { //Variables para 6 en linea
        filas = 8;
        var_tablero.push(filas);
        columnas = 9;
        var_tablero.push(columnas);
        numero_ganador = 6;
        var_tablero.push(numero_ganador);
        tam_ficha = 64;
        var_tablero.push(tam_ficha);
        radio = 27.5;
        var_tablero.push(radio);
        difPosicion = (radio/4*2);
        var_tablero.push(difPosicion);
        timing = 250;
        var_tablero.push(timing);
        
    } else if (modo == 7) { //Variables para 7 en linea
        filas = 9;
        var_tablero.push(filas);
        columnas = 10;
        var_tablero.push(columnas);
        numero_ganador = 7;
        var_tablero.push(numero_ganador);
        tam_ficha = 56;
        var_tablero.push(tam_ficha);
        radio = 24;
        var_tablero.push(radio);
        difPosicion = (radio/4*2);
        var_tablero.push(difPosicion);
        timing = 300;
        var_tablero.push(timing);
    } 
    return var_tablero;
}



// Inicializacion de la ficha de cada jugador
function configurarJugadores(){
    fichaJ1 = document.getElementById("fichaJ1").value;
    fichaJ2 = document.getElementById("fichaJ2").value;


    turnoImgFicha.src = fichaJ1;
}

//imagen de fondo del canvas
function configurarMapa(){
    imgFondo.src = ("images/cielo.jpg");
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
    tablero = new Tablero(ctx, width, height, filas, columnas, "green", tam_ficha, imgIndicador);
}

//Crea el resto de figuras
function drawFigure(){
    clearCanvas();
    tablero.setTableroDibujado(false);

    //Chequeo si es la primera vez que carga la pantalla
    if(firstTimeCharging){
        imgFondo.onload = function(){
            setTimeout(() => {
                drawFondo();
                drawIndicators();
                drawFichas();
                drawTablero();
            },100*3);
        }
    }else{
        drawFondo();
        drawIndicators();
        drawFichas();
        drawTablero();
    }

    firstTimeCharging = false;
}


//Dibuja el mapa de fondo
function drawFondo(){
    ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);
}


//Dibuja las fichas, guardadas en el arreglo
function drawFichas(){
    if(firstTimeCharging){
        for(let i = 0; i<fichas.length; i++){
            setTimeout(() => {
                fichas[i].draw();
            },1500);
        }
    }else{
        for(let i = 0; i<fichas.length; i++){
            fichas[i].draw();
        }
    }
}


//Dibuja el tablero
function drawTablero(){
    if(firstTimeCharging){
        setTimeout(() => {
            tablero.draw();
        },100*3);
    }else{
        tablero.draw();
    }
}


//Dibuja los indicadores (hints)
function drawIndicators(){
    if(firstTimeCharging){
        setTimeout(() => {
            tablero.drawIndicators();
        },100*3);
    }else{
        tablero.drawIndicators();
    }
}





//Borra la totalidad del canvas
function clearCanvas(){
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, width, height);
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



//Se ejecuta cuando el mouse se mueve
function onMouseMove(e){      
    //mantengo el click para abajo y puedo mover la figura
    if (isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX , e.layerY);
        drawFigure();
    }
}

//Se ejecuta cuando el mouse esté presionado
function onMouseDown(e){        //click para abajo
    isMouseDown = true;

    if (lastClickedFigure != null){
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX , e.layerY) //coordenadas x e y dentro del canvas 
    if (clickFig != null){
        lastClickedFigure = clickFig;
    }
    drawFigure();
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
        drawFigure();
        lastClickedFigure.setIsDropped(true);
        contador++;
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
            figure.setPosY(figure.getPosY() + 4); // el valor 2, mientras mas alto o bajo sea el numero, mas rapido o lento va a caer la ficha
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
    // Esto es en caso de EMPATE (o sea que se quedaron sin fichas los 2 jugadores)
    if (contador == fichas.length) {
        terminaJuego(null);
    }

    animate(); //  funcion que se llama recursivamente en requestAnimationFrame hasta que la ficha alcanza la posición final (height)
}

//Permite cambiar el turno del jugador
function cambiarTurno(){
    if(turno == 1){
        turno = 2;
        turnoJugador.classList.add("demoniotxt");
        turnoJugador.classList.remove("angeltxt");
        turnoImgFicha.src = fichaJ2;
    }else{
        turno = 1;
        turnoJugador.classList.add("angeltxt");
        turnoJugador.classList.remove("demoniotxt");
        turnoImgFicha.src = fichaJ1;
    }
}

//Pop-up de ganador
function terminaJuego(jugador = null){
    msjcontainer.classList.remove("none");
    const popover = document.getElementById('id_del_popover');
    if (popover) {
        popover.showPopover();
    }
    if (jugador == null) {
        let mensajeEmpate = document.getElementById("mensaje-empate");
        mensajeEmpate.classList.remove("none");
        return;
    }
    
    if (jugador == 1) {
        let mensajeGanador = document.getElementById("mensaje-ganadorAngel");
        mensajeGanador.classList.remove("none");
    } else{
        let mensajeGanador = document.getElementById("mensaje-ganadorDemonio");
        mensajeGanador.classList.remove("none");
    }
    juegoFinalizado=true;
    detenerTimer();
}


function restart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    detenerTimer();
    reiniciarVariables();
    clearCanvas();
    inicializar();
}



//Reinicio variables, para el restart
function reiniciarVariables(){
    isMouseDown = false;
    lastClickedFigure = null;
    caeLaFicha = false;
    juegoFinalizado = false;
    filas = 0;
    columnas = 0;
    turno = 1;
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




function detenerTimer() {
    clearInterval(interval); // antes teniamos timing y lo reiniciabamos mal
}





// el bug estaba en que no usabamos el interval de manera global, y al reiniciarlo/detenerlo en otra funcion reiniciaba mal
//Inicializa el timer, y genera una resta por segundo transcurrido
function iniciarTimer() {
    let totalTime = timing; // Tiempo en segundos 
    const timerDisplay = document.getElementById("timer-display");

    interval = setInterval(() => {
        // Calcula minutos y segundos restantes
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        // Formatea el tiempo en mm:ss
        timerDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (totalTime <= 0) {
            clearInterval(interval); // Detenemos el temporizador
            juegoFinalizado = true;
            mostrarMensajeTiempoFuera(); // Muestra mensaje de tiempo agotado 
        }

        totalTime--; // Decrementa el tiempo en 1 segundo
    }, 1000); // 1000 ms = 1 segundo
}


// funcion para mostrar el mensaje de tiempo agotado
function mostrarMensajeTiempoFuera() {
    msjcontainer.classList.remove("none");
    const popover = document.getElementById('id_del_popover');
    if (popover) {
        popover.showPopover();
    }
    let mensajeTiempoFuera = document.getElementById("mensaje-tiempo-fuera");
    mensajeTiempoFuera.classList.remove("none"); // Asegúrate de que el mensaje esté visible
}


canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);



document.getElementById('return').addEventListener('click', refresh);
document.getElementById('return2').addEventListener('click', refresh);

//Refresca la página, al volver atrás desde el juego
function refresh(){
    window.location.replace("index.html");
}
