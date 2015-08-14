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
	'views/signos/signos',
	], 
	function($, _, Backbone, bootstrap, slideme, scripts, indexView, pauckeView, siglosView, signosView) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'': 'index', // Matches http://example.com/
				'index.html': 'index', // Matches http://example.com/index.html
				':name': 'libroAbrir', // Matches http://example.com/index.html#paucke
				'*actions': 'index'
			},

			index: function() {
				indexView.render();
			},
			paucke: function() {
				pauckeView.render();
			},
			libroAbrir: function(name) {
				console.log(name)
				if (name === "paucke") {
					console.log('entraaaaa')
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
