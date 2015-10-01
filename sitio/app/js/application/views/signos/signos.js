define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/signos.html',
    'text!views/signos/helpers/modal.html',
    'text!views/signos/helpers/modal_panoramica.html',
    'text!views/signos/helpers/modal_slide.html',
    'lightslider',
    'popup',
    'views/signos/SliderSignos',
    'views/signos/grillaSignos',
    'views/signos/signosTxt',
    'mlens',
    'tooltip'

    ], function($, _, Backbone, signosTemplate, modaltemplate,modalpanoramicatemplate,modalslidetemplate,lightslider, popup, SliderSignos,GrillaSignos,signosTxt,mlens, tooltip) {
        var sllider, slider2;
        var SignosView = Backbone.View.extend({
            el: '#contenido',

            events: {
                //'click #lightSlider li img': 'lightbox',
                //'click #grilla .hoverContainer *': 'stopProp',
                'click #signosBook #lightSlider .hoverContainer img': 'lightbox',
                'click #signosBook #lightSlider .hoverContainer h3': 'lightbox',
                'click #signosBook #subcapslider .hoverContainer img': 'lightboxSub',
                'click #signosBook #subcapslider .hoverContainer h3': 'lightboxSub',
                //'click #grilla .hoverContainer h3': 'hoverLightbox',
                //'click #lightSlider .hoverTitle *': 'stopProp',
                //'click #lightSlider .hoverTitle': 'hoverLightbox',
                'click #signosBook .informacion nav a': 'openTxt',
                'click #signosBook .cerrar': 'cerrar',
                'click #signosBook .grillaBtn i': 'openGrilla',
                'click #signosBook .sliderBtn span': 'openSlider',
                'click #signosBook #back':"backtocaps",
                'click #signosBook #main-menu li':"gotoSlider",
                'click #signosBook nav.subcaps li':"gotoSubCapSlider",
                'click #signosBook .info':"openTxtMenu",
                'click #signosBook .hitos':"openHitos"

            },

            render: function() {
                $(this.el).html(_.template(signosTemplate));
                /* _(this.lightsliderInit).defer();*/
               
                this.jsonData ;
                var este = this;
                $.ajax({

                    dataType: "json",
                    url: 'js/application/views/signos/helpers/json/detalle.json',

                }).done(function(data) { 
                    este.jsonData = (typeof data == 'string') ? jQuery.parseJSON(data) : data; 
                    _.each(este.jsonData.capitulos,function(elem,ind){
                        $("#main-menu ul").append('<li data-index="' + ind.split("cap").pop() + '">'+elem.titulo+'</li>')
                    })
                    
                    _.each(este.jsonData.hitos,function(elemhit,indixe){
                        $("#hitos-menu ul").append('<li data-index="' + indixe + '">'+elemhit.titulo+'</li>')
                    })

                    var SliderModel = Backbone.Model.extend({});
                    var sliderModel = new SliderModel({jsonData:data})
                    var slidersignos = new SliderSignos({model:sliderModel});
                    slidersignos.render();
                    este.pluginsInit(este);
                    $('.tooltipBtn').tipr();
                    var altura = $(".hitoswrap").height();
                    $(".hitosMenu").height(altura);
                
                    /*$(".hoverContainer img").mouseup(function (){
                            $(this).preventDefault;
                    });*/
                    
                }); 
            },

            pluginsInit: function (este) {


                $("#lightSlider").hide();
                var totalimg = $("#lightSlider img").size();
                var currentimg = 0;

                $("#lightSlider img").load(function(){
                    currentimg++;
                    if(currentimg==totalimg){
                        $("#lightSlider").show();
                         slider = $("#lightSlider").lightSlider({
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

                    $(".fa-spinner.fa-pulse").css("opacity", "0");
                    $(".sliderWrapper").css({"height": "auto", "opacity":"1"}); 
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
                                speed: '400',
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
                            zoomLevel: 1.1                                    // zoom level multiplicator (number)
                        });

                        // tooltip
                      $('.traduccion-btn').tipr();
                       
                    },

                    onclose: function() { 
                        $('#popupContent').removeClass('cartaSlide');
                    }
                });              

            },

            ajaxOverlay: function(obj) {
                if(!$("#popupContent").size()){
                    $("body").append('<div id="popupContent"></div>')
                }
                var este = this;
                var dataToShow = obj;

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
                var close = '<i class="popupContent_close fa fa-times-circle"></i>';

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
                var totalWidth = $(window).width();
                e.preventDefault();
                e.stopPropagation();
                var este = this;
                var target = e.target;
                $("#signosBook #second-row").show();
                 $("#signosBook #second-row").animate({
                    left:"2%"
                 },500,function(){
                 })

                 $("#signosBook #first-row").animate({
                    left:"-"+totalWidth+"px"
                 },500,function(){
                 })
                 var cap = $(e.target).data("src");
                
                 _.each(este.jsonData.capitulos[cap].subcapitulos,function(elem,ind){
                    $("#second-row .subcaps ul").append("<li data-cap='"+cap+"' data-index='" + ind + "'>"+elem.titulo+"</li>");
                 });
                 $("#second-row .subcaps li:eq(0)").addClass("selected");
                 $("#second-row .subcaps li:eq(0)").trigger("click");
            },

            lightboxSub:function(e){
                var $li = $(e.target).parents("li");
                var obj = $li.data("obj");
                this.ajaxOverlay(obj);
            },

            backtocaps:function(){
                 $("#signosBook #second-row").animate({
                    left:"100%"
                 },500,function(){
                    $("#signosBook #second-row").hide();
                     $("#second-row .subcaps ul").html("")
                     $("#second-row .lSSlideOuter").remove();
                     $("#second-row .sliderWrapper").append('<ul id="subcapslider"></ul>')
                 })

                 $("#signosBook #first-row").animate({
                    left:"0"
                 },500,function(){
                 })
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
                console.log(seccion)
                var signosTxt = new signosTxt();
                signosTxt.render(seccion);
                
                

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
                var grillasignos = new GrillaSignos({model:grillaModel});
                grillasignos.render();              
                
            },
            openSlider: function(e) {
                this.cerrar(e, $('#txt'));

                $('.navBook .sliderBtn').addClass('inactive').fadeOut('100');
                $('.navBook .grillaBtn').removeClass('inactive').fadeIn('100');

                var jsonData = this.jsonData;
                var SliderModel = Backbone.Model.extend({});
                var sliderModel = new SliderModel({jsonData:jsonData})
                var slidersignos = new SliderSignos({model:sliderModel});
                slidersignos.render();
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

            gotoSlider: function(e) {
                var target = $(e.target),
                    index = $(target).attr('data-index');

                slider.goToSlide(index);
                $('#signosBook #main-menu li').removeClass('selected');
                $(target).addClass('selected');
            },

            gotoSubCapSlider: function(e) {

                var cap = $(e.target).attr('data-cap');
                var index = $(e.target).attr('data-index');
                $("#second-row .subcaps li").removeClass("selected");
                $(e.target).addClass("selected");

                //$("#second-row .subcaps ul").html("")
                $("#second-row .lSSlideOuter").remove();
                $("#second-row .sliderWrapper").append('<ul id="subcapslider"></ul>');

                console.log(this.jsonData.capitulos[cap].subcapitulos[index])

                 _.each(this.jsonData.capitulos[cap].subcapitulos[index].contenido,function(obj,indixe){
                    var $li = $('<li class="'+indixe+' '+obj.claseSlider+'"><div class="hoverContainer"><img src="img/libros/signos/'+obj.lowres+'"/></div></li>');
                    $li.data("obj",obj);
                    $("#subcapslider").append($li);

                 });                 
                
                var totalimg = $("#subcapslider img").size();
                var currentimg = 0;

                $("#subcapslider img").load(function(){
                    currentimg++;
                    if(currentimg==totalimg){

                        slider2 = $("#subcapslider").lightSlider({
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
                                $("#subcapslider").parents(".lSSlideOuter").addClass("sub"+cap)
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

                        slider2.refresh();                            
                    }                   

                })
               
            },
            openTxtMenu: function (e) {
                var el = $(e.target),
                    menu = $(el).siblings('nav');

                $(menu).toggleClass('active');
            },

            openHitos:function(){
                $(".hitosMenu").slideToggle();
                if($(".hitos i").hasClass("fa-angle-down")){
                    $(".hitos i").removeClass("fa-angle-down");
                    $(".hitos i").addClass("fa-angle-up");
                }else{
                    $(".hitos i").addClass("fa-angle-down");
                    $(".hitos i").removeClass("fa-angle-up");
                }                
            }
        });
        
        return new SignosView;
    });