define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/siglos/helpers/siglos.html',
    'text!views/siglos/helpers/modal.html',
    'text!views/siglos/helpers/modal_panoramica.html',
    'text!views/siglos/helpers/modal_slide.html',
    'lightslider',
    'popup',
    'views/siglos/SliderSiglos',
    'views/siglos/grillaSiglos',
    'views/siglos/siglosTxt',
    'mlens',
    'tooltip'

    ], function($, _, Backbone, siglosTemplate, modaltemplate,modalpanoramicatemplate,modalslidetemplate,lightslider, popup, SliderSiglos,GrillaSiglos,SiglosTxt,mlens, tooltip) {
        var SiglosView = Backbone.View.extend({
            el: '#contenido',

            events: {
                //'click #lightSlider li img': 'lightbox',
                //'click #grilla .hoverContainer *': 'stopProp',
                'click #siglosBook .hoverContainer img': 'lightbox',
                'click #siglosBook .hoverContainer h3': 'lightbox',
                //'click #grilla .hoverContainer h3': 'hoverLightbox',
                //'click #lightSlider .hoverTitle *': 'stopProp',
                //'click #lightSlider .hoverTitle': 'hoverLightbox',
                'click #siglosBook .navBook nav a': 'openTxt',
                'click #siglosBook .cerrar': 'cerrar',
                'click #siglosBook .grillaBtn i': 'openGrilla',
                'click #siglosBook .sliderBtn span': 'openSlider',
                'click #siglosBook .info':"openTxtMenu"
            },

            render: function() {
                $(this.el).html(_.template(siglosTemplate));
                /* _(this.lightsliderInit).defer();*/
               
                this.jsonData ;
                var este = this;
                $.ajax({
                    
                    dataType: "json",
                    url: 'js/application/views/siglos/helpers/json/detalle.json',

                }).done(function(data) {       

                    este.jsonData = (typeof data == 'string') ? jQuery.parseJSON(data) : data; 
                    var SliderModel = Backbone.Model.extend({});
                    var sliderModel = new SliderModel({jsonData:data})
                    var sliderSiglos = new SliderSiglos({model:sliderModel});
                    sliderSiglos.render();
                    este.pluginsInit(este);
                    $('.tooltipBtn').tipr();

                    $(".hoverContainer img").mouseup(function (){
                            $(this).preventDefault;
                    });
                    
                }); 
            },

            pluginsInit: function (este) {

                var totalimg = $("#lightSlider img").size();
                var currentimg = 0;

                $("#lightSlider img").load(function(){
                    currentimg++;
                    if(currentimg==totalimg){

                         $("#lightSlider").lightSlider({
                                item: 2,
                                autoWidth: true,
                                slideMargin:60,
                                mode: 'slide',
                                easing: 'linear',
                                speed: '400',
                                keyPress: true,
                                controls: true,
                                /*enableDrag: false,*/
                                prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left transitions-fast"></i></span>',
                                nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right transitions-fast"></i></span>',
                                onSliderLoad: function(){
                                    $(".fa-spinner.fa-pulse").css("opacity", "0");
                                    $(".sliderWrapper").css({"height": "auto", "opacity":"1"});
                                },

                                responsive : [{
                                    breakpoint:768,
                                    settings: {
                                        item:1,
                                        autoWidth: false,
                                        slideMove:1,
                                        slideMargin:30,
                                    }
                                }]
                            });
                    }

                    
                })

                var popupContainer = '<div id="popupContent"></div>';
                $('body').append(popupContainer);
                
                //popup
                $('#popupContent').popup({
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'all 0.3s',
                    pagecontainer: '#contenido',
                    blur: true,
                    scrolllock: true,
                    onopen: function() {       

                        //naipes        
                        if($('.cartas #lightSlider2').length){
                            $('#popupContent').addClass('cartaSlide');
                            var lightSlider2 = $("#lightSlider2").lightSlider({
                                item: 1,
                                mode: 'slide',
                                easing: 'linear',
                                speed: '50',
                                keyPress: true,
                                controls: true,
                                prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left"></i></span>',
                                nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right"></i></span>'
                            });
                        }

                        $('.traduccion-btn').click(function(e){
                            var el = $(this)
                            este.openTrad(e, el);
                        });        

                        //zoom
                        $(".modalContent .content-1 img").mlens({
                            imgSrc: $(".modalContent .content-1 img").attr("src"),       // path of the hi-res version of the image
                            /*imgSrc2x: $(".modalContent .content-1 img").attr("data-big2x"),*/  // path of the hi-res @2x version of the image //for retina displays (optional)
                            lensShape: "circle",                // shape of the lens (circle/square)
                            lensSize: 180,                  // size of the lens (in px)
                            borderSize: 1,                  // size of the lens border (in px)
                            borderColor: "#fff",                // color of the lens border (#hex)
                            /*borderRadius: 0, */               // border radius (optional, only if the shape is square)
                            /*imgOverlay: $(".modalContent .content-1 img").attr("data-overlay"),*/ // path of the overlay image (optional)
                            /*overlayAdapt: true,*/ // true if the overlay image has to adapt to the lens size (true/false)
                            zoomLevel: 1.4                                    // zoom level multiplicator (number)
                        });

                        // tooltip
                      $('.traduccion-btn').tipr();

                      var url = location.href; 
                      Backbone.history.navigate( '/modal',{ trigger:true, replace: false })


                      cambiaHash = function(event){
                            if(location.hash == "#siglosback" || location.hash == "#siglos"){
                                $('#popupContent').popup('hide');
                            }
                      };

                      window.addEventListener("hashchange", cambiaHash, false);
                       
                    },

                    onclose: function() { 
                        $('#popupContent').removeClass('cartaSlide');
                        window.removeEventListener("hashchange");
                        Backbone.history.navigate( '/siglosback',{ trigger:true, replace: false })
                    }
                });              

            },

            ajaxOverlay: function(url) {
                if(!$("#popupContent").size()){
                    $("body").append('<div id="popupContent"></div>')
                }
                var este = this;
                var dataToShow = este.jsonData[url];

                if(!dataToShow.type){
                    var modal = _.template(modaltemplate,{dataToShow:dataToShow});
                    }else{
                        if(dataToShow.type == "panoramica" || dataToShow.type == "alone" ){
                        var modal = _.template(modalpanoramicatemplate,{dataToShow:dataToShow});
                        }else if(dataToShow.type == "slide"){
                          var modal = _.template(modalslidetemplate,{dataToShow:dataToShow});
                        }
                    }
                var content = modal;
                var close = '<span class="popupContent_close cerrar-Btn"> <span></span> </span>';

                $('#popupContent').html(content).popup('show')
                $('.modalContent > div:first-child').append(close);


                if ( dataToShow.type == "alone" ){                  
                    $('.modalContent').addClass('alone').removeClass('hide');
                }

                if ( !dataToShow.fragmento ) {
                    $('.modalContent blockquote').addClass('hide');
                }

                $('.modalContent').removeClass('hide');
                
            },

            lightbox: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var target = e.target;
                var url = $(target).attr('data-src');
                this.ajaxOverlay(url);              
            },
            
            stopProp: function(e){
                e.stopPropagation();
            },

            openTxt: function(e){
                e.preventDefault();

                var target = e.currentTarget,
                    seccion = $(target).attr('data-seccion'),
                    menu = $(target).parents('nav');

                $(menu).toggleClass('active');             

                var siglosTxt = new SiglosTxt();
                siglosTxt.render(seccion);
                

                /*este.timeOut(ajaxCall, 100);*/
            },

            cerrar: function(e, el) { 
                var elemento = el ? el : '#txt';          

                $(elemento).removeClass('adentro fondoAdentro').html('');

            },

            timeOut: function(fn, temp) {
                setTimeout(fn, temp);
            },

            openGrilla: function(e) {
                this.cerrar(e, $('#txt'));
                $('#txt').removeClass
                $('.navBook .sliderBtn').removeClass('inactive').fadeIn('100');
                $('.navBook .grillaBtn').addClass('inactive').fadeOut('100');
                //this.openTxt(e);

                var jsonData = this.jsonData;
                var GrillaModel = Backbone.Model.extend({});
                var grillaModel = new GrillaModel({jsonData:jsonData})
                var grillaSiglos = new GrillaSiglos({model:grillaModel});
                grillaSiglos.render();              
                
            },
            openSlider: function(e) {
                this.cerrar(e, $('#txt'));

                $('.navBook .sliderBtn').addClass('inactive').fadeOut('100');
                $('.navBook .grillaBtn').removeClass('inactive').fadeIn('100');

                var jsonData = this.jsonData;
                var SliderModel = Backbone.Model.extend({});
                var sliderModel = new SliderModel({jsonData:jsonData})
                var sliderSiglos = new SliderSiglos({model:sliderModel});
                sliderSiglos.render();
                this.pluginsInit();
            },
            openTrad: function(e, el) {
                var target = el;
                var trad = $('.tips');

                if($(target).hasClass('active')) {
                    $(target).removeClass('active').find('.fa').toggleClass('fa-eye-slash fa-eye');
                    $(trad).removeClass('showTt');
                } else {
                    $(target).addClass('active').find('.fa').toggleClass('fa-eye-slash fa-eye');
                    $(trad).addClass('showTt');
                }
            },

            openTxtMenu: function (e) {
                var el = $(e.target),
                    menu = $(el).siblings('nav');

                $(menu).toggleClass('active');
            }

        });
        
        return new SiglosView;
    });