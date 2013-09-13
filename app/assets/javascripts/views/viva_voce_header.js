VivaVoce.Views.VivaVoceHeader = Backbone.View.extend({

  template: JST['headers/header'],

  className: "header",

  events: {
		"submit form.search":"submitsearch"
  },

  initialize: function () {
  },

	render: function () {
		this.$el.html(this.template());
		var view = new VivaVoce.Views.SessionButton();
		view.render();
    // Commented so that header could over-write page and hide bootstrapped data
		//this._add_google_complete(this.$el.find("#business_loc"));
		
		this.$el.append(view.$el);
		return this;
  },

  submitsearch: function (event) {
		event.preventDefault();
		var data = $(event.target).serializeJSON();
		Backbone.history.navigate("#/searchresults/" + JSON.stringify(data));
  },

  _add_google_complete: function ($item) {
		$item.autocomplete({
			source: function(request, response) {
				VivaVoce.Store.geocoder.geocode({
						address: request.term + " USA"
					},
					function(results){
						response(_.map(results, function(item){
							return {
								label: item.formatted_address,
								value: item.formatted_address
							};
						}));
					});
			}
		});
  }

});
