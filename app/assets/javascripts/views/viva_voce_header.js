VivaVoce.Views.VivaVoceHeader = Backbone.View.extend({

  template: JST['headers/header'],

  initialize: function () {
  },

	render: function () {
		this.$el.html(this.template());
		return this;
  }

});
