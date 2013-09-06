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
		// Gives autocomplete powers of Google addresses
		this.$el.find("#business_loc").autocomplete({
			source: function(request, response) {
				VivaVoce.Store.geocoder.geocode({
						address: request.term
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
		// Autocomplete for categories too
		this.$el.find("#business_tags").autocomplete({
			source: VivaVoce.Store.categories
		});
		this.$el.append(view.$el);
		return this;
  },

  submitsearch: function (event) {
		event.preventDefault();
		var data = $(event.target).serializeJSON();
		Backbone.history.navigate("#/searchresults/" + JSON.stringify(data));
  }

});
