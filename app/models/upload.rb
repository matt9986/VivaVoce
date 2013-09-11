class Upload < ActiveRecord::Base
  attr_accessible :business_id, :title, :user_id
  has_attached_file :photo, styles: { thumb: "75x75#", tiny: "25x25#" }

  validates_attachment :photo,
                        presence: true,
                        content_type: { content_type: /image/ },
                        size: { in: 0..4.megabytes }
  validates :business_id, :user_id, presence: true
  
  belongs_to :user
  belongs_to :business
end
