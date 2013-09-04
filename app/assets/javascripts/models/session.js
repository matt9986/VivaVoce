VivaVoce.Models.Session = Backbone.RelationalModel.extend({
	urlRoot: "session",

	destroy: function (options) {
		var defOpt = {
			url: this.urlRoot,
			type: "DELETE"
		};
		_.extend(defOpt, options);
		$.ajax(defOpt);
		this.clear();
	}
});