VivaVoce.Views.ReviewsIndex = Backbone.View.extend({

  template: JST['reviews/index'],

  events: {
		"click .voteBox > a": "placeVote"
  },

  initialize: function () {
		this.listenTo(this.collection, "change add reset remove", this.render);
  },

	render: function () {
		this.$el.html(this.template({reviews: this.collection}));
		return this;
  },

  placeVote: function () {
		event.preventDefault();
		var that = this;
		var direction = $(event.target).attr("data-id");
		// TODO update review when vote is confirmed
		$.ajax({
			url: "/businesses" + that.collection.businessId + $(event.target).attr("href"),
			method: "POST",
			data: {vote: direction},
			success: function () {
				// Surprise!
				Backbone.history.navigate('#/businesses/'+that.collection.businessId);
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
