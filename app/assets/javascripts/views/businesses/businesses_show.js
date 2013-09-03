VivaVoce.Views.BusinessesShow = Backbone.View.extend({

  template: JST['businesses/show'],

  initialize: function () {
		this.listenTo(this.model, "change add remove", this.render);
  },

	render: function () {
		
		this.$el.html(this.template({business: this.model}));
		var reviewView = new VivaVoce.Views.ReviewsIndex({
			$el: this.$el.find(".review_table"),
			collection: this.model.get("reviews")
		});
		reviewView.render();
		return this;
  }

});
