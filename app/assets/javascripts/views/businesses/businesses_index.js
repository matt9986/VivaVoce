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
    this.$el.find('.progress').each(function(){
      $(this).progressbar({
        max: 5,
        value: parseFloat($(this).attr('value'))
      });
    });
    this._addMap();
		return this;
  },
  
  _addMap: function () {
    var that = this;
    that.center = new google.maps.LatLng(37.755422, -122.350616);
    var mapOpts = {
      center: that.center,
      zoom: 11
    };
    that.map = new google.maps.Map(this.$el.find('.mapSpace').get(0), mapOpts)
    this.collection.each(function(business){
      var mark = new google.maps.Marker({
        map: that.map,
        position: new google.maps.LatLng(business.get('lat'), business.get('lng')),
        title: business.get('name'),
        url: ('#/businesses/' + business.id)
      });
      google.maps.event.addListener(mark, 'click', function() {
        window.location.href = mark.url;
      })
    });
  }
                    

});
