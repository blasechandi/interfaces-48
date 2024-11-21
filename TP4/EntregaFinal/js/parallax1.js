
window.addEventListener("scroll", function() {
    const parallaxItem = document.querySelectorAll(".parallax")
    const scrollY = this.window.scrollY;

    for (const item of parallaxItem) {
        let speed = item.getAttribute("data-speed");
        let initialTop = item.getAttribute("data-initial-top");
        item.style.top = initialTop - scrollY * speed + "px";  
    }
});

