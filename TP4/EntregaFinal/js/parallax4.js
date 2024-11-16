let ventanaMov = document.querySelector('.parallax4').addEventListener('mousemove', getMouseMove)

// Función que se llama al mover el mouse, se encarga de llamar a otras funciones
function getMouseMove(e) {
    const mouseX = e.clientX
    const mouseY = e.clientY


    charactersMove(mouseX, mouseY)
}

// Mueve los personajes de la sección "Descubre el juego que convierte
// las Matemáticas en diversión" de acuerdo a la posición del mouse
function charactersMove(mouseX, mouseY) {
    const characters = document.getElementById('characters');

    // Calcula la dirección opuesta al cursor
    const offsetX = (window.innerWidth / 2 - mouseX) / 10;
    const offsetY = (window.innerWidth / 2 - mouseY) / 10;

    // Aplica el desplazamiento a la imagen
    characters.style.transform = `translate(${offsetX}px,${offsetY}px)`;
}