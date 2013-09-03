window.VivaVoce = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function () {
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
  }
};

$(document).ready(function () {
  VivaVoce.initialize();
});
