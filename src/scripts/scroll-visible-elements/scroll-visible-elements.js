document.addEventListener('DOMContentLoaded', function(){
    let listScrollElements = document.querySelectorAll('.scroll-element');
    
    animateAllElements();
    window.addEventListener('scroll', animateAllElements);

    function animateAllElements(){

        listScrollElements.forEach(item => {
            let rectItem = item.getBoundingClientRect();
            
            if(rectItem) {
                if(rectItem.top <= window.innerHeight - rectItem.height / 2
                && rectItem.top - rectItem.height >= rectItem.height * -1) {
                    animateFromDown(item);   
                }
            } else {
                //! для браузеров, которые не поддерживают getBoundingClientRect()
                animateFromDown(item);
            }
            
        })

        function animateFromDown(element){
            if(element.style.opacity != 1) {
                element.style.opacity = 1;
            }
            
        }

        function animateDefault(element) {
            element.style.opacity = 0;
        }
    }
});