window.VivaVoce = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function (strapped) {
    this.startStore(strapped);
    var $rootEl = $("body");
		var collection = new this.Collections.Businesses(strapped.businesses);
    var header = new this.Views.VivaVoceHeader();
    $rootEl.html(header.render().$el);
    header._add_google_complete(header.$el.find("#business_loc"));
    new VivaVoce.Routers.Main($rootEl, collection);
    Backbone.history.start();
  },

  startStore: function (strapped) {
    this.Store.CSRF = $("meta[name='csrf-token']").attr('content');
    this.Store.session = new this.Models.Session(strapped.session);
    this.Store.geocoder = new google.maps.Geocoder();
  }
};

Dropzone.autoDiscover = false;
$(document).ready(function () {
  var $div = $('<div></div>');
  $div.html($('#bootstrap').text());
  var strapped = JSON.parse($div.text());
  VivaVoce.initialize(strapped);
});
