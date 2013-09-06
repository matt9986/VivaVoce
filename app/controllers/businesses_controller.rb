class BusinessesController < ApplicationController
	def index
		if search = params[:business]
			puts search
			@businesses = Business.find_near_coord(search[:lat].to_f,
																						 search[:lng].to_f)
			unless search[:tags].empty?
				puts "it thought there were tags"
				@businesses.select! do |business|
					(business.categories & search.tags).lenght > 0
				end
			end
			@businesses.sort_by!{|business| business.distance_from(search[:lat].to_f,
																														search[:lng].to_f)}
		else
			@businesses = Business.all
		end
		respond_to do |format|
			format.html {render :index}
			format.json {render "index.rabl"}
		end
	end
end
