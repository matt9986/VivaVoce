VivaVoce.Models.Business = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasMany,
		key: 'reviews',
		relatedModel: 'VivaVoce.Models.Review',
		collectionType: 'VivaVoce.Collections.Reviews',
		collectionOptions: function (model) {
			return {businessId: model.id};
		},
		reverseRelation: {
			key: 'business'
		}
	}]
});
