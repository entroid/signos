define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'text!views/paucke/helpers/modal.html',
    'lightslider',
    'popup',
    'views/paucke/sliderPaucke',
    'views/paucke/grillaPaucke',
    'views/paucke/pauckeTxt',
    'mlens'

    ], function($, _, Backbone, pauckeTemplate, modaltemplate,lightslider, popup, SliderPaucke,GrillaPaucke,PauckeTxt,mlens) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #lightSlider li img': 'lightbox',
                'click #grilla .hoverContainer *': 'stopProp',
                'click #grilla .hoverContainer .hoverTitle': 'hoverLightbox',
                'click #grilla .hoverContainer h3': 'hoverLightbox',
                'click #lightSlider .hoverTitle *': 'stopProp',
                'click #lightSlider .hoverTitle': 'hoverLightbox',
                'click .navBook nav a': 'openTxt',
                'click .cerrar': 'cerrar',
                'click .grillaBtn i': 'openGrilla',
                'click .sliderBtn span': 'openSlider'
            },

            render: function() {
                $(this.el).html(_.template(pauckeTemplate));
                var sliderPaucke = new SliderPaucke();
                sliderPaucke.render();
               /* _(this.lightsliderInit).defer();*/
                _.defer(this.pluginsInit);
                this.jsonData ;
                var este = this;
                $.ajax({
                          url: 'js/application/views/paucke/helpers/json/detalle.json',
                        }).done(function(data) {
                        
                        este.jsonData = data;  

                            
                        }); 
            },

            pluginsInit: function () {
                $("#lightSlider").lightSlider({
                    item: 2,
                    autoWidth: true,
                    slideMargin:60,
                    mode: 'slide',
                    easing: 'linear',
                    speed: '400',
                    keyPress: true,
                    controls: true,
                    enableDrag: false,
                    prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left transitions-fast"></i></span>',
                    nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right transitions-fast"></i></span>',

                    responsive : [{
                        breakpoint:768,
                        settings: {
                            item:1,
                            slideMove:1,
                            slideMargin:6,
                        }
                    },
                    {
                        breakpoint:480,
                        settings: {
                            item:1,
                            slideMove:1
                          }
                    }]
                });

                $('#popupContent').popup({
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'all 0.3s',
                    pagecontainer: '#contenido',
                    blur: true,
                    onopen: function() {       

                        //naipes        
                        if($('.cartas #lightSlider2').length){
                            $('#popupContent').addClass('cartaSlide');
                            var lightSlider2 = $("#lightSlider2").lightSlider({
                                item: 1,
                                mode: 'slide',
                                easing: 'linear',
                                speed: '400',
                                keyPress: true,
                                controls: true,
                                prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left"></i></span>',
                                nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right"></i></span>'
                            });
                        }

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
                            zoomLevel: 1.1                                    // zoom level multiplicator (number)
                        });
                       
                    },

                    onclose: function() { 
                        $('#popupContent').removeClass('cartaSlide');
                    }
                });
            },

            ajaxOverlay: function(url) {
                var este = this;
                var dataToShow = este.jsonData[url];
                var modal = _.template(modaltemplate,{dataToShow:dataToShow});
                var content = modal + '<i class="popupContent_close fa fa-times-circle"></i>'
                $('#popupContent').html(content).popup('show').find('.modalContent').removeClass('hide');
                
            },

            lightbox: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var target = e.target;
                var url = $(target).attr('data-src');
                this.ajaxOverlay(url);              
            },

            hoverLightbox: function(e) {
                console.log('entr')
                var target = e.target;
                var url = $(target).parents('.hoverContainer').find('img').attr('data-src');

                this.ajaxOverlay(url);
            },
            stopProp: function(e){
                e.stopPropagation();
            },

            openTxt: function(e){
                e.preventDefault();

                var target = e.currentTarget,
                    seccion = $(target).attr('data-seccion');/*,
                   url = 'js/application/views/paucke/helpers/' + seccion + '.html',
                    element,
                    este = this,
                    cont = seccion === 'grilla' ? $('#grillaContent') : $('#txt');*/

                /*$('#txt .txtArea').fadeOut();                    

                if (seccion){
                    var ajaxCall = function(){
                        $.ajax({
                          url: url,
                          dataType: 'html',
                        }).done(function(data) {
                            var hacerVisible = function(){                             
                                $(cont).addClass('adentro fondoAdentro');
                            }

                            $(cont).html(data);

                            este.timeOut(hacerVisible, 100);
                                      
                            
                        }); 
                    }
                }            */               

                var pauckeTxt = new PauckeTxt();
                pauckeTxt.render(seccion);
                

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
                console.log('entr')
                this.cerrar(e, $('#txt'));

                $('#txt').removeClass
                $('.navBook .sliderBtn').removeClass('inactive').fadeIn('100');
                $('.navBook .grillaBtn').addClass('inactive').fadeOut('100');
                //this.openTxt(e);
                var grillaPaucke = new GrillaPaucke({});
                grillaPaucke.render();              
                
            },
            openSlider: function(e) {
                this.cerrar(e, $('#txt'));

                $('.navBook .sliderBtn').addClass('inactive').fadeOut('100');
                $('.navBook .grillaBtn').removeClass('inactive').fadeIn('100');

                var sliderPaucke = new SliderPaucke();
                sliderPaucke.render();
                this.pluginsInit();
            }
        });
        
        return new pauckeView;
    });