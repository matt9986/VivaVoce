object @business
attributes :id, :name, :street_address, :city, :state, :zip, :lat
attributes :long => :lng
node(:stars){ |business| business.reputation_for(:stars) }