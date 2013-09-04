VivaVoce.Views.SessionCreate = Backbone.View.extend({

  template: JST['session/create'],

  className:"formBox",

  events:{
		"submit form.newSession":"login",
		"blur form.newSession":"checkRemove"
  },

  login: function () {
		var that = this;
		event.preventDefault();
		var form = $(event.target).serialize();
		$.ajax({
			url:"/session",
			data: form,
			type: "POST",
			success: function (response) {
				console.log(response);

				that.remove();
			}
		});
  },

	render: function () {
		this.$el.html(this.template());
		return this;
  },

  checkRemove: function () {
  	console.log("blur!")
		if (event.target == event.currentTarget){
			debugger;
			this.remove();
		}
  }

});