document.addEventListener("DOMContentLoaded", function () {
    let cargaActual = 0;
    const robot3 = document.querySelector(".robot3");
    const loaderContainer = document.getElementById("loader-container");
    const overlay = document.querySelector(".overlay"); // Selecciona la overlay


    const simularCarga = setInterval(function () {
        cargaActual += 1;

        // Calcular el valor de desplazamiento en X para el movimiento de izquierda a derecha
        const translateXValue = (cargaActual / 100) * 800; // aca ajusto el valor para mover a la posición deseada

        // Aplica el movimiento al GIF
        robot3.style.transform = 'translateX(' + translateXValue + 'px)';

        // si la carga esta complenta, detiene la animacion y ocualta el loader  (podria sumar sacar el gif)
        if (cargaActual >= 100) {
            clearInterval(simularCarga);
            loaderContainer.classList.add("container--hidden");
            robot3.classList.add("container--hidden");
            overlay.classList.add("overlay--hidden"); // Oculta la overlay
        }
    }, 50); // Tiempo de intervalo (50ms) para un progreso suave
});
