VivaVoce.Routers.Businesses = Backbone.Router.extend({
	routes: {
		"":"index",
		"businesses/new":"newBusiness",
		"businesses/:id/reviews/new":"newReview",
		"businesses/:id/photos/new":"newPhoto",
		"businesses/:id":"show",
		"users/new":"newUser",
		"searchresults/*terms":"search"
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

	newBusiness: function () {
		var view = new VivaVoce.Views.BusinessesNew({collection: this.collection});
		this._swapView(view);
	},

	newPhoto: function (business_id) {
		var model = this.collection.get(business_id);
		var collection = model.get("photos");
		var view = new VivaVoce.Views.PhotosNew({collection: collection})
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

	search: function (terms) {
		var that = this;
		var data = JSON.parse(terms);
		var searchresults = new VivaVoce.Collections.Businesses();
		VivaVoce.Store.geocoder.geocode(
			{ address: data.business.loc },
			function (results) {
				data.business.lat = results[0].geometry.location.lat();
				data.business.lng = results[0].geometry.location.lng();

				searchresults.fetch({data: data, success: function (){
					var view = new VivaVoce.Views.BusinessesIndex({collection: searchresults});
					view.render();
					that._swapView(view);
				}});
			});
	},

	show: function (id) {
		var model = this.collection.get(id);
		var view = new VivaVoce.Views.BusinessesShow({model: model});
		model.get("reviews").fetch({reset: true});
    model.get("photos").fetch({reset: true})
		this._swapView(view);
	},


	_swapView: function (newView) {
		this.currentView && this.currentView.remove();
		this.currentView = newView;
		newView.render();
		this.$rootEl.append(newView.$el);
	}

});
