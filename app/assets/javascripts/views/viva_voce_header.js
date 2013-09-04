VivaVoce.Views.VivaVoceHeader = Backbone.View.extend({

  template: JST['headers/header'],

  initialize: function () {
  },

	render: function () {
		this.$el.html(this.template());
		var view = new VivaVoce.Views.SessionButton();
		view.render();
		this.$el.append(view.$el);
		return this;
  }

});
