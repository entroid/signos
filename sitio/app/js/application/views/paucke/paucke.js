define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/paucke/helpers/paucke.html',
    'lightslider',
    'popup',

    ], function($, _, Backbone, pauckeTemplate, lightslider/*, fancybox*/, popup) {
        var pauckeView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #lightSlider li img': 'lightbox',
                'click #lightSlider .hoverTitle *': 'stopProp',
                'click #lightSlider .hoverTitle': 'hoverLightbox',
                'click .navBook nav a': 'openTxt',
                'click .cerrar': 'cerrar'
            },

            render: function() {
                $(this.el).html(_.template(pauckeTemplate));
               /* _(this.lightsliderInit).defer();*/
                _.defer(this.pluginsInit);

                
            },

            pluginsInit: function () {
                var lightSlider = $("#lightSlider").lightSlider({
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
                    color: '#fff',
                    opacity: 0.9,
                    transition: 'all 0.3s',
                    pagecontainer: '#contenido',
                    blur: true,
                    onopen: function() {               
                        if($('.cartas #lightSlider2').length){
                            $('#popupContent').addClass('cartaSlide');
                            var lightSlider2 = $("#lightSlider2").lightSlider({
                                item: 1,
                                mode: 'slide',
                                easing: 'linear',
                                speed: '400',
                                keyPress: true,
                                controls: true,
                                prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left"></i></span>',
                                nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right"></i></span>'
                            });
                        }
                       
                    },

                    onclose: function() { 
                        $('#popupContent').removeClass('cartaSlide');
                    }
                });
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
                e.stopPropagation();
                var target = e.target;
                var url = $(target).attr('data-src');

                this.ajaxOverlay(url);              
            },

            hoverLightbox: function(e) {
                var target = e.target;
                var url = $(target).siblings('img').attr('data-src');
                this.ajaxOverlay(url);
            },
            stopProp: function(e){
                e.stopPropagation();
            },

            openTxt: function(e){
                e.preventDefault();
                var target = e.currentTarget,
                    seccion = $(target).attr('data-seccion'),
                    url = 'js/application/views/paucke/helpers/' + seccion + '.html',
                    element;

                    if(seccion == 'bioPaucke') {

                    }    

                    $.ajax({
                      url: url,
                      dataType: 'html',
                    }).done(function(data) {
                        $('#txt').html(data).removeClass('afuera');
                    }); 

            },

            cerrar: function() {
                $('#txt').addClass('afuera')
            }
        });
        
        return new pauckeView;
    });