VivaVoce.Collections.Reviews = Backbone.Collection.extend({

  model: VivaVoce.Models.Review,

  initialize: function(n, options){
		this.businessId = options.businessId;
  },

  url: function() {
		return "/businesses/"+this.businessId+"/reviews";
}

});
