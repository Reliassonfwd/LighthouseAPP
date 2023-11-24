class Api::V1::ToursController < ApplicationController
  before_action :set_tour, only: [:show, :edit, :update, :destroy]

  def index
    @tours = Tour.all
    render json: @tours
  end

  def show
    render json: @tour
  end

  def new
    @tour = Tour.new
  end

  def edit;end


  def update
    if @tour.update(tour_params)
      redirect_to @tour, notice: 'Tour was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @tour.destroy
    redirect_to tours_url, notice: 'Tour was successfully destroyed.'
  end

  def add_image
    @tour = Tour.find(params[:id])
    image_filename = "tour_#{params[:id]}.jpg"

    @tour.image.attach(io: File.open("C:\\Users\\U!\\Desktop\\Lighthouse img\\#{image_filename}"), filename: image_filename, content_type: 'image/jpg')
    
    image_url =Rails.application.routes.url_helpers.url_for(@tour.image)

    render json: { message: 'Image uploaded successfully', url: image_url }
  end

  private
    def set_tour
      @tour = Tour.find(params[:id])
    end

    def tour_params
      params.require(:tour).permit(:name, :description, :duration, :price, :availability, :company_id, :cover_image)
    end
end
