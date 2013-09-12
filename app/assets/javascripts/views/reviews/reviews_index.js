VivaVoce.Views.ReviewsIndex = Backbone.View.extend({

  // template: JST['reviews/index'],

  tagName: "ul",

  className: "reviewListing",
  
  events:{
    "click a.rpage":"changePage"    
  },

  initialize: function () {
		this.views = [];
		this.listenTo(this.collection, "add reset remove", this.render);
  },
  
  changePage: function() {
    event.preventDefault();
    var dir = parseInt($(event.target).attr('data-id'))
    this.collection.page = this.collection.page + dir;
    this.collection.fetch({ data: { page: this.collection.page }, reset: true });
  },

	render: function () {
		var that = this;
		that.$el.empty();
		that.collection.each(function( review ){
			var view = new VivaVoce.Views.ReviewsShow({ model: review });
			that.views.push(view);
			that.$el.append(view.render().$el);
		});
    that.$el.append(that._pageLine());
		return that;
  },

  remove: function(){
		this.$el.remove();
		_.each(this.views, function(view){ view.remove(); });
		this.stopListening();
		return this;
  },
  
  _pageLine: function(){
    var text = "";
    if(this.collection.page > 1){
      text = "<a data-id='-1' class='rpage' href='#prior'>Previous</a>"
    };
    text += "Page: " + this.collection.page;
    if(this.collection.page > 1){
      text += "<a data-id='1' class='rpage' href='#next'>Next</a>"
    };
    return text
  }

});
