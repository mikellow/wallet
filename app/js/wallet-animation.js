(function(){
'use strict';

    console.log('hello');

    var animationContainer = document.getElementById('sliderContainer');
    console.log('animationContainer', animationContainer);

    var iphone = {
        'element': document.getElementById('iphone'),
        'covered ': false
    };

    var phoneCase = {
        'element': document.getElementById('case')
    };

    function makeIphoneCovered() {
        if (iphone.covered) {
            console.log('already covered');
            return;
        } else {
            iphone.covered = true;
            iphone.element.classList.add("covered");
            console.log('made covered');
        }

    }

    function makeIphoneFixed() {
        if (!iphone.covered) {
            console.log('already fixed');
            return;
        } else {
            iphone.covered = false;
            iphone.element.classList.remove("covered");
            console.log('made fixed');
        }
    }

    function shouldCoverIphone () {
        var caseTop = phoneCase.element.getBoundingClientRect().top;
        var iphoneTop = iphone.element.getBoundingClientRect().top;
        var shouldCover = false;

        var pageScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (caseTop < iphoneTop && !iphone.covered){
            shouldCover = true;
            iphone.coverPos = pageScroll;
            console.log('iphone.coverPos', iphone.coverPos);
        }
        console.log('should cover iphone', shouldCover);
        return shouldCover;
    }

    function shouldFixIphone () {
        var caseTop = phoneCase.element.getBoundingClientRect().top;
        var iphoneTop = iphone.element.getBoundingClientRect().top;
        var shouldFix = false;


        var pageScroll = document.documentElement.scrollTop || document.body.scrollTop;
        console.log('iphone.coverPos',iphone.coverPos);
        console.log('pageScroll',pageScroll);
        if (iphone.coverPos > pageScroll && iphone.covered){
            shouldFix = true ;

        }
        console.log('should fix iphone', shouldFix);

        return shouldFix;

    }
    window.addEventListener('scroll', function handleScroll (event) {
        //console.log('scroll event', event);
        if( shouldCoverIphone() ){
            makeIphoneCovered();
        } else if(shouldFixIphone()){
            makeIphoneFixed();
        }
    });

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
