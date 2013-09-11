window.VivaVoce = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function () {
    var json = this.grabBootStrapped();
    var $rootEl = $("body");
		var collection = new this.Collections.Businesses(json.businesses);
    var header = new this.Views.VivaVoceHeader();
    $rootEl.html(header.render().$el);
    header._add_google_complete(header.$el.find("#business_loc"));
    new VivaVoce.Routers.Businesses($rootEl, collection);
    Backbone.history.start();
  },

  grabBootStrapped: function () {
    var $div = $('<div></div>');
    $div.html($('#bootstrap').text());
    var strapped = JSON.parse($div.text());
    this.Store.CSRF = $("meta[name='csrf-token']").attr('content');
    this.Store.session = new this.Models.Session(strapped.session);
    this.Store.geocoder = new google.maps.Geocoder();
    this.Store.categories = ["Categories"];
    return strapped;
  }
};

Dropzone.autoDiscover = false;
$(document).ready(function () {
  VivaVoce.initialize();
});
