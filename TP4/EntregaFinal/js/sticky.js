window.addEventListener("scroll", function() {
    const logo = document.getElementById("logo_esconder");
    const logoChiquito  = document.getElementById("logo-chico");
    let header = document.querySelector("header");

    const scrollY = window.scrollY;

    // Ajusta el valor (ej. 100) según cuándo quieres que se active el efecto
    if (scrollY > 100) {
        logo.classList.add("achicar");
        logoChiquito.classList.add("logo-small-block");
        header.style.background = "#00D0D5";
    } else {
        logo.classList.remove("achicar");
        logoChiquito.classList.remove("logo-small-block");
        header.style.background = "transparent";
    }
});
