let cuadro1 = document.querySelector('.cuadro1');
let cuadro2 = document.querySelector('.cuadro2');
let cuadro3 = document.querySelector('.cuadro3');

let texto1 = document.querySelector('.text1');
let texto2 = document.querySelector('.text2');
let texto3 = document.querySelector('.text3');

window.addEventListener('scroll',()=>{
    let value = window.scrollY;
    // fade-in cards
      if(value>1500){
        if (cuadro1 && cuadro2 && cuadro3) {
          setTimeout(function () {
              cuadro1.style.opacity = 1;
              texto1.style.opacity = 1;
              cuadro1.style.transform = 'translateY(0)';
              texto1.style.transform = 'translateY(0)';
          }, 1000); 
  
          setTimeout(function () {
            cuadro2.style.opacity = 1;
            cuadro2.style.transform = 'translateY(0)';
            texto2.style.opacity = 1;
            texto2.style.transform = 'translateY(0)';
          }, 1300); 
  
          setTimeout(function () {
              cuadro3.style.opacity = 1;
              texto3.style.opacity = 1;
              cuadro3.style.transform = 'translateY(0)';
              texto3.style.transform = 'translateY(0)';
          }, 1500);
        }
      }
    else{
      cuadro1.style.opacity = 0;
      cuadro2.style.opacity = 0;
      cuadro3.style.opacity = 0;
      texto1.style.opacity = 0;
      texto2.style.opacity = 0;
      texto3.style.opacity = 0;

    }
});