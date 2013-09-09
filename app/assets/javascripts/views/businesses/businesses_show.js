VivaVoce.Views.BusinessesShow = Backbone.View.extend({

  template: JST['businesses/show'],

  initialize: function () {
		this.listenTo(this.model, "change add remove", this.render);
  },

	render: function () {
		this.$el.html(this.template({business: this.model}));
		var reviewView = new VivaVoce.Views.ReviewsIndex({
			collection: this.model.get("reviews")
		});
		this.subView = reviewView;
		reviewView.render();
		this.$el.find(".review_table").html(reviewView.$el);
		return this;
  },

  remove: function(){
		this.$el.remove();
		this.subView.remove();
		this.stopListening();
		return this;
  }

});
