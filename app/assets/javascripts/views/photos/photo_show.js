VivaVoce.Views.PhotoShow = Backbone.View.extend({

  template: JST['photos/show'],

  className:"coverWindow",

  events:{
		"click a#next":"renderNextPhoto",
		"click":"checkRemove"
  },

  initialize: function (options) {
		this.parentView = options.parentView;
  },

	render: function () {
    this.$el.html(this.template({ photo: this.model }));
		return this;
  },

  renderNextPhoto: function () {
		event.preventDefault();
    var index = this.collection.indexOf(this.model);
    var photo = this.collection.at(index + 1);
		var view = new VivaVoce.Views.PhotoShow({
      model: photo,
      collection: this.collection,
      parentView: this.parentView
    });
		view.render();
		this.parentView.$el.append(view.$el);
		this.remove();
  },

  checkRemove: function () {
		if (event.target == event.currentTarget){
			this.remove();
		}
  }

});