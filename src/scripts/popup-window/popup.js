var gOldFocusElement;

document.addEventListener('DOMContentLoaded', function () {
    let listPortfolioLinks = document.querySelectorAll('.portfolio__item-link');
    listPortfolioLinks.forEach(adderClickListenerForPortfolio);

    // popups with services list
    let btnServicesList = document.getElementById('btn-view-services-list');
    if(btnServicesList) {
        btnServicesList.addEventListener('click', () => {
            let popupServices = document.getElementById('popup-services');
            let btnClose = popupServices.querySelector('.popup__btn-close');

            openPopup(popupServices);
            btnClose.onclick = function(){
                closePopup(popupServices, btnClose);
            };
        });
    }

    // popup with contact -->
    let popup = document.getElementById('popup-feedback');
    let erroreName, erroreEmail, erroreEmailempty, erroreMessages;
    
    if(popup) {
        erroreName = popup.querySelector('#errore-name');
        erroreEmail = popup.querySelector('#errore-email');
        erroreEmailempty = popup.querySelector('#errore-emailempty');
        erroreMessages = popup.querySelector('#errore-message');

        let nameInput = popup.querySelector('#input-name');
        let emailInput = popup.querySelector('#input-e-mail');
        let messageInput = popup.querySelector('#input-message');

        nameInput.addEventListener('focus', () => { erroreName.classList.add('hidden'); });
        emailInput.addEventListener('focus', () => { 
            erroreEmail.classList.add('hidden');
            erroreEmailempty.classList.add('hidden');
        });
        messageInput.addEventListener('focus', () => { erroreMessages.classList.add('hidden'); });
    }

    let btnContact = document.getElementById('btn-contact');
    if(btnContact) {
        btnContact.addEventListener('click', function(){
            let name = popup.querySelector('#input-name').value;
            let email = popup.querySelector('#input-e-mail').value;
            let message = popup.querySelector('#input-message').value;
    
            let btnClose = popup.querySelector('.popup__btn-close');
            let btnSubmit = popup.querySelector('#btn-submit-form-contact');
    
            openPopup(popup);
            btnClose.onclick = function(){
                closePopup(popup, btnClose);
            };
    
    
    
            btnSubmit.addEventListener('click', function (e) {
        
                let countErrore = 0;            
        
                if (name.trim() == '') {
                    ++countErrore;
                    erroreName.classList.remove('hidden');
                }
                if (email.trim() == '') {
                    ++countErrore;
                    erroreEmailempty.classList.remove('hidden');
                } else if(email.indexOf('@') == -1 || email.indexOf('.') == -1) {
                    ++countErrore;
                    erroreEmail.classList.remove('hidden');
                }
                if (message.trim() == '') {
                    ++countErrore;
                    erroreMessages.classList.remove('hidden');
                }
        
        
                if (countErrore > 0) {
                    e.preventDefault();
                }
            });
        });
    }

    // <-- popup with contact
    

});

function openPopup(popup) {
    Velocity(popup, {
        opacity: [1, 0],
        translateY: ['0%', '100%']
    }, {
        duration: 500
        // complete: createPopupComplete
    });

    window.addEventListener('keydown', pressKeyDown);
    function pressKeyDown(e) {
        switch (e.keyCode) { // esc
            case 27:
                closePopup(popup);
                break;
        }
    }
}
function closePopup(popup, btnClose) {
    if(btnClose == undefined) btnClose = popup.querySelector('.popup__btn-close');
    Velocity(popup, {
        opacity: 0,
        translateY: '100%'
    }, {
        duration: 500,
        // complete: closePopupComplete
    });

    btnClose.onclick = false;
}




window.addEventListener('resize', function () {
    let popup = document.querySelector('.popup--image');

    if (popup) {
        let image = popup.querySelector('.popup__image');
        let parent = popup.querySelector('.popup__main');
        changeSizeImageByParent(image, parent);
    }
});

function adderClickListenerForPortfolio(item) {
    item.addEventListener('click', e => {
        e.preventDefault();
        let urlImg = item.getAttribute('href');
        let titleImg = item.querySelector('.portfolio__item-title').innerText;

        let descrImg = '';
        let elDescr = item.querySelector('.portfolio__item-description');
        if (elDescr) descrImg = elDescr.innerText;


        createPopupImage(urlImg, titleImg, descrImg);
    })
}

