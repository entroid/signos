
var hideTxt = function () {
    $('.slideme li h1').fadeOut().toggleClass('txtAnimacion');
}

var txtEffect = function () {
    $('.slideme li h1').toggleClass('txtAnimacion').fadeIn();
}

var btnHover = function (btnSection) {
    var slide;

    if (btnSection === 'paucke') {
        slide = 0;
    }
    if (btnSection === 'siglos') {
        slide = 1;
    }
    if (btnSection === 'signos') {
        slide = 2;
    }
    $('.hero').slideme('playTo', slide);
    $('.hero').slideme('stop');
}

var startSlide = function () {
    var btns = $('.home-cta .use-btn');

    $(btns).mouseenter(function() {
        var btnSection = $(this).attr('data-section');
        btnHover(btnSection);
    })

    $(btns).mouseleave(function() {
        $('.hero').slideme('play');
    })
}


var init = function () {
    loadUrl();

/***************** Slide me (background slide) ******************/
    $('.hero').slideme({
        pagination: "numbers",
        autoslide : true,
        interval : 6000,
        loop : true,
        onCreatedCallback : startSlide, //init slide
        onEndCallback : txtEffect, //end animaton
        onStartCallback : hideTxt, //before start animation
        speed : 10,        
        /*resizable: {
            width: 990,
            height: 450,
        }*/
        transition : 'slide' // Values: 'fade/slide/page/zoom'
    });

} 

$(document).ready(function() {
    init();
});


/***************** Nav Transformicon ******************/

/* When user clicks the Icon */
$(".nav-toggle").click(function() {
    $(this).toggleClass("active");
    $(".overlay-boxify").toggleClass("open");
});

/* When user clicks a link */
$(".overlay ul li a").click(function() {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-boxify").toggleClass("open");
});

/* When user clicks outside */
$(".overlay").click(function() {
    $(".nav-toggle").toggleClass("active");
    $(".overlay-boxify").toggleClass("open");
});

/***************** Smooth Scrolling ******************/

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 2000);
            return false;
        }
    }
});
