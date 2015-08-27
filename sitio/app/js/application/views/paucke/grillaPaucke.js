define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/grilla.html',

    ], function($, _, Backbone, grilla) {
        var GrillaPaucke = Backbone.View.extend({
            el: '.sliderWrapper',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                $(this.el).html(_.template(grilla));
            }
        });
        
        return GrillaPaucke;
    });