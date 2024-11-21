window.addEventListener("scroll", function() {
    const logo = document.querySelector(".logo")
    let header = document.querySelector(".sticky");
    const scrollY = this.window.scrollY;


    let efectoWidth = 550 - scrollY * 0.5;
    let efectoTransform = 110 - scrollY * 0.2;
    let efectoGradiente = scrollY * 0.1;

    let newHei = 320 - scrollY * 0.3;
    

    if (efectoWidth > 150) {
        logo.style.width = efectoWidth + "px";
        logo.style.height = newHei + "px";
    } else {
        logo.style.width = "150px"
        logo.style.height = "100px"
    }


    if (efectoTransform > 0) {
        logo.style.transform = "translateY(" + efectoTransform + "px)"
    } else {
        logo.style.transform = "translateY(0px)"
    }

    if (efectoGradiente < 100) {
        header.style.background = "linear-gradient(180deg, #00D1D5 " + efectoGradiente + "%, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0) 100%)"
    } else {
        header.style.background = "#00D1D5"
    }

});
