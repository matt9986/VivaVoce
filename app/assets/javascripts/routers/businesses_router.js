VivaVoce.Routers.Businesses = Backbone.Router.extend({
	routes: {
		"":"index",
		"businesses/:id/reviews/new":"newReview",
		"businesses/:id":"show",
		"users/new":"newUser"
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

	newReview: function (business_id) {
		var model = this.collection.get(business_id);
		var collection = model.get("reviews");
		var view = new VivaVoce.Views.ReviewsNew({collection: collection});
		this._swapView(view);
	},

	newUser: function () {
		var view = new VivaVoce.Views.UsersNew();
		this._swapView(view);
	},

	show: function (id) {
		var model = this.collection.get(id);
		var view = new VivaVoce.Views.BusinessesShow({model: model});
		model.get("reviews").fetch({reset: true});
		this._swapView(view);
	},


	_swapView: function (newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;
		newView.render();
		this.$rootEl.append(newView.$el);
	}

});
