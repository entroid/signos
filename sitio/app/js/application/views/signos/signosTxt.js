define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/SignosBio.html',
    'text!views/signos/helpers/SignosMemorias.html',
    'text!views/signos/helpers/SignosNotas.html',

    ], function($, _, Backbone, Bio, Memorias, Notas) {
        var TxtSignos = Backbone.View.extend({
            el: '#txt',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function(seccion) {
                var seccionTemplate, 
                este = this;

                if ( seccion == 'Bio' ){
                    seccionTemplate = Bio;
                } else if ( seccion == 'Memorias' ) {
                    seccionTemplate = Memorias;
                } else if ( seccion == 'Notas') {
                    seccionTemplate = Notas;
                };

                $(este.el).removeClass('adentro');  
                
                    $(este.el).html(_.template(seccionTemplate));                  
                $(este.el).fadeIn(200, function(){
                    $(este.el).addClass('adentro fondoAdentro');
                })                    

                 

                
            }
        });
        
        return TxtSignos;
    });