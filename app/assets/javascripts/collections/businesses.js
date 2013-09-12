VivaVoce.Collections.Businesses = Backbone.Collection.extend({

  model: VivaVoce.Models.Business,

  url:"businesses",
  
  initialize: function () {
   this.page = 1; 
  }

});
