VivaVoce.Views.UsersNew = Backbone.View.extend({

  template: JST['users/new'],

  className:"coverWindow",

  events:{
		"submit form.newUser":"create",
		"click a#swapForm":"renderSession",
		"click":"checkRemove"
  },

  initialize: function (options) {
		this.parentView = options.parentView;
  },

  create: function () {
		var that = this;
		event.preventDefault();
		var form = $(event.target).serializeJSON();
		var user = new VivaVoce.Models.User(form.user);
		user.save(null, {
			success: function (response) {
				VivaVoce.Store.session.set({username: response.get("username")});
				that.remove();
			},
			error: function (sent, response) {
				console.log("fail");
				_.each(response.responseJSON, function (error){
					that.$el.prepend("<p>"+error+"</p>");
				});
			}
		});
  },

	render: function () {
		this.$el.html(this.template());
		return this;
  },

  renderSession: function () {
		event.preventDefault();
		var view = new VivaVoce.Views.SessionCreate({parentView: this.parentView});
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