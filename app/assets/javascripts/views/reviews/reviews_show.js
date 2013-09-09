VivaVoce.Views.ReviewsShow = Backbone.View.extend({

  template: JST['reviews/show'],

  tagName: "li",

  events: {
		"click .voteBox > a": "placeVote"
  },

  initialize: function () {
		this.listenTo(this.model, "change", this.render);
  },

	render: function () {
		this.$el.html(this.template({review: this.model}));
		return this;
  },

  placeVote: function () {
		event.preventDefault();
		var that = this;
		var direction = $(event.target).attr("data-id");
		$.ajax({
			url: "/businesses/" + that.model.collection.businessId + $(event.target).attr("href"),
			method: "POST",
			data: {vote: direction},
			success: function (response) {
				that.model.set(response);
			},
			error: function (sent, response) {
				if (response.status == 401){
					var view = new VivaVoce.Views.SessionCreate({parentView: that});
					view.render();
					that.$el.prepend(view.$el);
				} else {
					that.$el.prepend("<p>I don't know what happened</p>");
				}
			}
		});
  }

});
