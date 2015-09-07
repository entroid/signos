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
                var jsonData = this.model.get("jsonData");
                $(this.el).html(_.template(slider,{jsonData:jsonData}));
            }
        });
        
        return SliderPaucke;
    });