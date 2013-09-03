VivaVoce.Routers.Businesses = Backbone.Router.extend({
	routes: {
		"":"index",
		"businesses/:id":"show"
	},

	initialize: function ($rootEl, collection) {
		this.$rootEl = $rootEl;
		this.collection = collection;
		collection.fetch();
	},

	index: function () {
		var view = new VivaVoce.Views.BusinessesIndex({collection: this.collection});
		this._swapView(view);
	},

	show: function (id) {
		var model = this.collection.get(id);
		var view = new VivaVoce.Views.BusinessesShow({model: model});
		this._swapView(view);
	},


	_swapView: function (newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;
		newView.render();
		this.$rootEl.append(newView.$el);
	}

});
