VivaVoce.Models.Business = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasMany,
		key: 'reviews',
		relatedModel: 'VivaVoce.Models.Review',
		collectionType: 'VivaVoce.Collections.Reviews',
		reverseRelation: {
			key: 'business'
		}
	}]
});
