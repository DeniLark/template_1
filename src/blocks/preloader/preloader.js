document.body.style.overflow = 'hidden';

require('velocity-animate');

window.addEventListener('load', () => {
    let preloader = document.getElementById('preloader');
    let elementsAnimate = preloader.querySelectorAll('.preloader-animate');
    elementsAnimate.forEach(element => {
        element.classList.remove('preloader-animate');
    });

    Velocity(preloader, {
        opacity: 0,
        scaleY: 0
        // height: 0,
        // top: '50%'
    }, {
        delay: 500,
        duration: 500,
        easing: 'ease-in-out',
        complete: function(){
            preloader.remove();
            document.body.style.overflow = '';
        }
    });
});