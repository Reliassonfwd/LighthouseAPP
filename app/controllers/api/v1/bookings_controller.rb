# Api::V1::BookingsController
#
# Este controlador maneja las solicitudes a la API relacionadas con las reservas (bookings).

class Api::V1::BookingsController < ApplicationController
  # Antes de ejecutar ciertos métodos, se ejecuta el método set_booking.
  before_action :set_booking, only: [:show, :edit, :update, :destroy]

  # index: Recopila todas las reservas y las envía en la respuesta JSON.
  def index
    @bookings = Booking.all
    render json: @bookings
  end

  # show: Envía la reserva especificada en la respuesta JSON.
  def show
    render json: @booking
  end

  # create: Crea una nueva reserva. Si la creación es exitosa, la envía en la respuesta JSON.
  # Si no, envía los errores en la respuesta JSON.
  def create
    @booking = Booking.new(booking_params)
    if @booking.save
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end
end