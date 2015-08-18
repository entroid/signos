define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'lightslider',
    'text!views/paucke/helpers/modalContent.html',
    'model/paucke/pauckeModel',
    'fancybox',
    /*'text!views/description/description',*/

    ], function($, _, Backbone, pauckeTemplate, lightslider, modalContent,pauckeModel, fancybox/*, DescView*/) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #lightSlider li img': 'lightbox'
            },

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
                    console.log(data)
                });               
            }
        });
        
        return new pauckeView;
    });