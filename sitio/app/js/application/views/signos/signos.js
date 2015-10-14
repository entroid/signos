define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/signos.html',
    'text!views/signos/helpers/modal.html',
    'text!views/signos/helpers/modal_panoramica.html',
    'text!views/signos/helpers/modal_slide.html',
    'lightslider',
    'popup',
    'views/signos/SliderSignos',
    'views/signos/GrillaSignos',
    'views/signos/signosTxt',
    'mlens',
    'tooltip'

    ], function($, _, Backbone, signosTemplate, modaltemplate,modalpanoramicatemplate,modalslidetemplate,lightslider, popup, SliderSignos,GrillaSignos,SignosTxt,mlens, tooltip) {
        var sllider, slider2;
        var SignosView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #signosBook .informacion nav a': 'openTxt',
                'click #signosBook .cerrar': 'cerrar',
                'click #signosBook .info':"openTxtMenu",
                'click #signosBook .hitosOpen':"openHitos",
                'click #signosBook .main-ul .main-title':"opensubs"

            },

            render: function() {
                $(this.el).html(_.template(signosTemplate));
                /* _(this.lightsliderInit).defer();*/
               
                this.jsonData ;
                var este = this;
                $.ajax({

                    dataType: "json",
                    url: 'js/application/views/signos/helpers/json/detalle.json',

                }).done(function(data) { 
                    este.jsonData = (typeof data == 'string') ? jQuery.parseJSON(data) : data; 
                    _.each(este.jsonData.capitulos,function(elem,ind){
                        $titleLi = $('<li data-index="' + ind.split("cap").pop() + '" class="main-title">'+elem.titulo+'</li>');
                        $subcapul = $('<ul class="subcaps"/>')
                        _.each(elem.subcapitulos,function(subcaps,numb){
                                $subcapul.append('<li data-subindex="'+numb+'">'+subcaps.titulo+'</li>');
                         })
                        $titleLi.append($subcapul);
                        $("#main-menu ul.main-ul").append($titleLi);

                    })
                    
                    _.each(este.jsonData.hitos,function(elemhit,indixe){
                        $("#hitos-menu ul").append('<li data-index="' + indixe + '">'+elemhit.titulo+'</li>')
                    })

                    var SliderModel = Backbone.Model.extend({});
                    var sliderModel = new SliderModel({jsonData:data})
                    var grillaSignos = new GrillaSignos({model:sliderModel});
                    grillaSignos.render();
                    //este.pluginsInit(este);
                    $('.tooltipBtn').tipr();
                    var altura = $(".hitoswrap").height();
                    $(".hitosMenu").height(altura);
                
                    
                }); 
            },

            openTxt: function(e){
                e.preventDefault();                  

                var target = e.currentTarget,
                    seccion = $(target).attr('data-seccion'),
                    menu = $(target).parents('nav');

                $(menu).toggleClass('active');

                console.log(SignosTxt)
                var signosTxt = new SignosTxt();
                signosTxt.render(seccion);
                
                

                /*este.timeOut(ajaxCall, 100);*/
            },

            cerrar: function(e, el) { 
                var elemento = el ? el : '#txt';          

                $(elemento).removeClass('adentro fondoAdentro').html('');

            },

            timeOut: function(fn, temp) {
                setTimeout(fn, temp);
            },
 
            openTxtMenu: function (e) {
                var el = $(e.target),
                    menu = $(el).siblings('nav');

                $(menu).toggleClass('active');
            },

            openHitos:function(){
                $(".hitoswrap").toggleClass('active');   
                    $("#signosBook").css("overflow","hidden")
                if($(".hitos i").hasClass("fa-angle-down")){
                    $(".hitos i").removeClass("fa-angle-down");
                    $(".hitos i").addClass("fa-angle-up");
                }else{
                    $(".hitos i").addClass("fa-angle-down");
                    $(".hitos i").removeClass("fa-angle-up");
                }  

                $(".hitosMenu").slideToggle(400,function(){
                    $("#signosBook").css("overflow","visible")
                });                
            },

            opensubs:function(e){
                if($(e.target).find(".subcaps").hasClass("open")){
                    console.log("a")
                    $(e.target).find(".subcaps").removeClass("open").slideUp();
                }else{
                     $(".subcaps.open").slideUp(function(){
                        $(this).removeClass("open")
                     });
                     $(e.target).find(".subcaps").slideDown(function(){
                        $(this).addClass("open")
                     });
                   

                }
            }
        });
        
        return new SignosView;
    });