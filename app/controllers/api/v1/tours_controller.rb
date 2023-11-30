class Api::V1::ToursController < ApplicationController
  before_action :set_tour, only: [:show, :edit, :update, :destroy]

  def index
    @tours = Tour.all
    render json: @tours
  end

  def create
  @tour = Tour.new(tour_params)
  authorize @tour

  if @tour.save
    render json: @tour, status: :created
  else
    render json: @tour.errors, status: :unprocessable_entity
  end
  end

  def show
    render json: @tour
  end

  def new
    @tour = Tour.new
  end

  def edit;end


def update
  @tour = Tour.find(params[:id])
  authorize @tour

  # Comprueba si el usuario actual es un administrador
  if current_user.admin?
    if @tour.update(tour_params)
      render json: @tour
    else
      render json: @tour.errors, status: :unprocessable_entity
    end
  else
    render json: { error: 'No tienes permiso para actualizar este tour' }, status: :forbidden
  end
end

  def destroy
    authorize @tour
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
    params.require(:tour).permit(:name, :description, :duration, :price, :availability, :company_id, :quantity, :includes)
  end
end
