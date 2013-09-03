window.VivaVoce = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function () {
    var $rootEl = $("body");
		var collection = new this.Collections.Businesses();
		collection.fetch();
		new this.Routers.Businesses($rootEl, collection);
		Backbone.history.start();
  }
};

$(document).ready(function () {
  VivaVoce.initialize();
});
