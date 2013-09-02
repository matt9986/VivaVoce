module SessionsHelper
	def current_user
		@current_user ||= User.find_by_session_token(session[:token])
	end

	def current_user=(user)
		@current_user = user
	end

	def current_user?(user)
		current_user == user
	end

	def logged_in?
		!!current_user
	end

	def log_in(user)
		session[:token] = user.reset_session
		user.save!
		current_user = user
	end

	def log_out
		current_user.reset_session
		current_user.save!
		session[:token] = nil
		current_user = nil
	end
end
