VivaVoce.Views.BusinessesIndex = Backbone.View.extend({

  template: JST['businesses/index'],
  
  events:{
    "click li>page":"changePage"
  },

  initialize: function () {
		this.listenTo(this.collection, "change add reset remove", this.render);
  },
  
  changePage: function () {
    event.preventDefault();
    var dir = parseInt($(event.target).attr('data-id'))
    this.collection.page = this.collection.page + dir;
    this.collection.fetch({ data: { page: this.collection.page }, reset: true });
  },

	render: function () {
		this.$el.html(this.template({businesses: this.collection}));
		return this;
  }

});
