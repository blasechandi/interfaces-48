let ventanaMov = document.querySelector('.parallax4').addEventListener('mousemove', getMouseMove)

function getMouseMove(e) {
    const mouseX = e.clientX
    const mouseY = e.clientY
    charactersMove(mouseX, mouseY)
}

//  Mueve los personajes de la sección "Parallax4" 
//  Descubre el juego que convierte las Matemáticas en diversion
function charactersMove(mouseX, mouseY) {
    const characters = document.getElementById('characters');

    // Calcula la direccion opuesta al cursor
    const offsetX = (window.innerWidth / 2 - mouseX) / 10;
    const offsetY = (window.innerWidth / 2 - mouseY) / 10;

    // Aplica el desplazamiento a la imagen
    characters.style.transform = `translate(${offsetX}px,${offsetY}px)`;
}