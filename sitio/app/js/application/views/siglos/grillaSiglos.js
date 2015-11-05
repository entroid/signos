define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/siglos/helpers/grilla.html',

    ], function($, _, Backbone, grilla) {
        var GrillaSiglos = Backbone.View.extend({
            el: '.sliderWrapper',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                var jsonData = this.model.get("jsonData")
                $(this.el).html(_.template(grilla,{jsonData:jsonData}));
            }
        });
        
        return GrillaSiglos;
    });