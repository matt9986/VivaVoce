VivaVoce.Views.PhotosIndex = Backbone.View.extend({

  template: JST['photos/index'],
  
  render: function () {
    this.$el.html(this.template({ photos: this.collection }));
    return this;
  }
});
