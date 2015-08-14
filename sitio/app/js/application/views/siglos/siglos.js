define([
	'jquery',
	'underscore',
	'backbone',
	'text!views/siglos/helpers/siglos.html',
	], function($, _, Backbone, siglosTemplate) {
		var siglosView = Backbone.View.extend({
			el: '#contenido',

			render: function() {
				$(this.el).html(_.template(siglosTemplate));
			}
		});
		
		return new siglosView;
	});