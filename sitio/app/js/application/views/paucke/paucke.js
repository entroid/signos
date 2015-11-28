define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'text!views/paucke/helpers/modal.html',
    'text!views/paucke/helpers/modal_panoramica.html',
    'text!views/paucke/helpers/modal_slide.html',
    'lightslider',
    'popup',
    'views/paucke/sliderPaucke',
    'views/paucke/grillaPaucke',
    'views/paucke/pauckeTxt',
    'mlens',
    'tooltip'

    ], function($, _, Backbone, pauckeTemplate, modaltemplate,modalpanoramicatemplate,modalslidetemplate,lightslider, popup, SliderPaucke,GrillaPaucke,PauckeTxt,mlens, tooltip) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            events: {
                //'click #lightSlider li img': 'lightbox',
                //'click #grilla .hoverContainer *': 'stopProp',
                'click #pauckeBook .hoverContainer img': 'lightbox',
                'click #pauckeBook .hoverContainer h3': 'lightbox',
                //'click #grilla .hoverContainer h3': 'hoverLightbox',
                //'click #lightSlider .hoverTitle *': 'stopProp',
                //'click #lightSlider .hoverTitle': 'hoverLightbox',
                'click #pauckeBook .navBook nav a': 'openTxt',
                'click #pauckeBook .cerrar': 'cerrar',
                'click #pauckeBook .grillaBtn i': 'openGrilla',
                'click #pauckeBook .sliderBtn span': 'openSlider',
                'click #pauckeBook .info':"openTxtMenu"
            },

            render: function() {
                $(this.el).html(_.template(pauckeTemplate));
                /* _(this.lightsliderInit).defer();*/
               
                this.jsonData ;
                var este = this;

                $.ajax({

                    dataType: "json",
                    url: 'js/application/views/paucke/helpers/json/detalle.json',

                }).done(function(data) {       

                    este.jsonData = (typeof data == 'string') ? jQuery.parseJSON(data) : data; 
                    var SliderModel = Backbone.Model.extend({});
                    var sliderModel = new SliderModel({jsonData:data})
                    var sliderPaucke = new SliderPaucke({model:sliderModel});
                    sliderPaucke.render();
                    este.pluginsInit(este);
                    $('.tooltipBtn').tipr();

                    $(".hoverContainer img").mouseup(function (){
                            $(this).preventDefault;
                    });

                    $('body').on('contextmenu', 'img', function(e){ return false; });
                    
                }); 
            },

            pluginsInit: function (este) {

                //$("#lightSlider").hide();
                var totalimg = $("#lightSlider img").size();
                var currentimg = 0;

                $("#lightSlider img").load(function(){
                    currentimg++;
                    if(currentimg== 1){                       

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
                        
                        $(".fa-spinner.fa-pulse").css("opacity", "0");
                        $(".sliderWrapper").css({"height": "auto", "opacity":"1"});                       
                    } else {
                        return
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
                            $(".sliderWrapper").css({"height": "auto", "opacity":"1"});
                        }
                        
                    //zoom
                        //$(".modalContent .content-1 img").mlens();

                    // activar/desactivar zoom
                        $('.traduccion-btn').tipr().click(function(e){
                            var el = $(this);
                            var cartas = $(el).siblings('div').hasClass('lSSlideOuter');
                            var img = cartas ? $("#lightSlider2 li img") : $(".modalContent .content-1 img");

                            este.activarLupa(e, el, img);
                        }); 

                        cambiaHash = function(event){                            
                            $('#popupContent').popup('hide');
                        };

                        window.addEventListener("hashchange", cambiaHash, false);  

                    },

                    onclose: function() { 
                        $('#popupContent').removeClass('cartaSlide');
                        window.removeEventListener("hashchange", cambiaHash, false);
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
                this.cerrar(e, $('#txt'));

                $('#txt').removeClass
                $('.navBook .sliderBtn').removeClass('inactive').fadeIn('100');
                $('.navBook .grillaBtn').addClass('inactive').fadeOut('100');
                //this.openTxt(e);

                var jsonData = this.jsonData;
                var GrillaModel = Backbone.Model.extend({});
                var grillaModel = new GrillaModel({jsonData:jsonData})
                var grillaPaucke = new GrillaPaucke({model:grillaModel});
                grillaPaucke.render();              
                
            },
            openSlider: function(e) {
                this.cerrar(e, $('#txt'));

                $('.navBook .sliderBtn').addClass('inactive').fadeOut('100');
                $('.navBook .grillaBtn').removeClass('inactive').fadeIn('100');

                var jsonData = this.jsonData;
                var SliderModel = Backbone.Model.extend({});
                var sliderModel = new SliderModel({jsonData:jsonData})
                var sliderPaucke = new SliderPaucke({model:sliderModel});
                sliderPaucke.render();
                this.pluginsInit(this);
            },
            activarLupa: function(e, el, img) {
                var target = el;
                var trad = $('.tips');
                

                if($(target).hasClass('active')) {
                    $(target).removeClass('active').attr('data-tip','Activar lupa');                   
                    $(img).mlens('destroy');
                    
                } else {
                    $(target).addClass('active').attr('data-tip','Desactivar lupa');
                                       
                    $(img).each(function(){     
                        console.log(this)
                        $(this).mlens({
                            imgSrc: $(this).attr("src"),       // path of the hi-res version of the image
                            lensShape: "circle",                // shape of the lens (circle/square)
                            lensSize: 180,                  // size of the lens (in px)
                            borderSize: 1,                  // size of the lens border (in px)
                            borderColor: "#fff",                // color of the lens border (#hex)
                            zoomLevel: 1.1                                   // zoom level multiplicator (number)
                        });
                    });                    
                }
            },

            openTxtMenu: function (e) {
                var el = $(e.target),
                    menu = $(el).siblings('nav');

                $(menu).toggleClass('active');
            }

        });
        
        return new pauckeView;
    });