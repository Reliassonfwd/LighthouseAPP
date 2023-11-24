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

  def create
    @tour = Tour.new(tour_params)
    @tour.cover_image.attach(params[:cover_image])
    if @tour.save
      redirect_to @tour, notice: 'Tour was successfully created.'
    else
      render :new
    end
  end

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
    image_file = params[:image]

    # Asocia la imagen con el tour a través de Active Storage
    @tour.cover_image.attach(io: image_file.open, filename: image_file.original_filename)

    render json: { message: 'Image added successfully' }
  end

  private
    def set_tour
      @tour = Tour.find(params[:id])
    end

    def tour_params
      params.require(:tour).permit(:name, :description, :duration, :price, :availability, :company_id, :cover_image)
    end
end
