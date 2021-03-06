VivaVoce.Views.SessionButton = Backbone.View.extend({

  template: JST['session/logbutton'],

  tagName: "p",

  className: "sessionButton",

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
		VivaVoce.Store.session.destroy();
  },

  popLogin: function () {
		event.preventDefault();
		var view = new VivaVoce.Views.SessionCreate({parentView: this});
		view.render();
		this.$el.append(view.$el);
  }

});