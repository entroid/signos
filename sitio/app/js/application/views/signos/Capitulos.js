define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/capitulos.html',

    ], function($, _, Backbone, capitulos) {
        var Capitulos = Backbone.View.extend({
            el: '.grillaSignos',

            events: {
                'click #capitulos .ampliar a': 'mostrarOculto'
            },

            render: function() {
                jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(capitulos,{jsonData:jsonData}));
            },

            mostrarOculto:function(e){
                e.preventDefault();
                $(e.target).next().toggleClass("hide");
                var text = $(e.target).text();
                $(e.target).text(
                         text == "mostrar" ? "ocultar" : "mostrar");
            }
        });
        
        return Capitulos;
    });