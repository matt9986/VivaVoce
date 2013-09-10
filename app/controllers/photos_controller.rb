class PhotosController < ApplicationController
  respond_to :json
  before_filter :check_login, except: :index
  
  def create
    @upload = Upload.new(business_id: params[:business_id], user_id: current_user.id)
    @upload.photo = params[:file]
    if @upload.save
      render :show
    else
      render json: @upload.errors.full_messages, status: 422
    end
  end
  
  def destroy
    @upload = Upload.find(params[:id])
    if current_user == @upload.user
      @upload.destroy
      render json: "Destroyed", status: 200
    else
      render json: "Access denied", status: 403
    end
  end
  
  def index #Write this view
    @bus = Business.find(params[:business_id])
    @uploads = @bus.uploads
    render :index
  end
  
  def update
    @upload = Upload.find(params[:id])
    if current_user == @upload.user
      if @upload.update_attributes(params[:photo])
        render :show
      else
        render json: @upload.errors.full_messages, status: 422
      end
    else
      render json: "Access denied", status: 403
    end
  end
end
