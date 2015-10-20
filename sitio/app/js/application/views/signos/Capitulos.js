define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/capitulos.html',

    ], function($, _, Backbone, capitulos) {
        var Capitulos = Backbone.View.extend({
            el: '.grillaSignos',

            events: {
            },

            render: function() {
                jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(capitulos,{jsonData:jsonData}));
                var este = this;
                $("#capitulos .ampliar a").bind("click",este.mostrarOculto)
            },

            mostrarOculto:function(e){
                e.preventDefault();
                $(e.target).next().toggleClass("hide");
                var text = $(e.target).html();
                $(e.target).html(
                         text == "<span>[+]</span> Ver más" ? "<span>[-]</span> Ocultar" : "<span>[+]</span> Ver más");
            }
        });
        
        return Capitulos;
    });