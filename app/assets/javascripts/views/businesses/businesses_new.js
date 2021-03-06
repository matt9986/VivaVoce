VivaVoce.Views.BusinessesNew = Backbone.View.extend({

  template: JST['businesses/edit_form'],

  events:{
		"submit form.businessForm":"save"
  },

	render: function () {
		this.$el.html("<h2>Add a Business</h2>")
		this.$el.append(this.template({business: new VivaVoce.Models.Business()}));
		return this;
  },

  save: function () {
		var that = this;
		event.preventDefault();
		var json = $(event.target).serializeJSON();
		that._googleLatLng(json, function(data){
			that.collection.create(json, {
        wait: true,
				success: function (business) {
				Backbone.history.navigate('#/businesses/'+business.id);
			},
			error: function (status, response) {
				if (response.status == 401){
					var view = new VivaVoce.Views.SessionCreate({parentView: that});
					view.render();
					that.$el.prepend(view.$el);
				} else if (response.status == 422) {
					_.each(response.responseJSON, function (error){
						that.$el.prepend("<p>"+error+"</p>");
					});
				} else {
					that.$el.prepend("<p>I don't know what happened</p>");
				}
			}
		});
		});
  },

  _googleLatLng: function (json, callback) {
		var address = json.business.street_address + ", " + json.business.city + ", ";
		address = address + json.business.state + ", " + json.business.zip;
		VivaVoce.Store.geocoder.geocode(
			{ address: address },
			function (results) {
				json.business.lat = results[0].geometry.location.lat();
				json.business.long = results[0].geometry.location.lng();
				callback(json);
			});
  }

});
