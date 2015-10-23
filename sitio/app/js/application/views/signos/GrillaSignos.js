define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/grilla.html',

    ], function($, _, Backbone, grilla) {
        var GrillaSignos = Backbone.View.extend({
            el: '.grillaSignos',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(grilla,{jsonData:jsonData}));
            }
        });
        
        return GrillaSignos;
    });