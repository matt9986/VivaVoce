class SessionsController < ApplicationController
	def create
		user = User.find_by_email(params[:user][:email])
		if user && user.password == params[:user][:password]
			log_in(user)
			render json: {username: user.username}
		else
			render json: ["There was a problem with your login information"], status: 404
		end
	end

	def destroy
		log_out
		render json: "You've logged out"
	end

	def show
		if logged_in?
			render json: {username: current_user.username}
		else
			render json: nil, status: 200
		end
	end
end
