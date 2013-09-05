class UsersController < ApplicationController
	def create
		@user = User.new(params[:user])
		if @user.save
			log_in(@user)
			render :create
		else
			render json: @user.errors.full_messages, status: 422
		end
	end
end
