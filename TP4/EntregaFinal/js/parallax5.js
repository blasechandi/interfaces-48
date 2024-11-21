"use strict";

let txtS = document.querySelector('.texto-scroll');
let image = document.querySelector('.imagenes-scroll');

let img0 = document.querySelector('.img0');
let img1 = document.querySelector('.img1');
let img2 = document.querySelector('.img2');
let img3 = document.querySelector('.img3');
let img4 = document.querySelector('.img4');
let img5 = document.querySelector('.img5');
let img6 = document.querySelector('.img6');
let img7 = document.querySelector('.img7');
let img8 = document.querySelector('.img8');
let img9 = document.querySelector('.img9');
let img10 = document.querySelector('.img10');


/*cambio de las imagenes del parallax5, a medida que se scrollea los textos*/
txtS.addEventListener('scroll', function(){
    let scrollTop = txtS.scrollTop;
    console.log(scrollTop);

    if(scrollTop <= 300){  
        img0.style.opacity = 1;
        img1.style.opacity = 0;

    }else if(scrollTop > 300 && scrollTop <= 610){
        img0.style.opacity = 0;
        img1.style.opacity = 1;
        img2.style.opacity = 0;
    }else if(scrollTop > 610 && scrollTop <= 918){
        img1.style.opacity = 0;
        img2.style.opacity = 1;
        img3.style.opacity = 0;
    }else if(scrollTop > 918 && scrollTop <= 1430){
        img2.style.opacity = 0;
        img3.style.opacity = 1;
        img4.style.opacity = 0;
    }else if(scrollTop > 1430 && scrollTop <= 1938){
        img3.style.opacity = 0;
        img4.style.opacity = 1;
        img5.style.opacity = 0;
    }else if(scrollTop > 1938 && scrollTop <= 2244){
        img4.style.opacity = 0;
        img5.style.opacity = 1;
        img6.style.opacity = 0;
    }else if(scrollTop > 2244 && scrollTop <= 2754){
        img5.style.opacity = 0;
        img6.style.opacity = 1;
        img7.style.opacity = 0;
    }else if(scrollTop > 2754 && scrollTop <= 3162){
        img6.style.opacity = 0;
        img7.style.opacity = 1;
        img8.style.opacity = 0;
    }else if(scrollTop > 3162 && scrollTop <= 3604){
        img7.style.opacity = 0;
        img8.style.opacity = 1;
        img9.style.opacity = 0;
    }else if(scrollTop > 3604 && scrollTop <= 3974){
        img8.style.opacity = 0;
        img9.style.opacity = 1;
        img10.style.opacity = 0;
    }else  {
        img9.style.opacity = 0;
        img10.style.opacity = 1;
    }
    

});