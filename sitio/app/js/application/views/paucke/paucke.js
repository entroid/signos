define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'lightslider',
    'fancybox'

    ], function($, _, Backbone, pauckeTemplate, lightslider, fancybox) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #lightSlider li img': 'lightbox'
            },

            render: function() {
                $(this.el).html(_.template(pauckeTemplate));
               /* _(this.lightsliderInit).defer();*/
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
            },

            lightbox: function (e) {
                e.preventDefault();
                var target = e.target;
                var url = $(target).attr('data-src');

                $.ajax({
                  url: url,
                  dataType: 'html',
                }).done(function(data) {
                  /*$(".fancybox").fancybox();*/
                    $.fancybox(data);
                    $('.modalCOntent').removeClass('hide')
                });               
            }
        });
        
        return new pauckeView;
    });