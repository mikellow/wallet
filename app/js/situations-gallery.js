(function(){
'use strict';

    console.log('hello situations gallery');
/*
    window.activateSlide = function activateSlide(slideId){
        console.log('activateSlide clicked', slideId);

        var slideElement = document.getElementById(slideId);
        console.log('slideElement', slideElement);
    }
    */

    var activeSlide = document.getElementsByClassName('slide active')[0];
    console.log('activeSlide',activeSlide);

    var slidesList = document.getElementsByClassName('slides-list')[0];
    console.log('slidesList',slidesList);

    var slides = slidesList.getElementsByTagName('li');
    console.log('slides',slides);

    var activeSlideIndex = 0;

    var activeSlide = slides[activeSlideIndex];

    var singleSlideWidth = activeSlide.getBoundingClientRect().width

    var model = {
        slides : slides,
        slidesList : slidesList,
        activeSlideIndex : activeSlideIndex,
        singleSlideWidth : singleSlideWidth
    }

    function moveToRight (steps) {
        console.log('moveToRight');
        if(model.activeSlideIndex < (model.slides.length-1)) {
            // model.activeSlideIndex++;
            model.activeSlideIndex = steps ? model.activeSlideIndex + steps : model.activeSlideIndex + 1;
            console.log('model.activeSlideIndex',model.activeSlideIndex);
            var transformValue = model.activeSlideIndex * model.singleSlideWidth * -1;
            console.log('moveToRight now for transformValue', transformValue);
            model.slidesList.style.webkitTransform = 'translate('+ transformValue +'px)';
        }
    }

    function moveToLeft (steps) {
        console.log('moveToLeft');
        if(model.activeSlideIndex > 0) {

            model.activeSlideIndex = steps ? model.activeSlideIndex - steps : model.activeSlideIndex-1;
            console.log('model.activeSlideIndex',model.activeSlideIndex);
            var transformValue = model.activeSlideIndex * model.singleSlideWidth * -1;
            console.log('moveToLeft now for transformValue', transformValue);
            model.slidesList.style.webkitTransform = 'translate('+ transformValue +'px)';
        }
    }


    function activateSlide (slideIndex) {
        console.group('activateSlide');
        console.log('activateSlide', slideIndex);
        console.log('model.activeSlideIndex', model.activeSlideIndex);

        var makeMove = model.activeSlideIndex !== slideIndex;
        console.log('makeMove',makeMove);
        if (makeMove) {
            var direction = (model.activeSlideIndex < slideIndex) ? 'right' : 'left';
            var distance;
            console.log('direction',direction);

            if (direction === 'left') {
                distance = model.activeSlideIndex - slideIndex;
                console.log('distance',distance);
                moveToLeft(distance);
            } else if(direction === 'right') {
                distance = slideIndex - model.activeSlideIndex;
                console.log('distance',distance);
                moveToRight(distance);
            }
        }
        console.groupEnd('activateSlide');
        //var direction = slideId

    }

    window.activateSlide = activateSlide;

    document.body.addEventListener('keydown',function keyDownHandler(event){
        console.log('keydown handler', event)
        var keyCode = event.keyCode;

        switch (keyCode) {
            case 37 : //left
                console.log('move left');
                moveToLeft();
                break;
            case 38 : //up
                break;
            case 39 : //right
                moveToRight();
                console.log('move right');
                break;
            case 40 : //bottom
                break;
        }
    })

})();
