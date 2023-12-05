# Booking
#
# Este modelo representa una reserva en la aplicación. 
# Cada reserva pertenece a un usuario, un tour y un método de pago.

class Booking < ApplicationRecord
  # Una reserva pertenece a un usuario.
  belongs_to :user

  # Una reserva pertenece a un tour. Si la reserva se destruye, también se destruirá el tour asociado.
  belongs_to :tour, dependent: :destroy

  # Una reserva pertenece a un método de pago. Si la reserva se destruye, también se destruirá el método de pago asociado.
  belongs_to :payment, dependent: :destroy
end