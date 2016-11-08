(function(){
'use strict';

    console.log('hello');

    /* buttons */
/*
    var contactButtons = document.getElementsByClassName("contact-button");
    for (var i=0; i<contactButtons.length; i++){
        var contactButton = contactButtons[i];
        contactButton.addEventListener('click', toggleContactForm);
    }
    */

    /* window.toggleContactForm = toggleContactForm; */

    var activeSlide = document.getElementsByClassName('slide active')[0];
    console.log('activeSlide',activeSlide);

    var slidesList = activeSlide.getElementsByClassName('slides-list')[0];
    console.log('slidesList',slidesList);

    var slides = slidesList.getElementsByTagName('li');
    console.log('slides',slides);

    var activeSlideIndex = 0

    var activeSlide = slides[activeSlideIndex];

    var singleSlideWidth = activeSlide.getBoundingClientRect().width

    var model = {
        slides : slides,
        slidesList : slidesList,
        activeSlideIndex : activeSlideIndex,
        singleSlideWidth : singleSlideWidth
    }

    function moveRight () {
        if(model.activeSlideIndex < (model.slides.length-1)) {
            model.activeSlideIndex++;
            console.log('moveRight now',model.activeSlideIndex);
            var transformValue = model.activeSlideIndex * model.singleSlideWidth * -1;
            console.log('transformValue', transformValue);
            model.slidesList.style.webkitTransform = 'translate('+ transformValue +'px)';
        }
    }

    function moveLeft () {
        if(model.activeSlideIndex > 0) {
            model.activeSlideIndex--;
            console.log('moveRight now');
            var transformValue = model.activeSlideIndex * model.singleSlideWidth * -1;
            console.log('transformValue', transformValue);
            model.slidesList.style.webkitTransform = 'translate('+ transformValue +'px)';
        }
    }

    document.body.addEventListener('keydown',function keyDownHandler(event){
        /*console.log('keydown handler', event)*/
        var keyCode = event.keyCode;

        switch (keyCode) {
            case 37 : //left
                console.log('move left');
                moveLeft();
                break;
            case 38 : //up
                break;
            case 39 : //right
                moveRight();
                console.log('move right');
                break;
            case 40 : //bottom
                break;
        }
    })

})();
