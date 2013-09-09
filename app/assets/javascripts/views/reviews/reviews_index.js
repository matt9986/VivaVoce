VivaVoce.Views.ReviewsIndex = Backbone.View.extend({

  // template: JST['reviews/index'],

  tagName: "ul",

  className: "reviewListing",

  initialize: function () {
		this.views = [];
		this.listenTo(this.collection, "add reset remove", this.render);
  },

	render: function () {
		var that = this;
		that.$el.empty();
		that.collection.each(function( review ){
			var view = new VivaVoce.Views.ReviewsShow({ model: review });
			that.views.push(view);
			that.$el.append(view.render().$el);
		});
		return that;
  },

  remove: function(){
		this.$el.remove();
		_.each(this.views, function(view){ view.remove(); });
		this.stopListening();
		return this;
  }

});
