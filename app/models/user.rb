require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :email, :password, :username
  validates :email, :username, :session_token, presence: true, uniqueness: true
  validates :pass_hash, presence: true

  has_many :reviews
  has_many :businesses
  has_many :reviewed_businesses, through: :reviews, source: :business

  before_create :reset_session

  def password
  	@password || BCrypt::Password.new(self.pass_hash)
  end

	def password=(password)
		@password = password
		self.pass_hash = BCrypt::Password.create(password)
	end

	def reset_session
		token = SecureRandom.urlsafe_base64

		until User.find_by_session_token(token).nil?
			token = SecureRandom.urlsafe_base64
		end

		self.session_token = token
		token
	end
end
