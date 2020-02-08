// import Swiper from 'swiper';
let Swiper = require('swiper');

document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('.swiper-container')) {
        const slider = new Swiper('.swiper-container', { 
            init: false
        });
        initSliderReviews(slider);
    }    
});

function initSliderReviews(slider) {
    let btnWallopPrev = document.getElementById('btn-slider-comment-prev');
    let btnWallopNext = document.getElementById('btn-slider-comment-next');
    
    function offBtnsSlider(){
        if(slider.isBeginning) {
            btnWallopPrev.style.opacity = 0;
        } else {
            btnWallopPrev.style.opacity = 1;
        }
        if(slider.isEnd) {
            btnWallopNext.style.opacity = 0;
        } else {
            btnWallopNext.style.opacity = 1;
        }
    }
    slider.on('init', offBtnsSlider);
    slider.on('slideChange', offBtnsSlider);
    slider.init();

    btnWallopPrev.addEventListener('click', function(){
        slider.slidePrev();
    });
    btnWallopNext.addEventListener('click', e => {
        slider.slideNext();
    });
}

