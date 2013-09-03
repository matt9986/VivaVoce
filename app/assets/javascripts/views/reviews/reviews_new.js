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
		event.preventDefault();
		var json = $(event.target).serializeJSON();
		console.log(json);
		this.collection.create(json, {success: function(){
			console.log("What?");
		}});
  }

});
