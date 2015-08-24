define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'slideme',
    'scripts',
    'views/index/index',
    'views/paucke/paucke',
    'views/siglos/siglos',
    'views/signos/signos'
    ], 
    function($, _, Backbone, bootstrap, slideme, scripts, indexView, pauckeView, siglosView, signosView) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'index', // http://example.com/
                'index.html': 'index', // index.html
                ':name': 'libroAbrir', // #paucke
                /*'paucke/:query': 'txtPaucke',  // #paucke/kiwis*/
                '*actions': 'index'
            },

            index: function() {
                indexView.render();
            },
            paucke: function() {
                pauckeView.render();
            },
            txtPaucke: function(query){
                if (query === "bioPaucke") {
                    bioPauckeView.render(); 

                } else if (query === "memorias") {
                    /*memoriasPauckeView.render();*/
                }
            },
            libroAbrir: function(name) {
                if (name === "paucke") {
                    pauckeView.render(); 

                } else if (name === "siglos") {
                    siglosView.render();
                } else if (name === "signos") {
                    signosView.render();
                } 
            }
        });

        var init = function() {
            var app_router = new AppRouter;
            Backbone.history.start();
        };
        return {
            init: init
        }
    });
