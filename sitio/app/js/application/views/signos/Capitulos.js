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
                
                
                $('#popupContent').popup({
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'all 0.3s',
                    pagecontainer: '#contenido',
                    blur: true,
                    scrolllock: true,
                    onopen: function() {       
                        // activar/desactivar zoom
                        $('.traduccion-btn').tipr().click(function(e){
                            var el = $(this)
                            este.activarLupa(e, el);
                        });

                    },

                    onclose: function() { 

                    }
                });   
            },

            mostrarOculto:function(e){
                e.preventDefault();
                var element = $(e.target);
                var text = $(element).html();

                $(element).parents('.ampliar').find('.transitions-fast').toggleClass("hide");
                
                $(element).html(text == "<span>[+]</span> Ver más páginas" ? "<span>[-]</span> Ocultar páginas" : "<span>[+]</span> Ver más páginas");
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
                var close = '<span class="popupContent_close cerrar-Btn"> <span></span> </span>';

                $('#popupContent').html(content).popup('show');
                $('.modalContent > div:first-child').append(close);
                $('.modalContent').removeClass('hide');
                
            },

            activarLupa: function(e, el) {
                var target = el;
                var trad = $('.tips');
                var img = $(".modalContent .content-1 img");

                if($(target).hasClass('active')) {
                    $(target).removeClass('active').attr('data-tip','Activar lupa');                   
                    $(img).mlens('destroy');
                    
                } else {
                    $(target).addClass('active').attr('data-tip','Desactivar lupa');
                                       
                    
                    $(img).mlens({
                        imgSrc: $(".modalContent .content-1 img").attr("src"),       // path of the hi-res version of the image
                        lensShape: "circle",                // shape of the lens (circle/square)
                        lensSize: 180,                  // size of the lens (in px)
                        borderSize: 1,                  // size of the lens border (in px)
                        borderColor: "#fff",                // color of the lens border (#hex)
                        zoomLevel: 1                                   // zoom level multiplicator (number)
                    });
                }
            }
        });
        
        return Capitulos;
    });