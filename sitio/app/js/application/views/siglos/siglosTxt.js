define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/siglos/helpers/siglosBio.html',
    'text!views/siglos/helpers/siglosMemorias.html',
    'text!views/siglos/helpers/siglosNotas.html',
    'waypointsScroll',

    ], function($, _, Backbone, Bio, Memorias, Notas, WaypointsScroll) {
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

                 
                $(".imglink").click(este.abrirImagen);
                $(".imglink").hover(este.abrirImagen);
                $(".modalFoto .cerrarModal").click(este.cerrarSegundoModal);

                $('.notas').tipr();


                this.scrollFuncion('.imglink');


            },

            abrirImagen:function(e){

                e.preventDefault();
                var imagen = $(e.target).attr("href");
                var txt = $(e.target).attr("data-txt");

                var content = imagen ? '<img src="img/libros/siglos/'+imagen+'"/><p>' +txt + '</p>' : '<p>' +txt + '</p>';


                if (window.matchMedia('(max-width: 768px)').matches){
                        $(".siglosMemorias .modalFoto .imgwrapper").html(content);
                        $(".siglosMemorias .modalFoto").show();

                }else{

                    $(".fotoSiglos").html(content);
               
                }

            },

            abrirImagen2:function(el){
                var imagen = $(el).attr("href");
                var txt = $(el).attr("data-txt");

                var content = imagen ? '<img src="img/libros/siglos/'+imagen+'"/><p>' +txt + '</p>' : '<p>' +txt + '</p>';


                if (window.matchMedia('(max-width: 768px)').matches){
                        $(".siglosMemorias .modalFoto .imgwrapper").html(content);
                        $(".siglosMemorias .modalFoto").show();

                }else{

                    $(".fotoSiglos").html(content);
               
                }

            },

            cerrarSegundoModal:function(e){
                $(".siglosMemorias .modalFoto").hide()
            },

            scrollFuncion:function(el){                
                var elementos = $(el); 
                var este = this;               
    
                $(elementos).each( function(ind){
                    var elem = $(this);
                    var waypoints = $(elem).waypoint({
                          handler: function(direction) {
                            console.log(elem);
                             este.abrirImagen2(elem);
                          },
                          context: '#txt .txtSiglos',
                          offset: '-50%'
                    })
                })
                
            }
        });
        
        return TxtPaucke;
    });