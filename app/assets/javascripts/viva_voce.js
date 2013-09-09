window.VivaVoce = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function () {

    this.startStore();
    var $rootEl = $("body");
		var collection = new this.Collections.Businesses();
    var header = new this.Views.VivaVoceHeader();
    $rootEl.prepend(header.render().$el);
		collection.fetch({
      success: function (){
        new VivaVoce.Routers.Businesses($rootEl, collection);
        Backbone.history.start();

      }
    });
  },

  startStore: function () {
    this.Store.session = new this.Models.Session();
    this.Store.session.fetch();
    this.Store.geocoder = new google.maps.Geocoder();
    this.Store.categories = ["Categories"];
  }
};

$(document).ready(function () {
  VivaVoce.initialize();
});
