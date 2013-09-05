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
				VivaVoce.Store.geocoder.geocode({ address: request.term },
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
		this.$el.append(view.$el);
		return this;
  },

  submitsearch: function (event) {
		event.preventDefault();
		var dataString = $(event.target).serialize();
		Backbone.history.navigate("#/search/" + dataString);
  }

});
