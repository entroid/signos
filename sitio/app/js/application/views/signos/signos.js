define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/signos/helpers/signos.html',
    'text!views/signos/helpers/modal.html',
    'text!views/signos/helpers/signosPortada.html',
    'popup',
    'views/signos/GrillaSignos',
    'views/signos/signosTxt',
    'mlens',
    'tooltip',
    'views/signos/Capitulos',
    'mCustomScrollbar'
    ], function($, _, Backbone, signosTemplate, modaltemplate, signosPortada, popup,GrillaSignos,SignosTxt,mlens, tooltip,Capitulos,mCustomScrollbar) {
        var sllider, slider2;
        var SignosView = Backbone.View.extend({
            el: '#contenido',

            events: {
                'click #signosBook .informacion nav a': 'openTxt',
                'click #signosBook .cerrar': 'cerrar',
                'click #signosBook .info':"openTxtMenu",
                'click #signosBook .hitosOpen':"openHitos",
                'click #signosBook .main-ul .main-title span':"opensubs",
                'click #signosBook .mainhitos span':"opensubs",
                'click #signosBook .main-ul .subcaps li':"openCapitulos",
                'click #hitos-menu .subcaps li':"openHitosCap",
                'hover #signosBook .main-ul .main-title':"hoverImg",
                //'hover .grillaSignos .hoverContainer img': "hoverCap"
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
                        $titleLi = $('<li data-index="' + ind.split("cap").pop() + '" class="main-title"><span>'+elem.titulo+'</span></li>');
                        $subcapul = $('<ul class="subcaps"/>')
                        _.each(elem.subcapitulos,function(subcaps,numb){
                                $subcapul.append('<li  data-index="' + ind.split("cap").pop() + '" data-subindex="'+numb+'">'+subcaps.titulo+'</li>');
                         })
                        $titleLi.append($subcapul);
                        $("#main-menu ul.main-ul").append($titleLi);

                    })
                    $("#main-menu, #hitos-menu").mCustomScrollbar({
                            theme:"minimal-dark",
                            scrollInertia:300,
                    });
                    _.each(este.jsonData.hitos,function(elemhit,indixe){
                        var $lihitos = $('<li data-index="' + indixe + '"><span>'+elemhit.titulo+'</span></li>');
                        var $subcapulhitos = $('<ul class="subcaps"/>');
                          _.each(elemhit.subhitos,function(subhitos,number){ 
                                    $subcapulhitos.append('<li data-index="'+indixe.split("cap").pop()+'" data-subindex="'+number+'">'+subhitos.titulo+'</li>');
                          });
                         $lihitos.append($subcapulhitos);
                        $("#hitos-menu ul.mainhitos").append($lihitos);

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
                var $li = $(e.target).parent();
                console.log($li)
                if($li.find(".subcaps").hasClass("open")){
                    $li.find(".subcaps").removeClass("open").slideUp();
                }else{
                     $(".subcaps.open").slideUp(function(){
                        $(this).removeClass("open")
                     });
                     $li.find(".subcaps").slideDown(function(){
                        $(this).addClass("open")
                     });
                   
                /*    var index = $(e.target).parent().data("index");
                    var capitulo = this.jsonData.capitulos["cap"+index];
                    $('.grillaSignos').html(_.template(signosPortada,{jsonData:capitulo}));
                    var este = this;
                    $("#Portada a").bind("click",este.openCapsInPortada)
                */
                }
            },
            openCapitulos:function(e){
                var index = $(e.target).data("index");
                var subindex = $(e.target).data("subindex");
                var data = this.jsonData.capitulos["cap"+index].subcapitulos[subindex];
                console.log(data)
                var CapitulosModel = Backbone.Model.extend({});
                var capitulosModel = new CapitulosModel({jsonData:data})
                var capitulos = new Capitulos({model:capitulosModel});
                capitulos.render();
            },

            openHitosCap:function(e){
                console.log($(e.target).data("index"))
                var data = this.jsonData.hitos["cap"+$(e.target).data("index")].subhitos[$(e.target).data("subindex")];
                console.log(data)
                var CapitulosModel = Backbone.Model.extend({});
                var capitulosModel = new CapitulosModel({jsonData:data})
                var capitulos = new Capitulos({model:capitulosModel});
                capitulos.render();
            },

            hoverImg: function(e){                
                var el = $(e.target);
                $(".signos_portada").trigger("mostrarImagen",[el])
            },
            /*hoverCap: function(e){
                var el = $(e.target),
                    index = $(el).attr('data-src').replace('cap', '');
                    console.log('#signosBook .main-ul .main-title[data-index=' + index + ']')
                $('#signosBook .main-ul .main-title[data-index=' + index + ']').toggleClass('active');

                
            },*/
            openCapsInPortada:function(e){
                e.preventDefault();
                var subindex = $(e.target).data("subindex");
                $(".subcaps.open li[data-subindex="+subindex+"]").trigger("click")
            }


        });
        
        return new SignosView;
    });