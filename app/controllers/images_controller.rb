class ImagesController < ApplicationController
  before_action :set_image, except: [:create, :index]
  def index
    @images = Image.all
  end

  def create
    @image = Image.new(image_params)
    respond_to do |format|
      if @image.save
        format.html {redirect_to images_path, notice: "Image Successfully Uploaded"}
      else
        format.html {render :new }
        format.json { @image.errors status: :unprocessable_entity}
      end
    end
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
    params.require(:image).permit(:image)
  end
end
