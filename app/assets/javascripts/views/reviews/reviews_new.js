VivaVoce.Views.ReviewsNew = Backbone.View.extend({

  template: JST['reviews/new'],

  events:{
		"submit form.newReview":"save"
  },

	render: function () {
		this.$el.html(this.template());
		return this;
  },

  save: function () {
  	var that = this;
		event.preventDefault();
		var json = $(event.target).serializeJSON();
		this.collection.create(json, {
			success: function () {
				console.log("What?");
			},
			error: function () {
				var view = new VivaVoce.Views.SessionCreate();
				view.render();
				that.$el.prepend(view.$el);
			}
	});
  }

});
