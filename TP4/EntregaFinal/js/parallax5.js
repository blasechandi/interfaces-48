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

//le pongo la opacidad en 1 pq sino no aparece al principio

/*cambio de las imagenes del parallax5, a medida que se scrollea los textos*/
txtS.addEventListener('scroll', function(){

    let scrollTop = txtS.scrollTop;

    if(scrollTop <= 270){  
        img0.style.opacity = 1;
        img1.style.opacity = 0;

    }else if(scrollTop > 270 && scrollTop <= 610){
        img0.style.opacity = 0;
        img1.style.opacity = 1;
        img2.style.opacity = 0;

    }else if(scrollTop > 610 && scrollTop <= 900){
        img1.style.opacity = 0;
        img2.style.opacity = 1;
        img3.style.opacity = 0;
    }else if(scrollTop > 900 && scrollTop <= 1322){
        img2.style.opacity = 0;
        img3.style.opacity = 1;
        img4.style.opacity = 0;
    }else if(scrollTop > 1322 && scrollTop <= 1600){
        img3.style.opacity = 0;
        img4.style.opacity = 1;
        img5.style.opacity = 0;
    }else if(scrollTop > 1610 && scrollTop <= 1930){
        img4.style.opacity = 0;
        img5.style.opacity = 1;
        img6.style.opacity = 0;
    }else if(scrollTop > 1935 && scrollTop <= 2200){
        img5.style.opacity = 0;
        img6.style.opacity = 1;
        img7.style.opacity = 0;
    }else if(scrollTop > 2240 && scrollTop <= 2500){
        img6.style.opacity = 0;
        img7.style.opacity = 1;
        img8.style.opacity = 0;
    }else if(scrollTop > 2501 && scrollTop <= 2800){
        img7.style.opacity = 0;
        img8.style.opacity = 1;
        img9.style.opacity = 0;
    }else if(scrollTop > 2801 && scrollTop <= 3100){
        img8.style.opacity = 0;
        img9.style.opacity = 1;
        img10.style.opacity = 0;
    }else  {
        img9.style.opacity = 0;
        img10.style.opacity = 1;
    }
    

});