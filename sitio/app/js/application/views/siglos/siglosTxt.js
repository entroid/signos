define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/siglos/helpers/siglosBio.html',
    'text!views/siglos/helpers/siglosMemorias.html',
    'text!views/siglos/helpers/siglosNotas.html',

    ], function($, _, Backbone, Bio, Memorias, Notas) {
        var TxtPaucke = Backbone.View.extend({
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

                 
                $(".imglink").click(este.abrirImagen)
                $(".modalFoto .cerrarModal").click(este.cerrarSegundoModal)
            },

            abrirImagen:function(e){

                e.preventDefault();
                var imagen = $(e.target).attr("href");
                 if (window.matchMedia('(max-width: 768px)').matches){
                        $(".siglosMemorias .modalFoto .imgwrapper").html('<img src="img/libros/siglos/'+imagen+'"/>')
                        $(".siglosMemorias .modalFoto").show()

                 }else{

                    $(".fotoSiglos").html('<img src="img/libros/siglos/'+imagen+'"/>')
               
                }

            },

            cerrarSegundoModal:function(e){
                $(".siglosMemorias .modalFoto").hide()
            }
        });
        
        return TxtPaucke;
    });