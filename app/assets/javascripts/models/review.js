VivaVoce.Models.Review = Backbone.RelationalModel.extend({
  
  initialize: function(options) {
    this.collection = this.collection || options.collection;
  }

});
