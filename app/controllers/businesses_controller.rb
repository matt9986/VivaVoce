class BusinessesController < ApplicationController
	before_filter :check_login, only: :create

	def index
		if search = params[:business]
      @businesses = Business.name_or_loc_search(search)
      if search[:lat] && search[:lng]
  			@businesses.sort_by!{|business| business.dist_from(search[:lat].to_f,
                                                           search[:lng].to_f)}
      end
		else
      @businesses = Business.page(params[:page]).per(10)
		end
		respond_to do |format|
			format.html {render :index}
			format.json {render "index.rabl"}
		end
	end

	def create
		@business = Business.new(params[:business])

		if @business.save
			render :show
		else
			render json: @business.errors.full_messages, status: 422
		end
	end

	def show
		respond_to :show
	end
end
