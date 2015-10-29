define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/grilla.html',

    ], function($, _, Backbone, grilla) {
        var GrillaSignos = Backbone.View.extend({
            el: '.grillaSignos',

            events: {
                'mostrarImagen .signos_portada': 'mostrarImagenFun'
            },

            render: function() {
                jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(grilla,{jsonData:jsonData}));
                $(".signos_portada img").hide();
                 $(".signos_portada img:eq(0)").show();
            },

            mostrarImagenFun:function(evt,el){
            if($(el).prop("tagName")=="SPAN"){
                $li = $(el).parent();
            }else{
                $li = $(el)
            }
            $(".signos_portada img").hide();
             $(".signos_portada img:eq("+$li.data("index")+")").show();
            }
        });
        
        return GrillaSignos;
    });