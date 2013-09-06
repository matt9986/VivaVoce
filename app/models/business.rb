class Business < ActiveRecord::Base
  attr_accessible :city, :lat, :long, :name, :state, :street_address, :user_id, :zip
  validates :name, presence: true
  validates :street_address, :city, :state, :zip, presence: true

  has_many :reviews
  belongs_to :user

  before_create :get_lat_long

  def get_lat_long
# make the user incl lat/lng in submission of new business
  end

  def self.find_near_coord(lat, lng, dist = 40.2) # 25 mile "radius"
    lat, lng = self.deg_to_rad( lat ), self.deg_to_rad( lng )
    r = dist / 6371.0 #Dist is in km

    lat_min, lat_max = self.rad_to_deg(lat - r), self.rad_to_deg(lat + r)

    dlon = Math.asin(Math.sin(r)/Math.cos(lat))
    lng_min, lng_max = self.rad_to_deg(lng - dlon), self.rad_to_deg(lng + dlon)

    self.where(lat: lat_min .. lat_max, long: lng_min .. lng_max)
  end

  private
  def self.deg_to_rad(deg)
    (deg / 180.0) * Math::PI
  end

  def self.rad_to_deg(rad)
    (rad * 180.0) / Math::PI
  end

  def self.dist_from(lat, lng, business)
    dlat = self.deg_to_rad(lat - business.lat)
    dlon = self.deg_to_rad(lng - business.long)
    a = ((Math.sin(dlat/2)**2)+(Math.sin(dlon/2)**2)*
        Math.cos(deg_to_rad(lat))*Math.cos(deg_to_rad(business.lat)))
    (2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))) * 6371.0 #km
  end
end
