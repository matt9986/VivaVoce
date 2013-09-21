object @business
attributes :name, :street_address, :city, :state, :zip, :lat
attributes :long => :lng, :slug => :id
node(:stars){ |business| business.reputation_for(:stars) }