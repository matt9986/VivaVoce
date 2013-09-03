VivaVoce.Views.ReviewsIndex = Backbone.View.extend({

  template: JST['reviews/index'],

  initialize: function () {
		this.listenTo(this.collection, "change add reset remove", this.render);
  },

	render: function () {
		this.$el.html(this.template({reviews: this.collection}));
		return this;
  }

});
