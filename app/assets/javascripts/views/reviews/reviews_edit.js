VivaVoce.Views.ReviewsEdit = Backbone.View.extend({

  template: JST['reviews/new'],
  
  className:"coverWindow",

  events:{
		"submit form.newReview":"save",
    "click":"checkRemove"
  },
  
  checkRemove: function () {
		if (event.target == event.currentTarget){
			this.remove();
		}
  },

	render: function () {
    this.$el.html(this.template({ review: this.model }));
		return this;
  },

  save: function () {
		var that = this;
		event.preventDefault();
		var json = $(event.target).serializeJSON();
		this.model.save(json, {
			success: function () {
				this.remove();
			},
			error: function (sent, response) {
				if (response.status == 422) {
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