define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/capitulos.html',
    'text!views/signos/helpers/modal.html',
    

    ], function($, _, Backbone, capitulos,modaltemplate) {
        var Capitulos = Backbone.View.extend({
            el: '.grillaSignos',

            events: {
            },

            render: function() {
                jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(capitulos,{jsonData:jsonData}));
                var este = this;
                $("#capitulos .ampliar a").bind("click",este.mostrarOculto)
                $("#capitulos img").bind("click",este.lightbox);
                 var popupContainer = '<div id="popupContent"></div>';
                if (!$('#popupContainer')){
                    $('body').append(popupContainer);
                }
                
                $('#popupContent').popup({
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'all 0.3s',
                    pagecontainer: '#contenido',
                    blur: true,
                    scrolllock: true,
                    onopen: function() {       
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

                    }
                });   
            },

            mostrarOculto:function(e){
                e.preventDefault();
                $(e.target).next().toggleClass("hide");
                var text = $(e.target).html();
                $(e.target).html(
                         text == "<span>[+]</span> Ver más páginas" ? "<span>[-]</span> Ocultar páginas" : "<span>[+]</span> Ver más páginas");
            },

            lightbox: function (e) {
                var src= $(e.target).data("src");
                var extracto = $(e.target).data("extract");
            
                if(!$("#popupContent").size()){
                    $("body").append('<div id="popupContent"></div>')
                }

                var dataToShow = {
                    src:src,
                    extracto:extracto
                }

                var modal = _.template(modaltemplate,{dataToShow:dataToShow});
                var content = modal;
                var close = '<i class="popupContent_close fa fa-times-circle"></i>';

                $('#popupContent').html(content).popup('show')
                $('.modalContent > div:first-child').append(close);
                $('.modalContent').removeClass('hide');
                
            },
        });
        
        return Capitulos;
    });