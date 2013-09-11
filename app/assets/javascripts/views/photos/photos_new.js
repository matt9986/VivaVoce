VivaVoce.Views.PhotosNew = Backbone.View.extend({

  // template: JST['photos/new'],

	className:"newPhotos dropzone dropzone-previews",
  
	initialize: function () {
		this.views = [];
	},
  
  photoFail: function (file, msg, response) {
    this.$el.append(response.response)
  },

	photoSuccess: function (file, response) {
		this.collection.add(response)
		var view = new VivaVoce.Views.PhotosCaptionForm({
			collection: this.collection,
			model: this.collection.get(response.id)
		});
		this.$el.append(view.render().$el);
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
      headers: { 'X-CSRF-Token': VivaVoce.Store.CSRF },
			init: function () {
				this.on("success", that.photoSuccess.bind(that));
        this.on("error", that.photoFail.bind(that));
			}
		});
		this.$el.append("<br><a href='#/businesses/" +
											that.collection.businessId + "'>Cancel Upload</a>")
		return this;
  }

});
