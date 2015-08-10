/***************** Fancybox ******************/
/*$(".youtube-media").on("click", function(e) {
    var jWindow = $(window).width();
    if (jWindow <= 768) {
        return;
    }
    $.fancybox({
        href: this.href,
        padding: 4,
        type: "iframe",
        'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
    });
    return false;
});*/
var hideTxt = function () {
    $('.slideme li h1').fadeOut();
}

var txtEffect = function () {
    $('.slideme li h1').fadeIn();
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
        console.log('enter')
        var btnSection = $(this).attr('data-section');
        btnHover(btnSection);
    })

    $(btns).mouseleave(function() {
        console.log('out')
        $('.hero').slideme('play');
    })
}

function init () {

/***************** Flickity ******************/
    /*$('#featuresSlider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false
    });

    $('#showcaseSlider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        imagesLoaded: true
    });*/


/***************** Fancybox Init ******************/
    /*$("a.single_image").fancybox({
        padding: 4,
    });*/


/***************** Vegas (background slide) ******************/
    /*$(".hero").vegas({
        delay: 7000,
        transition: 'flash',
        transitionDuration: 2000,
        cover: true,
        slides: [
            { src: "img/bkg/home-bckg-paucke.jpg" },
            { src: "img/bkg/home-bckg-siglos.jpg" },
            { src: "img/bkg/home-bckg-signos.jpg" }
        ],

        pause: function (index, slideSettings) {
            // body...
        }
    })*/

/***************** Slide me (background slide) ******************/
    $('.hero').slideme({
        pagination: "numbers",
        autoslide : true,
        interval : 4000,
        loop : true,
        onCreatedCallback : startSlide, //init slide
        onEndCallback : txtEffect, //end animaton
        onStartCallback : hideTxt, //before start animation
        speed : 200,        
        /*resizable: {
            width: 990,
            height: 450,
        }*/
        transition : 'fade' // Values: 'fade/slide/page/zoom'
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
