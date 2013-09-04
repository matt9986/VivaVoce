class ReviewsController < ApplicationController
	before_filter :check_login, except: :index
	before_filter :check_auth, only: [:destroy, :update]

	def create
		params[:review][:user_id] = current_user.id
		params[:review][:business_id] = params[:business_id]
		begin
			ActiveRecord::Base.transaction do
				@review = Review.new(params[:review])

				@review.save
				raise "invalid" unless @review.valid?
			end
		rescue
			render json: @review.errors.full_messages, status: 422
		else
			render json: @review
		end
	end

	def destroy
		@review ||= Review.find(params[:id])
		@review.destroy
		render json: "Review deleted"
	end

	def index
		@business = Business.find(params[:business_id])
		@reviews = @business.reviews.includes(:user)
	end

	def update

	end

	def check_auth
		@review = Review.find(params[:id])
		unless current_user.id == @review.user_id
			render json: "You're not allowed", status: 403
		end
	end
end
