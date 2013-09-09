VivaVoce.Collections.Photos = Backbone.Collection.extend({

  model: VivaVoce.Models.Photo,

  initialize: function(n, options){
		this.businessId = options.businessId;
  },

  url: function() {
		return "/businesses/"+this.businessId+"/photos";
}

});
