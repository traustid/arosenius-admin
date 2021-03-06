define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	var config = require('config');

	var authHelper = require('lib/auth.helper');

	return Backbone.Collection.extend({
		url: config.apiUrl+'/documents',

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
			return data.documents;
		},

		byBundle: function(bundle, page, showAll) {
			this.searchQuery = '';
			this.currentPage = page;

			this.fetch({
				reset: true,
				beforeSend: authHelper.sendAuthentication,
				data: {
					page: this.currentPage,
					bundle: bundle,
					showAll: showAll ? true : false
				}
			});
		},

		byIDs: function(IDs, page, showAll) {
			this.searchQuery = '';
			this.currentPage = page;

			this.fetch({
				reset: true,
				beforeSend: authHelper.sendAuthentication,
				data: {
					page: this.currentPage,
					ids: IDs,
					showAll: showAll ? true : false
				}
			});
		},

		getPage: function(page, museum, type, searchQuery, insertId) {
			this.currentPage = page;

			console.log('DocumentListCollection: getPage');

			console.log('museum: '+museum);

			var searchParams = {
				page: this.currentPage,
				sort: 'insert_id'
			};

			if (museum) {
				searchParams['museum'] = museum;
			}
			if (type) {
				searchParams['type'] = type;
			}
			if (searchQuery) {
				searchParams['search'] = searchQuery;
			}
			if (insertId) {
				searchParams['insert_id'] = insertId;
			}

			this.fetch({
				reset: true,
				beforeSend: authHelper.sendAuthentication,
				data: searchParams
			});
		}
	});
});