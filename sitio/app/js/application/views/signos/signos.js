define([
	'jquery',
	'underscore',
	'backbone',
	'text!views/signos/helpers/signos.html',
	], function($, _, Backbone, signosTemplate) {
		var signosView = Backbone.View.extend({
			el: '#contenido',

			render: function() {
				$(this.el).html(_.template(signosTemplate));
			}
		});
		
		return new signosView;
	});