//! main function for popup
function createPopup(parHtml, additionalClass) {
    let container = document.createElement('div');
    if (additionalClass == undefined) additionalClass = false;

    container.setAttribute('tabindex', '0');
    container.setAttribute('class', 'popup__container');

    let btnClose = document.createElement('button');
    btnClose.setAttribute('class', 'button popup__btn-close');
    btnClose.innerHTML = 'X';
    btnClose.addEventListener('click', closePopup);
    container.appendChild(btnClose);

    let popup = document.createElement('div');
    popup.setAttribute('class', 'popup');
    if (additionalClass) {
        popup.classList.add(additionalClass);
    }
    container.appendChild(popup);

    let popupContent = document.createElement('div');
    popupContent.setAttribute('class', 'popup__content inner-max-width-container');
    if (typeof parHtml == 'string') popupContent.innerHTML = parHtml;
    else if (typeof parHtml == 'object') popupContent.appendChild(parHtml);
    popup.appendChild(popupContent);

    let body = document.body;
    body.appendChild(container);
    body.style.overflow = 'hidden';

    Velocity(container, {
        opacity: [1, 0], //! [конечная точка, начальная точка]
        translateY: ['0%', '100%']
    }, {
        duration: 500,
        complete: createPopupComplete
    });

    function createPopupComplete(){
        gOldFocusElement = document.activeElement;
        container.focus();

        if(additionalClass == 'popup--image') {
            changeSizeImageByParent();

            // let imageContainer = container.querySelector('.popup__main');
            // let image = imageContainer.querySelector('.popup__image');
            // if(image.offsetWidth < imageContainer.offsetWidth){
            //     image.classList.add('image--clickable');
            // }
        }
    }
    

    window.addEventListener('keydown', pressKeyDown);
    function pressKeyDown(e){
        switch (e.keyCode) { // esc
            case 27:
                closePopup();
                break;
        }
    }

    function closePopup() {
        Velocity(container, {
            opacity: 0,
            translateY: '100%'
        }, {
            duration: 500,
            complete: closePopupComplete
        });
    }

    function closePopupComplete(){
        gOldFocusElement.focus();
        window.removeEventListener('keydown', pressKeyDown);
        container.remove();
        body.style.overflow = 'auto';
    }
}

function createPopupImage(parUrlImage, parTitle, parDescr) {
    let container = myCreateElement('div', {});

    let header = myCreateElement('div', {
        class: 'popup__header'
    });
    let headerTitle = myCreateElement('h3', {}, parTitle);
    header.appendChild(headerTitle);

    let popupmain = myCreateElement('div', {
        class: 'popup__main'
    });
    let image = myCreateElement('img', {
        src: parUrlImage,
        alt: parTitle,
        class: 'popup__image',
        style: 'opacity: 0'
    });
    
    
    // image.addEventListener('click', function(){
    //     if(image.offsetWidth < popupmain.offsetWidth) {
    //         if(image.classList.contains('image-big')) {
    //             image.classList.remove('image-big');
    //         } else {
    //             image.classList.add('image-big');
    //         }
    //     }
        
    // });

    popupmain.appendChild(image);

    let footer = myCreateElement('div', {
        class: 'popup__footer'
    });
    let footerDescr = myCreateElement('p', {}, parDescr);
    footer.appendChild(footerDescr);

    container.appendChild(header);
    container.appendChild(popupmain);
    container.appendChild(footer);

    createPopup(container, 'popup--image');
}

function changeSizeImageByParent(parImage, parParent) {
    if(parParent == undefined) parParent = document.querySelector('.popup--image');
    if(parImage == undefined) parImage = parParent.querySelector('.popup__main img');

    if (parImage.offsetHeight > parParent.offsetHeight) {
        parImage.style.height = parParent.offsetHeight + 'px';
        parImage.style.width = 'auto';
    }
    if (parImage.offsetWidth > parParent.offsetWidth) {
        parImage.style.width = parParent.offsetWidth + 'px';
        parImage.style.width = '100%';
        parImage.style.height = 'auto';
    }

    parImage.style.opacity = 1;
}

function myCreateElement(parType, parObjectAttr, parText) {
    let element = document.createElement(parType);

    if (parObjectAttr !== undefined) {
        let parObjKeysAttr = Object.keys(parObjectAttr);

        parObjKeysAttr.forEach(item => {
            element.setAttribute(item, parObjectAttr[item]);
        });
    }

    if (parText !== undefined) element.innerHTML = parText;


    return element;
}