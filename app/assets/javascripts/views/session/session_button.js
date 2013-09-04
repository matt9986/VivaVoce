VivaVoce.Views.SessionButton = Backbone.View.extend({

  template: JST['session/logbutton'],

  events: {
		"click a#loginButton":"popLogin",
		"click a#logoutButton":"logout"
  },

  initialize: function () {
		this.listenTo(VivaVoce.Store.session, "all", this.render);
  },

	render: function () {
		this.$el.html(this.template({
			username: VivaVoce.Store.session.get("username")
		}));
		return this;
  },

  logout: function () {
		event.preventDefault();
		console.log("Clicked logout");

		VivaVoce.Store.session.destroy();
  },

  popLogin: function () {
		event.preventDefault();
		var view = new VivaVoce.Views.SessionCreate();
		view.render();
		this.$el.prepend(view.$el);
  }

});