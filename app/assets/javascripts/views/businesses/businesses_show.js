VivaVoce.Views.BusinessesShow = Backbone.View.extend({

  template: JST['businesses/show'],

  initialize: function () {
		this.listenTo(this.model, "change add remove", this.render);
    this.views = [];
  },

	render: function () {
		this.$el.html(this.template({business: this.model}));
    
		var reviewsView = new VivaVoce.Views.ReviewsIndex({ collection: this.model.get("reviews") });
		this.views.push(reviewsView);
    var photosView = new VivaVoce.Views.PhotosIndex({ collection: this.model.get("photos") });
    this.views.push(photosView);
    
    _.each(this.views, function(view){ view.render() });
		this.$el.find(".review_table").html(reviewsView.$el);
		this.$el.find(".photo_table").html(photosView.$el);
    this.$el.find(".tabular").tabs({ collapsible: true, hide: 300, show: 300 })
		return this;
  },

  remove: function(){
		this.$el.remove();
		_.each(this.views, function(view){ view.remove(); });
		this.stopListening();
		return this;
  }

});
