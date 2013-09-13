VivaVoce.Views.ReviewsShow = Backbone.View.extend({

  template: JST['reviews/show'],

  tagName: "li",

  events: {
		"click .voteBox > a": "placeVote",
    "click a.edit":"popEdit",
    "click a.del":"deleteRecord"
  },

  initialize: function () {
		this.listenTo(this.model, "change", this.render);
  },
  
  deleteRecord: function () {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },

  popEdit: function () {
    event.preventDefault();
    var editView = new VivaVoce.Views.ReviewsEdit({model: this.model});
    this.$el.prepend(editView.render().$el);
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
			error: function (response) {
				if (response.status == 401){
					var view = new VivaVoce.Views.SessionCreate({parentView: that});
					view.render();
					that.$el.prepend(view.$el);
				} else {
					that.$el.prepend("<p>I don't know what happened</p>");
				}
			}
		});
  },
                                                  
  render: function () {
		this.$el.html(this.template({review: this.model}));
    this.$el.find(".progress").progressbar({
      max: 5,
      value: parseInt(this.$el.find(".progress").attr('value'))
    });
		return this;
  }

});
