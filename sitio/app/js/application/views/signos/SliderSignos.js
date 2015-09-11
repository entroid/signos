define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/slider.html',

    ], function($, _, Backbone, slider) {
        var SliderSignos = Backbone.View.extend({
            el: '.sliderWrapper',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                var jsonData = this.model.get("jsonData");
                $(this.el).html(_.template(slider,{jsonData:jsonData}));
            }
        });
        
        return SliderSignos;
    });