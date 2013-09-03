class ReviewsController < ApplicationController
	def create
		params[:review][:user_id] = current_user.id
		params[:review][:business_id] = params[:business_id]
		begin
			ActiveRecord::Base.transaction do
				@review = Review.new(params[:review])

				raise "invalid" unless @review.valid?
			end
		rescue
			render json: "Fail in saving", status: 422
		else
			render json: @review
		end
	end

	def destroy
		@review = Review.find(params[:id])
		@review.destroy
		render json: "Review deleted"
	end

	def index
		@business = Business.find(params[:business_id])
		@reviews = Business.reviews.includes(:user)
	end

	def update

	end
end
