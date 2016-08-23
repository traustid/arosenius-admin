define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	var config = require('config');

	return Backbone.Collection.extend({
		url: config.apiUrl+'/bundles',

		initialize: function() {
			this.metadata = new Backbone.Model();
		},

		parse: function(data) {
			if (data.metadata) {			
				this.metadata.set({
					page: data.metadata.page,
					total: data.metadata.total
				});
			}
			return data.bundles;
		},

		search: function(query) {
			this.searchQuery = query;
			this.url = this.urlBase+'/search/'+query;
			this.fetch({
				reset: true
			});
		},

		getPage: function(page, order, orderDir) {
			this.searchQuery = '';
			this.order = order == undefined ? '' : order;
			this.orderDir = orderDir == undefined ? '' : orderDir;
			this.currentPage = page;

			this.fetch({
				reset: true,
				data: {
					page: this.currentPage
				}
			});
		}
	});
});