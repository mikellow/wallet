(function(){
'use strict';

    //console.log('hello');

    // var config = {
    //     singleSlideWidth : ,
    //     singleSlideHeight : ,
    // }

    var model = {
        'currentStage' : null
    }

    var animationContainer = document.getElementById('sliderContainer');
    //console.log('animationContainer', animationContainer);

    var cardMainElement = {
        'element': document.getElementById('card-1'),
        'covered ': false
    };

    var otherCards = document.getElementsByClassName('other-cards');
    console.log('otherCards', otherCards);

    var walletCase = {
        'element': document.getElementById('case'),
        'covered ': false,
        'attachedToBottom': false
    };

    function coverOtherCards () {
        for(var i = 0 ; i < otherCards.length; i++){
            otherCards[i].classList.add("covered");
        }
    }

    function fixOtherCards () {
        for(var i = 0 ; i < otherCards.length; i++){
            otherCards[i].classList.remove("covered");
        }
    }

    function slideOtherCardsOut () {
        for(var i = 0 ; i < otherCards.length; i++){
            otherCards[i].classList.add("slide-out");
        }
    }

    function slideOtherCardsIn () {
        for(var i = 0 ; i < otherCards.length; i++){
            otherCards[i].classList.remove("slide-out");
        }
    }

    function makeCardsCovered() {
        console.log('makeCardsCovered', cardMainElement.covered);
        if (cardMainElement.covered) {
            ////console.log('already covered');
            return;
        } else {
            cardMainElement.covered = true;
            cardMainElement.element.classList.add("covered");
            coverOtherCards();
            //console.log('made covered');
        }

    }

    function makeCardsFixed () {
        console.log('makeCardsFixed', cardMainElement.covered);
        if (!cardMainElement.covered) {
            ////console.log('already fixed');
            return;
        } else {
            cardMainElement.covered = false;
            cardMainElement.element.classList.remove("covered");
            fixOtherCards();
            //console.log('made fixed');
        }
    }

    function makeWalletFixed () {
        console.log('makeWalletFixed', walletCase.covered);
        if (walletCase.covered) {
            //console.log('already fixed');
            return;
        } else {
            walletCase.covered = true;
            walletCase.element.classList.add("covered");
            //console.log('made fixed');
        }
    }

    function makeWalletMoving() {
        console.log('makeWalletMoving', walletCase.covered);
        if (!walletCase.covered) {
            //console.log('already moving');
            return;
        } else {
            walletCase.covered = false;
            walletCase.element.classList.remove("covered");
            //console.log('made covered');
        }

    }

    function slideCardsOut (){
        cardMainElement.slideOut = true;
        cardMainElement.element.classList.add("slide-out");
        slideOtherCardsOut();
    }

    function slideCardsIn (){
        cardMainElement.slideOut = false;
        cardMainElement.element.classList.remove("slide-out");
        slideOtherCardsIn();
    }

    function attachAllToBottom(){
        attachWalletToBottom ();
        attachCardsToBottom ();
    }

    function unattachAllFromBottom(){
        unattachWalletFromBottom();
        unattachCardsFromBottom();
    }

    function attachWalletToBottom (){
        if (walletCase.attachedToBottom) {
            return;
        } else {
            walletCase.element.classList.add("toBottom");
        }
    }

    function unattachWalletFromBottom(){
        walletCase.element.classList.remove("toBottom");
        if (!walletCase.attachedToBottom) {
            return;
        } else {
            walletCase.element.classList.remove("toBottom");
        }
    }

    function attachCardsToBottom (){
        cardMainElement.element.classList.add("toBottom");
        for(var i = 0 ; i < otherCards.length; i++){
            otherCards[i].classList.add("toBottom");
        }
    }

        function unattachCardsFromBottom (){
        cardMainElement.element.classList.remove("toBottom");
        for(var i = 0 ; i < otherCards.length; i++){
            otherCards[i].classList.remove("toBottom");
        }
    }



    function shouldCoverCards () {
        var caseTop = walletCase.element.getBoundingClientRect().top;
        var cardMainElementTop = cardMainElement.element.getBoundingClientRect().top;
        var shouldCover = false;

        var pageScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (caseTop < cardMainElementTop && !cardMainElement.covered){
            shouldCover = true;
            cardMainElement.coverPos = pageScroll;
            //console.log('cardMainElement.coverPos', cardMainElement.coverPos);
        }
        //console.log('should cover cardMainElement', shouldCover);
        return shouldCover;
    }

    function shouldFixCards () {
        var caseTop = walletCase.element.getBoundingClientRect().top;
        var cardMainElementTop = cardMainElement.element.getBoundingClientRect().top;
        var shouldFix = false;


        var pageScroll = document.documentElement.scrollTop || document.body.scrollTop;
        //console.log('cardMainElement.coverPos',cardMainElement.coverPos);
        //console.log('pageScroll',pageScroll);
        if (cardMainElement.coverPos > pageScroll && cardMainElement.covered){
            shouldFix = true ;

        }
        //console.log('should fix cardMainElement', shouldFix);

        return shouldFix;

    }

    function calcCurrentStage () {
        //animationContainer

        var animationContainerTop = animationContainer.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        var pageScroll = document.documentElement.scrollTop || document.body.scrollTop;

        var currentStage = null;
        var windowHeight = window.innerHeight;

        currentStage = Math.round((pageScroll- windowHeight/2) / windowHeight);
        currentStage = Math.abs(currentStage)

        console.log('calcCurrentStage', pageScroll, windowHeight, animationContainerTop, currentStage);
        //console.log('calcCurrentStage', currentStage);
        return currentStage;
    }


    window.addEventListener('scroll', function handleScroll (event) {

        switch(calcCurrentStage()) {
            case 0 :
                console.log('activate stage 0');
                if(model.currentStage !== 0){
                    model.currentStage == 0;
                    makeCardsFixed();
                    makeWalletMoving();
                    slideCardsIn();
                }
                break;
            case 1 :
                console.log('activate stage 1');
                if(model.currentStage !== 1){
                    model.currentStage == 1;
                    makeCardsCovered();
                    makeWalletFixed();
                    slideCardsOut();
                    unattachAllFromBottom();
                    //slideCardsIn();
                    // if(walletCase.attachedToBottom){
                    //     unattachWalletFromBottom();
                    // }
                }
                break;
            case 2 :
                console.log('activate stage 2');
                if(model.currentStage !== 2){
                    model.currentStage == 2;
                    attachAllToBottom();
                }
                break;
        }

        ////console.log('scroll event', event);
        /*
        if( shouldCoverCards() ){
            makeCardsCovered();
            makeWalletFixed();
        } else if(shouldFixCards()){
            makeCardsFixed();
            makeWalletMoving();
        }
        */
    });

    document.body.addEventListener('keydown',function keyDownHandler(event){
        ///*console.log('keydown handler', event)*/
        var keyCode = event.keyCode;

        switch (keyCode) {
            case 37 : //left
                //console.log('move left');
                moveLeft();
                break;
            case 38 : //up
                break;
            case 39 : //right
                moveRight();
                //console.log('move right');
                break;
            case 40 : //bottom
                break;
        }
    });


    var currentStage = 0;
    window.nextStage = function nextStage(){
        console.log('next stage clicked');
        currentStage++

        window.scrollTo(0, window.innerHeight * currentStage);
    }

    window.prevStage = function prevStage(){
        console.log('prev stage clicked');
        currentStage--
        if(currentStage < 0) currentStage = 0;
        window.scrollTo(0, window.innerHeight * currentStage);
    }

})();
