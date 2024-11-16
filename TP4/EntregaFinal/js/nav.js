const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

const menuItems = document.querySelectorAll('.off-screen-menu ul li');


hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');

    /// Reiniciar animación de los ítems al desplegar nuevamente
    if (offScreenMenu.classList.contains('active')) {           //si apretaste en el menu y esta la X entras
        menuItems.forEach((item, index) => {
            item.style.setProperty('--index', index);
            item.classList.add('animate'); // Añadimos clase para la animación
        });
    }
    else {
        // Quita la clase de animación al cerrar el menú
        menuItems.forEach(item => {
            item.classList.remove('animate');
        });
    }
});
