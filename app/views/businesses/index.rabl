collection @businesses
attributes :id, :name, :street_address, :city, :state, :zip
node(:stars){|business| business.reputation_for(:stars) }