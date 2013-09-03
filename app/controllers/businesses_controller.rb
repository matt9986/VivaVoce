class BusinessesController < ApplicationController
	def index
		@businesses = Business.all
		respond_to do |format|
			format.html {render :index}
			format.json {render "index.rabl"}
		end
	end
end
