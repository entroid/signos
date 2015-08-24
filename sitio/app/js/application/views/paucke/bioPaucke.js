define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/bioPaucke.html',

    ], function($, _, Backbone, bioPauckeTemplate) {
        var BioPaucke = Backbone.View.extend({
            el: '.sliderWrapper',

            events: {
                /*'click #lightSlider li img': 'lightbox'*/
            },

            render: function() {
                console.log('aloo')
                $(this.el).html(_.template(bioPauckeTemplate));

                
            }
        });
        
        return new BioPaucke;
    });