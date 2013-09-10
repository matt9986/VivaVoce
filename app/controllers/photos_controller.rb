class PhotosController < ApplicationController
  respond_to :json
  before_filter :check_login, except: :index
  
  def create
    @upload = Upload.new(business_id: params[:business_id], user_id: current_user.id)
    @upload.photo = params[:file]
    if @upload.save
      render json: "Success!"
    else
      render json: @upload.errors.full_messages, status: 422
    end
  end
  
  def destroy
    
  end
  
  def index #Write this view
    @bus = Business.find(params[:business_id])
    @photos = @bus.uploads
  end
  
  def update
    
  end
end
