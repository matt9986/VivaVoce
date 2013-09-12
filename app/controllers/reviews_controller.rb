class ReviewsController < ApplicationController
	before_filter :check_login, except: :index
	before_filter :check_auth, only: [:destroy, :update]

	def create
		errors = []
		params[:review][:user_id] = current_user.id
		params[:review][:business_id] = params[:business_id]
		@business = Business.find(params[:business_id])
		begin
			ActiveRecord::Base.transaction do
				@review = Review.new(params[:review])
				raise "invalid" unless @review.valid?
				@review.save
				unless (1 .. 5).include?(params[:stars].to_i)
					errors << "Stars amount was outside the set range"
					raise "invalid" 
				end
				@business.add_evaluation(:stars, params[:stars].to_i, @review)
			end
		rescue
			render json: @review.errors.full_messages + errors, status: 422
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
    @reviews = @business.reviews.reverse_order.page(params[:page]).per(15).includes(:user)
	end

	def update
    @review = Review.find(params[:id])
    if @review.update_attributes(params[:review])
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
	end

	def check_auth
		@review = Review.find(params[:id])
		unless current_user.id == @review.user_id
			render json: "You're not allowed", status: 403
		end
	end

	def vote
		value = params[:vote] == "down" ? -1 : 1
		@review = Review.find(params[:id])
		@review.add_or_update_evaluation(:votes, value, current_user)
		render :show
	end
end
