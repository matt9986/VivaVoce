class Review < ActiveRecord::Base
  attr_accessible :body, :business_id, :user_id

  validates :user_id, uniqueness: {scope: :business_id}

  belongs_to :business
  belongs_to :user
end
