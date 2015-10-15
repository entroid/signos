define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/capitulos.html',

    ], function($, _, Backbone, capitulos) {
        var Capitulos = Backbone.View.extend({
            el: '.grillaSignos',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(capitulos,{jsonData:jsonData}));
            }
        });
        
        return Capitulos;
    });