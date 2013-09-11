VivaVoce.Views.PhotosIndex = Backbone.View.extend({

  template: JST['photos/index'],
  
  events: {
    "click div.photoBox>a":"popPhoto"
  },
  
  initialize: function () {
    this.listenTo(this.collection, "add reset remove", this.render);
  },
  
  popPhoto: function () {
    event.preventDefault();
    var photo = this.collection.get( $(event.target).attr('data-id') )
    var view = new VivaVoce.Views.PhotoShow({
      model: photo,
      collection: this.collection,
      parentView: this
    });
    this.$el.append( view.render().$el );
  },
  
  render: function () {
    this.$el.html(this.template({ photos: this.collection }));
    this.$el.tooltip({track: true})
    return this;
  }
});
