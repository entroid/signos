define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/slider.html',

    ], function($, _, Backbone, slider) {
        var SliderPaucke = Backbone.View.extend({
            el: '.sliderWrapper',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                $(this.el).html(_.template(slider));
            }
        });
        
        return SliderPaucke;
    });