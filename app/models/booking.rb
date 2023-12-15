# Booking
#
# Este modelo representa una reserva en la aplicación. 
# Cada reserva pertenece a un usuario, un tour y un método de pago.

class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :tour
  belongs_to :payment
end