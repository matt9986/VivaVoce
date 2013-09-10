VivaVoce.Views.PhotosNew = Backbone.View.extend({

  // template: JST['photos/new'],

	className:"newPhotos dropzone",
  
	initialize: function () {
		this.views = [];
	},
  
  photoFail: function (file, response) {
    _.each(response, function (error) {
      this.$el.append(error)
    })
  },

	photoSuccess: function (file, response) {
		this.collection.add(response)
		var view = new VivaVoce.Views.PhotosCaptionForm({
			collection: this.collection,
			model: response
		});
		this.$el.append(view.render());
		this.views.push(view);
	},

	render: function () {
		var that = this;
		this.$el.dropzone({
			url: that.collection.url(),
			maxFilesize: 3,
			maxFiles: 5,
			acceptedFiles: "image/*",
			dictDefaultMessage: "Click or drag your files here to upload",
			addRemoveLinks: true,
      headers: { 'X-CSRF-Token': VivaVoce.Store.CSRF },
			init: function () {
				this.on("success", that.photoSuccess);
        this.on("error", that.photoFail);
			}
		});
		this.$el.append("<br><a href='#/businesses/" +
											that.collection.businessId + "'>Cancel Upload</a>")
		return this;
  }

});
