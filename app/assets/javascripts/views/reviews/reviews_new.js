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
				Backbone.history.navigate('#/businesses/'+that.collection.businessId);
			},
			error: function (sent, response) {
				if (response.status == 401){
					var view = new VivaVoce.Views.SessionCreate({parentView: that});
					view.render();
					that.$el.prepend(view.$el);
				} else if (response.status == 422) {
					_.each(response.responseJSON, function (error){
						that.$el.prepend("<p>"+error+"</p>");
					});
				} else {
					that.$el.prepend("<p>I don't know what happened</p>");
				}
			}
	});
  }

});
