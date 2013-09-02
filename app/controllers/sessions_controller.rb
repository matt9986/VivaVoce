class SessionsController < ApplicationController
	def create
		user = User.find_by_email(params[:user][:email])
		if user && user.password == params[:user][:password]
			log_in(user)

		else
			render json: "There was a problem with your login information", status: 404
		end
	end

	def destroy
		log_out
		render json: "You've logged out"
	end
end
