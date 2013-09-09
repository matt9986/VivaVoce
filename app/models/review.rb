class Review < ActiveRecord::Base
  attr_accessible :body, :business_id, :user_id

  validates :business_id,
  					 uniqueness: {scope: :user_id,
  					 message: "has already been reviewed"}

  belongs_to :business
  belongs_to :user

  has_one :stars, class_name: "ReputationSystem::Evaluation", as: :source

  has_reputation :votes, source: :user
end
