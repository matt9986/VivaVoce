class PhotosController < ApplicationController
  respond_to :json
  before_filter :check_login, except: :index
  
  def create
    
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
