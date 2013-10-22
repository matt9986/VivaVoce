class Business < ActiveRecord::Base
  extend FriendlyId
  attr_accessible :city, :lat, :long, :name, :state, :street_address, :user_id, :zip
  
  friendly_id :name, use: :slugged
  
  validates :name, presence: true
  validates :street_address, :city, :state, :zip, presence: true

  has_many :reviews, dependent: :destroy
  belongs_to :user
  has_many :uploads, dependent: :destroy

  has_reputation :stars, source: :review, aggregated_by: :average
  has_reputation :price, source: :user, aggregated_by: :average
  
  def self.name_or_loc_search(query)
    if query[:lat] && query[:lng]
      businesses = self.find_near_coord(query[:lat].to_f, query[:lng].to_f)
      businesses = businesses.order_by_dist_from(query[:lat].to_f, query[:lng].to_f)
    end
    if query[:name]
      businesses ||= self
      businesses = businesses.where('name LIKE ?', "%#{query[:name]}%")
    end
    return businesses
  end

  def self.find_near_coord(lat, lng, dist = 40.2) # 25 mile "radius"
    lat, lng = self.deg_to_rad( lat ), self.deg_to_rad( lng )
    r = dist / 6371.0 #Dist is in km

    lat_min, lat_max = self.rad_to_deg(lat - r), self.rad_to_deg(lat + r)

    dlon = Math.asin(Math.sin(r) / Math.cos(lat))
    lng_min, lng_max = self.rad_to_deg(lng - dlon), self.rad_to_deg(lng + dlon)

    self.where(lat: lat_min .. lat_max, long: lng_min .. lng_max)
  end

  def dist_from(lat, lng)
    dlat = self.class.deg_to_rad(lat - self.lat)
    dlon = self.class.deg_to_rad(lng - self.long)
    a = ((Math.sin(dlat / 2)**2)+(Math.sin(dlon / 2)**2) *
          Math.cos(self.class.deg_to_rad(lat)) * Math.cos(self.class.deg_to_rad(self.lat)))
    (2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))) * 6371.0 #km
  end

  def self.order_by_dist_from(lat, lng)
    self.order(sanitize_sql([<<-SQL, { lat: lat, lng: lng }]))
      (2*ATAN2(
        SQRT(
          POW(SIN(RADIANS(:lat - businesses.lat) / 2), 2) +
            POW(SIN(RADIANS(:lng - businesses.long) / 2), 2) *
          COS(RADIANS(:lat)) * COS(RADIANS(businesses.lat))
        ),
        SQRT(
          1-(POW(SIN(RADIANS(:lat - businesses.lat) / 2), 2) +
            POW(SIN(RADIANS(:lng - businesses.long) / 2), 2) *
            COS(RADIANS(:lat)) * COS(RADIANS(businesses.lat)))
        )
      )) 
    SQL
  end

  private
  def self.deg_to_rad(deg)
    (deg / 180.0) * Math::PI
  end

  def self.rad_to_deg(rad)
    (rad * 180.0) / Math::PI
  end
 
end
