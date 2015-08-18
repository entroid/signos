require.config({
    paths: {
        jquery: '../libs/jquery/jquery.min',
        underscore: '../libs/underscore/underscore.min',
        backbone: '../libs/backbone/backbone.min',
        bootstrap: '../libs/plugins/bootstrap.min',
        slideme: '../libs/plugins/jquery.slideme2',
        scripts: 'scripts',
        lightslider: '../libs/plugins/lightslider.min',
        fancybox: '../libs/plugins/jquery.fancybox.pack'
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
    }
});

require(['app'], function(App) {
    App.init();
});