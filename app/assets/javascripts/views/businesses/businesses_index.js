VivaVoce.Views.BusinessesIndex = Backbone.View.extend({

  template: JST['businesses/index'],
  
  events:{
    "click li>a.page":"changePage"
  },

  initialize: function () {
		this.listenTo(this.collection, "change add reset remove", this.render);
  },
  
  changePage: function () {
    event.preventDefault();
    var dir = parseInt($(event.target).attr('data-id'))
    this.collection.page = this.collection.page + dir;
    this.collection.fetch({ data: { page: this.collection.page }, reset: true });
  },

	render: function () {
		this.$el.html(this.template({businesses: this.collection}));
    this._addMap();
		return this;
  },
  
  _addMap: function () {
    var mapOpts = {
      center: new google.maps.LatLng(37.755422, -122.350616),
      zoom: 11
    };
    var map = new google.maps.Map(this.$el.find('.mapSpace').get(0), mapOpts)
    this.collection.each(function(business){
      new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(business.get('lat'), business.get('lng')),
        title: business.get('name')
      });
    })
  }
                    

});
