define([
	'jquery',
	'underscore',
	'backbone',
	'text!views/paucke/helpers/paucke.html',
	], function($, _, Backbone, pauckeTemplate) {
		var pauckeView = Backbone.View.extend({
			el: '#contenido',

			render: function() {
				$(this.el).html(_.template(pauckeTemplate));
			}
		});
		
		return new pauckeView;
	});