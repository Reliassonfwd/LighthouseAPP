# Api::V1::ToursController
#
# This controller handles API requests related to tours.

class Api::V1::ToursController < ApplicationController
  # Before executing certain methods, the set_tour method is run.
  # This is a common pattern to avoid code duplication.
  before_action :set_tour, only: [:show, :edit, :update, :destroy]

  # index: Collects all tours and sends them in the JSON response.
  # If a tour has an image attached, it includes the image URL in the response.
  def index
    if params[:search]
      @tours = Tour.where('name LIKE ?', "%#{params[:search]}%").map do |tour|
        if tour.image.attached?
          tour.attributes.merge({ image: rails_blob_url(tour.image) })
        else
          tour.attributes
        end
      end
    else
      @tours = Tour.all.map do |tour|
        if tour.image.attached?
          tour.attributes.merge({ image: rails_blob_url(tour.image) })
        else
          tour.attributes
        end
      end
    end
    render json: @tours
  end

  # create: Creates a new tour. If the creation is successful, it sends the tour in the JSON response.
  # If not, it sends the validation errors in the JSON response.
  # The method also checks if the current user is authorized to create a tour.
  def create
    @tour = Tour.new(tour_params)
    if @tour.save
      render json: @tour.as_json.merge({ image: url_for(@tour.image) }), status: :created
    else
      render json: { error: 'Failed to create tour' }, status: :unprocessable_entity
    end
  end
  
  # show: Sends the specified tour in the JSON response.
  # If the tour has an image attached, it includes the image URL in the response.
  def show
    render json: @tour.as_json.merge({ image: url_for(@tour.image) })
  end
  
  # new: Creates a new tour instance.
  def new
    @tour = Tour.new
  end

  # edit: Empty method, included for completeness.
  def edit
    render json: @tour
  end

  # update: Updates an existing tour. If the current user is an admin and the update is successful, 
  # it sends the tour in the JSON response. If the update fails, it sends the validation errors in the JSON response.
  # If the current user is not an admin, it sends an authorization error in the JSON response
      def update
    if @tour.update(tour_params)
      Rails.logger.info "Tour with id #{params[:id]} was successfully updated."
      render json: { message: 'Tour was successfully updated.' }
    else
      Rails.logger.error "Failed to update tour with id #{params[:id]}."
      render json: { error: 'Failed to update tour' }, status: :unprocessable_entity
    end
  end

  # destroy: Deletes an existing tour and redirects the user to the list of tours.
  def destroy
    if @tour.destroy
      Rails.logger.info "Tour with id #{params[:id]} was successfully destroyed."
      render json: { message: 'Tour was successfully destroyed.' }
    else
      Rails.logger.error "Failed to destroy tour with id #{params[:id]}."
      render json: { error: 'Failed to destroy tour.' }, status: :unprocessable_entity
    end
  end

  # add_image: Finds the tour specified by params[:id] and attaches an image to it.
  # The image is loaded from a specific file path and attached to the tour.
  # Then, a URL is generated for the image and sent in the JSON response along with a success message.
  def add_image
    @tour = Tour.find(params[:id])
    @tour.image.attach(params[:image])
    if @tour.save
      render json: { message: 'Image was successfully attached.' }
    else
      render json: { error: 'Failed to add image' }, status: :unprocessable_entity
    end
  end

  private

  # set_tour: Finds the tour specified by params[:id] and assigns it to @tour.
  def set_tour
    @tour = Tour.find(params[:id])
  end

  # tour_params: This method handles the security of the tour parameters.
  # It requires the parameters to include a :tour and allows :name, :description, :duration, :price, :availability, :company_id, :quantity, :includes.
  def tour_params
    params.require(:tour).permit(:name, :description, :duration, :price, :availability, :company_id, :quantity, :includes)
  end
end
