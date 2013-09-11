VivaVoce.Views.PhotosCaptionForm = Backbone.View.extend({

  template: JST['photos/caption_form'],

  events:{
		"submit form.newCaption":"save"
  },

	render: function () {
    this.$el.html(this.template({photo: this.model}));
		return this;
  },

  save: function () {
		var that = this;
		event.preventDefault();
		var json = $(event.target).serializeJSON();
    //this.model.set("title", json.photo.title);
		this.model.save(json, {
			success: function () {
				that.remove();
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