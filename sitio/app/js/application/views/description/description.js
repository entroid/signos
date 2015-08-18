define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/description/helpers/description.html'

    ], function($, _, Backbone, descTemplate) {
        var DescView = Backbone.View.extend({
            el: '#description',

            render: function() {
                $(this.el).html(_.template(descTemplate, {text: 'o hai!'}));
            },
        });
        
        return new DescView;
    });