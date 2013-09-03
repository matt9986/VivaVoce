VivaVoce.Routers.Businesses = Backbone.Router.extend({
	routes: {
		"":"index",
		"businesses/:id":"show"
	},

	initialize: function ($rootEl, collection) {
		this.$rootEl = $rootEl;
		this.collection = collection;
	},

	index: function () {
		var view = new VivaVoce.Views.BusinessesIndex({collection: this.collection});
		this._swapView(view);
	},

	show: function (id) {

	},




	_swapView: function (newView) {
		// this.currentView && this.currentView.remove();
		// this.currentView = newView;
		newView.render();
		this.$rootEl.html(newView.$el);
	}

});
