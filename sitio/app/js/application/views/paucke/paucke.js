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
                    enableDrag: false,
                    prevHtml: '<span class="prevBtn"><i class="fa fa-chevron-left transitions-fast"></i></span>',
                    nextHtml: '<span class="nextBtn"><i class="fa fa-chevron-right transitions-fast"></i></span>'
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

                        $('img').on('contextmenu', function(e) {
                            return false;
                        });
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
                    element,
                    este = this;                     

                    var ajaxCall = function(){
                        $.ajax({
                          url: url,
                          dataType: 'html',
                        }).done(function(data) {
                            var hacerVisible = function(){                             
                                $('#txt').addClass('adentro');
                            }

                            $('#txt').html(data);

                            este.timeOut(hacerVisible, 100);
                                      
                            
                        }); 
                    }

                    $('#txt').removeClass('adentro');

                    este.timeOut(ajaxCall, 100);
            },

            cerrar: function() {                
                var hacerInvisible = function(){ 
                    $('#txt').removeClass('adentro')
                }
                this.timeOut(hacerInvisible, 100);
            },

            timeOut: function(fn, temp) {
                setTimeout(fn, temp);
            }
        });
        
        return new pauckeView;
    });