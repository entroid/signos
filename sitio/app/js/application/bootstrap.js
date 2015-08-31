require.config({
    paths: {
        jquery: '../libs/jquery/jquery.min',
        underscore: '../libs/underscore/underscore.min',
        backbone: '../libs/backbone/backbone.min',
        bootstrap: '../libs/plugins/bootstrap.min',
        slideme: '../libs/plugins/jquery.slideme2',
        scripts: 'scripts',
        lightslider: '../libs/plugins/lightslider',
        fancybox: '../libs/plugins/jquery.fancybox.pack',
        popup: '../libs/plugins/jquery.popupoverlay',
        mlens: '../libs/plugins/jquery.mlens-1.5'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        slideme: {
            deps: ['backbone']
        },
        scripts: {
            deps: ['slideme']
        },
        lightslider: {
            deps: ['jquery']
        },
        fancybox: {
            deps: ['jquery']
        },
        popup: {
            deps: ['jquery']
        },
        mlens: {
            deps: ['jquery']
        },
    }
});

require(['app'], function(App) {
    App.init();
});