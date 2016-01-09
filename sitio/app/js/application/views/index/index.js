define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/index/helpers/index.html',
    'slideme',
    ], function($, _, Backbone, indexTemplate, slideme) {
        var indexView = Backbone.View.extend({
            el: '#contenido',

            render: function() {
                var este = this;

                $(this.el).html(_.template(indexTemplate));

                if (window.matchMedia('(min-width: 768px)').matches){
                    $('.hero .paucke img').attr('src', 'img/bkg/home-bckg-paucke.jpg');
                    $('.hero .siglos img').attr('src', 'img/bkg/home-bckg-siglos.jpg');
                    $('.hero .signos img').attr('src', 'img/bkg/home-bckg-signos.jpg');
                }

                $('.hero .paucke img').load(function () {
                    $(".fa-spinner.fa-pulse").css("display", "none");
                })

            /***************** Slide me (background slide) ******************/
                $('.hero').slideme({
                    autoslide : true,
                    interval : 6000,
                    loop : true,
                    resizable : {
                        width: 360,
                        height: 640
                    },
                    onCreatedCallback : function(){
                        var btns = $('.home-cta .use-btn');

                       $(btns).mouseenter(function() {
                            console.log('enter');
                            var btnSection = $(this).attr('data-section');
                            este.btnHover(btnSection);
                        })

                        $(btns).mouseleave(function() {
                            console.log('leave');
                            $('.hero').slideme('play');
                        })


                    }, //init slide
                    onEndCallback : this.txtEffect, //end animaton
                    onStartCallback : this.hideTxt, //before start animation
                    speed : 400,        
                    transition : 'fade' // Values: 'fade/slide/page/zoom'
                });
            /************** ** **************/

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
            },

            events: {
              "click .nav-toggle": "navToggle", //cuando se clickea en el icono menu
              "click .overlay ul li a": "navToggle", //cuando se clickea en un link
              "click .overlay": "overlay" //cuando se clickea afuera
            },

            hideTxt: function () {
                $('.slideme li h1').fadeOut().toggleClass('txtAnimacion');
            },

            txtEffect: function () {
                $('.slideme li h1').toggleClass('txtAnimacion').fadeIn();
            },

            btnHover: function (btnSection) {                
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

                console.log(slide)
                $('.hero').slideme('playTo', slide).slideme('stop');
            },

            navToggle: function() {
                $(this).toggleClass("active");
                $(".overlay-boxify").toggleClass("open");
            },

            linkClick: function() {
                $(".nav-toggle").toggleClass("active");
                $(".overlay-boxify").toggleClass("open");
            },

            overlay: function() {
                $(".nav-toggle").toggleClass("active");
                $(".overlay-boxify").toggleClass("open");
            }

        });
        
        return new indexView;
    });