VivaVoce.Views.SessionCreate = Backbone.View.extend({

  template: JST['session/create'],

  className:"coverWindow",

  events:{
		"submit form.newSession":"login",
		"click a#swapForm":"renderNewUser",
		"click":"checkRemove"
  },

  initialize: function (options) {
		this.parentView = options.parentView;
    this.errors = [];
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
				VivaVoce.Store.session.set({username: response.username});
				that.remove();
			},
      error: function (response) {
        that.errors = response.responseJSON;
        that.render();
      }
		});
  },

	render: function () {
    this.$el.html(this.template({errors: this.errors}));
		return this;
  },

  renderNewUser: function () {
		event.preventDefault();
		var view = new VivaVoce.Views.UsersNew({parentView: this.parentView});
		view.render();
		this.parentView.$el.append(view.$el);
		this.remove();
  },

  checkRemove: function () {
		if (event.target == event.currentTarget){
			this.remove();
		}
  }

});