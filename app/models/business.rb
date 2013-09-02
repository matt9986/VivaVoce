class Business < ActiveRecord::Base
  attr_accessible :city, :lat, :long, :name, :state, :street_address, :user_id, :zip
  validates :name, presence: true
  validates :street_address, :city, :state, :zip, presence: true

  has_many :reviews
  belongs_to :user

  before_create :get_lat_long

  def get_lat_long

  end

  def find_near_coord(lat, long, dist)

  end
end
