class ApplicationController < ActionController::Base
  protect_from_forgery

	def check_login
		unless logged_in?
			render json: "Please log in", status: 401
		end
	end

  include SessionsHelper
end
