define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'lightslider',
    'text!views/paucke/helpers/modalContent.html',

    ], function($, _, Backbone, pauckeTemplate, lightslider, modalContent) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            render: function() {
                $(this.el).html(_.template(pauckeTemplate));
               /* _(this.lightsliderInit).defer();*/
               $(this.el).append(_.template(modalContent));
                _.defer(this.pluginsInit);
            },

            pluginsInit: function () {
                $("#lightSlider").lightSlider({
                    item: 1,
                    loop:false,
                    /*autoWidth: true,*/
                    mode: 'slide',
                    easing: 'linear',
                    speed: '400',
                    loop: true,
                    keyPress: true,
                    controls: true,
                    prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left"></i></span>',
                    nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right"></i></span>'
                });
            }
        });
        
        return new pauckeView;
    });