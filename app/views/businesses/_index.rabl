collection @businesses
attributes :name, :street_address, :city, :state, :zip, :lat
attributes :long => :lng, :slug => :id
node(:stars){ |business| business.reputations.first.value }