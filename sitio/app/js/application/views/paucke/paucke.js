define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'lightslider',/*
    'fancybox',
    */'popup'

    ], function($, _, Backbone, pauckeTemplate, lightslider/*, fancybox*/, popup) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #lightSlider li img': 'lightbox',
                'click #lightSlider .hoverTitle': 'hoverLightbox'
            },

            render: function() {
                $(this.el).html(_.template(pauckeTemplate));
               /* _(this.lightsliderInit).defer();*/
                _.defer(this.pluginsInit);

                
            },

            pluginsInit: function () {
                $("#lightSlider").lightSlider({
                    item: 2,
                    loop:false,
                    /*autoWidth: true,*/
                    mode: 'slide',
                    easing: 'linear',
                    speed: '400',
                    keyPress: true,
                    controls: true,
                    prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left"></i></span>',
                    nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right"></i></span>'
                });

                $('#popupContent').popup({
                    opacity: 0.8,
                    pagecontainer: '.contenido'
                })
            },

            ajaxOverlay: function(url) {
                $.ajax({
                  url: url,
                  dataType: 'html',
                }).done(function(data) {
                  /*$(".fancybox").fancybox();*/
                    /*$.fancybox(data);*/
                    var content = data + '<i class="popupContent_close fa fa-times-circle"></i>'
                    $('#popupContent').html(content).popup('show').find('.modalContent').removeClass('hide');
                }); 
            },

            lightbox: function (e) {
                e.preventDefault();
                var target = e.target;
                var url = $(target).attr('data-src');

                this.ajaxOverlay(url);              
            },

            hoverLightbox: function(e) {
                var target = e.target;
                var url = $(target).siblings('img').attr('data-src');
                this.ajaxOverlay(url);
            }
        });
        
        return new pauckeView;
    });