VivaVoce.Views.BusinessesIndex = Backbone.View.extend({

  template: JST['businesses/index'],

  initialize: function () {
		this.listenTo(this.collection, "change add reset remove", this.render);
  },

	render: function () {
		this.$el.html(this.template({businesses: this.collection}));
		return this;
  }

});
