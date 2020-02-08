var Velocity = require('velocity-animate');
// Optional: If you're using the UI pack, require it after Velocity. (You don't need to assign it to a variable.)
// require("path/to/velocity.ui.js");

// const objBlocksSite = 

function funcMain(){
    changeScrollFixedMenu();
    clickMenuItems();
    initShowHideMenu();
}
document.addEventListener('DOMContentLoaded', funcMain);


function initShowHideMenu(){
    let menu = document.getElementById('id-header-menu');
    let btnShowMenu = document.getElementById('btn-show-menu');

    if(btnShowMenu) {
        btnShowMenu.addEventListener('click', function(){
            if(btnShowMenu.classList.contains('btn-show-menu--menu-show')) {
                hideMenu();
            } else {
                showMenu();
            }
            
        });
    }
    

    function menuClick(e){
        if(e.target.classList.contains('menu-item-link')){
            hideMenu();
        }
    }

    function showMenu(){
        menu.classList.add('show-menu');
        btnShowMenu.classList.add('btn-show-menu--menu-show');

        menu.addEventListener('click', menuClick);
    }
    function hideMenu(){
        menu.classList.remove('show-menu');
        btnShowMenu.classList.remove('btn-show-menu--menu-show');
        //menu.style.display = 'none';


        menu.removeEventListener('click', menuClick);
    }
}

function changeScrollFixedMenu(){
    let elStaticMenu = document.getElementById('id-static-menu');
    let elHeaderTextBlock = document.getElementById('id-header-text-block');
    
    checkScrollForMenu();

    window.addEventListener('scroll', checkScrollForMenu);

    function checkScrollForMenu(){
        let pageOfsetTop = pageYOffset;
        let ofsetTopElement = elHeaderTextBlock.offsetTop;

        if(pageOfsetTop >= ofsetTopElement - elStaticMenu.clientHeight) {
            elStaticMenu.classList.add('fixed');
        } else {
            elStaticMenu.classList.remove('fixed');
        }
    }
}

function clickMenuItems(e) {
    let headerMenu = document.getElementById('id-header-menu');
    if(headerMenu) {
        headerMenu.addEventListener('click', function(e){
            e.preventDefault();
            
            if(e.target.classList.contains('menu-item-link')) {
                let idTargetBlock = e.target.getAttribute('id').split('__')[1];
                Velocity(document.getElementById(idTargetBlock), 'scroll', {
                    duration: 1000
                });
            }
        });
    }
    
}
