define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var Paucke = Backbone.Model.extend({
        defaults: {
            tit: 'Titulo foto',
            img: 'url/img.jpg',
            frag: '<p>fragmento</p>',
            trad: 'traduccion'
        },

        initialize: function(){
            console.log("enetring paucke model");
        }
        
    });

    return Paucke;

});