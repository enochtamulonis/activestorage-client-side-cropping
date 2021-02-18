class ImagesController < ApplicationController
  before_action :set_image, except: [:create]
  
  def show;end

  def create

  end

  def update

  end

  def destroy

  end

  private

  def set_image
    @image = Image.find(params[:id])
  end

  def image_params
    params.require(:image).permit(:uploaded_image)
  end
end
