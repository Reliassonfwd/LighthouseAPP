class Api::V1::BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :edit, :update, :destroy]

  # Index action
  # Fetches all bookings and renders them in JSON format.
  # This action is typically used to provide a list of all bookings to the client.
  def index
    @bookings = Booking.all
    render json: @bookings
  end

  # Show action
  # Fetches a specific booking by ID and renders it in JSON format.
  # This action is used to provide the details of a specific booking to the client.
  def show
    render json: @booking
  end

  # Create action
  # Creates a new booking with the provided parameters. If the booking is successfully saved, it is rendered in JSON format with a status of :created. 
  # If the booking fails to save, the errors are rendered in JSON format with a status of :unprocessable_entity.
  # This action is used to create a new booking in the database.
  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # Edit action
  # Fetches a specific booking by ID and renders it in JSON format for editing.
  # This action is typically used to fetch the details of a booking that needs to be edited.
  def edit
    render json: @booking
  end

  # Update action
  # Updates a specific booking with the provided parameters. If the booking is successfully updated, it is rendered in JSON format. 
  # If the booking fails to update, the errors are rendered in JSON format with a status of :unprocessable_entity.
  # This action is used to update the details of an existing booking in the database.
  def update
    if @booking.update(booking_params)
      render json: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # Destroy action
  # Deletes a specific booking by ID and returns a status of :no_content.
  # This action is used to delete an existing booking from the database.
  def destroy
    if @booking.destroy
      render json: { success: "Booking successfully deleted.", id: @booking.id }
    else
      render json: { error: "Error deleting the Booking", details: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # set_booking method
  # Fetches a specific booking by ID.
  # This method is used to fetch a booking from the database using its ID.
  def set_booking
    @booking = Booking.find(params[:id])
  end

  # booking_params method
  # Specifies the permitted parameters for a booking.
  # This method is used to specify which parameters are permitted in a request to create or update a booking.
  def booking_params
    params.require(:booking).permit(:booking_date, :user_id, :tour_id, :payment_id)
  end
end
