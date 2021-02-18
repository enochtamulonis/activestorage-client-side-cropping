class PagesController < ApplicationController
  def home
    @image = Image.new
  end

  def about
  end
end
