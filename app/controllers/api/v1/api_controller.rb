# Api::V1::ApiController
#
# Este controlador hereda de ApplicationController y se encarga de manejar
# las solicitudes a la API. Está configurado para responder con JSON.

class Api::V1::ApiController < ApplicationController

  # index
  #
  # Este método se encarga de manejar las solicitudes GET a la raíz de la API.
  # Recopila todos los registros de varias tablas de la base de datos y los envía en la respuesta JSON.
  # Las tablas incluyen: bookings, comments, companies, payment_methods, tours, y users.
  
  def index
    render json: {
      bookings: Booking.all,
      comments: Comment.all,
      companies: Company.all,
      payments: Payment.all,
      tours: Tour.all,
      users: User.all
    }
  end
end