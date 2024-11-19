
window.addEventListener("scroll", getScroll)



// Función que se llama al scrollear, se encarga de llamar a otras funciones
function getScroll() {
    const y = this.pageYOffset;
    parallaxEffect(y);
}

// Hace el efecto parallax de la sección "La app más divertida y educativa
// y para niños de 3 años" de acuerdo al scroll
function parallaxEffect(y) {
    const parallaxItem = document.querySelectorAll(".parallax")

    for (const item of parallaxItem) {
        let speed = item.getAttribute("data-speed");
        let initialTop = item.getAttribute("data-initial-top");
        item.style.top = initialTop - y * speed + "px";  
    }
}